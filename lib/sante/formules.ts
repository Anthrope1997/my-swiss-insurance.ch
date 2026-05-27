/**
 * Source de vérité pour toutes les statistiques calculées du site.
 *
 * Méthodologie :
 *   - Profil de référence : adulte 35 ans (naissance 1990), sans couverture accident
 *   - Min / Max          : valeur extrême parmi toutes les offres des régions concernées
 *   - Moyenne            : moyenne des prix par région, pondérée par la population (age_25_plus)
 *   - Économie caisse    : écart max − min par région (même profil), agrégé selon la même logique
 *   - Break-even         : calculé sur les primes moyennes pondérées
 *   - Économie modèle    : écart entre la moyenne BASE et la moyenne du modèle alternatif
 *   - Subside moyen      : subsideMensuelMax canton pondéré par la population cantonale
 *
 * Source des données :
 *   - data/sante/primes.json   → tarifs OFSP 2026 par région / assureur / profil / franchise / modèle
 *   - data/sante/regions.json  → population par région de prime (source OFS)
 *   - data/sante/cantons.ts    → subsideMensuelMax par canton
 *
 * Toutes les fonctions sont serveur-only (lecture fichier au build time).
 * Les données sont mises en cache au niveau module — un seul chargement par build.
 */

import { readFileSync } from 'fs'
import { join } from 'path'
import { cantonBySlug } from '@/data/sante/cantons'

// ─── Types internes ───────────────────────────────────────────────────────────

interface PrimeRecord {
  region_id: string
  canton: string
  annee_naissance: number
  franchise: number
  avec_accident: boolean
  modele_categorie: string
  assureur: string
  prime_nette: number
}

interface RegionStats {
  region_id: string
  canton: string
  min: number     // prime la moins chère dans la région (CHF/mois)
  max: number     // prime la plus chère dans la région (CHF/mois)
  mean: number    // moyenne des primes des assureurs dans la région (CHF/mois)
  pop: number     // population 25 ans et plus (poids)
}

// ─── Constantes ───────────────────────────────────────────────────────────────

export const ADULTE_NAISSANCE = 1990  // 35 ans en 2026
export const DEFAULT_FRANCHISE = 300
export const DEFAULT_MODELE = 'BASE'

const QP = 0.1  // taux de quote-part LAMal

// ─── Chargement des données (cache module) ────────────────────────────────────

let _primes: PrimeRecord[] | null = null
let _regionPop: Map<string, { canton: string; pop: number }> | null = null

function getPrimes(): PrimeRecord[] {
  if (!_primes) {
    _primes = JSON.parse(
      readFileSync(join(process.cwd(), 'data/sante/primes.json'), 'utf-8'),
    ) as PrimeRecord[]
  }
  return _primes
}

function getRegionPop(): Map<string, { canton: string; pop: number }> {
  if (!_regionPop) {
    const raw = JSON.parse(
      readFileSync(join(process.cwd(), 'data/sante/regions.json'), 'utf-8'),
    ) as Record<string, { region_id: string; canton: string; communes: Array<{ population: { age_25_plus: number } }> }>

    _regionPop = new Map()
    for (const r of Object.values(raw)) {
      const pop = r.communes.reduce((s, c) => s + c.population.age_25_plus, 0)
      _regionPop.set(r.region_id, { canton: r.canton, pop })
    }
  }
  return _regionPop
}

// ─── Calcul des stats par région ──────────────────────────────────────────────

const _statsCache = new Map<string, RegionStats[]>()

