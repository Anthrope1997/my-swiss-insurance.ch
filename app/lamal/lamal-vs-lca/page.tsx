import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/LeadForm'

export const metadata: Metadata = {
  title: 'LAMal vs LCA : quelle différence ? — Assurance de base vs complémentaire',
  description:
    'Différences entre LAMal (assurance maladie obligatoire) et LCA (assurances complémentaires). Ce qui est couvert, ce qui est facultatif et comment choisir.',
  openGraph: {
    title: 'LAMal vs LCA : assurance de base vs complémentaire en Suisse',
    description: 'Guide complet sur les différences entre LAMal et LCA : couverture, coûts et comment choisir.',
    url: 'https://my-swiss-insurance.ch/lamal/lamal-vs-lca',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'LAMal vs LCA : différences entre assurance de base et complémentaire en Suisse',
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
        text: "Non, la LCA (assurances complémentaires) est entièrement facultative. Seule la LAMal (assurance de base) est obligatoire pour tous les résidents en Suisse. Les assurances LCA offrent des prestations supplémentaires non couvertes par la LAMal : chambre privée, médecine alternative, soins dentaires, lunettes, etc.",
      },
    },
    {
      '@type': 'Question',
      name: "L'assureur peut-il refuser une assurance LCA ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui. Contrairement à la LAMal où l'admission est obligatoire, les assureurs peuvent refuser ou imposer des exclusions pour les assurances complémentaires LCA. Ils peuvent notamment exclure des maladies préexistantes, imposer des primes majorées ou refuser purement et simplement l'admission selon l'état de santé du candidat.",
      },
    },
    {
      '@type': 'Question',
      name: "Vaut-il la peine de souscrire une LCA en Suisse ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Cela dépend de votre situation. Une LCA hospitalière (division semi-privée ou privée) est pertinente si vous voulez le libre choix du médecin chef à l'hôpital. Une LCA ambulatoire peut couvrir des médecines alternatives, les lunettes ou les soins dentaires. Pour les familles avec jeunes enfants, une LCA couvrant les soins dentaires préventifs peut être rentable. Comparez les coûts vs les prestations avant de souscrire.",
      },
    },
  ],
}

const comparaison = [
  { aspect: 'Obligation', lamal: 'Obligatoire pour tous les résidents', lca: 'Facultative, selon choix personnel' },
  { aspect: 'Prestations', lamal: 'Standardisées, identiques partout', lca: 'Variables selon assureur et contrat' },
  { aspect: 'Admission', lamal: 'Impossible de refuser un assuré', lca: 'Refus possible, exclusions médicales' },
  { aspect: 'Changement d\'assureur', lamal: 'Libre chaque année (30 nov.)', lca: 'Selon conditions du contrat (délais)' },
  { aspect: 'Loi applicable', lamal: 'LAMal (RS 832.10)', lca: 'LCA (RS 221.229.1) + règlements assureur' },
  { aspect: 'Contrôle des primes', lamal: 'Approbées par l\'OFSP', lca: 'Fixées librement par l\'assureur' },
  { aspect: 'Franchise', lamal: 'Oui (300–2500 CHF)', lca: 'Possible selon contrat' },
  { aspect: 'Subventions cantonales', lamal: 'Oui (subsides de primes)', lca: 'Non' },
]

