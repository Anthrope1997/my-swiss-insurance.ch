import type { Metadata } from 'next'
import AuthorBio from '@/components/ui/AuthorBio'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FAQ from '@/components/ui/FAQ'
import Link from 'next/link'
import MultiStepLeadForm from '@/components/ui/MultiStepLeadForm'

export const metadata: Metadata = {
  title: 'LAMal pour votre famille en 2026 : enfants, maternité et retraite',
  description:
    'LAMal famille 2026 : affiliation nourrisson, franchise enfant, couverture maternité sans franchise (art. 64 LAMal), tarif jeune adulte, subsides famille et LCA hospitalière retraité.',
  openGraph: {
    title: 'LAMal pour votre famille en 2026',
    description:
      'Enfants, maternité, jeunes adultes, retraite : guide LAMal complet pour chaque étape de la vie familiale.',
    url: 'https://my-swiss-insurance.ch/lamal/ma-famille',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'LAMal pour votre famille en 2026 : enfants, maternité et retraite',
  datePublished: '2026-01-01',
  dateModified: '2026-04-22',
  author: { '@type': 'Organization', name: 'My Swiss Insurance' },
  publisher: { '@type': 'Organization', name: 'My Swiss Insurance' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://my-swiss-insurance.ch/lamal/ma-famille' },
}

const faqItems = [
  {
    question: 'Mon nouveau-né est-il couvert dès la naissance ?',
    answer:
      "Oui, à condition de l'affilier dans les 3 mois suivant la naissance. Si ce délai est respecté, la couverture est rétroactive à la date de naissance. Le nourrisson peut être affilié à n'importe quelle caisse, pas nécessairement celle des parents. Les parents choisissent également la franchise enfant (de 0 à 600 CHF) et, si désiré, un modèle alternatif.",
  },
  {
    question: 'La franchise s\'applique-t-elle pendant la grossesse ?',
    answer:
      "Non. Les prestations de maternité répertoriées par l'OFSP sont entièrement exonérées de franchise et de quote-part (art. 64 al. 7 LAMal). Cela inclut les consultations prénatales, l'accouchement et les soins post-partum standard. En revanche, les soins médicaux non liés à la grossesse restent soumis aux règles habituelles de franchise et de quote-part.",
  },
  {
    question: 'L\'accouchement à domicile est-il remboursé par la LAMal ?',
    answer:
      "Oui. La LAMal rembourse les accouchements à domicile assistés par une sage-femme agréée, dans les mêmes conditions qu'un accouchement en hôpital ou en maison de naissance. L'accouchement est exonéré de franchise et de quote-part. Si des complications surviennent nécessitant un transfert à l'hôpital, la prise en charge hospitalière s'applique également.",
  },
  {
    question: 'À quel âge un enfant doit-il avoir sa propre LAMal ?',
    answer:
      "Dès la naissance. En Suisse, il n'existe pas d'assurance familiale groupée : chaque personne, y compris les nourrissons, dispose de son propre contrat LAMal individuel. L'affiliation doit intervenir dans les 3 mois suivant la naissance. Le tarif enfant (0 à 18 ans) est nettement inférieur au tarif adulte.",
  },
  {
    question: 'Les cours de préparation à l\'accouchement sont-ils remboursés ?',
    answer:
      "Partiellement selon la caisse. La LAMal de base ne rembourse pas systématiquement les cours de préparation à la naissance. Certains assureurs les prennent en charge via une assurance complémentaire LCA ambulatoire. Vérifiez les conditions spécifiques de votre caisse avant d'inscrire ces cours.",
  },
  {
    question: 'Peut-on changer de caisse pendant une grossesse ?',
    answer:
      "Oui. La grossesse n'est pas un obstacle au changement de caisse LAMal. Les règles habituelles s'appliquent : résiliation avant le 30 novembre pour un changement au 1er janvier, ou dans le mois suivant une annonce de hausse de prime. Les prestations de maternité en cours sont transmises à la nouvelle caisse sans interruption.",
  },
  {
    question: 'Quels subsides pour une famille avec enfants ?',
    answer:
      "Les subsides sont calculés individuellement pour chaque membre de la famille. Les enfants ont des droits aux subsides distincts des parents. Dans plusieurs cantons, les primes enfants sont totalement prises en charge pour les familles dont le revenu déterminant ne dépasse pas le seuil cantonal. À Genève, Vaud et Neuchâtel, les subsides sont souvent attribués automatiquement sur la base de la déclaration d'impôts.",
  },
  {
    question: 'La prime LAMal augmente-t-elle à la retraite ?',
    answer:
      "Non. Il n'existe pas de tarif senior en LAMal. Le tarif adulte (26 ans et plus) reste identique quel que soit l'âge. Les primes varient selon la caisse, le canton de résidence, le modèle et la franchise choisis — mais jamais selon l'âge au-delà de 26 ans. En revanche, les retraités à revenus modestes ont souvent droit aux subsides cantonaux.",
  },
  {
    question: 'Quelle franchise recommander pour un enfant ?',
    answer:
      "La franchise 0 CHF est recommandée pour les nourrissons et jeunes enfants, qui consultent fréquemment un médecin. Les franchises disponibles pour les enfants sont 0, 100, 200, 300, 400 et 600 CHF. La quote-part enfant est plafonnée à 350 CHF par an, contre 700 CHF pour un adulte. Pour les adolescents en bonne santé, une franchise plus élevée peut être envisagée.",
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

export default function MaFamillePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="bg-white border-b border-edge pt-12 pb-10">
        <div className="container-xl">
          <Breadcrumb items={[
            { label: 'Accueil', href: '/' },
            { label: 'LAMal', href: '/lamal' },
            { label: 'Ma famille' },
          ]} />
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="badge">Données OFSP · 2026</span>
          </div>
          <h1 className="text-5xl font-bold text-ink leading-tight mb-4 max-w-2xl">
            LAMal pour votre famille en 2026.
          </h1>
          <p className="text-xl text-slate max-w-2xl leading-relaxed">
            La Suisse n'a pas d'assurance familiale groupée : chaque membre de la famille
            dispose de son propre contrat LAMal, avec des règles spécifiques selon l'âge.
            Nourrissons, enfants, jeunes adultes, maternité, retraite — ce guide couvre
            chaque étape avec les chiffres et les règles légales applicables en 2026.
          </p>
        </div>
      </section>

      <div className="container-xl py-16">
        <AuthorBio publishedDate="1er janvier 2026" updatedDate="22 avril 2026" />

        <div className="flex gap-12">
          <div className="flex-1 min-w-0 space-y-14">

            {/* Nouveau-né */}
            <section id="nouveau-ne">
              <h2 className="text-2xl font-semibold text-ink mb-4">Nouveau-né et nourrisson</h2>
              <p className="text-[16px] text-slate leading-relaxed mb-5">
                Tout enfant né en Suisse ou s'y installant doit être affilié à la LAMal.
                L'affiliation est obligatoire dans les 3 mois suivant la naissance.
                Si ce délai est respecté, la couverture est rétroactive à la date de naissance.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Délai d\'affiliation', valeur: '3 mois', note: 'dès la naissance' },
                  { label: 'Franchise recommandée', valeur: '0 CHF', note: 'pour les nourrissons' },
                  { label: 'Quote-part maximale', valeur: '350 CHF', note: 'par an pour les enfants' },
                ].map((m, i) => (
                  <div key={i} className="bg-cloud border border-edge rounded-[8px] p-4 text-center">
                    <p className="text-[11px] font-semibold text-slate uppercase tracking-wide mb-1">{m.label}</p>
                    <p className="text-2xl font-bold text-brand">{m.valeur}</p>
                    <p className="text-[12px] text-slate">{m.note}</p>
                  </div>
                ))}
              </div>

              <div className="callout text-[15px]">
                <strong>Liberté de choix :</strong> les parents peuvent affilier leur nourrisson
                à n'importe quelle caisse, y compris une caisse différente de la leur. Comparez
                les primes enfant séparément — la caisse la moins chère pour les adultes
                n'est pas toujours la plus avantageuse pour les enfants.
              </div>
            </section>

            {/* Enfants */}
            <section id="enfants">
              <h2 className="text-2xl font-semibold text-ink mb-4">Enfants de 0 à 18 ans</h2>
              <p className="text-[16px] text-slate leading-relaxed mb-5">
                Les enfants bénéficient d'un tarif de prime nettement inférieur aux adultes
                et d'un régime de participation aux frais allégé. La quote-part est plafonnée
                à 350 CHF par an (contre 700 CHF pour un adulte).
              </p>

              <div className="overflow-x-auto border border-edge rounded-[8px] mb-6">
                <table className="stripe-table w-full">
                  <thead>
                    <tr>
                      <th>Franchise enfant</th>
                      <th className="text-center">Profil recommandé</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['CHF 0', 'Nourrissons, enfants consultatnt fréquemment, maladies régulières'],
                      ['CHF 100', 'Jeunes enfants en bonne santé avec quelques consultations par an'],
                      ['CHF 200 à 300', 'Enfants sains, visites médicales occasionnelles'],
                      ['CHF 400 à 600', 'Adolescents robustes, rarement malades'],
                    ].map(([fr, profil], i) => (
                      <tr key={i}>
                        <td className="font-semibold text-brand">{fr}</td>
                        <td className="text-slate">{profil}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-4">
                {[
                  {
                    titre: 'Jusqu\'à 18 ans : tarif enfant',
                    desc: 'Le tarif enfant s\'applique de la naissance jusqu\'au 31 décembre de l\'année des 18 ans. À partir du 1er janvier de l\'année des 19 ans, le tarif jeune adulte (19 à 25 ans) prend le relais automatiquement.',
                  },
                  {
                    titre: 'Subsidescumulables avec les droits des parents',
                    desc: 'Les droits aux subsides des enfants sont calculés séparément des parents. Dans plusieurs cantons, les primes enfants sont totalement prises en charge pour les familles sous certains seuils de revenus. Vérifiez auprès de votre service cantonal.',
                  },
                ].map((item, i) => (
                  <div key={i} className="border border-edge rounded-[8px] p-5 bg-white">
                    <h3 className="font-semibold text-ink text-[15px] mb-2">{item.titre}</h3>
                    <p className="text-[14px] text-slate">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Jeunes adultes */}
            <section id="jeunes-adultes">
              <h2 className="text-2xl font-semibold text-ink mb-4">Jeunes adultes de 19 à 25 ans</h2>
              <p className="text-[16px] text-slate leading-relaxed mb-5">
                La catégorie tarifaire jeune adulte offre des primes réduites d'environ 20 à 25%
                par rapport au tarif adulte complet. Elle s'applique automatiquement de 19 à 25 ans.
              </p>

              <div className="space-y-4">
                {[
                  {
                    titre: 'Réduction légale de prime',
                    desc: 'Les caisses sont légalement tenues d\'appliquer une prime réduite pour les 19 à 25 ans. Le montant exact varie selon la caisse et le canton, mais la réduction est en moyenne de 20 à 25% par rapport au tarif adulte standard. Comparez les caisses spécifiquement pour cette tranche d\'âge.',
                  },
                  {
                    titre: 'Bascule vers le tarif adulte à 26 ans',
                    desc: 'Au 1er janvier de l\'année des 26 ans, le tarif adulte s\'applique automatiquement. Les franchises enfants (0 à 600 CHF) sont remplacées par les franchises adultes (300 à 2500 CHF). Anticipez ce changement pour choisir votre nouvelle franchise.',
                  },
                  {
                    titre: 'Modèle Telmed souvent recommandé',
                    desc: 'Pour un jeune adulte en bonne santé, à l\'aise avec les outils numériques, le modèle Telmed (consultation médicale par téléphone ou application avant tout rendez-vous) réduit la prime de 15 à 24% supplémentaires. Combiné à une franchise élevée, les économies peuvent dépasser CHF 200 par mois.',
                  },
                ].map((item, i) => (
                  <div key={i} className="border border-edge rounded-[8px] p-5 bg-white">
                    <h3 className="font-semibold text-ink text-[15px] mb-2">{item.titre}</h3>
                    <p className="text-[14px] text-slate">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Maternité */}
            <section id="maternite">
              <h2 className="text-2xl font-semibold text-ink mb-4">
                Maternité : couverture LAMal complète
              </h2>
              <p className="text-[16px] text-slate leading-relaxed mb-5">
                La LAMal couvre entièrement la maternité physiologique sans franchise ni
                quote-part (art. 64 al. 7 LAMal, RS 832.10). La mère ne paie rien de sa
                poche pour les prestations listées par l'OFSP.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-[#f0fdf4] border border-[#86efac] rounded-[8px] p-5">
                  <h3 className="font-semibold text-ink text-[15px] mb-3">Ce que la LAMal couvre</h3>
                  <ul className="space-y-2 text-[13px] text-slate">
                    {[
                      '7 consultations médicales prénatales standard',
                      '2 échographies de grossesse',
                      'Analyses de laboratoire prescrites et dépistages obligatoires',
                      'Accouchement en hôpital, maison de naissance ou à domicile',
                      'Séjour hospitalier post-partum standard',
                      'Consultations sage-femme jusqu\'à 10 semaines post-partum',
                      'Soins infirmiers à domicile prescrits',
                      'Consultations supplémentaires en cas de grossesse à risque',
                    ].map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <svg className="w-3.5 h-3.5 text-[#22c55e] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#fff7ed] border border-[#fed7aa] rounded-[8px] p-5">
                  <h3 className="font-semibold text-ink text-[15px] mb-3">Ce que la LAMal ne couvre pas</h3>
                  <ul className="space-y-2 text-[13px] text-slate">
                    {[
                      'Chambre privée ou semi-privée à la maternité (LCA hospitalière)',
                      'Péridurale de confort (non médicalement indiquée)',
                      'Cours de préparation à la naissance (selon caisse)',
                      'Traitements de procréation médicalement assistée (PMA, FIV)',
                      'Sage-femme libérale au-delà du quota post-partum sans prescription',
                      'Soins esthétiques post-grossesse',
                    ].map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-[#f59e0b] font-bold shrink-0 mt-0.5">–</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="callout-warning text-[15px]">
                <strong>LCA hospitalière :</strong> pour une chambre semi-privée ou privée
                et le libre choix du médecin accoucheur, une LCA hospitalière est nécessaire.
                Elle doit être souscrite <strong>avant</strong> la grossesse — une grossesse
                en cours est considérée comme état préexistant et peut entraîner des exclusions.
              </div>
            </section>

            {/* Retraité */}
            <section id="retraite">
              <h2 className="text-2xl font-semibold text-ink mb-4">LAMal à la retraite</h2>
              <p className="text-[16px] text-slate leading-relaxed mb-5">
                Il n'existe pas de tarif senior en LAMal. Le tarif adulte s'applique à partir
                de 26 ans et reste identique quel que soit l'âge. Les retraités ne paient donc
                pas de surprime liée à l'âge, mais la fréquence des soins augmente souvent
                avec les années.
              </p>

              <div className="space-y-4">
                {[
                  {
                    titre: 'Franchise 300 CHF généralement recommandée',
                    desc: 'Les frais médicaux augmentent statistiquement avec l\'âge. La franchise basse (300 CHF) devient rapidement avantageuse dès que les dépenses médicales annuelles dépassent environ CHF 1\'440. Pour un retraité consultant régulièrement un médecin ou suivi pour une pathologie chronique, c\'est souvent le meilleur choix.',
                  },
                  {
                    titre: 'Subsides prioritaires pour les retraités à revenus modestes',
                    desc: 'Les retraités disposant d\'une rente AVS ou LPP modeste ont souvent droit aux subsides cantonaux, sans toujours le savoir. Dans plusieurs cantons, les subsides sont attribués automatiquement. Pour les autres, une demande annuelle est à déposer auprès du service cantonal compétent.',
                  },
                  {
                    titre: 'LCA hospitalière : à souscrire avant la retraite',
                    desc: 'La LAMal de base couvre uniquement la division commune à l\'hôpital. Une LCA hospitalière garantit la chambre semi-privée ou privée et le libre choix du médecin chef — particulièrement utile pour les hospitalisations qui deviennent plus fréquentes. À souscrire avant 65 ans pour des conditions optimales et éviter les exclusions liées à l\'âge.',
                  },
                  {
                    titre: 'Planifier les primes dans le budget retraite',
                    desc: 'Les primes LAMal représentent souvent 10 à 15% du revenu d\'une rente AVS. Cette charge est prévisible et stable. Intégrez-la dans votre planification financière de retraite, en anticipant l\'éventuelle hausse annuelle des primes fixées par l\'OFSP.',
                  },
                ].map((item, i) => (
                  <div key={i} className="border border-edge rounded-[8px] p-5 bg-white">
                    <h3 className="font-semibold text-ink text-[15px] mb-2">{item.titre}</h3>
                    <p className="text-[14px] text-slate">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <FAQ items={faqItems} />

            <section>
              <h3 className="text-[16px] font-semibold text-ink mb-3">Voir aussi</h3>
              <div className="flex flex-col gap-2">
                {[
                  { href: '/lamal/ma-situation', label: 'LAMal selon votre situation professionnelle' },
                  { href: '/lamal/franchise', label: 'Choisir sa franchise LAMal' },
                  { href: '/lamal/lamal-vs-lca', label: 'LAMal vs assurance complémentaire LCA' },
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