function computeRegionStats(
  franchise: number | undefined,
  modele: string | undefined,
  naissance = ADULTE_NAISSANCE,
  avecAccident?: boolean,
): RegionStats[] {
  const key = `${franchise ?? '*'}:${modele ?? '*'}:${naissance}:${avecAccident ?? '*'}`
  if (_statsCache.has(key)) return _statsCache.get(key)!

  const filtered = getPrimes().filter(
    p =>
      p.annee_naissance === naissance &&
      (franchise === undefined || p.franchise === franchise) &&
      (modele === undefined || p.modele_categorie === modele) &&
      (avecAccident === undefined || p.avec_accident === avecAccident),
  )

  // Dédoublonnage : une prime par (région, assureur, franchise, modele, accident) — les NPA multiples
  // dans une région ont la même prime pour le même (assureur, franchise, modele)
  const byRegion = new Map<string, Map<string, number>>()
  for (const p of filtered) {
    if (!byRegion.has(p.region_id)) byRegion.set(p.region_id, new Map())
    byRegion.get(p.region_id)!.set(`${p.assureur}:${p.franchise}:${p.modele_categorie}:${p.avec_accident}`, p.prime_nette)
  }

  const regionPop = getRegionPop()
  const result: RegionStats[] = []

  for (const [rid, assureurMap] of byRegion) {
    const primes = Array.from(assureurMap.values())
    const { canton, pop } = regionPop.get(rid) ?? { canton: rid.slice(0, 2), pop: 0 }
    const mean = primes.reduce((s, v) => s + v, 0) / primes.length
    result.push({
      region_id: rid,
      canton,
      min: Math.min(...primes),
      max: Math.max(...primes),
      mean,
      pop,
    })
  }

  _statsCache.set(key, result)
  return result
}

// ─── Helpers internes ─────────────────────────────────────────────────────────

function filterRegions(stats: RegionStats[], canton?: string): RegionStats[] {
  return canton ? stats.filter(r => r.canton === canton) : stats
}

function weightedMean(vals: number[], weights: number[]): number {
  const total = weights.reduce((s, w) => s + w, 0)
  if (total === 0) return 0
  return vals.reduce((s, v, i) => s + v * weights[i], 0) / total
}

function scope(opts: Opts): RegionStats[] {
  const { franchise, modele, canton, avecAccident } = opts
  return filterRegions(computeRegionStats(franchise, modele, ADULTE_NAISSANCE, avecAccident), canton)
}

// ─── Options des requêtes ─────────────────────────────────────────────────────

export interface Opts {
  canton?: string        // code 2 lettres ex. "GE" — omis = national
  franchise?: number     // omis = toutes les franchises
  modele?: string        // omis = tous les modèles
  avecAccident?: boolean // omis = avec et sans accident
}

// ─── Primes ───────────────────────────────────────────────────────────────────

/** Prime mensuelle la moins chère disponible dans la zone (CHF/mois). */
export function primeMin(opts: Opts = {}): number {
  return Math.round(Math.min(...scope(opts).map(r => r.min)))
}

/** Prime mensuelle la plus chère disponible dans la zone (CHF/mois). */
export function primeMax(opts: Opts = {}): number {
  return Math.round(Math.max(...scope(opts).map(r => r.max)))
}

/** Prime mensuelle moyenne pondérée par la population (CHF/mois). */
export function primeMoyenne(opts: Opts = {}): number {
  const rs = scope(opts)
  return Math.round(weightedMean(rs.map(r => r.mean), rs.map(r => r.pop)))
}

// ─── Économie entre caisses ───────────────────────────────────────────────────
// Économie = écart max − min dans une région pour le même profil (CHF/mois)

/** Économie mensuelle minimale réalisable en changeant de caisse (CHF/mois). */
export function economieMin(opts: Opts = {}): number {
  return Math.round(Math.min(...scope(opts).map(r => r.max - r.min)))
}

/** Économie mensuelle maximale réalisable en changeant de caisse (CHF/mois). */
export function economieMax(opts: Opts = {}): number {
  return Math.round(Math.max(...scope(opts).map(r => r.max - r.min)))
}

/** Économie mensuelle moyenne pondérée par la population (CHF/mois). */
export function economieMoyenne(opts: Opts = {}): number {
  const rs = scope(opts)
  return Math.round(weightedMean(rs.map(r => r.max - r.min), rs.map(r => r.pop)))
}

// ─── Break-even franchises ────────────────────────────────────────────────────

