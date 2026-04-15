import type { Metadata } from 'next'
import AuthorBio from '@/components/AuthorBio'
import Breadcrumb from '@/components/Breadcrumb'
import FAQ from '@/components/FAQ'
import LeadForm from '@/components/LeadForm'
import PrimeCalculatorReal from '@/components/PrimeCalculatorReal'

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

const faqItems = [
  {
    question: 'Quelle est la caisse maladie la moins chère en Suisse ?',
    answer: 'La caisse la moins chère dépend de votre canton, âge et modèle choisi. Pour un adulte avec franchise 300 CHF et modèle standard, les primes débutent à CHF 403/mois à Zoug et atteignent CHF 710/mois à Genève. Les écarts entre caisses dans un même canton atteignent jusqu\'à CHF 229/mois.',
  },
  {
    question: 'Les prestations sont-elles identiques dans toutes les caisses ?',
    answer: "Oui. Pour la LAMal de base, les prestations sont strictement identiques chez tous les assureurs agréés par l'OFSP. Seules les primes, la qualité du service client et les options complémentaires diffèrent.",
  },
  {
    question: 'Comment économiser sur sa prime LAMal ?',
    answer: 'Trois leviers principaux : (1) choisir un modèle alternatif (médecin de famille, HMO, Telmed) pour jusqu\'à −24% selon la caisse et le canton ; (2) augmenter sa franchise si vous êtes en bonne santé ; (3) changer de caisse chaque année avant le 30 novembre.',
  },
]

const premiumBars = [
  { canton: 'Zoug (ZG)',              prime: 403.06, pct: 57 },
  { canton: 'Appenzell Rh.-Int. (AI)',prime: 424.35, pct: 60 },
  { canton: 'Nidwald (NW)',           prime: 459.98, pct: 65 },
  { canton: 'Uri (UR)',               prime: 463.33, pct: 65 },
  { canton: 'Obwald (OW)',            prime: 467.13, pct: 66 },
  { canton: 'Schwyz (SZ)',            prime: 484.88, pct: 68 },
  { canton: 'Saint-Gall (SG)',        prime: 495.59, pct: 70 },
  { canton: 'Glaris (GL)',            prime: 498.01, pct: 70 },
  { canton: 'Lucerne (LU)',           prime: 499.87, pct: 70 },
  { canton: 'Appenzell Rh.-Ext. (AR)',prime: 508.83, pct: 72 },
  { canton: 'Thurgovie (TG)',         prime: 508.64, pct: 72 },
  { canton: 'Grisons (GR)',           prime: 517.47, pct: 73 },
  { canton: 'Fribourg (FR)',          prime: 522.27, pct: 73 },
  { canton: 'Valais (VS)',            prime: 527.58, pct: 74 },
  { canton: 'Argovie (AG)',           prime: 527.98, pct: 74 },
  { canton: 'Zurich (ZH)',            prime: 530.65, pct: 75 },
  { canton: 'Schaffhouse (SH)',       prime: 535.68, pct: 75 },
  { canton: 'Soleure (SO)',           prime: 560.35, pct: 79 },
  { canton: 'Berne (BE)',             prime: 578.26, pct: 81 },
  { canton: 'Bâle-Campagne (BL)',     prime: 625.02, pct: 88 },
  { canton: 'Jura (JU)',              prime: 633.21, pct: 89 },
  { canton: 'Vaud (VD)',              prime: 637.64, pct: 90 },
  { canton: 'Neuchâtel (NE)',         prime: 663.19, pct: 93 },
  { canton: 'Bâle-Ville (BS)',        prime: 668.40, pct: 94 },
  { canton: 'Tessin (TI)',            prime: 686.10, pct: 97 },
  { canton: 'Genève (GE)',            prime: 710.41, pct: 100 },
]

const assureurs = [
  { name: 'SWICA', part: '20.5%', note: 'Leader en médecine intégrative' },
  { name: 'Helsana', part: '18.0%', note: 'Application mobile avancée, nombreuses options' },
  { name: 'Groupe Mutuel', part: '12.8%', note: 'Très présent en Suisse romande' },
  { name: 'CSS', part: '12.1%', note: 'Large réseau, forte présence nationale' },
  { name: 'Visana', part: '12.0%', note: 'Forte présence Suisse romande et alémanique' },
  { name: 'Sanitas', part: '6.8%', note: 'Forte en télémédecine et digital' },
  { name: 'Concordia', part: '5.0%', note: 'Bon service, réseau médecin de famille étendu' },
  { name: 'Assura', part: '3.1%', note: 'Souvent la moins chère, service digital' },
]

export default function ComparateurPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <section className="bg-white border-b border-edge pt-12 pb-10">
        <div className="container-xl">
          <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'LAMal', href: '/lamal' }, { label: 'Comparer les caisses 2026' }]} />
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
        <AuthorBio publishedDate="1er janvier 2026" updatedDate="13 avril 2026" />
        <div className="flex gap-12">
          <div className="flex-1 min-w-0 space-y-16">

            {/* Calculateur de primes interactif */}
            <section>
              <h2 className="text-2xl font-semibold text-ink mb-2">
                Calculateur de primes 2026
              </h2>
              <p className="text-[16px] text-slate mb-6">
                Entrez votre code postal pour comparer toutes les caisses maladie selon votre profil.
                Données officielles OFSP, mises à jour pour 2026.
              </p>
              <PrimeCalculatorReal />
            </section>

            {/* 3 étapes */}
            <section>
              <h2 className="text-2xl font-semibold text-ink mb-8">Comment bien comparer</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {[
                  { n: '01', t: 'Votre canton', d: 'La prime varie selon le lieu de résidence. Genève est le canton le plus cher, Nidwald le moins cher.' },
                  { n: '02', t: 'Votre franchise', d: 'Plus la franchise est élevée, plus la prime est basse. À choisir selon votre état de santé.' },
                  { n: '03', t: 'Votre modèle', d: 'Médecin de famille, HMO ou Telmed peuvent réduire la prime jusqu\'à −24% vs le modèle standard.' },
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
                8 plus grands groupes · parts de marché assurance complémentaire (FINMA 2024). Les primes LAMal varient par canton — comparez pour votre situation exacte.
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
              <h2 className="text-2xl font-semibold text-ink mb-2">
                Économies possibles en changeant de caisse
              </h2>
              <p className="text-[13px] text-slate mb-6">Adulte ~35 ans · modèle standard · franchise CHF 300 · écart max−min dans la même région OFSP.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { canton: 'Genève',    mensuel: 'CHF 229', annuel: "CHF 2'753" },
                  { canton: 'Neuchâtel', mensuel: 'CHF 146', annuel: "CHF 1'747" },
                  { canton: 'Valais',    mensuel: 'CHF 120', annuel: "CHF 1'445" },
                  { canton: 'Vaud',      mensuel: 'CHF 112', annuel: "CHF 1'347" },
                ].map((r) => (
                  <div key={r.canton} className="bg-cloud border border-edge rounded-[8px] p-5">
                    <p className="font-semibold text-ink mb-1">{r.canton}</p>
                    <p className="text-2xl font-bold text-[#1d4ed8]">{r.annuel}<span className="text-[14px] font-normal text-slate">/an</span></p>
                    <p className="text-[14px] text-slate mt-0.5">soit {r.mensuel}/mois d'économie</p>
                  </div>
                ))}
              </div>
            </section>

            <FAQ items={faqItems} />
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
