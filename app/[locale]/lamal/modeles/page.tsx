import type { Metadata } from 'next'
import AuthorBio from '@/components/ui/AuthorBio'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FAQ from '@/components/ui/FAQ'
import Link from 'next/link'
import MultiStepLeadForm from '@/components/ui/MultiStepLeadForm'

export const metadata: Metadata = {
  title: 'Modèles LAMal 2026 : standard, médecin de famille, HMO, Telmed',
  description:
    'Les 4 modèles d\'assurance LAMal en Suisse : standard, médecin de famille, HMO et Telmed. Économies, contraintes et conseils pour choisir. Guide 2026.',
  openGraph: {
    title: 'Modèles LAMal 2026 : quel modèle choisir ?',
    description: 'Comparez les 4 modèles LAMal : standard, Hausarzt, HMO, Telmed. Économies et conseils.',
    url: 'https://my-swiss-insurance.ch/lamal/modeles',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Modèles LAMal 2026 : standard, médecin de famille, HMO et Telmed',
  datePublished: '2026-01-01',
  dateModified: '2026-04-22',
  author: { '@type': 'Organization', name: 'My Swiss Insurance' },
  publisher: { '@type': 'Organization', name: 'My Swiss Insurance' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://my-swiss-insurance.ch/lamal/modeles' },
}

const faqItems = [
  {
    question: 'Quel est le meilleur modèle LAMal pour économiser ?',
    answer:
      "Le modèle Telmed offre la plus grande réduction de prime (jusqu'à −24%) selon la caisse et le canton. Le modèle médecin de famille offre jusqu'à −20%. Les économies réelles dépendent de votre caisse et de votre région. Le HMO peut être très avantageux en ville mais son réseau est limité en zone rurale.",
  },
  {
    question: 'Peut-on changer de modèle LAMal en cours d\'année ?',
    answer:
      "Non. Le changement de modèle n'est possible qu'au 1er janvier avec un préavis avant le 30 novembre. Cette règle s'applique aussi en cas de changement de caisse — vous choisissez votre nouveau modèle au moment de l'inscription.",
  },
  {
    question: 'Les prestations sont-elles identiques dans tous les modèles ?',
    answer:
      "Oui. Tous les modèles LAMal couvrent les mêmes prestations définies par l'OFSP. La différence porte uniquement sur la porte d'entrée dans le système de soins (libre choix ou porte d'entrée obligatoire). Les remboursements sont identiques une fois le parcours de soins respecté.",
  },
  {
    question: 'Qu\'est-ce que le modèle Telmed ?',
    answer:
      "Le modèle Telmed impose de passer par une hotline médicale (Medgate, Medi24 ou équivalent) avant toute consultation en cabinet ou aux urgences non vitales. La consultation téléphonique ou par app est disponible 24h/24. Ce modèle est particulièrement adapté aux personnes à l'aise avec le numérique.",
  },
  {
    question: 'Le modèle HMO est-il disponible partout en Suisse ?',
    answer:
      "Non. Les réseaux HMO sont concentrés dans les centres urbains (Zurich, Berne, Genève, Lausanne, Bâle). Dans les zones rurales et de montagne, ce modèle est souvent indisponible ou peu pratique. Vérifiez la disponibilité du réseau dans votre commune avant de choisir.",
  },
  {
    question: 'Le modèle médecin de famille impose-t-il un seul médecin pour toute la famille ?',
    answer:
      "Non. Chaque membre de la famille peut avoir son propre médecin de famille dans ce modèle. L'obligation est de consulter ce médecin en premier avant tout spécialiste. Les enfants et adultes peuvent avoir des médecins référents différents.",
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

const modeles = [
  {
    id: 'standard',
    title: 'Standard (libre choix)',
    reduction: null,
    badge: 'Référence',
    badgeStyle: 'bg-cloud text-slate border-edge',
    borderColor: 'border-edge',
    desc: 'Accès direct à n\'importe quel médecin ou spécialiste en Suisse, sans restriction ni porte d\'entrée obligatoire. C\'est le modèle le plus cher — il sert de référence pour comparer les autres.',
    avantages: ['Liberté totale de choix du médecin', 'Accès direct aux spécialistes', 'Aucune contrainte de réseau'],
    inconvenients: ['Prime la plus élevée', 'Pas d\'économie possible'],
    ideal: 'Vous consultez régulièrement plusieurs spécialistes ou souhaitez un accès direct sans filtrage.',
  },
  {
    id: 'hausarzt',
    title: 'Médecin de famille (Hausarzt)',
    reduction: 'jusqu\'à −20%',
    badge: null,
    badgeStyle: '',
    borderColor: 'border-brand',
    desc: 'Vous consultez d\'abord votre médecin de famille, qui vous oriente si besoin vers un spécialiste. La consultation chez le généraliste est toujours prioritaire. Réduction moyenne de 11% (jusqu\'à −20%) selon la caisse et le canton.',
    avantages: ['Suivi médical coordonné', 'Réduction de prime jusqu\'à −20%', 'Médecin de confiance établi'],
    inconvenients: ['Passage obligatoire par le médecin de famille', 'Moins flexible pour accéder aux spécialistes'],
    ideal: 'Vous avez déjà un médecin de famille et souhaitez maintenir une relation de confiance tout en économisant.',
  },
  {
    id: 'hmo',
    title: 'HMO (centre médical)',
    reduction: 'jusqu\'à −20%',
    badge: null,
    badgeStyle: '',
    borderColor: 'border-brand',
    desc: 'Vous êtes rattaché à un réseau fermé de médecins agréés (cabinet de groupe ou centre HMO). La porte d\'entrée est un médecin du réseau. Réduction moyenne de 12% (de −3% à −20%) selon la région.',
    avantages: ['Réduction de prime jusqu\'à −20%', 'Coordination interne des soins', 'Qualité homogène du réseau'],
    inconvenients: ['Réseau limité en zones rurales', 'Liberté de choix réduite', 'Changement de médecin complexe'],
    ideal: 'Vous habitez une grande ville avec un réseau HMO dense et appréciez la médecine de groupe.',
  },
  {
    id: 'telmed',
    title: 'Telmed (téléconsultation)',
    reduction: 'jusqu\'à −24%',
    badge: null,
    badgeStyle: '',
    borderColor: 'border-[#3b82f6]',
    desc: 'Première consultation par téléphone ou application (Medgate, Medi24, Doctorline…) avant tout rendez-vous en cabinet ou aux urgences non vitales. Disponible 24h/24, 7j/7. Réduction moyenne de 12% (de −5% à −24%) selon la caisse.',
    avantages: ['Plus grande réduction de prime (jusqu\'à −24%)', 'Disponible 24h/24', 'Pratique pour les actifs et familles'],
    inconvenients: ['Passage obligatoire par la hotline', 'Dépendance aux outils numériques', 'Pas toujours adapté aux urgences'],
    ideal: 'Vous êtes à l\'aise avec la technologie, rarement malade ou cherchez la réduction maximale.',
  },
]

export default function ModelesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="bg-white border-b border-edge pt-12 pb-10">
        <div className="container-xl">
          <Breadcrumb
            items={[
              { label: 'Accueil', href: '/' },
              { label: 'LAMal', href: '/lamal' },
              { label: 'Modèles LAMal' },
            ]}
          />
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="badge">Données OFSP · 2026</span>
          </div>
          <h1 className="text-5xl font-bold text-ink leading-tight mb-4 max-w-2xl">
            Modèles LAMal 2026 : lequel choisir ?
          </h1>
          <p className="text-xl text-slate max-w-2xl leading-relaxed">
            La LAMal propose quatre modèles d'assurance. Le modèle standard offre le plus de liberté,
            les modèles alternatifs réduisent la prime de 10 à 24% en échange d'une porte d'entrée
            obligatoire dans le système de soins.
          </p>
        </div>
      </section>

      <div className="container-xl py-16">
        <AuthorBio publishedDate="1er janvier 2026" updatedDate="22 avril 2026" />

        <div className="flex gap-12">
          <div className="flex-1 min-w-0 space-y-14">

            {/* Présentation rapide */}
            <section id="comparatif">
              <h2 className="text-2xl font-semibold text-ink mb-6">Comparatif des 4 modèles</h2>
              <div className="overflow-x-auto border border-edge rounded-[8px] mb-6">
                <table className="stripe-table w-full">
                  <thead>
                    <tr>
                      <th>Modèle</th>
                      <th className="text-center">Réduction prime</th>
                      <th className="hidden sm:table-cell">Porte d'entrée</th>
                      <th className="hidden md:table-cell">Disponibilité</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Standard', '—', 'Libre', 'Partout'],
                      ['Médecin de famille', 'jusqu\'à −20%', 'Médecin généraliste attitré', 'Très large'],
                      ['HMO', 'jusqu\'à −20%', 'Réseau de cabinets agréés', 'Grandes villes'],
                      ['Telmed', 'jusqu\'à −24%', 'Hotline médicale (app/téléphone)', 'Partout'],
                    ].map(([modele, reduction, entree, dispo], i) => (
                      <tr key={i}>
                        <td className="font-semibold text-ink">{modele}</td>
                        <td className="text-center font-medium text-brand">{reduction}</td>
                        <td className="hidden sm:table-cell text-slate">{entree}</td>
                        <td className="hidden md:table-cell text-slate">{dispo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="callout text-[15px]">
                <strong>À retenir :</strong> toutes les prestations médicales sont identiques quel que soit le modèle.
                Seule la porte d'entrée dans le système de soins diffère. Les remboursements sont les mêmes.
              </div>
            </section>

            {/* Les 4 modèles en détail */}
            <section id="details">
              <h2 className="text-2xl font-semibold text-ink mb-6">Les 4 modèles en détail</h2>
              <div className="space-y-6">
                {modeles.map((m) => (
                  <div key={m.id} className={`bg-white border ${m.borderColor} border-l-4 rounded-[8px] p-6`}>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <h3 className="font-semibold text-ink text-[18px]">{m.title}</h3>
                      {m.reduction ? (
                        <span className="text-[12px] font-semibold text-brand bg-[#dbeafe] border border-brand/20 px-2.5 py-0.5 rounded-full shrink-0">
                          {m.reduction}
                        </span>
                      ) : (
                        <span className="text-[12px] text-slate bg-cloud border border-edge px-2.5 py-0.5 rounded-full shrink-0">
                          Référence
                        </span>
                      )}
                    </div>
                    <p className="text-[15px] text-slate mb-4">{m.desc}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-[12px] font-semibold text-slate uppercase tracking-wide mb-2">Avantages</p>
                        <ul className="space-y-1.5">
                          {m.avantages.map((a, i) => (
                            <li key={i} className="flex gap-2 text-[13px] text-slate">
                              <svg className="w-3.5 h-3.5 text-[#22c55e] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                              </svg>
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-slate uppercase tracking-wide mb-2">Contraintes</p>
                        <ul className="space-y-1.5">
                          {m.inconvenients.map((c, i) => (
                            <li key={i} className="flex gap-2 text-[13px] text-slate">
                              <svg className="w-3.5 h-3.5 text-slate/50 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="bg-cloud border border-edge rounded-md px-4 py-2.5">
                      <p className="text-[13px] text-slate">
                        <span className="font-semibold text-ink">Idéal pour : </span>
                        {m.ideal}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Comment changer */}
            <section id="changement">
              <h2 className="text-2xl font-semibold text-ink mb-4">Comment changer de modèle ?</h2>
              <p className="text-[16px] text-slate leading-relaxed mb-5">
                Le modèle se choisit une fois par an. Le changement est possible à chaque renouvellement
                annuel, indépendamment d'un éventuel changement de caisse.
              </p>
              <div className="callout-warning text-[15px]">
                <strong>Date limite :</strong> avis de changement à envoyer avant le <strong>30 novembre</strong>
                pour une prise d'effet au 1er janvier. Passé ce délai, votre modèle actuel est reconduit.
              </div>
              <div className="mt-5">
                <Link href="/lamal/changer-de-caisse"
                  className="text-brand hover:underline text-[15px] font-medium">
                  Guide complet : changer de caisse et de modèle →
                </Link>
              </div>
            </section>

            <FAQ items={faqItems} />

            <section>
              <h3 className="text-[16px] font-semibold text-ink mb-3">Voir aussi</h3>
              <div className="flex flex-col gap-2">
                {[
                  { href: '/lamal/franchise', label: 'Franchise LAMal : quel montant choisir ?' },
                  { href: '/lamal/guide', label: 'Guide complet LAMal 2026' },
                  { href: '/lamal/comparateur', label: 'Comparer ma prime LAMal' },
                  { href: '/lamal/changer-de-caisse', label: 'Changer de caisse maladie' },
                ].map(link => (
                  <Link key={link.href} href={link.href}
                    className="text-[15px] text-brand hover:underline flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {link.label}
                  </Link>
                ))}
              </div>
            </section>

          </div>

          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <MultiStepLeadForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
