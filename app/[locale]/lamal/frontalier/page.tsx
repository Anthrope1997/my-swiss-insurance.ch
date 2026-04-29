import type { Metadata } from 'next'
import AuthorBio from '@/components/ui/AuthorBio'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Link from 'next/link'
import MultiStepLeadForm from '@/components/ui/MultiStepLeadForm'

export const metadata: Metadata = {
  title: 'LAMal pour les frontaliers en Suisse romande 2026',
  description:
    "Guide LAMal frontaliers 2026 : droit d'option pour les frontaliers français, allemands et italiens. Choisissez votre nationalité pour un guide adapté.",
  openGraph: {
    title: 'LAMal pour les frontaliers en Suisse romande 2026',
    description:
      "Frontaliers franco-suisses, germano-suisses ou italo-suisses : guide droit d'option LAMal adapté à votre situation.",
    url: 'https://my-swiss-insurance.ch/lamal/frontalier',
    type: 'website',
  },
  alternates: { canonical: 'https://my-swiss-insurance.ch/lamal/frontalier' },
}

const cards = [
  {
    href: '/lamal/frontalier-france',
    titre: 'Frontalier français',
    description:
      "Droit d'option LAMal ou Sécurité sociale française, cantons concernés (Genève, Vaud, Neuchâtel, Jura, Valais), cas particulier genevois et démarches concrètes.",
    highlights: [
      "Délai d'option : 3 mois dès le début de l'emploi",
      'Cas particulier des frontaliers genevois',
      'Simulateur de décision LAMal / Sécu inclus',
    ],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
      </svg>
    ),
  },
  {
    href: '/lamal/frontalier-allemagne',
    titre: 'Frontalier allemand',
    description:
      "Droit d'option LAMal ou GKV allemand, différences entre les deux systèmes, cantons bâlois et démarches spécifiques aux frontaliers germano-suisses.",
    highlights: [
      'Différences LAMal vs GKV allemand',
      'Cas particuliers des frontaliers bâlois',
      'Simulateur de décision LAMal / GKV inclus',
    ],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
      </svg>
    ),
  },
  {
    href: '/lamal/frontalier-italie',
    titre: 'Frontalier italien',
    description:
      "Droit d'option LAMal ou SSN italien, cantons concernés (Tessin, Grisons, Valais), démarches et comparaison des deux systèmes pour les frontaliers italo-suisses.",
    highlights: [
      'Différences LAMal vs SSN italien',
      'Tessin, Grisons, Valais : cantons concernés',
      'Simulateur de décision LAMal / SSN inclus',
    ],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
      </svg>
    ),
  },
]

export default function FrontalierPage() {
  return (
    <>
      <section className="bg-white border-b border-edge pt-12 pb-14">
        <div className="container-xl">
          <Breadcrumb items={[
            { label: 'Accueil', href: '/' },
            { label: 'LAMal', href: '/lamal' },
            { label: 'Frontaliers' },
          ]} />
          <div className="badge mb-5">Données OFSP 2026</div>
          <h1 className="text-4xl sm:text-5xl font-bold text-ink leading-tight mb-4 max-w-2xl">
            LAMal pour les frontaliers en Suisse romande 2026
          </h1>
          <p className="text-[18px] text-slate max-w-2xl leading-relaxed">
            Les travailleurs frontaliers ont un droit d'option : s'affilier à la LAMal suisse
            ou rester couverts dans leur pays de résidence. Ce choix dépend de la nationalité,
            du canton de travail et de la situation personnelle. Choisissez votre profil
            pour accéder au guide adapté.
          </p>
        </div>
      </section>

      <div className="container-xl py-12">

        {/* Hub cards */}
        <div className="grid grid-cols-1 gap-6 max-w-3xl mb-16">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group flex gap-6 bg-white border border-edge hover:border-brand rounded-[12px] p-6 transition-colors duration-150"
            >
              <div className="w-14 h-14 bg-[#eff6ff] border border-[#bfdbfe] rounded-[10px] flex items-center justify-center text-brand shrink-0 group-hover:bg-[#dbeafe] transition-colors duration-150">
                {card.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-[18px] font-semibold text-ink mb-2 group-hover:text-brand transition-colors duration-150">
                  {card.titre}
                </h2>
                <p className="text-[14px] text-slate leading-relaxed mb-3">{card.description}</p>
                <ul className="space-y-1.5">
                  {card.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px] text-slate">
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

        {/* Contact */}
        <div id="contact" className="scroll-mt-20 border-t border-edge pt-12 mt-4 max-w-3xl">
          <h2 className="text-2xl font-semibold text-ink border-b border-edge pb-4 mb-6">
            Besoin d'aide ?
          </h2>
          <p className="text-[15px] text-slate mb-6 max-w-xl">
            Un expert vous rappelle sous 24 heures pour vous aider à trouver l'assurance maladie la plus adaptée à votre situation. C'est gratuit et sans engagement.
          </p>
          <div className="max-w-xl">
            <MultiStepLeadForm redirectOnSuccess="/fr/merci" />
          </div>
        </div>

        <div className="max-w-3xl">
          <AuthorBio publishedDate="1er janvier 2026" updatedDate="22 avril 2026" />
        </div>

        {/* Guides associés */}
        <section className="mt-8 pt-8 border-t border-edge max-w-3xl">
          <h3 className="text-[15px] font-semibold text-ink mb-4">Guides associés</h3>
          <div className="flex flex-col gap-2">
            {[
              { href: '/lamal/ma-situation', label: 'LAMal selon votre situation professionnelle' },
              { href: '/lamal/par-profil', label: 'LAMal par situation de vie' },
              { href: '/lamal/guide', label: 'Guide complet LAMal 2026' },
            ].map((link) => (
              <Link key={link.href} href={link.href}
                className="text-[15px] text-brand hover:underline flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {link.label}
              </Link>
            ))}
          </div>
        </section>

      </div>
    </>
  )
}
