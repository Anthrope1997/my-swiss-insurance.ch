import type { Metadata } from 'next'
import AuthorBio from '@/components/ui/AuthorBio'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Link from 'next/link'
import UnifiedLeadForm from '@/components/ui/UnifiedLeadForm'

export const metadata: Metadata = {
  title: 'LAMal par situation de vie : Salarié, famille, expatrié 2026',
  robots: { index: false, follow: false },
  description:
    'Choisissez votre profil pour des conseils LAMal adaptés : salarié ou indépendant, famille ou retraité, expatrié ou frontalier. Guide 2026.',
  openGraph: {
    title: 'LAMal par situation de vie : Conseils personnalisés 2026',
    description: 'Salarié, famille, expatrié : quelle LAMal choisir selon votre situation ?',
    url: 'https://my-swiss-insurance.ch/sante/par-profil',
    type: 'website',
  },
  alternates: { canonical: 'https://my-swiss-insurance.ch/sante/par-profil' },
}

const hubCards = [
  {
    href: '/sante/ma-situation',
    title: 'Ma situation professionnelle',
    description:
      "Salarié, indépendant, chômeur ou nouvel arrivant expatrié : votre statut influe sur le choix de franchise, les obligations d'assurance accidents et les droits aux subsides.",
    highlights: [
      "Salarié : LAA couverte par l'employeur dès 8 h/semaine",
      'Indépendant : LAA volontaire à activer via la LAMal',
      'Chômeur : maintien LAMal et subsides prioritaires',
    ],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: '/sante/ma-famille',
    title: 'Ma famille',
    description:
      "Nouveau-né, enfants, jeunes adultes, maternité, retraite : chaque étape de la vie appelle une stratégie LAMal différente. Franchises, couvertures et points d'attention.",
    highlights: [
      'Nouveau-né : affiliation obligatoire dans les 3 mois',
      'Maternité : exonération franchise et quote-part (art. 64 LAMal)',
      'Retraité : LCA hospitalière à anticiper avant 65 ans',
    ],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    href: '/sante/frontalier',
    title: 'Frontaliers',
    description:
      "Frontaliers français, allemands ou italiens : droit d'option LAMal ou système du pays de résidence, formulaire S1, cantons concernés et simulateur de décision.",
    highlights: [
      "Droit d'option à exercer dans les 3 mois",
      'Guides spécifiques par nationalité (FR, DE, IT)',
      'Simulateur de décision personnalisé inclus',
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
      {/* ── 1. HERO ── */}
      <section className="bg-white border-b border-edge pt-12 pb-14">
        <div className="container-xl">
          <Breadcrumb items={[
            { label: 'Accueil', href: '/' },
            { label: 'LAMal', href: '/sante' },
            { label: 'Par situation de vie' },
          ]} />
          <h1 className="text-4xl sm:text-5xl font-bold text-ink leading-tight mb-4">
            LAMal par situation de vie
          </h1>
          <p className="text-[16px] text-slate leading-relaxed">
            Choisissez votre profil pour des conseils personnalisés sur votre assurance maladie de base LAMal :
            franchise optimale, modèle recommandé et points d&apos;attention spécifiques.
          </p>
        </div>
      </section>

      {/* ── 2. HUB CARDS ── */}
      <section className="bg-white py-12">
        <div className="container-xl">
          <div className="grid grid-cols-1 gap-6">
            {hubCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group flex gap-6 bg-white border border-edge hover:border-brand rounded-[12px] p-6 transition-colors duration-150"
              >
                <div className="w-14 h-14 bg-blue-tint border border-brand/20 rounded-[10px] flex items-center justify-center text-brand shrink-0 group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-colors duration-150">
                  {card.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-[18px] font-semibold text-ink mb-2 group-hover:text-brand transition-colors duration-150">
                    {card.title}
                  </h2>
                  <p className="text-[16px] text-slate leading-relaxed mb-4">
                    {card.description}
                  </p>
                  <ul className="space-y-1.5">
                    {card.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-[16px] text-slate">
                        <svg className="w-3.5 h-3.5 text-brand mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center shrink-0 text-brand">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. FORMULAIRE ── */}
      <div className="container-xl">
        <div id="contact" className="scroll-mt-20 border-t border-edge pt-12 mt-4">
          <h2 className="text-2xl font-semibold text-ink hover:text-brand transition-colors mb-3">Besoin d&apos;aide ?</h2>
          <p className="text-[16px] text-slate mb-6 leading-relaxed">
            Un expert vous rappelle sous 24 heures pour établir avec vous une solution
            personnalisée. Gratuit, sans engagement.
          </p>
          <UnifiedLeadForm redirectOnSuccess="/fr/merci" />
        </div>
      </div>

      <div className="container-xl mt-4 pb-12">
        <AuthorBio publishedDate="1er janvier 2026" updatedDate="13 avril 2026" />
      </div>
    </>
  )
}
