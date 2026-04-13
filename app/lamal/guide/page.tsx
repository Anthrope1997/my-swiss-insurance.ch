import type { Metadata } from 'next'
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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'La LAMal est-elle obligatoire en Suisse ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, la LAMal est obligatoire pour toute personne résidant en Suisse. L'affiliation doit intervenir dans les 3 mois suivant l'établissement du domicile ou la naissance. En cas de non-affiliation, les autorités cantonales assignent d'office une caisse maladie. Source : art. 3 LAMal (RS 832.10).",
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle franchise LAMal choisir ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Choisissez la franchise 300 CHF si vos frais médicaux annuels dépassent environ CHF 1'300. Optez pour 2500 CHF si vous êtes en bonne santé : vous économisez ~CHF 100/mois sur la prime mais prenez en charge jusqu'à CHF 2'500 de frais. Le break-even se situe autour de CHF 1'300 de dépenses médicales annuelles.",
      },
    },
    {
      '@type': 'Question',
      name: "Peut-on changer de caisse maladie en cours d'année ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "En règle générale non. Le changement ordinaire se fait au 1er janvier avec un préavis avant le 30 novembre. Exception : si votre assureur annonce une hausse de prime, vous pouvez résilier dans le mois suivant la notification pour quitter au 31 décembre.",
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle est la différence entre LAMal et LCA ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "La LAMal est l'assurance de base obligatoire couvrant les soins essentiels. La LCA régit les assurances complémentaires facultatives — chambre privée, médecine alternative, soins dentaires — dont les prestations varient selon l'assureur et ne sont pas standardisées.",
      },
    },
    {
      '@type': 'Question',
      name: "Quand faut-il s'inscrire à la LAMal en arrivant en Suisse ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Dans les 3 mois suivant votre prise de domicile en Suisse. Si vous respectez ce délai, la couverture est rétroactive à la date d'arrivée. Passé ce délai, les autorités cantonales vous attribuent d'office une caisse. Source : art. 3 al. 1 et art. 5 LAMal.",
      },
    },
  ],
}

const premiums = [
  { code: 'GE', name: 'Genève', prime: 572.50, variation: '+1.2%' },
  { code: 'VD', name: 'Vaud', prime: 520.40, variation: '+1.1%' },
  { code: 'BS', name: 'Bâle-Ville', prime: 521.60, variation: '+1.1%' },
  { code: 'TI', name: 'Tessin', prime: 491.30, variation: '+1.0%' },
  { code: 'NE', name: 'Neuchâtel', prime: 482.70, variation: '+1.0%' },
  { code: 'BL', name: 'Bâle-Campagne', prime: 476.40, variation: '+1.0%' },
  { code: 'JU', name: 'Jura', prime: 459.30, variation: '+0.8%' },
  { code: 'ZH', name: 'Zurich', prime: 455.10, variation: '+0.9%' },
  { code: 'FR', name: 'Fribourg', prime: 449.80, variation: '+0.9%' },
  { code: 'BE', name: 'Berne', prime: 426.90, variation: '+0.9%' },
  { code: 'SO', name: 'Soleure', prime: 414.30, variation: '+0.8%' },
  { code: 'VS', name: 'Valais', prime: 408.90, variation: '+0.8%' },
  { code: 'AG', name: 'Argovie', prime: 399.60, variation: '+0.8%' },
  { code: 'SH', name: 'Schaffhouse', prime: 398.70, variation: '+0.8%' },
  { code: 'SG', name: 'Saint-Gall', prime: 388.10, variation: '+0.7%' },
  { code: 'LU', name: 'Lucerne', prime: 374.80, variation: '+0.6%' },
  { code: 'GR', name: 'Grisons', prime: 369.40, variation: '+0.7%' },
  { code: 'TG', name: 'Thurgovie', prime: 367.20, variation: '+0.6%' },
  { code: 'ZG', name: 'Zoug', prime: 356.20, variation: '+0.6%' },
  { code: 'AR', name: 'Appenzell Rh.-Ext.', prime: 353.90, variation: '+0.7%' },
  { code: 'GL', name: 'Glaris', prime: 337.50, variation: '+0.5%' },
  { code: 'SZ', name: 'Schwyz', prime: 325.60, variation: '+0.5%' },
  { code: 'AI', name: 'Appenzell Rh.-Int.', prime: 323.50, variation: '+0.4%' },
  { code: 'UR', name: 'Uri', prime: 318.40, variation: '+0.4%' },
  { code: 'OW', name: 'Obwald', prime: 312.10, variation: '+0.4%' },
  { code: 'NW', name: 'Nidwald', prime: 308.70, variation: '+0.3%' },
]

const franchises = [
  { montant: 300,  prime: 455.10, economie: 0,      ecAnn: 0,    breakEven: '—',        conseil: 'Recommandé si frais annuels > CHF 1\'300' },
  { montant: 500,  prime: 440.20, economie: 14.90,  ecAnn: 179,  breakEven: '~CHF 500',  conseil: 'Avantage limité' },
  { montant: 1000, prime: 418.30, economie: 36.80,  ecAnn: 441,  breakEven: '~CHF 1\'000', conseil: 'Bon si < 1 consultation majeure/an' },
  { montant: 1500, prime: 397.40, economie: 57.70,  ecAnn: 692,  breakEven: '~CHF 1\'200', conseil: 'Bon équilibre pour personnes saines' },
  { montant: 2000, prime: 376.50, economie: 78.60,  ecAnn: 943,  breakEven: '~CHF 1\'050', conseil: 'Recommandé sans maladie chronique' },
  { montant: 2500, prime: 353.10, economie: 102.00, ecAnn: 1224, breakEven: '~CHF 1\'300', conseil: 'Optimal pour adultes très sains' },
]

