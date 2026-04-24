import type { Metadata } from 'next'
import Link from 'next/link'
import MultiStepLeadForm from '@/components/ui/MultiStepLeadForm'
import CantonSearch from '@/components/ui/CantonSearch'

export const metadata: Metadata = {
  title: 'Économisez sur votre assurance maladie suisse en 2026 — My Swiss Insurance',
  description:
    'Comparez les primes LAMal 2026 gratuitement. Jusqu\'à 2 753 CHF d\'économie par an à Genève. 34 caisses, données OFSP officielles, résultat immédiat.',
  alternates: { canonical: 'https://my-swiss-insurance.ch' },
  openGraph: {
    title: 'Économisez sur votre assurance maladie suisse en 2026',
    description:
      'Jusqu\'à 2 753 CHF d\'économie par an. Comparez gratuitement 34 caisses LAMal. Données OFSP 2026.',
    url: 'https://my-swiss-insurance.ch',
    type: 'website',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "L'assurance maladie est-elle obligatoire en Suisse ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, la LAMal rend l'assurance maladie obligatoire pour tout résident en Suisse depuis 1996. L'affiliation doit intervenir dans les 3 mois suivant l'arrivée.",
      },
    },
    {
      '@type': 'Question',
      name: 'Combien peut-on économiser en changeant de caisse LAMal ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Jusqu\'à 2 753 CHF par an pour un adulte de 35 ans à Genève (franchise 300 CHF, modèle standard, source OFSP 2026). Les 34 caisses agréées proposent les mêmes prestations de base à des prix très différents selon le canton.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qui a droit à un subside LAMal en Suisse ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '25 à 30 % de la population suisse bénéficie d\'une réduction individuelle des primes (subside). Les conditions varient selon le canton et le revenu déterminant. Un simulateur est disponible sur my-swiss-insurance.ch.',
      },
    },
  ],
}

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'My Swiss Insurance',
  url: 'https://my-swiss-insurance.ch',
  description: 'Comparateur de primes LAMal 2026. Données officielles OFSP pour tous les cantons suisses.',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: 'https://my-swiss-insurance.ch/lamal/comparateur?q={search_term_string}' },
    'query-input': 'required name=search_term_string',
  },
}

// ── Données ──────────────────────────────────────────────────────────────────

const stats = [
  {
    value: "2'753 CHF",
    label: 'Économie annuelle possible',
    sub: 'à Genève, adulte 35 ans',
  },
  {
    value: '34',
    label: 'Caisses comparées',
    sub: 'données OFSP 2026',
  },
  {
    value: '25 à 30 %',
    label: 'Bénéficiaires de subsides',
    sub: 'de la population suisse',
  },
]

const guides = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'Comprendre la LAMal',
    desc: 'Fonctionnement, prestations, primes 2026 par canton et droits de chacun',
    href: '/lamal/guide',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    title: 'Choisir sa franchise',
    desc: 'Trouvez la franchise la plus avantageuse selon vos frais médicaux habituels',
    href: '/lamal/franchise',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    title: 'Les 4 modèles d\'assurance',
    desc: 'Standard, médecin de famille, HMO, Telmed : jusqu\'à 24 % d\'économie sur la prime',
    href: '/lamal/modeles',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    title: 'LAMal vs complémentaire',
    desc: 'Obligatoire ou facultative, quand souscrire une LCA et pour quel profil',
    href: '/lamal/lamal-vs-lca',
  },
]

const situations = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: 'Ma situation',
    desc: 'Salarié, indépendant, chômeur, nouvel arrivant',
    href: '/lamal/ma-situation',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Ma famille',
    desc: 'Enfants, maternité, jeunes adultes, retraite',
    href: '/lamal/ma-famille',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Frontaliers',
    desc: 'Droit d\'option, LAMal ou système du pays de résidence',
    href: '/lamal/frontalier',
  },
]

const cantonCards = [
  {
    rang: '1er',
    nom: 'Zurich',
    primeMin: '412',
    economieAn: "1'243",
    href: null,
  },
  {
    rang: '2e',
    nom: 'Berne',
    primeMin: '389',
    economieAn: '987',
    href: null,
  },
  {
    rang: '3e',
    nom: 'Vaud',
    primeMin: '591',
    economieAn: "1'347",
    href: '/lamal/canton/vaud',
  },
  {
    rang: '4e',
    nom: 'Genève',
    primeMin: '594',
    economieAn: "2'753",
    href: '/lamal/canton/geneve',
  },
]