export default function LamalVsLcaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="bg-primary-light border-b border-blue-100 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-primary">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/lamal" className="hover:text-primary">LAMal</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">LAMal vs LCA</span>
          </nav>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            LAMal vs LCA : assurance de base et complémentaire
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            La LAMal couvre les soins essentiels obligatoires. La LCA complète avec des
            prestations facultatives. Comprenez les différences pour faire le bon choix.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">

            {/* Quick comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                <h2 className="text-lg font-bold text-primary mb-3">LAMal — Assurance de base</h2>
                <ul className="space-y-2 text-sm text-gray-700">
                  {[
                    '✓ Obligatoire pour tous les résidents',
                    '✓ Prestations identiques chez tous les assureurs',
                    '✓ Admission impossible à refuser',
                    '✓ Soins médicaux essentiels',
                    '✓ Hospitalisation en division commune',
                    '✓ Maternité',
                    '✓ Urgences',
                    '✓ Subsides cantonaux possibles',
                  ].map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                <h2 className="text-lg font-bold text-gray-700 mb-3">LCA — Assurances complémentaires</h2>
                <ul className="space-y-2 text-sm text-gray-700">
                  {[
                    '◦ Facultative, selon vos besoins',
                    '◦ Prestations variables selon assureur',
                    '◦ Refus ou exclusions possibles',
                    '◦ Chambre privée / semi-privée',
                    '◦ Libre choix du médecin chef',
                    '◦ Médecine alternative reconnue',
                    '◦ Soins dentaires et orthodontie',
                    '◦ Lunettes et lentilles',
                  ].map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Table de comparaison */}
            <section>
              <h2 className="text-xl font-bold mb-4">Tableau comparatif détaillé</h2>
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="table-auto w-full text-sm">
                  <thead>
                    <tr>
                      <th className="bg-primary text-white px-4 py-3 text-left">Aspect</th>
                      <th className="bg-primary text-white px-4 py-3 text-left">LAMal (base)</th>
                      <th className="bg-primary text-white px-4 py-3 text-left">LCA (complémentaire)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparaison.map((row, i) => (
                      <tr key={row.aspect} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-2.5 font-semibold text-gray-800">{row.aspect}</td>
                        <td className="px-4 py-2.5 text-gray-700">{row.lamal}</td>
                        <td className="px-4 py-2.5 text-gray-600">{row.lca}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Types de LCA */}
            <section>
              <h2 className="text-xl font-bold mb-5">Les principaux types d'assurances complémentaires (LCA)</h2>
              <div className="space-y-4">
                {[
                  {
                    title: 'LCA hospitalière',
                    desc: 'Couvre les frais supplémentaires d\'hospitalisation : chambre semi-privée (2 lits) ou privée (1 lit), libre choix du médecin chef et de l\'hôpital dans toute la Suisse voire à l\'étranger.',
                    cost: 'CHF 40–200+/mois selon âge et niveau',
                  },
                  {
                    title: 'LCA ambulatoire',
                    desc: 'Complète la LAMal pour les soins ambulatoires : médecines alternatives (acupuncture, ostéopathie, homéopathie), lunettes et lentilles, prévention renforcée, fitness.',
                    cost: 'CHF 15–60/mois selon âge et options',
                  },
                  {
                    title: 'LCA dentaire',
                    desc: 'Prend en charge tout ou partie des soins dentaires (non couverts par la LAMal sauf accident) : détartrage, plombages, couronnes, orthodontie (enfants).',
                    cost: 'CHF 20–80/mois selon couverture',
                  },
                  {
                    title: 'LCA internationale / expatrié',
                    desc: 'Pour les personnes voyageant fréquemment ou résidant temporairement à l\'étranger. Couvre les soins médicaux hors de Suisse, le rapatriement sanitaire.',
                    cost: 'CHF 30–120/mois selon zone géographique',
                  },
                ].map((item, i) => (
                  <div key={i} className="card">
                    <div className="flex justify-between items-start gap-3">
                      <h3 className="font-bold text-gray-900">{item.title}</h3>
                      <span className="text-xs text-gray-500 flex-shrink-0">{item.cost}</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Quand souscrire */}
            <section>
              <h2 className="text-xl font-bold mb-4">Quand souscrire une LCA ?</h2>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-4">
                <p className="font-semibold text-amber-900 mb-2">Important : le moment compte</p>
                <p className="text-amber-800 text-sm">
                  Plus vous souscrivez une LCA tôt (en bonne santé), moins vous risquez d'exclusions.
                  Une maladie diagnostiquée avant la souscription peut être exclue définitivement du contrat.
                  À l'inverse, la LAMal ne peut jamais imposer d'exclusions.
                </p>
              </div>
              <ul className="space-y-2 text-gray-700 text-sm">
                {[
                  'Souscrivez la LCA hospitalière jeune pour éviter les surprimes liées à l\'âge ou aux maladies préexistantes.',
                  'Si vous avez des enfants, une LCA dentaire et pédiatrique peut être rentable dès le bas âge.',
                  'Pour les expatriés et travailleurs transfrontaliers, une LCA internationale est souvent indispensable.',
                  'Comparez les offres : les écarts de prix pour des prestations similaires peuvent être de 30 à 50%.',
                ].map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary flex-shrink-0">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-xl font-bold mb-5">Questions fréquentes</h2>
              <div className="space-y-3">
                {faqSchema.mainEntity.map((q, i) => (
                  <details key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                    <summary className="px-5 py-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 list-none flex justify-between items-center">
                      {q.name}
                      <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <LeadForm compact />
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
