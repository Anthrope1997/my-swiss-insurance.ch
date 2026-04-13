import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/LeadForm'

export const metadata: Metadata = {
  title: 'Changer de caisse maladie en Suisse — Guide résiliation LAMal 2026',
  description:
    'Comment changer de caisse maladie : délais, procédure, modèle de lettre de résiliation. Date limite 30 novembre. Guide complet 2026.',
  openGraph: {
    title: 'Changer de caisse maladie — Résiliation LAMal 2026',
    description: 'Procédure complète pour changer d\'assureur LAMal : dates, étapes et modèle de lettre.',
    url: 'https://my-swiss-insurance.ch/lamal/changer-de-caisse',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Changer de caisse maladie LAMal en Suisse — Guide 2026',
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
      name: "Quelle est la date limite pour changer de caisse maladie ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Pour changer au 1er janvier, vous devez résilier votre contrat par courrier recommandé avant le 30 novembre. Si votre assureur annonce une hausse de prime, vous disposez d'un mois supplémentaire après la notification.",
      },
    },
    {
      '@type': 'Question',
      name: "La nouvelle caisse peut-elle refuser de m'accepter ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. Pour la LAMal de base, les caisses ont l'obligation légale d'accepter tout résident en Suisse, sans sélection médicale. En revanche, pour les assurances complémentaires LCA, un refus est possible.",
      },
    },
    {
      '@type': 'Question',
      name: "Que se passe-t-il si j'oublie de résilier avant le 30 novembre ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Votre contrat est automatiquement reconduit pour l'année suivante. Vous ne pourrez changer qu'au 1er janvier de l'année d'après, sauf si votre assureur annonce une hausse de prime en cours d'année.",
      },
    },
  ],
}

