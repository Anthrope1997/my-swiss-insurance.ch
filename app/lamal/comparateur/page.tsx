import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/LeadForm'

export const metadata: Metadata = {
  title: 'Comparateur de caisses maladie LAMal 2026 — Primes par canton',
  description:
    'Comparez les primes LAMal 2026 par canton et par profil. Trouvez la caisse maladie la moins chère selon votre situation. Données officielles OFSP.',
  openGraph: {
    title: 'Comparateur caisses maladie LAMal 2026',
    description: 'Primes LAMal 2026 par canton : comparez et économisez jusqu\'à CHF 1\'200/an.',
    url: 'https://my-swiss-insurance.ch/lamal/comparateur',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Comparateur de caisses maladie LAMal 2026',
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
      name: 'Quelle est la caisse maladie la moins chère en Suisse ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La caisse maladie la moins chère dépend de votre canton de résidence, de votre âge et du modèle d\'assurance choisi. Les primes varient significativement entre cantons. Pour un adulte à Nidwald, on peut trouver des primes autour de CHF 280/mois, contre CHF 530+ à Genève. Utilisez priminfo.ch (site officiel) ou notre formulaire pour une comparaison personnalisée.',
      },
    },
    {
      '@type': 'Question',
      name: 'Les prestations sont-elles les mêmes dans toutes les caisses maladie ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, pour la LAMal de base, les prestations sont strictement identiques chez tous les assureurs agréés par l\'OFSP. Seules les primes, le service client et les options d\'assurances complémentaires (LCA) diffèrent entre caisses.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment économiser sur sa prime LAMal ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Les principales façons d\'économiser sur la LAMal sont : (1) Choisir un modèle alternatif (médecin de famille, HMO ou Telmed) pour réduire la prime de 5 à 25%. (2) Augmenter sa franchise si vous êtes en bonne santé. (3) Changer de caisse chaque année avant le 30 novembre. (4) Vérifier votre droit aux subsides cantonaux.',
      },
    },
  ],
}

// Top assureurs Switzerland (2026, indicatif)
const assureurs = [
  { name: 'Assura', part: '7.2%', note: 'Souvent la moins chère, service en ligne' },
  { name: 'Concordia', part: '6.8%', note: 'Bon service, réseau médecin de famille étendu' },
  { name: 'CSS', part: '14.1%', note: 'Grande caisse, large réseau de soins' },
  { name: 'Helsana', part: '13.5%', note: 'Nombreuses options, application mobile avancée' },
  { name: 'KPT', part: '4.2%', note: 'Compétitive, bonne qualité de service' },
  { name: 'Sanitas', part: '7.9%', note: 'Bonne couverture, fortes en télémédecine' },
  { name: 'SWICA', part: '10.2%', note: 'Leader en médecine intégrative, réseau HMO solide' },
  { name: 'Visana', part: '9.1%', note: 'Forte en Suisse romande et alémanique' },
]

