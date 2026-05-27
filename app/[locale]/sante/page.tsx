import type { Metadata } from 'next'
import Link from 'next/link'
import UnifiedLeadForm from '@/components/ui/UnifiedLeadForm'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FAQ from '@/components/ui/FAQ'
import HeroStats from '@/components/ui/HeroStats'
import AuthorBio from '@/components/ui/AuthorBio'
import { economieMax, economieMoyenne, subsideMoyen } from '@/lib/sante/formules'
import { formatChf } from '@/lib/shared/formatters'

export const metadata: Metadata = {
  title: 'Primes LAMal 2026 : comparez et économisez',
  description:
    'Comparez les primes LAMal 2026 gratuitement. Jusqu\'à CHF 5 604 d\'économie par an. 34 caisses, données OFSP officielles, résultat immédiat.',
  alternates: { canonical: 'https://my-swiss-insurance.ch/sante' },
  openGraph: {
    title: 'Primes LAMal 2026 : comparez et économisez',
    description:
      'Jusqu\'à CHF 5 604 d\'économie par an. Comparez gratuitement 34 caisses LAMal. Données OFSP 2026.',
    url: 'https://my-swiss-insurance.ch/sante',
    type: 'website',
  },
}

const faqItems = [
  {
    question: "L'assurance maladie est-elle obligatoire en Suisse ?",
    answer: "Oui, la LAMal rend l'assurance maladie obligatoire pour tout résident en Suisse depuis 1996. L'affiliation doit intervenir dans les 3 mois suivant l'arrivée.",
  },
  {
    question: 'Combien peut-on économiser en changeant de caisse LAMal ?',
    answer: "Jusqu'à CHF 5 604 par an pour un adulte de 35 ans (toutes franchises et modèles confondus, source OFSP 2026). Les 34 caisses agréées proposent les mêmes prestations de base à des prix très différents selon le canton.",
  },
  {
    question: 'Qui a droit à un subside LAMal en Suisse ?',
    answer: "28 % de la population suisse bénéficient d'une réduction individuelle des primes (subside). Les conditions varient selon le canton et le revenu déterminant. Un simulateur est disponible sur my-swiss-insurance.ch.",
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'My Swiss Insurance',
  url: 'https://my-swiss-insurance.ch',
  description: 'Comparateur de primes LAMal 2026. Données officielles OFSP pour tous les cantons suisses.',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: 'https://my-swiss-insurance.ch/sante/comparateur?q={search_term_string}' },
    'query-input': 'required name=search_term_string',
  },
}

// ── Données ──────────────────────────────────────────────────────────────────

const stats = [
  { value: `CHF ${formatChf(economieMax() * 12)}/an`,     label: 'Économie maximale réalisable'            , sub: 'Assurance LAMal, adulte 35 ans' },
  { value: `CHF ${formatChf(economieMoyenne() * 12)}/an`, label: 'Économie moyenne réalisable'             ,  sub: 'Assurance LAMal, adulte 35 ans' },
  { value: `CHF ${formatChf(subsideMoyen() * 12)}/an`,    label: 'Subside cantonal moyen',      sub: 'Pour les 28 % qui en bénéficient'   },
]

const guides = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'Comprendre la LAMal',
    desc: 'Fonctionnement, prestations, subsides et primes 2026 par canton',
    href: '/sante/guide',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    title: 'Choisir sa franchise',
    desc: 'Trouvez la franchise la plus avantageuse en fonction de vos frais médicaux',
    href: '/sante/franchise',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
    title: "Les 4 modèles d'assurance",
    desc: "Modèles standard, médecin de famille, centre médical, télémédecine : jusqu'à 22 % d'économie sur vos primes",
    href: '/sante/modeles',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    title: 'LAMal vs complémentaire',
    desc: "La complémentaire vous couvre là où l'assurance maladie LAMal obligatoire s'arrête",
    href: '/sante/lamal-vs-lca',
  },
]

