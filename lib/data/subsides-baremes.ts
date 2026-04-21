// Barèmes subsides LAMal 2026 — cantons romands
// Sources :
//   GE : ge.ch/informations-generales-subside-assurance-maladie/baremes
//   VD : Notice explicative OVAM 2026 (PDF)
//   NE : ne.ch barèmes 2026 (classifications S1–S15)
//   VS : Echelle RIP 2026 (PDF officiel)
//   FR : ecasfr.ch (seuils revenus)
//   JU : ecasjura.ch (seuils revenus)

export type Canton = 'GE' | 'VD' | 'NE' | 'FR' | 'JU' | 'VS'
export type Situation = 'seul' | 'couple'

export const CANTON_NAMES: Record<Canton, string> = {
  GE: 'Genève', VD: 'Vaud', NE: 'Neuchâtel', FR: 'Fribourg', JU: 'Jura', VS: 'Valais',
}

export const CANTON_URLS: Record<Canton, string> = {
  GE: 'https://www.ge.ch/informations-generales-subside-assurance-maladie',
  VD: 'https://www.vd.ch/sante-soins-et-handicap/assurance-maladie/subside-a-lassurance-maladie',
  NE: 'https://www.ne.ch/themes/social/assurance-maladie/subsides-assurance-maladie-lamal',
  FR: 'https://www.ecasfr.ch/fr/Assurances/Reduction-des-primes-d-assurance-maladie/Reduction-des-primes-d-assurance-maladie.html',
  JU: 'https://www.ecasjura.ch/fr/Assurances/Assurance-maladie/Reduction-des-primes-d-assurance-maladie-RPI-Informations-generales-2026/Reduction-des-primes-d-assurance-maladie-RPI-Informations-generales-2026.html',
  VS: 'https://www.avsvalais.ch/fr/Assurances/RIP-Reduction-individuelle-des-primes-d-assurance-maladie/Reduction-des-primes-d-assurance-maladie/Reduction-des-primes-caisse-maladie.html',
}

