import type { Metadata } from 'next'
import Link from 'next/link'
import UnifiedLeadForm from '@/components/ui/UnifiedLeadForm'
import CantonSearch from '@/components/ui/CantonSearch'
import { Inter } from 'next/font/google'
import './sf-theme.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Économisez sur votre assurance maladie suisse en 2026 — My Swiss Insurance',
  robots: { index: false, follow: false },
  description:
    "Comparez les primes LAMal 2026 gratuitement. Jusqu'à 5 653 CHF d'économie par an à Genève. 34 caisses, données OFSP officielles, résultat immédiat.",
  alternates: { canonical: 'https://my-swiss-insurance.ch' },
  openGraph: {
    title: 'Économisez sur votre assurance maladie suisse en 2026',
    description: "Jusqu'à 5 653 CHF d'économie par an. Comparez gratuitement 34 caisses LAMal. Données OFSP 2026.",
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

// Palette BlaBlaCar + bleu électrique + tokens sémantiques
const P = {
  // Structure
  navy:        '#054652',  // sarcelle foncée BlaBlaCar
  action:      '#1d4ed8',  // bleu électrique — CTA, liens
  actionLight: '#3b82f6',  // bleu medium — accents secondaires
  tint:        '#dbeafe',  // teinte bleu électrique — fonds callout bleu
  bgWarm:      '#FFFFFF',
  surface:     '#F5F7FB',  // fond sections alternées
  border:      '#E9ECF0',
  // Texte — 4 niveaux
  textDark:    '#131314',  // titres H1
  textPrimary: '#25282B',  // corps principal
  textBody:    '#576680',  // descriptions, labels
  textMuted:   '#6F8B90',  // métadonnées, sources
  // Signalisation sémantique
  success:     '#16a34a',  // économies, positif
  successBg:   '#dcfce7',
  warning:     '#d97706',  // délais, attention
  warningBg:   '#fef3c7',
  error:       '#dc2626',  // erreurs
  errorBg:     '#fee2e2',
}

export default function HomePageV2() {
  return (
    <div className={`${inter.className} sf-theme`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── 1. HERO ── */}
      <section style={{ backgroundColor: P.bgWarm }} className="pt-20 pb-20 sm:pt-28 sm:pb-24">
        <div className="container-xl">

          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5"
            style={{ color: P.textDark }}>
            L'assurance maladie suisse, expliquée sans détour
          </h1>

          <p className="text-[17px] leading-relaxed mb-10" style={{ color: P.textBody }}>
            En Suisse, toutes les caisses couvrent les mêmes soins. Seul le prix change.
            L'écart atteint{' '}
            <strong className="font-semibold" style={{ color: P.navy }}>5 653 CHF par an</strong>{' '}
            à Genève pour un même profil. Nos guides vous aident à comprendre, comparer et décider.
          </p>

          {/* Tuiles stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
            {[
              { value: "5'653 CHF", line1: 'économie annuelle',  line2: 'possible à Genève' },
              { value: '34',        line1: 'caisses agréées',    line2: "par l'OFSP" },
              { value: '28 %',      line1: 'des résidents',      line2: "bénéficient d'un subside" },
            ].map(s => (
              <div key={s.value} className="rounded-xl p-5"
                style={{ backgroundColor: P.surface, border: `1px solid ${P.border}` }}>
                <p className="text-2xl font-bold leading-none mb-2" style={{ color: P.action }}>{s.value}</p>
                <p className="text-[16px] leading-tight font-medium" style={{ color: P.textDark }}>{s.line1}</p>
                <p className="text-[16px] leading-tight" style={{ color: P.textBody }}>{s.line2}</p>
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

      {/* ── 2. GUIDES ── */}
      <section className="py-20" style={{ backgroundColor: P.surface, borderTop: `1px solid ${P.border}` }}>
        <div className="container-xl">

          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-2" style={{ color: P.textDark }}>Comprendre la LAMal</h2>
            <p className="text-[16px]" style={{ color: P.textBody }}>
              Tout ce qu'il faut savoir sur l'assurance de base obligatoire : prestations, franchises,
              modèles et droits aux subsides.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-10">

            {/* Featured */}
            <Link href="/sante/guide"
              className="group lg:col-span-2 flex flex-col rounded-xl overflow-hidden transition-all duration-200"
              style={{ backgroundColor: P.bgWarm, border: `1px solid ${P.border}` }}>
              <div className="h-1" style={{ backgroundColor: P.navy }} />
              <div className="p-8 flex flex-col flex-1">
                <p className="text-[16px] font-semibold uppercase tracking-widest mb-4" style={{ color: P.textMuted }}>
                  Guide complet
                </p>
                <h3 className="text-xl font-semibold leading-snug mb-3 flex-1" style={{ color: P.textDark }}>
                  Comprendre la LAMal de A à Z
                </h3>
                <p className="text-[16px] leading-relaxed mb-6" style={{ color: P.textBody }}>
                  Fonctionnement, prestations couvertes, primes 2026 par canton, modèles de soins et droits
                  de chaque résident.
                </p>
                <span className="flex items-center gap-1.5 text-[16px] font-medium" style={{ color: P.action }}>
                  Lire le guide
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* 3 guides compacts */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              {[
                { title: 'Choisir sa franchise', desc: "Trouvez le palier le plus avantageux selon votre usage des soins", href: '/sante/franchise' },
                { title: "Les 4 modèles d'assurance", desc: "Libre choix, médecin de famille, centre médical, télémédecine : jusqu'à 24 % d'économie", href: '/sante/modeles' },
                { title: 'LAMal et complémentaire', desc: 'Obligatoire ou facultative : ce que la LCA couvre en plus et pour quel profil', href: '/sante/lamal-vs-lca' },
              ].map(g => (
                <Link key={g.href} href={g.href}
                  className="group rounded-xl px-6 py-5 flex items-start gap-5 transition-all duration-200"
                  style={{ backgroundColor: P.bgWarm, border: `1px solid ${P.border}` }}>
                  <div className="flex-1">
                    <p className="font-semibold text-[16px] mb-1 transition-colors" style={{ color: P.navy }}>
                      {g.title}
                    </p>
                    <p className="text-[16px] leading-relaxed" style={{ color: P.textBody }}>{g.desc}</p>
                  </div>
                  <svg className="w-4 h-4 shrink-0 mt-1 transition-all duration-200"
                    style={{ color: P.textMuted }}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>

          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-8"
            style={{ borderTop: `1px solid ${P.border}` }}>
            <p className="text-[16px]" style={{ color: P.textBody }}>
              Vous souhaitez changer de caisse ? Un expert gère les démarches pour vous.
            </p>
            <a href="#formulaire" className="btn-primary text-[16px] shrink-0 whitespace-nowrap">
              Prendre rendez-vous
            </a>
          </div>

        </div>
      </section>

      {/* ── 3. PAR SITUATION ── */}
      <section className="py-20" style={{ backgroundColor: P.bgWarm, borderTop: `1px solid ${P.border}` }}>
        <div className="container-xl">

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2" style={{ color: P.textDark }}>Selon votre situation</h2>
            <p className="text-[16px]" style={{ color: P.textBody }}>
              Franchise, modèle et éligibilité aux subsides varient selon votre profil.
            </p>
          </div>

          <div style={{ borderTop: `1px solid ${P.border}`, borderBottom: `1px solid ${P.border}` }}>
            {[
              { title: 'Salarié, indépendant, chômeur ou nouvel arrivant', href: '/sante/ma-situation', label: 'Ma situation' },
              { title: 'Enfants, maternité, jeunes adultes et retraite', href: '/sante/ma-famille', label: 'Ma famille' },
              { title: "Frontaliers : droit d'option, LAMal ou système étranger", href: '/sante/frontalier', label: 'Frontaliers' },
            ].map((s, i, arr) => (
              <Link key={s.href} href={s.href}
                className="group flex items-center justify-between py-5 -mx-2 px-2 rounded transition-colors duration-150"
                style={{ borderBottom: i < arr.length - 1 ? `1px solid ${P.border}` : undefined }}>
                <div>
                  <p className="text-[16px] font-semibold uppercase tracking-widest mb-0.5"
                    style={{ color: P.textMuted }}>{s.label}</p>
                  <p className="text-[17px] font-medium" style={{ color: P.navy }}>{s.title}</p>
                </div>
                <svg className="w-5 h-5 shrink-0" style={{ color: P.textMuted }}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. PAR CANTON ── */}
      <section className="py-20" style={{ backgroundColor: P.surface, borderTop: `1px solid ${P.border}` }}>
        <div className="container-xl">

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-2" style={{ color: P.textDark }}>Primes 2026 par canton</h2>
            <p className="text-[16px]" style={{ color: P.textBody }}>
              Les primes varient du simple au double selon le canton.
              Adulte 35 ans, modèle standard, franchise 300 CHF. Source : OFSP 2026.
            </p>
          </div>

          <div className="mb-10">
            <CantonSearch />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {cantonCards.map(c => (
              <Link key={c.nom} href={c.href}
                className="group rounded-xl p-5 transition-all duration-200"
                style={{ backgroundColor: P.bgWarm, border: `1px solid ${P.border}` }}>
                <p className="font-bold text-[19px] mb-1" style={{ color: P.navy }}>{c.nom}</p>
                <p className="text-[16px] mb-3" style={{ color: P.textBody }}>
                  dès <span className="font-medium" style={{ color: P.navy }}>{c.primeMin} CHF</span>/mois
                </p>
                <p className="text-[16px] mb-0.5" style={{ color: P.textMuted }}>Économie possible</p>
                <p className="text-[18px] font-bold" style={{ color: P.success }}>
                  {c.economieAn} CHF/an
                </p>
                <p className="text-[16px] font-medium mt-3" style={{ color: P.action }}>
                  Voir le détail →
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <p className="text-[16px] mb-4" style={{ color: P.textBody }}>
              Comparez toutes les caisses pour votre profil exact
            </p>
            <Link href="/sante/comparateur" className="btn-primary text-[16px]">
              Ouvrir le comparateur
            </Link>
          </div>

        </div>
      </section>

      {/* ── 5. À PROPOS ── */}
      <section className="py-20" style={{ backgroundColor: P.bgWarm, borderTop: `1px solid ${P.border}` }}>
        <div className="container-xl">

          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-3" style={{ color: P.textDark }}>
              Une source de référence sur la LAMal
            </h2>
            <p className="text-[16px] leading-relaxed" style={{ color: P.textBody }}>
              My Swiss Insurance publie des données officielles OFSP pour aider les résidents, expatriés
              et frontaliers à décider en connaissance de cause.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Source des données',  desc: "Données officielles de l'OFSP et des 26 cantons suisses" },
              { label: 'Couverture',          desc: 'Toutes les caisses agréées en Suisse, pour chaque canton' },
              { label: 'Mise à jour',         desc: 'Chaque automne après la publication des nouvelles primes OFSP' },
              { label: 'Service',             desc: 'Comparer et se faire conseiller par un expert est gratuit' },
            ].map(f => (
              <div key={f.label} className="pt-5" style={{ borderTop: `2px solid ${P.navy}` }}>
                <p className="text-[16px] font-semibold uppercase tracking-wide mb-2" style={{ color: P.navy }}>
                  {f.label}
                </p>
                <p className="text-[16px] leading-relaxed" style={{ color: P.textBody }}>{f.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 6. FORMULAIRE ── */}
      <section id="formulaire" style={{ backgroundColor: P.surface, borderTop: `1px solid ${P.border}` }}>
        <div className="container-xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-semibold leading-tight mb-3" style={{ color: P.textDark }}>
              Un conseil personnalisé, gratuit
            </h2>
            <p className="text-[16px] leading-relaxed" style={{ color: P.textBody }}>
              Un expert analyse votre profil, identifie la meilleure option pour votre situation
              et gère le changement de votre côté. Réponse sous 24 heures, sans engagement.
            </p>
          </div>
          <UnifiedLeadForm redirectOnSuccess="/merci" />
        </div>
      </section>
    </div>
  )
}
