import type { Metadata } from 'next'
import CantonPage from '@/components/CantonPage'
import { cantonBySlug } from '@/lib/canton-data'

const canton = cantonBySlug['vaud']

export const metadata: Metadata = {
  title: 'Assurance maladie à Vaud 2026 : primes, caisses et subsides',
  description: `Prime moyenne ${canton.primeMoyenne} CHF/mois à Vaud. Caisse la moins chère : ${canton.topCaisses[0].name} dès ${canton.topCaisses[0].prime} CHF/mois. Économie max : CHF ${canton.economieAn}/an. Données OFSP 2026.`,
  alternates: { canonical: 'https://my-swiss-insurance.ch/lamal/canton/vaud' },
  openGraph: {
    title: 'Assurance maladie à Vaud 2026 : primes, caisses et subsides',
    description: `Prime moyenne ${canton.primeMoyenne} CHF/mois. Économisez jusqu'à CHF ${canton.economieAn}/an en changeant de caisse.`,
    url: 'https://my-swiss-insurance.ch/lamal/canton/vaud',
    type: 'article',
  },
}

export default function VaudPage() {
  return <CantonPage canton={canton} />
}
