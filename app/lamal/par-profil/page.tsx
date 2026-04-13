import type { Metadata } from 'next'
import Link from 'next/link'
import LeadForm from '@/components/LeadForm'

export const metadata: Metadata = {
  title: 'LAMal par profil : famille, étudiant, expatrié, retraité — Conseils 2026',
  description:
    'Conseils LAMal 2026 personnalisés : famille, étudiant, expatrié, retraité, indépendant. Franchise et modèle optimaux selon votre situation de vie.',
  openGraph: {
    title: 'LAMal par profil — Conseils personnalisés 2026',
    description: 'Famille, étudiant, expatrié, retraité : quelle LAMal choisir selon votre profil ?',
    url: 'https://my-swiss-insurance.ch/lamal/par-profil',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'LAMal par profil : conseils personnalisés famille, étudiant, expatrié, retraité 2026',
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
        text: "Chaque membre de la famille a sa propre assurance LAMal individuelle — il n'y a pas d'assurance familiale groupée en Suisse. La prime enfant (0–18 ans) est nettement moins élevée. Les enfants peuvent avoir une franchise à 0 CHF. Comparez les caisses séparément pour chaque membre.",
      },
    },
    {
      '@type': 'Question',
      name: "Un étudiant étranger doit-il s'affilier à la LAMal ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, tout étudiant résidant en Suisse doit s'affilier dans les 3 mois. Les étudiants étrangers des universités cantonales peuvent demander une exemption temporaire (max 6 ans) s'ils ont une assurance équivalente dans leur pays d'origine. Source : art. 3 LAMal.",
      },
    },
    {
      '@type': 'Question',
      name: "Quel est le coût de la LAMal pour un retraité en Suisse ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "La prime LAMal est identique pour les adultes dès 26 ans — il n'y a pas de réduction pour les seniors. Les retraités à revenus modestes peuvent bénéficier des subsides cantonaux. La franchise 300 CHF est généralement recommandée car les retraités ont davantage de frais médicaux réguliers.",
      },
    },
  ],
}

