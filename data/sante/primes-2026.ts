/**
 * Données tarifaires OFSP 2026.
 * Les primes brutes sont servies par l'API /api/primes via lib/data/primes.json.
 * Ce module expose les constantes et types associés.
 */

export const ANNEE = 2026

export const FRANCHISES = [300, 500, 1000, 1500, 2000, 2500] as const
export type Franchise = (typeof FRANCHISES)[number]

export const MODELES = ['BASE', 'FAMILY_DOC', 'HMO', 'TELMED'] as const
export type Modele = (typeof MODELES)[number]

export const PROFILS = {
  adulte:       1990,
  jeuneAdulte:  2005,
  enfant:       2015,
} as const
