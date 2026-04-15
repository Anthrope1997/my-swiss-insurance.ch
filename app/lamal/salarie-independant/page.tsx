import type { Metadata } from 'next'
import AuthorBio from '@/components/AuthorBio'
import Breadcrumb from '@/components/Breadcrumb'
import FAQ from '@/components/FAQ'
import LeadForm from '@/components/LeadForm'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'LAMal salarié, indépendant et chômage — Conseils 2026',
  description: 'LAMal selon votre situation professionnelle : salarié, indépendant, freelance ou au chômage. Franchise optimale, subsides et obligations 2026.',
  openGraph: {
    title: 'LAMal selon votre situation professionnelle en Suisse 2026',
    description: 'Conseils LAMal pour salariés, indépendants et personnes au chômage en Suisse romande.',
    url: 'https://my-swiss-insurance.ch/lamal/salarie-independant',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'LAMal selon votre situation professionnelle en Suisse',
  datePublished: '2026-01-01',
  dateModified: '2026-04-13',
  author: { '@type': 'Organization', name: 'La rédaction My Swiss Insurance' },
  publisher: { '@type': 'Organization', name: 'My Swiss Insurance' },
}

const faqItems = [
  {
    question: 'Un indépendant doit-il souscrire une LAA en plus de la LAMal ?',
    answer: "Oui. Les indépendants ne sont pas couverts automatiquement par la LAA (assurance accidents) comme les salariés. Ils doivent souscrire une LAA volontaire auprès d'une caisse agréée. Sans LAA, les accidents professionnels et de loisirs sont à la charge de la LAMal uniquement, avec des lacunes de couverture importantes.",
  },
  {
    question: 'Peut-on déduire les primes LAMal de ses impôts en tant qu\'indépendant ?',
    answer: "Oui, partiellement. Les primes LAMal sont déductibles du revenu imposable à hauteur d'un montant forfaitaire fixé par le canton et l'administration fédérale. Pour un indépendant, ces déductions sont particulièrement utiles car aucun employeur ne prend en charge une partie des cotisations.",
  },
  {
    question: 'Puis-je changer de franchise en cas de chômage ?',
    answer: "Vous pouvez changer de franchise au 1er janvier de chaque année avec un préavis avant le 30 novembre. En cas de changement de situation (perte d'emploi), il est conseillé de vérifier votre droit aux subsides cantonaux rapidement — les revenus réduits ouvrent souvent des droits supplémentaires.",
  },
]

const DISCLAIMER = (
  <div className="text-xs text-[#475569] bg-[#f1f5f9] border border-[#e2e8f0] rounded px-3 py-2 mb-6">
    Données indicatives à titre illustratif. Les primes exactes sont disponibles sur{' '}
    <a href="https://www.priminfo.admin.ch" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#0f2040]">priminfo.admin.ch</a>{' '}
    — comparateur officiel de l'OFSP.
  </div>
)