const profiles = [
  {
    id: 'famille',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Famille avec enfants',
    franchise: 'Franchise 300 CHF (enfants : 0–100 CHF)',
    modele: 'Médecin de famille',
    intro: 'En Suisse, chaque membre de la famille a sa propre assurance LAMal individuelle. La prime enfant (0–18 ans) est nettement inférieure à la prime adulte.',
    conseils: [
      { t: 'Franchise à 0–100 CHF pour les enfants', d: 'Les enfants tombent souvent malades. Une franchise basse limite les restes à charge.' },
      { t: 'Modèle médecin de famille pour les adultes', d: 'Réduit la prime de 5 à 15% tout en maintenant un suivi médical coordonné.' },
      { t: 'Jeunes adultes 19–25 ans : tarif réduit', d: 'Cette tranche d\'âge bénéficie d\'une catégorie tarifaire inférieure. Comparez séparément.' },
      { t: 'Comparez caisse par caisse', d: 'La caisse la moins chère pour vous ne l\'est pas forcément pour vos enfants.' },
    ],
    primes: [
      { p: 'Enfant 0–18 ans', f: 'CHF 95–135/mois' },
      { p: 'Jeune adulte 19–25 ans', f: 'CHF 235–420/mois' },
      { p: 'Adulte 26 ans+', f: 'CHF 310–573/mois' },
    ],
  },
  {
    id: 'etudiant',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
    title: 'Étudiant',
    franchise: 'Franchise 2000–2500 CHF (si bonne santé)',
    modele: 'Telmed ou HMO',
    intro: 'Tout étudiant résidant en Suisse doit s\'affilier à la LAMal. Pour les étudiants en bonne santé, une franchise haute associée à un modèle alternatif est souvent le meilleur choix.',
    conseils: [
      { t: 'Franchise élevée = prime réduite', d: 'Franchise 2500 CHF : jusqu\'à CHF 100/mois d\'économie. Idéal si vous êtes rarement malade.' },
      { t: 'Modèle Telmed ou HMO', d: 'Réduction de 10 à 25%. Adaptés aux étudiants mobiles et à l\'aise avec le digital.' },
      { t: 'Vérifiez vos droits aux subsides', d: 'Les étudiants à revenus modestes peuvent bénéficier des subsides cantonaux.' },
      { t: 'Exemption possible pour étrangers', d: 'Renseignez-vous dans les 3 mois suivant l\'arrivée si vous avez une assurance équivalente.' },
    ],
    primes: [
      { p: '19–25 ans, franchise 300 CHF', f: 'CHF 235–420/mois' },
      { p: '19–25 ans, franchise 2500 CHF', f: 'CHF 170–320/mois' },
      { p: '26 ans+, franchise 2500 CHF', f: 'CHF 220–440/mois' },
    ],
  },
  {
    id: 'expatrie',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Expatrié / Nouvel arrivant',
    franchise: 'Franchise 300–1000 CHF (selon santé)',
    modele: 'Standard au début, puis alternatif',
    intro: 'Tout résident en Suisse est soumis à la LAMal dès l\'établissement du domicile. L\'affiliation doit intervenir dans les 3 mois. La couverture est rétroactive si vous respectez ce délai.',
    conseils: [
      { t: 'Affiliez-vous dans les 3 mois', d: 'Dès votre arrivée, vous avez 3 mois pour choisir une caisse. Au-delà, une caisse vous est attribuée d\'office.' },
      { t: 'Modèle standard au début', d: 'Prenez le temps de trouver un médecin de confiance avant de passer à un modèle alternatif.' },
      { t: 'Préparez votre historique médical', d: 'Résumé en français ou allemand pour faciliter la prise en charge par votre nouveau médecin.' },
      { t: 'Envisagez une LCA internationale', d: 'Pour les voyages fréquents hors Suisse, une LCA couvre les soins non remboursés par la LAMal.' },
    ],
    primes: [
      { p: 'Adulte, standard, franchise 300 CHF', f: 'CHF 310–573/mois' },
      { p: 'Adulte, médecin famille, franchise 1000 CHF', f: 'CHF 210–430/mois' },
    ],
  },
  {
    id: 'retraite',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Retraité',
    franchise: 'Franchise 300 CHF généralement',
    modele: 'Médecin de famille recommandé',
    intro: 'Les retraités ne bénéficient pas de prime réduite — le tarif adulte s\'applique dès 26 ans. Cependant, les personnes à revenus modestes ont souvent droit aux subsides cantonaux.',
    conseils: [
      { t: 'Franchise 300 CHF recommandée', d: 'Les retraités ont souvent des frais médicaux réguliers. La franchise basse est plus avantageuse.' },
      { t: 'Modèle médecin de famille', d: 'Assure un suivi médical coordonné, réduit la prime de 5 à 15%.' },
      { t: 'Vérifiez votre droit aux subsides', d: 'Beaucoup de retraités y ont droit mais ne le savent pas. Renseignez-vous auprès de votre service communal.' },
      { t: 'LCA hospitalière conseillée', d: 'Chambre semi-privée et libre choix du médecin chef pour une hospitalisation plus confortable.' },
    ],
    primes: [
      { p: 'Senior 65+, franchise 300 CHF', f: 'CHF 310–573/mois' },
      { p: 'Senior 65+, médecin famille, franchise 300 CHF', f: 'CHF 265–495/mois' },
    ],
  },
  {
    id: 'independant',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Indépendant / Freelance',
    franchise: 'Franchise 1000–2500 CHF (selon trésorerie)',
    modele: 'Médecin de famille ou Telmed',
    intro: 'En tant qu\'indépendant, vous payez votre LAMal entièrement à votre charge. Optimiser votre prime est particulièrement important. Les primes sont partiellement déductibles des impôts.',
    conseils: [
      { t: 'Déductibilité fiscale', d: 'Les primes LAMal sont partiellement déductibles des revenus imposables. Le montant varie selon le canton.' },
      { t: 'Assurance accident à prévoir', d: 'Les indépendants n\'ont pas d\'assurance accident via un employeur. Une LAA volontaire est recommandée.' },
      { t: 'Franchise élevée si trésorerie stable', d: 'Optez pour une franchise haute et provisionnez la différence sur un compte séparé.' },
      { t: 'Vérifiez chaque année votre droit aux subsides', d: 'Les revenus variables peuvent vous ouvrir des droits certaines années.' },
    ],
    primes: [
      { p: 'Adulte, franchise 300 CHF', f: 'CHF 310–573/mois' },
      { p: 'Adulte, Telmed, franchise 2500 CHF', f: 'CHF 190–380/mois' },
    ],
  },
]

