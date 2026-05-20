import type { Metadata } from 'next'
import Link from 'next/link'
import UnifiedLeadForm from '@/components/ui/UnifiedLeadForm'
import CantonSearch from '@/components/ui/CantonSearch'

export const metadata: Metadata = {
  title: 'Économisez sur votre assurance maladie suisse en 2026 — My Swiss Insurance',
  description:
    'Comparez les primes LAMal 2026 gratuitement. Jusqu\'à 5 653 CHF d\'économie par an à Genève. 34 caisses, données OFSP officielles, résultat immédiat.',
  alternates: { canonical: 'https://my-swiss-insurance.ch' },
  openGraph: {
    title: 'Économisez sur votre assurance maladie suisse en 2026',
    description: 'Jusqu\'à 5 653 CHF d\'économie par an. Comparez gratuitement 34 caisses LAMal. Données OFSP 2026.',
    url: 'https://my-swiss-insurance.ch',
    type: 'website',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "L'assurance maladie est-elle obligatoire en Suisse ?", acceptedAnswer: { '@type': 'Answer', text: "Oui, la LAMal rend l'assurance maladie obligatoire pour tout résident en Suisse depuis 1996. L'affiliation doit intervenir dans les 3 mois suivant l'arrivée." } },
    { '@type': 'Question', name: 'Combien peut-on économiser en changeant de caisse LAMal ?', acceptedAnswer: { '@type': 'Answer', text: "Jusqu'à 5 653 CHF par an pour un adulte de 35 ans à Genève (tous modèles et franchises confondus, source OFSP 2026). Les 34 caisses agréées proposent les mêmes prestations de base à des prix très différents selon le canton." } },
    { '@type': 'Question', name: 'Qui a droit à un subside LAMal en Suisse ?', acceptedAnswer: { '@type': 'Answer', text: "25 à 30 % de la population suisse bénéficie d'une réduction individuelle des primes (subside). Les conditions varient selon le canton et le revenu déterminant." } },
  ],
}

const cantonCards = [
  { nom: 'Zurich',  primeMin: '489', economieAn: "4'285", href: '/sante/canton/zurich' },
  { nom: 'Berne',   primeMin: '533', economieAn: "4'447", href: '/sante/canton/berne'  },
  { nom: 'Vaud',    primeMin: '579', economieAn: "4'220", href: '/sante/canton/vaud'   },
  { nom: 'Genève',  primeMin: '634', economieAn: "5'653", href: '/sante/canton/geneve' },
]

