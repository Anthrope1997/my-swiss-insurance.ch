import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/LeadForm'

export const metadata: Metadata = {
  title: 'LAMal par profil : famille, étudiant, expatrié, retraité — Conseils 2026',
  description:
    'Conseils LAMal personnalisés par profil : famille avec enfants, étudiant, expatrié, retraité, indépendant. Franchise et modèle optimaux selon votre situation 2026.',
  openGraph: {
    title: 'LAMal par profil — Conseils famille, étudiant, expatrié, retraité 2026',
    description: 'Quelle LAMal choisir selon votre profil ? Guide personnalisé par situation de vie.',
    url: 'https://my-swiss-insurance.ch/lamal/par-profil',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'LAMal par profil : conseils personnalisés famille, étudiant, expatrié et retraité',
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
      name: "Comment assurer sa famille en Suisse avec la LAMal ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Chaque membre de la famille doit avoir sa propre assurance LAMal individuelle — il n'y a pas d'assurance familiale groupée en Suisse. Pour les enfants (0–18 ans), la prime est nettement plus basse (environ CHF 100–130/mois) et la franchise peut être réduite à 0 CHF. Les jeunes adultes de 19 à 25 ans ont aussi une catégorie tarifaire inférieure. Comparez les caisses séparément pour chaque membre.",
      },
    },
    {
      '@type': 'Question',
      name: "Un étudiant étranger doit-il s'affilier à la LAMal en Suisse ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, tout étudiant résidant en Suisse doit s'affilier à la LAMal dans les 3 mois suivant son arrivée. Les étudiants des universités cantonales peuvent parfois demander une exemption temporaire (maximum 6 ans) s'ils disposent d'une assurance équivalente dans leur pays d'origine — cette demande doit être faite auprès des autorités cantonales. Source : art. 3 LAMal.",
      },
    },
    {
      '@type': 'Question',
      name: "Quel est le coût de la LAMal pour un retraité en Suisse ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Pour les retraités (65 ans et plus en général), la prime LAMal est identique à celle des adultes de 26 ans et plus — il n'y a pas de réduction d'âge pour les seniors. En revanche, les retraités à revenus modestes peuvent bénéficier des subsides cantonaux. La franchise de 300 CHF est généralement recommandée car les retraités ont plus souvent des frais médicaux réguliers.",
      },
    },
  ],
}

