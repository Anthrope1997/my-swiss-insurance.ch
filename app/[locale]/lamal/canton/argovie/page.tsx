import type { Metadata } from 'next'
import CantonPage from '@/components/lamal/CantonPage'
import { cantonBySlug } from '@/data/lamal/cantons'

const canton = cantonBySlug['argovie']

export const metadata: Metadata = {
  title: `Assurance maladie en Argovie 2026 : primes, caisses et subsides`,
  description: `Prime moyenne ${canton.primeMoyenne} CHF/mois en Argovie. Caisse la moins chère : ${canton.topCaisses[0].name} dès ${canton.topCaisses[0].prime} CHF/mois. Économie max : CHF ${canton.economieAn}/an. Données OFSP 2026.`,
  alternates: { canonical: 'https://my-swiss-insurance.ch/lamal/canton/argovie' },
  openGraph: {
    title: `Assurance maladie en Argovie 2026 : primes, caisses et subsides`,
    description: `Prime moyenne ${canton.primeMoyenne} CHF/mois. Économisez jusqu'à CHF ${canton.economieAn}/an en changeant de caisse.`,
    url: 'https://my-swiss-insurance.ch/lamal/canton/argovie',
    type: 'article',
  },
}

export default function ArgoviePage() {
  return <CantonPage canton={canton} />
}
