import type { Metadata } from 'next'
import CantonPage from '@/components/CantonPage'
import { cantonBySlug } from '@/lib/canton-data'

const canton = cantonBySlug['neuchatel']

export const metadata: Metadata = {
  title: 'Assurance maladie à Neuchâtel 2026 : primes, caisses et subsides',
  description: `Prime moyenne ${canton.primeMoyenne} CHF/mois à Neuchâtel. Caisse la moins chère : ${canton.topCaisses[0].name} dès ${canton.topCaisses[0].prime} CHF/mois. Économie max : CHF ${canton.economieAn}/an. Données OFSP 2026.`,
  openGraph: {
    title: 'Assurance maladie à Neuchâtel 2026 : primes, caisses et subsides',
    description: `Prime moyenne ${canton.primeMoyenne} CHF/mois. Économisez jusqu'à CHF ${canton.economieAn}/an en changeant de caisse.`,
    url: 'https://my-swiss-insurance.ch/lamal/canton/neuchatel',
    type: 'article',
  },
}

export default function NeuchatelPage() {
  return <CantonPage canton={canton} />
}