export default function ParProfilPage() {
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
            <span className="text-ink">Par profil</span>
          </nav>
          <h1 className="text-5xl font-bold text-ink leading-tight mb-4 max-w-2xl">
            LAMal par profil — Conseils 2026.
          </h1>
          <p className="text-xl text-slate max-w-2xl leading-relaxed">
            Famille, étudiant, expatrié, retraité ou indépendant : des recommandations
            adaptées à chaque situation de vie.
          </p>
        </div>
      </section>

      <div className="container-xl py-16">
        {/* Profile nav */}
        <div className="flex flex-wrap gap-2 mb-12">
          {profiles.map((p) => (
            <a key={p.id} href={`#${p.id}`}
              className="flex items-center gap-2 text-[14px] text-slate font-medium bg-cloud border border-edge
                         hover:border-brand hover:text-ink px-4 py-2 rounded-full transition-colors duration-150">
              <span className="text-brand">{p.icon}</span>
              {p.title}
            </a>
          ))}
        </div>

        <div className="flex gap-12">
          <div className="flex-1 min-w-0 space-y-16">
            {profiles.map((profile) => (
              <section key={profile.id} id={profile.id}>
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-10 h-10 bg-cloud border border-edge rounded-[8px] flex items-center justify-center text-brand shrink-0 mt-0.5">
                    {profile.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-ink">{profile.title}</h2>
                  </div>
                </div>

                <p className="text-[16px] text-slate leading-relaxed mb-5">{profile.intro}</p>

                {/* Recommendations pills */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-cloud border border-edge rounded-[8px] p-4">
                    <p className="text-[11px] font-semibold text-slate uppercase tracking-wide mb-1">Franchise conseillée</p>
                    <p className="text-[14px] font-medium text-ink">{profile.franchise}</p>
                  </div>
                  <div className="bg-cloud border border-edge rounded-[8px] p-4">
                    <p className="text-[11px] font-semibold text-slate uppercase tracking-wide mb-1">Modèle conseillé</p>
                    <p className="text-[14px] font-medium text-ink">{profile.modele}</p>
                  </div>
                </div>

                {/* Conseils */}
                <div className="space-y-3 mb-6">
                  {profile.conseils.map((conseil, i) => (
                    <div key={i} className="flex gap-3">
                      <svg className="w-4 h-4 text-brand mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <div>
                        <span className="font-semibold text-ink text-[15px]">{conseil.t} : </span>
                        <span className="text-slate text-[15px]">{conseil.d}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Primes indicatives */}
                <div className="border border-edge rounded-[8px] overflow-hidden">
                  <table className="stripe-table w-full">
                    <thead>
                      <tr>
                        <th>Profil</th>
                        <th>Prime mensuelle indicative</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profile.primes.map((p, i) => (
                        <tr key={i}>
                          <td>{p.p}</td>
                          <td className="font-semibold text-brand">{p.f}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ))}

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
