import type { Metadata } from 'next'
import AuthorBio from '@/components/AuthorBio'
import Breadcrumb from '@/components/Breadcrumb'
import FAQ from '@/components/FAQ'
import LeadForm from '@/components/LeadForm'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'LAMal famille, étudiant et retraité — Conseils 2026',
  description: 'LAMal adaptée à chaque étape de la vie : familles avec enfants, étudiants, jeunes adultes et retraités en Suisse romande. Conseils et franchise optimale 2026.',
  openGraph: {
    title: 'LAMal pour les familles et les retraités en Suisse romande 2026',
    description: 'Conseils LAMal personnalisés pour familles, étudiants et seniors en Suisse.',
    url: 'https://my-swiss-insurance.ch/lamal/famille-retraite',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'LAMal pour les familles et les retraités en Suisse romande',
  datePublished: '2026-01-01',
  dateModified: '2026-04-13',
  author: { '@type': 'Organization', name: 'La rédaction My Swiss Insurance' },
  publisher: { '@type': 'Organization', name: 'My Swiss Insurance' },
}

const faqItems = [
  {
    question: 'Y a-t-il une assurance familiale LAMal groupée en Suisse ?',
    answer: "Non. En Suisse, chaque membre de la famille dispose de son propre contrat LAMal individuel. Il n'existe pas d'assurance familiale groupée. Vous pouvez cependant choisir la même caisse pour toute la famille, ce qui simplifie la gestion et peut donner droit à des remises chez certains assureurs.",
  },
  {
    question: 'Quelle franchise choisir pour un étudiant de 19 à 25 ans ?',
    answer: "Pour un étudiant en bonne santé, la franchise 2500 CHF est souvent recommandée car elle réduit la prime mensuelle de ~80–100 CHF. Si vous avez des soins réguliers (orthodontie, médecin fréquent), préférez la franchise 300 CHF. Le break-even se situe autour de 1 300 CHF de frais médicaux annuels.",
  },
  {
    question: 'Les retraités paient-ils une prime LAMal plus élevée ?',
    answer: "Il n'existe pas de tarif spécifique \"senior\" en LAMal. Le tarif adulte s'applique dès 26 ans et ne change plus avec l'âge. En revanche, les retraités à revenus modestes peuvent bénéficier des subsides cantonaux. La franchise 300 CHF est généralement recommandée car les frais médicaux augmentent avec l'âge.",
  },
]

const DISCLAIMER = (
  <div className="text-xs text-[#475569] bg-[#f1f5f9] border border-[#e2e8f0] rounded px-3 py-2 mb-6">
    Données indicatives à titre illustratif. Les primes exactes sont disponibles sur{' '}
    <a href="https://www.priminfo.admin.ch" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#0f2040]">priminfo.admin.ch</a>{' '}
    — comparateur officiel de l'OFSP.
  </div>
)

