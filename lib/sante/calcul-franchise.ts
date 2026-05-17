/**
 * Formule canonique de seuil d'équilibre entre deux franchises LAMal.
 *
 * Source de données : franchiseTable[canton].primeMois — prime la moins chère
 * par franchise, moyennée sur les régions du canton (adulte 35 ans, BASE, sans LAA).
 *
 * Dérivation (valable pour Fa ≤ frais ≤ Fb, plafond QP non atteint côté Fa) :
 *   prime_Fa × 12  +  Fa  +  0.1 × (frais − Fa)  =  prime_Fb × 12  +  frais
 *   ⟹  (prime_Fa − prime_Fb) × 12  +  0.9 × Fa  =  0.9 × frais
 *   ⟹  frais_seuil = ((prime_Fa − prime_Fb) × 12 + 0.9 × Fa) / 0.9
 */

import { cantonBySlug } from '@/data/sante/cantons'

const QP = 0.1  // taux de quote-part LAMal

// Facteurs de prime enfant relatifs à primeMoyenneEnfant (référence : F300 = 1.00)
const CHILD_FACTORS: Record<number, number> = {
  0: 1.08, 100: 1.04, 200: 1.02, 300: 1.00, 400: 0.97, 600: 0.93,
}

// ─── Formule canonique ────────────────────────────────────────────────────────

/**
 * Seuil d'équilibre entre deux franchises Fa < Fb.
 * @param primeFa  Prime mensuelle à la franchise la plus basse (CHF)
 * @param primeFb  Prime mensuelle à la franchise la plus haute (CHF)
 * @param Fa       Montant de la franchise la plus basse (CHF)
 * @returns        Frais médicaux annuels au-delà desquels Fa devient plus avantageux
 */
export function breakEven(primeFa: number, primeFb: number, Fa: number): number {
  return Math.round(((primeFa - primeFb) * 12 + (1 - QP) * Fa) / (1 - QP))
}

// ─── Adulte (26 ans et plus) — F300 vs F2500 ─────────────────────────────────

export function cantonBreakEven(slug: string): number | null {
  const data = cantonBySlug[slug]
  if (!data) return null
  const f300  = data.franchiseTable.find(r => r.franchise === 300)
  const f2500 = data.franchiseTable.find(r => r.franchise === 2500)
  if (!f300 || !f2500) return null
  return breakEven(f300.primeMois, f2500.primeMois, 300)
}

/** Prime mensuelle moyenne nationale à un niveau de franchise donné (adulte). */
export function nationalAvgPrime(franchise: number): number {
  const vals = Object.values(cantonBySlug)
    .map(c => c.franchiseTable.find(r => r.franchise === franchise)?.primeMois)
    .filter((v): v is number => v !== undefined)
  return vals.reduce((s, v) => s + v, 0) / vals.length
}

/** Seuil d'équilibre F300 vs F2500 moyen national (adulte 26 ans et plus). */
export function nationalBreakEven(): number {
  const vals = Object.keys(cantonBySlug)
    .map(slug => cantonBreakEven(slug))
    .filter((v): v is number => v !== null)
  return Math.round(vals.reduce((s, v) => s + v, 0) / vals.length)
}

// ─── Jeune adulte (19–25 ans) — F300 vs F2500 ───────────────────────────────
// Approximation : primes du franchiseTable adulte × ratio primeMoyenneJA/primeMoyenne

export function cantonBreakEvenJA(slug: string): number | null {
  const data = cantonBySlug[slug]
  if (!data || data.primeMoyenne === 0) return null
  const ratio = data.primeMoyenneJA / data.primeMoyenne
  const f300  = data.franchiseTable.find(r => r.franchise === 300)
  const f2500 = data.franchiseTable.find(r => r.franchise === 2500)
  if (!f300 || !f2500) return null
  return breakEven(f300.primeMois * ratio, f2500.primeMois * ratio, 300)
}

/** Seuil d'équilibre F300 vs F2500 moyen national (jeune adulte 19–25 ans). */
export function nationalBreakEvenJA(): number {
  const vals = Object.keys(cantonBySlug)
    .map(slug => cantonBreakEvenJA(slug))
    .filter((v): v is number => v !== null)
  return Math.round(vals.reduce((s, v) => s + v, 0) / vals.length)
}

// ─── Enfant (0–18 ans) — F0 vs F600 ─────────────────────────────────────────
// Approximation : facteurs CHILD_FACTORS × primeMoyenneEnfant du canton

export function cantonBreakEvenEnfant(slug: string): number | null {
  const data = cantonBySlug[slug]
  if (!data || data.primeMoyenneEnfant === 0) return null
  const base = data.primeMoyenneEnfant
  return breakEven(base * CHILD_FACTORS[0], base * CHILD_FACTORS[600], 0)
}

/** Seuil d'équilibre F0 vs F600 moyen national (enfant 0–18 ans). */
export function nationalBreakEvenEnfant(): number {
  const vals = Object.keys(cantonBySlug)
    .map(slug => cantonBreakEvenEnfant(slug))
    .filter((v): v is number => v !== null)
  return Math.round(vals.reduce((s, v) => s + v, 0) / vals.length)
}