export default function ComparateurPage() {
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
            <span className="text-gray-800">Comparateur</span>
          </nav>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Comparateur de caisses maladie LAMal 2026
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Les primes LAMal varient jusqu'à 85% selon le canton. Comparez et trouvez
            la caisse maladie la moins chère selon votre profil.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">

            {/* CTA comparaison personnalisée */}
            <div className="bg-primary rounded-xl p-6 text-white">
              <h2 className="text-white text-xl font-bold mb-2">
                Comparaison personnalisée gratuite
              </h2>
              <p className="text-blue-100 mb-4 text-sm">
                Les primes ci-dessous sont des moyennes indicatives. Pour connaître exactement
                la prime la moins chère dans votre canton selon votre profil, utilisez notre service.
              </p>
              <a href="#lead-form" className="bg-white text-primary font-bold px-5 py-2.5 rounded-lg hover:bg-blue-50 transition-colors inline-block text-sm">
                Recevoir ma comparaison →
              </a>
            </div>

            {/* Comment comparer */}
            <section>
              <h2 className="text-xl font-bold mb-4">Comment bien comparer les caisses maladie ?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { step: '1', title: 'Votre canton', desc: 'La prime varie selon votre lieu de résidence. Genève est le canton le plus cher, Nidwald le moins cher.' },
                  { step: '2', title: 'Votre franchise', desc: 'Plus la franchise est élevée, plus la prime est basse. Choisissez selon votre état de santé.' },
                  { step: '3', title: 'Votre modèle', desc: 'Médecin de famille, HMO ou Telmed réduisent la prime de 5 à 25% par rapport au modèle standard.' },
                ].map((s) => (
                  <div key={s.step} className="card text-center">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                      {s.step}
                    </div>
                    <h3 className="font-semibold mb-1">{s.title}</h3>
                    <p className="text-gray-500 text-sm">{s.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Écart des primes */}
            <section>
              <h2 className="text-xl font-bold mb-2">Écart de primes : jusqu'à 85% selon le canton</h2>
              <p className="text-gray-600 mb-5 text-sm">
                Primes moyennes indicatives 2026 pour un adulte, modèle standard, franchise 300 CHF (source OFSP).
              </p>
              <div className="space-y-3">
                {[
                  { canton: 'Nidwald (NW)', prime: 308.70, pct: 54 },
                  { canton: 'Obwald (OW)', prime: 312.10, pct: 55 },
                  { canton: 'Uri (UR)', prime: 318.40, pct: 56 },
                  { canton: 'Appenzell Rh.-Int. (AI)', prime: 323.50, pct: 57 },
                  { canton: 'Schwyz (SZ)', prime: 325.60, pct: 57 },
                  { canton: 'Glaris (GL)', prime: 337.50, pct: 59 },
                  { canton: 'Grisons (GR)', prime: 369.40, pct: 65 },
                  { canton: 'Lucerne (LU)', prime: 374.80, pct: 66 },
                  { canton: 'Zurich (ZH)', prime: 455.10, pct: 79 },
                  { canton: 'Vaud (VD)', prime: 520.40, pct: 91 },
                  { canton: 'Bâle-Ville (BS)', prime: 521.60, pct: 91 },
                  { canton: 'Genève (GE)', prime: 572.50, pct: 100 },
                ].map((row) => (
                  <div key={row.canton} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-52 flex-shrink-0">{row.canton}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-5 relative">
                      <div
                        className="bg-primary h-5 rounded-full"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-800 w-20 text-right">
                      CHF {row.prime.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Assureurs */}
            <section>
              <h2 className="text-xl font-bold mb-4">Principaux assureurs LAMal en Suisse (2026)</h2>
              <p className="text-gray-600 text-sm mb-5">
                Il existe 57 caisses maladie agréées par l'OFSP. Voici les principales par part de marché.
                Les primes varient selon le canton — comparez directement pour votre situation.
              </p>
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="table-auto w-full text-sm">
                  <thead>
                    <tr>
                      <th className="bg-primary text-white px-4 py-3 text-left">Assureur</th>
                      <th className="bg-primary text-white px-4 py-3 text-center">Part de marché</th>
                      <th className="bg-primary text-white px-4 py-3 text-left hidden sm:table-cell">Caractéristiques</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assureurs.map((a, i) => (
                      <tr key={a.name} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-2.5 font-semibold text-gray-900">{a.name}</td>
                        <td className="px-4 py-2.5 text-center text-primary font-medium">{a.part}</td>
                        <td className="px-4 py-2.5 text-gray-500 hidden sm:table-cell">{a.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Parts de marché approximatives (assurés LAMal, 2026). Source : OFSP.
              </p>
            </section>

            {/* Économies possibles */}
            <section>
              <h2 className="text-xl font-bold mb-4">Combien peut-on économiser en changeant de caisse ?</h2>
              <p className="text-gray-600 mb-4 text-sm">
                Les économies sont significatives. Voici des ordres de grandeur pour un adulte dans différents
                cantons romands en choisissant la caisse la moins chère vs la plus chère (même modèle, même franchise) :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { canton: 'Genève', ecart_mensuel: '~CHF 120–180', ecart_annuel: '~CHF 1\'440–2\'160' },
                  { canton: 'Vaud', ecart_mensuel: '~CHF 90–130', ecart_annuel: '~CHF 1\'080–1\'560' },
                  { canton: 'Fribourg', ecart_mensuel: '~CHF 70–110', ecart_annuel: '~CHF 840–1\'320' },
                  { canton: 'Berne', ecart_mensuel: '~CHF 60–100', ecart_annuel: '~CHF 720–1\'200' },
                ].map((r) => (
                  <div key={r.canton} className="bg-green-50 border border-green-100 rounded-xl p-4">
                    <div className="font-bold text-gray-900">{r.canton}</div>
                    <div className="text-green-700 font-semibold text-lg">{r.ecart_mensuel}<span className="text-sm font-normal">/mois</span></div>
                    <div className="text-sm text-gray-600">soit {r.ecart_annuel}/an d'économie possible</div>
                  </div>
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
