import type { Metadata } from 'next'
import AuthorBio from '@/components/ui/AuthorBio'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FAQ from '@/components/ui/FAQ'
import Link from 'next/link'
import MultiStepLeadForm from '@/components/ui/MultiStepLeadForm'

export const metadata: Metadata = {
  title: 'Maternité et LAMal en Suisse 2026 : couverture, exclusions et LCA',
  description:
    'Ce que couvre la LAMal pendant la grossesse et l\'accouchement, les exclusions, la LCA maternité et les démarches pour les expatriées. Guide 2026.',
  openGraph: {
    title: 'Maternité et LAMal 2026 : couverture complète et conseils',
    description: 'LAMal maternité : couverture, exclusions, LCA et conseils pour les expatriées. Guide 2026.',
    url: 'https://my-swiss-insurance.ch/lamal/maternite',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Maternité et LAMal en Suisse 2026 : couverture, exclusions et LCA',
  datePublished: '2026-01-01',
  dateModified: '2026-04-22',
  author: { '@type': 'Organization', name: 'My Swiss Insurance' },
  publisher: { '@type': 'Organization', name: 'My Swiss Insurance' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://my-swiss-insurance.ch/lamal/maternite' },
}

const faqItems = [
  {
    question: 'La maternité est-elle couverte par la LAMal de base ?',
    answer:
      "Oui. La LAMal couvre les prestations de maternité sans franchise ni quote-part : consultations prénatales (7 visites standard), accouchement à l'hôpital ou en maison de naissance, soins post-partum (consultations sage-femme jusqu'à 10 semaines après l'accouchement). Source : art. 29 LAMal.",
  },
  {
    question: 'Faut-il une LCA pour accoucher dans une chambre privée ?',
    answer:
      "Oui. La LAMal de base couvre uniquement la division commune (chambre à plusieurs lits). Pour une chambre semi-privée ou privée, une LCA hospitalière est nécessaire. Cette couverture doit être souscrite avant la grossesse — une maladie préexistante peut entraîner des exclusions.",
  },
  {
    question: 'La grossesse est-elle soumise à la franchise LAMal ?',
    answer:
      "Non. Les prestations de maternité répertoriées par l'OFSP (consultations prénatales, accouchement, soins sage-femme post-partum) sont entièrement exonérées de franchise et de quote-part. En revanche, les soins non liés à la grossesse (maladies intercurrentes) restent soumis aux règles habituelles.",
  },
  {
    question: 'Que couvre la LAMal pour les nouveau-nés ?',
    answer:
      "Le nouveau-né doit être affilié à la LAMal dans les 3 mois suivant la naissance. Les soins médicaux liés à des anomalies congénitales détectées après la naissance sont couverts. Les parents peuvent choisir la caisse et la franchise. Si l'inscription se fait dans les 3 mois, la couverture est rétroactive à la naissance.",
  },
  {
    question: 'Une expatriée enceinte peut-elle s\'affilier à la LAMal ?',
    answer:
      "Oui. Toute personne établissant son domicile en Suisse a 90 jours pour s'affilier à la LAMal. La grossesse n'est pas un motif de refus — la LAMal interdit toute sélection médicale. Une expatriée enceinte bénéficiera de la couverture maternité complète dès son affiliation.",
  },
  {
    question: 'La LAMal couvre-t-elle la PMA (procréation médicalement assistée) ?',
    answer:
      "Partiellement. La LAMal prend en charge certains examens et diagnostics liés à l'infertilité, mais ne rembourse pas les traitements de fécondation in vitro (FIV) ni l'insémination artificielle. Ces traitements relèvent des assurances complémentaires LCA ou sont à la charge du couple.",
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

export default function MaternitePage() {
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
              { label: 'Maternité et LAMal' },
            ]}
          />
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="badge">Données OFSP · 2026</span>
          </div>
          <h1 className="text-5xl font-bold text-ink leading-tight mb-4 max-w-2xl">
            Maternité et LAMal en Suisse 2026.
          </h1>
          <p className="text-xl text-slate max-w-2xl leading-relaxed">
            La LAMal couvre entièrement la grossesse et l'accouchement — sans franchise, sans
            quote-part. Mais certaines prestations restent exclues. Voici ce que vous pouvez
            attendre de votre assurance de base, et quand une LCA maternité est utile.
          </p>
        </div>
      </section>

      <div className="container-xl py-16">
        <AuthorBio publishedDate="1er janvier 2026" updatedDate="22 avril 2026" />

        <div className="flex gap-12">
          <div className="flex-1 min-w-0 space-y-14">

            {/* Ce que couvre la LAMal */}
            <section id="couverture">
              <h2 className="text-2xl font-semibold text-ink mb-4">
                Ce que couvre la LAMal pendant la maternité
              </h2>
              <p className="text-[16px] text-slate leading-relaxed mb-5">
                La loi (art. 29 LAMal) garantit une couverture complète de la maternité physiologique,
                sans aucun reste à charge pour la mère. Les prestations suivantes sont exonérées
                de franchise et de quote-part.
              </p>

              <div className="space-y-5">
                {[
                  {
                    titre: 'Période prénatale',
                    items: [
                      '7 consultations médicales prénatales standard prises en charge',
                      '2 échographies de grossesse remboursées par la LAMal',
                      'Analyses de laboratoire prescrites (sérologies, dépistages)',
                      'Consultations supplémentaires remboursées en cas de grossesse à risque',
                    ],
                  },
                  {
                    titre: 'Accouchement',
                    items: [
                      'Accouchement en milieu hospitalier (division commune)',
                      'Accouchement en maison de naissance agréée',
                      'Accouchement à domicile avec sage-femme agréée',
                      'Soins intensifs néonataux si nécessaire (prématuré, complications)',
                    ],
                  },
                  {
                    titre: 'Période post-partum',
                    items: [
                      'Consultations de la sage-femme jusqu\'à 10 semaines après l\'accouchement',
                      'Soins infirmiers à domicile prescrits',
                      'Consultations médicales post-partum en cas de complications',
                    ],
                  },
                ].map((section) => (
                  <div key={section.titre} className="bg-[#f0fdf4] border border-[#86efac] rounded-[8px] p-5">
                    <h3 className="font-semibold text-ink text-[16px] mb-3">{section.titre}</h3>
                    <ul className="space-y-2">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex gap-2.5 text-[14px] text-slate">
                          <svg className="w-4 h-4 text-[#22c55e] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="callout mt-5 text-[15px]">
                <strong>Exonération totale :</strong> aucune franchise ni quote-part n'est demandée
                pour les prestations de maternité listées par l'OFSP. La mère ne paie rien de sa poche
                pour ces soins, quelle que soit sa franchise choisie.
              </div>
            </section>

            {/* Exclusions */}
            <section id="exclusions">
              <h2 className="text-2xl font-semibold text-ink mb-4">
                Exclusions et limites de la LAMal maternité
              </h2>
              <p className="text-[16px] text-slate leading-relaxed mb-5">
                La LAMal de base ne couvre pas toutes les situations liées à la grossesse.
                Certains souhaits sont laissés à la charge de la mère ou relèvent de la LCA.
              </p>
              <div className="callout-warning mb-5">
                <p className="font-semibold text-ink mb-2">Non couvert par la LAMal de base</p>
                <ul className="space-y-2 text-[14px] text-slate">
                  {[
                    'Chambre privée ou semi-privée à la maternité (nécessite une LCA hospitalière)',
                    'Péridurale de confort (non médicalement indiquée)',
                    'Cours de préparation à la naissance (non remboursés en standard)',
                    'Soins esthétiques post-grossesse',
                    'Traitements de PMA / FIV (procréation médicalement assistée)',
                    'Sage-femme libérale au-delà du quota post-partum sans prescription',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2.5">
                      <span className="text-[#f59e0b] font-bold shrink-0">–</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* LCA maternité */}
            <section id="lca">
              <h2 className="text-2xl font-semibold text-ink mb-4">
                LCA maternité : quand est-elle utile ?
              </h2>
              <p className="text-[16px] text-slate leading-relaxed mb-5">
                Les assurances complémentaires LCA peuvent compléter la couverture de base.
                Elles sont particulièrement utiles si vous souhaitez plus de confort ou de liberté de choix.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                {[
                  {
                    titre: 'LCA hospitalière',
                    desc: 'Chambre semi-privée ou privée à la maternité. Libre choix du médecin accoucheur. Souscrivez avant la grossesse pour éviter les exclusions.',
                    coût: 'CHF 40–200+/mois',
                  },
                  {
                    titre: 'LCA ambulatoire',
                    desc: 'Cours de préparation à la naissance, ostéopathie, sages-femmes en dehors du quota LAMal. Complète les lacunes de remboursement.',
                    coût: 'CHF 15–60/mois',
                  },
                ].map(card => (
                  <div key={card.titre} className="bg-white border border-edge rounded-[8px] p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-ink text-[15px]">{card.titre}</h3>
                      <span className="text-[12px] text-slate bg-cloud border border-edge px-2 py-0.5 rounded-md whitespace-nowrap">{card.coût}</span>
                    </div>
                    <p className="text-[14px] text-slate">{card.desc}</p>
                  </div>
                ))}
              </div>
              <div className="callout-warning text-[15px]">
                <strong>Important :</strong> la LCA hospitalière doit être souscrite <strong>avant</strong> la
                grossesse. Une grossesse en cours est considérée comme état préexistant et peut entraîner
                des exclusions ou un refus. Plus vous souscrivez tôt, moins vous risquez d'exclusions.
              </div>
            </section>

            {/* Nouveau-né et expatriées */}
            <section id="pratique">
              <h2 className="text-2xl font-semibold text-ink mb-4">Points pratiques</h2>
              <div className="space-y-4">
                {[
                  {
                    titre: 'Affilier son nouveau-né',
                    desc: 'Le nourrisson doit être affilié à la LAMal dans les 3 mois suivant la naissance. Si ce délai est respecté, la couverture est rétroactive à la naissance. Les parents peuvent choisir la caisse et la franchise enfant (0–600 CHF).',
                    color: 'border-brand',
                  },
                  {
                    titre: 'Expatriée enceinte : affiliation possible',
                    desc: 'Toute personne établissant son domicile en Suisse a 90 jours pour s\'affilier, même enceinte. La LAMal interdit tout refus pour raison de santé. La couverture maternité est immédiate dès l\'affiliation.',
                    color: 'border-brand',
                  },
                  {
                    titre: 'Congé maternité et LAMal',
                    desc: 'La LAMal ne couvre pas le revenu pendant le congé maternité. Ce droit est régi par la loi sur les allocations pour perte de gain (APG), distincte de la LAMal. Renseignez-vous auprès de votre employeur ou de la caisse de compensation.',
                    color: 'border-edge',
                  },
                ].map(item => (
                  <div key={item.titre} className={`border ${item.color} border-l-4 rounded-[8px] p-5 bg-white`}>
                    <h3 className="font-semibold text-ink text-[16px] mb-2">{item.titre}</h3>
                    <p className="text-[15px] text-slate">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <FAQ items={faqItems} />

            <section>
              <h3 className="text-[16px] font-semibold text-ink mb-3">Voir aussi</h3>
              <div className="flex flex-col gap-2">
                {[
                  { href: '/lamal/famille-retraite', label: 'LAMal pour les familles et les enfants' },
                  { href: '/lamal/lamal-vs-lca', label: 'LAMal vs assurance complémentaire LCA' },
                  { href: '/lamal/expatrie-frontalier', label: 'LAMal pour les expatriés' },
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
