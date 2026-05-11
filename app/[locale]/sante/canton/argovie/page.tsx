import type { Metadata } from 'next'
import CantonPage from '@/components/sante/CantonPage'
import { cantonBySlug } from '@/data/sante/cantons'
import { SUBSIDES_2026 } from '@/lib/data/subsides-2026'

const canton    = cantonBySlug['argovie']
const subsidesAG = SUBSIDES_2026['AG']

const f300  = canton.franchiseTable.find(r => r.franchise === 300)!
const f2500 = canton.franchiseTable.find(r => r.franchise === 2500)!

function fmt(n: number) {
  return n.toLocaleString('fr-CH', { maximumFractionDigits: 0 })
}

// Point de bascule F300 vs F2500 : interpolation linéaire entre E=0 et E=3000
const saving    = f300.cout0  - f2500.cout0           // avantage F2500 à 0 CHF de frais
const crossover = f2500.cout3000 - f300.cout3000       // avantage F300 à 3000 CHF de frais
const breakEven = Math.round(3000 * saving / (saving + crossover))  // ≈ 2193 CHF

const argovieHeroStats = [
  {
    value: `${canton.topCaisses[0].prime} CHF`,
    label: 'Prime adulte la moins chère',
    sub: 'adulte 35 ans, modèle standard, franchise 300 CHF',
  },
  {
    value: `${canton.primeMoyenneEnfant} CHF`,
    label: 'Prime enfant la moins chère',
    sub: 'enfant 0–18 ans, modèle standard, franchise 300 CHF',
  },
  {
    value: `${subsidesAG.montantMaxNum} CHF`,
    label: 'Subside mensuel max.',
    sub: 'barème cantonal 2026',
  },
]

const argovieEnBref = [
  `Avec une franchise de 300 CHF, la prime la moins chère est de ${Math.round(f300.primeMois)} CHF par mois (${fmt(f300.primeAn)} CHF par an).`,
  `Avec une franchise de 2 500 CHF, la prime la moins chère est de ${Math.round(f2500.primeMois)} CHF par mois (${fmt(f2500.primeAn)} CHF par an).`,
  `La franchise 300 CHF devient plus avantageuse si vos frais médicaux dépassent CHF ${fmt(breakEven)} par an.`,
]

export const metadata: Metadata = {
  title: `Assurance maladie en Argovie 2026 : primes, caisses et subsides`,
  description: `Prime moyenne ${canton.primeMoyenne} CHF par mois en Argovie. Caisse la moins chère : ${canton.topCaisses[0].name} dès ${canton.topCaisses[0].prime} CHF par mois. Économie max : CHF ${canton.economieAn}/an. Données OFSP 2026.`,
  alternates: { canonical: 'https://my-swiss-insurance.ch/sante/canton/argovie' },
  openGraph: {
    title: `Assurance maladie en Argovie 2026 : primes, caisses et subsides`,
    description: `Prime moyenne ${canton.primeMoyenne} CHF par mois. Économisez jusqu'à CHF ${canton.economieAn}/an en changeant de caisse.`,
    url: 'https://my-swiss-insurance.ch/sante/canton/argovie',
    type: 'article',
  },
}

export default function ArgoviePage() {
  return (
    <CantonPage
      canton={canton}
      heroIntro={
        <p className="text-[18px] text-slate leading-relaxed mb-8">
          Selon votre caisse actuelle, vous pouvez économiser jusqu&apos;à{' '}
          <strong>CHF {fmt(canton.economieAn)}</strong> par an pour des prestations identiques.
        </p>
      }
      overrideHeroStats={argovieHeroStats}
      overrideEnBref={argovieEnBref}
    />
  )
}
