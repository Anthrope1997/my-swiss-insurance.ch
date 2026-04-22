import type { Metadata } from 'next'
import AuthorBio from '@/components/ui/AuthorBio'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FAQ from '@/components/ui/FAQ'
import Link from 'next/link'
import MultiStepLeadForm from '@/components/ui/MultiStepLeadForm'

export const metadata: Metadata = {
  title: 'LAMal vs LCA : assurance de base vs complémentaire en Suisse',
  description:
    'Différences entre LAMal (assurance obligatoire) et LCA (complémentaire) : couverture, coûts, refus d\'admission et quand souscrire une LCA.',
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
  author: { '@type': 'Organization', name: 'My Swiss Insurance' },
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
    answer: "Dépend de vos besoins. LCA hospitalière utile pour le libre choix du médecin chef. LCA ambulatoire pertinente pour médecines alternatives, lunettes ou soins dentaires. LCA dentaire rentable pour les familles avec enfants. Comparez coûts vs prestations avant de souscrire.",
  },
  {
    question: "Peut-on souscrire une LCA après un diagnostic de maladie ?",
    answer: "Techniquement oui, mais avec des risques élevés d'exclusion ou de refus. Les assureurs LCA peuvent exclure définitivement les affections préexistantes connues au moment de la souscription. Il est fortement conseillé de souscrire lorsque vous êtes en bonne santé.",
  },
  {
    question: "La LCA couvre-t-elle les soins à l'étranger ?",
    answer: "La LAMal de base prend en charge les soins urgents à l'étranger, dans la limite du double du tarif suisse. Pour une couverture complète hors Suisse (rapatriement, soins non urgents), une LCA internationale est nécessaire. Elle est indispensable pour les grands voyageurs et les expatriés.",
  },
  {
    question: "Peut-on cumuler plusieurs LCA chez différents assureurs ?",
    answer: "Oui. Vous pouvez avoir une LCA hospitalière chez un assureur et une LCA dentaire chez un autre. En revanche, en cas de double couverture pour la même prestation, chaque assureur ne paie qu'une part proportionnelle — vous ne pouvez pas percevoir plus que le coût réel des soins.",
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
  { aspect: 'Obligation', lamal: 'Obligatoire pour tous les résidents', lca: 'Entièrement facultative' },
  { aspect: 'Prestations', lamal: 'Standardisées, identiques partout', lca: 'Variables selon assureur et contrat' },
  { aspect: 'Admission', lamal: 'Impossible de refuser un assuré', lca: 'Refus possible, exclusions médicales' },
  { aspect: 'Changement', lamal: 'Libre chaque année (30 nov.)', lca: 'Selon conditions du contrat' },
  { aspect: 'Loi applicable', lamal: 'LAMal (RS 832.10)', lca: 'LCA (RS 221.229.1)' },
  { aspect: 'Contrôle des primes', lamal: 'Approuvées par l\'OFSP', lca: 'Fixées librement par l\'assureur' },
  { aspect: 'Subventions cantonales', lamal: 'Oui (subsides de primes)', lca: 'Non' },
]

