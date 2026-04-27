import type { Metadata } from 'next'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FAQ from '@/components/ui/FAQ'
import Link from 'next/link'
import MultiStepLeadForm from '@/components/ui/MultiStepLeadForm'

export const metadata: Metadata = {
  title: 'LAMal vs LCA : assurance de base vs complémentaire en Suisse',
  description:
    "Différences entre LAMal (assurance obligatoire) et LCA (complémentaire) : couverture, coûts, refus d'admission et quand souscrire une LCA.",
  openGraph: {
    title: 'LAMal vs LCA : différences entre assurance de base et complémentaire',
    description: 'Guide LAMal vs LCA : obligations, prestations, refus et conseils pour choisir.',
    url: 'https://my-swiss-insurance.ch/lamal/lamal-vs-lca',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'LAMal vs LCA : assurance de base et complémentaire en Suisse',
  datePublished: '2026-01-01',
  dateModified: '2026-04-01',
  author: { '@type': 'Organization', name: 'My Swiss Insurance', url: 'https://my-swiss-insurance.ch' },
  publisher: { '@type': 'Organization', name: 'My Swiss Insurance' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://my-swiss-insurance.ch/lamal/lamal-vs-lca' },
}

const faqItems = [
  {
    question: "La LCA est-elle obligatoire en Suisse ?",
    answer: "Non. La LCA est entièrement facultative. Seule la LAMal est obligatoire pour tout résident en Suisse.",
  },
  {
    question: "L'assureur peut-il refuser une assurance LCA ?",
    answer: "Oui. Contrairement à la LAMal, les assureurs peuvent refuser ou imposer des exclusions pour les LCA. Maladies préexistantes, âge avancé ou risques élevés peuvent entraîner un refus ou une surprime.",
  },
  {
    question: "Vaut-il la peine de souscrire une LCA en Suisse ?",
    answer: "Cela dépend de vos besoins. La LCA hospitalière est utile pour le libre choix du médecin chef. La LCA ambulatoire est pertinente pour les médecines alternatives, les lunettes ou les soins dentaires. La LCA dentaire est souvent rentable pour les familles avec enfants. Comparez les coûts et les prestations avant de souscrire.",
  },
  {
    question: "Peut-on souscrire une LCA après un diagnostic de maladie ?",
    answer: "Techniquement oui, mais avec des risques élevés d'exclusion ou de refus. Les assureurs LCA peuvent exclure définitivement les affections préexistantes connues au moment de la souscription. Il est fortement conseillé de souscrire lorsque vous êtes en bonne santé.",
  },
  {
    question: "La LCA couvre-t-elle les soins à l'étranger ?",
    answer: "La LAMal de base prend en charge les soins urgents à l'étranger, dans la limite du double du tarif suisse. Pour une couverture complète hors Suisse (rapatriement, soins non urgents), une LCA internationale est nécessaire. Elle est indispensable pour les grands voyageurs et les personnes résidant à l'étranger.",
  },
  {
    question: "Peut-on cumuler plusieurs LCA chez différents assureurs ?",
    answer: "Oui. Vous pouvez avoir une LCA hospitalière chez un assureur et une LCA dentaire chez un autre. En revanche, en cas de double couverture pour la même prestation, chaque assureur ne paie qu'une part proportionnelle : vous ne pouvez pas percevoir plus que le coût réel des soins.",
  },
  {
    question: "La LCA suit-elle les mêmes règles de résiliation que la LAMal ?",
    answer: "Non. Les conditions de résiliation d'une LCA sont définies dans le contrat lui-même, pas par la loi. Certains contrats ont des périodes d'engagement de 3 à 5 ans. Lisez attentivement les conditions de résiliation avant de signer, notamment la durée minimale et le préavis.",
  },
  {
    question: "Quelle LCA est la plus utile pour une famille avec enfants ?",
    answer: "La LCA dentaire est souvent la plus rentable pour les familles, car les soins dentaires et orthodontiques pour enfants peuvent être coûteux. La LCA ambulatoire est utile pour les soins préventifs et les médecines alternatives. À souscrire tôt, avant que les enfants ne développent des problèmes de santé.",
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

const comparaison = [
  { aspect: 'Obligation',             lamal: 'Obligatoire pour tous les résidents',  lca: 'Entièrement facultative' },
  { aspect: 'Prestations',            lamal: 'Standardisées, identiques partout',     lca: 'Variables selon assureur et contrat' },
  { aspect: 'Admission',              lamal: "Impossible de refuser un assuré",       lca: 'Refus possible, exclusions médicales' },
  { aspect: 'Changement',             lamal: 'Libre chaque année (30 nov.)',           lca: 'Selon conditions du contrat' },
  { aspect: 'Loi applicable',         lamal: 'LAMal (RS 832.10)',                      lca: 'LCA (RS 221.229.1)' },
  { aspect: 'Contrôle des primes',    lamal: "Approuvées par l'OFSP",                 lca: "Fixées librement par l'assureur" },
  { aspect: 'Subventions cantonales', lamal: 'Oui (subsides de primes)',               lca: 'Non' },
]

const heroStats = [
  { value: '7',          label: 'Points de différence clés', sub: 'obligation, admission, changement...' },
  { value: '4',          label: 'Types de LCA',              sub: 'hospitalière, ambulatoire, dentaire, internationale' },
  { value: 'Facultative', label: 'Nature de la LCA',         sub: 'contrairement à la LAMal obligatoire' },
]

const toc = [
  { id: 'comparaison',  label: '1. Comparaison visuelle'      },
  { id: 'tableau',      label: '2. Tableau comparatif'        },
  { id: 'types',        label: '3. Types de LCA'              },
  { id: 'quand',        label: '4. Quand souscrire'           },
  { id: 'cas-concrets', label: '5. Cas concrets'              },
  { id: 'faq',          label: '6. Questions fréquentes'      },
]

const guidesAssocies = [
  { href: '/lamal/guide',       label: 'Guide complet LAMal 2026' },
  { href: '/lamal/comparateur', label: 'Comparer ma prime LAMal'  },
  { href: '/lamal/modeles',     label: 'Les 4 modèles LAMal'      },
]

export default function LamalVsLcaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── Hero ── */}
      <section className="bg-white border-b border-edge pt-12 pb-14">
        <div className="container-xl">
          <Breadcrumb items={[
            { label: 'Accueil', href: '/' },
            { label: 'LAMal', href: '/lamal' },
            { label: 'LAMal vs assurance complémentaire' },
          ]} />

          <div className="bg-cloud border-b border-edge flex items-center gap-3 py-3 mt-4 mb-7">
            <div className="w-7 h-7 rounded-full bg-[#0f2040] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
              MSI
            </div>
            <p className="text-[11px] text-slate leading-snug">
              La rédaction My Swiss Insurance / Service éditorial indépendant, Lausanne /
              Publié le 1er janvier 2026, mis à jour le 13 avril 2026
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            <span className="badge">Mis à jour avril 2026</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-ink leading-tight mb-4 max-w-3xl">
            LAMal vs LCA : assurance de base et complémentaire
          </h1>
          <p className="text-[18px] text-slate max-w-2xl leading-relaxed mb-10">
            La LAMal couvre les soins essentiels obligatoires. La LCA complète avec des
            prestations facultatives. Comprenez les différences pour faire le bon choix.
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

      {/* ── Layout 2 colonnes ── */}
      <div className="container-xl py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12 items-start">

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

          <article className="min-w-0 space-y-4">

            {/* 1 — Comparaison visuelle */}
            <section id="comparaison" className="pt-2">
              <h2 className="article-h2">1. LAMal et LCA en un coup d'oeil</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="bg-cloud border border-edge rounded-[8px] p-6">
                  <h3 className="article-h3 mt-0">LAMal : assurance de base</h3>
                  <ul className="space-y-2">
                    {[
                      'Obligatoire pour tous les résidents',
                      'Prestations identiques chez tous les assureurs',
                      'Admission impossible à refuser',
                      'Médecine générale et spécialistes',
                      'Hospitalisation en division commune',
                      'Maternité complète',
                      'Urgences 24 heures sur 24',
                      'Subsides cantonaux possibles',
                    ].map((item, i) => (
                      <li key={i} className="flex gap-2.5 text-[14px] text-slate">
                        <svg className="w-4 h-4 text-brand mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white border border-edge rounded-[8px] p-6">
                  <h3 className="article-h3 mt-0">LCA : assurances complémentaires</h3>
                  <ul className="space-y-2">
                    {[
                      'Facultative selon vos besoins',
                      'Prestations variables par assureur',
                      'Refus ou exclusions possibles',
                      'Chambre privée ou semi-privée',
                      'Libre choix du médecin chef',
                      'Médecine alternative reconnue',
                      'Soins dentaires et orthodontie',
                      'Lunettes et lentilles',
                    ].map((item, i) => (
                      <li key={i} className="flex gap-2.5 text-[14px] text-slate">
                        <svg className="w-4 h-4 text-slate/40 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14M5 12h14" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* 2 — Tableau comparatif */}
            <section id="tableau">
              <h2 className="article-h2">2. Tableau comparatif</h2>
              <div className="border border-edge rounded-[8px] overflow-hidden">
                <table className="stripe-table w-full">
                  <thead>
                    <tr>
                      <th>Aspect</th>
                      <th>LAMal (base)</th>
                      <th>LCA (complémentaire)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparaison.map((row, i) => (
                      <tr key={i}>
                        <td className="font-semibold text-ink">{row.aspect}</td>
                        <td>{row.lamal}</td>
                        <td>{row.lca}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 3 — Types de LCA */}
            <section id="types">
              <h2 className="article-h2">3. Les principaux types d'assurances complémentaires</h2>
              <div className="space-y-4">
                {[
                  {
                    title: 'LCA hospitalière',
                    cost: 'CHF 40 à 200 par mois',
                    desc: "Chambre semi-privée ou privée, libre choix du médecin chef, hôpital de votre choix en Suisse ou à l'étranger.",
                  },
                  {
                    title: 'LCA ambulatoire',
                    cost: 'CHF 15 à 60 par mois',
                    desc: 'Médecines alternatives (acupuncture, ostéopathie), lunettes et lentilles, prévention renforcée, fitness.',
                  },
                  {
                    title: 'LCA dentaire',
                    cost: 'CHF 20 à 80 par mois',
                    desc: 'Détartrage, plombages, couronnes, orthodontie. Non couvert par la LAMal sauf en cas d\'accident.',
                  },
                  {
                    title: 'LCA internationale',
                    cost: 'CHF 30 à 120 par mois',
                    desc: "Soins médicaux hors de Suisse, rapatriement sanitaire. Indispensable pour les grands voyageurs et les expatriés.",
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-white border border-edge rounded-[8px] p-5 flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-ink text-[16px] mb-1">{item.title}</h3>
                      <p className="text-[15px] text-slate">{item.desc}</p>
                    </div>
                    <span className="shrink-0 text-[13px] text-slate bg-cloud border border-edge px-3 py-1.5 rounded-md whitespace-nowrap self-start">
                      {item.cost}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* 4 — Quand souscrire */}
            <section id="quand">
              <h2 className="article-h2">4. Quand souscrire une LCA ?</h2>
              <div className="callout-warning mb-6">
                <p className="font-semibold mb-1">Le moment de souscription compte</p>
                <p className="text-[15px]">
                  Plus vous souscrivez tôt, lorsque vous êtes en bonne santé, moins vous risquez d'exclusions.
                  Une maladie diagnostiquée avant la souscription peut être exclue définitivement.
                  La LAMal, elle, ne peut jamais imposer d'exclusions.
                </p>
              </div>
              <ul className="space-y-3">
                {[
                  "Souscrivez la LCA hospitalière pendant que vous êtes en bonne santé pour éviter les surprimes liées à l'âge.",
                  'Pour les enfants, une LCA dentaire peut être rentable dès le bas âge.',
                  'Voyageurs fréquents et expatriés : une LCA internationale est souvent indispensable.',
                  'Comparez les offres : les écarts pour des prestations similaires peuvent dépasser 50%.',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-[15px] text-slate">
                    <svg className="w-4 h-4 text-brand mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {/* 5 — Cas concrets */}
            <section id="cas-concrets">
              <h2 className="article-h2">5. Cas concrets</h2>
              <div className="space-y-4">
                {[
                  {
                    profil: 'Jeune actif en bonne santé',
                    lamal: 'LAMal standard ou Telmed, franchise 2 500 CHF par an.',
                    lca: "LCA hospitalière souscrite tôt, avant 30 ans, pour bloquer les conditions avantageuses. LCA ambulatoire optionnelle.",
                    conseil: "Priorité à la LCA hospitalière en bonne santé : c'est le moment idéal pour éviter les exclusions.",
                  },
                  {
                    profil: 'Famille avec deux enfants',
                    lamal: 'LAMal médecin de famille pour les adultes, franchise 300 CHF par an pour les enfants.',
                    lca: 'LCA dentaire très pertinente pour les frais orthodontiques. LCA ambulatoire pour la médecine préventive.',
                    conseil: 'Comparez les offres LCA dentaire : les remboursements varient fortement selon l\'assureur.',
                  },
                  {
                    profil: 'Retraité ou retraitée',
                    lamal: 'LAMal médecin de famille, franchise 300 CHF par an (frais médicaux fréquents).',
                    lca: 'LCA hospitalière recommandée pour le libre choix du médecin chef. À souscrire avant 65 ans pour des conditions optimales.',
                    conseil: "Après 65 ans, certaines LCA hospitalières deviennent inaccessibles ou très chères. Anticipez.",
                  },
                  {
                    profil: "Expatrié ou expatriée fréquemment à l'étranger",
                    lamal: 'LAMal standard avec franchise 300 CHF ou 500 CHF par an.',
                    lca: "LCA internationale indispensable pour les soins hors Suisse, le rapatriement et les urgences à l'étranger.",
                    conseil: 'Vérifiez que votre LCA internationale couvre votre pays de résidence habituel et vos destinations fréquentes.',
                  },
                ].map((cas, i) => (
                  <div key={i} className="border border-edge rounded-[8px] p-5 bg-white">
                    <p className="font-semibold text-ink text-[16px] mb-3">{cas.profil}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <div className="bg-cloud border border-edge rounded-md px-3 py-2">
                        <p className="text-[11px] font-semibold text-slate uppercase tracking-wide mb-1">LAMal recommandée</p>
                        <p className="text-[13px] text-ink">{cas.lamal}</p>
                      </div>
                      <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-md px-3 py-2">
                        <p className="text-[11px] font-semibold text-brand uppercase tracking-wide mb-1">LCA pertinente</p>
                        <p className="text-[13px] text-ink">{cas.lca}</p>
                      </div>
                    </div>
                    <p className="text-[13px] text-brand bg-[#eff6ff] border border-[#bfdbfe] rounded-md px-3 py-1.5">
                      {cas.conseil}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 6 — FAQ */}
            <section id="faq">
              <FAQ items={faqItems} title="6. Questions fréquentes : LAMal et assurance complémentaire" />
            </section>

            {/* Formulaire */}
            <div id="contact" className="scroll-mt-20 border-t border-edge pt-12 mt-4">
              <h2 className="text-2xl font-semibold text-ink mb-3">
                Besoin d'aide ?
              </h2>
              <p className="text-[16px] text-slate mb-6 leading-relaxed">
                Un expert vous rappelle sous 24 heures pour établir avec vous une solution
                personnalisée. Gratuit, sans engagement.
              </p>
              <MultiStepLeadForm redirectOnSuccess="/fr/merci" />
            </div>

            {/* Guides associés */}
            <section className="pt-8 border-t border-edge mt-4">
              <p className="text-[13px] font-semibold text-slate uppercase tracking-widest mb-4">
                Guides associés
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {guidesAssocies.map(({ href, label }) => (
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
