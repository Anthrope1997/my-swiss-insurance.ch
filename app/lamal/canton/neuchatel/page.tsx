import type { Metadata } from 'next'
import CantonPage from '@/components/CantonPage'
import { cantonBySlug } from '@/lib/canton-data'

const canton = cantonBySlug['neuchatel']

export const metadata: Metadata = {
  title: 'Assurance maladie LAMal Neuchâtel 2026 — Primes et caisses',
  description: `Prime moyenne ${canton.primeMoyenne} CHF/mois dans le canton de Neuchâtel. Top 3 des caisses les moins chères, subsides et calculateur personnalisé. Données OFSP 2026.`,
  openGraph: {
    title: 'LAMal Neuchâtel 2026 — Primes, caisses et subsides',
    description: `Comparez les caisses maladie dans le canton de Neuchâtel. Prime moyenne ${canton.primeMoyenne} CHF/mois.`,
    url: 'https://my-swiss-insurance.ch/lamal/canton/neuchatel',
    type: 'article',
  },
}

export default function NeuchatelPage() {
  return <CantonPage canton={canton} />
}
