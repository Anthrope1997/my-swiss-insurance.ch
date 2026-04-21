import type { Metadata } from 'next'
import CantonPage from '@/components/CantonPage'
import { cantonBySlug } from '@/lib/canton-data'

const c = cantonBySlug['vaud']
const cheapest = c.topCaisses[0]
const cap = c.capitale!
const capEconMois = cap.mostExpensive.prime - cap.cheapest.prime
const capEconAn   = capEconMois * 12

export const metadata: Metadata = {
  title: 'Assurance maladie dans le canton de Vaud en 2026 : primes, caisses et subsides',
  description:
    `Prime LAMal 2026 à Vaud : ${c.primeMoyenne} CHF/mois en moyenne pour un adulte. ` +
    `À Lausanne, ${cap.cheapest.name} est la caisse la moins chère à ${cap.cheapest.prime} CHF/mois — ` +
    `économie max CHF ${capEconAn}/an vs la plus chère (${cap.mostExpensive.name}, ${cap.mostExpensive.prime} CHF/mois). ` +
    `Jeune adulte : ${c.primeMoyenneJA} CHF/mois. Enfant : ${c.primeMoyenneEnfant} CHF/mois. ` +
    `Subsides jusqu'à CHF ${c.subside.subsideMensuelMax}/mois. ` +
    `${c.rang}e canton le moins cher sur 26. Données OFSP 2026.`,
  alternates: { canonical: 'https://my-swiss-insurance.ch/lamal/canton/vaud' },
  openGraph: {
    title: 'Assurance maladie dans le canton de Vaud en 2026 : primes, caisses et subsides',
    description:
      `Prime moyenne ${c.primeMoyenne} CHF/mois. À Lausanne : ${cap.cheapest.name} à ${cap.cheapest.prime} CHF/mois. ` +
      `Économisez jusqu'à CHF ${capEconAn}/an en changeant de caisse.`,
    url: 'https://my-swiss-insurance.ch/lamal/canton/vaud',
    type: 'article',
  },
}

