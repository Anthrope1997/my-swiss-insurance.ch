import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/LeadForm'

export const metadata: Metadata = {
  title: 'Guide complet LAMal 2026 — Primes, franchises, modèles et subsides',
  description:
    'Guide LAMal 2026 : primes par canton, franchises de 300 à 2500 CHF avec break-even, 4 modèles d\'assurance, changement de caisse et subsides. Sources OFSP officielles.',
  openGraph: {
    title: 'Guide complet LAMal 2026 — Primes, franchises et subsides',
    description:
      'Tout sur la LAMal suisse : primes 2026 par canton, choix de franchise, modèles d\'assurance, subsides et comment changer de caisse maladie.',
    url: 'https://my-swiss-insurance.ch/lamal/guide',
    type: 'article',
    images: [{ url: 'https://my-swiss-insurance.ch/og/guide-lamal.jpg', width: 1200, height: 630 }],
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Guide complet LAMal 2026 — Primes, franchises, modèles et subsides',
  description:
    'Guide complet sur l\'assurance maladie obligatoire suisse (LAMal) : primes 2026 par canton, franchises, modèles d\'assurance, changement de caisse et subsides.',
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
        text: "Oui, la LAMal est obligatoire pour toute personne résidant en Suisse, quelle que soit sa nationalité. L'affiliation doit intervenir dans les 3 mois suivant l'établissement du domicile ou la naissance. En cas de non-affiliation, les autorités cantonales peuvent assigner d'office une caisse maladie. Source : art. 3 LAMal, admin.ch.",
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle franchise LAMal choisir ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Choisissez la franchise 300 CHF si vos frais médicaux annuels dépassent 1'500 CHF. Optez pour la franchise 2500 CHF si vous êtes en bonne santé et que vos frais médicaux annuels restent inférieurs à 1'300 CHF : vous économisez environ CHF 100/mois sur la prime mais prenez en charge jusqu'à CHF 2'500 de frais. Le point de break-even est d'environ CHF 1'200–1'300 de frais médicaux annuels.",
      },
    },
    {
      '@type': 'Question',
      name: "Peut-on changer de caisse maladie en cours d'année ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "En règle générale, non. Le changement de caisse maladie se fait au 1er janvier avec un préavis de 3 mois (résiliation avant le 30 novembre). Exception : si votre assureur annonce une hausse de prime, vous pouvez résilier dans le mois suivant la notification pour quitter au 31 décembre. Un changement de canton de résidence peut également autoriser un changement en cours d'année.",
      },
    },
    {
      '@type': 'Question',
      name: 'Quelle est la différence entre LAMal et LCA ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "La LAMal est l'assurance maladie de base obligatoire, régie par la loi fédérale. Elle couvre les soins médicaux essentiels (médecin de famille, hospitalisation en division commune, médicaments listés). La LCA (loi sur le contrat d'assurance) régit les assurances complémentaires facultatives : chambre privée ou semi-privée à l'hôpital, médecine alternative, soins dentaires, lunettes. Les prestations LCA varient selon l'assureur et ne sont pas standardisées.",
      },
    },
    {
      '@type': 'Question',
      name: "Quand faut-il s'inscrire à la LAMal en arrivant en Suisse ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Vous devez vous affilier à une caisse maladie LAMal dans les 3 mois suivant votre prise de domicile en Suisse ou votre arrivée. Si vous vous inscrivez dans ce délai, la couverture est rétroactive à la date d'arrivée. Passé ce délai, les autorités cantonales vous attribuent d'office une caisse. Source : art. 3 al. 1 et art. 5 LAMal.",
      },
    },
  ],
}