const aproposFaits = [
  {
    label: 'Source des données',
    desc: "Données officielles de l'OFSP, des 26 cantons suisses et des caisses maladie",
  },
  {
    label: 'Couverture',
    desc: 'Toutes les caisses agréées en Suisse, pour chaque canton',
  },
  {
    label: 'Mise à jour',
    desc: "Chaque automne après la publication des nouvelles primes par l'OFSP",
  },
  {
    label: 'Service',
    desc: 'Comparer les primes est gratuit et immédiat, se faire conseiller par un expert aussi',
  },
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default function LamalPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }} />

      {/* ── 1. HERO ────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-edge pt-10 pb-12">
        <div className="container-xl">

          <Breadcrumb items={[
            { label: 'Accueil', href: '/' },
            { label: 'LAMal' },
          ]} />

          <h1 className="text-4xl sm:text-5xl font-bold text-ink leading-tight mb-4">
            Économisez sur votre prime LAMal en 2026
          </h1>

          <p className="text-[16px] text-slate leading-relaxed mb-8">
            Toutes les caisses couvrent les mêmes prestations de base : seul le prix change,
            jusqu’à <strong>CHF 5 604 par an d’écart</strong> pour un même profil.
            Comparez les assureurs, ajustez votre franchise et adaptez votre modèle d’assurance
            à votre situation pour réduire votre prime.
          </p>

          {/* Stats */}
          <HeroStats stats={stats} className="mb-10" />

        </div>
      </section>

      {/* ── 2. GUIDES LAMAL ─────────────────────────────────────────────────── */}
      <section className="bg-white py-12">
        <div className="container-xl">

          <div className="mb-6">
            <h2 className="text-3xl font-bold text-ink leading-tight mb-4">
              Tout comprendre sur l'assurance maladie suisse
            </h2>
            <p className="text-[16px] text-slate leading-relaxed">
              L&apos;assurance maladie de base LAMal est obligatoire pour tous les résidents en Suisse depuis
              1996. Franchise, modèle de soins, subsides cantonaux : nos guides détaillent chaque levier
              pour réduire vos primes tout en restant bien protégé en cas de frais médicaux.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {guides.map(g => (
              <Link
                key={g.href} href={g.href}
                className="group flex flex-col bg-white border border-edge rounded-xl p-6
                           hover:border-brand hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="mb-4">
                  <div className="w-9 h-9 bg-blue-tint border border-brand/20 rounded-lg
                                  flex items-center justify-center text-brand
                                  group-hover:bg-brand group-hover:text-white group-hover:border-brand
                                  transition-colors duration-200">
                    {g.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-ink text-[16px] mb-2
                               group-hover:text-brand transition-colors">
                  {g.title}
                </h3>
                <p className="text-slate text-[16px] leading-relaxed flex-1">{g.desc}</p>
                <div className="flex items-center gap-1 mt-4 text-brand text-[16px] font-medium">
                  Lire le guide
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

      {/* ── 3. OUTILS ──────────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-edge py-12">
        <div className="container-xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-ink leading-tight mb-4">
              Comparer les primes et simuler vos subsides en 2026
            </h2>
            <p className="text-[16px] text-slate leading-relaxed">
              Nos outils s&apos;appuient sur les données officielles de l&apos;OFSP, des 26 cantons et des 34 caisses agréées.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Card 1 — Comparateur (ti-chart-bar) */}
            <div className="group bg-white border border-edge rounded-xl px-6 py-6 flex flex-col hover:border-brand hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
              <div className="w-9 h-9 bg-blue-tint border border-brand/20 rounded-lg flex items-center justify-center text-brand mb-4 group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M3 13a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6h-6z" />
                  <path d="M9 9a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10h-6z" />
                  <path d="M15 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14h-6z" />
                  <path d="M4 20h14" />
                </svg>
              </div>
              <p className="text-[12px] font-bold text-brand uppercase tracking-widest mb-4">
                Comparateur de primes LAMal
              </p>
              <p className="text-[16px] text-slate leading-relaxed mb-3">
                Les 34 caisses LAMal couvrent toutes les mêmes prestations de base : seul le prix de votre prime change d&apos;une caisse à l&apos;autre.
              </p>
              <p className="text-2xl font-bold text-brand leading-none mb-0.5">CHF {formatChf(economieMax() * 12)}</p>
              <p className="text-[16px] text-slate mb-6">d&apos;économie maximale en Suisse par an</p>
              <Link href="/sante/comparateur" className="flex items-center gap-1 mt-auto text-brand text-[16px] font-medium">
                Comparer les primes
                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Card 2 — Simulateur de subsides (ti-calculator) */}
            <div className="group bg-white border border-edge rounded-xl px-6 py-6 flex flex-col hover:border-brand hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
              <div className="w-9 h-9 bg-blue-tint border border-brand/20 rounded-lg flex items-center justify-center text-brand mb-4 group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 3m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                  <path d="M8 7m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z" />
                  <path d="M8 14l0 .01" />
                  <path d="M12 14l0 .01" />
                  <path d="M16 14l0 .01" />
                  <path d="M8 17l0 .01" />
                  <path d="M12 17l0 .01" />
                  <path d="M16 17l0 .01" />
                </svg>
              </div>
              <p className="text-[12px] font-bold text-brand uppercase tracking-widest mb-4">
                Simulateur de subsides
              </p>
              <p className="text-[16px] text-slate leading-relaxed mb-3">
                Le subside est une aide cantonale qui réduit votre prime LAMal selon votre canton et votre revenu fiscal.
              </p>
              <p className="text-2xl font-bold text-brand leading-none mb-0.5">28 %</p>
              <p className="text-[16px] text-slate mb-6">des assurés bénéficient d&apos;un subside</p>
              <Link href="/sante/subsides" className="flex items-center gap-1 mt-auto text-brand text-[16px] font-medium">
                Calculer mon subside
                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── 5. À PROPOS ─────────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-edge py-12">
        <div className="container-xl">

          <div className="mb-6">
            <h2 className="text-3xl font-bold text-ink leading-tight mb-4">
              Source de référence sur la LAMal en Suisse
            </h2>
            <p className="text-[16px] text-slate leading-relaxed">
              My Swiss Insurance s'appuie sur les données officielles de l'Office fédéral de la
              santé publique (OFSP), des cantons et des caisses maladie. Chaque résident, expatrié
              ou frontalier peut ainsi identifier la couverture la plus adaptée à sa situation.
              Toutes les informations sont mises à jour chaque année.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aproposFaits.map(f => (
              <div key={f.label} className="border-t-2 border-brand pt-5">
                <p className="text-[12px] font-semibold text-brand uppercase tracking-wide mb-2">
                  {f.label}
                </p>
                <p className="text-[16px] text-slate leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 6. FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-edge py-12">
        <div className="container-xl">
          <FAQ items={faqItems} title="Questions fréquentes sur la LAMal" />
        </div>
      </section>

      {/* ── 7. FORMULAIRE ───────────────────────────────────────────────────── */}
      <div className="container-xl">
        <div id="contact" className="scroll-mt-20 border-t border-edge pt-12 mt-4">
          <h2 className="text-2xl font-semibold text-ink hover:text-brand transition-colors mb-3">Besoin d'aide ?</h2>
          <p className="text-[16px] text-slate mb-6 leading-relaxed">
            Un expert vous rappelle sous 24 heures pour établir avec vous une solution
            personnalisée. Gratuit, sans engagement.
          </p>
          <UnifiedLeadForm redirectOnSuccess="/fr/merci" />
        </div>
      </div>

      {/* Bandeau éditorial */}
      <div className="container-xl mt-4 pb-12">
        <AuthorBio publishedDate="1er janvier 2026" updatedDate="6 mai 2026" />
      </div>
    </>
  )
}
