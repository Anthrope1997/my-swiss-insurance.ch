import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/LeadForm'

export const metadata: Metadata = {
  title: 'LAMal 2026 — Assurance maladie de base en Suisse',
  description:
    'Hub LAMal : guide complet, comparateur de caisses, franchise, subsides et changement d\'assureur. Informations officielles OFSP 2026.',
  openGraph: {
    title: 'LAMal — Assurance maladie de base en Suisse 2026',
    description: 'Tout sur la LAMal suisse. Données OFSP 2026.',
    url: 'https://my-swiss-insurance.ch/lamal',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'LAMal — Assurance maladie de base en Suisse 2026',
  datePublished: '2026-01-01',
  dateModified: '2026-04-01',
  author: { '@type': 'Organization', name: 'My Swiss Insurance' },
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
        text: "La LAMal est la loi fédérale sur l'assurance-maladie, en vigueur depuis le 1er janvier 1996. Elle rend l'assurance maladie de base obligatoire pour tous les résidents en Suisse et garantit un catalogue de prestations standardisées identiques chez les 57 assureurs agréés.",
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle est la différence entre LAMal et LCA ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "La LAMal est l'assurance de base obligatoire couvrant les soins essentiels. La LCA (loi sur le contrat d'assurance) régit les assurances complémentaires facultatives : chambre privée, médecine alternative, soins dentaires. Les prestations varient selon l'assureur.",
      },
    },
    {
      '@type': 'Question',
      name: "Peut-on choisir librement sa caisse maladie ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, vous êtes libre de choisir n'importe quelle caisse agréée par l'OFSP. Les assureurs ont l'obligation d'accepter tout résident en Suisse, sans sélection médicale pour la LAMal.",
      },
    },
  ],
}

const sections = [
  {
    href: '/lamal/guide',
    title: 'Comprendre la LAMal',
    desc: 'Définition, couverture, primes 2026 par canton, franchises, modèles d\'assurance, subsides et FAQ.',
    badge: 'Essentiel',
  },
  {
    href: '/lamal/changer-de-caisse',
    title: 'Changer de caisse maladie',
    desc: 'Procédure de résiliation, dates limites, modèle de lettre et conseils pratiques.',
    badge: null,
  },
  {
    href: '/lamal/lamal-vs-lca',
    title: 'LAMal vs assurance complémentaire',
    desc: 'Couverture de base vs assurances complémentaires : ce qui est obligatoire et ce qui est facultatif.',
    badge: null,
  },
  {
    href: '/lamal/par-profil',
    title: 'LAMal par situation de vie',
    desc: 'Famille, étudiant, expatrié, retraité, indépendant : la LAMal adaptée à chaque situation.',
    badge: null,
  },
]

const keyFacts = [
  { value: 'CHF 378.70', label: 'Prime moyenne adulte', sub: '/mois, franchise 300 CHF' },
  { value: 'CHF 2\'500', label: 'Franchise maximale', sub: 'pour les adultes' },
  { value: 'CHF 700', label: 'Quote-part max adulte', sub: 'par année' },
  { value: '57', label: 'Assureurs agréés', sub: 'par l\'OFSP' },
  { value: '25–30%', label: 'Bénéficiaires subsides', sub: 'de la population' },
  { value: '3 mois', label: 'Délai d\'affiliation', sub: 'dès l\'arrivée en Suisse' },
]

export default function LamalHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Page header */}
      <section className="bg-white border-b border-edge pt-12 pb-10">
        <div className="container-xl">
          <nav className="flex items-center gap-2 text-[13px] text-slate mb-6">
            <Link href="/" className="hover:text-ink transition-colors">Accueil</Link>
            <span className="text-edge">/</span>
            <span className="text-ink">LAMal</span>
          </nav>
          <div className="badge mb-4">Données OFSP · Mis à jour 2026</div>
          <h1 className="text-5xl font-bold text-ink leading-tight mb-4 max-w-2xl">
            LAMal : assurance maladie de base en Suisse.
          </h1>
          <p className="text-xl text-slate max-w-2xl leading-relaxed">
            Tout ce qu'il faut savoir sur l'assurance maladie obligatoire suisse :
            guide, comparateur, franchises et changement d'assureur.
          </p>
        </div>
      </section>

      <div className="container-xl py-16">
        <div className="flex gap-12">

          <div className="flex-1 min-w-0 space-y-14">

            {/* Intro */}
            <div className="callout">
              <p className="font-semibold text-ink mb-1">En bref : la LAMal</p>
              <p className="text-[15px] leading-relaxed">
                La <strong>loi fédérale sur l'assurance-maladie (LAMal)</strong>, en vigueur depuis le
                1<sup>er</sup> janvier 1996, rend l'assurance maladie obligatoire pour toute personne
                résidant en Suisse. Les prestations de base sont <strong>identiques chez tous les assureurs</strong>,
                mais les primes varient selon le canton, l'âge et le modèle choisi.
              </p>
            </div>

            {/* Section cards */}
            <div>
              <h2 className="text-2xl font-semibold text-ink mb-6">Explorer la LAMal</h2>
              <div className="space-y-3">
                {sections.map((s) => (
                  <Link key={s.href} href={s.href}
                    className="flex items-center gap-5 bg-white border border-edge rounded-[8px] px-6 py-5 hover:border-brand transition-colors duration-150 group">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-semibold text-ink text-[16px] group-hover:text-brand transition-colors">
                          {s.title}
                        </span>
                        {s.badge && (
                          <span className="badge text-[11px] py-0.5">{s.badge}</span>
                        )}
                      </div>
                      <p className="text-[14px] text-slate leading-relaxed">{s.desc}</p>
                    </div>
                    <svg className="w-4 h-4 text-edge group-hover:text-brand shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>

            {/* Key facts */}
            <div>
              <h2 className="text-2xl font-semibold text-ink mb-6">Chiffres clés LAMal 2026</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {keyFacts.map((f, i) => (
                  <div key={i} className="bg-cloud border border-edge rounded-[8px] p-5 text-center">
                    <div className="text-2xl font-bold text-brand mb-1">{f.value}</div>
                    <div className="text-[13px] font-medium text-ink">{f.label}</div>
                    <div className="text-[12px] text-slate mt-0.5">{f.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-2xl font-semibold text-ink mb-6">Questions fréquentes</h2>
              <div className="divide-y divide-edge border border-edge rounded-[8px] overflow-hidden">
                {faqSchema.mainEntity.map((q, i) => (
                  <details key={i} className="group bg-white">
                    <summary className="flex justify-between items-center px-6 py-5 cursor-pointer list-none hover:bg-cloud transition-colors">
                      <span className="font-medium text-ink text-[16px] pr-4">{q.name}</span>
                      <svg className="w-4 h-4 text-slate shrink-0 group-open:rotate-180 transition-transform duration-200"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-5 text-[15px] text-slate leading-relaxed border-t border-edge pt-4">
                      {q.acceptedAnswer.text}
                    </div>
                  </details>
                ))}
              </div>
            </div>

          </div>

          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <LeadForm compact />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
