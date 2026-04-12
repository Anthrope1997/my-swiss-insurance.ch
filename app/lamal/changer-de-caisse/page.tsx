import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/LeadForm'

export const metadata: Metadata = {
  title: 'Changer de caisse maladie LAMal — Guide résiliation 2026',
  description:
    'Comment changer de caisse maladie en Suisse : délais, procédure, modèle de lettre de résiliation et conseils pour changer avant le 30 novembre. Guide 2026.',
  openGraph: {
    title: 'Changer de caisse maladie LAMal — Résiliation et procédure 2026',
    description: 'Guide complet pour changer d\'assureur LAMal : dates clés, lettre de résiliation, étapes.',
    url: 'https://my-swiss-insurance.ch/lamal/changer-de-caisse',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Changer de caisse maladie LAMal en Suisse — Guide et procédure 2026',
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
      name: "Quelle est la date limite pour changer de caisse maladie en Suisse ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Pour changer de caisse maladie au 1er janvier, vous devez résilier votre contrat actuel par courrier recommandé avant le 30 novembre. Si votre assureur annonce une hausse de prime, vous disposez d'un délai supplémentaire : vous pouvez résilier dans le mois suivant la notification pour quitter au 31 décembre.",
      },
    },
    {
      '@type': 'Question',
      name: "La nouvelle caisse maladie peut-elle refuser de m'accepter ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. Pour la LAMal (assurance de base), les caisses maladie ont l'obligation légale d'accepter toute personne résidant en Suisse, quelle que soit son état de santé. L'admission est de droit, sans sélection médicale. En revanche, pour les assurances complémentaires (LCA), la caisse peut refuser ou imposer des exclusions.",
      },
    },
    {
      '@type': 'Question',
      name: "Que se passe-t-il si j'oublie de résilier avant le 30 novembre ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Si vous manquez la date du 30 novembre, votre contrat est automatiquement reconduit pour l'année suivante. Vous ne pourrez changer qu'au 1er janvier de l'année d'après. Exception : si votre assureur annonce une hausse de prime entre novembre et décembre, vous pouvez encore résilier dans le mois suivant cette annonce.",
      },
    },
  ],
}

