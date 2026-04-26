import type { Metadata } from 'next'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FAQ from '@/components/ui/FAQ'
import Link from 'next/link'
import MultiStepLeadForm from '@/components/ui/MultiStepLeadForm'

export const metadata: Metadata = {
  title: "Franchise LAMal 2026 : quel montant choisir — My Swiss Insurance",
  description:
    "6 niveaux de franchise LAMal, de 300 à 2 500 CHF par an. Tableau des seuils d'équilibre, franchise enfant et délais de changement. Guide complet 2026.",
  openGraph: {
    title: 'Franchise LAMal 2026 : quel montant choisir ?',
    description: "Franchise LAMal : seuils d'équilibre, quote-part, enfants. Guide 2026.",
    url: 'https://my-swiss-insurance.ch/lamal/franchise',
    type: 'article',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil',        item: 'https://my-swiss-insurance.ch/fr' },
    { '@type': 'ListItem', position: 2, name: 'LAMal',          item: 'https://my-swiss-insurance.ch/fr/lamal' },
    { '@type': 'ListItem', position: 3, name: 'Franchise LAMal', item: 'https://my-swiss-insurance.ch/fr/lamal/franchise' },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Franchise LAMal 2026 : quel montant choisir ?',
  datePublished: '2026-01-01',
  dateModified: '2026-04-22',
  author: { '@type': 'Organization', name: 'My Swiss Insurance', url: 'https://my-swiss-insurance.ch' },
  publisher: { '@type': 'Organization', name: 'My Swiss Insurance' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://my-swiss-insurance.ch/fr/lamal/franchise' },
}

const faqItems = [
  {
    question: 'Quelle franchise LAMal choisir en 2026 ?',
    answer:
      "Choisissez la franchise 300 CHF si vos frais médicaux annuels dépassent environ CHF 1'440 par an. Optez pour la franchise 2 500 CHF si vous êtes en bonne santé : vous économisez environ CHF 120 par mois sur la prime mais vous assumez jusqu'à CHF 2'500 par an de frais médicaux. Le seuil d'équilibre entre les deux franchises extrêmes se situe autour de CHF 1'440 par an.",
  },
  {
    question: "Peut-on changer de franchise en cours d'année ?",
    answer:
      "Non. La franchise ne peut être modifiée qu'au 1er janvier de chaque année. La demande doit parvenir à votre caisse avant le 30 novembre. Pour passer d'une franchise élevée à la franchise 300 CHF, la même date limite s'applique.",
  },
  {
    question: "Quelle est la différence entre la franchise et la quote-part ?",
    answer:
      "La franchise est le montant fixe annuel que vous payez entièrement avant que l'assurance intervienne (300 à 2 500 CHF par an). La quote-part est la participation de 10% que vous payez sur les frais dépassant la franchise, jusqu'à un maximum de CHF 700 par an pour un adulte et CHF 350 par an pour un enfant.",
  },
  {
    question: "Quelle franchise recommander pour un enfant ?",
    answer:
      "Pour les enfants (0 à 18 ans), la franchise minimale de 0 CHF est recommandée. Les enfants consultent fréquemment : l'économie sur la prime ne compense généralement pas le risque d'un reste à charge élevé. Les franchises enfants disponibles sont 0, 100, 200, 300, 400 et 600 CHF.",
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
  { montant: 300,  prime: 564.61, ecMois: 0,      ecAnn: 0,    seuilEquilibre: 'Réf.',        conseil: 'Franchise minimale, référence' },
  { montant: 500,  prime: 554.03, ecMois: 10.58,  ecAnn: 127,  seuilEquilibre: '~CHF 300',    conseil: 'Avantage limité' },
  { montant: 1000, prime: 526.57, ecMois: 38.04,  ecAnn: 456,  seuilEquilibre: '~CHF 800',    conseil: 'Adapté aux personnes peu malades' },
  { montant: 1500, prime: 499.20, ecMois: 65.41,  ecAnn: 785,  seuilEquilibre: "~CHF 1'100",  conseil: 'Bon équilibre pour personnes saines' },
  { montant: 2000, prime: 471.82, ecMois: 92.79,  ecAnn: 1113, seuilEquilibre: "~CHF 1'300",  conseil: 'Recommandé sans maladie chronique' },
  { montant: 2500, prime: 444.63, ecMois: 119.98, ecAnn: 1440, seuilEquilibre: "~CHF 1'440",  conseil: 'Optimal pour adultes très sains' },
]

const heroStats = [
  { value: '6',         label: 'Niveaux de franchise',        sub: 'de 300 à 2 500 CHF par an'          },
  { value: "CHF 1'440", label: "Seuil d'équilibre maximum",   sub: 'franchise 300 vs 2 500 CHF par an'  },
  { value: 'CHF 120',   label: 'Économie maximum par mois',   sub: 'sur la prime à Zurich, adulte'      },
]

const toc = [
  { n: '01', id: 'definition', label: 'Franchise et quote-part'           },
  { n: '02', id: 'tableau',    label: "Tableau des seuils d'équilibre"    },
  { n: '03', id: 'enfants',    label: 'Franchise enfant'                  },
  { n: '04', id: 'changement', label: 'Changer de franchise'              },
]

const relatedGuides = [
  { label: 'Guide', title: 'Comprendre la LAMal',       href: '/lamal/guide'            },
  { label: 'Guide', title: 'Les 4 modèles LAMal',       href: '/lamal/modeles'          },
  { label: 'Outil', title: 'Calculer mes subsides',     href: '/lamal/subsides'         },
  { label: 'Guide', title: 'Changer de caisse maladie', href: '/lamal/changer-de-caisse'},
]

function AnchorLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-[14px] h-[2px] bg-[#378ADD] shrink-0" />
      <span className="text-[10px] font-medium text-[#378ADD] uppercase tracking-[0.1em]">{children}</span>
    </div>
  )
}

function KeyFact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#EBF3FB] border-l-[3px] border-[#378ADD] rounded-r-[8px] p-[12px]">
      <p className="text-[10px] font-medium text-[#185FA5] uppercase tracking-[0.07em] mb-1">{label}</p>
      <div className="text-[13px] text-[#0C447C] leading-[1.7]">{children}</div>
    </div>
  )
}

