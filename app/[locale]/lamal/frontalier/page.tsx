import type { Metadata } from 'next'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'LAMal pour les frontaliers en Suisse romande 2026',
  description:
    'Guide LAMal frontaliers 2026 : droit d\'option pour les frontaliers français, allemands et italiens. Choisissez votre nationalité pour un guide adapté.',
  openGraph: {
    title: 'LAMal pour les frontaliers en Suisse romande 2026',
    description:
      'Frontaliers franco-suisses, germano-suisses ou italo-suisses : guide droit d\'option LAMal adapté à votre situation.',
    url: 'https://my-swiss-insurance.ch/lamal/frontalier',
    type: 'website',
  },
}

const cards = [
  {
    href: '/lamal/frontalier-france',
    titre: 'Frontalier français',
    description:
      'Droit d\'option LAMal ou Sécurité sociale française, cantons concernés (Genève, Vaud, Neuchâtel, Jura, Valais), cas particulier genevois et démarches concrètes.',
    highlights: [
      'Délai d\'option : 3 mois dès le début de l\'emploi',
      'Cas particulier des frontaliers genevois',
      'Formulaire S1 si vous optez pour la France',
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
      'Droit d\'option LAMal ou GKV allemand, différences entre les deux systèmes, cantons bâlois et démarches spécifiques aux frontaliers germano-suisses.',
    highlights: [
      'Différences LAMal vs système GKV allemand',
      'Cas particuliers des frontaliers bâlois',
      'Délai d\'option : 3 mois dès le début de l\'emploi',
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
      'Droit d\'option LAMal ou SSN italien, cantons concernés (Tessin, Grisons, Valais), démarches et comparaison des deux systèmes pour les frontaliers italo-suisses.',
    highlights: [
      'Différences LAMal vs système SSN italien',
      'Tessin, Grisons, Valais : cantons concernés',
      'Délai d\'option : 3 mois dès le début de l\'emploi',
    ],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
      </svg>
    ),
  },
  {
    href: '/lamal/frontalier-choix-assurance',
    titre: 'LAMal ou système du pays de résidence ?',
    description:
      'Tableau comparatif et simulateur de décision en 5 questions pour choisir entre la LAMal suisse et le système d\'assurance de votre pays de résidence.',
    highlights: [
      'Tableau comparatif LAMal vs pays de résidence',
      'Simulateur de décision personnalisé',
      'Critères financiers, pratiques et familiaux',
    ],
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
]

export default function FrontalierPage() {
  return (
    <>
      <section className="bg-white border-b border-edge pt-12 pb-10">
        <div className="container-xl">
          <Breadcrumb items={[
            { label: 'Accueil', href: '/' },
            { label: 'LAMal', href: '/lamal' },
            { label: 'Frontaliers' },
          ]} />
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="badge">Données OFSP · 2026</span>
          </div>
          <h1 className="text-5xl font-bold text-ink leading-tight mb-4 max-w-2xl">
            LAMal pour les frontaliers en Suisse romande 2026.
          </h1>
          <p className="text-xl text-slate max-w-2xl leading-relaxed">
            Les travailleurs frontaliers ont un droit d'option : s'affilier à la LAMal suisse
            ou rester couverts dans leur pays de résidence. Ce choix dépend de la nationalité,
            du canton de travail et de la situation personnelle. Choisissez votre profil
            pour accéder au guide adapté.
          </p>
        </div>
      </section>

      <div className="container-xl py-16">
        <div className="grid grid-cols-1 gap-6 max-w-3xl">
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
      </div>
    </>
  )
}