// ── Schemas GEO ───────────────────────────────────────────────────────────────

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Quelle est la prime LAMal moyenne à Vaud en 2026 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          `La prime LAMal moyenne dans le canton de Vaud en 2026 est de ${c.primeMoyenne} CHF/mois ` +
          `pour un adulte (franchise 300 CHF, modèle standard, source OFSP 2026). ` +
          `Elle varie de ${cheapest.prime} CHF/mois (${cheapest.name}, la moins chère) ` +
          `à ${c.caissePlusChere.prime} CHF/mois (${c.caissePlusChere.name}, la plus chère), ` +
          `soit une différence de CHF ${c.economieAn}/an pour les mêmes prestations de base.`,
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle est la caisse la moins chère à Lausanne en 2026 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          `À Lausanne (région de primes VD1), la caisse d'assurance maladie la moins chère en 2026 est ` +
          `${cap.cheapest.name} à ${cap.cheapest.prime} CHF/mois pour un adulte de 35 ans, franchise 300 CHF, ` +
          `modèle standard (source : OFSP 2026). La caisse la plus chère est ${cap.mostExpensive.name} ` +
          `à ${cap.mostExpensive.prime} CHF/mois — soit CHF ${capEconAn} d'économie par année en changeant de caisse.`,
      },
    },
    {
      '@type': 'Question',
      name: 'Combien coûte la LAMal à Vaud selon le profil en 2026 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          `Dans le canton de Vaud en 2026 (source OFSP), la prime LAMal moyenne varie selon le profil : ` +
          `adulte de 26 ans et plus : ${c.primeMoyenne} CHF/mois ; ` +
          `jeune adulte de 19 à 25 ans : ${c.primeMoyenneJA} CHF/mois ; ` +
          `enfant de 0 à 18 ans : ${c.primeMoyenneEnfant} CHF/mois. ` +
          `Ces montants sont calculés avec une franchise de 300 CHF et le modèle standard, ` +
          `en moyenne sur les deux régions de primes du canton (VD1 et VD2).`,
      },
    },
    {
      '@type': 'Question',
      name: 'Comment obtenir un subside LAMal dans le canton de Vaud ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          `Dans le canton de Vaud, le subside LAMal (réduction individuelle des primes) est attribué sur demande ` +
          `aux personnes dont le revenu déterminant ne dépasse pas environ ${c.subside.seuilRevenu}. ` +
          `Le montant maximum pour un adulte seul est de CHF ${c.subside.subsideMensuelMax}/mois. ` +
          `La demande se fait auprès de la Caisse cantonale vaudoise de compensation (CCVD). ` +
          `Le subside est versé directement à votre caisse-maladie.`,
      },
    },
    {
      '@type': 'Question',
      name: 'Combien peut-on économiser en changeant de caisse LAMal à Vaud ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          `En choisissant la caisse la moins chère (${cheapest.name}, ${cheapest.prime} CHF/mois) ` +
          `plutôt que la plus chère (${c.caissePlusChere.name}, ${c.caissePlusChere.prime} CHF/mois) ` +
          `dans le canton de Vaud, vous économisez CHF ${c.economieAn}/an pour les mêmes prestations LAMal. ` +
          `À Lausanne spécifiquement, l'économie maximale est de CHF ${capEconAn}/an (${capEconMois} CHF/mois).`,
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle franchise choisir pour son assurance maladie à Vaud ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          `Le choix de franchise dépend de votre état de santé. ` +
          `Avec la franchise 2 500 CHF (la plus haute), vous payez moins de prime chaque mois — ` +
          `mais vous supportez jusqu'à 2 500 CHF de frais médicaux par an avant que l'assurance intervienne. ` +
          `Avec la franchise 300 CHF, votre reste à charge est plafonné à CHF 1 000/an maximum (300 CHF de franchise + 700 CHF de quote-part 10 %). ` +
          `Si vous êtes en bonne santé et consultez peu, la franchise 2 500 CHF est généralement avantageuse.`,
      },
    },
    {
      '@type': 'Question',
      name: 'Combien y a-t-il de régions de primes LAMal dans le canton de Vaud ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          `Le canton de Vaud est divisé en 2 régions de primes OFSP. ` +
          `La région VD1 (zone Lausanne–Vevey) affiche une prime moyenne de ${c.regions[0].prime.toFixed(0)} CHF/mois, ` +
          `supérieure à la région VD2 (reste du canton) à ${c.regions[1].prime.toFixed(0)} CHF/mois. ` +
          `Votre prime varie donc selon votre commune de résidence au sein du canton.`,
      },
    },
    {
      '@type': 'Question',
      name: 'Peut-on changer de caisse LAMal en cours d\'année dans le canton de Vaud ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          `Non, le changement de caisse LAMal n'est possible qu'en fin d'année. ` +
          `La date limite ordinaire est le 30 novembre pour un changement au 1er janvier suivant (préavis de 3 mois). ` +
          `Exception : si votre caisse annonce une hausse de prime (généralement en septembre), ` +
          `vous disposez d'un mois supplémentaire pour résilier. ` +
          `La résiliation doit être envoyée par courrier recommandé. Cette règle s'applique dans tous les cantons suisses, y compris Vaud.`,
      },
    },
  ],
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://my-swiss-insurance.ch/lamal/canton/vaud',
  name: 'Assurance maladie dans le canton de Vaud en 2026',
  description: `Comparatif complet des primes LAMal 2026 pour le canton de Vaud : caisses, franchises, subsides et simulateur.`,
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '#top-caisses', '#subsides', '#faq'],
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://my-swiss-insurance.ch' },
      { '@type': 'ListItem', position: 2, name: 'LAMal', item: 'https://my-swiss-insurance.ch/lamal' },
      { '@type': 'ListItem', position: 3, name: 'Canton de Vaud', item: 'https://my-swiss-insurance.ch/lamal/canton/vaud' },
    ],
  },
  mentions: [
    { '@type': 'Organization', name: cheapest.name },
    { '@type': 'Organization', name: cap.cheapest.name },
    {
      '@type': 'City',
      name: 'Lausanne',
      containedInPlace: { '@type': 'AdministrativeArea', name: 'Canton de Vaud', containedInPlace: { '@type': 'Country', name: 'Suisse' } },
    },
  ],
}

export default function VaudPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <CantonPage canton={c} noFaqSchema />
    </>
  )
}