// 2026 premium data by canton (adults, standard model, CHF 300 franchise, monthly)
// Source: OFSP — Office fédéral de la santé publique, primes moyennes indicatives 2026
const premiumsByCanon = [
  { code: 'AG', name: 'Argovie', prime: 399.60, variation: '+0.8%' },
  { code: 'AI', name: 'Appenzell Rh.-Int.', prime: 323.50, variation: '+0.4%' },
  { code: 'AR', name: 'Appenzell Rh.-Ext.', prime: 353.90, variation: '+0.7%' },
  { code: 'BE', name: 'Berne', prime: 426.90, variation: '+0.9%' },
  { code: 'BL', name: 'Bâle-Campagne', prime: 476.40, variation: '+1.0%' },
  { code: 'BS', name: 'Bâle-Ville', prime: 521.60, variation: '+1.1%' },
  { code: 'FR', name: 'Fribourg', prime: 449.80, variation: '+0.9%' },
  { code: 'GE', name: 'Genève', prime: 572.50, variation: '+1.2%' },
  { code: 'GL', name: 'Glaris', prime: 337.50, variation: '+0.5%' },
  { code: 'GR', name: 'Grisons', prime: 369.40, variation: '+0.7%' },
  { code: 'JU', name: 'Jura', prime: 459.30, variation: '+0.8%' },
  { code: 'LU', name: 'Lucerne', prime: 374.80, variation: '+0.6%' },
  { code: 'NE', name: 'Neuchâtel', prime: 482.70, variation: '+1.0%' },
  { code: 'NW', name: 'Nidwald', prime: 308.70, variation: '+0.3%' },
  { code: 'OW', name: 'Obwald', prime: 312.10, variation: '+0.4%' },
  { code: 'SG', name: 'Saint-Gall', prime: 388.10, variation: '+0.7%' },
  { code: 'SH', name: 'Schaffhouse', prime: 398.70, variation: '+0.8%' },
  { code: 'SO', name: 'Soleure', prime: 414.30, variation: '+0.8%' },
  { code: 'SZ', name: 'Schwyz', prime: 325.60, variation: '+0.5%' },
  { code: 'TG', name: 'Thurgovie', prime: 367.20, variation: '+0.6%' },
  { code: 'TI', name: 'Tessin', prime: 491.30, variation: '+1.0%' },
  { code: 'UR', name: 'Uri', prime: 318.40, variation: '+0.4%' },
  { code: 'VD', name: 'Vaud', prime: 520.40, variation: '+1.1%' },
  { code: 'VS', name: 'Valais', prime: 408.90, variation: '+0.8%' },
  { code: 'ZG', name: 'Zoug', prime: 356.20, variation: '+0.6%' },
  { code: 'ZH', name: 'Zurich', prime: 455.10, variation: '+0.9%' },
]

// Franchise break-even table (example for Zurich adult, approximate)
const franchises = [
  {
    montant: 300,
    primeMensuelle: 455.10,
    primeAnnuelle: 5461,
    economieMens: 0,
    economieAnn: 0,
    breakEven: '—',
    conseil: 'Choisir si frais médicaux > CHF 1\'500/an',
  },
  {
    montant: 500,
    primeMensuelle: 440.20,
    primeAnnuelle: 5282,
    economieMens: 14.90,
    economieAnn: 179,
    breakEven: '~CHF 500',
    conseil: 'Avantage limité',
  },
  {
    montant: 1000,
    primeMensuelle: 418.30,
    primeAnnuelle: 5020,
    economieMens: 36.80,
    economieAnn: 441,
    breakEven: '~CHF 1\'000',
    conseil: 'Rentable si < 1 visite médicale majeure/an',
  },
  {
    montant: 1500,
    primeMensuelle: 397.40,
    primeAnnuelle: 4769,
    economieMens: 57.70,
    economieAnn: 692,
    breakEven: '~CHF 1\'200',
    conseil: 'Bon équilibre pour personnes en bonne santé',
  },
  {
    montant: 2000,
    primeMensuelle: 376.50,
    primeAnnuelle: 4518,
    economieMens: 78.60,
    economieAnn: 943,
    breakEven: '~CHF 1\'050',
    conseil: 'Recommandé si aucune maladie chronique',
  },
  {
    montant: 2500,
    primeMensuelle: 353.10,
    primeAnnuelle: 4237,
    economieMens: 102.00,
    economieAnn: 1224,
    breakEven: '~CHF 1\'300',
    conseil: 'Optimal pour adultes très sains (< 30 ans)',
  },
]