export default function LamalVsLcaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="bg-white border-b border-edge pt-12 pb-10">
        <div className="container-xl">
          <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'LAMal', href: '/lamal' }, { label: 'LAMal vs assurance complémentaire' }]} />
          <h1 className="text-5xl font-bold text-ink leading-tight mb-4 max-w-2xl">
            LAMal vs LCA : assurance de base et complémentaire.
          </h1>
          <p className="text-xl text-slate max-w-2xl leading-relaxed">
            La LAMal couvre les soins essentiels obligatoires. La LCA complète avec des
            prestations facultatives. Comprenez les différences pour faire le bon choix.
          </p>
        </div>
      </section>

      <div className="container-xl py-16">
        <AuthorBio publishedDate="1er janvier 2026" updatedDate="13 avril 2026" />
        <div className="flex gap-12">
          <div className="flex-1 min-w-0 space-y-14">

            {/* Comparaison visuelle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-cloud border border-edge rounded-[8px] p-6">
                <h2 className="text-[16px] font-semibold text-brand mb-4">LAMal : assurance de base</h2>
                <ul className="space-y-2">
                  {[
                    'Obligatoire pour tous les résidents',
                    'Prestations identiques chez tous les assureurs',
                    'Admission impossible à refuser',
                    'Médecine générale et spécialistes',
                    'Hospitalisation en division commune',
                    'Maternité complète',
                    'Urgences 24h/24',
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
                <h2 className="text-[16px] font-semibold text-slate mb-4">LCA : assurances complémentaires</h2>
                <ul className="space-y-2">
                  {[
                    'Facultative selon vos besoins',
                    'Prestations variables par assureur',
                    'Refus ou exclusions possibles',
                    'Chambre privée / semi-privée',
                    'Libre choix du médecin chef',
                    'Médecine alternative reconnue',
                    'Soins dentaires et orthodontie',
                    'Lunettes et lentilles',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2.5 text-[14px] text-slate">
                      <span className="w-4 h-4 flex items-center justify-center text-slate shrink-0 mt-0.5">◦</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Table */}
            <section>
              <h2 className="text-2xl font-semibold text-ink mb-6">Tableau comparatif</h2>
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

            {/* Types de LCA */}
            <section>
              <h2 className="text-2xl font-semibold text-ink mb-6">
                Les principaux types d'assurances complémentaires LCA
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: 'LCA hospitalière',
                    cost: 'CHF 40–200+/mois',
                    desc: 'Chambre semi-privée ou privée, libre choix du médecin chef, hôpital de votre choix en Suisse voire à l\'étranger.',
                  },
                  {
                    title: 'LCA ambulatoire',
                    cost: 'CHF 15–60/mois',
                    desc: 'Médecines alternatives (acupuncture, ostéopathie), lunettes et lentilles, prévention renforcée, fitness.',
                  },
                  {
                    title: 'LCA dentaire',
                    cost: 'CHF 20–80/mois',
                    desc: 'Détartrage, plombages, couronnes, orthodontie. Non couvert par la LAMal sauf en cas d\'accident.',
                  },
                  {
                    title: 'LCA internationale',
                    cost: 'CHF 30–120/mois',
                    desc: 'Soins médicaux hors de Suisse, rapatriement sanitaire. Indispensable pour les grands voyageurs et expatriés.',
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

            {/* Quand souscrire */}
            <section>
              <h2 className="text-2xl font-semibold text-ink mb-4">Quand souscrire une LCA ?</h2>
              <div className="callout-warning mb-6">
                <p className="font-semibold mb-1">Le moment de souscription compte</p>
                <p className="text-[15px]">
                  Plus vous souscrivez tôt (en bonne santé), moins vous risquez d'exclusions.
                  Une maladie diagnostiquée avant la souscription peut être exclue définitivement.
                  La LAMal, elle, ne peut jamais imposer d'exclusions.
                </p>
              </div>
              <ul className="space-y-3">
                {[
                  'Souscrivez la LCA hospitalière jeune pour éviter les surprimes liées à l\'âge.',
                  'Pour les enfants, une LCA dentaire peut être rentable dès le bas âge.',
                  'Expatriés et voyageurs fréquents : une LCA internationale est souvent indispensable.',
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

            {/* Cas concrets */}
            <section>
              <h2 className="text-2xl font-semibold text-ink mb-6">Cas concrets</h2>
              <div className="space-y-4">
                {[
                  {
                    profil: 'Jeune actif en bonne santé',
                    lamal: 'LAMal standard ou Telmed, franchise 2500 CHF.',
                    lca: 'LCA hospitalière souscrite tôt (avant 30 ans) pour bloquer les conditions avantageuses. LCA ambulatoire optionnelle.',
                    conseil: 'Priorisez la LCA hospitalière en bonne santé — c\'est le moment idéal pour éviter les exclusions.',
                  },
                  {
                    profil: 'Famille avec deux enfants',
                    lamal: 'LAMal médecin de famille pour les adultes, franchise 300 CHF pour les enfants.',
                    lca: 'LCA dentaire très pertinente pour les frais orthodontiques. LCA ambulatoire pour la médecine préventive.',
                    conseil: 'Comparez les offres LCA dentaire — les remboursements varient fortement selon l\'assureur.',
                  },
                  {
                    profil: 'Retraité(e)',
                    lamal: 'LAMal médecin de famille, franchise 300 CHF (frais médicaux fréquents).',
                    lca: 'LCA hospitalière recommandée pour le libre choix du médecin chef. Souscrivez avant 65 ans pour des conditions optimales.',
                    conseil: 'Après 65 ans, certaines LCA hospitalières deviennent inaccessibles ou très chères. Anticipez.',
                  },
                  {
                    profil: 'Expatrié(e) fréquemment à l\'étranger',
                    lamal: 'LAMal standard avec franchise 300 CHF ou 500 CHF.',
                    lca: 'LCA internationale indispensable pour les soins hors Suisse, le rapatriement et les urgences à l\'étranger.',
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
                      💡 {cas.conseil}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <FAQ items={faqItems} />

            <section>
              <h3 className="text-[16px] font-semibold text-ink mb-3">Voir aussi</h3>
              <div className="flex flex-col gap-2">
                {[
                  { href: '/lamal/maternite', label: 'Maternité et LAMal' },
                  { href: '/lamal/guide', label: 'Guide complet LAMal 2026' },
                  { href: '/lamal/comparateur', label: 'Comparer ma prime LAMal' },
                ].map(link => (
                  <Link key={link.href} href={link.href}
                    className="text-[15px] text-brand hover:underline flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {link.label}
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <MultiStepLeadForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
