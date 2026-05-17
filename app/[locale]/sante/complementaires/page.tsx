import type { Metadata } from 'next'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ComparateurComplementairesClient from '@/components/sante/ComparateurComplementairesClient'
import FAQ from '@/components/ui/FAQ'
import NeedHelpSection from '@/components/ui/NeedHelpSection'
import AuthorBio from '@/components/ui/AuthorBio'

export const metadata: Metadata = {
  title: 'Comparateur assurances complémentaires Suisse 2026 — Prix & Prestations',
  description:
    "Comparez les assurances complémentaires suisses (LCA) : hospitalisation, ambulatoire, dentaire, médecines douces. Prix mensuels pour jeune adulte, famille et senior. Données relevées mai 2026.",
  openGraph: {
    title: 'Comparateur assurances complémentaires Suisse 2026',
    description: 'Hospitalisation, ambulatoire, dentaire : comparez prix et prestations de 7 assureurs.',
    url: 'https://my-swiss-insurance.ch/sante/complementaires',
    type: 'article',
  },
  alternates: { canonical: 'https://my-swiss-insurance.ch/sante/complementaires' },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Comparateur assurances complémentaires Suisse 2026',
  datePublished: '2026-05-17',
  dateModified: '2026-05-17',
  author: { '@type': 'Organization', name: 'My Swiss Insurance', url: 'https://my-swiss-insurance.ch' },
  publisher: { '@type': 'Organization', name: 'My Swiss Insurance' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://my-swiss-insurance.ch/sante/complementaires' },
}

const faqItems = [
  {
    question: "Quelle est la différence entre LAMal et LCA ?",
    answer: "La LAMal (assurance de base) est obligatoire pour tous les résidents en Suisse et couvre les soins médicaux essentiels. La LCA (assurance complémentaire) est facultative et améliore cette couverture : chambre privée à l'hôpital, libre choix du médecin-chef, médecines alternatives, soins dentaires ou lunettes.",
  },
  {
    question: "Quand souscrire une complémentaire en Suisse ?",
    answer: "Idéalement le plus tôt possible, en bonne santé. Les assureurs peuvent refuser ou exclure des prestations en cas de maladies préexistantes. La complémentaire hospitalière est particulièrement importante avant une grossesse ou une intervention chirurgicale planifiée.",
  },
  {
    question: "Peut-on changer d'assureur complémentaire à tout moment ?",
    answer: "Non. Contrairement à la LAMal, les contrats LCA ont généralement une durée minimale de 1 à 5 ans. La résiliation est possible à l'échéance avec un préavis de 3 mois. En cas de hausse tarifaire, un droit de résiliation extraordinaire s'applique.",
  },
  {
    question: "La complémentaire hospitalière couvre-t-elle toute la Suisse ?",
    answer: "Oui, pour les produits avec libre choix de l'hôpital. En division générale (ECO), vous pouvez être hospitalisé dans tout hôpital suisse. En division demi-privée ou privée, vous bénéficiez en plus du libre choix du médecin-chef sur l'ensemble du territoire.",
  },
  {
    question: "Les médecines douces sont-elles remboursées par la complémentaire ?",
    answer: "Oui, avec une complémentaire ambulatoire ou médecines douces. La LAMal ne rembourse les médecines alternatives que sous conditions très strictes. Les complémentaires couvrent en général 75% des frais jusqu'à CHF 3 000 à 10 000 par an pour des thérapies reconnues par les listes ASCA ou RME.",
  },
  {
    question: "Vaut-il la peine de souscrire une complémentaire dentaire ?",
    answer: "Cela dépend de votre situation. La LAMal ne couvre pas les soins dentaires (sauf maladies graves). Une complémentaire dentaire est rentable si vous avez des enfants (orthodontie), si vous prévoyez des soins importants, ou si vous souhaitez une couverture de routine. Pour un adulte en bonne santé dentaire, la prime annuelle peut dépasser les remboursements perçus.",
  },
]

export default function ComparateurComplementairesPage() {
  const breadcrumb = [
    { label: 'Accueil', href: '/sante' },
    { label: 'Assurances complémentaires', href: '/sante/complementaires' },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Breadcrumb items={breadcrumb} />

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Comparateur assurances complémentaires Suisse 2026
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Comparez les prix et prestations des principales assurances complémentaires (LCA) en Suisse.
            Tarifs mensuels relevés en mai 2026 pour trois profils types — données directement collectées
            sur les sites des assureurs.
          </p>
        </header>

        <ComparateurComplementairesClient />

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Questions fréquentes sur les assurances complémentaires
          </h2>
          <FAQ items={faqItems} />
        </section>

        <NeedHelpSection />
        <AuthorBio publishedDate="17 mai 2026" updatedDate="17 mai 2026" />
      </div>
    </>
  )
}