export default function ChangerDeCaissePage() {
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
            <span className="text-gray-800">Changer de caisse</span>
          </nav>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Comment changer de caisse maladie en Suisse
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Procédure complète, dates clés et modèle de lettre de résiliation pour changer
            d'assureur LAMal sans erreur. Économisez jusqu'à CHF 2'000/an en changeant.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">

            {/* Alert dates clés */}
            <div className="bg-amber-50 border border-amber-300 rounded-xl p-5">
              <h2 className="font-bold text-amber-900 mb-3 text-lg">📅 Dates clés 2026/2027</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                {[
                  { date: '30 novembre 2026', action: 'Date limite de résiliation ordinaire pour changer au 1er janvier 2027' },
                  { date: 'Octobre–novembre', action: 'Annonce des primes 2027 par les assureurs — vérifiez si votre prime augmente' },
                  { date: '31 décembre 2026', action: 'Fin de validité de votre ancien contrat si résiliation envoyée dans les délais' },
                ].map((item) => (
                  <div key={item.date} className="bg-white rounded-lg p-3 border border-amber-100">
                    <div className="font-bold text-amber-800 text-xs mb-1">{item.date}</div>
                    <div className="text-gray-700">{item.action}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Étapes */}
            <section>
              <h2 className="text-xl font-bold mb-5">Les 5 étapes pour changer de caisse</h2>
              <div className="space-y-4">
                {[
                  {
                    n: '1',
                    title: 'Comparez les primes dès octobre',
                    desc: 'Dès l\'annonce des primes 2027 (en automne), comparez sur priminfo.ch ou via notre service. Notez les économies potentielles avant de décider.',
                    tip: 'Astuce : comparez à modèle équivalent (standard vs standard) pour une comparaison juste.',
                  },
                  {
                    n: '2',
                    title: 'Vérifiez vos factures en cours',
                    desc: 'Assurez-vous que toutes vos factures médicales de l\'année en cours ont été transmises à votre assureur actuel et remboursées. Les factures en transit peuvent créer des complications.',
                    tip: null,
                  },
                  {
                    n: '3',
                    title: 'Adhérez à la nouvelle caisse',
                    desc: 'Inscrivez-vous en ligne ou par courrier auprès de la nouvelle caisse avant fin novembre. Dans la plupart des cas, elle se charge d\'envoyer la résiliation à votre ancien assureur.',
                    tip: 'Certaines caisses proposent une procédure 100% en ligne en 5 minutes.',
                  },
                  {
                    n: '4',
                    title: 'Envoyez votre lettre de résiliation',
                    desc: 'Si la nouvelle caisse ne le fait pas pour vous, envoyez une lettre recommandée de résiliation à votre ancien assureur avant le 30 novembre. Conservez l\'accusé de réception.',
                    tip: 'Envoyez en lettre recommandée avec avis de réception pour avoir une preuve de la date d\'envoi.',
                  },
                  {
                    n: '5',
                    title: 'Recevez votre nouvelle carte d\'assuré',
                    desc: 'En décembre ou au plus tard début janvier, vous recevrez votre nouvelle carte d\'assurance. Elle prouve votre affiliation dès le 1er janvier.',
                    tip: null,
                  },
                ].map((step) => (
                  <div key={step.n} className="card flex gap-4">
                    <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">
                      {step.n}
                    </span>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{step.desc}</p>
                      {step.tip && (
                        <p className="text-xs text-primary bg-primary-light rounded px-2 py-1 inline-block">
                          💡 {step.tip}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Modèle de lettre */}
            <section>
              <h2 className="text-xl font-bold mb-4">Modèle de lettre de résiliation LAMal</h2>
              <p className="text-gray-600 text-sm mb-4">
                Voici un modèle de lettre recommandée pour résilier votre assurance LAMal de base.
                À envoyer par courrier recommandé avant le 30 novembre.
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 font-mono text-sm leading-relaxed">
                <p className="text-right mb-6 text-gray-600">[Votre prénom et nom]<br />[Votre adresse]<br />[NPA Localité]<br />[Date]</p>
                <p className="mb-4 text-gray-600">[Nom de la caisse maladie]<br />[Adresse de la caisse]<br />[NPA Localité]</p>
                <p className="mb-4"><strong>Objet : Résiliation de mon assurance-maladie de base (LAMal)</strong></p>
                <p className="mb-3">Madame, Monsieur,</p>
                <p className="mb-3">
                  Par la présente, je vous informe de ma décision de résilier mon assurance-maladie
                  de base (LAMal) pour le 31 décembre [année en cours], conformément à l'art. 7 al. 1 LAMal.
                </p>
                <p className="mb-3">
                  <strong>Numéro de police / d'assuré :</strong> [Votre numéro]<br />
                  <strong>Date de naissance :</strong> [JJ.MM.AAAA]
                </p>
                <p className="mb-3">
                  Je vous saurais gré de bien vouloir m'adresser une confirmation écrite de la prise
                  en compte de cette résiliation.
                </p>
                <p className="mb-6">Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.</p>
                <p>[Votre signature]</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Ce modèle est fourni à titre indicatif. Adaptez-le à votre situation.
                En cas de doute, consultez votre caisse maladie ou le service cantonal compétent.
              </p>
            </section>

            {/* Cas particuliers */}
            <section>
              <h2 className="text-xl font-bold mb-4">Cas particuliers</h2>
              <div className="space-y-4">
                {[
                  {
                    title: 'Hausse de prime annoncée',
                    desc: 'Si votre assureur annonce une hausse de prime (généralement en automne), vous disposez d\'un mois supplémentaire pour résilier après la notification, pour un départ au 31 décembre. Lisez attentivement les courriers de votre caisse en octobre-novembre.',
                  },
                  {
                    title: 'Déménagement dans un autre canton',
                    desc: 'Si vous changez de canton, les primes de votre zone de résidence changent. Vous pouvez changer de caisse en cours d\'année dans certaines situations. Contactez votre assureur actuel pour les modalités.',
                  },
                  {
                    title: 'Enfant atteignant 18 ans',
                    desc: 'Un enfant qui passe dans la catégorie "jeune adulte" (18 ans) peut changer de caisse indépendamment. C\'est souvent l\'occasion de renégocier les conditions.',
                  },
                  {
                    title: 'Arrivée en Suisse',
                    desc: 'Vous avez 3 mois pour vous affilier dès votre arrivée en Suisse. La couverture est rétroactive à la date d\'arrivée si vous vous affiliez dans ce délai.',
                  },
                ].map((cas, i) => (
                  <details key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                    <summary className="px-5 py-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 list-none flex justify-between items-center">
                      {cas.title}
                      <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
                      {cas.desc}
                    </div>
                  </details>
                ))}
              </div>
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
