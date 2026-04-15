import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/LeadForm'

export const metadata: Metadata = {
  title: 'My Swiss Insurance — Comparez votre LAMal 2026 gratuitement',
  description:
    'Trouvez la meilleure caisse maladie LAMal selon votre canton et votre profil. Comparaison gratuite, données OFSP 2026. Économisez jusqu\'à CHF 2\'753/an.',
  openGraph: {
    title: 'Comparez votre assurance maladie LAMal en Suisse — Gratuit 2026',
    description: 'Comparaison personnalisée des caisses maladie suisses. Données OFSP officielles 2026.',
    url: 'https://my-swiss-insurance.ch',
    type: 'website',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "L'assurance maladie est-elle obligatoire en Suisse ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, la LAMal rend l'assurance maladie obligatoire pour tout résident en Suisse. L'affiliation doit intervenir dans les 3 mois suivant l'arrivée.",
      },
    },
    {
      '@type': 'Question',
      name: 'Combien coûte la LAMal en 2026 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La prime LAMal moyenne est de CHF 565/mois pour un adulte en 2026 (franchise 300 CHF, modèle standard). Elle varie de CHF 359 à CHF 863 selon le canton et la caisse choisie. Source : OFSP 2026.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment économiser sur sa prime LAMal ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Choisissez un modèle alternatif (médecin de famille, HMO, Telmed) pour économiser 5 à 25%. Augmentez votre franchise si vous êtes en bonne santé. Changez de caisse chaque année avant le 30 novembre.',
      },
    },
  ],
}

const definitionSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "Qu'est-ce que la LAMal ?",
  description: "La LAMal est le système d'assurance maladie obligatoire suisse en vigueur depuis 1996.",
  datePublished: '2026-01-01',
  dateModified: '2026-04-13',
  author: { '@type': 'Organization', name: 'La rédaction My Swiss Insurance' },
  publisher: { '@type': 'Organization', name: 'My Swiss Insurance' },
}

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Guide complet LAMal',
    desc: 'Franchises, modèles d\'assurance, primes 2026 par canton et subsides. Tout ce qu\'il faut savoir en un seul endroit.',
    href: '/lamal/guide',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    title: 'LAMal vs assurance complémentaire',
    desc: 'Obligatoire ou facultative ? Comprenez la différence entre LAMal de base et assurances complémentaires LCA.',
    href: '/lamal/lamal-vs-lca',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: 'Changer de caisse',
    desc: 'Procédure de résiliation, dates clés et modèle de lettre. Changez d\'assureur sans erreur avant le 30 novembre.',
    href: '/lamal/changer-de-caisse',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Conseils par profil',
    desc: 'Famille, étudiant, expatrié, retraité ou indépendant : des recommandations adaptées à chaque situation de vie.',
    href: '/lamal/par-profil',
  },
]

const steps = [
  {
    n: '01',
    title: 'Remplissez le formulaire',
    desc: 'Prénom, email, canton et situation. 30 secondes, aucune information sensible demandée.',
  },
  {
    n: '02',
    title: 'Recevez votre comparaison',
    desc: 'Un conseiller analyse les caisses disponibles dans votre canton et vous envoie les meilleures offres sous 24h.',
  },
  {
    n: '03',
    title: 'Choisissez et économisez',
    desc: 'Comparez, posez vos questions, puis souscrivez en toute confiance. Entièrement gratuit, sans engagement.',
  },
]

