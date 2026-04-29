import type { Metadata } from 'next'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SubsidesCalculator from '@/components/lamal/SubsidesCalculator'
import NeedHelpSection from '@/components/ui/NeedHelpSection'
import FAQ from '@/components/ui/FAQ'
import AuthorBio from '@/components/ui/AuthorBio'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Subsides LAMal 2026 : calculateur et guide pour les 26 cantons suisses',
  description:
    "Calculez gratuitement votre subside LAMal 2026 selon votre canton, votre revenu et votre situation familiale. Tableau complet des 26 cantons suisses : seuils de revenus, montants indicatifs et délais de demande. Données officielles cantonales.",
  openGraph: {
    title: 'Calculateur de subsides LAMal 2026 — 26 cantons suisses',
    description: "Estimez votre subside LAMal en 30 secondes. Données officielles 2026 pour les 26 cantons : seuils, montants et délais.",
    url: 'https://my-swiss-insurance.ch/lamal/subsides',
    type: 'article',
  },
  alternates: { canonical: 'https://my-swiss-insurance.ch/lamal/subsides' },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Subsides LAMal 2026 : calculateur et guide pour les 26 cantons suisses',
  datePublished: '2026-01-01',
  dateModified: '2026-04-29',
  author:    { '@type': 'Organization', name: 'My Swiss Insurance', url: 'https://my-swiss-insurance.ch' },
  publisher: { '@type': 'Organization', name: 'My Swiss Insurance' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://my-swiss-insurance.ch/lamal/subsides' },
}