export default function FamilleRetraitePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <section className="bg-white border-b border-[#e2e8f0] pt-12 pb-10">
        <div className="container-xl">
          <Breadcrumb
            items={[
              { label: 'Accueil', href: '/' },
              { label: 'LAMal', href: '/lamal' },
              { label: 'Famille, étudiant et retraité' },
            ]}
          />
          <h1 className="text-5xl font-bold text-[#0f2040] leading-tight mb-4 max-w-2xl">
            LAMal pour les familles et les retraités en Suisse romande.
          </h1>
          <p className="text-xl text-[#475569] max-w-2xl leading-relaxed">
            Enfants, étudiants, parents ou seniors : chaque étape de la vie appelle
            une stratégie LAMal différente.
          </p>
        </div>
      </section>

      <div className="container-xl py-16">
        {DISCLAIMER}
        <AuthorBio publishedDate="1er janvier 2026" updatedDate="13 avril 2026" />

        <div className="flex gap-12">
          <div className="flex-1 min-w-0 space-y-14">

            {/* Famille */}
            <section id="famille">
              <h2 className="text-2xl font-semibold text-[#0f2040] mb-4">
                LAMal pour les familles avec enfants
              </h2>
              <p className="text-[16px] text-[#475569] leading-relaxed mb-5">
                Chaque enfant dispose de son propre contrat LAMal individuel — il n'y a pas
                d'assurance familiale groupée en Suisse. La prime enfant (0–18 ans) est nettement
                inférieure à la prime adulte.
              </p>
              <ul className="space-y-3">
                {[
                  { t: 'Franchise 0–100 CHF recommandée pour les enfants', d: 'Les enfants tombent souvent malades. Une franchise basse limite les restes à charge. La différence de prime est faible pour cette tranche d\'âge.' },
                  { t: 'Modèle médecin de famille pour les adultes', d: 'Réduit la prime de 5 à 15%. Recommandé si vous avez déjà un médecin de famille établi — maintient la continuité des soins.' },
                  { t: 'Subsides enfants cumulables', d: 'Les enfants ont des droits aux subsides distincts des parents. Dans certains cantons, les primes enfants sont totalement prises en charge sous certains seuils de revenus.' },
                  { t: 'Comparez caisse par caisse', d: 'La caisse la moins chère pour vous ne l\'est pas forcément pour vos enfants. Utilisez priminfo.ch pour comparer par membre de la famille.' },
                  { t: 'Même caisse pour toute la famille', d: 'Certains assureurs proposent des remises si plusieurs membres d\'une même famille sont assurés chez eux. Renseignez-vous lors de la souscription.' },
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

            {/* Étudiant */}
            <section id="etudiant">
              <h2 className="text-2xl font-semibold text-[#0f2040] mb-4">
                LAMal pour les étudiants et jeunes adultes
              </h2>
              <p className="text-[16px] text-[#475569] leading-relaxed mb-5">
                Les 19–25 ans bénéficient d'une catégorie tarifaire intermédiaire entre enfant et adulte,
                avec des primes moins élevées que les adultes de 26 ans et plus.
              </p>
              <ul className="space-y-3">
                {[
                  { t: 'Primes réduites 19–25 ans', d: 'La prime est environ 20–25% moins élevée que pour un adulte de 26 ans. Comparez les caisses séparément pour cette tranche.' },
                  { t: 'Franchise 2500 CHF recommandée si bonne santé', d: 'Économie de ~80–100 CHF/mois sur la prime. À retenir si vous êtes rarement malade et avez une trésorerie suffisante pour absorber la franchise.' },
                  { t: 'Vérifiez votre droit aux subsides', d: 'Les étudiants à revenus modestes (y.c. ceux dont les parents ont des revenus limités) peuvent avoir droit aux subsides. La bourse d\'études est un revenu déterminant réduit dans certains cantons.' },
                  { t: 'Modèle Telmed ou HMO adapté', d: 'Les étudiants sont généralement à l\'aise avec les outils digitaux. Le modèle Telmed (consultation médicale par téléphone/app) réduit la prime de 15–20%.' },
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

            {/* Retraité */}
            <section id="retraite">
              <h2 className="text-2xl font-semibold text-[#0f2040] mb-4">
                LAMal pour les retraités
              </h2>
              <p className="text-[16px] text-[#475569] leading-relaxed mb-5">
                Le tarif adulte s'applique dès 26 ans et reste identique quel que soit l'âge.
                Les retraités n'ont donc pas de prime réduite, mais ont souvent droit aux subsides.
              </p>
              <div className="bg-[#fff7ed] border border-[#fed7aa] rounded-[8px] p-5 mb-5">
                <p className="font-semibold text-[#0f2040] mb-1">LCA hospitalière fortement recommandée</p>
                <p className="text-[15px] text-[#475569]">
                  La LAMal de base couvre uniquement la division commune à l'hôpital.
                  Une LCA hospitalière (chambre semi-privée ou privée) garantit le libre choix
                  du médecin chef, très important pour les soins fréquents liés à l'âge.
                </p>
              </div>
              <ul className="space-y-3">
                {[
                  { t: 'Franchise 300 CHF généralement recommandée', d: 'Les frais médicaux augmentent avec l\'âge. La franchise basse devient rapidement avantageuse dès que les dépenses médicales annuelles dépassent 1 300 CHF.' },
                  { t: 'Modèle médecin de famille pour la continuité des soins', d: 'Réduit la prime de 5 à 15% tout en maintenant un suivi médical coordonné avec un médecin de confiance.' },
                  { t: 'Vérifiez votre droit aux subsides', d: 'Beaucoup de retraités y ont droit mais ne le savent pas. Renseignez-vous auprès de votre service communal ou cantonal.' },
                  { t: 'Planifiez les primes dans votre budget retraite', d: 'Les primes LAMal représentent souvent 10–15% du revenu d\'une retraite AVS. Prévoir ce poste dans la planification financière.' },
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

            <section>
              <h3 className="text-[16px] font-semibold text-[#0f2040] mb-3">Voir aussi</h3>
              <div className="flex flex-col gap-2">
                {[
                  { href: '/lamal/salarie-independant', label: 'LAMal pour salariés et indépendants' },
                  { href: '/lamal/expatrie-frontalier', label: 'LAMal pour expatriés et frontaliers' },
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
