import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/LeadForm'

export const metadata: Metadata = {
  title: 'Comparez votre assurance maladie LAMal en Suisse — My Swiss Insurance',
  description:
    'Trouvez la meilleure caisse maladie suisse selon votre canton, votre profil et votre franchise. Comparaison gratuite LAMal 2026. Économisez jusqu\'à CHF 1\'200/an.',
  openGraph: {
    title: 'Comparez votre assurance maladie LAMal en Suisse',
    description:
      'Trouvez la meilleure caisse maladie selon votre canton et votre profil. Comparaison gratuite LAMal 2026.',
    url: 'https://my-swiss-insurance.ch',
    type: 'website',
  },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "L'assurance maladie est-elle obligatoire en Suisse ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, la LAMal (loi fédérale sur l'assurance-maladie) rend l'assurance maladie de base obligatoire pour toute personne résidant en Suisse. L'affiliation doit intervenir dans les 3 mois suivant l'arrivée ou la naissance.",
      },
    },
    {
      '@type': 'Question',
      name: 'Comment choisir sa caisse maladie en Suisse ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Pour choisir votre caisse maladie suisse, comparez les primes selon votre canton de résidence, choisissez votre franchise (300 à 2500 CHF) et votre modèle d'assurance (standard, médecin de famille, HMO ou Telmed). Les prestations de base sont identiques chez tous les assureurs.",
      },
    },
    {
      '@type': 'Question',
      name: 'Combien coûte la LAMal en Suisse en 2026 ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La prime LAMal moyenne en Suisse est de CHF 378.70/mois pour un adulte en 2026 (franchise standard 300 CHF). Elle varie fortement par canton : de CHF 308 à Nidwald jusqu\'à CHF 572 à Genève. Source : OFSP 2026.',
      },
    },
  ],
}

const features = [
  {
    icon: '🏥',
    title: 'LAMal expliquée',
    desc: 'Guide complet sur la loi, les franchises, les modèles et les subsides.',
    href: '/lamal/guide',
  },
  {
    icon: '⚖️',
    title: 'Comparateur de caisses',
    desc: 'Comparez les primes 2026 par canton et trouvez la moins chère.',
    href: '/lamal/comparateur',
  },
  {
    icon: '🔄',
    title: 'Changer de caisse',
    desc: 'Dates limites, procédure de résiliation et conseils pratiques.',
    href: '/lamal/changer-de-caisse',
  },
  {
    icon: '👤',
    title: 'Par profil',
    desc: 'Famille, étudiant, expatrié, retraité : la LAMal adaptée à votre situation.',
    href: '/lamal/par-profil',
  },
]

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-white/20 text-white text-sm font-medium px-3 py-1 rounded-full mb-4">
                LAMal 2026 · Suisse romande
              </span>
              <h1 className="text-white text-4xl sm:text-5xl font-bold leading-tight mb-5">
                Économisez sur votre assurance maladie suisse
              </h1>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                Comparez les caisses LAMal par canton, choisissez la bonne franchise
                et économisez jusqu'à <strong className="text-white">CHF 1'200 par an</strong>.
                Service gratuit, sans engagement.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#lead-form" className="bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors text-center">
                  Comparer gratuitement
                </a>
                <Link href="/lamal/guide" className="border border-white/40 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors text-center">
                  Lire le guide LAMal →
                </Link>
              </div>
              <p className="text-blue-200 text-sm mt-4">
                ✓ Sans inscription &nbsp;·&nbsp; ✓ Données sécurisées &nbsp;·&nbsp; ✓ Réponse sous 24h
              </p>
            </div>
            <div className="lg:block">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-gray-50 border-b border-gray-100 py-5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <span>📋 Conforme LAMal 2026</span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span>🔒 Données protégées</span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span>📞 Conseillers certifiés</span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span>🇨🇭 Service suisse romand</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-center mb-2">Tout ce qu'il faut savoir sur la LAMal</h2>
        <p className="text-center text-gray-500 mb-10">
          Informations à jour, basées sur les données officielles de l'OFSP.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="card hover:border-primary hover:shadow-md transition-all group"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                {f.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary-light py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 'CHF 378', label: 'Prime moyenne mensuelle 2026', sub: 'adulte, franchise 300 CHF' },
              { value: '57', label: 'Caisses maladie', sub: 'agréées en Suisse' },
              { value: '25%', label: 'De la population', sub: 'bénéficie de subsides' },
              { value: 'CHF 700', label: 'Quote-part maximale', sub: 'par année (adultes)' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm font-semibold text-gray-700">{stat.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">
            Sources : OFSP — Office fédéral de la santé publique, données 2026.
          </p>
        </div>
      </section>

      {/* LAMal overview */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="mb-4">La LAMal en bref</h2>
            <p className="text-gray-600 mb-4">
              La <strong>loi fédérale sur l'assurance-maladie (LAMal)</strong>, en vigueur depuis le
              1er janvier 1996, impose une assurance maladie de base à toute personne résidant en Suisse.
              Les prestations de base sont standardisées et identiques chez tous les assureurs agréés.
            </p>
            <p className="text-gray-600 mb-6">
              En revanche, les <strong>primes varient selon le canton, l'âge et le modèle d'assurance</strong> choisi.
              Bien choisir sa caisse et sa franchise peut représenter une économie de plusieurs centaines
              de francs par année.
            </p>
            <Link
              href="/lamal/guide"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              Lire le guide complet LAMal 2026 →
            </Link>
          </div>

          <div className="space-y-4">
            {[
              { title: 'Franchise', desc: 'De 300 à 2500 CHF/an. Une franchise élevée = une prime mensuelle réduite. Idéal si vous êtes en bonne santé.' },
              { title: 'Quote-part', desc: 'Après la franchise, vous payez 10% des frais médicaux, jusqu\'à CHF 700/an pour les adultes.' },
              { title: 'Modèle d\'assurance', desc: '4 modèles disponibles : Standard, Médecin de famille, HMO, Telmed. Les modèles alternatifs réduisent la prime de 5 à 25%.' },
              { title: 'Subsides', desc: 'Environ 25% des résidents bénéficient d\'une réduction de prime versée par les cantons, selon les revenus.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-gray-900">{item.title} : </span>
                  <span className="text-gray-600 text-sm">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gray-900 text-white py-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-white mb-3">Prêt à économiser sur votre LAMal ?</h2>
          <p className="text-gray-300 mb-8">
            Remplissez le formulaire et recevez une comparaison personnalisée sous 24h.
            Gratuit, sans engagement.
          </p>
          <a href="#lead-form" className="bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-xl transition-colors inline-block">
            Comparer gratuitement →
          </a>
        </div>
      </section>
    </>
  )
}