const profiles = [
  {
    id: 'famille',
    emoji: '👨‍👩‍👧‍👦',
    title: 'Famille avec enfants',
    subtitle: 'Couples avec enfants',
    franchise: 'Franchise 300 CHF recommandée',
    modele: 'Médecin de famille ou HMO',
    intro: 'En Suisse, chaque membre de la famille doit avoir sa propre assurance LAMal individuelle — il n\'existe pas d\'assurance familiale groupée. La prime enfant (0–18 ans) est nettement inférieure à la prime adulte.',
    conseils: [
      { title: 'Enfants : franchise à 0 ou 100 CHF', desc: 'Les enfants tombent souvent malades. Choisissez une franchise basse (0 CHF) pour couvrir les consultations pédiatriques sans reste à charge.' },
      { title: 'Parents : modèle médecin de famille', desc: 'Pour les adultes, le modèle "médecin de famille" réduit la prime de 5 à 15% tout en maintenant une bonne qualité de soins.' },
      { title: 'Jeunes adultes (19–25 ans)', desc: 'Les enfants de 19 à 25 ans ont une catégorie tarifaire réduite. Comparez séparément pour cette tranche d\'âge.' },
      { title: 'Comparer caisse par caisse', desc: 'Comparez chaque contrat individuellement — la caisse la moins chère pour vous ne l\'est pas forcément pour vos enfants.' },
    ],
    primes: [
      { profil: 'Enfant (0–18 ans)', fourchette: 'CHF 95–135/mois' },
      { profil: 'Jeune adulte (19–25 ans)', fourchette: 'CHF 235–420/mois' },
      { profil: 'Adulte (26+ ans)', fourchette: 'CHF 310–573/mois' },
    ],
  },
  {
    id: 'etudiant',
    emoji: '🎓',
    title: 'Étudiant',
    subtitle: 'Suisse ou étranger',
    franchise: 'Franchise 2000–2500 CHF si bonne santé',
    modele: 'Telmed ou HMO pour économiser',
    intro: 'Tout étudiant résidant en Suisse doit s\'affilier à la LAMal. Les étudiants étrangers peuvent demander une exemption temporaire sous conditions. Pour les étudiants en bonne santé, une franchise haute est souvent le meilleur choix.',
    conseils: [
      { title: 'Franchise élevée = prime réduite', desc: 'Si vous êtes jeune et en bonne santé, choisissez la franchise 2500 CHF et économisez jusqu\'à CHF 100/mois sur votre prime.' },
      { title: 'Modèle Telmed ou HMO', desc: 'Ces modèles réduisent la prime de 10 à 25%. Adaptés aux étudiants qui peuvent facilement appeler une hotline médicale.' },
      { title: 'Vérifiez les subsides', desc: 'Les étudiants à revenus modestes peuvent bénéficier des subsides cantonaux. Renseignez-vous auprès du service social de votre canton.' },
      { title: 'Exemption possible pour étrangers', desc: 'Les étudiants étrangers avec une assurance équivalente dans leur pays peuvent parfois demander une exemption. Démarche à faire dans les 3 mois suivant l\'arrivée.' },
    ],
    primes: [
      { profil: '19–25 ans, franchise 300 CHF', fourchette: 'CHF 235–420/mois' },
      { profil: '19–25 ans, franchise 2500 CHF', fourchette: 'CHF 170–320/mois' },
      { profil: '26+ ans, franchise 2500 CHF', fourchette: 'CHF 220–440/mois' },
    ],
  },
  {
    id: 'expatrie',
    emoji: '✈️',
    title: 'Expatrié',
    subtitle: 'Frontalier ou nouvel arrivant',
    franchise: 'Franchise 300–1000 CHF (selon santé)',
    modele: 'Standard recommandé au début',
    intro: 'Tout résident en Suisse est obligatoirement soumis à la LAMal dès l\'établissement du domicile. L\'affiliation doit intervenir dans les 3 mois. La couverture est rétroactive à la date d\'arrivée si vous respectez ce délai.',
    conseils: [
      { title: 'Affiliez-vous dans les 3 mois', desc: 'Dès votre arrivée en Suisse, vous avez 3 mois pour choisir une caisse maladie. Passé ce délai, une caisse vous sera attribuée d\'office.' },
      { title: 'Modèle standard au début', desc: 'En arrivant, le modèle standard (libre choix) vous donne le temps de trouver un médecin de famille de confiance avant de passer à un modèle alternatif.' },
      { title: 'Transférez votre historique médical', desc: 'Préparez un résumé de vos antécédents médicaux en français ou allemand pour faciliter la prise en charge par votre nouveau médecin suisse.' },
      { title: 'LCA internationale', desc: 'Si vous voyagez souvent hors de Suisse, envisagez une assurance complémentaire LCA pour couvrir les soins à l\'étranger non remboursés par la LAMal.' },
    ],
    primes: [
      { profil: 'Adulte, standard, franchise 300 CHF', fourchette: 'CHF 310–573/mois (selon canton)' },
      { profil: 'Adulte, médecin de famille, franchise 1000 CHF', fourchette: 'CHF 210–430/mois (selon canton)' },
    ],
  },
  {
    id: 'retraite',
    emoji: '🧓',
    title: 'Retraité',
    subtitle: 'Senior 65 ans et plus',
    franchise: 'Franchise 300 CHF généralement',
    modele: 'Médecin de famille recommandé',
    intro: 'Les retraités n\'ont pas de prime réduite liée à l\'âge en Suisse — le tarif adulte s\'applique dès 26 ans. Cependant, les personnes à revenus modestes peuvent bénéficier des subsides cantonaux, qui sont souvent plus généreux pour les seniors.',
    conseils: [
      { title: 'Franchise 300 CHF recommandée', desc: 'Les retraités ont souvent des frais médicaux réguliers. La franchise basse (300 CHF) est généralement plus avantageuse à long terme.' },
      { title: 'Modèle médecin de famille', desc: 'Le modèle médecin de famille est idéal pour les seniors : il assure un suivi médical coordonné tout en réduisant la prime de 5 à 15%.' },
      { title: 'Subsides : vérifiez votre droit', desc: 'Beaucoup de retraités ont droit aux subsides cantonaux mais ne le savent pas. Renseignez-vous auprès de votre service communal ou du service cantonal.' },
      { title: 'LCA hospitalière conseillée', desc: 'À la retraite, une LCA hospitalière (division semi-privée) permet le libre choix du médecin et une chambre plus confortable en cas d\'hospitalisation prolongée.' },
    ],
    primes: [
      { profil: 'Senior 65+, franchise 300 CHF', fourchette: 'CHF 310–573/mois (selon canton)' },
      { profil: 'Senior 65+, médecin famille, franchise 300 CHF', fourchette: 'CHF 265–495/mois (selon canton)' },
    ],
  },
  {
    id: 'independant',
    emoji: '💼',
    title: 'Indépendant',
    subtitle: 'Travailleur indépendant / freelance',
    franchise: 'Franchise 1000–2500 CHF (selon trésorerie)',
    modele: 'Médecin de famille ou Telmed',
    intro: 'En tant qu\'indépendant, vous payez votre LAMal entièrement à votre charge (pas de participation employeur). Optimiser votre prime est donc particulièrement important. La prime LAMal peut être déduite des impôts (partiellement selon le canton).',
    conseils: [
      { title: 'Déductibilité fiscale', desc: 'Les primes d\'assurance maladie sont partiellement déductibles des revenus imposables. Le montant déductible varie selon le canton et la situation familiale.' },
      { title: 'Fonds de prévoyance', desc: 'Contrairement aux salariés, les indépendants n\'ont pas d\'assurance accident obligatoire via l\'employeur. Pensez à une assurance accident privée (LAA volontaire).' },
      { title: 'Franchise élevée si trésorerie stable', desc: 'Si votre trésorerie le permet, optez pour une franchise haute pour réduire la prime mensuelle. Provisionnez la différence sur un compte séparé.' },
      { title: 'Comparez chaque année', desc: 'L\'activité indépendante implique souvent une variation des revenus. Revérifiez chaque année si vous avez droit aux subsides et si votre situation optimale a changé.' },
    ],
    primes: [
      { profil: 'Adulte, franchise 300 CHF', fourchette: 'CHF 310–573/mois (selon canton)' },
      { profil: 'Adulte, Telmed, franchise 2500 CHF', fourchette: 'CHF 190–380/mois (selon canton)' },
    ],
  },
]