export default function SalarieIndependantPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <section className="bg-white border-b border-[#e2e8f0] pt-12 pb-10">
        <div className="container-xl">
          <Breadcrumb
            items={[
              { label: 'Accueil', href: '/' },
              { label: 'LAMal', href: '/lamal' },
              { label: 'Salarié, indépendant ou au chômage' },
            ]}
          />
          <h1 className="text-5xl font-bold text-[#0f2040] leading-tight mb-4 max-w-2xl">
            LAMal selon votre situation professionnelle en Suisse.
          </h1>
          <p className="text-xl text-[#475569] max-w-2xl leading-relaxed">
            Salarié, indépendant ou au chômage : votre statut professionnel influe
            directement sur le choix optimal de votre couverture maladie.
          </p>
        </div>
      </section>

      <div className="container-xl py-16">
        {DISCLAIMER}
        <AuthorBio publishedDate="1er janvier 2026" updatedDate="13 avril 2026" />

        <div className="flex gap-12">
          <div className="flex-1 min-w-0 space-y-14">

            {/* Salarié */}
            <section id="salarie">
              <h2 className="text-2xl font-semibold text-[#0f2040] mb-4">LAMal pour les salariés</h2>
              <p className="text-[16px] text-[#475569] leading-relaxed mb-5">
                Le salarié est dans la situation standard : couverture LAMal obligatoire,
                LAA (assurance accidents) automatiquement couverte par l'employeur
                pour les accidents professionnels et de loisirs (dès 8h/semaine).
              </p>
              <ul className="space-y-3">
                {[
                  { t: 'Franchise recommandée selon fréquence des soins', d: 'Franchise 300 CHF si soins réguliers ; 2500 CHF si rarement malade. Le break-even se situe autour de 1 300 CHF de frais annuels.' },
                  { t: 'Modèle médecin de famille = économie de 12%', d: 'Pour un salarié avec un médecin de famille déjà établi, ce modèle réduit la prime sans limiter la qualité des soins.' },
                  { t: 'Droit aux subsides selon revenu', d: "Si votre revenu déterminant ne dépasse pas le seuil cantonal, vous avez droit à une réduction de prime. Vérifiez sur le site de votre canton." },
                  { t: 'Attention à l\'arrêt de travail', d: 'La LAMal ne couvre pas le revenu pendant un arrêt maladie. Une assurance perte de gain (indemnités journalières) est recommandée si votre employeur ne la propose pas.' },
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <svg className="w-4 h-4 text-[#1d4ed8] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <div>
                      <span className="font-semibold text-[#0f2040] text-[15px]">{item.t} : </span>
                      <span className="text-[#475569] text-[15px]">{item.d}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Indépendant */}
            <section id="independant">
              <h2 className="text-2xl font-semibold text-[#0f2040] mb-4">
                LAMal pour les indépendants et freelances
              </h2>
              <p className="text-[16px] text-[#475569] leading-relaxed mb-5">
                Contrairement au salarié, l'indépendant supporte l'intégralité de sa prime LAMal
                et doit prévoir lui-même sa couverture accidents.
              </p>
              <div className="bg-[#fff7ed] border border-[#fed7aa] rounded-[8px] p-5 mb-5">
                <p className="font-semibold text-[#0f2040] mb-1">Point d'attention : LAA volontaire</p>
                <p className="text-[15px] text-[#475569]">
                  Les indépendants ne sont pas couverts automatiquement par la LAA (accidents).
                  Sans LAA volontaire, vous êtes exposé en cas d'accident professionnel ou de loisirs.
                </p>
              </div>
              <ul className="space-y-3">
                {[
                  { t: 'Franchise élevée souvent avantageuse', d: 'Si votre trésorerie le permet, une franchise 2000–2500 CHF réduit la prime mensuelle de ~25–30%. Provisionnez la différence sur un compte épargne.' },
                  { t: 'Déductibilité fiscale des primes', d: 'Les primes LAMal sont partiellement déductibles de votre revenu imposable. Montant forfaitaire variable selon le canton.' },
                  { t: 'Modèle Telmed ou HMO recommandé', d: "Peut réduire la prime jusqu'à −24% selon la caisse et le canton. Adapté aux indépendants qui restent proactifs sur leur santé et ont accès à la téléconsultation." },
                  { t: 'Vérifiez les subsides chaque année', d: 'Les revenus variables des indépendants peuvent ouvrir des droits certaines années. Vérifiez chaque printemps après votre déclaration d\'impôts.' },
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <svg className="w-4 h-4 text-[#1d4ed8] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <div>
                      <span className="font-semibold text-[#0f2040] text-[15px]">{item.t} : </span>
                      <span className="text-[#475569] text-[15px]">{item.d}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Chômage */}
            <section id="chomeur">
              <h2 className="text-2xl font-semibold text-[#0f2040] mb-4">LAMal en cas de chômage</h2>
              <p className="text-[16px] text-[#475569] leading-relaxed mb-5">
                La LAMal reste obligatoire même en cas de chômage. Votre couverture ne
                s'interrompt pas, mais votre situation financière réduite ouvre de nouveaux droits.
              </p>
              <ul className="space-y-3">
                {[
                  { t: 'Droit renforcé aux subsides', d: 'La baisse de revenus lors du chômage ouvre généralement des droits aux subsides cantonaux. Faites la demande auprès de votre service cantonal dès la prise en charge par le chômage.' },
                  { t: 'Possibilité d\'ajuster la franchise', d: 'Vous pouvez changer de franchise au 1er janvier. Si vous entrez au chômage en cours d\'année, planifiez le changement pour janvier suivant.' },
                  { t: 'LAA accident couverte par le chômage', d: "Pendant la période d'indemnisation, les accidents sont couverts par la LAA via l'assurance chômage. Cette couverture cesse 30 jours après la fin du droit aux indemnités." },
                  { t: 'Contactez votre ORP', d: "L'office régional de placement peut vous orienter vers des aides pour les primes d'assurance maladie pendant la période de chômage." },
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <svg className="w-4 h-4 text-[#1d4ed8] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <div>
                      <span className="font-semibold text-[#0f2040] text-[15px]">{item.t} : </span>
                      <span className="text-[#475569] text-[15px]">{item.d}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <FAQ items={faqItems} />

            {/* Liens internes */}
            <section>
              <h3 className="text-[16px] font-semibold text-[#0f2040] mb-3">Voir aussi</h3>
              <div className="flex flex-col gap-2">
                {[
                  { href: '/lamal/famille-retraite', label: 'LAMal pour les familles et retraités' },
                  { href: '/lamal/expatrie-frontalier', label: 'LAMal pour les expatriés et frontaliers' },
                  { href: '/lamal/guide', label: 'Guide complet LAMal 2026' },
                ].map((link) => (
                  <Link key={link.href} href={link.href}
                    className="text-[15px] text-[#1d4ed8] hover:underline flex items-center gap-1">
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
              <LeadForm compact />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
