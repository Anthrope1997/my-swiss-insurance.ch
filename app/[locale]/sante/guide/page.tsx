import type { Metadata } from 'next'
import KeyFact from '@/components/ui/KeyFact'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FAQ from '@/components/ui/FAQ'
import Link from 'next/link'
import AuthorBio from '@/components/ui/AuthorBio'
import NeedHelpSection from '@/components/ui/NeedHelpSection'
import HeroStats from '@/components/ui/HeroStats'
import { breakEven, primeMoyenne, economieMoyenne, economieMax, subsideMoyen, modeleEconomieMax, modeleEconomieMoyenne } from '@/lib/sante/formules'
import { nationalBreakEven, nationalBreakEvenJA, nationalBreakEvenEnfant, nationalAvgPrime } from '@/lib/sante/calcul-franchise'
import { formatChf } from '@/lib/shared/formatters'

const seuilAdulte       = nationalBreakEven()
const seuilJA           = nationalBreakEvenJA()
const seuilEnfant       = nationalBreakEvenEnfant()
const economieAnnuelle  = Math.round((nationalAvgPrime(300) - nationalAvgPrime(2500)) * 12)
const economieMensuelle = Math.round(nationalAvgPrime(300) - nationalAvgPrime(2500))

export const metadata: Metadata = {
  title: 'Guide complet LAMal 2026 : Primes, franchises, modèles et subsides',
  description:
    "Guide LAMal 2026 : primes par canton (OFSP), franchises CHF 300 - CHF 2 500 avec seuil d'équilibre, 4 modèles d'assurance, changement de caisse et subsides.",
  openGraph: {
    title: 'Guide complet LAMal 2026 : Primes, franchises et subsides',
    description: 'La référence LAMal 2026 : primes par canton, franchises, modèles et subsides. Données OFSP.',
    url: 'https://my-swiss-insurance.ch/sante/guide',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Guide complet LAMal 2026 : Primes, franchises, modèles et subsides',
  datePublished: '2026-01-01',
  dateModified: '2026-04-22',
  author: { '@type': 'Organization', name: 'My Swiss Insurance', url: 'https://my-swiss-insurance.ch' },
  publisher: { '@type': 'Organization', name: 'My Swiss Insurance' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://my-swiss-insurance.ch/sante/guide' },
}

const faqItems = [
  {
    question: 'La LAMal est-elle obligatoire en Suisse ?',
    answer: "Oui, la LAMal est obligatoire pour toute personne résidant en Suisse. L'affiliation doit intervenir dans les 3 mois suivant l'établissement du domicile ou la naissance. En cas de non-affiliation, les autorités cantonales assignent d'office une caisse maladie. Source : art. 3 LAMal (RS 832.10).",
  },
  {
    question: 'Quelle franchise LAMal choisir ?',
    answer: `Choisissez la franchise de CHF 2 500 si vous êtes en bonne santé et consultez peu : vous économisez environ CHF 120 par mois sur la prime. Optez pour la franchise de CHF 300 à partir d'environ CHF ${formatChf(Math.round(breakEven()))} de frais médicaux annuels.`,
  },
  {
    question: "Peut-on changer de caisse maladie en cours d'année ?",
    answer: "En règle générale non. Le changement ordinaire se fait au 1er janvier avec un préavis avant le 30 novembre. Exception : si votre assureur annonce une hausse de prime, vous pouvez résilier dans le mois suivant la notification pour quitter au 31 décembre.",
  },
  {
    question: 'Quelle est la différence entre LAMal et LCA ?',
    answer: "La LAMal est l'assurance de base obligatoire couvrant les soins essentiels. La LCA (loi sur le contrat d'assurance) régit les assurances complémentaires facultatives : chambre privée, médecine alternative, soins dentaires. Les prestations varient selon l'assureur et ne sont pas standardisées.",
  },
  {
    question: "Quand faut-il s'inscrire à la LAMal en arrivant en Suisse ?",
    answer: "Dans les 3 mois suivant votre prise de domicile en Suisse. Si vous respectez ce délai, la couverture est rétroactive à la date d'arrivée. Passé ce délai, les autorités cantonales vous attribuent d'office une caisse. Source : art. 3 al. 1 et art. 5 LAMal.",
  },
  {
    question: "Quelle est la caisse maladie la moins chère en Suisse ?",
    answer: "La caisse la moins chère dépend de votre canton, de votre âge et du modèle choisi. Pour un adulte à Nidwald, les primes débutent autour de CHF 280 par mois. À Genève, elles dépassent CHF 530 par mois. Les écarts entre caisses dans un même canton atteignent CHF 100 à 180 par mois.",
  },
  {
    question: "Les prestations sont-elles identiques dans toutes les caisses maladie ?",
    answer: "Oui. Pour la LAMal de base, les prestations sont strictement identiques chez tous les assureurs agréés par l'OFSP. Seules les primes, la qualité du service client et les options complémentaires (LCA) diffèrent.",
  },
  {
    question: "La maternité est-elle couverte par la LAMal ?",
    answer: "Oui et sans reste à charge. Les consultations prénatales, l'accouchement et les soins post-partum (sage-femme jusqu'à 10 semaines) sont exonérés de franchise et de quote-part. La LAMal couvre l'accouchement en hôpital, en maison de naissance ou à domicile. Source : art. 29 LAMal.",
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

const CANTON_NAMES: Record<string, string> = {
  GE: 'Genève',    TI: 'Tessin',             BS: 'Bâle-Ville',        NE: 'Neuchâtel',
  VD: 'Vaud',      JU: 'Jura',               BL: 'Bâle-Campagne',     BE: 'Berne',
  SO: 'Soleure',   SH: 'Schaffhouse',         ZH: 'Zurich',            AG: 'Argovie',
  VS: 'Valais',    FR: 'Fribourg',            GR: 'Grisons',           AR: 'Appenzell Rh.-Ext.',
  TG: 'Thurgovie', LU: 'Lucerne',             GL: 'Glaris',            SG: 'Saint-Gall',
  SZ: 'Schwyz',    OW: 'Obwald',              UR: 'Uri',               NW: 'Nidwald',
  AI: 'Appenzell Rh.-Int.', ZG: 'Zoug',
}

const premiums = Object.entries(CANTON_NAMES)
  .map(([code, name]) => ({ code, name, prime: primeMoyenne({ canton: code }) }))
  .sort((a, b) => b.prime - a.prime)

const franchises = [
  { montant: 300,  prime: 638.70, economie: 0,      ecAnn: 0,    breakEven: '-',          conseil: 'Recommandé si frais médicaux dépassent CHF 1 891 par an' },
  { montant: 500,  prime: 627.90, economie: 10.80,  ecAnn: 130,  breakEven: 'CHF 444',    conseil: 'Avantage limité' },
  { montant: 1000, prime: 600.70, economie: 38.00,  ecAnn: 456,  breakEven: 'CHF 807',    conseil: "Bon si moins d'une consultation majeure par an" },
  { montant: 1500, prime: 573.60, economie: 65.10,  ecAnn: 781,  breakEven: 'CHF 1 168',  conseil: 'Bon équilibre pour personnes saines' },
  { montant: 2000, prime: 546.50, economie: 92.20,  ecAnn: 1106, breakEven: 'CHF 1 529',  conseil: 'Recommandé sans maladie chronique' },
  { montant: 2500, prime: 519.40, economie: 119.30, ecAnn: 1432, breakEven: 'CHF 1 891',  conseil: 'Optimal pour adultes très sains' },
]

const assureurs = [
  { name: 'CSS',       part: '14.1%', note: 'Plus grande caisse suisse, large réseau' },
  { name: 'Helsana',   part: '13.5%', note: 'Application mobile avancée, nombreuses options' },
  { name: 'SWICA',     part: '10.2%', note: 'Leader en médecine intégrative' },
  { name: 'Visana',    part: '9.1%',  note: 'Forte présence Suisse romande et alémanique' },
  { name: 'Sanitas',   part: '7.9%',  note: 'Forte en télémédecine et en services numériques' },
  { name: 'Assura',    part: '7.2%',  note: 'Souvent la moins chère, service numérique' },
  { name: 'Concordia', part: '6.8%',  note: 'Bon service, réseau médecin de famille étendu' },
  { name: 'KPT',       part: '4.2%',  note: 'Compétitive, bonne qualité de service' },
]

const economies = [
  { canton: 'Berne',  mensuel: `CHF ${economieMax({ canton: 'BE' }).toLocaleString('fr-CH')}`, annuel: `CHF ${(economieMax({ canton: 'BE' }) * 12).toLocaleString('fr-CH')}` },
  { canton: 'Genève', mensuel: `CHF ${economieMax({ canton: 'GE' }).toLocaleString('fr-CH')}`, annuel: `CHF ${(economieMax({ canton: 'GE' }) * 12).toLocaleString('fr-CH')}` },
  { canton: 'Vaud',   mensuel: `CHF ${economieMax({ canton: 'VD' }).toLocaleString('fr-CH')}`, annuel: `CHF ${(economieMax({ canton: 'VD' }) * 12).toLocaleString('fr-CH')}` },
  { canton: 'Zurich', mensuel: `CHF ${economieMax({ canton: 'ZH' }).toLocaleString('fr-CH')}`, annuel: `CHF ${(economieMax({ canton: 'ZH' }) * 12).toLocaleString('fr-CH')}` },
]

const toc = [
  { id: 'definition', label: "1. Qu'est-ce que la LAMal ?" },
  { id: 'couverture', label: '2. Ce que couvre la LAMal' },
  { id: 'primes',     label: '3. Primes 2026 par canton' },
  { id: 'assureurs',  label: '4. Principaux assureurs' },
  { id: 'franchise',  label: '5. Choisir sa franchise' },
  { id: 'modeles',    label: '6. Les 4 modèles' },
  { id: 'economies',  label: '7. Économies possibles' },
  { id: 'changer',    label: '8. Comment changer de caisse' },
  { id: 'subsides',   label: '9. Subsides' },
  { id: 'faq',        label: '10. FAQ' },
]

const modeleMaxPct = Math.round(
  Math.max(modeleEconomieMax('HMO'), modeleEconomieMax('DIV'), modeleEconomieMax('HAM')) / primeMoyenne() * 100
)
const _primeMoyGuide = primeMoyenne()
const hamMaxPct = Math.round(modeleEconomieMax('HAM') / _primeMoyGuide * 100)
const hmoMaxPct = Math.round(modeleEconomieMax('HMO') / _primeMoyGuide * 100)
const divMaxPct = Math.round(modeleEconomieMax('DIV') / _primeMoyGuide * 100)
const hamMoyPct = Math.round(modeleEconomieMoyenne('HAM') / _primeMoyGuide * 100)
const hmoMoyPct = Math.round(modeleEconomieMoyenne('HMO') / _primeMoyGuide * 100)
const divMoyPct = Math.round(modeleEconomieMoyenne('DIV') / _primeMoyGuide * 100)

const heroStats = [
  { value: `CHF ${formatChf(economieMoyenne() * 12)}/an`, label: 'Économie moyenne réalisable', sub: 'Assurance LAMal, adulte 35 ans' },
  { value: '6',          label: 'Niveaux de franchise',     sub: 'De CHF 300 à CHF 2 500 pour un adulte'                     },
  { value: '4',          label: 'Modèles de soins',        sub: `Jusqu’à ${modeleMaxPct} % d’économie réalisable` },
]

const enBref = [
  <>{"L'assurance LAMal est obligatoire pour toute personne résidant en Suisse. Les "}
    <strong className="font-medium text-ink">34 caisses agréées</strong>
    {" couvrent les mêmes soins de base, seul le prix de la prime change."}</>,
  <>{"Économisez jusqu'à "}
    <strong className="font-medium text-ink">{`CHF ${formatChf(economieMax() * 12)} par an`}</strong>
    {" sur votre assurance LAMal en comparant les assureurs, les franchises et les modèles d'assurance disponibles."}</>,
  <>{"Vous pouvez aussi avoir droit à un subside selon votre situation : "}
    <strong className="font-medium text-ink">28 % des résidents en bénéficient</strong>
    {", soit environ 2,5 millions de personnes. Cette subvention cantonale réduit votre prime LAMal et représente en moyenne une économie de "}
    <strong className="font-medium text-ink">{`CHF ${formatChf(subsideMoyen() * 12)} par an`}</strong>
    {"."}</>,
]

export default function GuideLamalPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── Hero ── */}
      <section className="bg-white border-b border-edge pt-12 pb-14">
        <div className="container-xl">
          <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'LAMal', href: '/sante' }, { label: 'Comprendre la LAMal' }]} />

          <h1 className="text-4xl sm:text-5xl font-bold text-ink leading-tight mb-4">
            Guide complet LAMal 2026
          </h1>
          <p className="text-[16px] text-slate max-w-2xl leading-relaxed mb-10">
            Pour économiser sur votre prime LAMal, ajustez votre franchise et adaptez votre modèle d’assurance. Vérifiez aussi vos droits aux subsides.
          </p>

          <HeroStats stats={heroStats} className="mb-8" />
        </div>
      </section>

      {/* ── Zone 2 — Navigation rapide ── */}
      <div className="bg-cloud border-b border-edge py-8">
        <div className="container-xl grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white border border-edge rounded-xl p-5">
            <p className="text-2xl font-semibold text-ink mb-3">En bref</p>
            <ul className="space-y-3">
              {enBref.map((phrase, i) => (
                <li key={i} className="flex gap-2.5 text-[16px] text-slate leading-relaxed">
                  <span className="text-brand font-bold shrink-0 mt-0.5" aria-hidden="true">•</span>
                  <span>{phrase}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-edge rounded-xl p-5">
            <p className="text-2xl font-semibold text-ink mb-3">Sommaire</p>
            <ul className="space-y-1">
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="block text-[16px] text-slate leading-relaxed hover:text-brand hover:bg-cloud px-2 py-1 rounded transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Zone 3 — Contenu détaillé ── */}
      <div className="container-xl py-12">
        <article className="space-y-4">

            {/* 1 — Définition */}
            <section id="definition" className="pt-2">
              <h2 className="article-h2">1. Qu'est-ce que la LAMal ?</h2>
              <p className="article-p">
                La <strong>loi fédérale sur l'assurance-maladie (LAMal)</strong> est la loi suisse qui rend
                l'assurance maladie de base obligatoire pour toute personne résidant en Suisse, en vigueur
                depuis le 1<sup>er</sup> janvier 1996. Elle garantit à chaque assuré un catalogue de
                prestations standardisées, identiques chez les 34 caisses agréées par l'OFSP.
              </p>
              <p className="article-p">
                Contrairement aux assurances complémentaires (LCA), les prestations de base LAMal ne peuvent
                être ni refusées ni exclues pour des raisons de santé : tout résident en Suisse a le droit
                d'être assuré, sans sélection médicale.
              </p>
            </section>

            {/* 2 — Couverture */}
            <section id="couverture">
              <h2 className="article-h2">2. Ce que couvre la LAMal</h2>
              <p className="article-p">
                Le catalogue des prestations obligatoires est défini et révisé par l'OFSP.
                Voici les prestations prises en charge après franchise et quote-part :
              </p>

              <h3 className="article-h3">Soins ambulatoires</h3>
              <ul className="space-y-2 mb-6">
                {[
                  'Médecin de famille et spécialistes (avec renvoi médical selon le modèle)',
                  'Soins d\'urgence 24 heures sur 24, 7 jours sur 7',
                  'Analyses de laboratoire et imagerie médicale prescrite',
                  'Physiothérapie (sur prescription)',
                  'Psychothérapie (psychologues agréés, depuis 2022)',
                  'Médicaments sur la Liste des spécialités (LS)',
                  'Soins infirmiers à domicile (spitex)',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-[16px] text-slate">
                    <svg className="w-4 h-4 text-brand mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="article-h3">Hospitalisation</h3>
              <ul className="space-y-2 mb-6">
                {[
                  'Chambre commune, dans tout hôpital agréé par le canton',
                  'Chirurgie, soins intensifs, réhabilitation',
                  'Maternité (accouchement, soins pré et post-partum)',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-[16px] text-slate">
                    <svg className="w-4 h-4 text-brand mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <KeyFact>
                Non couvert par la LAMal de base : soins dentaires (sauf accident ou maladie grave),
                lunettes et lentilles, médecine alternative non prescrite, chambre privée à l&apos;hôpital.
                Ces prestations relèvent des assurances complémentaires LCA.
              </KeyFact>

              <div className="mt-6">
                <Link href="/sante/lamal-vs-lca" className="text-brand hover:underline text-[16px] font-medium">
                  Comprendre la différence LAMal et complémentaire →
                </Link>
              </div>
            </section>

            {/* 3 — Primes */}
            <section id="primes">
              <h2 className="article-h2">3. Primes LAMal 2026 par canton</h2>
              <p className="article-p">
                Primes moyennes indicatives 2026 pour un <strong>adulte (26 ans et +)</strong>,
                modèle standard, franchise de CHF 300. Les primes effectives varient selon l'assureur.
              </p>

              <div className="overflow-x-auto border border-edge rounded-[8px]">
                <table className="stripe-table w-full">
                  <thead>
                    <tr>
                      <th className="text-left whitespace-nowrap">Canton</th>
                      <th className="text-left whitespace-nowrap">Prime par mois</th>
                      <th className="text-left whitespace-nowrap">Prime par an</th>
                    </tr>
                  </thead>
                  <tbody>
                    {premiums.map((c) => (
                      <tr key={c.code}>
                        <td className="font-medium text-ink whitespace-nowrap">
                          <div className="flex items-center gap-4">
                            <span className="inline-flex items-center justify-center w-10 py-0.5 rounded text-[16px] font-bold bg-navy text-white shrink-0 text-center">
                              {c.code}
                            </span>
                            {c.name}
                          </div>
                        </td>
                        <td className="font-semibold text-ink whitespace-nowrap">CHF {c.prime.toLocaleString('fr-CH')}</td>
                        <td className="text-slate whitespace-nowrap">
                          CHF {(c.prime * 12).toLocaleString('fr-CH', { maximumFractionDigits: 0 }).replace(/['\u2019\u202F]/g, ' ')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[16px] text-slate/60 mt-3">
                Adulte 35 ans, modèle standard, franchise de CHF 300, données OFSP 2026.
              </p>

              <div className="mt-6">
                <Link href="/sante/comparateur" className="text-brand hover:underline text-[16px] font-medium">
                  Trouver la caisse la moins chère dans mon canton →
                </Link>
              </div>
            </section>

            {/* 4 — Assureurs */}
            <section id="assureurs">
              <h2 className="article-h2">4. Principaux assureurs LAMal en Suisse</h2>
              <p className="article-p">
                34 caisses sont agréées par l'OFSP. Les prestations de base sont identiques
                chez tous les assureurs. Seules les primes, la qualité du service et les options
                complémentaires diffèrent. Comparez toujours les primes dans votre canton.
              </p>
              <div className="overflow-x-auto border border-edge rounded-[8px] mb-4">
                <table className="stripe-table w-full">
                  <thead>
                    <tr>
                      <th className="text-left whitespace-nowrap">Assureur</th>
                      <th className="text-left whitespace-nowrap">Part de marché</th>
                      <th className="text-left whitespace-nowrap hidden sm:table-cell">Caractéristiques</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assureurs.map((a) => (
                      <tr key={a.name}>
                        <td className="font-semibold text-ink whitespace-nowrap">{a.name}</td>
                        <td className="font-medium text-brand whitespace-nowrap">{a.part}</td>
                        <td className="hidden sm:table-cell">{a.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <KeyFact>
                La caisse la plus avantageuse dépend de votre âge, de votre modèle d&apos;assurance et de votre franchise.
                Ces trois leviers déterminent quelle caisse offre la prime la moins chère pour votre situation,
                avec des écarts qui peuvent atteindre jusqu&apos;à CHF 180 par mois pour un adulte.
              </KeyFact>

            </section>

            {/* 5 — Franchise */}
            <section id="franchise">
              <h2 className="article-h2">5. Choisir sa franchise LAMal</h2>
              <p className="article-p">
                Choisir la bonne franchise est l&apos;un des leviers les plus efficaces pour réduire votre prime LAMal.
                Pour un adulte sans frais médicaux, en passant de la franchise de CHF 300 à la franchise de CHF 2 500, vous économisez en moyenne{' '}
                <strong className="font-medium text-ink">CHF {formatChf(economieAnnuelle)} par an</strong>{' '}
                sur votre prime, soit environ{' '}
                <strong className="font-medium text-ink">CHF {formatChf(economieMensuelle)} par mois</strong>.
              </p>
              <p className="article-p">
                Votre prime mensuelle et votre franchise évoluent en sens inverse : une franchise élevée réduit votre prime et vous fait économiser chaque mois,
                mais augmente votre reste à charge en cas de frais médicaux.
                La franchise la mieux adaptée à votre situation est donc celle qui équilibre l&apos;économie mensuelle sur la prime et le reste à charge potentiel en cas de soins.
              </p>
              <p className="article-p">
                En cas de soins, votre reste à charge se compose de deux éléments : la franchise (montant fixe annuel que vous payez vous-même avant l&apos;intervention de l&apos;assurance),
                puis la quote-part (10 % des frais au-delà de la franchise, plafonnée à{' '}
                <strong className="font-medium text-ink">CHF 700 par an</strong> pour un adulte et{' '}
                <strong className="font-medium text-ink">CHF 350 par an</strong> pour un enfant).
              </p>
              <p className="article-p">
                Six niveaux de franchise s&apos;appliquent aux adultes (de CHF 300 à CHF 2 500 par an) comme aux enfants (de CHF 0 à CHF 600 par an).
                Le niveau le plus économique dépend de vos frais médicaux annuels et de votre situation personnelle.
              </p>
              <KeyFact label="À retenir">
                Pour un adulte (26 ans et plus), la franchise de CHF 2 500 reste avantageuse tant que vos frais médicaux annuels restent inférieurs à{' '}
                <strong className="font-medium text-ink">CHF {formatChf(seuilAdulte)}</strong>.
                Au-delà, la franchise de CHF 300 devient plus économique. Ce seuil descend à{' '}
                <strong className="font-medium text-ink">CHF {formatChf(seuilJA)}</strong>{' '}
                pour un jeune adulte (19 à 25 ans) et à{' '}
                <strong className="font-medium text-ink">CHF {formatChf(seuilEnfant)}</strong>{' '}
                pour un enfant (0 à 18 ans).
              </KeyFact>
              <div className="mt-6">
                <Link href="/sante/franchise" className="text-brand hover:underline text-[16px] font-medium">
                  Guide complet : choisir sa franchise LAMal →
                </Link>
              </div>
            </section>

            {/* 6 — Modèles */}
            <section id="modeles">
              <h2 className="article-h2">6. Choisir son modèle d'assurance LAMal</h2>
              <p className="article-p">
                Chaque modèle impose des contraintes différentes sur l'accès aux soins.
                Les modèles alternatifs réduisent la prime en échange d'une porte d'entrée obligatoire.
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: 'Standard (libre choix)',
                    reduction: null,
                    border: 'border-brand',
                    desc: "Accès direct à n'importe quel médecin ou spécialiste en Suisse, sans restriction. C'est le modèle le plus cher, la référence pour comparer les alternatives.",
                  },
                  {
                    title: 'Médecin de famille',
                    reduction: `jusqu'à −${hamMaxPct} %`,
                    border: 'border-brand',
                    desc: `Vous consultez d'abord votre médecin de famille, qui vous oriente si besoin vers un spécialiste. Réduction moyenne de ${hamMoyPct} % (jusqu'à −${hamMaxPct} %) selon la caisse et le canton.`,
                  },
                  {
                    title: 'Centre médical',
                    reduction: `jusqu'à −${hmoMaxPct} %`,
                    border: 'border-brand',
                    desc: `Vous êtes rattaché à un réseau fermé de médecins agréés (cabinet ou centre médical). Réseau limité en zones rurales. Réduction moyenne de ${hmoMoyPct} % (jusqu'à −${hmoMaxPct} %) selon la région.`,
                  },
                  {
                    title: 'Télémédecine (conseil téléphonique)',
                    reduction: `jusqu'à −${divMaxPct} %`,
                    border: 'border-brand',
                    desc: `Première consultation par téléphone ou application avant tout rendez-vous en cabinet (Medgate, Medi24...). Disponible 24 heures sur 24. Réduction moyenne de ${divMoyPct} % (jusqu'à −${divMaxPct} %) selon la caisse.`,
                  },
                ].map((m, i) => (
                  <div key={i} className={`bg-white border ${m.border} border-l-4 rounded-[8px] p-5`}>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-ink text-[16px]">{m.title}</h3>
                      {m.reduction && (
                        <span className="text-[16px] font-semibold text-brand bg-blue-tint border border-brand/20 px-2.5 py-0.5 rounded-full shrink-0">
                          {m.reduction}
                        </span>
                      )}
                    </div>
                    <p className="text-[16px] text-slate">{m.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Link href="/sante/modeles" className="text-brand hover:underline text-[16px] font-medium">
                  Comparer les 4 modèles en détail →
                </Link>
              </div>
            </section>

            {/* 7 — Économies */}
            <section id="economies">
              <h2 className="article-h2">7. Économies possibles en changeant de caisse</h2>
              <p className="article-p">
                Certains cantons sont divisés en plusieurs régions de prime. Les écarts de
                primes entre caisses au sein d'une même région sont significatifs. Voici l'économie
                maximale réalisable en choisissant la caisse la moins chère plutôt que la plus chère,
                au sein de la même région, pour les cantons ci-dessous :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {economies.map((r) => (
                  <div key={r.canton} className="bg-cloud border border-edge rounded-[8px] p-5">
                    <p className="font-semibold text-ink mb-1">{r.canton}</p>
                    <p className="text-2xl font-bold text-brand">
                      {r.annuel}
                      <span className="text-[16px] font-normal text-slate"> par an</span>
                    </p>
                    <p className="text-[16px] text-slate mt-0.5">soit {r.mensuel} par mois d'économie</p>
                  </div>
                ))}
              </div>
              <p className="text-[16px] text-slate/60 mb-6">
                Profil : adulte 35 ans, modèle standard, franchise de CHF 300.
              </p>
              <KeyFact>
                Ces chiffres sont des estimations reposant sur les écarts de primes constatés en 2026
                pour un adulte, modèle standard, franchise de CHF 300. Les économies réelles dépendent
                de votre situation individuelle.
              </KeyFact>

            </section>

            {/* 8 — Changer */}
            <section id="changer">
              <h2 className="article-h2">8. Comment changer de caisse maladie ?</h2>

              <p className="article-p">
                Le changement ordinaire se fait au 1er janvier, sur résiliation envoyée avant le 30 novembre.
                En cas de hausse de prime annoncée par votre caisse, un délai exceptionnel permet de résilier
                dans le mois suivant la notification, pour un changement au 31 décembre.
              </p>

              <div className="overflow-x-auto border border-edge rounded-[8px] mb-6">
                <table className="stripe-table w-full">
                  <thead>
                    <tr>
                      <th className="text-left whitespace-nowrap">Situation</th>
                      <th className="text-left whitespace-nowrap">Date limite</th>
                      <th className="text-left whitespace-nowrap">Prise d'effet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Changement ordinaire', '30 novembre', '1er janvier'],
                      ['Hausse de prime annoncée', '30 novembre (1 mois après notification)', '31 décembre'],
                      ['Changement de canton', 'Dès effectivité du changement', 'Selon accord'],
                    ].map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j} className={j === 0 ? 'font-medium text-ink whitespace-nowrap' : 'whitespace-nowrap'}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <ol className="space-y-4 mb-6">
                {[
                  { n: '1', t: 'Comparez les primes', d: 'Dès octobre, comparez sur priminfo.ch ou via notre service.' },
                  { n: '2', t: 'Inscrivez-vous à la nouvelle caisse', d: 'Elle gère souvent la résiliation à votre place.' },
                  { n: '3', t: 'Envoyez la résiliation', d: 'Lettre recommandée à votre ancien assureur avant le 30 novembre.' },
                  { n: '4', t: "Recevez votre carte d'assuré", d: "Valide dès le 1er janvier de l'année suivante." },
                ].map((s) => (
                  <li key={s.n} className="flex gap-4">
                    <span className="w-8 h-8 bg-brand text-white rounded-full flex items-center justify-center text-[16px] font-semibold shrink-0 mt-0.5">
                      {s.n}
                    </span>
                    <div>
                      <span className="font-semibold text-ink text-[16px]">{s.t} : </span>
                      <span className="text-slate text-[16px]">{s.d}</span>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-6">
                <Link href="/sante/changer-de-caisse" className="text-brand hover:underline text-[16px] font-medium">
                  Guide complet : changer de caisse avant le 30 novembre →
                </Link>
              </div>
            </section>

            {/* 9 — Subsides */}
            <section id="subsides">
              <h2 className="article-h2">9. Subsides LAMal : qui y a droit ?</h2>
              <p className="article-p">
                Les <strong>subsides de primes</strong> sont des aides financières versées par les cantons
                aux personnes dont les revenus sont modestes. 28 % de la population suisse en bénéficient.
              </p>
              <p className="article-p">
                Les critères d'éligibilité varient selon le canton. En règle générale, les subsides sont
                accordés aux personnes dont le revenu imposable, et parfois la fortune, sont inférieurs
                à certains seuils cantonaux. Les familles monoparentales et les ménages à faibles revenus
                sont prioritaires.
              </p>
              <p className="article-p">
                Dans certains cantons, les subsides sont attribués automatiquement sur
                la base de la déclaration d'impôts. Pour les autres, une demande est à déposer auprès du
                service cantonal compétent, généralement avant le 31 mars.
              </p>
              <KeyFact>
                Si vous pensez avoir droit à un subside mais n&apos;en avez pas reçu,
                contactez votre caisse maladie ou le service cantonal. Les subsides non réclamés ne sont
                pas versés rétroactivement dans la plupart des cantons.
              </KeyFact>

              <div className="mt-6">
                <Link href="/sante/subsides" className="text-brand hover:underline text-[16px] font-medium">
                  Calculer mes subsides LAMal →
                </Link>
              </div>
            </section>

            {/* 10 — FAQ */}
            <section id="faq" className="border-t border-edge pt-8">
              <FAQ items={faqItems} title="10. Questions fréquentes sur la LAMal" />
            </section>

            {/* Formulaire contact */}
            <NeedHelpSection />

            {/* Bandeau MSI */}
            <AuthorBio publishedDate="1er janvier 2026" updatedDate="22 avril 2026" />

            {/* Guides associés */}
            <section>
              <p className="text-[16px] font-semibold text-slate uppercase tracking-widest mb-4">
                Guides associés
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { href: '/sante/franchise',        label: 'Choisir sa franchise' },
                  { href: '/sante/modeles',           label: 'Les 4 modèles comparés' },
                  { href: '/sante/lamal-vs-lca',      label: 'LAMal et complémentaire LCA' },
                  { href: '/sante/changer-de-caisse', label: 'Changer de caisse maladie' },
                ].map(({ href, label }) => (
                  <Link key={href} href={href}
                    className="flex items-center gap-2 text-[16px] text-slate hover:text-brand border border-edge rounded-[8px] px-4 py-3 transition-colors hover:border-brand/30">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {label}
                  </Link>
                ))}
              </div>
            </section>

        </article>
      </div>
    </>
  )
}
