import type { Metadata } from 'next'
import AuthorBio from '@/components/AuthorBio'
import Breadcrumb from '@/components/Breadcrumb'
import FAQ from '@/components/FAQ'
import Link from 'next/link'
import LeadForm from '@/components/LeadForm'

export const metadata: Metadata = {
  title: 'Guide complet LAMal 2026 — Primes, franchises, modèles et subsides',
  description:
    'Guide LAMal 2026 : primes par canton (OFSP), franchises 300–2500 CHF avec break-even, 4 modèles d\'assurance, changement de caisse et subsides.',
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
  dateModified: '2026-04-01',
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
    answer: "Choisissez la franchise 300 CHF si vos frais médicaux annuels dépassent environ CHF 1'300. Optez pour 2500 CHF si vous êtes en bonne santé : vous économisez ~CHF 100/mois sur la prime mais prenez en charge jusqu'à CHF 2'500 de frais. Le break-even se situe autour de CHF 1'300 de dépenses médicales annuelles.",
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
    answer: "La caisse la moins chère dépend de votre canton, de votre âge et du modèle choisi. Pour un adulte à Nidwald, les primes débutent autour de CHF 280/mois. À Genève, elles dépassent CHF 530. Les écarts entre caisses dans un même canton atteignent CHF 100–180/mois.",
  },
  {
    question: "Les prestations sont-elles identiques dans toutes les caisses maladie ?",
    answer: "Oui. Pour la LAMal de base, les prestations sont strictement identiques chez tous les assureurs agréés par l'OFSP. Seules les primes, la qualité du service client et les options complémentaires (LCA) diffèrent.",
  },
]

const premiums = [
  { code: 'GE', name: 'Genève',              prime: 710.41 },
  { code: 'TI', name: 'Tessin',              prime: 686.10 },
  { code: 'BS', name: 'Bâle-Ville',          prime: 668.40 },
  { code: 'NE', name: 'Neuchâtel',           prime: 663.19 },
  { code: 'VD', name: 'Vaud',                prime: 637.64 },
  { code: 'JU', name: 'Jura',                prime: 633.21 },
  { code: 'BL', name: 'Bâle-Campagne',       prime: 625.02 },
  { code: 'BE', name: 'Berne',               prime: 578.26 },
  { code: 'SO', name: 'Soleure',             prime: 560.35 },
  { code: 'SH', name: 'Schaffhouse',         prime: 535.68 },
  { code: 'ZH', name: 'Zurich',              prime: 530.65 },
  { code: 'AG', name: 'Argovie',             prime: 527.98 },
  { code: 'VS', name: 'Valais',              prime: 527.58 },
  { code: 'FR', name: 'Fribourg',            prime: 522.27 },
  { code: 'GR', name: 'Grisons',             prime: 517.47 },
  { code: 'AR', name: 'Appenzell Rh.-Ext.',  prime: 508.83 },
  { code: 'TG', name: 'Thurgovie',           prime: 508.64 },
  { code: 'LU', name: 'Lucerne',             prime: 499.87 },
  { code: 'GL', name: 'Glaris',              prime: 498.01 },
  { code: 'SG', name: 'Saint-Gall',          prime: 495.59 },
  { code: 'SZ', name: 'Schwyz',              prime: 484.88 },
  { code: 'OW', name: 'Obwald',              prime: 467.13 },
  { code: 'UR', name: 'Uri',                 prime: 463.33 },
  { code: 'NW', name: 'Nidwald',             prime: 459.98 },
  { code: 'AI', name: 'Appenzell Rh.-Int.',  prime: 424.35 },
  { code: 'ZG', name: 'Zoug',               prime: 403.06 },
]

