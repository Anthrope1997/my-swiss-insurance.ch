import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FAQ from '@/components/ui/FAQ'
import Link from 'next/link'
import AuthorBio from '@/components/ui/AuthorBio'
import NeedHelpSection from '@/components/ui/NeedHelpSection'
import HeroStats from '@/components/ui/HeroStats'

export const metadata: Metadata = {
  title: 'Changer de caisse maladie en Suisse : Guide résiliation LAMal 2026',
  description:
    'Comment changer de caisse maladie : délais, procédure, modèle de lettre de résiliation. Date limite 30 novembre. Guide complet 2026.',
  openGraph: {
    title: 'Changer de caisse maladie : Résiliation LAMal 2026',
    description: "Procédure complète pour changer d'assureur LAMal : dates, étapes et modèle de lettre.",
    url: 'https://my-swiss-insurance.ch/sante/changer-de-caisse',
    type: 'article',
  },
  alternates: { canonical: 'https://my-swiss-insurance.ch/sante/changer-de-caisse' },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Changer de caisse maladie LAMal en Suisse : Guide 2026',
  datePublished: '2026-01-01',
  dateModified: '2026-05-28',
  author: { '@type': 'Organization', name: 'My Swiss Insurance', url: 'https://my-swiss-insurance.ch' },
  publisher: { '@type': 'Organization', name: 'My Swiss Insurance' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://my-swiss-insurance.ch/sante/changer-de-caisse' },
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
    answer: "Oui, c'est recommandé. Communiquez vos nouvelles coordonnées d'assuré à votre médecin de famille et tout autre prestataire de santé. Présentez votre nouvelle carte d'assuré lors de votre première consultation. En cas de modèle médecin de famille ou centre médical, vérifiez que votre médecin est dans le réseau.",
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

const heroStats = [
  { value: '30 novembre',  label: 'Date limite de résiliation', sub: 'Démarche gratuite et déléguable'        },
  { value: '1er janvier',  label: 'Date de prise d\'effet',    sub: 'De votre nouvelle assurance LAMal'      },
  { value: 'CHF 4 020/an', label: 'Économie moyenne réalisable', sub: 'Assurance LAMal, adulte 35 ans'      },
]

const toc = [
  { id: 'dates',       label: '1. Dates clés 2026/2027'  },
  { id: 'delais',      label: '2. Délais et situations'  },
  { id: 'etapes',      label: '3. Les 5 étapes'          },
  { id: 'lettre',      label: '4. Modèle de lettre'      },
  { id: 'cas',         label: '5. Cas particuliers'      },
  { id: 'faq',         label: '6. Questions fréquentes'  },
]

const guidesAssocies = [
  { href: '/sante/comparateur',  label: 'Comparer ma prime LAMal'  },
  { href: '/sante/franchise',    label: 'Choisir sa franchise'     },
  { href: '/sante/modeles',      label: 'Les 4 modèles LAMal'      },
  { href: '/sante/guide',        label: 'Guide complet LAMal 2026' },
]

const enBref: ReactNode[] = [
  <>Votre demande de résiliation doit être envoyée par courrier recommandé <strong className="font-medium text-ink">avant le 30 novembre</strong> pour un changement d&apos;assureur au 1er janvier. Vous pouvez également mandater votre nouvel assureur pour qu&apos;il s&apos;occupe de cette démarche à votre place.</>,
  <>Tout assureur a <strong className="font-medium text-ink">l&apos;obligation légale d&apos;accepter votre demande</strong> de souscription ou de résiliation, quelle que soit votre situation personnelle. Aucune sélection médicale n&apos;est autorisée pour l&apos;assurance LAMal de base.</>,
  <>En cas de hausse de prime annoncée tardivement par votre assureur, vous disposez d&apos;<strong className="font-medium text-ink">un mois pour résilier</strong> à partir de la date de notification, même si la date limite du 30 novembre est dépassée.</>,
]

export default function ChangerDeCaissePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── Hero ── */}
      <section className="bg-white border-b border-edge pt-12 pb-14">
        <div className="container-xl">
          <Breadcrumb items={[
            { label: 'Accueil', href: '/' },
            { label: 'LAMal', href: '/sante' },
            { label: 'Changer de caisse maladie' },
          ]} />

          <h1 className="text-4xl sm:text-5xl font-bold text-ink leading-tight mb-4">
            Comment changer d&apos;assurance maladie LAMal en 2026 ?
          </h1>
          <p className="text-[16px] text-slate max-w-2xl leading-relaxed mb-10">
            Vous pouvez changer d&apos;assureur LAMal chaque année et économiser en moyenne CHF 4 020 par an sur vos primes. Voici la procédure complète pour effectuer cette démarche.
          </p>

          <HeroStats stats={heroStats} className="mb-8" />
        </div>
      </section>

      {/* ── Zone 2 — Navigation rapide ── */}
      <div className="bg-cloud border-b border-edge py-8">
        <div className="container-xl grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white border border-edge rounded-xl p-5">
            <p className="text-2xl font-semibold text-ink mb-3">En bref</p>
            <ul className="space-y-3">
              {enBref.map((phrase, i) => (
                <li key={i} className="flex gap-2.5 items-center text-[16px] text-slate leading-relaxed">
                  <span className="text-brand font-bold shrink-0 mt-0.5" aria-hidden="true">•</span>
                  <span>{phrase}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-edge rounded-xl p-5">
            <p className="text-2xl font-semibold text-ink mb-3">Sommaire</p>
            <ul className="space-y-1">
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="block text-[16px] text-slate leading-relaxed hover:text-brand hover:bg-cloud px-2 py-1 rounded transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Zone 3 — Contenu détaillé ── */}
      <div className="container-xl py-12">
        <article className="space-y-4">

            {/* 1 — Dates clés */}
            <section id="dates" className="pt-2">
              <h2 className="article-h2">1. Quand peut-on changer de caisse en 2026 ?</h2>
              <p className="article-p">
                Le calendrier de changement est strict. La résiliation ordinaire doit parvenir à votre caisse
                avant le 30 novembre pour une prise d&apos;effet au 1er janvier.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { date: '30 novembre 2026', desc: 'Date limite de résiliation ordinaire pour changer au 1er janvier 2027' },
                    { date: 'Octobre à novembre', desc: 'Annonce des nouvelles primes par les assureurs. Vérifiez si votre prime augmente.' },
                    { date: '1er janvier 2027', desc: "Prise d'effet du nouveau contrat si résiliation dans les délais" },
                  ].map((item) => (
                    <div key={item.date} className="bg-white border border-edge rounded-[6px] p-4">
                      <p className="text-[12px] font-semibold text-brand uppercase tracking-wide mb-1">{item.date}</p>
                      <p className="text-[16px] text-slate">{item.desc}</p>
                    </div>
                  ))}
                </div>
            </section>

            {/* 2 — Délais */}
            <section id="delais">
              <h2 className="article-h2">2. Quels délais s'appliquent selon votre situation ?</h2>
              <p className="article-p">
                Les délais varient selon la raison du changement. Le cas ordinaire impose le 30 novembre,
                mais plusieurs situations ouvrent des droits de résiliation hors délai.
              </p>
              <div className="border border-edge rounded-[8px] overflow-hidden">
                <table className="stripe-table w-full">
                  <thead>
                    <tr>
                      <th className="text-left whitespace-nowrap">Situation</th>
                      <th className="text-left whitespace-nowrap">Date limite</th>
                      <th className="text-left whitespace-nowrap">Prise d'effet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Changement ordinaire', '30 novembre', '1er janvier'],
                      ['Hausse de prime annoncée', '1 mois après notification', '31 décembre'],
                      ['Changement de canton', 'Dès le déménagement', 'Selon accord assureur'],
                      ['Changement de franchise', '30 novembre', '1er janvier'],
                    ].map((row, i) => (
                      <tr key={i}>
                        <td className="font-medium text-ink whitespace-nowrap">{row[0]}</td>
                        <td className="whitespace-nowrap">{row[1]}</td>
                        <td className="whitespace-nowrap">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 3 — Étapes */}
            <section id="etapes">
              <h2 className="article-h2">3. Comment changer de caisse en 5 étapes ?</h2>
              <div className="space-y-6">
                {[
                  {
                    n: '01', title: 'Comparez les primes dès octobre',
                    desc: "Dès l'annonce des nouvelles primes (automne), comparez sur priminfo.ch ou via notre service. Notez les économies potentielles.",
                    tip: 'Privilégiez des modèles équivalents pour une comparaison valable.',
                  },
                  {
                    n: '02', title: 'Vérifiez vos factures en cours',
                    desc: "Assurez-vous que toutes les factures médicales de l'année ont été transmises et remboursées par votre assureur actuel.",
                    tip: null,
                  },
                  {
                    n: '03', title: 'Adhérez à la nouvelle caisse',
                    desc: 'Inscrivez-vous auprès de la nouvelle caisse avant fin novembre. Dans la plupart des cas, elle se charge de la résiliation à votre place.',
                    tip: 'Certaines caisses permettent l\'inscription entièrement en ligne, sans courrier.',
                  },
                  {
                    n: '04', title: 'Envoyez la lettre de résiliation',
                    desc: "Si la nouvelle caisse ne le fait pas pour vous, envoyez une lettre recommandée à votre ancien assureur avant le 30 novembre.",
                    tip: "Envoyez votre lettre en recommandé avec accusé de réception, c'est votre seule preuve en cas de litige.",
                  },
                  {
                    n: '05', title: "Recevez votre nouvelle carte d'assuré",
                    desc: 'En décembre ou début janvier, vous recevrez votre nouvelle carte d\'assurance, valide dès le 1er janvier.',
                    tip: null,
                  },
                ].map((step) => (
                  <div key={step.n} className="flex gap-5">
                    <div className="text-[28px] font-bold text-brand leading-none shrink-0 w-12 text-right">
                      {step.n}
                    </div>
                    <div className="pt-1">
                      <h3 className="font-semibold text-ink text-[17px] mb-1">{step.title}</h3>
                      <p className="text-[16px] text-slate mb-2">{step.desc}</p>
                      {step.tip && (
                        <p className="text-[16px] text-slate mt-1">{step.tip}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 4 — Lettre */}
            <section id="lettre">
              <h2 className="article-h2">4. Comment rédiger sa lettre de résiliation ?</h2>
              <p className="article-p">
                À envoyer par courrier recommandé avant le 30 novembre. Adaptez les champs entre crochets.
              </p>
              <div className="bg-cloud border border-edge rounded-[8px] p-7 font-mono text-[13px] leading-relaxed text-slate">
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
                  Veuillez confirmer la prise en compte de cette résiliation.
                </p>
                <p className="mb-1">Meilleures salutations,</p>
                <p>[Votre signature]</p>
              </div>
              <p className="text-[13px] text-slate/60 mt-3">
                Modèle indicatif. En cas de doute, consultez votre caisse ou le service cantonal compétent.
              </p>
            </section>

            {/* 5 — Cas particuliers */}
            <section id="cas">
              <h2 className="article-h2">5. Quels sont les cas de résiliation anticipée ?</h2>
              <div className="space-y-4">
                {[
                  {
                    titre: 'Hausse de prime annoncée',
                    desc: "Si votre caisse augmente sa prime pour l'année suivante, vous disposez d'un droit de résiliation spécial dans le mois suivant la notification. La résiliation prend effet au 31 décembre. Ce droit s'applique même si vous avez manqué le délai ordinaire du 30 novembre.",
                    urgence: true,
                  },
                  {
                    titre: 'Déménagement dans un autre canton',
                    desc: "Un déménagement cantonal permet un changement de caisse immédiat en dehors du délai ordinaire. Les primes s'appliquent selon le canton de domicile. Signalez le changement à votre caisse actuelle et comparez les primes dans votre nouveau canton.",
                    urgence: false,
                  },
                  {
                    titre: 'Arrivée en Suisse',
                    desc: "Vous avez 90 jours dès l'établissement de votre domicile pour choisir et vous affilier à une caisse. La couverture est rétroactive à la date d'arrivée si le délai est respecté. Profitez de ces 90 jours pour comparer les caisses soigneusement.",
                    urgence: false,
                  },
                  {
                    titre: 'Naissance ou adoption',
                    desc: "Un nouveau-né doit être affilié dans les 3 mois suivant la naissance. Si vous respectez ce délai, la couverture est rétroactive à la naissance. Vous pouvez choisir n'importe quelle caisse, pas forcément celle des parents.",
                    urgence: false,
                  },
                ].map((cas, i) => (
                  <div key={i} className="border-l-4 border-brand bg-white border border-edge rounded-[8px] p-5">
                    <h3 className="font-semibold text-ink text-[16px] mb-2">{cas.titre}</h3>
                    <p className="text-[16px] text-slate">{cas.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 6 — FAQ */}
            <section id="faq" className="border-t border-edge pt-8">
              <FAQ items={faqItems} title="6. Questions fréquentes sur le changement de caisse" />
            </section>

            {/* Formulaire */}
            <NeedHelpSection />

            {/* Bandeau MSI */}
            <AuthorBio publishedDate="1er janvier 2026" updatedDate="22 avril 2026" />

            {/* Guides associés */}
            <section>
              <p className="text-[13px] font-semibold text-slate uppercase tracking-widest mb-4">
                Guides associés
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {guidesAssocies.map(({ href, label }) => (
                  <Link key={href} href={href}
                    className="flex items-center gap-2 text-[13px] text-slate hover:text-brand border border-edge rounded-[8px] px-4 py-3 transition-colors hover:border-brand/30">
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
    </>
  )
}
