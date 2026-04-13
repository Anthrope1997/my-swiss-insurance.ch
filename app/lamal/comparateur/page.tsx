import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/LeadForm'

export const metadata: Metadata = {
  title: 'Comparateur caisses maladie LAMal 2026 — Primes par canton',
  description:
    'Comparez les primes LAMal 2026 par canton. Trouvez la caisse maladie la moins chère selon votre profil. Données officielles OFSP.',
  openGraph: {
    title: 'Comparateur caisses maladie LAMal 2026',
    description: 'Primes LAMal 2026 par canton : comparez et économisez jusqu\'à CHF 2\'000/an.',
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
        text: 'La caisse la moins chère dépend de votre canton, âge et modèle choisi. Pour un adulte à Nidwald, les primes débutent autour de CHF 280/mois. À Genève, elles dépassent CHF 530. Les écarts entre caisses dans un même canton atteignent CHF 100–180/mois.',
      },
    },
    {
      '@type': 'Question',
      name: 'Les prestations sont-elles identiques dans toutes les caisses ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Pour la LAMal de base, les prestations sont strictement identiques chez tous les assureurs agréés par l\'OFSP. Seules les primes, la qualité du service client et les options complémentaires diffèrent.',
      },
    },
    {
      '@type': 'Question',
      name: 'Comment économiser sur sa prime LAMal ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Trois leviers principaux : (1) choisir un modèle alternatif (médecin de famille, HMO, Telmed) pour −5 à −25% ; (2) augmenter sa franchise si vous êtes en bonne santé ; (3) changer de caisse chaque année avant le 30 novembre.',
      },
    },
  ],
}

const premiumBars = [
  { canton: 'Nidwald (NW)', prime: 308.70, pct: 54 },
  { canton: 'Obwald (OW)', prime: 312.10, pct: 55 },
  { canton: 'Uri (UR)', prime: 318.40, pct: 56 },
  { canton: 'Schwyz (SZ)', prime: 325.60, pct: 57 },
  { canton: 'Glaris (GL)', prime: 337.50, pct: 59 },
  { canton: 'Zoug (ZG)', prime: 356.20, pct: 62 },
  { canton: 'Lucerne (LU)', prime: 374.80, pct: 65 },
  { canton: 'Berne (BE)', prime: 426.90, pct: 75 },
  { canton: 'Argovie (AG)', prime: 399.60, pct: 70 },
  { canton: 'Valais (VS)', prime: 408.90, pct: 71 },
  { canton: 'Fribourg (FR)', prime: 449.80, pct: 79 },
  { canton: 'Zurich (ZH)', prime: 455.10, pct: 80 },
  { canton: 'Jura (JU)', prime: 459.30, pct: 80 },
  { canton: 'Neuchâtel (NE)', prime: 482.70, pct: 84 },
  { canton: 'Tessin (TI)', prime: 491.30, pct: 86 },
  { canton: 'Vaud (VD)', prime: 520.40, pct: 91 },
  { canton: 'Bâle-Ville (BS)', prime: 521.60, pct: 91 },
  { canton: 'Genève (GE)', prime: 572.50, pct: 100 },
]

const assureurs = [
  { name: 'Assura', part: '7.2%', note: 'Souvent la moins chère, service digital' },
  { name: 'Concordia', part: '6.8%', note: 'Bon service, réseau médecin de famille étendu' },
  { name: 'CSS', part: '14.1%', note: 'Plus grande caisse suisse, large réseau' },
  { name: 'Helsana', part: '13.5%', note: 'Application mobile avancée, nombreuses options' },
  { name: 'KPT', part: '4.2%', note: 'Compétitive, bonne qualité de service' },
  { name: 'Sanitas', part: '7.9%', note: 'Forte en télémédecine et digital' },
  { name: 'SWICA', part: '10.2%', note: 'Leader en médecine intégrative' },
  { name: 'Visana', part: '9.1%', note: 'Forte présence Suisse romande et alémanique' },
]

