import type { Metadata } from 'next'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FAQ from '@/components/ui/FAQ'
import Link from 'next/link'
import AuthorBio from '@/components/ui/AuthorBio'
import NeedHelpSection from '@/components/ui/NeedHelpSection'

export const metadata: Metadata = {
  title: 'Guide complet LAMal 2026 — Primes, franchises, modèles et subsides',
  description:
    "Guide LAMal 2026 : primes par canton (OFSP), franchises 300–2500 CHF avec seuil d'équilibre, 4 modèles d'assurance, changement de caisse et subsides.",
  openGraph: {
    title: 'Guide complet LAMal 2026 — Primes, franchises et subsides',
    description: 'La référence LAMal 2026 : primes par canton, franchises, modèles et subsides. Données OFSP.',
    url: 'https://my-swiss-insurance.ch/lamal/guide',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Guide complet LAMal 2026 — Primes, franchises, modèles et subsides',
  datePublished: '2026-01-01',
  dateModified: '2026-04-22',
  author: { '@type': 'Organization', name: 'My Swiss Insurance', url: 'https://my-swiss-insurance.ch' },
  publisher: { '@type': 'Organization', name: 'My Swiss Insurance' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://my-swiss-insurance.ch/lamal/guide' },
}

const faqItems = [
  {
    question: 'La LAMal est-elle obligatoire en Suisse ?',
    answer: "Oui, la LAMal est obligatoire pour toute personne résidant en Suisse. L'affiliation doit intervenir dans les 3 mois suivant l'établissement du domicile ou la naissance. En cas de non-affiliation, les autorités cantonales assignent d'office une caisse maladie. Source : art. 3 LAMal (RS 832.10).",
  },
  {
    question: 'Quelle franchise LAMal choisir ?',
    answer: "Choisissez la franchise 2 500 CHF si vous êtes en bonne santé et consultez peu : vous économisez environ CHF 120 par mois sur la prime. Optez pour la franchise 300 CHF si vos dépenses annuelles dépassent CHF 1 440.",
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

const premiums = [
  { code: 'GE', name: 'Genève',             prime: 710.41 },
  { code: 'TI', name: 'Tessin',             prime: 686.10 },
  { code: 'BS', name: 'Bâle-Ville',         prime: 668.40 },
  { code: 'NE', name: 'Neuchâtel',          prime: 663.19 },
  { code: 'VD', name: 'Vaud',               prime: 637.64 },
  { code: 'JU', name: 'Jura',               prime: 633.21 },
  { code: 'BL', name: 'Bâle-Campagne',      prime: 625.02 },
  { code: 'BE', name: 'Berne',              prime: 578.26 },
  { code: 'SO', name: 'Soleure',            prime: 560.35 },
  { code: 'SH', name: 'Schaffhouse',        prime: 535.68 },
  { code: 'ZH', name: 'Zurich',             prime: 530.65 },
  { code: 'AG', name: 'Argovie',            prime: 527.98 },
  { code: 'VS', name: 'Valais',             prime: 527.58 },
  { code: 'FR', name: 'Fribourg',           prime: 522.27 },
  { code: 'GR', name: 'Grisons',            prime: 517.47 },
  { code: 'AR', name: 'Appenzell Rh.-Ext.', prime: 508.83 },
  { code: 'TG', name: 'Thurgovie',          prime: 508.64 },
  { code: 'LU', name: 'Lucerne',            prime: 499.87 },
  { code: 'GL', name: 'Glaris',             prime: 498.01 },
  { code: 'SG', name: 'Saint-Gall',         prime: 495.59 },
  { code: 'SZ', name: 'Schwyz',             prime: 484.88 },
  { code: 'OW', name: 'Obwald',             prime: 467.13 },
  { code: 'UR', name: 'Uri',                prime: 463.33 },
  { code: 'NW', name: 'Nidwald',            prime: 459.98 },
  { code: 'AI', name: 'Appenzell Rh.-Int.', prime: 424.35 },
  { code: 'ZG', name: 'Zoug',              prime: 403.06 },
]

const franchises = [
  { montant: 300,  prime: 564.61, economie: 0,      ecAnn: 0,    breakEven: 'Réf.',          conseil: 'Recommandé si frais médicaux dépassent CHF 1 300 par an' },
  { montant: 500,  prime: 554.03, economie: 10.58,  ecAnn: 127,  breakEven: 'env. CHF 200',  conseil: 'Avantage limité' },
  { montant: 1000, prime: 526.57, economie: 38.04,  ecAnn: 456,  breakEven: 'env. CHF 700',  conseil: "Bon si moins d'une consultation majeure par an" },
  { montant: 1500, prime: 499.20, economie: 65.41,  ecAnn: 785,  breakEven: 'env. CHF 1 000', conseil: 'Bon équilibre pour personnes saines' },
  { montant: 2000, prime: 471.82, economie: 92.79,  ecAnn: 1113, breakEven: 'env. CHF 1 200', conseil: 'Recommandé sans maladie chronique' },
  { montant: 2500, prime: 444.63, economie: 119.98, ecAnn: 1440, breakEven: 'env. CHF 1 440', conseil: 'Optimal pour adultes très sains' },
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
  { canton: 'Genève',    mensuel: 'CHF 229', annuel: 'CHF 2 753' },
  { canton: 'Neuchâtel', mensuel: 'CHF 146', annuel: 'CHF 1 747' },
  { canton: 'Valais',    mensuel: 'CHF 120', annuel: 'CHF 1 445' },
  { canton: 'Vaud',      mensuel: 'CHF 112', annuel: 'CHF 1 347' },
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

const heroStats = [
  { value: '34',        label: 'Caisses agréées',        sub: 'données OFSP 2026'       },
  { value: 'CHF 2 753', label: 'Économie maximale possible',  sub: 'à Genève, adulte 35 ans' },
  { value: '26',        label: 'Cantons couverts',        sub: 'primes officielles OFSP' },
]

export default function GuideLamalPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── Hero ── */}
      <section className="bg-white border-b border-edge pt-12 pb-14">
        <div className="container-xl">
          <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'LAMal', href: '/lamal' }, { label: 'Comprendre la LAMal' }]} />

          <h1 className="text-4xl sm:text-5xl font-bold text-ink leading-tight mb-4 max-w-3xl">
            Guide complet LAMal 2026
          </h1>
          <p className="text-[18px] text-slate max-w-2xl leading-relaxed mb-10">
            Choisissez la bonne franchise et le bon modèle, vérifiez vos droits aux subsides,
            et économisez sur votre assurance maladie.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {heroStats.map(s => (
              <div key={s.label} className="bg-cloud/60 border border-edge rounded-xl px-5 py-4">
                <div className="text-2xl font-bold text-ink leading-none">{s.value}</div>
                <div className="text-[13px] font-medium text-ink/70 mt-0.5">{s.label}</div>
                <div className="text-[12px] text-slate mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3-column layout ── */}
      <div className="container-xl py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12 items-start">

          {/* Left TOC */}
          <aside className="hidden lg:block">
            <nav className="sticky top-24">
              <p className="text-[11px] font-semibold text-slate uppercase tracking-widest mb-4 px-4">
                Sommaire
              </p>
              <ul className="space-y-0.5">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="toc-link">{item.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Article */}
          <article className="min-w-0 space-y-4">

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
              <p className="text-[13px] text-slate/60 mt-3">
                Source : OFSP (bag.admin.ch), art. 3 LAMal (RS 832.10)
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
                  <li key={i} className="flex gap-3 text-[15px] text-slate">
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
                  <li key={i} className="flex gap-3 text-[15px] text-slate">
                    <svg className="w-4 h-4 text-brand mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="callout-warning flex gap-3">
                <svg className="text-[#378ADD] shrink-0 mt-0.5" width="20" height="20"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                     strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
                  <line x1="9.5" y1="18" x2="14.5" y2="18" />
                  <line x1="10" y1="21" x2="14" y2="21" />
                </svg>
                <p className="text-[14px]">
                  <strong>Non couvert par la LAMal de base :</strong>{' '}
                  soins dentaires (sauf accident ou maladie grave), lunettes et lentilles,
                  médecine alternative non prescrite, chambre privée à l'hôpital.
                  Ces prestations relèvent des assurances complémentaires LCA.
                </p>
              </div>

              <div className="mt-6">
                <Link href="/lamal/lamal-vs-lca" className="text-brand hover:underline text-[15px] font-medium">
                  Comprendre la différence LAMal et complémentaire →
                </Link>
              </div>
            </section>

            {/* 3 — Primes */}
            <section id="primes">
              <h2 className="article-h2">3. Primes LAMal 2026 par canton</h2>
              <p className="article-p">
                Primes moyennes indicatives 2026 pour un <strong>adulte (26 ans et +)</strong>,
                modèle standard, franchise de 300 CHF. Les primes effectives varient selon l'assureur.
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
                          <span className="text-slate/60 text-[12px] mr-2">{c.code}</span>
                          {c.name}
                        </td>
                        <td className="font-semibold text-ink whitespace-nowrap">CHF {c.prime.toFixed(2)}</td>
                        <td className="text-slate whitespace-nowrap">
                          CHF {(c.prime * 12).toLocaleString('fr-CH', { maximumFractionDigits: 0 }).replace(/['\u2019\u202F]/g, ' ')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[13px] text-slate/60 mt-3">
                Adultes 26 ans et +, modèle standard, franchise 300 CHF. Source : OFSP, primes moyennes cantonales 2026.
              </p>

              <div className="mt-6">
                <Link href="/lamal/comparateur" className="text-brand hover:underline text-[15px] font-medium">
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
              <div className="callout flex gap-3">
                <svg className="text-[#378ADD] shrink-0 mt-0.5" width="20" height="20"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                     strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
                  <line x1="9.5" y1="18" x2="14.5" y2="18" />
                  <line x1="10" y1="21" x2="14" y2="21" />
                </svg>
                <p className="text-[15px]">
                  La caisse la moins chère dans votre canton n'est pas forcément la même que celle de
                  votre voisin. Les écarts entre assureurs dans un même canton atteignent jusqu'à
                  CHF 180 par mois pour un adulte.
                </p>
              </div>

            </section>

            {/* 5 — Franchise */}
            <section id="franchise">
              <h2 className="article-h2">5. Choisir sa franchise LAMal</h2>
              <p className="article-p">
                La franchise est le montant annuel que vous payez avant que l'assurance intervienne.
                Une franchise élevée réduit la prime mensuelle mais augmente le risque financier en cas de maladie.
              </p>

              <h3 className="article-h3">Tableau comparatif (exemple Zurich, adulte)</h3>
              <div className="overflow-x-auto border border-edge rounded-[8px] mb-6">
                <table className="stripe-table w-full">
                  <thead>
                    <tr>
                      <th className="text-left whitespace-nowrap">Franchise</th>
                      <th className="text-left whitespace-nowrap">Prime par mois</th>
                      <th className="text-left whitespace-nowrap">Économie par an</th>
                      <th className="text-left whitespace-nowrap">Seuil d'équilibre</th>
                    </tr>
                  </thead>
                  <tbody>
                    {franchises.map((f) => (
                      <tr key={f.montant}>
                        <td className="font-bold text-brand whitespace-nowrap">CHF {f.montant.toLocaleString('fr-CH')}</td>
                        <td className="text-ink whitespace-nowrap">CHF {f.prime.toFixed(2)}</td>
                        <td className="text-[#1d4ed8] font-medium whitespace-nowrap">
                          {f.ecAnn > 0 ? `−CHF ${f.ecAnn}` : '-'}
                        </td>
                        <td className="font-medium whitespace-nowrap">{f.breakEven}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="callout flex gap-3">
                <svg className="text-[#378ADD] shrink-0 mt-0.5" width="20" height="20"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                     strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
                  <line x1="9.5" y1="18" x2="14.5" y2="18" />
                  <line x1="10" y1="21" x2="14" y2="21" />
                </svg>
                <div>
                  <p className="font-semibold text-ink mb-2">Comment lire le tableau ?</p>
                  <p className="text-[15px]">
                    <strong>Exemple 300 vs 2 500 CHF par an :</strong> l'économie annuelle sur la prime est de CHF 1 440.
                    Si vos frais médicaux annuels dépassent <strong>CHF 1 440</strong>, la franchise 300 CHF est plus avantageuse.
                    En dessous, la franchise 2 500 CHF vous fait économiser davantage au total.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Link href="/lamal/franchise" className="text-brand hover:underline text-[15px] font-medium">
                  Guide complet : choisir sa franchise LAMal →
                </Link>
              </div>
            </section>

            {/* 6 — Modèles */}
            <section id="modeles">
              <h2 className="article-h2">6. Les 4 modèles d'assurance LAMal</h2>
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
                    reduction: "jusqu'à −20%",
                    border: 'border-brand',
                    desc: "Vous consultez d'abord votre médecin de famille, qui vous oriente si besoin vers un spécialiste. Réduction moyenne de 11% (jusqu'à −20%) selon la caisse et le canton.",
                  },
                  {
                    title: 'HMO (centre médical)',
                    reduction: "jusqu'à −20%",
                    border: 'border-brand',
                    desc: "Vous êtes rattaché à un réseau fermé de médecins agréés (cabinet ou centre HMO). Réseau limité en zones rurales. Réduction moyenne de 12% (de −3% à −20%) selon la région.",
                  },
                  {
                    title: 'Telmed (conseil téléphonique)',
                    reduction: "jusqu'à −24%",
                    border: 'border-[#3b82f6]',
                    desc: 'Première consultation par téléphone ou application avant tout rendez-vous en cabinet (Medgate, Medi24...). Disponible 24 heures sur 24. Réduction moyenne de 12% (de −5% à −24%) selon la caisse.',
                  },
                ].map((m, i) => (
                  <div key={i} className={`bg-white border ${m.border} border-l-4 rounded-[8px] p-5`}>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-ink text-[16px]">{m.title}</h3>
                      {m.reduction && (
                        <span className="text-[12px] font-semibold text-[#1d4ed8] bg-[#dbeafe] border border-[#1d4ed8]/20 px-2.5 py-0.5 rounded-full shrink-0">
                          {m.reduction}
                        </span>
                      )}
                    </div>
                    <p className="text-[15px] text-slate">{m.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Link href="/lamal/modeles" className="text-brand hover:underline text-[15px] font-medium">
                  Comparer les 4 modèles en détail →
                </Link>
              </div>
            </section>

            {/* 7 — Économies */}
            <section id="economies">
              <h2 className="article-h2">7. Économies possibles en changeant de caisse</h2>
              <p className="article-p">
                Certains cantons sont en effet divisés en plusieurs régions de prime. Les écarts de
                primes entre caisses au sein d'une même région sont significatifs. Voici l'économie
                maximale réalisable en choisissant la caisse la moins chère plutôt que la plus chère,
                au sein de la même région, pour les cantons ci-dessous :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {economies.map((r) => (
                  <div key={r.canton} className="bg-cloud border border-edge rounded-[8px] p-5">
                    <p className="font-semibold text-ink mb-1">{r.canton}</p>
                    <p className="text-2xl font-bold text-[#1d4ed8]">
                      {r.annuel}
                      <span className="text-[14px] font-normal text-slate"> par an</span>
                    </p>
                    <p className="text-[14px] text-slate mt-0.5">soit {r.mensuel} par mois d'économie</p>
                  </div>
                ))}
              </div>
              <p className="text-[13px] text-slate/60 mb-6">
                Profil : adulte 35 ans, modèle standard, franchise 300 CHF.
              </p>
              <div className="callout-warning flex gap-3">
                <svg className="text-[#378ADD] shrink-0 mt-0.5" width="20" height="20"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                     strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
                  <line x1="9.5" y1="18" x2="14.5" y2="18" />
                  <line x1="10" y1="21" x2="14" y2="21" />
                </svg>
                <p className="text-[15px]">
                  <strong>Ces chiffres sont des estimations</strong> reposant sur les écarts de primes
                  constatés en 2026 pour un adulte, modèle standard, franchise 300 CHF.
                  Les économies réelles dépendent de votre situation individuelle.
                </p>
              </div>

            </section>

            {/* 8 — Changer */}
            <section id="changer">
              <h2 className="article-h2">8. Comment changer de caisse maladie</h2>

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
                    <span className="w-7 h-7 bg-brand text-white rounded-full flex items-center justify-center text-[13px] font-semibold shrink-0 mt-0.5">
                      {s.n}
                    </span>
                    <div>
                      <span className="font-semibold text-ink text-[15px]">{s.t} : </span>
                      <span className="text-slate text-[15px]">{s.d}</span>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-6">
                <Link href="/lamal/changer-de-caisse" className="text-brand hover:underline text-[15px] font-medium">
                  Guide complet : changer de caisse avant le 30 novembre →
                </Link>
              </div>
            </section>

            {/* 9 — Subsides */}
            <section id="subsides">
              <h2 className="article-h2">9. Subsides LAMal : qui y a droit ?</h2>
              <p className="article-p">
                Les <strong>subsides de primes</strong> sont des aides financières versées par les cantons
                aux personnes dont les revenus sont modestes. Environ 25 à 30% de la population suisse en bénéficie.
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
              <div className="callout-success flex gap-3">
                <svg className="text-[#378ADD] shrink-0 mt-0.5" width="20" height="20"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                     strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
                  <line x1="9.5" y1="18" x2="14.5" y2="18" />
                  <line x1="10" y1="21" x2="14" y2="21" />
                </svg>
                <p className="text-[15px]">
                  <strong>Astuce :</strong> Si vous pensez avoir droit à un subside mais n'en avez pas reçu,
                  contactez votre caisse maladie ou le service cantonal. Les subsides non réclamés ne sont
                  pas versés rétroactivement dans la plupart des cantons.
                </p>
              </div>

              <div className="mt-6">
                <Link href="/lamal/subsides" className="text-brand hover:underline text-[15px] font-medium">
                  Calculer mes subsides LAMal →
                </Link>
              </div>
            </section>

            {/* 10 — FAQ */}
            <section id="faq">
              <FAQ items={faqItems} title="10. Questions fréquentes sur la LAMal" />
            </section>

            {/* Formulaire contact */}
            <NeedHelpSection />

            {/* Bandeau MSI */}
            <AuthorBio publishedDate="1er janvier 2026" updatedDate="22 avril 2026" />

            {/* Guides associés */}
            <section className="pt-8 border-t border-edge mt-4">
              <p className="text-[13px] font-semibold text-slate uppercase tracking-widest mb-4">
                Guides associés
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { href: '/lamal/franchise',        label: 'Choisir sa franchise' },
                  { href: '/lamal/modeles',           label: 'Les 4 modèles comparés' },
                  { href: '/lamal/lamal-vs-lca',      label: 'LAMal et complémentaire LCA' },
                  { href: '/lamal/changer-de-caisse', label: 'Changer de caisse maladie' },
                ].map(({ href, label }) => (
                  <Link key={href} href={href}
                    className="flex items-center gap-2 text-[14px] text-slate hover:text-brand border border-edge rounded-[8px] px-4 py-3 transition-colors hover:border-brand/30">
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
      </div>
    </>
  )
}
