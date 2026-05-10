// Fonctions de calcul des subsides LAMal 2026 — cantons romands
// Toutes les données sont importées depuis lib/data/subsides-2026.ts (source unique)
//
// Cantons avec formule précise publiée : GE, VD, NE, FR, JU, VS
// FR utilise la grille officielle 60 paliers (art. 6 ORP / art. 15 LALAMal)

import {
  SUBSIDES_2026,
  type Situation,
  type SubsideResult,
  type TauxVS,
} from '@/lib/data/subsides-2026'

// Re-export des types utilisés par les composants
export type { Situation, SubsideResult } from '@/lib/data/subsides-2026'

// Cantons avec formule officielle précise
export type Canton = 'GE' | 'VD' | 'NE' | 'FR' | 'JU' | 'VS'

export const CANTON_NAMES: Record<Canton, string> = {
  GE: 'Genève', VD: 'Vaud', NE: 'Neuchâtel', FR: 'Fribourg', JU: 'Jura', VS: 'Valais',
}

export const CANTON_URLS: Record<Canton, string> = {
  GE: SUBSIDES_2026.GE.lien,
  VD: SUBSIDES_2026.VD.lien,
  NE: SUBSIDES_2026.NE.lien,
  FR: SUBSIDES_2026.FR.lien,
  JU: SUBSIDES_2026.JU.lien,
  VS: SUBSIDES_2026.VS.lien,
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function lerp(x: number, x1: number, x2: number, y1: number, y2: number): number {
  if (x <= x1) return y1
  if (x >= x2) return y2
  return Math.round(y1 + (y2 - y1) * (x - x1) / (x2 - x1))
}

// ─── GE — Genève ─────────────────────────────────────────────────────────────
// 9 groupes d'imposition, montants mensuels fixes
// Seuils ajustés par enfant : +13 000 CHF (seul) / +17 000 CHF (couple)
// Groupe 9 : famille rattrapage (adulte = 0 si seul sans enfant)

export function calculerSubsideGE(
  revenu: number, situation: Situation, nbEnfants: number, isJeune: boolean,
): SubsideResult {
  const ge = SUBSIDES_2026.GE.ge!
  const bonus = nbEnfants * (situation === 'couple' ? ge.bonusEnfantCouple : ge.bonusEnfantSeul)

  let groupeIndex = ge.groupes.length   // hors barème par défaut
  for (let i = 0; i < ge.groupes.length; i++) {
    const g = ge.groupes[i]
    const seuil = (situation === 'couple' ? g.revenuMaxCouple : g.revenuMaxSeul) + bonus
    if (revenu <= seuil) { groupeIndex = i; break }
  }

  if (groupeIndex >= ge.groupes.length) {
    return { adulte: 0, enfant: 0, total: 0, approx: true, label: 'Hors barème' }
  }

  const groupe = ge.groupes[groupeIndex]
  const adulte = isJeune ? groupe.jeune : groupe.adulte
  const enfant = groupe.enfant
  const nb = situation === 'couple' ? 2 : 1

  // Groupe 9 + seul sans enfant = hors barème (adulte = 0, aucun enfant)
  if (adulte === 0 && nbEnfants === 0) {
    return { adulte: 0, enfant: 0, total: 0, approx: true, label: 'Hors barème' }
  }

  return {
    adulte, enfant,
    total: adulte * nb + enfant * nbEnfants,
    approx: true,
    label: `Groupe ${groupe.groupe}`,
    note: 'Estimation — seuils intermédiaires des groupes 2–8 interpolés. Consultez ge.ch pour le montant officiel exact.',
  }
}

// ─── VS — Valais ─────────────────────────────────────────────────────────────
// Taux × prime de référence, par profil de ménage et tranche de revenu
// Source : Echelle RIP 2026

function vsGetProfil(situation: Situation, nbEnfants: number): TauxVS['profil'] {
  if (situation === 'seul') return nbEnfants >= 1 ? 'seul_1e+' : 'seul_0e'
  switch (Math.min(nbEnfants, 4)) {
    case 0:  return 'couple_0e'
    case 1:  return 'couple_1e'
    case 2:  return 'couple_2e'
    case 3:  return 'couple_3e'
    default: return 'couple_4e+'
  }
}

export function calculerSubsideVS(
  revenu: number, situation: Situation, nbEnfants: number, isJeune: boolean,
): SubsideResult {
  const vs = SUBSIDES_2026.VS.vs!
  const profil = vsGetProfil(situation, nbEnfants)

  let taux = 0
  for (const entry of vs.taux) {
    if (entry.profil === profil && revenu <= entry.revenuMaxAn) { taux = entry.taux; break }
  }

  const adulteRef = isJeune ? vs.primeReference.jeune : vs.primeReference.adulte
  const adulte = Math.round(taux / 100 * adulteRef)
  const nb = situation === 'couple' ? 2 : 1

  let enfant = 0
  if (nbEnfants > 0) {
    const maxEntry = vs.enfantMaxRevenu.find(
      e => e.statut === situation && e.nbEnfants === Math.min(nbEnfants, 4)
    )
    if (maxEntry && revenu <= maxEntry.revenuMax) {
      enfant = Math.round(0.8 * vs.primeReference.enfant)
    }
  }

  return {
    adulte, enfant,
    total: adulte * nb + enfant * nbEnfants,
    approx: false,
    label: taux > 0 ? `${taux}%` : 'Hors barème',
  }
}

// ─── NE — Neuchâtel ──────────────────────────────────────────────────────────
// Classifications S1–S15, montants mensuels 2026
// Ajustement revenu : revAdj = (revenu / facteurCouple) / (1 + nbEnfants × facteurEnfant)

export function calculerSubsideNE(
  revenu: number, situation: Situation, nbEnfants: number, isJeune: boolean,
): SubsideResult {
  const ne = SUBSIDES_2026.NE.ne!
  const nb = situation === 'couple' ? 2 : 1
  const coupleDiv  = situation === 'couple' ? ne.facteurCouple : 1
  const childDiv   = 1 + nbEnfants * ne.facteurEnfant
  const adjRevenu  = (revenu / coupleDiv) / childDiv

  for (const b of ne.bandes) {
    if (adjRevenu <= b.maxSeul) {
      const adulte = isJeune ? b.jeune : b.adulte
      return {
        adulte, enfant: b.enfant,
        total: adulte * nb + b.enfant * nbEnfants,
        approx: true,
        label: b.label,
        note: 'Estimation basée sur les classifications S1–S15. Barème complet : RSN 821.102.',
      }
    }
  }
  return { adulte: 0, enfant: 0, total: 0, approx: true, label: 'Hors barème' }
}

// ─── VD — Vaud ───────────────────────────────────────────────────────────────
// Barème linéaire par morceaux — subside ordinaire OVAM 2026

function vdInterpolate(
  revenu: number,
  profil: 'adulte26_seul' | 'adulte1925' | 'adulte26_famille' | 'enfant',
): number {
  const segments = SUBSIDES_2026.VD.vd!.segments.filter(s => s.profil === profil)
  for (const seg of segments) {
    if (revenu <= seg.revenuMax) {
      if (seg.montantMin === seg.montantMax) return seg.montantMin
      return lerp(revenu, seg.revenuMin, seg.revenuMax, seg.montantMin, seg.montantMax)
    }
  }
  return 0
}

export function calculerSubsideVD(
  revenu: number, situation: Situation, nbEnfants: number, isJeune: boolean,
): SubsideResult {
  const nb = situation === 'couple' ? 2 : 1
  const hasChildren = nbEnfants > 0

  const adulte = (() => {
    if (isJeune) return vdInterpolate(revenu, 'adulte1925')
    if (hasChildren || situation === 'couple') return vdInterpolate(revenu, 'adulte26_famille')
    return vdInterpolate(revenu, 'adulte26_seul')
  })()

  const enfant = hasChildren ? vdInterpolate(revenu, 'enfant') : 0

  return {
    adulte, enfant,
    total: adulte * nb + enfant * nbEnfants,
    approx: true,
    label: 'Ordinaire',
    note: "Subside ordinaire — estimation indicative OVAM 2026. Un subside spécifique peut s'ajouter si vos primes dépassent 10 % du revenu.",
  }
}

// ─── FR — Fribourg ───────────────────────────────────────────────────────────
// Grille officielle 60 paliers (art. 6 ORP / art. 15 LALAMal)
// Source : FR-grille_lissage_des_taux_paliers_f.pdf + FR-memento_rpi_f_2026.pdf (ECAS FR)
//
// Algorithme :
//   1. Trouver la limite légale selon situation/nbEnfants
//   2. pctEnDessous = (limite − revenu) / limite × 100
//   3. Lire le taux dans les 60 paliers
//   4. Subside = taux/100 × prime_moyenne_région_1[profil]
//   5. Enfants : taux = max(taux, 80 %) ; JA en formation : taux = max(taux, 50 %)
// Note : les montants sont calculés sur la prime de la région 1 (Sarine).
//        Région 2 (autres districts) : primes légèrement inférieures (−8 %).

export function calculerSubsideFR(
  revenu: number, situation: Situation, nbEnfants: number, isJeune: boolean,
): SubsideResult {
  const fr = SUBSIDES_2026.FR.fr!

  // 1. Limite légale selon situation/nbEnfants (plafonné à 6 enfants dans la table)
  const seuil = fr.seuilsEligibilite.find(
    s => s.statut === situation && s.nbEnfants === Math.min(nbEnfants, 6)
  )
  if (!seuil || revenu >= seuil.revenuMax) {
    return { adulte: 0, enfant: 0, total: 0, approx: false, label: 'Non éligible' }
  }

  // 2. Pourcentage en dessous de la limite
  const pctEnDessous = (seuil.revenuMax - revenu) / seuil.revenuMax * 100

  // 3. Lookup taux dans les 60 paliers
  const palier = fr.paliers.find(p => pctEnDessous >= p.pctMin && pctEnDessous <= p.pctMax)
  const taux = palier?.taux ?? 65   // pctEnDessous ≥ 60.01 → dernier palier 65 %

  // 4. Primes moyennes région 1 (Sarine)
  const primes = fr.primesMoyennes.find(p => p.region === '1')!
  const adulteRef = isJeune ? primes.jeune : primes.adulte
  const adulte = Math.round(taux / 100 * adulteRef)

  // 5. Enfants : minimum 80 % de la prime moyenne enfant
  const nb = situation === 'couple' ? 2 : 1
  const tauxEnfant = Math.max(taux, fr.pctMinEnfant)
  const enfant = nbEnfants > 0 ? Math.round(tauxEnfant / 100 * primes.enfant) : 0

  return {
    adulte, enfant,
    total: adulte * nb + enfant * nbEnfants,
    approx: false,
    label: `${taux}%`,
    note:
      'Calculé sur les primes de référence région 1 (district de la Sarine). ' +
      'Région 2 (autres districts) : adulte CHF 524/mois, jeune CHF 386/mois, enfant CHF 124/mois — montants légèrement inférieurs. ' +
      'Délai de demande : 31 août 2026. Source : ECAS Fribourg.',
  }
}

// ─── JU — Jura ───────────────────────────────────────────────────────────────
// Subside partiel ordinaire 2026 — barème gradué 15–225 CHF/mois (adulte, non publié)
// Montant affiché = maximum du barème ; le montant réel dépend du revenu exact.

export function calculerSubsideJU(
  revenu: number, situation: Situation, nbEnfants: number, isJeune: boolean,
): SubsideResult {
  const ju = SUBSIDES_2026.JU.ju!
  const hasChildren = nbEnfants > 0

  const seuil = ju.seuilsEligibilite.find(
    s => s.statut === situation && s.nbEnfants === Math.min(nbEnfants, 3)
  )
  if (!seuil || revenu > seuil.revenuMax) {
    return { adulte: 0, enfant: 0, total: 0, approx: true, label: 'Non éligible' }
  }

  const nb = situation === 'couple' ? 2 : 1
  const adulte = isJeune ? ju.jeune : ju.adulteMax
  const enfant = hasChildren ? ju.enfant : 0

  return {
    adulte, enfant,
    total: adulte * nb + enfant * nbEnfants,
    approx: true,
    label: 'Maximum ordinaire',
    note:
      'Montant maximum du subside ordinaire 2026. ' +
      'Le barème gradué complet (15–225 CHF/mois adulte) n\'est pas publié — ' +
      'le montant réel dépend de votre revenu exact. ' +
      'Délai de demande : 31 décembre 2026.',
  }
}