export default function ComparateurPage() {
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
            <span className="text-ink">Comparer les caisses 2026</span>
          </nav>
          <h1 className="text-5xl font-bold text-ink leading-tight mb-4 max-w-2xl">
            Comparateur de caisses maladie 2026.
          </h1>
          <p className="text-xl text-slate max-w-2xl leading-relaxed">
            Les primes LAMal varient jusqu'à 85% selon le canton.
            Identifiez les économies possibles pour votre profil.
          </p>
        </div>
      </section>

      <div className="container-xl py-16">
        <div className="flex gap-12">
          <div className="flex-1 min-w-0 space-y-16">

            {/* CTA personnalisé */}
            <div className="bg-cloud border border-edge rounded-[8px] p-8">
              <h2 className="text-2xl font-semibold text-ink mb-2">
                Comparaison personnalisée gratuite
              </h2>
              <p className="text-[16px] text-slate mb-5">
                Les données ci-dessous sont des moyennes cantonales. Pour connaître exactement
                la prime la moins chère selon votre profil, utilisez notre service.
              </p>
              <a href="#lead-form" className="btn-primary">Recevoir ma comparaison →</a>
            </div>

            {/* 3 étapes */}
            <section>
              <h2 className="text-2xl font-semibold text-ink mb-8">Comment bien comparer</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {[
                  { n: '01', t: 'Votre canton', d: 'La prime varie selon le lieu de résidence. Genève est le canton le plus cher, Nidwald le moins cher.' },
                  { n: '02', t: 'Votre franchise', d: 'Plus la franchise est élevée, plus la prime est basse. À choisir selon votre état de santé.' },
                  { n: '03', t: 'Votre modèle', d: 'Médecin de famille, HMO ou Telmed réduisent la prime de 5 à 25% vs le modèle standard.' },
                ].map((s) => (
                  <div key={s.n}>
                    <div className="text-[36px] font-bold text-[#1d4ed8] mb-3 leading-none">{s.n}</div>
                    <h3 className="font-semibold text-ink text-[17px] mb-2">{s.t}</h3>
                    <p className="text-[15px] text-slate leading-relaxed">{s.d}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Barres de primes */}
            <section>
              <h2 className="text-2xl font-semibold text-ink mb-2">
                Primes moyennes 2026 par canton
              </h2>
              <p className="text-[15px] text-slate mb-8">
                Adulte 26 ans+, modèle standard, franchise 300 CHF. Source : OFSP.
              </p>
              <div className="space-y-3">
                {premiumBars.map((row) => (
                  <div key={row.canton} className="flex items-center gap-4">
                    <span className="text-[14px] text-slate w-44 shrink-0">{row.canton}</span>
                    <div className="flex-1 bg-cloud rounded-full h-4 overflow-hidden">
                      <div
                        className="bg-brand h-4 rounded-full transition-all"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                    <span className="text-[14px] font-semibold text-ink w-22 text-right shrink-0">
                      CHF {row.prime.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Assureurs */}
            <section>
              <h2 className="text-2xl font-semibold text-ink mb-2">
                Principaux assureurs LAMal en Suisse
              </h2>
              <p className="text-[15px] text-slate mb-6">
                57 caisses agréées au total. Les primes varient par canton — comparez pour votre situation.
              </p>
              <div className="border border-edge rounded-[8px] overflow-hidden">
                <table className="stripe-table w-full">
                  <thead>
                    <tr>
                      <th>Assureur</th>
                      <th className="text-center">Part de marché</th>
                      <th className="hidden sm:table-cell">Caractéristiques</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assureurs.map((a) => (
                      <tr key={a.name}>
                        <td className="font-semibold text-ink">{a.name}</td>
                        <td className="text-center font-medium text-brand">{a.part}</td>
                        <td className="hidden sm:table-cell">{a.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Économies */}
            <section>
              <h2 className="text-2xl font-semibold text-ink mb-6">
                Économies possibles en changeant de caisse
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { canton: 'Genève', mensuel: '~CHF 120–180', annuel: '~CHF 1\'440–2\'160' },
                  { canton: 'Vaud', mensuel: '~CHF 90–130', annuel: '~CHF 1\'080–1\'560' },
                  { canton: 'Fribourg', mensuel: '~CHF 70–110', annuel: '~CHF 840–1\'320' },
                  { canton: 'Berne', mensuel: '~CHF 60–100', annuel: '~CHF 720–1\'200' },
                ].map((r) => (
                  <div key={r.canton} className="bg-cloud border border-edge rounded-[8px] p-5">
                    <p className="font-semibold text-ink mb-1">{r.canton}</p>
                    <p className="text-2xl font-bold text-[#1d4ed8]">{r.mensuel}<span className="text-[14px] font-normal text-slate">/mois</span></p>
                    <p className="text-[14px] text-slate mt-0.5">soit {r.annuel}/an d'économie</p>
                  </div>
                ))}
              </div>
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