export default function ParProfilPage() {
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
            <span className="text-gray-800">Par profil</span>
          </nav>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            LAMal par profil : conseils personnalisés 2026
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Famille, étudiant, expatrié, retraité ou indépendant : trouvez les meilleurs conseils
            LAMal adaptés à votre situation de vie.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Profile nav */}
        <div className="flex flex-wrap gap-2 mb-10">
          {profiles.map((p) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              className="flex items-center gap-1.5 bg-gray-100 hover:bg-primary-light hover:text-primary text-gray-700 text-sm font-medium px-4 py-2 rounded-full transition-colors"
            >
              <span>{p.emoji}</span>
              {p.title}
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-14">
            {profiles.map((profile) => (
              <section key={profile.id} id={profile.id}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{profile.emoji}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{profile.title}</h2>
                    <span className="text-sm text-gray-500">{profile.subtitle}</span>
                  </div>
                </div>

                <p className="text-gray-700 mb-5 leading-relaxed">{profile.intro}</p>

                {/* Quick recommendations */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-blue-50 rounded-lg p-3 text-sm">
                    <div className="font-semibold text-primary mb-1">Franchise conseillée</div>
                    <div className="text-gray-700">{profile.franchise}</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 text-sm">
                    <div className="font-semibold text-primary mb-1">Modèle conseillé</div>
                    <div className="text-gray-700">{profile.modele}</div>
                  </div>
                </div>

                {/* Conseils */}
                <h3 className="font-bold text-gray-900 mb-3">Conseils spécifiques</h3>
                <div className="space-y-3 mb-5">
                  {profile.conseils.map((conseil, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-primary font-bold flex-shrink-0 mt-0.5">→</span>
                      <div>
                        <span className="font-semibold text-gray-900">{conseil.title} : </span>
                        <span className="text-gray-600 text-sm">{conseil.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Primes indicatives */}
                <h3 className="font-bold text-gray-900 mb-3">Primes indicatives 2026</h3>
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="table-auto w-full text-sm">
                    <thead>
                      <tr>
                        <th className="bg-primary text-white px-4 py-2.5 text-left">Profil</th>
                        <th className="bg-primary text-white px-4 py-2.5 text-left">Prime mensuelle</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profile.primes.map((p, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-2.5 text-gray-700">{p.profil}</td>
                          <td className="px-4 py-2.5 font-semibold text-primary">{p.fourchette}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ))}

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
