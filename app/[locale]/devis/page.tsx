import type { Metadata } from 'next'
import DevisClient from './DevisClient'

export const metadata: Metadata = {
  title: 'Obtenir un devis LAMal — My Swiss Insurance',
  description:
    'Comparez gratuitement les primes LAMal 2026. Remplissez le formulaire et un expert vous répond sous 24 h.',
  robots: { index: false },
}

export default function DevisPage() {
  return <DevisClient />
}
