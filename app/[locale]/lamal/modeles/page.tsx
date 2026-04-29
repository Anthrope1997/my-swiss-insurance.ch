import type { Metadata } from 'next'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FAQ from '@/components/ui/FAQ'
import Link from 'next/link'
import AuthorBio from '@/components/ui/AuthorBio'
import NeedHelpSection from '@/components/ui/NeedHelpSection'

export const metadata: Metadata = {
  title: 'Modèles LAMal 2026 : standard, médecin de famille, HMO, Telmed',
  description:
    "Les 4 modèles d'assurance LAMal en Suisse : standard, médecin de famille, HMO et Telmed. Économies, contraintes et conseils pour choisir. Guide 2026.",
  openGraph: {
    title: 'Modèles LAMal 2026 : quel modèle choisir ?',
    description: 'Comparez les 4 modèles LAMal : standard, médecin de famille, HMO, téléconsultation. Économies et conseils.',
    url: 'https://my-swiss-insurance.ch/lamal/modeles',
    type: 'article',
  },
  alternates: { canonical: 'https://my-swiss-insurance.ch/lamal/modeles' },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Modèles LAMal 2026 : standard, médecin de famille, HMO et Telmed',
  datePublished: '2026-01-01',
  dateModified: '2026-04-22',
  author: { '@type': 'Organization', name: 'My Swiss Insurance', url: 'https://my-swiss-insurance.ch' },
  publisher: { '@type': 'Organization', name: 'My Swiss Insurance' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://my-swiss-insurance.ch/lamal/modeles' },
}

const faqItems = [
  {
    question: "Quel modèle LAMal permet d'économiser le plus ?",
    answer:
      "Le modèle Telmed offre la plus grande réduction de prime (jusqu'à 24%) selon la caisse et le canton. Le modèle médecin de famille offre jusqu'à 20%. Les économies réelles dépendent de votre caisse et de votre région. Le HMO peut être très avantageux en ville mais son réseau est limité en zone rurale.",
  },
  {
    question: "Peut-on changer de modèle LAMal en cours d'année ?",
    answer:
      "Non. Le changement de modèle n'est possible qu'au 1er janvier avec un préavis avant le 30 novembre. Cette règle s'applique aussi en cas de changement de caisse : vous choisissez votre nouveau modèle au moment de l'inscription.",
  },
  {
    question: 'Les prestations sont-elles identiques dans tous les modèles ?',
    answer:
      "Oui. Tous les modèles LAMal couvrent les mêmes prestations définies par l'OFSP. La différence porte uniquement sur la porte d'entrée dans le système de soins (libre choix ou porte d'entrée obligatoire). Les remboursements sont identiques une fois le parcours de soins respecté.",
  },
  {
    question: "Qu'est-ce que le modèle Telmed ?",
    answer:
      "Le modèle Telmed impose de passer par une hotline médicale (Medgate, Medi24 ou équivalent) avant toute consultation en cabinet ou aux urgences non vitales. La consultation téléphonique ou par application est disponible 24 heures sur 24. Ce modèle est particulièrement adapté aux personnes à l'aise avec le numérique.",
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
    badgeStyle: 'bg-cloud text-slate border-edge',
    borderColor: 'border-brand',
    desc: "Accès direct à n'importe quel médecin ou spécialiste en Suisse, sans restriction ni porte d'entrée obligatoire. C'est le modèle le plus cher : il sert de référence pour comparer les autres.",
    avantages: ['Liberté totale de choix du médecin', 'Accès direct aux spécialistes', 'Aucune contrainte de réseau'],
    inconvenients: ['Prime la plus élevée', 'Aucune réduction disponible'],
    ideal: 'Vous consultez régulièrement plusieurs spécialistes ou souhaitez un accès direct sans filtrage.',
  },
  {
    id: 'hausarzt',
    title: 'Médecin de famille',
    reduction: "jusqu'à −20%",
    badgeStyle: '',
    borderColor: 'border-brand',
    desc: "Vous consultez d'abord votre médecin de famille, qui vous oriente si besoin vers un spécialiste. La consultation chez le généraliste est toujours prioritaire. Réduction moyenne de 11% (jusqu'à 20%) selon la caisse et le canton.",
    avantages: ['Suivi médical coordonné', 'Réduction de prime jusqu\'à 20%', 'Médecin de confiance établi'],
    inconvenients: ['Passage obligatoire par le médecin de famille', 'Accès aux spécialistes moins direct'],
    ideal: 'Vous avez déjà un médecin de famille et souhaitez maintenir une relation de confiance tout en économisant.',
  },
  {
    id: 'hmo',
    title: 'HMO (centre médical)',
    reduction: "jusqu'à −20%",
    badgeStyle: '',
    borderColor: 'border-brand',
    desc: "Vous êtes rattaché à un réseau fermé de médecins agréés (cabinet de groupe ou centre HMO). La porte d'entrée est un médecin du réseau. Réduction moyenne de 12% (de 3% à 20%) selon la région.",
    avantages: ['Réduction de prime jusqu\'à 20%', 'Coordination interne des soins', 'Qualité homogène du réseau'],
    inconvenients: ['Réseau limité en zones rurales', 'Liberté de choix réduite', 'Changement de médecin complexe'],
    ideal: "Vous habitez une grande ville avec un réseau HMO dense et appréciez la médecine de groupe.",
  },
  {
    id: 'telmed',
    title: 'Telmed (téléconsultation)',
    reduction: "jusqu'à −24%",
    badgeStyle: '',
    borderColor: 'border-brand',
    desc: "Première consultation par téléphone ou application (Medgate, Medi24, Doctorline...) avant tout rendez-vous en cabinet ou aux urgences non vitales. Disponible 24 heures sur 24, 7 jours sur 7. Réduction moyenne de 12% (de 5% à 24%) selon la caisse.",
    avantages: ['Plus grande réduction de prime (jusqu\'à 24%)', 'Disponible 24 heures sur 24', 'Pratique pour les actifs et familles'],
    inconvenients: ['Passage obligatoire par la hotline', 'Dépendance aux outils numériques', 'Pas toujours adapté aux urgences'],
    ideal: "Vous êtes à l'aise avec la technologie, rarement malade ou cherchez la réduction maximale.",
  },
]

const heroStats = [
  { value: '4',      label: "Modèles d'assurance",  sub: 'standard, médecin de famille, HMO, téléconsultation' },
  { value: '−24%',   label: 'Réduction maximum',     sub: 'modèle Telmed selon caisse et canton'     },
  { value: '−11%',   label: 'Réduction moyenne',     sub: 'médecin de famille, toutes caisses'       },
]

const toc = [
  { id: 'comparatif', label: '1. Comparatif des 4 modèles' },
  { id: 'details',    label: '2. Les 4 modèles en détail'  },
  { id: 'changement', label: '3. Comment changer'           },
  { id: 'faq',        label: '4. Questions fréquentes'      },
]

const guidesAssocies = [
  { href: '/lamal/franchise',         label: 'Choisir sa franchise'      },
  { href: '/lamal/guide',             label: 'Guide complet LAMal 2026'  },
  { href: '/lamal/comparateur',       label: 'Comparer ma prime LAMal'   },
  { href: '/lamal/changer-de-caisse', label: 'Changer de caisse maladie' },
]

export default function ModelesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── Hero ── */}
      <section className="bg-white border-b border-edge pt-12 pb-14">
        <div className="container-xl">
          <Breadcrumb items={[
            { label: 'Accueil', href: '/' },
            { label: 'LAMal', href: '/lamal' },
            { label: 'Modèles LAMal' },
          ]} />

          <h1 className="text-4xl sm:text-5xl font-bold text-ink leading-tight mb-4 max-w-3xl">
            Modèles LAMal 2026 : lequel choisir ?
          </h1>
          <p className="text-[18px] text-slate max-w-2xl leading-relaxed mb-10">
            La LAMal propose quatre modèles d'assurance. Le modèle standard offre le plus de liberté.
            Les trois modèles alternatifs (médecin de famille, HMO, Telmed) réduisent la prime jusqu'à
            24% en échange d'un interlocuteur médical imposé avant toute consultation chez un spécialiste.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {heroStats.map(s => (
              <div key={s.label} className="bg-cloud/60 border border-edge rounded-xl px-5 py-4">
                <div className="text-2xl font-bold text-ink leading-none">{s.value}</div>
                <div className="text-[13px] font-medium text-ink/70 mt-0.5">{s.label}</div>
                <div className="text-[12px] text-slate mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Layout 2 colonnes ── */}
      <div className="container-xl py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12 items-start">

          <aside className="hidden lg:block">
            <nav className="sticky top-24">
              <p className="text-[11px] font-semibold text-slate uppercase tracking-widest mb-4 px-4">
                Sommaire
              </p>
              <ul className="space-y-0.5">
                {toc.map(item => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="toc-link">{item.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <article className="min-w-0 space-y-4">

            {/* 1 — Comparatif */}
            <section id="comparatif" className="pt-2">
              <h2 className="article-h2">1. Comparatif des 4 modèles</h2>
              <div className="overflow-x-auto border border-edge rounded-[8px] mb-6">
                <table className="stripe-table w-full">
                  <thead>
                    <tr>
                      <th className="text-left whitespace-nowrap">Modèle</th>
                      <th className="text-left whitespace-nowrap">Réduction prime</th>
                      <th className="hidden sm:table-cell text-left whitespace-nowrap">Porte d'entrée</th>
                      <th className="hidden md:table-cell text-left whitespace-nowrap">Disponibilité</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Telmed', "jusqu'à −24%", 'Télémédecine (application ou téléphone)', 'Partout'],
                      ['HMO', "jusqu'à −20%", 'Réseau de cabinets agréés', 'Grandes villes'],
                      ["Médecin de famille", "jusqu'à −20%", 'Médecin généraliste attitré', 'Très large'],
                      ['Standard', 'Aucune', 'Libre', 'Partout'],
                    ].map(([modele, reduction, entree, dispo], i) => (
                      <tr key={i}>
                        <td className="font-semibold text-ink whitespace-nowrap">{modele}</td>
                        <td className="font-medium text-brand whitespace-nowrap">{reduction}</td>
                        <td className="hidden sm:table-cell text-slate whitespace-nowrap">{entree}</td>
                        <td className="hidden md:table-cell text-slate whitespace-nowrap">{dispo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="callout flex gap-3">
                <svg className="text-[#378ADD] shrink-0 mt-0.5" width="20" height="20"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                     strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
                  <line x1="9.5" y1="18" x2="14.5" y2="18" />
                  <line x1="10" y1="21" x2="14" y2="21" />
                </svg>
                <div>
                  <p className="font-semibold text-ink mb-1">À retenir</p>
                  <p className="text-[15px]">Toutes les prestations médicales sont identiques quel que soit le modèle. Seule la porte d'entrée dans le système de soins diffère. Les remboursements sont les mêmes.</p>
                </div>
              </div>
            </section>

            {/* 2 — Détails */}
            <section id="details">
              <h2 className="article-h2">2. Les 4 modèles en détail</h2>
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

            {/* 3 — Changement */}
            <section id="changement">
              <h2 className="article-h2">3. Comment changer de modèle</h2>
              <p className="article-p">
                Le modèle se choisit une fois par an. Le changement est possible à chaque renouvellement
                annuel, indépendamment d'un éventuel changement de caisse.
              </p>
              <div className="callout-warning flex gap-3">
                <svg className="text-[#378ADD] shrink-0 mt-0.5" width="20" height="20"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                     strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
                  <line x1="9.5" y1="18" x2="14.5" y2="18" />
                  <line x1="10" y1="21" x2="14" y2="21" />
                </svg>
                <p className="text-[15px]">
                  <strong>Date limite :</strong> avis de changement à envoyer avant le <strong>30 novembre</strong>{' '}
                  pour une prise d'effet au 1er janvier. Passé ce délai, votre modèle actuel est reconduit.
                </p>
              </div>
              <div className="mt-5">
                <Link href="/lamal/changer-de-caisse" className="text-brand hover:underline text-[15px] font-medium">
                  Guide complet : changer de caisse et de modèle →
                </Link>
              </div>
            </section>

            {/* 4 — FAQ */}
            <section id="faq">
              <FAQ items={faqItems} title="4. Questions fréquentes sur les modèles LAMal" />
            </section>

            {/* Formulaire */}
            <NeedHelpSection />

            {/* Bandeau MSI */}
            <AuthorBio publishedDate="1er janvier 2026" updatedDate="22 avril 2026" />

            {/* Guides associés */}
            <section className="pt-8 border-t border-edge mt-4">
              <p className="text-[13px] font-semibold text-slate uppercase tracking-widest mb-4">
                Guides associés
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {guidesAssocies.map(({ href, label }) => (
                  <Link key={href} href={href}
                    className="flex items-center gap-2 text-[14px] text-slate hover:text-brand border border-edge rounded-[8px] px-4 py-3 transition-colors hover:border-brand/30">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {label}
                  </Link>
                ))}
              </div>
            </section>

          </article>
        </div>
      </div>
    </>
  )
}
