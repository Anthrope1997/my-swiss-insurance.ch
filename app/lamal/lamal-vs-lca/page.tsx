import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/LeadForm'

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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "La LCA est-elle obligatoire en Suisse ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. La LCA est entièrement facultative. Seule la LAMal est obligatoire pour tout résident en Suisse.",
      },
    },
    {
      '@type': 'Question',
      name: "L'assureur peut-il refuser une assurance LCA ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui. Contrairement à la LAMal, les assureurs peuvent refuser ou imposer des exclusions pour les LCA. Maladies préexistantes, âge avancé ou risques élevés peuvent entraîner un refus ou une surprime.",
      },
    },
    {
      '@type': 'Question',
      name: "Vaut-il la peine de souscrire une LCA en Suisse ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Dépend de vos besoins. LCA hospitalière utile pour le libre choix du médecin chef. LCA ambulatoire pertinente pour médecines alternatives, lunettes ou soins dentaires. LCA dentaire rentable pour les familles avec enfants. Comparez coûts vs prestations avant de souscrire.",
      },
    },
  ],
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
          <nav className="flex items-center gap-2 text-[13px] text-slate mb-6">
            <Link href="/" className="hover:text-ink transition-colors">Accueil</Link>
            <span className="text-edge">/</span>
            <Link href="/lamal" className="hover:text-ink transition-colors">LAMal</Link>
            <span className="text-edge">/</span>
            <span className="text-ink">LAMal vs LCA</span>
          </nav>
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
        <div className="flex gap-12">
          <div className="flex-1 min-w-0 space-y-14">

            {/* Comparaison visuelle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-cloud border border-edge rounded-[8px] p-6">
                <h2 className="text-[16px] font-semibold text-brand mb-4">LAMal — Assurance de base</h2>
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
                <h2 className="text-[16px] font-semibold text-slate mb-4">LCA — Assurances complémentaires</h2>
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

            {/* FAQ */}
            <section>
              <h2 className="text-2xl font-semibold text-ink mb-6">Questions fréquentes</h2>
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
          </div>

          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <LeadForm compact />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
