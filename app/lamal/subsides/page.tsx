import type { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumb'
import SubsidesCalculator from '@/components/SubsidesCalculator'
import LeadForm from '@/components/LeadForm'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Calculateur de subsides LAMal 2026 — Cantons romands',
  description:
    'Estimez gratuitement votre subside d\'assurance maladie LAMal 2026 selon votre canton (GE, VD, NE, FR, JU, VS), votre revenu et votre situation familiale. Données officielles cantonales.',
  openGraph: {
    title: 'Calculateur de subsides LAMal 2026 — Cantons romands',
    description: 'Estimez votre subside LAMal en quelques clics. Données 2026 pour Genève, Vaud, Neuchâtel, Fribourg, Jura et Valais.',
    url: 'https://my-swiss-insurance.ch/lamal/subsides',
    type: 'article',
  },
}

const faqItems = [
  {
    q: 'Qu\'est-ce qu\'un subside LAMal ?',
    a: 'Le subside (ou réduction de primes) est une aide financière cantonale qui réduit le montant de votre prime d\'assurance maladie de base. Il est versé directement à votre caisse-maladie.',
  },
  {
    q: 'Comment est calculé le revenu déterminant ?',
    a: 'Il se base sur votre revenu net fiscal (déclaration d\'impôts), ajusté selon les règles cantonales : déductions pour enfants, prise en compte partielle de la fortune, etc. En cas de doute, utilisez votre revenu imposable.',
  },
  {
    q: 'Dois-je faire une demande chaque année ?',
    a: 'Dans la plupart des cantons romands (GE, NE, VS), le subside est attribué automatiquement après votre taxation fiscale. À Vaud et Fribourg, une demande initiale est nécessaire, puis le renouvellement est automatique.',
  },
  {
    q: 'Le subside couvre-t-il les assurances complémentaires ?',
    a: 'Non. Le subside s\'applique uniquement à la prime d\'assurance maladie de base (LAMal obligatoire). Les assurances complémentaires (LCA) ne sont pas concernées.',
  },
  {
    q: 'Pourquoi les montants varient-ils selon les cantons ?',
    a: 'Chaque canton fixe librement ses barèmes, ses seuils de revenus et ses montants dans le cadre de la loi fédérale. La Confédération finance 7,5% des coûts de base, les cantons complètent.',
  },
]

export default function PageSubsides() {
  return (
    <main className="min-h-screen bg-white">

      <Breadcrumb items={[
        { label: 'Accueil', href: '/' },
        { label: 'LAMal', href: '/lamal' },
        { label: 'Calculateur de subsides' },
      ]} />

      {/* Hero */}
      <section className="bg-cloud border-b border-edge py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-brand uppercase tracking-wide mb-2">Subsides LAMal 2026</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-ink mb-4 leading-tight">
            Calculez votre réduction de primes
          </h1>
          <p className="text-lg text-slate leading-relaxed">
            Estimez en 30 secondes le montant de votre subside cantonal pour 2026. Données officielles pour les
            6 cantons romands : Genève, Vaud, Neuchâtel, Fribourg, Jura et Valais.
          </p>
        </div>
      </section>

      {/* Calculateur */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <SubsidesCalculator />
      </section>

      {/* Info bloc */}
      <section className="bg-cloud border-y border-edge py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-ink mb-6">Comment ça marche</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                title: 'Sélectionnez votre canton',
                text: 'Chaque canton romand a ses propres barèmes. Choisissez celui où vous êtes domicilié.',
              },
              {
                step: '2',
                title: 'Renseignez votre situation',
                text: 'Situation familiale, nombre d\'enfants, âge et revenu déterminant annuel.',
              },
              {
                step: '3',
                title: 'Obtenez une estimation',
                text: 'Le calculateur applique les barèmes officiels 2026 et affiche le subside mensuel estimé.',
              },
            ].map(({ step, title, text }) => (
              <div key={step} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand text-white text-sm font-bold flex items-center justify-center">
                  {step}
                </div>
                <div>
                  <p className="font-semibold text-ink text-sm mb-1">{title}</p>
                  <p className="text-sm text-slate leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tableau récapitulatif cantons */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold text-ink mb-6">Subsides par canton — résumé 2026</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-cloud">
                <th className="text-left px-4 py-3 border border-edge font-semibold text-ink">Canton</th>
                <th className="text-left px-4 py-3 border border-edge font-semibold text-ink">Plafond revenu (seul)</th>
                <th className="text-left px-4 py-3 border border-edge font-semibold text-ink">Attribution</th>
                <th className="text-left px-4 py-3 border border-edge font-semibold text-ink">Délai demande</th>
              </tr>
            </thead>
            <tbody>
              {[
                { c: 'GE', plafond: '~50\'000 CHF', mode: 'Automatique', delai: '—' },
                { c: 'VD', plafond: '69\'000 CHF', mode: 'Sur demande', delai: 'Délais prolongés 2026' },
                { c: 'NE', plafond: '65\'089 CHF', mode: 'Automatique (dès 26 ans)', delai: '30 j. après taxation' },
                { c: 'FR', plafond: '37\'000 CHF', mode: 'Automatique (examen)', delai: '31 août' },
                { c: 'JU', plafond: '27\'000 CHF', mode: 'Automatique / sur demande', delai: '31 déc. 2026' },
                { c: 'VS', plafond: '38\'500 CHF', mode: 'Automatique / sur demande', delai: '31 déc.' },
              ].map(row => (
                <tr key={row.c} className="hover:bg-cloud/50">
                  <td className="px-4 py-3 border border-edge font-medium text-ink">{row.c}</td>
                  <td className="px-4 py-3 border border-edge text-slate">{row.plafond}</td>
                  <td className="px-4 py-3 border border-edge text-slate">{row.mode}</td>
                  <td className="px-4 py-3 border border-edge text-slate">{row.delai}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate mt-3">
          * Plafond revenu pour personne seule sans enfant. Les seuils augmentent avec la taille du ménage.
        </p>
      </section>

      {/* FAQ */}
      <section className="bg-cloud border-y border-edge py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-ink mb-8">Questions fréquentes</h2>
          <div className="space-y-6">
            {faqItems.map(({ q, a }) => (
              <div key={q}>
                <p className="font-semibold text-ink mb-2">{q}</p>
                <p className="text-slate text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-cloud rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold text-ink mb-3">
            Comparez aussi vos primes LAMal
          </h2>
          <p className="text-slate text-sm mb-6">
            Un subside réduit votre prime, mais choisir la bonne caisse peut vous faire économiser encore plus.
            Comparez gratuitement les primes de votre canton.
          </p>
          <Link href="/lamal/comparateur" className="btn-primary">
            Comparer les primes →
          </Link>
        </div>
        <div className="mt-8">
          <LeadForm />
        </div>
      </section>

    </main>
  )
}