const franchises = [
  { montant: 300,  prime: 564.61, economie: 0,      ecAnn: 0,    breakEven: '—',          conseil: "Recommandé si frais annuels > CHF 1'300" },
  { montant: 500,  prime: 554.03, economie: 10.58,  ecAnn: 127,  breakEven: '~CHF 200',   conseil: 'Avantage limité' },
  { montant: 1000, prime: 526.57, economie: 38.04,  ecAnn: 456,  breakEven: "~CHF 700",   conseil: 'Bon si < 1 consultation majeure/an' },
  { montant: 1500, prime: 499.20, economie: 65.41,  ecAnn: 785,  breakEven: "~CHF 1'000", conseil: 'Bon équilibre pour personnes saines' },
  { montant: 2000, prime: 471.82, economie: 92.79,  ecAnn: 1113, breakEven: "~CHF 1'200", conseil: 'Recommandé sans maladie chronique' },
  { montant: 2500, prime: 444.63, economie: 119.98, ecAnn: 1440, breakEven: "~CHF 1'440", conseil: 'Optimal pour adultes très sains' },
]

const assureurs = [
  { name: 'Assura',    part: '7.2%',  note: 'Souvent la moins chère, service digital' },
  { name: 'Concordia', part: '6.8%',  note: 'Bon service, réseau médecin de famille étendu' },
  { name: 'CSS',       part: '14.1%', note: 'Plus grande caisse suisse, large réseau' },
  { name: 'Helsana',   part: '13.5%', note: 'Application mobile avancée, nombreuses options' },
  { name: 'KPT',       part: '4.2%',  note: 'Compétitive, bonne qualité de service' },
  { name: 'Sanitas',   part: '7.9%',  note: 'Forte en télémédecine et digital' },
  { name: 'SWICA',     part: '10.2%', note: 'Leader en médecine intégrative' },
  { name: 'Visana',    part: '9.1%',  note: 'Forte présence Suisse romande et alémanique' },
]

