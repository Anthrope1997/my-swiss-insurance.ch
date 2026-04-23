import type { Metadata } from 'next'
import AuthorBio from '@/components/ui/AuthorBio'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FAQ from '@/components/ui/FAQ'
import FrontalierSimulateur from '@/components/lamal/FrontalierSimulateur'
import Link from 'next/link'
import MultiStepLeadForm from '@/components/ui/MultiStepLeadForm'

export const metadata: Metadata = {
  title: 'LAMal ou assurance du pays de résidence : comment choisir ? 2026',
  description:
    'Frontaliers en Suisse : comment choisir entre la LAMal suisse et le système de santé de votre pays de résidence ? Critères, tableau comparatif et simulateur de décision.',
  openGraph: {
    title: 'LAMal ou assurance du pays de résidence — Frontaliers 2026',
    description:
      'Critères de choix entre LAMal et système étranger pour les frontaliers en Suisse. Simulateur personnalisé inclus.',
    url: 'https://my-swiss-insurance.ch/lamal/frontalier-choix-assurance',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'LAMal ou assurance du pays de résidence : comment choisir ?',
  datePublished: '2026-01-01',
  dateModified: '2026-04-22',
  author: { '@type': 'Organization', name: 'My Swiss Insurance' },
  publisher: { '@type': 'Organization', name: 'My Swiss Insurance' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://my-swiss-insurance.ch/lamal/frontalier-choix-assurance' },
}

const faqItems = [
  {
    question: 'Quel est le délai pour exercer le droit d\'option en tant que frontalier ?',
    answer:
      "Le délai est de 3 mois à compter du premier jour de travail en Suisse. Passé ce délai sans déclaration explicite, la LAMal s'applique automatiquement par défaut. Ce délai est identique pour les frontaliers français, allemands et italiens dans le cadre des accords bilatéraux Suisse-UE (ALCP).",
  },
  {
    question: 'Peut-on changer d\'option après avoir choisi ?',
    answer:
      "En principe non. Le droit d'option est définitif une fois exercé. Des révisions sont possibles uniquement lors de changements de situation reconnus par les autorités : mariage ou divorce, déménagement hors du pays de résidence, départ à la retraite, perte d'emploi prolongée, ou changement de statut professionnel majeur. Chaque révision doit être explicitement demandée.",
  },
  {
    question: 'La LAMal couvre-t-elle les soins dans mon pays de résidence ?',
    answer:
      "Non, sauf pour les urgences. Si vous optez pour la LAMal, vous avez accès complet au réseau médical suisse, mais la couverture dans votre pays de résidence (France, Allemagne, Italie) est limitée aux soins d'urgence. Pour des soins programmés à l'étranger (spécialiste, hospitalisation non urgente), vous devez soit les financer directement, soit souscrire une assurance complémentaire privée dans votre pays de résidence.",
  },
  {
    question: 'Le système étranger couvre-t-il les soins en Suisse ?',
    answer:
      "Non, également limité aux urgences uniquement. Si vous optez pour le système de votre pays de résidence (Sécurité sociale française, GKV allemand, SSN italien), votre couverture en Suisse est limitée aux soins d'urgence. Pour des soins programmés en Suisse (ce qui arrive fréquemment si vous y travaillez), vous devrez les financer directement ou souscrire une assurance privée complémentaire.",
  },
  {
    question: 'Les subsides LAMal sont-ils accessibles aux frontaliers ?',
    answer:
      "Oui, sous conditions. Si vous avez opté pour la LAMal et que votre revenu global (revenus mondiaux, pas uniquement le salaire suisse) est inférieur aux seuils du canton de travail, vous pouvez bénéficier de subsides cantonaux. La demande se fait auprès du service cantonal compétent. Un justificatif de revenu du pays de résidence, traduit si nécessaire, est généralement requis.",
  },
  {
    question: 'Comment la LAMal est-elle calculée pour les frontaliers par rapport au GKV ou à la Sécurité sociale ?',
    answer:
      "La LAMal est une prime fixe mensuelle par assuré, indépendante du revenu. Elle varie selon le canton de travail, la caisse et le modèle choisi (standard, médecin de famille, Telmed). Le GKV allemand est une cotisation proportionnelle au salaire (~14,6% partagé employeur/employé, plafonné). La Sécurité sociale française est également proportionnelle. Pour les hauts revenus, la LAMal est souvent moins chère ; pour les bas revenus, le GKV ou la Sécurité sociale peuvent l'être.",
  },
  {
    question: 'Dois-je comparer les systèmes selon mon canton de travail ?',
    answer:
      "Oui, le canton de travail est déterminant. Les primes LAMal varient fortement selon le canton : le Tessin et Bâle-Ville affichent les primes les plus élevées de Suisse (environ 686 CHF et 625-668 CHF par mois respectivement pour un adulte, franchise 300 CHF, modèle standard). Genève est également élevée. À l'inverse, les cantons de Suisse centrale ont des primes plus modérées. Ce paramètre change radicalement le calcul économique.",
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

export default function FrontalierChoixAssurancePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="bg-white border-b border-edge pt-12 pb-10">
        <div className="container-xl">
          <Breadcrumb items={[
            { label: 'Accueil', href: '/' },
            { label: 'LAMal', href: '/lamal' },
            { label: 'Frontaliers', href: '/lamal/frontalier' },
            { label: 'LAMal ou pays de résidence ?' },
          ]} />
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="badge">Données OFSP · 2026</span>
          </div>
          <h1 className="text-5xl font-bold text-ink leading-tight mb-4 max-w-2xl">
            LAMal ou assurance du pays de résidence : comment choisir ?
          </h1>
          <p className="text-xl text-slate max-w-2xl leading-relaxed">
            Le droit d'option frontalier est l'une des décisions les plus structurantes de votre
            protection sociale en Suisse. Ce guide compare les deux options selon vos critères
            réels et vous propose un simulateur de décision en 5 questions.
          </p>
        </div>
      </section>

      <div className="container-xl py-16">
        <AuthorBio publishedDate="1er janvier 2026" updatedDate="22 avril 2026" />

        <div className="flex gap-12">
          <div className="flex-1 min-w-0 space-y-14">

            {/* Pourquoi ce choix est structurant */}
            <section id="pourquoi">
              <h2 className="text-2xl font-semibold text-ink mb-4">Pourquoi ce choix est structurant</h2>
              <p className="text-[16px] text-slate leading-relaxed mb-5">
                Contrairement à un simple choix de caisse ou de franchise, le droit d'option
                détermine <strong className="text-ink">quel pays prend en charge vos soins</strong> et
                selon quelles règles. Une fois exercé, il est en principe définitif. Ce choix engage
                votre famille, vos finances et votre accès concret aux soins pour toute la durée
                de votre emploi en Suisse.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-cloud border border-edge rounded-[8px] p-5">
                  <h3 className="font-semibold text-ink text-[15px] mb-2">Ce que ce choix détermine</h3>
                  <ul className="space-y-1.5 text-[13px] text-slate">
                    {[
                      'Quel système rembourse vos soins au quotidien',
                      'Où vous pouvez consulter un médecin sans avancer de frais',
                      'Comment votre famille est couverte',
                      'Votre droit éventuel aux subsides cantonaux',
                      'Ce qui se passe en cas d\'urgence dans l\'autre pays',
                    ].map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-brand font-bold shrink-0">•</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-cloud border border-edge rounded-[8px] p-5">
                  <h3 className="font-semibold text-ink text-[15px] mb-2">Délai et irréversibilité</h3>
                  <p className="text-[13px] text-slate mb-2">
                    3 mois dès le premier jour de travail en Suisse. Sans déclaration explicite
                    dans ce délai, la LAMal s'applique par défaut.
                  </p>
                  <p className="text-[13px] text-slate">
                    La révision n'est possible qu'en cas de changement de situation reconnu
                    (mariage, divorce, déménagement, retraite, perte d'emploi prolongée).
                  </p>
                </div>
              </div>
            </section>

            {/* Critères de décision */}
            <section id="criteres">
              <h2 className="text-2xl font-semibold text-ink mb-4">Les critères de décision</h2>

              <div className="overflow-x-auto border border-edge rounded-[8px] mb-5">
                <table className="stripe-table w-full">
                  <thead>
                    <tr>
                      <th>Critère</th>
                      <th>Favorable à la LAMal</th>
                      <th>Favorable au système étranger</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [
                        'Lieu de soins habituel',
                        'Vous soignez principalement en Suisse',
                        'Vous préférez vous soigner dans votre pays de résidence',
                      ],
                      [
                        'Situation familiale',
                        'Célibataire ou famille entière en Suisse',
                        'Conjoint et enfants sans revenu à couvrir (GKV, Sécu)',
                      ],
                      [
                        'Niveau de revenu',
                        'Revenu élevé (prime LAMal fixe avantageuse)',
                        'Revenu modeste (cotisations proportionnelles moins chères)',
                      ],
                      [
                        'Droits aux subsides',
                        'Revenu global < seuil cantonal (subside possible)',
                        'Pas de mécanisme de subside équivalent dans certains pays',
                      ],
                      [
                        'Canton de travail',
                        'Canton à primes modérées (Suisse centrale)',
                        'Tessin ou Bâle-Ville (primes les plus élevées)',
                      ],
                    ].map((row, i) => (
                      <tr key={i}>
                        <td className="font-semibold text-ink">{row[0]}</td>
                        <td className="text-slate">{row[1]}</td>
                        <td className="text-slate">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Ce que vous gagnez avec la LAMal */}
            <section id="avantages-lamal">
              <h2 className="text-2xl font-semibold text-ink mb-4">Ce que vous gagnez avec la LAMal</h2>

              <div className="space-y-4">
                {[
                  {
                    titre: 'Accès complet au réseau médical suisse',
                    desc: 'Médecins, spécialistes, hôpitaux, urgences : la totalité du réseau suisse vous est accessible sans avance de frais. Les soins en Suisse sont généralement d\'excellente qualité et les délais d\'attente courts. En cas de problème de santé survenant pendant vos heures de travail, vous êtes pris en charge immédiatement.',
                  },
                  {
                    titre: 'Prime fixe indépendante du revenu',
                    desc: 'Contrairement au GKV allemand ou à la Sécurité sociale française, la prime LAMal ne dépend pas de votre salaire. Pour un frontalier à revenu moyen ou élevé, cela peut représenter une économie substantielle par rapport à une cotisation proportionnelle au salaire.',
                  },
                  {
                    titre: 'Accès aux subsides cantonaux',
                    desc: 'Si votre revenu global est inférieur aux seuils du canton de travail, vous pouvez bénéficier de subsides cantonaux réduisant significativement votre prime mensuelle. Ce mécanisme n\'a pas d\'équivalent direct dans les systèmes proportionnels étrangers.',
                  },
                ].map((item, i) => (
                  <div key={i} className="border border-edge rounded-[8px] p-5 bg-white">
                    <h3 className="font-semibold text-ink text-[15px] mb-2">{item.titre}</h3>
                    <p className="text-[14px] text-slate">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Ce que vous perdez avec la LAMal */}
            <section id="inconvenients-lamal">
              <h2 className="text-2xl font-semibold text-ink mb-4">Ce que vous perdez avec la LAMal</h2>

              <div className="space-y-4">
                {[
                  {
                    titre: 'Soins dans votre pays de résidence limités aux urgences',
                    desc: 'Avec la LAMal, vous n\'avez pas de couverture pour les soins programmés dans votre pays de résidence. Une consultation chez votre médecin habituel en France, Allemagne ou Italie n\'est pas remboursée. Cela peut poser problème pour des soins de confort, de prévention ou pour des pathologies chroniques que vous avez l\'habitude de gérer localement.',
                  },
                  {
                    titre: 'Prime individuelle par membre de la famille',
                    desc: 'Chaque membre de la famille doit avoir son propre contrat LAMal. Si votre conjoint ou vos enfants ne travaillent pas et résident dans votre pays d\'origine, ils ne sont pas couverts par la LAMal. Avec le GKV allemand ou la Sécurité sociale française, les membres de la famille sans revenu peuvent être couverts gratuitement ou à coût réduit.',
                  },
                  {
                    titre: 'Primes élevées dans certains cantons',
                    desc: 'Le Tessin, Bâle-Ville et Genève affichent des primes LAMal parmi les plus élevées de Suisse. Dans ces cantons, la prime mensuelle peut dépasser 600 à 700 CHF par mois par adulte en modèle standard avec franchise minimale. Ce facteur peut rendre le système étranger financièrement plus attractif, surtout pour les familles avec enfants.',
                  },
                ].map((item, i) => (
                  <div key={i} className="border border-edge rounded-[8px] p-5 bg-white">
                    <h3 className="font-semibold text-ink text-[15px] mb-2">{item.titre}</h3>
                    <p className="text-[14px] text-slate">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="callout text-[15px] mt-5">
                <strong>Solution pratique :</strong> certains frontaliers optant pour la LAMal
                conservent une assurance complémentaire privée dans leur pays de résidence pour
                couvrir les soins programmés hors urgences. Cela entraîne un coût supplémentaire
                mais offre une couverture complète dans les deux pays.
              </div>
            </section>

            {/* Simulateur */}
            <section id="simulateur">
              <h2 className="text-2xl font-semibold text-ink mb-4">Simulateur de décision</h2>
              <p className="text-[16px] text-slate leading-relaxed mb-6">
                Répondez à 5 questions pour obtenir une recommandation personnalisée. Ce simulateur
                ne remplace pas un conseil expert, mais vous aide à identifier les critères
                les plus importants pour votre situation.
              </p>
              <FrontalierSimulateur />
            </section>

            <FAQ items={faqItems} />

            <section>
              <h3 className="text-[16px] font-semibold text-ink mb-3">Guides par nationalité</h3>
              <div className="flex flex-col gap-2">
                {[
                  { href: '/lamal/frontalier-france', label: 'Frontaliers français : LAMal ou Sécurité sociale ?' },
                  { href: '/lamal/frontalier-allemagne', label: 'Frontaliers allemands : LAMal ou GKV ?' },
                  { href: '/lamal/frontalier-italie', label: 'Frontaliers italiens : LAMal ou SSN ?' },
                  { href: '/lamal/frontalier', label: 'Hub frontaliers' },
                  { href: '/lamal/guide', label: 'Guide complet LAMal 2026' },
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