function NudgeDark({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-[#042C53] rounded-[8px] px-6 py-6 my-8">
      <p className="text-[17px] font-medium text-white leading-[1.3] mb-2">{title}</p>
      <p className="text-[13px] text-[#B5D4F4] leading-[1.7] mb-4">{description}</p>
      <a href="#contact" className="inline-block bg-[#378ADD] text-white rounded-[7px] px-[13px] py-[10px] text-[13px] font-medium">
        Être rappelé →
      </a>
    </div>
  )
}

export default function FranchisePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── Hero ── */}
      <section className="bg-white border-b border-[#B5D4F4]">
        <div className="container-xl pt-10">
          <Breadcrumb items={[
            { label: 'Accueil', href: '/' },
            { label: 'LAMal', href: '/lamal' },
            { label: 'Franchise LAMal' },
          ]} />
        </div>

        {/* MSI Bandeau */}
        <div className="bg-cloud border-b border-[#B5D4F4]">
          <div className="container-xl flex items-center gap-3 py-3">
            <div className="w-7 h-7 rounded-[6px] bg-[#0F4C8A] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
              MSI
            </div>
            <p className="text-[11px] text-slate leading-snug">
              La rédaction My Swiss Insurance / Service éditorial indépendant, Lausanne / Publié le 1er janvier 2026, mis à jour le 22 avril 2026 / Données OFSP 2026
            </p>
          </div>
        </div>

        <div className="container-xl pt-8 pb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge">Données OFSP 2026</span>
          </div>
          <h1 className="text-[21px] font-medium text-[#042C53] leading-[1.3] mb-3 max-w-2xl">
            Franchise LAMal : quel montant choisir en 2026 ?
          </h1>
          <p className="text-[13px] text-slate leading-[1.7] max-w-2xl mb-8">
            La franchise est le montant annuel que vous payez avant que votre caisse intervienne.
            Bien choisir sa franchise peut vous faire économiser jusqu'à CHF 120 par mois sur votre prime,
            ou vous exposer à un reste à charge élevé en cas de maladie.
          </p>

          {/* StatsGrid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {heroStats.map(s => (
              <div key={s.value} className="bg-cloud border border-[#B5D4F4] rounded-[8px] px-4 py-3">
                <div className="text-[19px] font-medium text-[#0F4C8A] leading-none">{s.value}</div>
                <div className="text-[11px] text-slate mt-1 leading-snug">{s.label}</div>
                <div className="text-[10px] text-[#378ADD] mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>

          <Link href="/lamal/comparateur"
            className="bg-[#0F4C8A] text-white rounded-[8px] px-[18px] py-[12px] text-[13px] font-medium inline-block">
            Comparer les primes dans mon canton →
          </Link>
        </div>
      </section>

      {/* ── Contenu ── */}
      <div className="container-xl py-10">

        {/* TableOfContents */}
        <div className="bg-cloud border border-[#B5D4F4] rounded-[10px] p-5 mb-10">
          <p className="text-[10px] font-medium text-[#378ADD] uppercase tracking-[0.1em] mb-4">Sommaire</p>
          <div className="grid grid-cols-2 gap-1">
            {toc.map(item => (
              <a key={item.id} href={`#${item.id}`}
                className="flex items-center gap-2.5 px-3 py-2 rounded-[8px] hover:bg-[#EBF3FB] transition-colors">
                <span className="text-[10px] font-medium text-[#378ADD] uppercase tracking-[0.1em] shrink-0">{item.n}</span>
                <span className="text-[13px] text-slate">{item.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* ── Section 01 : Définition ── */}
        <section id="definition" className="py-[26px] border-b border-[#B5D4F4]">
          <AnchorLabel>01 · Franchise et quote-part</AnchorLabel>
          <h2 className="text-[18px] font-medium text-ink leading-[1.3] mb-4">
            Franchise et quote-part : quelle différence ?
          </h2>
          <p className="text-[13px] text-slate leading-[1.7] mb-5">
            La franchise et la quote-part sont les deux mécanismes de participation financière aux soins.
            Ils s'appliquent successivement dans l'année et ont chacun un plafond propre.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            <div className="border border-[#B5D4F4] rounded-[8px] p-[13px]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-[26px] h-[26px] bg-[#EBF3FB] rounded-[6px] flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-[#378ADD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-[13px] font-medium text-ink">La franchise</h3>
              </div>
              <ul className="space-y-1.5 text-[13px] text-slate leading-[1.7]">
                <li>Montant fixe : 300 à 2 500 CHF par an (adulte)</li>
                <li>Vous payez 100% des frais jusqu'à ce montant</li>
                <li>Choisie une fois par an, avant le 30 novembre</li>
                <li>Plus la franchise est élevée, plus la prime mensuelle est basse</li>
              </ul>
            </div>
            <div className="border border-[#B5D4F4] rounded-[8px] p-[13px]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-[26px] h-[26px] bg-[#EBF3FB] rounded-[6px] flex items-center justify-center shrink-0">
                  <svg className="w-3.5 h-3.5 text-[#378ADD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-[13px] font-medium text-ink">La quote-part</h3>
              </div>
              <ul className="space-y-1.5 text-[13px] text-slate leading-[1.7]">
                <li>10% des frais dépassant la franchise</li>
                <li>Plafond : CHF 700 par an (adulte), CHF 350 par an (enfant)</li>
                <li>Automatique, non modifiable</li>
                <li>Coût maximum total : franchise + CHF 700 par an</li>
              </ul>
            </div>
          </div>

          <KeyFact label="Exemple concret">
            Avec une franchise de 1 500 CHF par an et CHF 2 000 de frais médicaux dans l'année : vous payez
            CHF 1 500 (franchise) + 10% de CHF 500 = CHF 50 (quote-part), soit{' '}
            <strong>CHF 1 550 au total</strong>. Votre caisse prend en charge CHF 450.
          </KeyFact>
        </section>

        {/* ── Section 02 : Tableau ── */}
        <section id="tableau" className="py-[26px] border-b border-[#B5D4F4]">
          <AnchorLabel>02 · Tableau des seuils d'équilibre</AnchorLabel>
          <h2 className="text-[18px] font-medium text-ink leading-[1.3] mb-3">
            Tableau des seuils d'équilibre par franchise
          </h2>
          <p className="text-[13px] text-slate leading-[1.7] mb-5">
            Le seuil d'équilibre indique le montant de frais médicaux annuels à partir duquel la franchise
            300 CHF devient plus avantageuse que la franchise indiquée. En dessous de ce seuil, la franchise
            élevée est préférable.
          </p>

          <div className="overflow-x-auto border border-[#B5D4F4] rounded-[8px] mb-3">
            <table className="w-full">
              <thead>
                <tr className="bg-[#EBF3FB] border-b-2 border-[#378ADD]">
                  <th className="text-left   text-[10px] font-medium text-[#0C447C] uppercase tracking-[0.07em] px-[10px] py-[8px]">Franchise</th>
                  <th className="text-right  text-[10px] font-medium text-[#0C447C] uppercase tracking-[0.07em] px-[10px] py-[8px]">Prime par mois</th>
                  <th className="text-right  text-[10px] font-medium text-[#0C447C] uppercase tracking-[0.07em] px-[10px] py-[8px] hidden sm:table-cell">Éco. par mois</th>
                  <th className="text-right  text-[10px] font-medium text-[#0C447C] uppercase tracking-[0.07em] px-[10px] py-[8px] hidden sm:table-cell">Éco. par an</th>
                  <th className="text-center text-[10px] font-medium text-[#0C447C] uppercase tracking-[0.07em] px-[10px] py-[8px] hidden md:table-cell">Seuil par an</th>
                  <th className="text-left   text-[10px] font-medium text-[#0C447C] uppercase tracking-[0.07em] px-[10px] py-[8px] hidden lg:table-cell">Profil adapté</th>
                </tr>
              </thead>
              <tbody>
                {franchises.map((f, i) => (
                  <tr key={f.montant}
                    className={`border-b border-edge ${i === 0 ? 'bg-[#EBF3FB]' : 'bg-white'}`}>
                    <td className={`px-[10px] py-[8px] text-[13px] font-medium ${i === 0 ? 'text-[#0C447C]' : 'text-[#0F4C8A]'}`}>
                      CHF {f.montant.toLocaleString('fr-CH')}
                    </td>
                    <td className="px-[10px] py-[8px] text-right text-[13px] text-ink">
                      CHF {f.prime.toFixed(2)}
                    </td>
                    <td className="px-[10px] py-[8px] text-right text-[13px] text-[#185FA5] hidden sm:table-cell">
                      {f.ecMois > 0 ? `−CHF ${f.ecMois.toFixed(2)}` : '-'}
                    </td>
                    <td className="px-[10px] py-[8px] text-right text-[13px] text-[#185FA5] hidden sm:table-cell">
                      {f.ecAnn > 0 ? `−CHF ${f.ecAnn}` : '-'}
                    </td>
                    <td className="px-[10px] py-[8px] text-center text-[13px] font-medium hidden md:table-cell">
                      {f.seuilEquilibre}
                    </td>
                    <td className="px-[10px] py-[8px] text-[12px] text-slate hidden lg:table-cell">
                      {f.conseil}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate mb-6">
            Primes indicatives 2026, adulte 26 ans et plus, Zurich, modèle standard. Source : OFSP.
          </p>

          <KeyFact label="Comment lire ce tableau">
            Franchise 300 CHF vs 2 500 CHF par an : l'économie annuelle sur la prime est de CHF 1'440 par an.
            Si vos frais médicaux annuels dépassent CHF 1'440 par an, la franchise 300 CHF est plus avantageuse.
            En dessous, la franchise 2 500 CHF vous permet d'économiser davantage au total.
          </KeyFact>

          <div className="mt-6">
            <Link href="/lamal/comparateur"
              className="bg-[#0F4C8A] text-white rounded-[8px] px-[18px] py-[12px] text-[13px] font-medium inline-block">
              Comparer les primes dans mon canton →
            </Link>
          </div>
        </section>

        {/* NudgeDark après section 02 */}
        <NudgeDark
          title="Vous ne savez pas quelle franchise choisir ?"
          description="Un expert calcule la configuration la plus avantageuse selon vos dépenses médicales habituelles. Gratuit, réponse sous 24 heures."
        />

        {/* ── Section 03 : Enfants ── */}
        <section id="enfants" className="py-[26px] border-b border-[#B5D4F4]">
          <AnchorLabel>03 · Franchise enfant</AnchorLabel>
          <h2 className="text-[18px] font-medium text-ink leading-[1.3] mb-3">
            Franchise pour les enfants (0 à 18 ans)
          </h2>
          <p className="text-[13px] text-slate leading-[1.7] mb-5">
            Les franchises enfants sont distinctes des franchises adultes. Elles vont de 0 à 600 CHF par an
            et la quote-part est plafonnée à CHF 350 par an, contre CHF 700 par an pour un adulte.
          </p>

          <KeyFact label="Recommandation générale">
            La franchise 0 CHF par an est recommandée pour les jeunes enfants qui consultent fréquemment.
            À partir de l'adolescence (15 à 18 ans), une franchise plus élevée peut être envisagée
            si l'enfant est en bonne santé.
          </KeyFact>

          <div className="overflow-x-auto border border-[#B5D4F4] rounded-[8px] mt-5">
            <table className="w-full">
              <thead>
                <tr className="bg-[#EBF3FB] border-b-2 border-[#378ADD]">
                  <th className="text-left text-[10px] font-medium text-[#0C447C] uppercase tracking-[0.07em] px-[10px] py-[8px]">Franchise par an</th>
                  <th className="text-left text-[10px] font-medium text-[#0C447C] uppercase tracking-[0.07em] px-[10px] py-[8px]">Profil adapté</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['CHF 0',          'Nourrissons et enfants en bas âge, consultations fréquentes'],
                  ['CHF 100',        'Enfants avec quelques consultations par an'],
                  ['CHF 200 à 300',  'Enfants en bonne santé, quelques visites annuelles'],
                  ['CHF 400 à 600',  'Adolescents robustes, rarement malades'],
                ].map(([fr, profil], i) => (
                  <tr key={i} className="border-b border-edge bg-white">
                    <td className="px-[10px] py-[8px] text-[13px] font-medium text-[#0F4C8A]">{fr}</td>
                    <td className="px-[10px] py-[8px] text-[13px] text-slate">{profil}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Section 04 : Changement ── */}
        <section id="changement" className="py-[26px]">
          <AnchorLabel>04 · Changer de franchise</AnchorLabel>
          <h2 className="text-[18px] font-medium text-ink leading-[1.3] mb-3">
            Comment changer de franchise
          </h2>
          <p className="text-[13px] text-slate leading-[1.7] mb-6">
            Le changement de franchise suit un calendrier strict. Il n'est possible qu'une fois par an,
            avec une date limite impérative pour notifier votre caisse.
          </p>

          {/* Timeline */}
          <div className="space-y-0 mb-6">
            {[
              {
                n: 1,
                title: 'Avant le 30 novembre',
                body: "Informez votre caisse par écrit ou via votre espace client en ligne de votre souhait de modifier votre franchise pour l'année suivante.",
              },
              {
                n: 2,
                title: "Prise d'effet au 1er janvier",
                body: "La nouvelle franchise s'applique dès le 1er janvier. Toutes les dépenses médicales de l'année précédente sont calculées avec l'ancienne franchise.",
              },
              {
                n: 3,
                title: 'Franchise et changement de caisse',
                body: 'Si vous changez de caisse, vous choisissez simultanément votre franchise chez la nouvelle caisse. Le processus se fait en une seule démarche.',
              },
            ].map((step, i, arr) => (
              <div key={step.n} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-[26px] h-[26px] rounded-full border-2 border-[#378ADD] bg-[#EBF3FB] flex items-center justify-center text-[11px] font-medium text-[#378ADD] shrink-0">
                    {step.n}
                  </div>
                  {i < arr.length - 1 && (
                    <div className="w-px h-8 mt-1 bg-edge" />
                  )}
                </div>
                <div className="pb-5">
                  <p className="text-[13px] font-medium text-ink mb-1">{step.title}</p>
                  <p className="text-[13px] text-slate leading-[1.7]">{step.body}</p>
                </div>
              </div>
            ))}
          </div>

          <Link href="/lamal/changer-de-caisse"
            className="bg-transparent text-[#185FA5] border border-[#B5D4F4] rounded-[8px] px-[16px] py-[11px] text-[13px] font-medium inline-block">
            Guide complet : changer de caisse maladie →
          </Link>
        </section>

        {/* NudgeDark après section 04 */}
        <NudgeDark
          title="Vous souhaitez changer de franchise et de caisse en même temps ?"
          description="Un expert gère l'ensemble des démarches pour vous : choix de la franchise optimale, résiliation de l'ancien contrat et inscription à la nouvelle caisse. Gratuit, sans engagement."
        />

        {/* FAQ */}
        <section className="py-8 border-t border-[#B5D4F4]">
          <FAQ items={faqItems} title="Questions fréquentes sur la franchise LAMal" />
        </section>

        {/* Formulaire */}
        <section id="contact" className="scroll-mt-20 py-8 border-t border-[#B5D4F4]">
          <h2 className="text-[18px] font-medium text-ink leading-[1.3] mb-2">
            Vous préférez qu'on s'occupe de tout ?
          </h2>
          <p className="text-[13px] text-slate leading-[1.7] mb-6">
            Un expert analyse votre profil, trouve la meilleure caisse pour votre situation
            et gère le changement de votre côté. Gratuit, sans engagement, réponse sous 24 heures.
          </p>
          <MultiStepLeadForm redirectOnSuccess="/fr/merci" />
        </section>

        {/* Guides associés */}
        <section className="py-8 border-t border-[#B5D4F4]">
          <p className="text-[10px] font-medium text-slate uppercase tracking-[0.1em] mb-4">Guides associés</p>
          <div className="grid grid-cols-2 gap-3">
            {relatedGuides.map(g => (
              <Link key={g.href} href={g.href}
                className="border border-[#B5D4F4] rounded-[8px] p-4 hover:bg-[#EBF3FB] transition-colors">
                <p className="text-[10px] font-medium text-slate uppercase tracking-[0.1em] mb-1">{g.label}</p>
                <p className="text-[12.5px] font-medium text-[#185FA5]">{g.title}</p>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </>
  )
}