/**
 * Seuil de frais médicaux annuels au-delà duquel la franchise basse (Fa) devient
 * plus avantageuse que la franchise haute (Fb).
 * Calculé sur les primes moyennes pondérées du périmètre considéré.
 *
 * Formule : ((primeFa − primeFb) × 12 + 0,9 × Fa) / 0,9
 */
export function breakEven(opts: { canton?: string; Fa?: number; Fb?: number } = {}): number {
  const { canton, Fa = 300, Fb = 2500 } = opts
  const pFa = primeMoyenne({ canton, franchise: Fa, modele: DEFAULT_MODELE })
  const pFb = primeMoyenne({ canton, franchise: Fb, modele: DEFAULT_MODELE })
  return Math.round(((pFa - pFb) * 12 + (1 - QP) * Fa) / (1 - QP))
}

// ─── Économie de modèles ──────────────────────────────────────────────────────
// Économie = différence de prime moyenne entre BASE et le modèle alternatif,
// par région, agrégée selon la même logique min/max/moyenne.
//
// Mapping codes primes.json → labels fonctionnels :
//   HAM = Médecin de famille (Hausarztmodell)
//   HMO = Centre médical
//   DIV = Télémédecine (catégorie "Diverse" OFSP — majoritairement telmed)

export type ModeleAlt = 'HAM' | 'HMO' | 'DIV'

function modeleEcoPairs(
  modele: ModeleAlt,
  franchise: number,
): { eco: number; pop: number }[] {
  const base = computeRegionStats(franchise, 'BASE')
  const alt  = computeRegionStats(franchise, modele)
  const altMap = new Map(alt.map(r => [r.region_id, r]))

  return base
    .map(r => {
      const a = altMap.get(r.region_id)
      if (!a) return null
      return { eco: r.mean - a.mean, pop: r.pop }
    })
    .filter((x): x is { eco: number; pop: number } => x !== null)
}

/** Économie mensuelle minimale en passant au modèle alternatif (CHF/mois). */
export function modeleEconomieMin(modele: ModeleAlt, franchise = DEFAULT_FRANCHISE): number {
  return Math.round(Math.min(...modeleEcoPairs(modele, franchise).map(x => x.eco)))
}

/** Économie mensuelle maximale en passant au modèle alternatif (CHF/mois). */
export function modeleEconomieMax(modele: ModeleAlt, franchise = DEFAULT_FRANCHISE): number {
  return Math.round(Math.max(...modeleEcoPairs(modele, franchise).map(x => x.eco)))
}

/** Économie mensuelle moyenne pondérée en passant au modèle alternatif (CHF/mois). */
export function modeleEconomieMoyenne(modele: ModeleAlt, franchise = DEFAULT_FRANCHISE): number {
  const pairs = modeleEcoPairs(modele, franchise)
  return Math.round(weightedMean(pairs.map(p => p.eco), pairs.map(p => p.pop)))
}

// ─── Subside moyen ────────────────────────────────────────────────────────────

/**
 * Subside mensuel moyen pondéré par la population cantonale (CHF/mois).
 * Source : subsideMensuelMax de cantons.ts pour les 26 cantons.
 * Le code canton est dérivé de l'identifiant de la première région (ex. "VD1" → "VD").
 */
export function subsideMoyen(): number {
  // Population par canton = somme des populations de ses régions
  const regionPop = getRegionPop()
  const cantonPop = new Map<string, number>()
  for (const { canton, pop } of regionPop.values()) {
    cantonPop.set(canton, (cantonPop.get(canton) ?? 0) + pop)
  }

  const subs: number[] = []
  const pops: number[] = []

  for (const c of Object.values(cantonBySlug)) {
    const max = c.subside?.subsideMensuelMax
    if (!max) continue
    const code = c.regions[0]?.id.slice(0, 2)
    const pop = code ? (cantonPop.get(code) ?? 0) : 0
    subs.push(max)
    pops.push(pop)
  }

  return Math.round(weightedMean(subs, pops))
}