const toc = [
  { id: 'definition', label: "1. Qu'est-ce que la LAMal ?" },
  { id: 'couverture', label: '2. Ce que couvre la LAMal' },
  { id: 'primes', label: '3. Primes 2026 par canton' },
  { id: 'franchise', label: '4. Choisir sa franchise' },
  { id: 'modeles', label: '5. Les 4 modèles' },
  { id: 'changer', label: '6. Comment changer de caisse' },
  { id: 'subsides', label: '7. Subsides' },
  { id: 'faq', label: '8. FAQ' },
]

export default function GuideLamalPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Page header */}
      <section className="bg-white border-b border-edge pt-12 pb-10">
        <div className="container-xl">
          <nav className="flex items-center gap-2 text-[13px] text-slate mb-6">
            <Link href="/" className="hover:text-ink transition-colors">Accueil</Link>
            <span className="text-edge">/</span>
            <Link href="/lamal" className="hover:text-ink transition-colors">LAMal</Link>
            <span className="text-edge">/</span>
            <span className="text-ink">Guide complet</span>
          </nav>
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
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] xl:grid-cols-[200px_1fr_280px] gap-12 items-start">

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
                être ni refusées ni exclues pour des raisons de santé — tout résident en Suisse a le droit
                d'être assuré, sans sélection médicale.
              </p>
              <div className="callout text-[15px]">
                <strong className="text-ink">Source :</strong>{' '}
                <a href="https://www.bag.admin.ch" target="_blank" rel="noopener noreferrer"
                  className="text-brand hover:underline">OFSP — bag.admin.ch</a>
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
                  'Soins d\'urgence 24h/24 — 7j/7',
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
                      <th className="text-right hidden sm:table-cell">Variation 2026</th>
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
                        <td className="text-right text-[13px] text-slate hidden sm:table-cell">
                          {c.variation}
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

            {/* 4 — Franchise */}
            <section id="franchise">
              <h2 className="article-h2">4. Choisir sa franchise LAMal</h2>
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
                      <th className="text-right">Économie/mois</th>
                      <th className="text-right">Économie/an</th>
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
                        <td className="text-right text-emerald-600 font-medium">
                          {f.economie > 0 ? `−CHF ${f.economie.toFixed(2)}` : '—'}
                        </td>
                        <td className="text-right text-emerald-600 font-medium">
                          {f.ecAnn > 0 ? `−CHF ${f.ecAnn}` : '—'}
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

            {/* 5 — Modèles */}
            <section id="modeles">
              <h2 className="article-h2">5. Les 4 modèles d'assurance LAMal</h2>
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
                    border: 'border-emerald-400',
                    desc: 'Consultation obligatoire dans un centre HMO agréé. Réseau limité en zones rurales, mais forte réduction de prime.',
                  },
                  {
                    title: 'Telmed (hotline médicale)',
                    reduction: '−10 à −15%',
                    border: 'border-violet-400',
                    desc: 'Avant toute consultation (hors urgence), appel à une hotline médicale (Medgate, Medi24...). Disponible 24h/24 partout en Suisse.',
                  },
                ].map((m, i) => (
                  <div key={i} className={`bg-white border ${m.border} border-l-4 rounded-[8px] p-5`}>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h3 className="font-semibold text-ink text-[16px]">{m.title}</h3>
                      {m.reduction ? (
                        <span className="text-[12px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full shrink-0">
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

            {/* 6 — Changer */}
            <section id="changer">
              <h2 className="article-h2">6. Comment changer de caisse maladie</h2>

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

            {/* 7 — Subsides */}
            <section id="subsides">
              <h2 className="article-h2">7. Subsides LAMal — qui y a droit ?</h2>
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

            {/* 8 — FAQ */}
            <section id="faq">
              <h2 className="article-h2">8. Questions fréquentes sur la LAMal</h2>
              <div className="divide-y divide-edge border border-edge rounded-[8px] overflow-hidden">
                {faqSchema.mainEntity.map((q, i) => (
                  <details key={i} className="group bg-white">
                    <summary className="flex justify-between items-center px-6 py-5 cursor-pointer list-none hover:bg-cloud transition-colors">
                      <span className="font-medium text-ink text-[16px] pr-4">{q.name}</span>
                      <svg className="w-4 h-4 text-slate shrink-0 group-open:rotate-180 transition-transform duration-200"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-5 pt-4 text-[15px] text-slate leading-relaxed border-t border-edge">
                      {q.acceptedAnswer.text}
                    </div>
                  </details>
                ))}
              </div>
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
                    ['/lamal/comparateur', 'Comparateur 2026'],
                    ['/lamal/changer-de-caisse', 'Changer de caisse'],
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

              <div className="bg-white border border-edge rounded-[8px] p-5">
                <p className="text-[12px] font-semibold text-slate uppercase tracking-widest mb-4">Sources officielles</p>
                <ul className="space-y-2">
                  {[
                    ['https://www.bag.admin.ch', 'OFSP — bag.admin.ch'],
                    ['https://www.priminfo.ch', 'Priminfo.ch'],
                    ['https://www.admin.ch', 'admin.ch (RS 832.10)'],
                  ].map(([href, label]) => (
                    <li key={href}>
                      <a href={href} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[14px] text-slate hover:text-brand transition-colors">
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-edge p-3 z-40">
        <a href="#lead-form" className="btn-primary w-full justify-center py-3 text-[15px]">
          Recevoir ma comparaison gratuite →
        </a>
      </div>
    </>
  )
}