const economies = [
  { canton: 'Genève',  mensuel: 'CHF 229', annuel: "CHF 2'753" },
  { canton: 'Berne',   mensuel: 'CHF 219', annuel: "CHF 2'632" },
  { canton: 'Valais',  mensuel: 'CHF 163', annuel: "CHF 1'958" },
  { canton: 'Vaud',    mensuel: 'CHF 155', annuel: "CHF 1'863" },
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

export default function GuideLamalPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Page header */}
      <section className="bg-white border-b border-edge pt-12 pb-10">
        <div className="container-xl">
          <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'LAMal', href: '/lamal' }, { label: 'Comprendre la LAMal' }]} />
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="badge">Mis à jour avril 2026</span>
            <span className="badge">Source : OFSP</span>
          </div>
          <h1 className="text-5xl font-bold text-ink leading-tight mb-4 max-w-3xl">
            Guide complet LAMal 2026.
          </h1>
          <p className="text-xl text-slate max-w-2xl leading-relaxed">
            Primes par canton, franchises avec break-even, 4 modèles d'assurance,
            changement de caisse et subsides. La référence LAMal en Suisse romande.
          </p>
        </div>
      </section>

      {/* 3-column docs layout */}
      <div className="container-xl py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] xl:grid-cols-[200px_1fr_320px] gap-12 items-start">

          {/* Left TOC — sticky */}
          <aside className="hidden lg:block">
            <nav className="sticky top-24">
              <p className="text-[11px] font-semibold text-slate uppercase tracking-widest mb-4 px-4">
                Sommaire
              </p>
              <ul className="space-y-0.5">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="toc-link">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-8 px-4">
                <a href="#lead-form"
                  className="block text-center text-[13px] font-medium text-white bg-brand hover:bg-brand-dark rounded-md py-2.5 transition-colors">
                  Comparer gratuitement
                </a>
              </div>
            </nav>
          </aside>

          {/* Article */}
          <article className="min-w-0 space-y-4">
            <AuthorBio publishedDate="1er janvier 2026" updatedDate="13 avril 2026" />

            {/* 1 — Définition */}
            <section id="definition" className="pt-2">
              <h2 className="article-h2">1. Qu'est-ce que la LAMal ?</h2>
              <p className="article-p">
                La <strong>loi fédérale sur l'assurance-maladie (LAMal)</strong> est la loi suisse qui rend
                l'assurance maladie de base obligatoire pour toute personne résidant en Suisse, en vigueur
                depuis le 1<sup>er</sup> janvier 1996. Elle garantit à chaque assuré un catalogue de
                prestations standardisées, identiques chez les 57 caisses agréées par l'OFSP.
              </p>
              <p className="article-p">
                Contrairement aux assurances complémentaires (LCA), les prestations de base LAMal ne peuvent
                être ni refusées ni exclues pour des raisons de santé : tout résident en Suisse a le droit
                d'être assuré, sans sélection médicale.
              </p>
              <div className="callout text-[15px]">
                <strong className="text-ink">Source :</strong>{' '}
                OFSP (bag.admin.ch)
                {' · '}art. 3 LAMal (RS 832.10)
              </div>
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
                  'Médecin de famille et spécialistes (avec referral selon le modèle)',
                  'Soins d\'urgence 24h/24, 7j/7',
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
                  'Division commune dans tout hôpital de la liste cantonale',
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

              <div className="callout-warning text-[14px]">
                <strong>Non couvert par la LAMal de base :</strong>{' '}
                soins dentaires (sauf accident/maladie grave), lunettes/lentilles,
                médecine alternative non prescrite, chambre privée à l'hôpital.
                Ces prestations relèvent des assurances complémentaires LCA.
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
                      <th>Canton</th>
                      <th className="text-right">Prime / mois</th>
                      <th className="text-right">Prime / an</th>
                    </tr>
                  </thead>
                  <tbody>
                    {premiums.map((c, i) => (
                      <tr key={c.code}>
                        <td className="font-medium text-ink">
                          <span className="text-slate/60 text-[12px] mr-2">{c.code}</span>
                          {c.name}
                        </td>
                        <td className="text-right font-semibold text-ink">
                          CHF {c.prime.toFixed(2)}
                        </td>
                        <td className="text-right text-slate">
                          CHF {(c.prime * 12).toLocaleString('fr-CH', { maximumFractionDigits: 0 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[13px] text-slate/60 mt-3">
                Adultes 26 ans et +, modèle standard, franchise 300 CHF. Source : OFSP, primes moyennes cantonales 2026.
              </p>
            </section>

            {/* 4 — Assureurs */}
            <section id="assureurs">
              <h2 className="article-h2">4. Principaux assureurs LAMal en Suisse</h2>
              <p className="article-p">
                57 caisses sont agréées par l'OFSP. Les prestations de base sont identiques
                chez tous les assureurs. Seules les primes, la qualité du service et les options
                complémentaires diffèrent. Comparez toujours les primes pour votre canton spécifique.
              </p>
              <div className="overflow-x-auto border border-edge rounded-[8px] mb-4">
                <table className="stripe-table w-full">
                  <thead>
                    <tr>
                      <th>Assureur</th>
                      <th className="text-center">Part de marché</th>
                      <th className="hidden sm:table-cell">Caractéristiques</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assureurs.map((a) => (
                      <tr key={a.name}>
                        <td className="font-semibold text-ink">{a.name}</td>
                        <td className="text-center font-medium text-brand">{a.part}</td>
                        <td className="hidden sm:table-cell">{a.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="callout text-[15px]">
                <strong>À retenir :</strong> la caisse la moins chère dans votre canton n'est pas
                forcément la même que celle de votre voisin. Les écarts entre assureurs dans un même
                canton atteignent CHF 100–180/mois pour un adulte.
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
                      <th>Franchise</th>
                      <th className="text-right">Prime/mois</th>
                      <th className="text-right">Économie/an</th>
                      <th className="text-right hidden sm:table-cell">Économie/mois</th>
                      <th className="text-center hidden sm:table-cell">Break-even</th>
                    </tr>
                  </thead>
                  <tbody>
                    {franchises.map((f) => (
                      <tr key={f.montant}>
                        <td className="font-bold text-brand">
                          CHF {f.montant.toLocaleString('fr-CH')}
                        </td>
                        <td className="text-right text-ink">CHF {f.prime.toFixed(2)}</td>
                        <td className="text-right text-[#1d4ed8] font-medium">
                          {f.ecAnn > 0 ? `−CHF ${f.ecAnn}` : '—'}
                        </td>
                        <td className="text-right text-[#1d4ed8] font-medium hidden sm:table-cell">
                          {f.economie > 0 ? `−CHF ${f.economie.toFixed(2)}` : '—'}
                        </td>
                        <td className="text-center font-medium hidden sm:table-cell">
                          {f.breakEven}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="callout">
                <p className="font-semibold text-ink mb-2">Comment calculer le break-even ?</p>
                <p className="text-[15px] mb-2">
                  <strong>Formule :</strong> Break-even = Différence de franchise − Économie annuelle sur la prime
                </p>
                <p className="text-[15px]">
                  <strong>Exemple 300 vs 2500 CHF :</strong> différence = CHF 2'200,
                  économie annuelle = CHF 1'224. Break-even = CHF 976.
                  Si vos frais annuels dépassent <strong>CHF 976</strong>, la franchise 300 CHF est plus avantageuse.
                </p>
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
                    border: 'border-edge',
                    desc: 'Liberté totale de consulter n\'importe quel médecin ou spécialiste en Suisse. Tarif de référence, aucune restriction.',
                  },
                  {
                    title: 'Médecin de famille (Hausarzt)',
                    reduction: '−5 à −15%',
                    border: 'border-brand',
                    desc: 'Vous consultez toujours votre médecin de famille en premier avant d\'aller chez un spécialiste. Le plus populaire en Suisse romande.',
                  },
                  {
                    title: 'HMO (centre médical)',
                    reduction: '−15 à −25%',
                    border: 'border-brand',
                    desc: 'Consultation obligatoire dans un centre HMO agréé. Réseau limité en zones rurales, mais forte réduction de prime.',
                  },
                  {
                    title: 'Telmed (hotline médicale)',
                    reduction: '−10 à −15%',
                    border: 'border-[#3b82f6]',
                    desc: 'Avant toute consultation (hors urgence), appel à une hotline médicale (Medgate, Medi24...). Disponible 24h/24 partout en Suisse.',
                  },
                ].map((m, i) => (
                  <div key={i} className={`bg-white border ${m.border} border-l-4 rounded-[8px] p-5`}>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-ink text-[16px]">{m.title}</h3>
                      {m.reduction ? (
                        <span className="text-[12px] font-semibold text-[#1d4ed8] bg-[#dbeafe] border border-[#1d4ed8]/20 px-2.5 py-0.5 rounded-full shrink-0">
                          {m.reduction}
                        </span>
                      ) : (
                        <span className="text-[12px] text-slate bg-cloud border border-edge px-2.5 py-0.5 rounded-full shrink-0">
                          Référence
                        </span>
                      )}
                    </div>
                    <p className="text-[15px] text-slate">{m.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 7 — Économies */}
            <section id="economies">
              <h2 className="article-h2">7. Économies possibles en changeant de caisse</h2>
              <p className="article-p">
                Les écarts de primes entre caisses au sein d'un même canton sont significatifs.
                Voici les économies mensuelles typiques en choisissant la caisse la moins chère
                pour votre profil, par rapport à la moyenne cantonale.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {economies.map((r) => (
                  <div key={r.canton} className="bg-cloud border border-edge rounded-[8px] p-5">
                    <p className="font-semibold text-ink mb-1">{r.canton}</p>
                    <p className="text-2xl font-bold text-[#1d4ed8]">
                      {r.annuel}
                      <span className="text-[14px] font-normal text-slate">/an</span>
                    </p>
                    <p className="text-[14px] text-slate mt-0.5">soit {r.mensuel}/mois d'économie</p>
                  </div>
                ))}
              </div>
              <div className="callout-warning text-[15px]">
                <strong>Ces chiffres sont des estimations</strong> basées sur les écarts de primes
                constatés en 2026 pour un adulte, modèle standard, franchise 300 CHF.
                Les économies réelles dépendent de votre profil exact.
              </div>
            </section>

            {/* 8 — Changer */}
            <section id="changer">
              <h2 className="article-h2">8. Comment changer de caisse maladie</h2>

              <div className="overflow-x-auto border border-edge rounded-[8px] mb-6">
                <table className="stripe-table w-full">
                  <thead>
                    <tr>
                      <th>Situation</th>
                      <th>Date limite</th>
                      <th>Prise d'effet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Changement ordinaire', '30 novembre', '1er janvier'],
                      ['Hausse de prime annoncée', '30 nov. (1 mois après notif.)', '31 décembre'],
                      ['Changement de canton', 'Dès effectivité du changement', 'Selon accord'],
                    ].map((row, i) => (
                      <tr key={i}>
                        {row.map((cell, j) => (
                          <td key={j} className={j === 0 ? 'font-medium text-ink' : ''}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <ol className="space-y-4 mb-4">
                {[
                  { n: '1', t: 'Comparez les primes', d: 'Dès octobre, comparez sur priminfo.ch ou via notre service.' },
                  { n: '2', t: 'Inscrivez-vous à la nouvelle caisse', d: 'Elle gère souvent la résiliation à votre place.' },
                  { n: '3', t: 'Envoyez la résiliation', d: 'Lettre recommandée à votre ancien assureur avant le 30 novembre.' },
                  { n: '4', t: 'Recevez votre carte d\'assuré', d: 'Valide dès le 1er janvier de l\'année suivante.' },
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

              <Link href="/lamal/changer-de-caisse" className="text-brand hover:underline text-[15px] font-medium">
                Guide complet : changer de caisse maladie →
              </Link>
            </section>

            {/* 9 — Subsides */}
            <section id="subsides">
              <h2 className="article-h2">9. Subsides LAMal : qui y a droit ?</h2>
              <p className="article-p">
                Les <strong>subsides de primes</strong> sont des aides financières versées par les cantons
                aux personnes dont les revenus sont modestes. Environ 25 à 30% de la population suisse en bénéficie.
              </p>
              <p className="article-p">
                Les critères varient selon le canton. En règle générale : revenu imposable inférieur à certains
                seuils, résidence permanente en Suisse, familles monoparentales prioritaires.
              </p>
              <p className="article-p">
                Dans plusieurs cantons (VD, GE, NE, BE), les subsides sont attribués automatiquement sur
                la base de la déclaration d'impôts. Pour les autres, une demande est à déposer auprès du
                service cantonal compétent, généralement avant le 31 mars.
              </p>
              <div className="callout-success text-[15px]">
                <strong>Astuce :</strong> Si vous pensez avoir droit à un subside mais n'en avez pas reçu,
                contactez votre caisse maladie ou le service cantonal. Les subsides non réclamés ne sont
                pas versés rétroactivement dans la plupart des cantons.
              </div>
            </section>

            {/* 10 — FAQ */}
            <section id="faq">
              <FAQ items={faqItems} title="10. Questions fréquentes sur la LAMal" />
            </section>

          </article>

          {/* Right sidebar */}
          <aside className="hidden xl:block">
            <div className="sticky top-24 space-y-6">
              <LeadForm compact />

              <div className="bg-white border border-edge rounded-[8px] p-5">
                <p className="text-[12px] font-semibold text-slate uppercase tracking-widest mb-4">Approfondir</p>
                <ul className="space-y-2.5">
                  {[
                    ['/lamal/changer-de-caisse', 'Changer de caisse maladie'],
                    ['/lamal/lamal-vs-lca', 'LAMal vs LCA'],
                    ['/lamal/par-profil', 'Par profil'],
                  ].map(([href, label]) => (
                    <li key={href}>
                      <Link href={href} className="flex items-center gap-2 text-[14px] text-slate hover:text-brand transition-colors">
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </aside>

        </div>
      </div>

    </>
  )
}
