import type { Metadata } from 'next'
import CantonPage from '@/components/CantonPage'
import { cantonBySlug } from '@/lib/canton-data'

const canton = cantonBySlug['vaud']

export const metadata: Metadata = {
  title: 'Assurance maladie LAMal Vaud 2026 — Primes et caisses',
  description: `Prime moyenne ${canton.primeMoyenne} CHF/mois dans le canton de Vaud. Top 3 des caisses les moins chères, subsides et calculateur personnalisé. Données OFSP 2026.`,
  openGraph: {
    title: 'LAMal Vaud 2026 — Primes, caisses et subsides',
    description: `Comparez les caisses maladie dans le canton de Vaud. Prime moyenne ${canton.primeMoyenne} CHF/mois.`,
    url: 'https://my-swiss-insurance.ch/lamal/canton/vaud',
    type: 'article',
  },
}

export default function VaudPage() {
  return <CantonPage canton={canton} />
}
