import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/LeadForm'

export const metadata: Metadata = {
  title: 'LAMal — Assurance maladie de base en Suisse 2026',
  description:
    'Tout sur la LAMal : guide complet, comparateur de caisses, franchise, subsides et comment changer d\'assureur. Informations officielles OFSP 2026.',
  openGraph: {
    title: 'LAMal — Assurance maladie de base en Suisse 2026',
    description:
      'Guide, comparateur et conseils pour votre assurance maladie suisse. Données OFSP 2026.',
    url: 'https://my-swiss-insurance.ch/lamal',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'LAMal — Assurance maladie de base en Suisse 2026',
  description:
    'Hub d\'information sur la LAMal suisse : guide, comparateur, franchise, subsides et changement de caisse maladie.',
  datePublished: '2026-01-01',
  dateModified: '2026-04-01',
  author: { '@type': 'Organization', name: 'My Swiss Insurance' },
  publisher: { '@type': 'Organization', name: 'My Swiss Insurance' },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Qu'est-ce que la LAMal ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "La LAMal (loi fédérale sur l'assurance-maladie) est la loi suisse qui rend l'assurance maladie de base obligatoire pour tous les résidents en Suisse depuis le 1er janvier 1996. Elle garantit un catalogue de prestations standardisées identiques chez tous les assureurs agréés.",
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle est la différence entre LAMal et LCA ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "La LAMal couvre les soins de base obligatoires (médecin, hôpital en division commune, médicaments listés). La LCA (loi sur le contrat d'assurance) régit les assurances complémentaires facultatives — chambre privée, médecine alternative, soins dentaires — dont les prestations varient selon l'assureur.",
      },
    },
    {
      '@type': 'Question',
      name: "Peut-on choisir sa caisse maladie librement en Suisse ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, vous êtes libre de choisir n'importe quelle caisse maladie agréée par l'OFSP. Les assureurs ont l'obligation d'accepter toute personne résidant en Suisse, sans sélection médicale ni exclusions pour la LAMal.",
      },
    },
  ],
}

const sections = [
  {
    href: '/lamal/guide',
    title: 'Guide complet LAMal 2026',
    desc: 'Définition, couverture, primes 2026 par canton, franchises, modèles d\'assurance, subsides et FAQ.',
    icon: '📖',
    badge: 'Essentiel',
  },
  {
    href: '/lamal/comparateur',
    title: 'Comparateur de caisses maladie',
    desc: 'Primes 2026 par canton pour toutes les caisses agréées. Trouvez la moins chère selon votre profil.',
    icon: '⚖️',
    badge: null,
  },
  {
    href: '/lamal/lamal-vs-lca',
    title: 'LAMal vs LCA : quelle différence ?',
    desc: 'Comparez la couverture de base LAMal avec les assurances complémentaires LCA pour décider ce dont vous avez besoin.',
    icon: '🔍',
    badge: null,
  },
  {
    href: '/lamal/changer-de-caisse',
    title: 'Comment changer de caisse maladie',
    desc: 'Procédure de résiliation, dates limites, modèle de lettre et conseils pour changer d\'assureur sans stress.',
    icon: '🔄',
    badge: null,
  },
  {
    href: '/lamal/par-profil',
    title: 'LAMal par profil',
    desc: 'Famille, étudiant, expatrié, retraité, indépendant : la LAMal adaptée à chaque situation de vie.',
    icon: '👤',
    badge: null,
  },
]

export default function LamalHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="bg-primary-light border-b border-blue-100 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-primary">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">LAMal</span>
          </nav>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            LAMal — Assurance maladie de base en Suisse
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            La LAMal est l'assurance maladie obligatoire en Suisse depuis 1996.
            Trouvez ici toutes les informations pour comprendre, comparer et optimiser votre couverture 2026.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">

            {/* Quick intro */}
            <div className="bg-blue-50 border-l-4 border-primary rounded-r-xl p-5 mb-8">
              <h2 className="text-base font-bold text-primary mb-2">Qu'est-ce que la LAMal ?</h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                La <strong>loi fédérale sur l'assurance-maladie (LAMal)</strong> rend l'assurance maladie de base
                obligatoire pour toute personne résidant en Suisse. En vigueur depuis le 1er janvier 1996, elle
                garantit un catalogue de prestations identiques chez tous les 57 assureurs agréés.
                Les primes, elles, varient selon le canton, l'âge et le modèle d'assurance choisi.
              </p>
            </div>

            {/* Section cards */}
            <h2 className="text-xl font-bold mb-5">Explorer la LAMal</h2>
            <div className="space-y-4">
              {sections.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="flex gap-4 card hover:border-primary hover:shadow-md transition-all group"
                >
                  <div className="text-3xl flex-shrink-0">{s.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                        {s.title}
                      </h3>
                      {s.badge && (
                        <span className="badge text-xs">{s.badge}</span>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm">{s.desc}</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-primary flex-shrink-0 mt-1 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>

            {/* Key facts */}
            <h2 className="text-xl font-bold mt-12 mb-5">Chiffres clés LAMal 2026</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {[
                { value: 'CHF 378.70', label: 'Prime moyenne adulte', sub: '/mois, franchise 300 CHF' },
                { value: 'CHF 2\'500', label: 'Franchise maximale', sub: 'pour les adultes' },
                { value: 'CHF 700', label: 'Quote-part max adulte', sub: 'par année' },
                { value: '57', label: 'Assureurs agréés', sub: 'par l\'OFSP' },
                { value: '25–30%', label: 'Bénéficiaires de subsides', sub: 'de la population suisse' },
                { value: '3 mois', label: 'Délai d\'affiliation', sub: 'dès l\'arrivée en Suisse' },
              ].map((f, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="text-xl font-bold text-primary">{f.value}</div>
                  <div className="text-xs font-semibold text-gray-700 mt-1">{f.label}</div>
                  <div className="text-xs text-gray-400">{f.sub}</div>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <h2 className="text-xl font-bold mt-10 mb-5">Questions fréquentes</h2>
            <div className="space-y-4">
              {faqSchema.mainEntity.map((q, i) => (
                <details key={i} className="card cursor-pointer group">
                  <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                    {q.name}
                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="text-gray-600 text-sm mt-3 leading-relaxed">{q.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <LeadForm compact />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
