import type { Metadata } from 'next'
import CantonPage from '@/components/sante/CantonPage'
import { cantonBySlug } from '@/data/sante/cantons'

const canton = cantonBySlug['schaffhouse']

export const metadata: Metadata = {
  title: `Assurance maladie à Schaffhouse 2026 : primes, caisses et subsides`,
  description: `Prime moyenne ${canton.primeMoyenne} CHF par mois à Schaffhouse. Caisse la moins chère : ${canton.topCaisses[0].name} dès ${canton.topCaisses[0].prime} CHF par mois. Économie max : CHF ${canton.economieAn}/an. Données OFSP 2026.`,
  alternates: { canonical: 'https://my-swiss-insurance.ch/sante/canton/schaffhouse' },
  openGraph: {
    title: `Assurance maladie à Schaffhouse 2026 : primes, caisses et subsides`,
    description: `Prime moyenne ${canton.primeMoyenne} CHF par mois. Économisez jusqu'à CHF ${canton.economieAn}/an en changeant de caisse.`,
    url: 'https://my-swiss-insurance.ch/sante/canton/schaffhouse',
    type: 'article',
  },
}

export default function SchaffhousePage() {
  return <CantonPage canton={canton} />
}