const aproposFaits = [
  {
    label: 'Source des données',
    desc: 'Données officielles de l\'OFSP et des 26 cantons suisses',
  },
  {
    label: 'Couverture',
    desc: 'Toutes les caisses agréées en Suisse, pour chaque canton',
  },
  {
    label: 'Mise à jour',
    desc: 'Chaque automne après la publication des nouvelles primes par l\'OFSP',
  },
  {
    label: 'Service',
    desc: 'Comparer les primes est gratuit et immédiat, se faire conseiller par un expert aussi',
  },
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }} />

      {/* ── 1. HERO ────────────────────────────────────────────────────────── */}
      <section className="bg-white pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="container-xl max-w-4xl">

          <div className="badge mb-5">Données OFSP · Suisse · 2026</div>

          <h1 className="text-4xl sm:text-5xl font-bold text-ink leading-tight mb-5 max-w-2xl">
            Économisez sur votre assurance maladie suisse en 2026
          </h1>

          <p className="text-[18px] text-slate leading-relaxed mb-8 max-w-2xl">
            En Suisse, toutes les caisses couvrent les mêmes prestations de base. Seul le prix
            diffère, jusqu'à 2 753 CHF par an d'écart pour un même profil à Genève.
            Comparez gratuitement et trouvez la caisse la moins chère pour votre situation.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-x-8 gap-y-5 mb-10 pb-10 border-b border-edge">
            {stats.map(s => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-ink leading-none">{s.value}</div>
                <div className="text-[13px] font-medium text-ink/80 mt-0.5">{s.label}</div>
                <div className="text-[12px] text-slate">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:items-start">
            <div className="flex flex-col items-start gap-1.5">
              <Link href="/lamal/comparateur" className="btn-primary text-[15px] py-3.5 px-7">
                Comparer les primes gratuitement
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <span className="text-[12px] text-slate/60 pl-1">Résultat immédiat, sans inscription</span>
            </div>
            <div className="flex flex-col items-start gap-1.5">
              <Link href="/merci" className="btn-secondary text-[15px] py-3.5 px-7">
                Être rappelé par un expert sous 24h
              </Link>
              <span className="text-[12px] text-slate/60 pl-1">Gratuit, sans engagement</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── 2. GUIDES LAMAL ─────────────────────────────────────────────────── */}
      <section className="bg-cloud border-y border-edge py-20">
        <div className="container-xl">

          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl font-bold text-ink leading-tight mb-4">
              Tout comprendre sur l'assurance maladie suisse
            </h2>
            <p className="text-[17px] text-slate leading-relaxed">
              La LAMal est obligatoire pour tous les résidents en Suisse depuis 1996. Franchises,
              modèles alternatifs, subsides cantonaux : nos guides couvrent chaque aspect avec
              des données officielles OFSP.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {guides.map(g => (
              <Link
                key={g.href} href={g.href}
                className="group flex flex-col bg-white border border-edge rounded-xl p-6
                           hover:border-brand hover:shadow-md transition-all duration-200"
              >
                <div className="w-9 h-9 bg-[#dbeafe] border border-[#1d4ed8]/20 rounded-lg
                                flex items-center justify-center text-brand mb-4
                                group-hover:bg-brand group-hover:text-white group-hover:border-brand
                                transition-colors duration-200">
                  {g.icon}
                </div>
                <h3 className="font-semibold text-ink text-[16px] mb-2
                               group-hover:text-brand transition-colors">
                  {g.title}
                </h3>
                <p className="text-slate text-[14px] leading-relaxed flex-1">{g.desc}</p>
                <div className="flex items-center gap-1 mt-4 text-brand text-[13px] font-medium">
                  Lire le guide
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* Nudge */}
          <div className="bg-white border border-edge rounded-xl px-8 py-6 flex flex-col sm:flex-row
                          sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-ink text-[16px]">Vous souhaitez changer de caisse ?</p>
              <p className="text-slate text-[14px] mt-0.5">
                Un expert s'en occupe pour vous : démarches, résiliation et souscription incluses
              </p>
            </div>
            <Link href="/merci" className="btn-primary text-[14px] whitespace-nowrap shrink-0">
              Prendre rendez-vous →
            </Link>
          </div>

        </div>
      </section>

      {/* ── 3. PAR SITUATION DE VIE ─────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="container-xl">

          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl font-bold text-ink leading-tight mb-4">
              Des conseils adaptés à votre profil
            </h2>
            <p className="text-[17px] text-slate leading-relaxed">
              Votre situation personnelle détermine la stratégie LAMal optimale. Franchise, modèle
              et éligibilité aux subsides varient selon votre profil.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {situations.map(s => (
              <Link
                key={s.href} href={s.href}
                className="group flex flex-col bg-white border border-edge rounded-xl p-6
                           hover:border-brand hover:shadow-md transition-all duration-200"
              >
                <div className="w-9 h-9 bg-[#dbeafe] border border-[#1d4ed8]/20 rounded-lg
                                flex items-center justify-center text-brand mb-4
                                group-hover:bg-brand group-hover:text-white group-hover:border-brand
                                transition-colors duration-200">
                  {s.icon}
                </div>
                <h3 className="font-semibold text-ink text-[17px] mb-2
                               group-hover:text-brand transition-colors">
                  {s.title}
                </h3>
                <p className="text-slate text-[15px] leading-relaxed flex-1">{s.desc}</p>
                <div className="flex items-center gap-1 mt-5 text-brand text-[13px] font-medium">
                  Découvrir
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. PAR CANTON ───────────────────────────────────────────────────── */}
      <section className="bg-cloud border-y border-edge py-20">
        <div className="container-xl">

          <div className="max-w-2xl mb-8">
            <h2 className="text-3xl font-bold text-ink leading-tight mb-4">
              Primes et économies par canton en 2026
            </h2>
            <p className="text-[17px] text-slate leading-relaxed">
              Sélectionnez votre canton pour accéder aux données détaillées : primes, classement
              des caisses et simulateur de subsides. Adulte 35 ans, modèle standard,
              franchise 300 CHF. Source OFSP 2026.
            </p>
          </div>

          <div className="mb-10">
            <CantonSearch />
          </div>

          {/* 4 cantons les plus peuplés */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {cantonCards.map(c => (
              <div key={c.nom}
                className="bg-white border border-edge rounded-xl p-6 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[12px] font-semibold text-slate/60 uppercase tracking-wide">
                    {c.rang} canton
                  </span>
                </div>
                <p className="font-bold text-ink text-[20px] mb-1">{c.nom}</p>
                <p className="text-slate text-[13px] mb-4">
                  À partir de <span className="font-semibold text-ink">{c.primeMin} CHF</span>/mois
                </p>
                <div className="bg-[#eff6ff] rounded-lg px-3 py-2 mb-5">
                  <p className="text-[12px] text-brand font-medium">Économie possible</p>
                  <p className="text-[18px] font-bold text-ink leading-tight">
                    {c.economieAn} CHF/an
                  </p>
                </div>
                {c.href
                  ? (
                    <Link href={c.href}
                      className="mt-auto text-[13px] font-medium text-brand hover:underline">
                      Consulter la page canton →
                    </Link>
                  ) : (
                    <span className="mt-auto text-[13px] text-slate/50">
                      Page bientôt disponible
                    </span>
                  )
                }
              </div>
            ))}
          </div>

          {/* Nudge */}
          <div className="text-center">
            <p className="text-[15px] text-slate mb-3">
              Vous souhaitez comparer toutes les caisses pour un profil précis ?
            </p>
            <Link href="/lamal/comparateur" className="btn-primary text-[14px]">
              Ouvrir le comparateur →
            </Link>
          </div>

        </div>
      </section>

      {/* ── 5. À PROPOS ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="container-xl">

          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl font-bold text-ink leading-tight mb-4">
              Une source de référence sur la LAMal en Suisse
            </h2>
            <p className="text-[17px] text-slate leading-relaxed">
              My Swiss Insurance publie des données officielles OFSP pour aider les résidents,
              expatriés et frontaliers à prendre des décisions éclairées. Toutes les données
              sont sourcées et mises à jour chaque année.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aproposFaits.map(f => (
              <div key={f.label} className="border-t-2 border-brand pt-5">
                <p className="text-[12px] font-semibold text-brand uppercase tracking-wide mb-2">
                  {f.label}
                </p>
                <p className="text-[15px] text-slate leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 6. FORMULAIRE ───────────────────────────────────────────────────── */}
      <section id="formulaire" className="bg-cloud border-y border-edge py-20">
        <div className="container-xl max-w-2xl">

          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-ink leading-tight mb-4">
              Vous préférez qu'on s'occupe de tout ?
            </h2>
            <p className="text-[17px] text-slate leading-relaxed">
              Un expert analyse votre profil, trouve la meilleure caisse pour votre situation
              et gère le changement de votre côté. Gratuit, sans engagement, réponse sous
              24 heures.
            </p>
          </div>

          <MultiStepLeadForm redirectOnSuccess="/merci" />

        </div>
      </section>
    </>
  )
}
