import type { Metadata } from 'next'
import ComparateurClient from '@/components/lamal/ComparateurClient'

export const metadata: Metadata = {
  title: 'Comparateur caisses maladie LAMal 2026 — Primes par canton',
  description:
    "Comparez les primes LAMal 2026 par code postal. Trouvez la caisse maladie la moins chère selon votre profil, franchise et modèle. Données officielles OFSP — jusqu'à CHF 2'753 d'économie par an.",
  openGraph: {
    title: 'Comparateur de caisses maladie LAMal 2026',
    description: "Primes LAMal 2026 par canton : comparez et économisez jusqu'à CHF 2'753 par an.",
    url: 'https://my-swiss-insurance.ch/lamal/comparateur',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type':    'Article',
  headline:   'Comparateur de caisses maladie LAMal 2026',
  datePublished: '2026-01-01',
  dateModified:  '2026-04-22',
  author:    { '@type': 'Organization', name: 'My Swiss Insurance' },
  publisher: { '@type': 'Organization', name: 'My Swiss Insurance' },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type':    'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name:    "Quelle est la caisse maladie la moins chère en Suisse ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text:    "La caisse la moins chère dépend de votre canton, de votre âge et du modèle choisi. Les primes débutent à CHF 403 par mois à Zoug et atteignent CHF 710 par mois à Genève pour un adulte avec franchise 300 CHF et modèle standard.",
      },
    },
    {
      '@type': 'Question',
      name:    "Les prestations sont-elles identiques dans toutes les caisses ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text:    "Oui. Pour la LAMal de base, les prestations sont strictement identiques chez tous les assureurs agréés par l'OFSP. Seules les primes et la qualité du service diffèrent.",
      },
    },
    {
      '@type': 'Question',
      name:    "Comment économiser sur sa prime LAMal ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text:    "Choisissez un modèle alternatif (médecin de famille, HMO, Télémédecine) pour jusqu'à 24% de réduction, augmentez votre franchise si vous êtes en bonne santé, et changez de caisse avant le 30 novembre.",
      },
    },
    {
      '@type': 'Question',
      name:    "Frontalier ou expatrié — suis-je concerné par la LAMal ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text:    "Les frontaliers travaillant en Suisse ont en principe le choix entre la LAMal suisse et une assurance dans leur pays de résidence. Les expatriés résidant en Suisse sont soumis à l'obligation d'affiliation dans les 90 jours suivant leur arrivée.",
      },
    },
    {
      '@type': 'Question',
      name:    "Quelle est la différence entre une franchise de 300 et 2 500 CHF ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text:    "Avec une franchise de 300 CHF, la prime est plus élevée mais vous payez moins en cas de soins. Avec une franchise de 2 500 CHF, la prime est nettement plus basse mais vous assumez davantage de frais médicaux. Ce choix est avantageux si vous consultez peu.",
      },
    },
  ],
}

export default function ComparateurPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ComparateurClient />
    </>
  )
}