const stats = [
  { value: 'CHF 565', label: 'Prime moyenne 2026', sub: 'adulte · franchise 300 CHF · modèle standard' },
  { value: '34', label: 'Caisses comparées', sub: 'données OFSP 2026' },
  { value: '25–30%', label: 'Bénéficiaires de subsides', sub: 'de la population suisse' },
  { value: "CHF 2'753", label: 'Économie max / an', sub: 'adulte · franchise 300 CHF · modèle standard' },
]

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definitionSchema) }} />

      {/* ─── HERO ─── */}
      <section className="bg-white pt-24 pb-20 sm:pt-32 sm:pb-28">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — text */}
            <div className="max-w-xl">
              <div className="badge mb-6">
                Assurance maladie obligatoire en Suisse · Données OFSP 2026
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold text-ink leading-tight mb-6">
                Économisez sur votre assurance maladie suisse.
              </h1>
              <p className="text-xl text-slate leading-relaxed mb-10">
                En Suisse, l'assurance maladie de base (LAMal) est obligatoire pour tous.
                Ses primes varient de CHF 359 à CHF 863 selon le canton et la caisse choisie. Comparez gratuitement
                pour trouver la moins chère selon votre profil.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#lead-form" className="btn-primary text-[15px] py-3.5 px-7">
                  Comparer gratuitement
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <Link href="/lamal/guide" className="btn-secondary text-[15px] py-3.5 px-7">
                  Comprendre l'assurance maladie
                </Link>
              </div>
              <p className="mt-6 text-[13px] text-slate/60">
                Sans inscription · Données sécurisées · Réponse sous 24h
              </p>
            </div>

            {/* Right — form */}
            <div className="w-full">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* ─── DÉFINITION LAMAL ─── */}
      <section id="definition-lamal" className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold text-[#0f2040] mb-6">
          Qu'est-ce que la LAMal ?
        </h2>
        <p className="text-lg text-[#475569] leading-relaxed mb-4">
          La LAMal — Loi fédérale sur l'Assurance Maladie (RS 832.10) — est le système d'assurance
          maladie obligatoire suisse, en vigueur depuis le 1<sup>er</sup> janvier 1996. Elle garantit
          à chaque résident en Suisse un accès aux soins de base, indépendamment de son âge,
          de son état de santé ou de sa situation financière.
        </p>
        <p className="text-lg text-[#475569] leading-relaxed mb-4">
          Chaque résident doit obligatoirement s'affilier à une caisse maladie agréée dans les
          90 jours suivant son arrivée en Suisse. Les prestations de base sont strictement identiques
          dans toutes les caisses : seul le montant de la prime varie.
        </p>
        <p className="text-lg text-[#475569] leading-relaxed">
          En 2026, la prime mensuelle moyenne en Suisse s'élève à CHF 565 pour un adulte de 35 ans
          avec une franchise de 300 CHF et le modèle standard (libre choix du médecin). Elle varie
          de CHF 359 à CHF 863 selon le canton et la caisse choisie.
        </p>
        <div className="mt-6 text-sm text-[#475569]">
          Source : Office fédéral de la santé publique (OFSP), données 2026.
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="bg-cloud border-y border-edge py-10">
        <div className="container-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-ink mb-1">{s.value}</div>
                <div className="text-[13px] font-medium text-ink/80">{s.label}</div>
                <div className="text-[12px] text-slate mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-[12px] text-slate/50 mt-6">
            Sources : OFSP (Office fédéral de la santé publique), données 2026.
          </p>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="bg-white py-24">
        <div className="container-xl">
          <div className="max-w-2xl mb-16">
            <h2 className="text-4xl font-bold text-ink leading-tight mb-4">
              Tout pour maîtriser votre assurance maladie suisse.
            </h2>
            <p className="text-xl text-slate leading-relaxed">
              Guides, comparatifs et conseils sur la LAMal, l'assurance maladie obligatoire suisse.
              Des informations sourcées, à jour, expliquées sans jargon.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <Link
                key={f.href} href={f.href}
                className="group flex flex-col bg-white border border-edge rounded-xl p-6 hover:border-[#1d4ed8] hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <div className="w-10 h-10 bg-[#dbeafe] border border-[#1d4ed8]/20 rounded-[8px] flex items-center justify-center text-brand mb-4 group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-colors duration-200">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-ink text-[17px] mb-2 group-hover:text-[#1d4ed8] transition-colors">
                  {f.title}
                </h3>
                <p className="text-slate text-[15px] leading-relaxed flex-1">{f.desc}</p>
                <div className="flex items-center gap-1 mt-4 text-[#1d4ed8] text-[14px] font-medium">
                  Découvrir
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="bg-cloud border-y border-edge py-24">
        <div className="container-xl">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-ink leading-tight mb-4">
              Comment ça fonctionne.
            </h2>
            <p className="text-xl text-slate">
              Simple, rapide, gratuit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="text-[48px] font-bold text-[#1d4ed8] mb-4 leading-none">{step.n}</div>
                <h3 className="font-semibold text-ink text-[18px] mb-2">{step.title}</h3>
                <p className="text-slate text-[15px] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GUIDE PROMO ─── */}
      <section className="bg-white py-24">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="badge mb-5">Guide · Mis à jour 2026</div>
              <h2 className="text-4xl font-bold text-ink leading-tight mb-5">
                L'assurance maladie suisse expliquée de A à Z.
              </h2>
              <p className="text-[17px] text-slate leading-relaxed mb-8">
                La LAMal est complexe : franchises, modèles alternatifs, subsides cantonaux,
                délais de résiliation. Notre guide couvre tout : primes 2026 par canton,
                comparatif des franchises, et comment changer de caisse sans erreur.
              </p>
              <Link href="/lamal/guide" className="btn-primary text-[15px]">
                Lire le guide complet →
              </Link>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Primes 2026 par canton', sub: 'Tableau complet des 26 cantons · Source OFSP' },
                { label: 'Franchises : quel choix ?', sub: 'Break-even calculé pour 300 → 2500 CHF' },
                { label: 'Les 4 modèles d\'assurance', sub: 'Standard · Médecin de famille · HMO · Telmed' },
                { label: 'Subsides : qui y a droit ?', sub: '25–30% de la population suisse en bénéficie' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 py-4 border-b border-edge last:border-b-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2.5 shrink-0" />
                  <div>
                    <p className="font-medium text-ink text-[16px]">{item.label}</p>
                    <p className="text-[14px] text-slate mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="bg-ink py-24">
        <div className="container-xl text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-white leading-tight mb-5">
            Prêt à économiser sur votre assurance maladie ?
          </h2>
          <p className="text-xl text-white/60 mb-10 leading-relaxed">
            Recevez une comparaison personnalisée des caisses maladie disponibles dans votre canton.
            Gratuit, sans engagement, réponse sous 24h.
          </p>
          <a href="#lead-form" className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-medium px-8 py-4 rounded-[6px] text-[16px] transition-colors duration-150">
            Comparer gratuitement
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>
    </>
  )
}
