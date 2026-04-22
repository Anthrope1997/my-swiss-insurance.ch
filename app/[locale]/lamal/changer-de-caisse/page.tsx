import type { Metadata } from 'next'
import AuthorBio from '@/components/ui/AuthorBio'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FAQ from '@/components/ui/FAQ'
import Link from 'next/link'
import MultiStepLeadForm from '@/components/ui/MultiStepLeadForm'

export const metadata: Metadata = {
  title: 'Changer de caisse maladie en Suisse — Guide résiliation LAMal 2026',
  description:
    'Comment changer de caisse maladie : délais, procédure, modèle de lettre de résiliation. Date limite 30 novembre. Guide complet 2026.',
  openGraph: {
    title: 'Changer de caisse maladie — Résiliation LAMal 2026',
    description: 'Procédure complète pour changer d\'assureur LAMal : dates, étapes et modèle de lettre.',
    url: 'https://my-swiss-insurance.ch/lamal/changer-de-caisse',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Changer de caisse maladie LAMal en Suisse — Guide 2026',
  datePublished: '2026-01-01',
  dateModified: '2026-04-01',
  author: { '@type': 'Organization', name: 'My Swiss Insurance' },
}

const faqItems = [
  {
    question: "Quelle est la date limite pour changer de caisse maladie ?",
    answer: "Pour changer au 1er janvier, vous devez résilier votre contrat par courrier recommandé avant le 30 novembre. Si votre assureur annonce une hausse de prime, vous disposez d'un mois supplémentaire après la notification.",
  },
  {
    question: "La nouvelle caisse peut-elle refuser de m'accepter ?",
    answer: "Non. Pour la LAMal de base, les caisses ont l'obligation légale d'accepter tout résident en Suisse, sans sélection médicale. En revanche, pour les assurances complémentaires LCA, un refus est possible.",
  },
  {
    question: "Que se passe-t-il si j'oublie de résilier avant le 30 novembre ?",
    answer: "Votre contrat est automatiquement reconduit pour l'année suivante. Vous ne pourrez changer qu'au 1er janvier de l'année d'après, sauf si votre assureur annonce une hausse de prime en cours d'année.",
  },
  {
    question: "Puis-je changer de caisse si j'ai des factures médicales en cours ?",
    answer: "Oui. Les factures en cours restent à la charge de votre ancienne caisse pour tous les soins reçus pendant la période couverte. La transition est gérée entre les deux caisses. Conservez toutes vos factures et assurez-vous qu'elles ont été transmises avant la résiliation.",
  },
  {
    question: "Faut-il informer son médecin en cas de changement de caisse ?",
    answer: "Oui, c'est recommandé. Communiquez vos nouvelles coordonnées d'assuré à votre médecin de famille et tout autre prestataire de santé. Présentez votre nouvelle carte d'assuré lors de votre première consultation. En cas de modèle médecin de famille ou HMO, vérifiez que votre médecin est dans le réseau.",
  },
  {
    question: "Comment changer de caisse en cas de déménagement dans un autre canton ?",
    answer: "Un déménagement dans un autre canton ouvre le droit à un changement de caisse immédiat, même en dehors de la période ordinaire. Signalez votre déménagement à votre caisse actuelle. Les primes s'appliquent selon le canton de domicile dès la date effective du changement.",
  },
  {
    question: "La nouvelle caisse peut-elle imposer une période d'essai ?",
    answer: "Non. Il n'y a pas de période d'essai pour la LAMal de base. La couverture est intégrale dès le 1er janvier. En revanche, pour les assurances complémentaires LCA souscrites simultanément, des délais de carence peuvent s'appliquer selon le contrat.",
  },
  {
    question: "Est-il possible de changer de caisse pour ses enfants séparément ?",
    answer: "Oui. Chaque membre de la famille dispose de son propre contrat LAMal et peut être assuré dans des caisses différentes. Il peut être stratégique de comparer séparément pour les enfants, dont les caisses les moins chères ne sont pas toujours les mêmes que pour les adultes.",
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

export default function ChangerDeCaissePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="bg-white border-b border-edge pt-12 pb-10">
        <div className="container-xl">
          <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'LAMal', href: '/lamal' }, { label: 'Changer de caisse maladie' }]} />
          <h1 className="text-5xl font-bold text-ink leading-tight mb-4 max-w-2xl">
            Comment changer de caisse maladie en Suisse.
          </h1>
          <p className="text-xl text-slate max-w-2xl leading-relaxed">
            Procédure complète, dates clés et modèle de lettre pour changer d'assureur
            sans erreur. Économisez jusqu'à CHF 2'000/an.
          </p>
        </div>
      </section>

      <div className="container-xl py-16">
        <AuthorBio publishedDate="1er janvier 2026" updatedDate="13 avril 2026" />
        <div className="flex gap-12">
          <div className="flex-1 min-w-0 space-y-14">

            {/* Dates clés */}
            <div className="callout-warning">
              <p className="font-semibold text-[#0f2040] mb-4 text-[17px]">Dates clés 2026 / 2027</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { date: '30 novembre 2026', desc: 'Date limite de résiliation ordinaire pour changer au 1er janvier 2027' },
                  { date: 'Octobre–novembre', desc: 'Annonce des nouvelles primes par les assureurs. Vérifiez si votre prime augmente.' },
                  { date: '1er janvier 2027', desc: 'Prise d\'effet du nouveau contrat si résiliation dans les délais' },
                ].map((item) => (
                  <div key={item.date} className="bg-white border border-[#e2e8f0] rounded-[6px] p-4">
                    <p className="text-[12px] font-semibold text-[#1d4ed8] uppercase tracking-wide mb-1">{item.date}</p>
                    <p className="text-[14px] text-slate">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tableau délais */}
            <section>
              <h2 className="text-2xl font-semibold text-ink mb-6">Délais et situations</h2>
              <div className="border border-edge rounded-[8px] overflow-hidden">
                <table className="stripe-table w-full">
                  <thead>
                    <tr>
                      <th>Situation</th>
                      <th>Date limite</th>
                      <th>Prise d'effet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Changement ordinaire', '30 novembre', '1er janvier'],
                      ['Hausse de prime annoncée', '1 mois après notification', '31 décembre'],
                      ['Changement de canton', 'Dès l\'effectivité', 'Selon accord assureur'],
                      ['Changement de franchise', '30 novembre', '1er janvier'],
                    ].map((row, i) => (
                      <tr key={i}>
                        <td className="font-medium text-ink">{row[0]}</td>
                        <td>{row[1]}</td>
                        <td>{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Étapes */}
            <section>
              <h2 className="text-2xl font-semibold text-ink mb-8">Les 5 étapes pour changer</h2>
              <div className="space-y-6">
                {[
                  {
                    n: '01', title: 'Comparez les primes dès octobre',
                    desc: 'Dès l\'annonce des nouvelles primes (automne), comparez sur priminfo.ch ou via notre service. Notez les économies potentielles.',
                    tip: 'Comparez à modèle équivalent (standard vs standard) pour une comparaison juste.',
                  },
                  {
                    n: '02', title: 'Vérifiez vos factures en cours',
                    desc: 'Assurez-vous que toutes les factures médicales de l\'année ont été transmises et remboursées par votre assureur actuel.',
                    tip: null,
                  },
                  {
                    n: '03', title: 'Adhérez à la nouvelle caisse',
                    desc: 'Inscrivez-vous auprès de la nouvelle caisse avant fin novembre. Dans la plupart des cas, elle se charge d\'envoyer la résiliation à votre place.',
                    tip: 'Certaines caisses permettent l\'inscription 100% en ligne en 5 minutes.',
                  },
                  {
                    n: '04', title: 'Envoyez la lettre de résiliation',
                    desc: 'Si la nouvelle caisse ne le fait pas pour vous, envoyez une lettre recommandée à votre ancien assureur avant le 30 novembre.',
                    tip: 'Lettre recommandée avec avis de réception, indispensable comme preuve.',
                  },
                  {
                    n: '05', title: 'Recevez votre nouvelle carte d\'assuré',
                    desc: 'En décembre ou début janvier, vous recevrez votre nouvelle carte d\'assurance, valide dès le 1er janvier.',
                    tip: null,
                  },
                ].map((step) => (
                  <div key={step.n} className="flex gap-5">
                    <div className="text-[28px] font-bold text-[#1d4ed8] leading-none shrink-0 w-12 text-right">
                      {step.n}
                    </div>
                    <div className="pt-1">
                      <h3 className="font-semibold text-ink text-[17px] mb-1">{step.title}</h3>
                      <p className="text-[15px] text-slate mb-2">{step.desc}</p>
                      {step.tip && (
                        <p className="text-[13px] text-brand bg-cloud border border-edge rounded-md px-3 py-1.5 inline-block">
                          💡 {step.tip}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Modèle lettre */}
            <section>
              <h2 className="text-2xl font-semibold text-ink mb-4">Modèle de lettre de résiliation</h2>
              <p className="text-[15px] text-slate mb-5">
                À envoyer par courrier recommandé avant le 30 novembre. Adaptez les champs entre crochets.
              </p>
              <div className="bg-cloud border border-edge rounded-[8px] p-7 font-mono text-[14px] leading-relaxed text-slate">
                <p className="text-right mb-6">
                  [Prénom Nom]<br />
                  [Adresse]<br />
                  [NPA Localité]<br />
                  [Date]
                </p>
                <p className="mb-5">
                  [Nom de la caisse maladie]<br />
                  [Adresse]<br />
                  [NPA Localité]
                </p>
                <p className="mb-4 font-semibold text-ink">
                  Objet : Résiliation de mon assurance-maladie de base (LAMal)
                </p>
                <p className="mb-3">Madame, Monsieur,</p>
                <p className="mb-3">
                  Par la présente, je résilie mon assurance-maladie de base (LAMal) pour
                  le 31 décembre [année en cours], conformément à l'art. 7 al. 1 LAMal.
                </p>
                <p className="mb-3">
                  <strong className="text-ink">Numéro d'assuré :</strong> [Votre numéro]<br />
                  <strong className="text-ink">Date de naissance :</strong> [JJ.MM.AAAA]
                </p>
                <p className="mb-5">
                  Je vous saurais gré de bien vouloir me confirmer la prise en compte de cette résiliation.
                </p>
                <p className="mb-1">Meilleures salutations,</p>
                <p>[Votre signature]</p>
              </div>
              <p className="text-[13px] text-slate/60 mt-3">
                Modèle indicatif. En cas de doute, consultez votre caisse ou le service cantonal compétent.
              </p>
            </section>

            {/* Cas particuliers */}
            <section>
              <h2 className="text-2xl font-semibold text-ink mb-6">Cas particuliers</h2>
              <div className="space-y-4">
                {[
                  {
                    titre: 'Hausse de prime annoncée',
                    desc: 'Si votre caisse augmente sa prime pour l\'année suivante, vous disposez d\'un droit de résiliation spécial dans le mois suivant la notification. La résiliation prend effet au 31 décembre. Ce droit s\'applique même si vous avez manqué le délai ordinaire du 30 novembre.',
                    urgence: true,
                  },
                  {
                    titre: 'Déménagement dans un autre canton',
                    desc: 'Un déménagement cantonal permet un changement de caisse immédiat en dehors du délai ordinaire. Les primes s\'appliquent selon le canton de domicile. Signalez le changement à votre caisse actuelle et comparez les primes dans votre nouveau canton.',
                    urgence: false,
                  },
                  {
                    titre: 'Arrivée en Suisse (expatrié ou déménagement)',
                    desc: 'Vous avez 90 jours dès l\'établissement de votre domicile pour choisir et s\'affilier à une caisse. La couverture est rétroactive à la date d\'arrivée si le délai est respecté. Profitez de ces 90 jours pour comparer les caisses soigneusement.',
                    urgence: false,
                  },
                  {
                    titre: 'Naissance ou adoption',
                    desc: 'Un nouveau-né doit être affilié dans les 3 mois suivant la naissance. Si vous respectez ce délai, la couverture est rétroactive à la naissance. Vous pouvez choisir n\'importe quelle caisse — pas forcément celle des parents.',
                    urgence: false,
                  },
                ].map((cas, i) => (
                  <div key={i} className={`border-l-4 ${cas.urgence ? 'border-[#f59e0b] bg-[#fffbeb]' : 'border-brand bg-white'} border border-edge rounded-[8px] p-5`}>
                    <h3 className="font-semibold text-ink text-[16px] mb-2">{cas.titre}</h3>
                    <p className="text-[15px] text-slate">{cas.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <FAQ items={faqItems} />

            <section>
              <h3 className="text-[16px] font-semibold text-ink mb-3">Voir aussi</h3>
              <div className="flex flex-col gap-2">
                {[
                  { href: '/lamal/comparateur', label: 'Comparer ma prime LAMal' },
                  { href: '/lamal/franchise', label: 'Choisir sa franchise' },
                  { href: '/lamal/modeles', label: 'Les 4 modèles LAMal' },
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
