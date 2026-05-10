/**
 * Utilitaires de calcul de primes LAMal.
 * La recherche dans le dataset complet est effectuée par l'API /api/primes.
 * Ce module expose les coefficients et helpers utilisés côté client.
 */

export const AGE_COEF: Record<string, number> = {
  '0-18':  0.45,
  '19-25': 0.78,
  '26-35': 1.00,
  '36-50': 1.15,
  '51-65': 1.42,
  '65+':   1.68,
}

export const FRANCHISE_COEF: Record<string, number> = {
  '300':  1.00,
  '500':  0.94,
  '1000': 0.86,
  '1500': 0.80,
  '2000': 0.75,
  '2500': 0.71,
}

export const MODELE_COEF: Record<string, number> = {
  'Standard':          1.00,
  'Médecin de famille': 0.88,
  'HMO':               0.85,
  'Telmed':            0.82,
}

export function estimerPrime(
  primeBase: number,
  age: string,
  franchise: string,
  modele: string,
): number {
  const coef = (AGE_COEF[age] ?? 1) * (FRANCHISE_COEF[franchise] ?? 1) * (MODELE_COEF[modele] ?? 1)
  return Math.round(primeBase * coef)
}