export default function ChangerDeCaissePage() {
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
            <span className="text-ink">Changer de caisse</span>
          </nav>
          <h1 className="text-5xl font-bold text-ink leading-tight mb-4 max-w-2xl">
            Comment changer de caisse maladie en Suisse.
          </h1>
          <p className="text-xl text-slate max-w-2xl leading-relaxed">
            Procédure complète, dates clés et modèle de lettre pour changer d'assureur
            sans erreur. Économisez jusqu'à CHF 2'000/an.
          </p>
        </div>
      </section>

      <div className="container-xl py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-14">

            {/* Dates clés */}
            <div className="callout-warning">
              <p className="font-semibold text-amber-900 mb-4 text-[17px]">Dates clés 2026 / 2027</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { date: '30 novembre 2026', desc: 'Date limite de résiliation ordinaire pour changer au 1er janvier 2027' },
                  { date: 'Octobre–novembre', desc: 'Annonce des nouvelles primes par les assureurs — vérifiez si votre prime augmente' },
                  { date: '1er janvier 2027', desc: 'Prise d\'effet du nouveau contrat si résiliation dans les délais' },
                ].map((item) => (
                  <div key={item.date} className="bg-white border border-amber-100 rounded-[6px] p-4">
                    <p className="text-[12px] font-semibold text-amber-700 uppercase tracking-wide mb-1">{item.date}</p>
                    <p className="text-[14px] text-slate">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tableau délais */}
            <section>
              <h2 className="text-2xl font-semibold text-ink mb-6">Délais et situations</h2>
              <div className="border border-edge rounded-[8px] overflow-hidden">
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
                      ['Hausse de prime annoncée', '1 mois après notification', '31 décembre'],
                      ['Changement de canton', 'Dès l\'effectivité', 'Selon accord assureur'],
                      ['Changement de franchise', '30 novembre', '1er janvier'],
                    ].map((row, i) => (
                      <tr key={i}>
                        <td className="font-medium text-ink">{row[0]}</td>
                        <td>{row[1]}</td>
                        <td>{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Étapes */}
            <section>
              <h2 className="text-2xl font-semibold text-ink mb-8">Les 5 étapes pour changer</h2>
              <div className="space-y-6">
                {[
                  {
                    n: '01', title: 'Comparez les primes dès octobre',
                    desc: 'Dès l\'annonce des nouvelles primes (automne), comparez sur priminfo.ch ou via notre service. Notez les économies potentielles.',
                    tip: 'Comparez à modèle équivalent (standard vs standard) pour une comparaison juste.',
                  },
                  {
                    n: '02', title: 'Vérifiez vos factures en cours',
                    desc: 'Assurez-vous que toutes les factures médicales de l\'année ont été transmises et remboursées par votre assureur actuel.',
                    tip: null,
                  },
                  {
                    n: '03', title: 'Adhérez à la nouvelle caisse',
                    desc: 'Inscrivez-vous auprès de la nouvelle caisse avant fin novembre. Dans la plupart des cas, elle se charge d\'envoyer la résiliation à votre place.',
                    tip: 'Certaines caisses permettent l\'inscription 100% en ligne en 5 minutes.',
                  },
                  {
                    n: '04', title: 'Envoyez la lettre de résiliation',
                    desc: 'Si la nouvelle caisse ne le fait pas pour vous, envoyez une lettre recommandée à votre ancien assureur avant le 30 novembre.',
                    tip: 'Lettre recommandée avec avis de réception — indispensable comme preuve.',
                  },
                  {
                    n: '05', title: 'Recevez votre nouvelle carte d\'assuré',
                    desc: 'En décembre ou début janvier, vous recevrez votre nouvelle carte d\'assurance, valide dès le 1er janvier.',
                    tip: null,
                  },
                ].map((step) => (
                  <div key={step.n} className="flex gap-5">
                    <div className="text-[28px] font-bold text-edge leading-none shrink-0 w-12 text-right">
                      {step.n}
                    </div>
                    <div className="pt-1">
                      <h3 className="font-semibold text-ink text-[17px] mb-1">{step.title}</h3>
                      <p className="text-[15px] text-slate mb-2">{step.desc}</p>
                      {step.tip && (
                        <p className="text-[13px] text-brand bg-cloud border border-edge rounded-md px-3 py-1.5 inline-block">
                          💡 {step.tip}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Modèle lettre */}
            <section>
              <h2 className="text-2xl font-semibold text-ink mb-4">Modèle de lettre de résiliation</h2>
              <p className="text-[15px] text-slate mb-5">
                À envoyer par courrier recommandé avant le 30 novembre. Adaptez les champs entre crochets.
              </p>
              <div className="bg-cloud border border-edge rounded-[8px] p-7 font-mono text-[14px] leading-relaxed text-slate">
                <p className="text-right mb-6">
                  [Prénom Nom]<br />
                  [Adresse]<br />
                  [NPA Localité]<br />
                  [Date]
                </p>
                <p className="mb-5">
                  [Nom de la caisse maladie]<br />
                  [Adresse]<br />
                  [NPA Localité]
                </p>
                <p className="mb-4 font-semibold text-ink">
                  Objet : Résiliation de mon assurance-maladie de base (LAMal)
                </p>
                <p className="mb-3">Madame, Monsieur,</p>
                <p className="mb-3">
                  Par la présente, je résilie mon assurance-maladie de base (LAMal) pour
                  le 31 décembre [année en cours], conformément à l'art. 7 al. 1 LAMal.
                </p>
                <p className="mb-3">
                  <strong className="text-ink">Numéro d'assuré :</strong> [Votre numéro]<br />
                  <strong className="text-ink">Date de naissance :</strong> [JJ.MM.AAAA]
                </p>
                <p className="mb-5">
                  Je vous saurais gré de bien vouloir me confirmer la prise en compte de cette résiliation.
                </p>
                <p className="mb-1">Meilleures salutations,</p>
                <p>[Votre signature]</p>
              </div>
              <p className="text-[13px] text-slate/60 mt-3">
                Modèle indicatif. En cas de doute, consultez votre caisse ou le service cantonal compétent.
              </p>
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