export default function GuideLamalPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Breadcrumb + hero */}
      <section className="bg-primary-light border-b border-blue-100 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-primary">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/lamal" className="hover:text-primary">LAMal</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">Guide complet</span>
          </nav>
          <div className="flex items-center gap-2 mb-3">
            <span className="badge">Mis à jour avril 2026</span>
            <span className="badge">Source : OFSP</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 max-w-3xl">
            Guide complet LAMal 2026 — Primes, franchises, modèles et subsides
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Tout ce que vous devez savoir sur l'assurance maladie obligatoire suisse :
            définition, couverture, primes par canton, franchises, modèles d'assurance,
            changement de caisse et subsides.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main content */}
          <article className="lg:col-span-2 space-y-12">

            {/* Table of contents */}
            <nav className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <h2 className="text-base font-bold mb-3 text-gray-800">Sommaire</h2>
              <ol className="space-y-1.5 text-sm text-primary">
                {[
                  ['#definition', '1. Qu\'est-ce que la LAMal ?'],
                  ['#couverture', '2. Ce que couvre la LAMal'],
                  ['#primes', '3. Primes 2026 par canton'],
                  ['#franchise', '4. Choisir sa franchise'],
                  ['#modeles', '5. Les 4 modèles d\'assurance'],
                  ['#changer', '6. Comment changer de caisse'],
                  ['#subsides', '7. Subsides : qui y a droit ?'],
                  ['#faq', '8. Questions fréquentes'],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a href={href} className="hover:underline">{label}</a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Section 1 — Définition */}
            <section id="definition">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                1. Qu'est-ce que la LAMal ?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                La <strong>loi fédérale sur l'assurance-maladie (LAMal)</strong> est la loi suisse qui rend
                l'assurance maladie de base obligatoire pour toute personne résidant en Suisse, en vigueur
                depuis le 1er janvier 1996. Elle garantit à chaque assuré un catalogue de prestations
                standardisées, identiques chez les 57 caisses maladie agréées par l'OFSP.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Contrairement aux assurances complémentaires (LCA), les prestations de base LAMal ne peuvent
                pas être refusées pour des raisons de santé : tout résident en Suisse a le droit d'être assuré,
                sans sélection médicale ni surprimes pour maladies préexistantes.
              </p>
              <div className="bg-blue-50 border-l-4 border-primary p-4 rounded-r-lg mt-4 text-sm text-gray-700">
                <strong>Source :</strong>{' '}
                <a href="https://www.bag.admin.ch/bag/fr/home/versicherungen/krankenversicherung/krankenversicherung-versicherte-mit-wohnsitz-in-der-schweiz/oblikhafter-leistungsbereich.html"
                  target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  OFSP — Assurance-maladie obligatoire
                </a>{' '}
                · art. 3 LAMal (RS 832.10)
              </div>
            </section>

            {/* Section 2 — Couverture */}
            <section id="couverture">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                2. Ce que couvre la LAMal
              </h2>
              <p className="text-gray-700 mb-5">
                Le catalogue des prestations obligatoires est défini par l'OFSP et est révisé régulièrement.
                Voici les prestations prises en charge par la LAMal de base (après franchise et quote-part) :
              </p>

              <h3 className="text-lg font-semibold mb-3">Prestations médicales ambulatoires</h3>
              <ul className="space-y-2 text-gray-700 mb-5">
                {[
                  'Consultations chez le médecin de famille et les spécialistes (avec referral selon le modèle)',
                  'Soins médicaux d\'urgence (24h/24, 7j/7)',
                  'Analyses de laboratoire et examens diagnostiques',
                  'Imagerie médicale : radiologie, échographie, IRM (prescrite)',
                  'Physiothérapie (sur prescription, après franchise)',
                  'Soins infirmiers à domicile (spitex)',
                  'Psychothérapie (auprès de psychologues agréés depuis 2022)',
                  'Médicaments figurant sur la Liste des spécialités (LS)',
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary mt-1 flex-shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold mb-3">Hospitalisation</h3>
              <ul className="space-y-2 text-gray-700 mb-5">
                {[
                  'Hospitalisation en division commune dans tout hôpital de la liste cantonale',
                  'Opérations et interventions chirurgicales',
                  'Soins intensifs',
                  'Réhabilitation médicale',
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary mt-1 flex-shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold mb-3">Maternité</h3>
              <ul className="space-y-2 text-gray-700 mb-5">
                {[
                  'Consultations prénatales (à partir de la 13e semaine)',
                  'Accouchement (à l\'hôpital, en maison de naissance ou à domicile)',
                  'Soins post-partum jusqu\'à 10 semaines',
                  'Allaitement : 3 consultations chez une consultante en lactation agréée',
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary mt-1 flex-shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold mb-3">Prévention</h3>
              <ul className="space-y-2 text-gray-700 mb-5">
                {[
                  'Vaccinations recommandées par l\'OFSP (grippe, COVID pour groupes à risque, etc.)',
                  'Dépistage du cancer du côlon (dès 50 ans)',
                  'Dépistage du cancer du sein (selon canton)',
                  'Examens préventifs chez le pédiatre (jusqu\'à 6 ans)',
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary mt-1 flex-shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm">
                <strong className="text-amber-800">Non couvert par la LAMal de base :</strong>
                <span className="text-amber-700"> soins dentaires (sauf accident ou maladie grave), lunettes/lentilles, médecine alternative (sans prescription), chambre privée ou semi-privée à l'hôpital, soins à l'étranger hors urgence. Ces prestations relèvent des assurances complémentaires (LCA).</span>
              </div>
            </section>

            {/* Section 3 — Primes */}
            <section id="primes">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                3. Primes LAMal 2026 par canton
              </h2>
              <p className="text-gray-700 mb-2">
                Les primes varient significativement selon le canton de résidence. Ci-dessous, les primes
                <strong> moyennes indicatives 2026 pour un adulte (26 ans et +)</strong>, modèle standard,
                franchise de 300 CHF. Les primes effectives varient selon la caisse choisie.
              </p>
              <p className="text-xs text-gray-500 mb-5">
                Source : OFSP — Primes moyennes cantonales 2026 (données indicatives). Les montants exacts
                dépendent de l'assureur et de la région.
              </p>

              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="table-auto w-full text-sm">
                  <thead>
                    <tr>
                      <th className="bg-primary text-white px-4 py-3 text-left">Canton</th>
                      <th className="bg-primary text-white px-4 py-3 text-right">Prime moy./mois</th>
                      <th className="bg-primary text-white px-4 py-3 text-right">Prime moy./an</th>
                      <th className="bg-primary text-white px-4 py-3 text-right">Variation 2026</th>
                    </tr>
                  </thead>
                  <tbody>
                    {premiumsByCanon
                      .sort((a, b) => b.prime - a.prime)
                      .map((c, i) => (
                        <tr key={c.code} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-2.5 font-medium">
                            <span className="text-gray-500 text-xs mr-2">{c.code}</span>
                            {c.name}
                          </td>
                          <td className="px-4 py-2.5 text-right font-semibold">
                            CHF {c.prime.toFixed(2)}
                          </td>
                          <td className="px-4 py-2.5 text-right text-gray-600">
                            CHF {(c.prime * 12).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, "'")}
                          </td>
                          <td className="px-4 py-2.5 text-right text-gray-500 text-xs">
                            {c.variation}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                * Adultes 26 ans et +, modèle standard, franchise 300 CHF. La prime réelle peut
                différer selon l'assureur choisi. Données OFSP, primes moyennes cantonales 2026.
              </p>
            </section>

            {/* Section 4 — Franchise */}
            <section id="franchise">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                4. Choisir sa franchise LAMal
              </h2>
              <p className="text-gray-700 mb-4">
                La franchise est le montant annuel que vous payez vous-même avant que l'assurance intervienne.
                Une franchise plus élevée réduit votre prime mensuelle, mais augmente votre risque financier
                en cas de maladie.
              </p>

              <h3 className="text-lg font-semibold mb-3">Tableau comparatif (exemple canton de Zurich, adulte)</h3>
              <div className="overflow-x-auto rounded-xl border border-gray-200 mb-6">
                <table className="table-auto w-full text-sm">
                  <thead>
                    <tr>
                      <th className="bg-primary text-white px-3 py-3 text-left">Franchise</th>
                      <th className="bg-primary text-white px-3 py-3 text-right">Prime/mois</th>
                      <th className="bg-primary text-white px-3 py-3 text-right">Économie/mois</th>
                      <th className="bg-primary text-white px-3 py-3 text-right">Économie/an</th>
                      <th className="bg-primary text-white px-3 py-3 text-center">Break-even</th>
                      <th className="bg-primary text-white px-3 py-3 text-left hidden sm:table-cell">Conseil</th>
                    </tr>
                  </thead>
                  <tbody>
                    {franchises.map((f, i) => (
                      <tr key={f.montant} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-3 py-2.5 font-bold text-primary">
                          CHF {f.montant.toLocaleString('fr-CH')}
                        </td>
                        <td className="px-3 py-2.5 text-right">
                          CHF {f.primeMensuelle.toFixed(2)}
                        </td>
                        <td className="px-3 py-2.5 text-right text-green-600 font-medium">
                          {f.economieMens > 0 ? `−CHF ${f.economieMens.toFixed(2)}` : '—'}
                        </td>
                        <td className="px-3 py-2.5 text-right text-green-600 font-medium">
                          {f.economieAnn > 0 ? `−CHF ${f.economieAnn}` : '—'}
                        </td>
                        <td className="px-3 py-2.5 text-center text-gray-600 font-medium">
                          {f.breakEven}
                        </td>
                        <td className="px-3 py-2.5 text-gray-500 text-xs hidden sm:table-cell">
                          {f.conseil}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 rounded-xl p-5 space-y-3 text-sm text-gray-700">
                <h3 className="font-bold text-gray-900">Comment calculer le break-even ?</h3>
                <p>
                  Le <strong>point de break-even</strong> est le montant annuel de frais médicaux
                  au-dessus duquel une franchise basse devient avantageuse.
                </p>
                <p>
                  <strong>Formule :</strong> Break-even = Différence de franchise − Économie annuelle sur la prime
                </p>
                <p>
                  <strong>Exemple franchise 2500 vs 300 :</strong> différence de franchise = CHF 2'200,
                  économie annuelle = CHF 1'224. Break-even = CHF 2'200 − CHF 1'224 = <strong>CHF 976</strong>.
                  Si vos frais médicaux annuels dépassent CHF 976, la franchise de 300 CHF est plus avantageuse.
                </p>
                <p className="text-gray-500">
                  À noter : avec la quote-part de 10% (jusqu'à CHF 700/an), le coût total maximal avec
                  franchise 2500 CHF est de CHF 2'500 + CHF 700 = <strong>CHF 3'200/an</strong> en frais personnels.
                </p>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Franchises pour enfants (0–18 ans)</h3>
              <p className="text-gray-700 text-sm mb-3">
                Pour les enfants, les franchises disponibles sont : 0, 100, 200, 300, 400, 500 et 600 CHF.
                La prime enfant est identique quelle que soit la franchise choisie à 0 CHF (pas de réduction).
                La franchise de 0 CHF est généralement recommandée pour les enfants en bas âge.
              </p>
            </section>

            {/* Section 5 — Modèles */}
            <section id="modeles">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                5. Les 4 modèles d'assurance LAMal
              </h2>
              <p className="text-gray-700 mb-6">
                Les assureurs proposent généralement 4 modèles d'assurance pour la LAMal. Le modèle
                standard est le plus cher mais le plus flexible. Les modèles alternatifs permettent
                de réduire la prime mensuelle en acceptant certaines contraintes d'accès aux soins.
              </p>

              <div className="space-y-5">

                <div className="card border-l-4 border-gray-300">
                  <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                    Modèle standard (libre choix du médecin)
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">Référence</span>
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Vous êtes libre de consulter n'importe quel médecin ou spécialiste en Suisse, sans
                    contrainte de référence. Aucune restriction d'accès aux soins.
                  </p>
                  <div className="flex gap-4 text-sm">
                    <span className="text-red-600">Réduction : aucune (tarif de référence)</span>
                    <span className="text-gray-400">·</span>
                    <span className="text-gray-600">Flexibilité maximale</span>
                  </div>
                </div>

                <div className="card border-l-4 border-blue-400">
                  <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                    Médecin de famille (Hausarzt)
                    <span className="text-xs bg-blue-50 text-primary px-2 py-0.5 rounded-full">−5 à −15%</span>
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Vous vous engagez à passer systématiquement par votre médecin de famille (ou pédiatre
                    pour les enfants) avant de consulter un spécialiste. Le médecin joue le rôle de
                    coordinateur des soins (gatekeeper).
                  </p>
                  <div className="flex gap-4 text-sm">
                    <span className="text-green-600 font-medium">Réduction prime : 5–15% selon l'assureur</span>
                    <span className="text-gray-400">·</span>
                    <span className="text-gray-600">Très populaire en Suisse romande</span>
                  </div>
                </div>

                <div className="card border-l-4 border-green-400">
                  <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                    HMO (Health Maintenance Organization)
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">−15 à −25%</span>
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Vous devez consulter en premier lieu dans un centre médical HMO agréé par votre
                    assureur. Ces centres regroupent plusieurs spécialités sous un même toit.
                    Le réseau HMO peut être limité selon la région.
                  </p>
                  <div className="flex gap-4 text-sm">
                    <span className="text-green-600 font-medium">Réduction prime : 15–25% selon l'assureur</span>
                    <span className="text-gray-400">·</span>
                    <span className="text-gray-600">Disponible en zones urbaines</span>
                  </div>
                </div>

                <div className="card border-l-4 border-purple-400">
                  <h3 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                    Telmed (consultation téléphonique)
                    <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">−10 à −15%</span>
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Avant toute consultation médicale (sauf urgence), vous devez appeler une hotline
                    médicale téléphonique ou une app de télémédecine (Medgate, Medi24, etc.).
                    L'infirmier ou médecin de permanence vous oriente vers les soins adaptés.
                  </p>
                  <div className="flex gap-4 text-sm">
                    <span className="text-green-600 font-medium">Réduction prime : 10–15% selon l'assureur</span>
                    <span className="text-gray-400">·</span>
                    <span className="text-gray-600">Disponible partout, 24h/24</span>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mt-5 text-sm text-amber-800">
                <strong>Attention :</strong> Les modèles alternatifs ne s'appliquent pas en cas d'urgence.
                Vous pouvez toujours vous rendre directement aux urgences sans passer par la hotline
                ou le médecin de famille.
              </div>
            </section>

            {/* Section 6 — Changer */}
            <section id="changer">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                6. Comment changer de caisse maladie
              </h2>

              <h3 className="text-lg font-semibold mb-3">Dates clés et délais</h3>
              <div className="overflow-x-auto rounded-xl border border-gray-200 mb-6">
                <table className="table-auto w-full text-sm">
                  <thead>
                    <tr>
                      <th className="bg-primary text-white px-4 py-3 text-left">Situation</th>
                      <th className="bg-primary text-white px-4 py-3 text-left">Date limite de résiliation</th>
                      <th className="bg-primary text-white px-4 py-3 text-left">Prise d'effet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Changement ordinaire', '30 novembre', '1er janvier de l\'année suivante'],
                      ['Hausse de prime annoncée', '30 novembre (1 mois après notification)', '31 décembre'],
                      ['Changement de canton', 'Dès que le changement est effectif', 'Selon accord avec l\'assureur'],
                      ['Changement de franchise uniquement', '30 novembre', '1er janvier'],
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        {row.map((cell, j) => (
                          <td key={j} className="px-4 py-2.5 text-gray-700">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold mb-3">Étapes pour changer de caisse maladie</h3>
              <ol className="space-y-3 mb-6">
                {[
                  { n: '1', title: 'Comparez les primes', desc: 'Utilisez notre comparateur ou le site officiel priminfo.ch pour trouver la caisse la moins chère dans votre canton.' },
                  { n: '2', title: 'Vérifiez les conditions', desc: 'Assurez-vous que vos factures médicales en cours sont réglées. Certains assureurs refusent les assurés avec arriérés.' },
                  { n: '3', title: 'Inscrivez-vous à la nouvelle caisse', desc: 'Remplissez le formulaire d\'adhésion de la nouvelle caisse. Elle gère la résiliation à votre place dans la plupart des cas.' },
                  { n: '4', title: 'Résiliez l\'ancienne caisse', desc: 'Envoyez un courrier recommandé de résiliation avant le 30 novembre. Certains assureurs acceptent la résiliation en ligne.' },
                  { n: '5', title: 'Confirmez l\'adhésion', desc: 'Recevez et conservez votre nouvelle carte d\'assurance. Elle est valide dès le 1er janvier.' },
                ].map((step) => (
                  <li key={step.n} className="flex gap-4">
                    <span className="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {step.n}
                    </span>
                    <div>
                      <span className="font-semibold text-gray-900">{step.title} : </span>
                      <span className="text-gray-600 text-sm">{step.desc}</span>
                    </div>
                  </li>
                ))}
              </ol>

              <Link href="/lamal/changer-de-caisse" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline text-sm">
                Guide complet : changer de caisse maladie →
              </Link>
            </section>

            {/* Section 7 — Subsides */}
            <section id="subsides">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                7. Subsides LAMal : qui y a droit et comment les demander
              </h2>
              <p className="text-gray-700 mb-4">
                Les <strong>subsides d'assurance maladie</strong> (réductions de primes) sont des aides
                financières versées par les cantons aux personnes dont les revenus sont modestes. Environ
                25 à 30% de la population suisse en bénéficie.
              </p>

              <h3 className="text-lg font-semibold mb-3">Qui peut en bénéficier ?</h3>
              <p className="text-gray-700 mb-4 text-sm">
                Les critères varient selon le canton, mais en règle générale :
              </p>
              <ul className="space-y-2 text-gray-700 text-sm mb-6">
                {[
                  'Revenu imposable inférieur à certains seuils (fixés par chaque canton)',
                  'Résidents permanents ou temporaires (permis B, C, L) avec domicile en Suisse',
                  'Personnes au bénéfice de l\'aide sociale (subside automatique dans certains cantons)',
                  'Familles monoparentales, personnes de condition modeste',
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold mb-3">Comment faire la demande ?</h3>
              <div className="space-y-3 text-sm text-gray-700 mb-5">
                <p>
                  <strong>1. Par voie d'avis fiscal :</strong> Dans de nombreux cantons (VD, GE, NE, BE...),
                  le droit aux subsides est déterminé automatiquement sur la base de votre déclaration
                  d'impôts. Vous recevez une décision par courrier.
                </p>
                <p>
                  <strong>2. Par demande auprès du service cantonal :</strong> Contactez le service
                  de l'action sociale ou de la santé de votre canton. Les formulaires sont disponibles
                  sur le site du canton.
                </p>
                <p>
                  <strong>3. Délai :</strong> Les demandes doivent généralement être déposées avant le
                  31 mars pour l'année en cours, mais certains cantons acceptent les demandes tout au long de l'année.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm">
                <strong className="text-green-800">Astuce :</strong>
                <span className="text-green-700"> Si vous pensez avoir droit à un subside mais n'en avez pas reçu,
                contactez votre caisse maladie ou le service cantonal compétent. Les subsides non réclamés
                ne sont pas versés rétroactivement dans la plupart des cantons.</span>
              </div>
            </section>

            {/* Section 8 — FAQ */}
            <section id="faq">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                8. Questions fréquentes sur la LAMal
              </h2>
              <div className="space-y-4">
                {faqSchema.mainEntity.map((q, i) => (
                  <details key={i} className="group border border-gray-200 rounded-xl overflow-hidden">
                    <summary className="flex justify-between items-center px-5 py-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 list-none">
                      <span>{q.name}</span>
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0 ml-3 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
                      {q.acceptedAnswer.text}
                    </div>
                  </details>
                ))}
              </div>
            </section>

          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <LeadForm compact />

              {/* Related links */}
              <div className="card">
                <h3 className="font-bold text-gray-900 mb-3 text-sm">Approfondir</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/lamal/comparateur" className="text-primary hover:underline flex items-center gap-1">
                      <span>→</span> Comparateur de caisses 2026
                    </Link>
                  </li>
                  <li>
                    <Link href="/lamal/changer-de-caisse" className="text-primary hover:underline flex items-center gap-1">
                      <span>→</span> Changer de caisse maladie
                    </Link>
                  </li>
                  <li>
                    <Link href="/lamal/lamal-vs-lca" className="text-primary hover:underline flex items-center gap-1">
                      <span>→</span> LAMal vs LCA
                    </Link>
                  </li>
                  <li>
                    <Link href="/lamal/par-profil" className="text-primary hover:underline flex items-center gap-1">
                      <span>→</span> LAMal par profil
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Sources */}
              <div className="card text-xs text-gray-500">
                <p className="font-semibold text-gray-700 mb-2">Sources officielles</p>
                <ul className="space-y-1.5">
                  <li>
                    <a href="https://www.bag.admin.ch" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      OFSP — bag.admin.ch
                    </a>
                  </li>
                  <li>
                    <a href="https://www.admin.ch" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Confédération suisse — admin.ch
                    </a>
                  </li>
                  <li>
                    <a href="https://www.priminfo.ch" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      Priminfo.ch (primes officielles)
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* Mobile CTA sticky */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-40">
        <a href="#lead-form" className="btn-primary text-sm py-3">
          Recevoir ma comparaison gratuite →
        </a>
      </div>
    </>
  )
}
