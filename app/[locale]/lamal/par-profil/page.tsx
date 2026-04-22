import type { Metadata } from 'next'
import AuthorBio from '@/components/ui/AuthorBio'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FAQ from '@/components/ui/FAQ'
import LeadForm from '@/components/ui/LeadForm'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'LAMal par situation de vie — Salarié, famille, expatrié 2026',
  description:
    'Choisissez votre profil pour des conseils LAMal adaptés : salarié ou indépendant, famille ou retraité, expatrié ou frontalier. Guide 2026.',
  openGraph: {
    title: 'LAMal par situation de vie — Conseils personnalisés 2026',
    description: 'Salarié, famille, expatrié : quelle LAMal choisir selon votre situation ?',
    url: 'https://my-swiss-insurance.ch/lamal/par-profil',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'LAMal par situation de vie : conseils personnalisés 2026',
  datePublished: '2026-01-01',
  dateModified: '2026-04-13',
  author: { '@type': 'Organization', name: 'La rédaction My Swiss Insurance' },
  publisher: { '@type': 'Organization', name: 'My Swiss Insurance' },
}

const faqItems = [
  {
    question: "Comment assurer sa famille en Suisse avec la LAMal ?",
    answer: "Chaque membre de la famille a sa propre assurance LAMal individuelle. Il n'y a pas d'assurance familiale groupée en Suisse. La prime enfant (0–18 ans) est nettement moins élevée. Les enfants peuvent avoir une franchise à 0 CHF. Comparez les caisses séparément pour chaque membre.",
  },
  {
    question: "Un indépendant doit-il souscrire une LAA en plus de la LAMal ?",
    answer: "Oui. Les indépendants ne sont pas couverts automatiquement par la LAA comme les salariés. Sans LAA volontaire, les accidents professionnels et de loisirs sont à la charge de la LAMal, avec des lacunes importantes. Source : art. 3 LAA.",
  },
  {
    question: "Dans quel délai un expatrié doit-il s'affilier à la LAMal ?",
    answer: "Tout résident en Suisse doit s'affilier dans les 90 jours suivant la prise de domicile officielle. Si ce délai est respecté, la couverture est rétroactive à la date d'arrivée. Au-delà, les autorités attribuent d'office une caisse.",
  },
]

const hubCards = [
  {
    href: '/lamal/salarie-independant',
    title: 'Salarié, indépendant et chômage',
    description:
      'Votre statut professionnel influe sur le choix optimal de franchise, de modèle LAMal et sur vos obligations d\'assurance accidents.',
    highlights: [
      'Salarié : LAA couverte par l\'employeur dès 8 h/semaine',
      'Indépendant : LAA volontaire à prévoir séparément',
      'Chômage : droits aux subsides cantonaux souvent renforcés',
    ],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: '/lamal/famille-retraite',
    title: 'Famille, étudiant et retraité',
    description:
      'Chaque étape de la vie appelle une stratégie LAMal différente, de la prime enfant aux options hospitalières pour les seniors.',
    highlights: [
      'Enfants 0–18 ans : franchise 0–100 CHF recommandée',
      'Étudiants 19–25 ans : tarif intermédiaire + Telmed',
      'Retraités : LCA hospitalière fortement conseillée',
    ],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    href: '/lamal/expatrie-frontalier',
    title: 'Expatrié et frontalier',
    description:
      'Délais d\'affiliation, droit d\'option frontalier et spécificités genevoises : tout ce que vous devez savoir à l\'arrivée en Suisse.',
    highlights: [
      'Expatrié : 90 jours pour s\'affilier dès la prise de domicile',
      'Frontalier : droit d\'option à exercer dans les 3 mois',
      'Spécificité GE : frontaliers français et CMU-C cumulable',
    ],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function ParProfilPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <section className="bg-white border-b border-[#e2e8f0] pt-12 pb-10">
        <div className="container-xl">
          <Breadcrumb items={[
            { label: 'Accueil', href: '/' },
            { label: 'LAMal', href: '/lamal' },
            { label: 'Par situation de vie' },
          ]} />
          <h1 className="text-5xl font-bold text-[#0f2040] leading-tight mb-4 max-w-2xl">
            LAMal par situation de vie.
          </h1>
          <p className="text-xl text-[#475569] max-w-2xl leading-relaxed">
            Choisissez votre profil pour accéder à des conseils personnalisés :
            franchise optimale, modèle recommandé et points d'attention spécifiques.
          </p>
        </div>
      </section>

      <div className="container-xl py-16">
        <AuthorBio publishedDate="1er janvier 2026" updatedDate="13 avril 2026" />

        <div className="flex gap-12">
          <div className="flex-1 min-w-0">

            {/* Hub cards */}
            <div className="grid grid-cols-1 gap-6 mb-16">
              {hubCards.map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group flex gap-6 bg-white border border-[#e2e8f0] hover:border-[#1d4ed8] rounded-[12px] p-6 transition-colors duration-150"
                >
                  <div className="w-14 h-14 bg-[#eff6ff] border border-[#bfdbfe] rounded-[10px] flex items-center justify-center text-[#1d4ed8] shrink-0 group-hover:bg-[#dbeafe] transition-colors duration-150">
                    {card.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-[18px] font-semibold text-[#0f2040] mb-2 group-hover:text-[#1d4ed8] transition-colors duration-150">
                      {card.title}
                    </h2>
                    <p className="text-[15px] text-[#475569] leading-relaxed mb-4">
                      {card.description}
                    </p>
                    <ul className="space-y-1.5">
                      {card.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-[14px] text-[#475569]">
                          <svg className="w-3.5 h-3.5 text-[#1d4ed8] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center shrink-0 text-[#1d4ed8]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>

            <FAQ items={faqItems} />

            <section className="mt-14">
              <h3 className="text-[16px] font-semibold text-[#0f2040] mb-3">Voir aussi</h3>
              <div className="flex flex-col gap-2">
                {[
                  { href: '/lamal/guide', label: 'Guide complet LAMal 2026' },
                  { href: '/lamal/comparateur', label: 'Comparateur de caisses' },
                  { href: '/lamal/changer-de-caisse', label: 'Changer de caisse maladie' },
                ].map((link) => (
                  <Link key={link.href} href={link.href}
                    className="text-[15px] text-[#1d4ed8] hover:underline flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {link.label}
                  </Link>
                ))}
              </div>
            </section>
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
