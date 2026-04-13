import type { Metadata } from 'next'
import CantonPage from '@/components/CantonPage'
import { cantonBySlug } from '@/lib/canton-data'

const canton = cantonBySlug['fribourg']

export const metadata: Metadata = {
  title: 'Assurance maladie LAMal Fribourg 2026 — Primes et caisses',
  description: `Prime moyenne ${canton.primeMoyenne} CHF/mois dans le canton de Fribourg. Top 3 des caisses les moins chères, subsides et calculateur personnalisé. Données OFSP 2026.`,
  openGraph: {
    title: 'LAMal Fribourg 2026 — Primes, caisses et subsides',
    description: `Comparez les caisses maladie dans le canton de Fribourg. Prime moyenne ${canton.primeMoyenne} CHF/mois.`,
    url: 'https://my-swiss-insurance.ch/lamal/canton/fribourg',
    type: 'article',
  },
}

export default function FribourgPage() {
  return <CantonPage canton={canton} />
}