export interface SubsideResult {
  adulte: number        // mensuel par adulte
  enfant: number        // mensuel par enfant
  total: number         // mensuel total ménage
  approx: boolean
  label?: string        // ex. "S12" pour NE, "70%" pour VS
  note?: string
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function lerp(x: number, x1: number, x2: number, y1: number, y2: number): number {
  if (x <= x1) return y1
  if (x >= x2) return y2
  return Math.round(y1 + (y2 - y1) * (x - x1) / (x2 - x1))
}

// ─── GE — Genève ─────────────────────────────────────────────────────────────
// 9 groupes, montants mensuels 2026
// Seul sans enfant  : G1 = 0–30'000, G8 = 47'501–50'000
// Couple sans enfant: G1 = 0–45'000, G8 = 105'001–115'000
// G9 activé pour familles avec enfants (dernier palier faible)

const GE_AMT_ADULTE = [348, 294, 240, 196, 164, 120, 87, 55, 0]
const GE_AMT_JEUNE  = [231, 231, 231, 231, 231, 231, 231, 231, 106]
const GE_AMT_ENFANT = [132, 132, 132, 132, 132, 132, 132, 132, 67]

const GE_UPPER_SEUL   = [30000, 32917, 35833, 38750, 41667, 44583, 47500, 50000]
const GE_UPPER_COUPLE = [45000, 55000, 65000, 75000, 85000, 95000, 105000, 115000]

function geGroupIndex(revenu: number, situation: Situation, nbEnfants: number): number {
  const base = situation === 'seul' ? GE_UPPER_SEUL : GE_UPPER_COUPLE
  const bonus = nbEnfants * (situation === 'seul' ? 13000 : 17000)
  const thresholds = base.map(t => t + bonus)
  for (let i = 0; i < thresholds.length; i++) {
    if (revenu <= thresholds[i]) return i
  }
  return nbEnfants > 0 ? 8 : 9
}

export function calculerSubsideGE(
  revenu: number, situation: Situation, nbEnfants: number, isJeune: boolean,
): SubsideResult {
  const g = geGroupIndex(revenu, situation, nbEnfants)
  if (g >= 9) return { adulte: 0, enfant: 0, total: 0, approx: true, label: 'Hors barème' }
  const nb = situation === 'couple' ? 2 : 1
  const adulte = isJeune ? GE_AMT_JEUNE[g] : GE_AMT_ADULTE[g]
  const enfant = GE_AMT_ENFANT[g]
  return {
    adulte, enfant,
    total: adulte * nb + enfant * nbEnfants,
    approx: true,
    label: `Groupe ${g + 1}`,
    note: 'Estimation — seuils intermédiaires interpolés. Consultez ge.ch pour le montant exact.',
  }
}

// ─── VS — Valais ─────────────────────────────────────────────────────────────
// Taux × prime de référence ordinaire
// Source : Echelle RIP 2026

// Moyenne régions I et II
const VS_REF = { adulte: 521, jeune: 380, enfant: 122 }

// [tauxPct, revenuMaxAnnuel]
const VS_SEUL_0E: [number, number][] = [[100,21000],[70,23917],[50,26833],[40,29750],[30,32667],[20,35583],[10,38500]]
const VS_SEUL_1E: [number, number][] = [[100,38250],[70,41896],[50,45542],[40,49188],[30,52833],[20,56479],[10,60125]]
const VS_CPLI_0E: [number, number][] = [[100,36750],[70,41854],[50,46958],[40,52063],[30,57167],[20,62271],[10,67375]]
const VS_CPLI_1E: [number, number][] = [[100,48750],[70,53854],[50,58958],[40,64063],[30,69167],[20,74271],[10,79375]]
const VS_CPLI_2E: [number, number][] = [[100,58750],[70,63854],[50,68958],[40,74063],[30,79167],[20,84271],[10,89375]]
const VS_CPLI_3E: [number, number][] = [[100,66750],[70,71854],[50,76958],[40,82063],[30,87167],[20,92271],[10,97375]]
const VS_CPLI_4E: [number, number][] = [[100,72750],[70,77854],[50,82958],[40,88063],[30,93167],[20,98271],[10,103375]]

const VS_ENFANT_MAX: Record<Situation, Record<number, number>> = {
  seul:   { 1: 63000, 2: 73000, 3: 81000, 4: 87000 },
  couple: { 1: 116000, 2: 116000, 3: 116000, 4: 116000 },
}

function vsTable(situation: Situation, nbEnfants: number): [number, number][] {
  if (situation === 'seul') return nbEnfants >= 1 ? VS_SEUL_1E : VS_SEUL_0E
  switch (nbEnfants) {
    case 0: return VS_CPLI_0E
    case 1: return VS_CPLI_1E
    case 2: return VS_CPLI_2E
    case 3: return VS_CPLI_3E
    default: return VS_CPLI_4E
  }
}

export function calculerSubsideVS(
  revenu: number, situation: Situation, nbEnfants: number, isJeune: boolean,
): SubsideResult {
  const table = vsTable(situation, nbEnfants)
  let taux = 0
  for (const [t, max] of table) { if (revenu <= max) { taux = t; break } }
  const adulteRef = isJeune ? VS_REF.jeune : VS_REF.adulte
  const adulte = Math.round(taux / 100 * adulteRef)
  const nb = situation === 'couple' ? 2 : 1

  let enfant = 0
  if (nbEnfants > 0) {
    const limit = VS_ENFANT_MAX[situation][Math.min(nbEnfants, 4)]
    if (revenu <= limit) enfant = Math.round(0.8 * VS_REF.enfant)
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

const NE_BANDS = [
  { label: 'S1–S11', adulte: 643, jeune: 484, enfant: 160, maxSeul: 50600 },
  { label: 'S12',    adulte: 515, jeune: 387, enfant: 160, maxSeul: 53500 },
  { label: 'S13',    adulte: 390, jeune: 293, enfant: 160, maxSeul: 56400 },
  { label: 'S14',    adulte: 272, jeune: 204, enfant: 160, maxSeul: 58164 },
  { label: 'S15',    adulte: 166, jeune: 124, enfant: 160, maxSeul: 65089 },
]

export function calculerSubsideNE(
  revenu: number, situation: Situation, nbEnfants: number, isJeune: boolean,
): SubsideResult {
  const nb = situation === 'couple' ? 2 : 1
  // Adjust revenu to seul-equivalent for threshold comparison
  const coupleDiscount = situation === 'couple' ? 0.60 : 1
  const childDiscount  = 1 + nbEnfants * 0.28
  const adjRevenu = (revenu / coupleDiscount) / childDiscount

  for (const b of NE_BANDS) {
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
// Subside ordinaire (mensuel) + subside spécifique si primes > 10% RDU
// Source : Notice explicative OVAM 2026

function vdOrdSeul26(r: number): number {
  if (r <= 17000) return 331
  if (r <= 40000) return lerp(r, 17000, 40000, 331, 30)
  if (r <= 50000) return 30
  return 0
}
function vdOrdSeul1925(r: number): number {
  if (r <= 16000) return 255
  if (r <= 34000) return lerp(r, 16000, 34000, 255, 20)
  if (r <= 39000) return 20
  return 0
}
function vdOrdFamille26(r: number): number {
  // Famille adulte 26+ (avec ou sans enfant) — R1≈336 / R2≈300 → moyenne 318
  if (r <= 24200) return 318
  if (r <= 55000) return lerp(r, 24200, 55000, 300, 20)
  if (r <= 72500) return 20
  return 0
}
function vdOrdEnfant(r: number): number {
  // Subside ordinaire enfant (indépendant de la région selon la notice)
  if (r <= 76000) return 114
  return 0
}

export function calculerSubsideVD(
  revenu: number,
  situation: Situation,
  nbEnfants: number,
  isJeune: boolean,
): SubsideResult {
  const nb = situation === 'couple' ? 2 : 1
  const hasChildren = nbEnfants > 0

  const adulte = (() => {
    if (hasChildren || situation === 'couple') return isJeune ? vdOrdSeul1925(revenu) : vdOrdFamille26(revenu)
    return isJeune ? vdOrdSeul1925(revenu) : vdOrdSeul26(revenu)
  })()

  const enfant = hasChildren ? vdOrdEnfant(revenu) : 0
  return {
    adulte,
    enfant,
    total: adulte * nb + enfant * nbEnfants,
    approx: true,
    label: 'Ordinaire',
    note: 'Subside ordinaire — estimation indicative. Un subside spécifique peut s\'ajouter si vos primes dépassent 10% du revenu.',
  }
}

// ─── FR — Fribourg ───────────────────────────────────────────────────────────
// Seuils de revenus (60 paliers non publiés — éligibilité uniquement)

export function calculerSubsideFR(
  revenu: number, situation: Situation, nbEnfants: number,
): SubsideResult {
  if (revenu > 150000) return { adulte: 0, enfant: 0, total: 0, approx: true, label: 'Non éligible' }
  const base    = situation === 'couple' ? 65000 : 37000
  const enfBonus = nbEnfants * (situation === 'couple' ? 14000 : 10000)
  const plafond  = Math.min(base + enfBonus, 135000)
  if (revenu > plafond) return { adulte: 0, enfant: 0, total: 0, approx: true, label: 'Non éligible' }
  return {
    adulte: 0, enfant: 0, total: 0, approx: true,
    label: 'Probablement éligible',
    note: 'Les montants exacts sont calculés sur 60 paliers par la caisse de compensation. Déposez votre demande avant le 31 août.',
  }
}

// ─── JU — Jura ───────────────────────────────────────────────────────────────
// Seuils de revenus (barème complet non publié)

export function calculerSubsideJU(
  revenu: number, situation: Situation, nbEnfants: number,
): SubsideResult {
  const hasChildren = nbEnfants > 0
  const plafond = hasChildren ? 53000 : (situation === 'couple' ? 40000 : 27000)
  if (revenu > plafond) return { adulte: 0, enfant: 0, total: 0, approx: true, label: 'Non éligible' }
  return {
    adulte: 0, enfant: 0, total: 0, approx: true,
    label: 'Probablement éligible (subside partiel)',
    note: 'Délai de demande : 31 décembre 2026. Formulaires RPI01–RPI05 sur ecasjura.ch.',
  }
}
