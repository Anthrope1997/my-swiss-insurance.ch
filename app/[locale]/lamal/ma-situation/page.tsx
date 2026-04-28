import type { Metadata } from 'next'
import AuthorBio from '@/components/ui/AuthorBio'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FAQ from '@/components/ui/FAQ'
import Link from 'next/link'
import MultiStepLeadForm from '@/components/ui/MultiStepLeadForm'

export const metadata: Metadata = {
  title: 'LAMal selon votre situation professionnelle en 2026',
  description:
    'LAMal pour salarié, indépendant, chômeur et nouvel arrivant expatrié en Suisse : franchise optimale, couverture accidents, subsides et démarches d\'affiliation. Guide 2026.',
  openGraph: {
    title: 'LAMal selon votre situation professionnelle en 2026',
    description:
      'Salarié, indépendant, chômeur ou expatrié : guide LAMal adapté à votre statut professionnel en Suisse romande.',
    url: 'https://my-swiss-insurance.ch/lamal/ma-situation',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'LAMal selon votre situation professionnelle en Suisse 2026',
  datePublished: '2026-01-01',
  dateModified: '2026-04-22',
  author: { '@type': 'Organization', name: 'My Swiss Insurance' },
  publisher: { '@type': 'Organization', name: 'My Swiss Insurance' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://my-swiss-insurance.ch/lamal/ma-situation' },
}

const faqItems = [
  {
    question: 'Un indépendant est-il obligé de couvrir les accidents via la LAMal ?',
    answer:
      "Oui. Les indépendants ne bénéficient d'aucune couverture LAA (assurance accidents) automatique, contrairement aux salariés. Sans souscrire la couverture accidents LAMal optionnelle (art. 8 LAMal), les accidents professionnels et de loisirs sont à leur charge dès le premier franc. Cette couverture accidents LAMal s'active auprès de la caisse et entraîne une prime supplémentaire d'environ CHF 10 à 30 par mois.",
  },
  {
    question: 'Que devient ma LAMal si je perds mon emploi ?',
    answer:
      "La LAMal reste obligatoire et continue sans interruption. La perte d'emploi n'entraîne aucune suspension de couverture. Deux changements importants : (1) vous devenez potentiellement éligible aux subsides cantonaux si vos revenus chutent sous les seuils cantonaux — à demander immédiatement auprès de votre service cantonal ; (2) la couverture LAA accidents reste active via l'assurance chômage pendant toute la durée des indemnités, puis cesse 30 jours après la fin du droit.",
  },
  {
    question: 'Comment s\'affilier à la LAMal en arrivant en Suisse ?',
    answer:
      "Dès la prise de domicile officielle, vous disposez de 90 jours pour choisir une caisse et vous affilier. Si ce délai est respecté, la couverture est rétroactive à la date d'arrivée. Les pièces nécessaires sont : permis de séjour (B, C, G, L ou N) et attestation de domicile officielle. Aucune caisse ne peut vous refuser pour l'assurance de base (art. 4 LAMal). Passé 90 jours, les autorités cantonales attribuent d'office une caisse.",
  },
  {
    question: 'Puis-je cumuler emploi salarié et activité indépendante — quelle couverture LAMal ?',
    answer:
      "La LAMal est unique : un seul contrat couvre l'ensemble de votre activité, quelle que soit sa nature. En revanche, la couverture LAA dépend du statut. Pour votre activité salariée, la LAA est couverte par l'employeur dès 8 heures par semaine. Pour votre activité indépendante, cette couverture est absente. Vous devez activer la couverture accidents LAMal pour protéger votre activité indépendante, sauf si votre volume horaire salarié dépasse 8 heures hebdomadaires et couvre l'ensemble de vos risques.",
  },
  {
    question: 'Le chômeur bénéficie-t-il de subsides LAMal ?',
    answer:
      "Oui, et souvent de façon prioritaire. La perte d'emploi réduit le revenu déterminant, ce qui ouvre généralement des droits aux subsides cantonaux. Dans plusieurs cantons (VD, GE, NE, FR), les personnes au chômage reçoivent une aide automatique calculée sur la base de la déclaration d'impôts ou de l'attestation de chômage. Pour les autres cantons, une demande est à déposer rapidement auprès du service cantonal compétent, sans attendre la fin de l'année.",
  },
  {
    question: 'Dans quel délai un expatrié doit-il s\'affilier à la LAMal ?',
    answer:
      "Tout résident en Suisse doit s'affilier dans les 90 jours suivant la prise de domicile officielle. Si ce délai est respecté, la couverture est rétroactive à la date d'arrivée. Au-delà de 90 jours, les autorités cantonales attribuent d'office une caisse maladie, souvent sans tenir compte des préférences de l'assuré. Source : art. 3 al. 1 et art. 5 LAMal (RS 832.10).",
  },
  {
    question: 'Un salarié à temps partiel est-il couvert pour les accidents ?',
    answer:
      "Oui, mais avec une distinction importante. Pour un emploi d'au moins 8 heures par semaine chez un même employeur, la LAA couvre à la fois les accidents professionnels et les accidents non professionnels. En dessous de 8 heures, seuls les accidents professionnels sont couverts par la LAA de l'employeur. Les accidents non professionnels sont alors à la charge de la LAMal — vérifiez que votre caisse inclut cette couverture.",
  },
  {
    question: 'Peut-on désactiver la couverture accidents LAMal si l\'on devient salarié ?',
    answer:
      "Oui. Si vous passiez de statut indépendant à salarié et activez ainsi la LAA employeur, vous pouvez désactiver la couverture accidents optionnelle de votre LAMal pour éviter de payer deux fois. Cette désactivation se fait par écrit auprès de votre caisse, en fournissant une attestation de votre employeur confirmant la couverture LAA. La modification prend effet à la date convenue avec la caisse.",
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

export default function MaSituationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="bg-white border-b border-edge pt-12 pb-10">
        <div className="container-xl">
          <Breadcrumb items={[
            { label: 'Accueil', href: '/' },
            { label: 'LAMal', href: '/lamal' },
            { label: 'Ma situation' },
          ]} />
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="badge">Données OFSP · 2026</span>
          </div>
          <h1 className="text-5xl font-bold text-brand leading-tight mb-4 max-w-2xl">
            LAMal selon votre situation professionnelle en 2026.
          </h1>
          <p className="text-xl text-slate max-w-2xl leading-relaxed">
            Salarié, indépendant, en situation de chômage ou nouvel arrivant en Suisse :
            votre statut professionnel détermine directement votre couverture accidents,
            votre franchise optimale et vos droits aux subsides cantonaux.
            Ce guide synthétise les règles essentielles par profil.
          </p>
        </div>
      </section>

      <div className="container-xl py-16">
        <AuthorBio publishedDate="1er janvier 2026" updatedDate="22 avril 2026" />

        <div className="flex gap-12">
          <div className="flex-1 min-w-0 space-y-14">

            {/* Salarié */}
            <section id="salarie">
              <h2 className="text-2xl font-semibold text-ink mb-4">LAMal pour les salariés</h2>
              <p className="text-[16px] text-slate leading-relaxed mb-5">
                Le salarié bénéficie du cadre le plus complet : la LAMal de base couvre
                les soins médicaux, et la LAA (loi sur l'assurance-accidents, RS 832.20)
                couvre les accidents dès 8 heures de travail par semaine chez un même employeur.
              </p>

              <div className="space-y-5">
                <div className="border-l-4 border-brand bg-white border border-edge rounded-[8px] p-5">
                  <h3 className="font-semibold text-ink text-[16px] mb-2">
                    Couverture accidents LAA dès 8 heures par semaine
                  </h3>
                  <p className="text-[15px] text-slate">
                    Au-delà de 8 heures hebdomadaires, l'employeur couvre à la fois les accidents
                    professionnels et les accidents non professionnels via la LAA. En dessous de ce seuil,
                    seuls les accidents professionnels sont couverts — les accidents non professionnels
                    restent à la charge de la LAMal. Vérifiez votre taux d'activité si vous travaillez
                    à temps partiel pour plusieurs employeurs.
                  </p>
                </div>

                <div className="border-l-4 border-edge bg-white border border-edge rounded-[8px] p-5">
                  <h3 className="font-semibold text-ink text-[16px] mb-2">
                    Arrêt maladie : la LAMal ne couvre pas le revenu
                  </h3>
                  <p className="text-[15px] text-slate">
                    La LAMal prend en charge les soins médicaux pendant un arrêt maladie, mais
                    ne verse aucune indemnité de remplacement de revenu. Cette protection relève
                    d'une assurance perte de gain (indemnités journalières). Si votre employeur ne
                    la propose pas, une couverture individuelle est recommandée. La LAA, elle,
                    verse des indemnités journalières en cas d'arrêt lié à un accident.
                  </p>
                </div>

                <div className="border-l-4 border-edge bg-white border border-edge rounded-[8px] p-5">
                  <h3 className="font-semibold text-ink text-[16px] mb-2">
                    Perte d'emploi : droits aux subsides prioritaires
                  </h3>
                  <p className="text-[15px] text-slate">
                    En cas de chômage, la LAMal continue sans interruption et votre couverture
                    accidents reste active via l'assurance chômage pendant toute la durée des
                    indemnités, puis 30 jours après leur terme. La baisse de revenu ouvre
                    immédiatement des droits potentiels aux subsides cantonaux — ne tardez pas
                    à faire la demande auprès de votre service cantonal.
                  </p>
                </div>

                <div className="border-l-4 border-edge bg-white border border-edge rounded-[8px] p-5">
                  <h3 className="font-semibold text-ink text-[16px] mb-2">
                    Franchise optimale pour un salarié
                  </h3>
                  <p className="text-[15px] text-slate">
                    La franchise optimale dépend de votre fréquence de soins. Pour un salarié
                    en bonne santé, la franchise 2500 CHF réduit la prime de ~CHF 120 par mois.
                    Pour un salarié avec un médecin de famille régulier ou un traitement en cours,
                    la franchise 300 CHF devient avantageuse dès que les frais annuels dépassent
                    environ CHF 1'440. Consultez la{' '}
                    <Link href="/lamal/franchise" className="text-brand hover:underline">
                      page franchise
                    </Link>{' '}
                    pour le tableau des seuils d'équilibre complet.
                  </p>
                </div>
              </div>
            </section>

            {/* Indépendant */}
            <section id="independant">
              <h2 className="text-2xl font-semibold text-ink mb-4">
                LAMal pour les indépendants et freelances
              </h2>
              <p className="text-[16px] text-slate leading-relaxed mb-5">
                L'indépendant supporte l'intégralité de sa prime LAMal sans contribution
                employeur, et n'est couvert par aucune LAA automatique. Ce double écart
                par rapport au salarié exige une planification spécifique.
              </p>

              <div className="callout-warning mb-6">
                <p className="font-semibold text-[#0f2040] mb-1">
                  Pas de LAA employeur : une lacune à combler
                </p>
                <p className="text-[15px] text-[#475569]">
                  Sans couverture accidents spécifique, un accident professionnel ou de loisirs
                  est pris en charge par la LAMal uniquement, avec des franchises et des
                  quote-parts qui s'appliquent normalement. La couverture accidents optionnelle
                  via la LAMal (art. 8 LAMal) ou une LAA volontaire sont les deux solutions.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    titre: 'Activer la couverture accidents LAMal',
                    desc: 'La LAMal offre une option accidents pour les personnes non couvertes par la LAA (indépendants, sans emploi, étudiants). La prime supplémentaire est d\'environ CHF 10 à 30 par mois selon la caisse. Cette activation se fait par écrit auprès de votre caisse, avec prise d\'effet rapide.',
                  },
                  {
                    titre: 'Désactiver la couverture accidents en devenant salarié',
                    desc: 'Si vous changez de statut et bénéficiez d\'une LAA employeur (dès 8 heures par semaine), vous pouvez désactiver la couverture accidents LAMal pour éviter un double paiement. Fournissez une attestation LAA de votre employeur à votre caisse.',
                  },
                  {
                    titre: 'Franchise élevée souvent avantageuse',
                    desc: 'Si votre trésorerie le permet, une franchise 2000 à 2500 CHF réduit la prime mensuelle de 25 à 30%. Provisionnez la différence sur un compte épargne dédié. Les primes LAMal sont partiellement déductibles de votre revenu imposable — montant forfaitaire variable selon le canton.',
                  },
                  {
                    titre: 'Vérifier les subsides chaque année',
                    desc: 'Les revenus variables des indépendants peuvent ouvrir des droits certaines années. Vérifiez votre éligibilité chaque printemps, après votre déclaration d\'impôts, auprès du service cantonal compétent.',
                  },
                ].map((item, i) => (
                  <div key={i} className="border border-edge rounded-[8px] p-5 bg-white">
                    <h3 className="font-semibold text-ink text-[15px] mb-2">{item.titre}</h3>
                    <p className="text-[14px] text-slate">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Chômeur */}
            <section id="chomeur">
              <h2 className="text-2xl font-semibold text-ink mb-4">LAMal en situation de chômage</h2>
              <p className="text-[16px] text-slate leading-relaxed mb-5">
                La LAMal est obligatoire pendant le chômage et la couverture ne s'interrompt
                pas. En revanche, plusieurs mécanismes de protection renforcée s'activent
                dès la prise en charge par l'assurance chômage.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-[#f0fdf4] border border-[#86efac] rounded-[8px] p-5">
                  <h3 className="font-semibold text-ink text-[15px] mb-3">Ce qui reste actif</h3>
                  <ul className="space-y-2 text-[13px] text-slate">
                    <li>• Couverture LAMal sans interruption</li>
                    <li>• Couverture LAA accidents via l'assurance chômage</li>
                    <li>• Droit aux subsides cantonaux (souvent prioritaire)</li>
                  </ul>
                </div>
                <div className="bg-[#fff7ed] border border-[#fed7aa] rounded-[8px] p-5">
                  <h3 className="font-semibold text-ink text-[15px] mb-3">Points d'attention</h3>
                  <ul className="space-y-2 text-[13px] text-slate">
                    <li>• LAA accidents cesse 30 jours après la fin des indemnités</li>
                    <li>• Subsides : demande à faire rapidement, sans attendre</li>
                    <li>• Franchise modifiable au 1er janvier avec préavis avant le 30 novembre</li>
                  </ul>
                </div>
              </div>

              <div className="callout text-[15px]">
                <strong>Subsides cantonaux :</strong> la perte d'emploi réduit le revenu déterminant
                et ouvre généralement des droits aux subsides. Contactez votre service cantonal
                ou votre ORP dès le début du chômage — les subsides non réclamés ne sont
                pas versés rétroactivement dans la plupart des cantons.
              </div>
            </section>

            {/* Nouvel arrivant expatrié */}
            <section id="expatrie">
              <h2 className="text-2xl font-semibold text-ink mb-4">
                Nouvel arrivant et expatrié en Suisse
              </h2>
              <p className="text-[16px] text-slate leading-relaxed mb-5">
                Dès l'établissement du domicile en Suisse, la LAMal devient obligatoire.
                Le délai de 90 jours pour s'affilier est une règle absolue : ne le manquez pas.
              </p>

              <div className="callout text-[15px] mb-6">
                <strong>90 jours pour choisir :</strong> si vous respectez ce délai, la couverture
                est rétroactive à la date d'arrivée. Profitez de ce délai pour comparer les
                caisses — changer après le 1er janvier est plus contraignant.
              </div>

              <div className="space-y-4">
                {[
                  {
                    titre: 'Aucune caisse ne peut vous refuser',
                    desc: 'Pour l\'assurance de base LAMal, tous les assureurs agréés par l\'OFSP ont l\'obligation légale d\'accepter tout résident en Suisse, quelle que soit sa nationalité, son âge ou son état de santé. Aucune sélection médicale n\'est autorisée (art. 4 LAMal, RS 832.10).',
                  },
                  {
                    titre: 'Pièces nécessaires pour l\'affiliation',
                    desc: 'Permis de séjour (B, C, G, L ou N) et attestation de domicile officielle (délivrée par l\'office communal ou cantonal des habitants). La plupart des caisses permettent l\'inscription en ligne en quelques minutes.',
                  },
                  {
                    titre: 'Modèle standard recommandé au départ',
                    desc: 'Le temps de trouver un médecin de famille de confiance et de vous orienter dans le système suisse, commencez par le modèle standard. Vous pourrez basculer vers un modèle alternatif (Telmed, HMO, médecin de famille) dès le 1er janvier suivant, avec des économies de prime allant jusqu\'à 24%.',
                  },
                  {
                    titre: 'Frontalier ou détaché en Suisse ?',
                    desc: 'Si vous résidez hors de Suisse et travaillez en Suisse, un droit d\'option spécifique s\'applique. Consultez le guide dédié pour les frontaliers.',
                  },
                ].map((item, i) => (
                  <div key={i} className="border border-edge rounded-[8px] p-5 bg-white">
                    <h3 className="font-semibold text-ink text-[15px] mb-2">{item.titre}</h3>
                    <p className="text-[14px] text-slate">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <Link href="/lamal/frontalier"
                  className="text-brand hover:underline text-[15px] font-medium">
                  Guide complet pour les frontaliers →
                </Link>
              </div>
            </section>

            <FAQ items={faqItems} />

            <section>
              <h3 className="text-[16px] font-semibold text-ink mb-3">Voir aussi</h3>
              <div className="flex flex-col gap-2">
                {[
                  { href: '/lamal/ma-famille', label: 'LAMal pour votre famille' },
                  { href: '/lamal/frontalier', label: 'LAMal pour les frontaliers' },
                  { href: '/lamal/franchise', label: 'Choisir sa franchise LAMal' },
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
