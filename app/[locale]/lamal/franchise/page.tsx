import type { Metadata } from 'next'
import AuthorBio from '@/components/ui/AuthorBio'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FAQ from '@/components/ui/FAQ'
import Link from 'next/link'
import MultiStepLeadForm from '@/components/ui/MultiStepLeadForm'

export const metadata: Metadata = {
  title: 'Franchise LAMal 2026 : quel montant choisir ? Seuils d\'équilibre calculés',
  description:
    'Franchise LAMal 300 à 2500 CHF : tableau des seuils d\'équilibre, différence avec la quote-part, franchise enfant et changement. Guide complet 2026.',
  openGraph: {
    title: 'Franchise LAMal 2026 : quel montant choisir ?',
    description: 'Franchise LAMal : seuils d\'équilibre, quote-part, enfants. Guide 2026.',
    url: 'https://my-swiss-insurance.ch/lamal/franchise',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Franchise LAMal 2026 : quel montant choisir ?',
  datePublished: '2026-01-01',
  dateModified: '2026-04-22',
  author: { '@type': 'Organization', name: 'My Swiss Insurance' },
  publisher: { '@type': 'Organization', name: 'My Swiss Insurance' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://my-swiss-insurance.ch/lamal/franchise' },
}

const faqItems = [
  {
    question: 'Quelle franchise LAMal choisir en 2026 ?',
    answer:
      "Choisissez la franchise 300 CHF si vos frais médicaux annuels dépassent environ CHF 1'440. Optez pour 2500 CHF si vous êtes en bonne santé : vous économisez ~CHF 120/mois sur la prime mais assumez jusqu'à CHF 2'500 de frais. Le seuil d'équilibre entre les deux franchises extrêmes se situe autour de CHF 1'440 de dépenses médicales annuelles.",
  },
  {
    question: "Peut-on changer de franchise en cours d'année ?",
    answer:
      "Non. La franchise ne peut être modifiée qu'au 1er janvier de chaque année. L'avis doit parvenir à votre caisse avant le 30 novembre. Pour passer d'une franchise élevée à la franchise 300 CHF, la même date limite s'applique.",
  },
  {
    question: "Quelle est la différence entre la franchise et la quote-part ?",
    answer:
      "La franchise est le montant fixe annuel que vous payez entièrement avant que l'assurance intervienne (300 à 2500 CHF). La quote-part est la participation de 10% que vous payez sur les frais dépassant la franchise, jusqu'à un maximum de CHF 700/an pour un adulte et CHF 350 pour un enfant.",
  },
  {
    question: "Quelle franchise recommander pour un enfant ?",
    answer:
      "Pour les enfants (0–18 ans), la franchise minimale de 0 CHF est recommandée. Les enfants consultent fréquemment : l'économie sur la prime ne compense généralement pas le risque d'un reste à charge élevé. Les franchises enfants disponibles sont 0, 100, 200, 300, 400 et 600 CHF.",
  },
  {
    question: "La franchise s'applique-t-elle à chaque prestation ?",
    answer:
      "Non, la franchise est annuelle. Une fois épuisée, l'assurance prend en charge tous les soins supplémentaires (après quote-part de 10%). Elle se réinitialise automatiquement le 1er janvier de chaque année.",
  },
  {
    question: "La maternité est-elle soumise à la franchise ?",
    answer:
      "Non. Les prestations liées à la maternité (accouchement, consultations prénatales, soins post-partum sur liste OFSP) sont exonérées de franchise et de quote-part. Aucun reste à charge n'est demandé à la mère pour ces prestations.",
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

const franchises = [
  { montant: 300,  prime: 564.61, ecMois: 0,      ecAnn: 0,    breakEven: '—',             conseil: 'Recommandé si frais > CHF 1\'440/an' },
  { montant: 500,  prime: 554.03, ecMois: 10.58,  ecAnn: 127,  breakEven: '~CHF 300',      conseil: 'Avantage limité' },
  { montant: 1000, prime: 526.57, ecMois: 38.04,  ecAnn: 456,  breakEven: '~CHF 800',      conseil: 'Bon si peu de consultations' },
  { montant: 1500, prime: 499.20, ecMois: 65.41,  ecAnn: 785,  breakEven: '~CHF 1\'100',   conseil: 'Bon équilibre pour personnes saines' },
  { montant: 2000, prime: 471.82, ecMois: 92.79,  ecAnn: 1113, breakEven: '~CHF 1\'300',   conseil: 'Recommandé sans maladie chronique' },
  { montant: 2500, prime: 444.63, ecMois: 119.98, ecAnn: 1440, breakEven: '~CHF 1\'440',   conseil: 'Optimal pour adultes très sains' },
]

export default function FranchisePage() {
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
              { label: 'Franchise LAMal' },
            ]}
          />
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="badge">Données OFSP · 2026</span>
          </div>
          <h1 className="text-5xl font-bold text-ink leading-tight mb-4 max-w-2xl">
            Franchise LAMal : quel montant choisir en 2026 ?
          </h1>
          <p className="text-xl text-slate max-w-2xl leading-relaxed">
            La franchise est le montant annuel que vous payez avant que votre caisse intervienne.
            Bien choisir sa franchise peut vous faire économiser CHF 100 à CHF 120 par mois — ou au
            contraire vous exposer à un reste à charge élevé si vous tombez malade.
          </p>
        </div>
      </section>

      <div className="container-xl py-16">
        <AuthorBio publishedDate="1er janvier 2026" updatedDate="22 avril 2026" />

        <div className="flex gap-12">
          <div className="flex-1 min-w-0 space-y-14">

            {/* Franchise vs quote-part */}
            <section id="definition">
              <h2 className="text-2xl font-semibold text-ink mb-4">Franchise et quote-part : quelle différence ?</h2>
              <p className="text-[16px] text-slate leading-relaxed mb-5">
                Ces deux mécanismes définissent votre participation financière aux soins. Ils sont
                cumulables dans l'année, mais chacun a un plafond propre.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                <div className="bg-cloud border border-edge rounded-[8px] p-6">
                  <h3 className="font-semibold text-ink mb-3 text-[16px]">Franchise</h3>
                  <ul className="space-y-2 text-[14px] text-slate">
                    <li>• Montant fixe annuel : 300 à 2500 CHF (adulte)</li>
                    <li>• Vous payez 100% des frais jusqu'à ce montant</li>
                    <li>• Choisie une fois par an (avant le 30 nov.)</li>
                    <li>• Plus la franchise est haute, plus la prime est basse</li>
                  </ul>
                </div>
                <div className="bg-white border border-edge rounded-[8px] p-6">
                  <h3 className="font-semibold text-ink mb-3 text-[16px]">Quote-part</h3>
                  <ul className="space-y-2 text-[14px] text-slate">
                    <li>• 10% des frais dépassant la franchise</li>
                    <li>• Plafond : CHF 700/an (adulte), CHF 350 (enfant)</li>
                    <li>• Automatique, non modifiable</li>
                    <li>• Maximum total : franchise + CHF 700</li>
                  </ul>
                </div>
              </div>
              <div className="callout text-[15px]">
                <strong>Exemple concret :</strong> Vous avez une franchise 1500 CHF et CHF 2'000 de frais médicaux.
                Vous payez : CHF 1'500 (franchise) + 10% × CHF 500 = CHF 50 (quote-part) = <strong>CHF 1'550 au total</strong>.
                Votre caisse prend en charge CHF 450.
              </div>
            </section>

            {/* Tableau seuil d'équilibre */}
            <section id="tableau">
              <h2 className="text-2xl font-semibold text-ink mb-4">
                Tableau des franchises avec seuil d'équilibre (Zurich, adulte, modèle standard)
              </h2>
              <p className="text-[15px] text-slate mb-5">
                Le <strong>seuil d'équilibre</strong> indique le niveau de frais médicaux annuels à partir
                duquel il vaut mieux avoir la franchise 300 CHF plutôt que la franchise indiquée.
                En dessous de ce seuil, la franchise élevée est plus avantageuse.
              </p>
              <div className="overflow-x-auto border border-edge rounded-[8px] mb-4">
                <table className="stripe-table w-full">
                  <thead>
                    <tr>
                      <th>Franchise</th>
                      <th className="text-right">Prime/mois</th>
                      <th className="text-right">Éco. prime/mois</th>
                      <th className="text-right hidden sm:table-cell">Éco. prime/an</th>
                      <th className="text-center hidden sm:table-cell">Seuil d'équilibre</th>
                      <th className="hidden md:table-cell">Profil recommandé</th>
                    </tr>
                  </thead>
                  <tbody>
                    {franchises.map((f) => (
                      <tr key={f.montant}>
                        <td className="font-bold text-brand">CHF {f.montant.toLocaleString('fr-CH')}</td>
                        <td className="text-right text-ink">CHF {f.prime.toFixed(2)}</td>
                        <td className="text-right font-medium text-[#1d4ed8]">
                          {f.ecMois > 0 ? `−CHF ${f.ecMois.toFixed(2)}` : '—'}
                        </td>
                        <td className="text-right font-medium text-[#1d4ed8] hidden sm:table-cell">
                          {f.ecAnn > 0 ? `−CHF ${f.ecAnn}` : '—'}
                        </td>
                        <td className="text-center font-medium hidden sm:table-cell">{f.breakEven}</td>
                        <td className="text-[13px] text-slate hidden md:table-cell">{f.conseil}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[13px] text-slate/60 mb-6">
                Primes indicatives 2026, adulte 26 ans+, Zurich, modèle standard. Source : OFSP.
              </p>

              <div className="callout">
                <p className="font-semibold text-ink mb-2">Comment lire le seuil d'équilibre ?</p>
                <p className="text-[15px] mb-2">
                  <strong>Franchise 300 vs 2500 CHF :</strong> économie annuelle sur la prime = CHF 1'440.
                  Si vos frais médicaux annuels dépassent CHF 1'440, la franchise 300 CHF est plus avantageuse.
                  En dessous, la franchise 2500 CHF vous fait économiser de l'argent au total.
                </p>
                <p className="text-[15px]">
                  <strong>Règle pratique :</strong> si vous n'êtes jamais malade, prenez la franchise maximale.
                  Si vous suivez un traitement régulier (chronique, physio, etc.), la franchise 300 CHF est souvent préférable.
                </p>
              </div>
            </section>

            {/* Franchise enfant */}
            <section id="enfants">
              <h2 className="text-2xl font-semibold text-ink mb-4">Franchise pour les enfants (0–18 ans)</h2>
              <p className="text-[16px] text-slate leading-relaxed mb-5">
                Les franchises enfants sont distinctes des franchises adultes. Elles vont de 0 à 600 CHF
                et la quote-part est plafonnée à CHF 350/an (contre CHF 700 pour un adulte).
              </p>
              <div className="bg-[#f0fdf4] border border-[#86efac] rounded-[8px] p-5 mb-5">
                <p className="font-semibold text-ink mb-1">Recommandation générale</p>
                <p className="text-[15px] text-slate">
                  La franchise 0 CHF est recommandée pour les jeunes enfants qui consultent fréquemment.
                  À partir de l'adolescence (15–18 ans), une franchise plus élevée peut être envisagée
                  si l'enfant est en bonne santé.
                </p>
              </div>
              <div className="overflow-x-auto border border-edge rounded-[8px]">
                <table className="stripe-table w-full">
                  <thead>
                    <tr>
                      <th>Franchise enfant</th>
                      <th className="text-center">Profil</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['CHF 0', 'Nourrissons et enfants en bas âge, consultations fréquentes'],
                      ['CHF 100', 'Enfants avec quelques consultations par an'],
                      ['CHF 200 – 300', 'Enfants en bonne santé, quelques visites annuelles'],
                      ['CHF 400 – 600', 'Adolescents robustes, rarement malades'],
                    ].map(([fr, profil], i) => (
                      <tr key={i}>
                        <td className="font-semibold text-brand">{fr}</td>
                        <td className="text-slate">{profil}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Changement de franchise */}
            <section id="changement">
              <h2 className="text-2xl font-semibold text-ink mb-4">Comment changer de franchise ?</h2>
              <div className="space-y-4">
                {[
                  {
                    n: '01',
                    title: 'Avant le 30 novembre',
                    desc: 'Informez votre caisse par écrit (lettre ou espace client en ligne) de votre souhait de changer de franchise pour l\'année suivante.',
                  },
                  {
                    n: '02',
                    title: 'Prise d\'effet au 1er janvier',
                    desc: 'La nouvelle franchise s\'applique dès le 1er janvier. Toutes les dépenses médicales de l\'année précédente ont été calculées avec l\'ancienne franchise.',
                  },
                  {
                    n: '03',
                    title: 'Franchise et changement de caisse',
                    desc: 'Si vous changez de caisse, vous choisissez simultanément votre franchise chez la nouvelle caisse. Le processus se fait en une seule démarche.',
                  },
                ].map(step => (
                  <div key={step.n} className="flex gap-5">
                    <div className="text-[26px] font-bold text-brand leading-none shrink-0 w-10 text-right">
                      {step.n}
                    </div>
                    <div className="pt-0.5">
                      <h3 className="font-semibold text-ink text-[16px] mb-1">{step.title}</h3>
                      <p className="text-[15px] text-slate">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5">
                <Link href="/lamal/changer-de-caisse"
                  className="text-brand hover:underline text-[15px] font-medium">
                  Guide complet : changer de caisse maladie →
                </Link>
              </div>
            </section>

            <FAQ items={faqItems} />

            <section>
              <h3 className="text-[16px] font-semibold text-ink mb-3">Voir aussi</h3>
              <div className="flex flex-col gap-2">
                {[
                  { href: '/lamal/modeles', label: 'Modèles LAMal : quel modèle choisir ?' },
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