export default function HomePageV2() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── 1. HERO ────────────────────────────────────────────────────────────── */}
      <section className="bg-white pt-20 pb-20 sm:pt-28 sm:pb-24">
        <div className="container-xl">

          {/* Indicateur éditorial — discret, fonctionnel */}
          <p className="text-[12px] font-semibold text-muted uppercase tracking-widest mb-6">
            Données OFSP 2026 · 34 caisses agréées
          </p>

          {/* H1 : authorité, pas slogan */}
          <h1 className="text-4xl sm:text-5xl font-bold text-navy leading-tight mb-5 max-w-2xl">
            L'assurance maladie suisse, expliquée sans détour
          </h1>

          <p className="text-[17px] text-slate leading-relaxed mb-10 max-w-xl">
            En Suisse, toutes les caisses couvrent les mêmes soins. Seul le prix change.
            L'écart atteint <strong className="font-semibold text-ink">5 653 CHF par an</strong> à Genève
            pour un même profil. Nos guides vous aident à comprendre, comparer et décider.
          </p>

          {/* Stats — données éditoriales, pas metric cards */}
          <div className="flex flex-wrap gap-x-10 gap-y-4 mb-10 border-t border-edge pt-8">
            {[
              { value: "5'653 CHF", label: 'économie annuelle possible à Genève' },
              { value: '34',        label: "caisses agréées par l'OFSP" },
              { value: '28 %',      label: "de résidents bénéficient d'un subside" },
            ].map(s => (
              <div key={s.value}>
                <p className="text-2xl font-bold text-navy leading-none">{s.value}</p>
                <p className="text-[13px] text-slate mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/sante/comparateur" className="btn-primary text-[16px] py-3.5 px-7 w-full sm:w-auto">
              Comparer les primes
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <a href="#formulaire" className="btn-secondary text-[16px] py-3.5 px-7 w-full sm:w-auto">
              Parler à un expert gratuitement
            </a>
          </div>

        </div>
      </section>

      {/* ── 2. GUIDES ─────────────────────────────────────────────────────────── */}
      <section className="bg-cloud border-t border-edge py-20">
        <div className="container-xl">

          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-ink mb-2">Comprendre la LAMal</h2>
            <p className="text-[16px] text-slate">
              Tout ce qu'il faut savoir sur l'assurance de base obligatoire : prestations, franchises,
              modèles et droits aux subsides.
            </p>
          </div>

          {/* Asymétrique : 1 guide featured + 3 compacts */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-10">

            {/* Featured */}
            <Link href="/sante/guide"
              className="group lg:col-span-2 bg-navy rounded-xl p-8 flex flex-col
                         hover:bg-navy/90 transition-colors duration-200">
              <p className="text-[11px] font-semibold text-white/50 uppercase tracking-widest mb-4">Guide complet</p>
              <h3 className="text-xl font-semibold text-white leading-snug mb-3 flex-1">
                Comprendre la LAMal de A à Z
              </h3>
              <p className="text-[15px] text-white/70 leading-relaxed mb-6">
                Fonctionnement, prestations couvertes, primes 2026 par canton, modèles de soins et droits
                de chaque résident.
              </p>
              <span className="flex items-center gap-1.5 text-white text-[13px] font-medium">
                Lire le guide
                <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>

            {/* 3 guides compacts */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              {[
                { title: 'Choisir sa franchise', desc: 'Trouvez le palier le plus avantageux selon votre usage des soins', href: '/sante/franchise' },
                { title: 'Les 4 modèles d\'assurance', desc: 'Libre choix, médecin de famille, centre médical, télémédecine : jusqu\'à 24 % d\'économie', href: '/sante/modeles' },
                { title: 'LAMal et complémentaire', desc: 'Obligatoire ou facultative : ce que la LCA couvre en plus et pour quel profil', href: '/sante/lamal-vs-lca' },
              ].map(g => (
                <Link key={g.href} href={g.href}
                  className="group bg-white border border-edge rounded-xl px-6 py-5 flex items-start gap-5
                             hover:border-brand transition-colors duration-200">
                  <div className="flex-1">
                    <p className="font-semibold text-ink text-[16px] mb-1 group-hover:text-brand transition-colors">
                      {g.title}
                    </p>
                    <p className="text-[15px] text-slate leading-relaxed">{g.desc}</p>
                  </div>
                  <svg className="w-4 h-4 text-muted group-hover:text-brand group-hover:translate-x-0.5
                                  transition-all duration-200 shrink-0 mt-1"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>

          </div>

          {/* Nudge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4
                          border-t border-edge pt-8">
            <p className="text-[16px] text-slate">
              Vous souhaitez changer de caisse ? Un expert gère les démarches pour vous.
            </p>
            <a href="#formulaire" className="btn-primary text-[15px] shrink-0 whitespace-nowrap">
              Prendre rendez-vous
            </a>
          </div>

        </div>
      </section>

      {/* ── 3. PAR SITUATION ──────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-edge py-20">
        <div className="container-xl">

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-ink mb-2">Selon votre situation</h2>
            <p className="text-[16px] text-slate">
              Franchise, modèle et éligibilité aux subsides varient selon votre profil.
            </p>
          </div>

          {/* Liste horizontale — pas de grid de cards identiques */}
          <div className="divide-y divide-edge border-t border-b border-edge">
            {[
              { title: 'Salarié, indépendant, chômeur ou nouvel arrivant', href: '/sante/ma-situation', label: 'Ma situation' },
              { title: 'Enfants, maternité, jeunes adultes et retraite', href: '/sante/ma-famille', label: 'Ma famille' },
              { title: 'Frontaliers : droit d\'option, LAMal ou système étranger', href: '/sante/frontalier', label: 'Frontaliers' },
            ].map(s => (
              <Link key={s.href} href={s.href}
                className="group flex items-center justify-between py-5 hover:bg-cloud/40 -mx-2 px-2
                           transition-colors duration-150 rounded">
                <div>
                  <p className="text-[11px] font-semibold text-muted uppercase tracking-widest mb-0.5">
                    {s.label}
                  </p>
                  <p className="text-[17px] text-ink font-medium group-hover:text-brand transition-colors">
                    {s.title}
                  </p>
                </div>
                <svg className="w-5 h-5 text-muted group-hover:text-brand group-hover:translate-x-0.5
                                transition-all duration-200 shrink-0"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. PAR CANTON ─────────────────────────────────────────────────────── */}
      <section className="bg-cloud border-t border-edge py-20">
        <div className="container-xl">

          <div className="max-w-2xl mb-8">
            <h2 className="text-2xl font-semibold text-ink mb-2">
              Primes 2026 par canton
            </h2>
            <p className="text-[16px] text-slate">
              Les primes varient du simple au double selon le canton.
              Adulte 35 ans, modèle standard, franchise 300 CHF. Source : OFSP 2026.
            </p>
          </div>

          <div className="mb-10">
            <CantonSearch />
          </div>

          {/* 4 cantons — cards épurées */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {cantonCards.map(c => (
              <Link key={c.nom} href={c.href}
                className="group bg-white border border-edge rounded-xl p-5
                           hover:border-brand transition-colors duration-200">
                <p className="font-bold text-ink text-[19px] mb-1">{c.nom}</p>
                <p className="text-[13px] text-slate mb-3">
                  dès <span className="font-medium text-ink">{c.primeMin} CHF</span>/mois
                </p>
                <p className="text-[12px] text-muted mb-0.5">Économie possible</p>
                <p className="text-[18px] font-bold text-navy">{c.economieAn} CHF/an</p>
                <p className="text-[12px] font-medium text-brand mt-3 group-hover:underline">
                  Voir le détail
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <p className="text-[15px] text-slate mb-4">
              Comparez toutes les caisses pour votre profil exact
            </p>
            <Link href="/sante/comparateur" className="btn-primary text-[15px]">
              Ouvrir le comparateur
            </Link>
          </div>

        </div>
      </section>

      {/* ── 5. À PROPOS ───────────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-edge py-20">
        <div className="container-xl">

          <div className="max-w-xl mb-12">
            <h2 className="text-2xl font-semibold text-ink mb-3">
              Une source de référence sur la LAMal
            </h2>
            <p className="text-[16px] text-slate leading-relaxed">
              My Swiss Insurance publie des données officielles OFSP pour aider les résidents, expatriés
              et frontaliers à décider en connaissance de cause.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Source des données',  desc: 'Données officielles de l\'OFSP et des 26 cantons suisses' },
              { label: 'Couverture',          desc: 'Toutes les caisses agréées en Suisse, pour chaque canton' },
              { label: 'Mise à jour',         desc: 'Chaque automne après la publication des nouvelles primes OFSP' },
              { label: 'Service',             desc: 'Comparer et se faire conseiller par un expert est gratuit' },
            ].map(f => (
              <div key={f.label} className="border-t-2 border-navy pt-5">
                <p className="text-[12px] font-semibold text-navy uppercase tracking-wide mb-2">
                  {f.label}
                </p>
                <p className="text-[15px] text-slate leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 6. FORMULAIRE ─────────────────────────────────────────────────────── */}
      <section id="formulaire" className="bg-cloud border-t border-edge">
        <div className="container-xl max-w-2xl">

          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-ink leading-tight mb-3">
              Un conseil personnalisé, gratuit
            </h2>
            <p className="text-[16px] text-slate leading-relaxed">
              Un expert analyse votre profil, identifie la meilleure option pour votre situation
              et gère le changement de votre côté. Réponse sous 24 heures, sans engagement.
            </p>
          </div>

          <UnifiedLeadForm redirectOnSuccess="/merci" />

        </div>
      </section>
    </>
  )
}