const faqItems = [
  {
    question: "Qu'est-ce qu'un subside LAMal ?",
    answer:
      "Le subside (ou réduction individuelle de primes, RIP) est une aide financière versée par votre canton pour réduire le montant de votre prime d'assurance maladie de base. Il est versé directement à votre caisse maladie, qui déduit le montant de votre facture mensuelle. Cette aide est prévue par l'article 65 de la loi fédérale sur l'assurance maladie.",
  },
  {
    question: "Comment est calculé le revenu déterminant ?",
    answer:
      "Il se base sur votre revenu net fiscal (déclaration d'impôts), auquel s'ajoute une fraction de votre fortune nette (entre 5 % et 20 % selon le canton). Des déductions sociales réduisent ce montant : déduction pour enfants, pour personnes seules, pour monoparentaux, etc. En cas de doute, utilisez votre revenu imposable comme point de départ pour l'estimation.",
  },
  {
    question: "Dois-je faire une demande chaque année ?",
    answer:
      "Cela dépend de votre canton. Genève, Neuchâtel, le Valais, Berne et Appenzell Rhodes-Intérieures attribuent les subsides automatiquement après la taxation fiscale. Dans les autres cantons (Vaud, Lucerne, Zurich, Saint-Gall, etc.), une demande annuelle est nécessaire, souvent avec des délais stricts. Un délai manqué peut entraîner la perte du droit pour l'année en cours.",
  },
  {
    question: "Le subside couvre-t-il les assurances complémentaires ?",
    answer:
      "Non. Le subside s'applique uniquement à la prime d'assurance maladie de base (LAMal obligatoire). Les assurances complémentaires LCA (soins dentaires, hospitalisation privée, médecine alternative) ne sont pas concernées.",
  },
  {
    question: "Qu'est-ce que la règle des 10 % introduite en 2025 ?",
    answer:
      "Depuis le 1er janvier 2025, la loi fédérale oblige les cantons à couvrir les primes LAMal des ménages à revenu faible et moyen lorsqu'elles dépassent 10 % de leur revenu disponible. Cette garantie fédérale assure un plancher de protection dans tous les cantons, indépendamment des barèmes cantonaux.",
  },
  {
    question: "Pourquoi les montants varient-ils autant selon les cantons ?",
    answer:
      "Chaque canton fixe librement ses barèmes, ses seuils de revenus et ses montants dans le cadre de la loi fédérale. La Confédération verse une contribution calculée sur les coûts moyens de l'assurance maladie ; les cantons complètent. Les primes LAMal variant elles-mêmes fortement d'un canton à l'autre (de CHF 403 à Zoug à CHF 710 à Genève par mois pour un adulte), les montants de subsides diffèrent en conséquence.",
  },
  {
    question: "Que se passe-t-il si je change de canton en cours d'année ?",
    answer:
      "Le subside est lié au canton de domicile. En cas de déménagement, vous devez notifier votre ancien canton (la demande s'arrête le mois suivant) et faire une nouvelle demande dans votre nouveau canton. Des délais stricts s'appliquent, et le droit peut être perdu si la demande est tardive. Prévenez votre caisse maladie lors du déménagement.",
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

const toc = [
  { id: 'fonctionnement',  label: '1. Comment ça fonctionne' },
  { id: 'calculateur',     label: '2. Calculateur interactif' },
  { id: 'tableau-cantons', label: '3. Tableau des 26 cantons' },
  { id: 'reforme-2025',    label: '4. La réforme 2025' },
  { id: 'faq',             label: '5. Questions fréquentes' },
  { id: 'contact',         label: '6. Besoin d\'aide ?' },
]

// Données de référence — 26 cantons suisses, sources officielles 2026
// Montant maximum indicatif = subside adulte seul, sans enfant, revenu proche de zéro
// Seuil revenu = plafond d'éligibilité pour adulte seul, sans enfant
const CANTONS_SUBSIDES = [
  {
    code: 'AG', nom: 'Argovie',
    revenu: 'Formule proportionnelle',
    montant: "jusqu'à CHF 486",
    auto: false, delai: '31 déc. 2026',
    lien: 'https://www.sva-aargau.ch/private/ihre-private-situation/finanzielle-unterstuetzung/praemienverbilligung/allgemeine',
  },
  {
    code: 'AI', nom: 'App. Rh.-Intérieures',
    revenu: 'Formule progressive (7–12 %)',
    montant: "jusqu'à CHF 387",
    auto: true, delai: '—',
    lien: 'https://www.ai.ch/themen/gesundheit/krankenversicherung/praemienverbilligung',
  },
  {
    code: 'AR', nom: 'App. Rh.-Extérieures',
    revenu: "35'000 CHF",
    montant: "jusqu'à CHF 502",
    auto: false, delai: '31 mars 2026',
    lien: 'https://www.sovar.ch/dienstleistungen/prämienverbilligung-ipv',
  },
  {
    code: 'BE', nom: 'Berne',
    revenu: "35'000 CHF (après déductions)",
    montant: "jusqu'à CHF 221 (région 1)",
    auto: true, delai: '31 mars 2027',
    lien: 'https://www.gef.be.ch/gef/fr/index/gesundheit/gesundheit/krankenversicherung/praemienverbilligung.html',
  },
  {
    code: 'BL', nom: 'Bâle-Campagne',
    revenu: "31'000 CHF",
    montant: 'Formule (7,75 %)',
    auto: false, delai: '31 déc. 2026',
    lien: 'https://www.sva-bl.ch/de/ausgleichskasse/individuelle-praemienverbilligung-ipv',
  },
  {
    code: 'BS', nom: 'Bâle-Ville',
    revenu: "49'375 CHF",
    montant: "jusqu'à CHF 444",
    auto: false, delai: 'Continu',
    lien: 'https://www.bs.ch/themen/finanzielle-hilfe/leistungen/praemienverbilligung',
  },
  {
    code: 'FR', nom: 'Fribourg',
    revenu: "37'000 CHF",
    montant: 'Calculé sur dossier (60 paliers)',
    auto: true, delai: '31 août 2026',
    lien: 'https://www.ecasfr.ch/fr/Assurances/Reduction-des-primes-d-assurance-maladie/Reduction-des-primes-d-assurance-maladie.html',
  },
  {
    code: 'GE', nom: 'Genève',
    revenu: "~50'000 CHF",
    montant: "jusqu'à CHF 348",
    auto: true, delai: '—',
    lien: 'https://www.ge.ch/informations-generales-subside-assurance-maladie/baremes',
  },
  {
    code: 'GL', nom: 'Glaris',
    revenu: 'Formule proportionnelle',
    montant: "jusqu'à CHF 454",
    auto: false, delai: '31 janv. 2026',
    lien: 'https://www.gl.ch/verwaltung/finanzen-und-gesundheit/steuern/individuelle-praemienverbilligung-ipv.html/502',
  },
  {
    code: 'GR', nom: 'Grisons',
    revenu: 'Formule proportionnelle',
    montant: "jusqu'à CHF 493 (région 1)",
    auto: false, delai: '31 déc. 2026',
    lien: 'https://www.sva.gr.ch/dienstleistungen/individuelle-praemienverbilligung.html',
  },
  {
    code: 'JU', nom: 'Jura',
    revenu: "27'000 CHF",
    montant: "jusqu'à CHF 568",
    auto: false, delai: '31 déc. 2026',
    lien: 'https://www.ecasjura.ch',
  },
  {
    code: 'LU', nom: 'Lucerne',
    revenu: 'Formule proportionnelle',
    montant: "jusqu'à CHF 469 (région 1)",
    auto: false, delai: '31 oct. 2025',
    lien: 'https://www.was-luzern.ch/praemienverbilligung',
  },
  {
    code: 'NE', nom: 'Neuchâtel',
    revenu: "65'089 CHF",
    montant: "jusqu'à CHF 643",
    auto: true, delai: '—',
    lien: 'https://www.ne.ch/themes/social/assurance-maladie/subsides-assurance-maladie-lamal',
  },
  {
    code: 'NW', nom: 'Nidwald',
    revenu: 'Formule proportionnelle',
    montant: "jusqu'à CHF 450",
    auto: false, delai: '30 avril 2026',
    lien: 'https://www.aknw.ch/dienstleistungen/praemienverbilligung-ipv',
  },
  {
    code: 'OW', nom: 'Obwald',
    revenu: "~50'000 CHF",
    montant: "jusqu'à CHF 418",
    auto: false, delai: '31 mai 2026',
    lien: 'https://www.akow.ch/dienstleistungen/praemienverbilligung',
  },
  {
    code: 'SG', nom: 'Saint-Gall',
    revenu: 'Formule proportionnelle',
    montant: "jusqu'à CHF 524 (région 1)",
    auto: false, delai: '31 mars 2026',
    lien: 'https://www.svasg.ch/produkte/ipv/',
  },
  {
    code: 'SH', nom: 'Schaffhouse',
    revenu: 'Formule proportionnelle',
    montant: "jusqu'à CHF 322 (max 65 % de la prime de référence)",
    auto: false, delai: '30 avril 2026',
    lien: 'https://www.svash.ch',
  },
  {
    code: 'SO', nom: 'Soleure',
    revenu: "~74'000 CHF",
    montant: "jusqu'à CHF 422",
    auto: false, delai: '31 juil. 2026',
    lien: 'https://www.akso.ch/dienstleistungen/praemienverbilligung-ipv',
  },
  {
    code: 'SZ', nom: 'Schwyz',
    revenu: "~43'554 CHF (minimum selon région)",
    montant: "jusqu'à CHF 465",
    auto: false, delai: '31 déc. 2026',
    lien: 'https://www.sva-sz.ch/dienstleistungen/pr%C3%A4mienverbilligung-ipv',
  },
  {
    code: 'TG', nom: 'Thurgovie',
    revenu: 'Barème fiscal (catégories A–D)',
    montant: 'Selon catégorie fiscale',
    auto: false, delai: '31 déc. 2026',
    lien: 'https://gesundheit.tg.ch/bevoelkerung/krankenversicherung/praemienverbilligung.html/5578',
  },
  {
    code: 'TI', nom: 'Tessin',
    revenu: 'Formule RIPAM',
    montant: "jusqu'à CHF 668",
    auto: false, delai: '31 déc. 2025',
    lien: 'https://www4.ti.ch/dss/ias/prestazioni-e-contributi/scheda/p/s/dettaglio/riduzione-dei-premi-dellassicurazione-malattia-ripam/richiesta-del-formulario-ripam/',
  },
  {
    code: 'UR', nom: 'Uri',
    revenu: "~90'000 CHF (revenu déterminant)",
    montant: "jusqu'à CHF 364",
    auto: false, delai: '31 déc. 2026',
    lien: 'https://www.svsuri.ch/dienstleistungen/pr%C3%A4mienverbilligung-ipv',
  },
  {
    code: 'VD', nom: 'Vaud',
    revenu: "~50'000 CHF",
    montant: "jusqu'à CHF 331",
    auto: false, delai: 'Voir OVAM 2026',
    lien: 'https://www.vd.ch/sante-soins-et-handicap/assurance-maladie/subside-a-lassurance-maladie',
  },
  {
    code: 'VS', nom: 'Valais',
    revenu: "~38'500 CHF",
    montant: "jusqu'à CHF 521",
    auto: true, delai: '—',
    lien: 'https://www.avsvalais.ch/fr/Assurances/RIP-Reduction-individuelle-des-primes-d-assurance-maladie/Reduction-des-primes-d-assurance-maladie/Reduction-des-primes-caisse-maladie.html',
  },
  {
    code: 'ZG', nom: 'Zoug',
    revenu: "~89'900 CHF (famille)",
    montant: "jusqu'à CHF 415",
    auto: false, delai: '30 avril 2026',
    lien: 'https://www.akzug.ch/dienstleistungen/praemienverbilligung',
  },
  {
    code: 'ZH', nom: 'Zurich',
    revenu: "~64'000 CHF (région 1, adulte)",
    montant: 'Selon prime effective',
    auto: false, delai: '31 mars 2027',
    lien: 'https://svazurich.ch/ihr-anliegen/privatpersonen/praemienverbilligung/praemienverbilligung_2026/einkommensgrenzen-2026.html',
  },
]

export default function PageSubsides() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="bg-white border-b border-edge pt-12 pb-14">
        <div className="container-xl">

          <Breadcrumb items={[
            { label: 'Accueil', href: '/' },
            { label: 'LAMal', href: '/lamal' },
            { label: 'Calculateur de subsides' },
          ]} />

          <div className="badge mb-5">Subsides LAMal 2026</div>

          <h1 className="text-4xl sm:text-5xl font-bold text-ink leading-tight mb-4 max-w-3xl">
            Calculez votre réduction de primes LAMal
          </h1>
          <p className="text-[18px] text-slate max-w-2xl leading-relaxed mb-10">
            Estimez votre subside cantonal en 30 secondes. Données officielles 2026 pour les 26 cantons suisses : seuils de revenus, montants indicatifs et délais de demande.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { value: "jusqu'à CHF 668", label: 'subside mensuel maximum (Tessin, adulte, prime de référence 2026)', sub: '' },
              { value: '~30 %',           label: 'de la population suisse bénéficiaire d\'une réduction de primes', sub: '' },
              { value: '26',             label: 'barèmes cantonaux distincts : seuils, montants et procédures', sub: '' },
            ].map(s => (
              <div key={s.label} className="bg-cloud/60 border border-edge rounded-xl px-5 py-4">
                <div className="text-2xl font-bold text-ink leading-none">{s.value}</div>
                <div className="text-[13px] font-medium text-ink/70 mt-1">{s.label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Layout 2 colonnes */}
      <div className="container-xl py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12 items-start">

          {/* TOC */}
          <aside className="hidden lg:block">
            <nav className="sticky top-24">
              <p className="text-[11px] font-semibold text-slate uppercase tracking-widest mb-4 px-4">
                Sommaire
              </p>
              <ul className="space-y-0.5">
                {toc.map(item => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="toc-link">{item.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Article */}
          <article className="min-w-0 space-y-4">

            {/* §1 — Fonctionnement */}
            <section id="fonctionnement">
              <h2 className="article-h2">1. Comment fonctionnent les subsides LAMal</h2>
              <p className="article-p">
                La réduction individuelle des primes (RIP, ou IPV en allemand) est une aide financière prévue par l'article 65 de la loi fédérale sur l'assurance maladie. Elle vise à garantir que les primes LAMal ne constituent pas une charge disproportionnée pour les ménages à revenu faible ou moyen.
              </p>
              <p className="article-p">
                La Confédération verse aux cantons une contribution annuelle calculée sur la base des coûts moyens de l'assurance maladie. Les cantons doivent y ajouter au moins autant de leur propre budget. En pratique, chaque canton fixe librement ses barèmes, ses seuils de revenus et ses procédures d'attribution dans le cadre de la loi fédérale.
              </p>

              <div className="callout flex gap-3 mt-6 mb-4">
                <svg className="w-5 h-5 shrink-0 mt-0.5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <p>
                  <strong className="text-ink">Règle des 10 % (en vigueur depuis le 1er janvier 2025) :</strong>{' '}
                  La révision de la LAMal oblige désormais les cantons à couvrir les primes des ménages à revenu faible et moyen lorsqu'elles dépassent 10 % du revenu disponible. Cette garantie s'applique dans tous les cantons, y compris ceux à attribution sur demande.
                </p>
              </div>

              <h3 className="article-h3">Revenu déterminant</h3>
              <p className="article-p">
                Chaque canton calcule un revenu déterminant spécifique. En règle générale, il se base sur votre revenu net fiscal, auquel s'ajoute une fraction de votre fortune nette (entre 5 % et 20 % selon le canton). Des déductions sociales (pour enfants, personnes seules, monoparentaux) réduisent ce montant.
              </p>

              <h3 className="article-h3">Attribution automatique ou sur demande</h3>
              <p className="article-p">
                Cinq cantons attribuent les subsides sans démarche de votre part : Genève, Neuchâtel, le Valais, Berne et Appenzell Rhodes-Intérieures. Dans les 21 autres cantons, une demande annuelle est nécessaire. Des délais stricts s'appliquent : un dossier hors délai peut entraîner la perte du droit pour l'année entière.
              </p>
            </section>

            {/* §2 — Calculateur */}
            <section id="calculateur">
              <h2 className="article-h2">2. Calculateur interactif — cantons romands</h2>
              <p className="article-p">
                Le calculateur couvre les six cantons romands en détail, avec les barèmes officiels 2026 : Genève, Vaud, Neuchâtel, Fribourg, Jura et Valais. Pour les cantons alémaniques et le Tessin, consultez le tableau de la section suivante avec le lien officiel de votre canton.
              </p>
              <SubsidesCalculator />
            </section>

            {/* §3 — Tableau 26 cantons */}
            <section id="tableau-cantons">
              <h2 className="article-h2">3. Tableau récapitulatif — 26 cantons suisses</h2>
              <p className="article-p">
                Les montants ci-dessous sont indicatifs pour un adulte seul, sans enfant, avec un revenu proche de zéro (subside maximum théorique). Pour les familles et les couples, les seuils de revenus et les montants sont significativement plus élevés. Les délais passés correspondent aux dates de dépôt pour l'exercice 2026 ; certains cantons acceptent les dépôts tardifs avec un droit calculé dès le mois suivant.
              </p>
              <div className="overflow-x-auto border border-edge rounded-[8px]">
                <table className="stripe-table w-full">
                  <thead>
                    <tr>
                      <th className="text-left whitespace-nowrap">Canton</th>
                      <th className="text-left whitespace-nowrap">Seuil de revenu (adulte seul)</th>
                      <th className="text-left whitespace-nowrap">Montant mensuel maximum indicatif</th>
                      <th className="text-left whitespace-nowrap">Attribution</th>
                      <th className="text-left whitespace-nowrap">Délai 2026</th>
                      <th className="text-left whitespace-nowrap">Lien officiel</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CANTONS_SUBSIDES.map(row => (
                      <tr key={row.code}>
                        <td className="text-left whitespace-nowrap">
                          <span className="text-[12px] font-bold text-brand bg-[#dbeafe] px-1.5 py-0.5 rounded mr-1.5">{row.code}</span>
                          <span className="font-medium text-ink">{row.nom}</span>
                        </td>
                        <td className="text-left">{row.revenu}</td>
                        <td className="text-left font-medium text-ink">{row.montant}</td>
                        <td className="text-left whitespace-nowrap">
                          {row.auto ? (
                            <span className="text-[13px] font-medium text-[#166534] bg-[#f0fdf4] border border-[#86efac] px-2 py-0.5 rounded-full">Automatique</span>
                          ) : (
                            <span className="text-[13px] text-slate">Sur demande</span>
                          )}
                        </td>
                        <td className="text-left whitespace-nowrap text-slate">{row.delai}</td>
                        <td className="text-left whitespace-nowrap">
                          <a href={row.lien} target="_blank" rel="noopener noreferrer"
                             className="text-brand hover:underline text-[13px]">
                            Voir →
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[12px] text-slate mt-3">
                Sources : caisses de compensation cantonales, sites officiels cantonaux 2026. Montants calculés sur la base des primes de référence (Richtprämien) 2026. Les seuils et montants varient selon la région tarifaire, la taille du ménage et la situation fiscale individuelle.
              </p>
            </section>

            {/* §4 — La réforme 2025 */}
            <section id="reforme-2025">
              <h2 className="article-h2">4. La réforme des subsides depuis 2025</h2>
              <p className="article-p">
                La révision de la LAMal, votée par le Parlement et entrée en vigueur le 1er janvier 2025, a renforcé les obligations des cantons en matière de réduction des primes. Deux changements majeurs affectent directement les assurés en 2026.
              </p>

              <h3 className="article-h3">Plafonnement des primes à 10 % du revenu disponible</h3>
              <p className="article-p">
                Les cantons doivent désormais garantir que les primes LAMal ne dépassent pas 10 % du revenu disponible pour les personnes aux revenus faibles et moyens. Si la prime dépasse ce seuil, le canton doit couvrir l'excédent. Cette règle représente un filet de sécurité universel, y compris dans les cantons à procédure de demande.
              </p>

              <h3 className="article-h3">Garanties minimales renforcées pour les enfants et les jeunes adultes</h3>
              <p className="article-p">
                La loi fédérale fixe des minima obligatoires : le subside pour un enfant doit couvrir au minimum 80 % de la prime de référence cantonale, et au moins 50 % pour les jeunes adultes en formation. Ces garanties s'appliquent dans tous les cantons, sans exception.
              </p>

              <div className="overflow-x-auto border border-edge rounded-[8px] mt-6">
                <table className="stripe-table w-full">
                  <thead>
                    <tr>
                      <th className="text-left whitespace-nowrap">Profil</th>
                      <th className="text-left whitespace-nowrap">Garantie minimale fédérale</th>
                      <th className="text-left whitespace-nowrap">Condition d'application</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-left whitespace-nowrap font-medium text-ink">Enfant (moins de 18 ans)</td>
                      <td className="text-left whitespace-nowrap text-[#166534] font-medium">80 % de la prime de référence</td>
                      <td className="text-left">Revenu du ménage dans les barèmes cantonaux</td>
                    </tr>
                    <tr>
                      <td className="text-left whitespace-nowrap font-medium text-ink">Jeune adulte en formation (18–25 ans)</td>
                      <td className="text-left whitespace-nowrap text-[#166534] font-medium">50 % de la prime de référence</td>
                      <td className="text-left">Rattaché à la famille ou revenu propre faible</td>
                    </tr>
                    <tr>
                      <td className="text-left whitespace-nowrap font-medium text-ink">Tout ménage</td>
                      <td className="text-left whitespace-nowrap text-[#166534] font-medium">Prime plafonnée à 10 % du revenu</td>
                      <td className="text-left">Revenu faible ou moyen selon barème cantonal</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="article-p mt-6">
                <Link href="/lamal/guide" className="text-brand hover:underline">
                  Comprendre le fonctionnement complet de la LAMal →
                </Link>
              </p>
            </section>

            {/* FAQ */}
            <section id="faq">
              <FAQ items={faqItems} title="5. Questions fréquentes sur les subsides LAMal" />
            </section>

            {/* Contact */}
            <NeedHelpSection />

            {/* AuthorBio */}
            <AuthorBio publishedDate="1er janvier 2026" updatedDate="29 avril 2026" />

            {/* Guides associés */}
            <section className="pt-8 border-t border-edge mt-4">
              <p className="text-[13px] font-semibold text-slate uppercase tracking-widest mb-4">
                Guides associés
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { href: '/lamal/guide',             label: 'Comprendre la LAMal' },
                  { href: '/lamal/comparateur',       label: 'Comparateur de primes 2026' },
                  { href: '/lamal/franchise',         label: 'Choisir sa franchise' },
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
