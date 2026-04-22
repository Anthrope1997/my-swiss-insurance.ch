import type { Metadata } from 'next'
import AuthorBio from '@/components/ui/AuthorBio'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FAQ from '@/components/ui/FAQ'
import MultiStepLeadForm from '@/components/ui/MultiStepLeadForm'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'LAMal expatrié et frontalier en Suisse romande — Guide 2026',
  description: 'LAMal pour les expatriés et frontaliers en Suisse romande : affiliation, droit d\'option, permis de séjour et spécificités GE. Guide complet 2026.',
  openGraph: {
    title: 'LAMal expatrié et frontalier — Suisse romande 2026',
    description: "Guide LAMal pour les nouveaux arrivants et travailleurs frontaliers en Suisse romande.",
    url: 'https://my-swiss-insurance.ch/lamal/expatrie-frontalier',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "LAMal pour les expatriés et frontaliers en Suisse romande",
  datePublished: '2026-01-01',
  dateModified: '2026-04-13',
  author: { '@type': 'Organization', name: 'La rédaction My Swiss Insurance' },
  publisher: { '@type': 'Organization', name: 'My Swiss Insurance' },
}

const faqItems = [
  {
    question: "Dans quel délai un expatrié doit-il s'affilier à la LAMal ?",
    answer: "Tout résident en Suisse doit s'affilier à la LAMal dans les 90 jours suivant son arrivée (prise de domicile officielle). Si ce délai est respecté, la couverture est rétroactive à la date d'arrivée. Au-delà de 90 jours, les autorités cantonales attribuent d'office une caisse maladie. Source : art. 3 al. 1 et art. 5 LAMal.",
  },
  {
    question: "Un travailleur frontalier est-il obligé de s'affilier à la LAMal suisse ?",
    answer: "Non, pas automatiquement. Les frontaliers ont un droit d'option : ils peuvent choisir de rester couverts dans leur pays de résidence OU de s'affilier à la LAMal suisse. Ce choix doit être exercé dans les 3 mois suivant le début de l'emploi en Suisse. Une fois exercé, le droit d'option ne peut plus être modifié sauf changement de situation.",
  },
  {
    question: "Peut-on être refusé par une caisse LAMal en tant qu'étranger ?",
    answer: "Non. Pour la LAMal de base, tous les assureurs agréés par l'OFSP ont l'obligation légale d'accepter toute personne résidant en Suisse, quelle que soit sa nationalité, son âge ou son état de santé. Il n'y a aucune sélection médicale pour l'assurance de base.",
  },
  {
    question: "Que se passe-t-il si je quitte la Suisse définitivement ?",
    answer: "La LAMal prend fin à la date de départ de Suisse (radiation du registre des habitants). Vous devez résilier votre contrat en fournissant une preuve de départ (attestation de radiation). Un remboursement au prorata des primes déjà versées est effectué. Pensez à prolonger votre couverture quelques jours pour couvrir la transition.",
  },
  {
    question: "Un détaché en Suisse doit-il s'affilier à la LAMal ?",
    answer: "Cela dépend de la durée et de l'accord bilatéral applicable. Un détachement de courte durée (< 12 mois) depuis un pays UE/AELE permet généralement de rester dans le système du pays d'origine avec le formulaire A1. Pour une mission longue ou un changement de domicile en Suisse, la LAMal devient obligatoire.",
  },
  {
    question: "Les frontaliers genevois ont-ils des droits particuliers ?",
    answer: "Oui. Les frontaliers français travaillant dans le canton de Genève qui optent pour la couverture française peuvent bénéficier de la CMU-C (Complémentaire Santé Solidaire) en France si leurs revenus le permettent. Cette double couverture effective est une spécificité genevoise. Renseignez-vous auprès de la CPAM de Haute-Savoie ou de l'Ain.",
  },
  {
    question: "Puis-je conserver ma LAMal si je deviens frontalier après avoir résidé en Suisse ?",
    answer: "Non. La LAMal est liée à la résidence en Suisse. Si vous quittez la Suisse pour résider en France ou ailleurs mais continuez à y travailler, vous devenez frontalier et exercez votre droit d'option. Vous pouvez alors choisir de vous affilier à la LAMal côté Suisse ou de vous couvrir dans votre pays de résidence.",
  },
  {
    question: "Les enfants d'un expatrié doivent-ils aussi s'affilier à la LAMal ?",
    answer: "Oui. Tout enfant résidant en Suisse avec ses parents doit être affilié à la LAMal dans les 3 mois suivant l'établissement du domicile ou la naissance. Les primes enfants (0–18 ans) sont nettement inférieures aux primes adultes. Les parents peuvent choisir une caisse différente pour leurs enfants.",
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

const DISCLAIMER = (
  <div className="text-xs text-[#475569] bg-[#f1f5f9] border border-[#e2e8f0] rounded px-3 py-2 mb-6">
    Données indicatives à titre illustratif. Les primes exactes sont disponibles sur{' '}
    <a href="https://www.priminfo.admin.ch" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#0f2040]">priminfo.admin.ch</a>{' '}
    — comparateur officiel de l'OFSP.
  </div>
)

export default function ExpatrieFrontalierPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="bg-white border-b border-[#e2e8f0] pt-12 pb-10">
        <div className="container-xl">
          <Breadcrumb
            items={[
              { label: 'Accueil', href: '/' },
              { label: 'LAMal', href: '/lamal' },
              { label: 'Expatrié et frontalier' },
            ]}
          />
          <h1 className="text-5xl font-bold text-[#0f2040] leading-tight mb-4 max-w-2xl">
            LAMal pour les expatriés et frontaliers en Suisse romande.
          </h1>
          <p className="text-xl text-[#475569] max-w-2xl leading-relaxed">
            Affiliation obligatoire, délais à respecter, droit d'option pour les frontaliers :
            tout ce que vous devez savoir si vous êtes en mobilité internationale.
          </p>
        </div>
      </section>

      <div className="container-xl py-16">
        {DISCLAIMER}
        <AuthorBio publishedDate="1er janvier 2026" updatedDate="13 avril 2026" />

        <div className="flex gap-12">
          <div className="flex-1 min-w-0 space-y-14">

            {/* Expatrié */}
            <section id="expatrie">
              <h2 className="text-2xl font-semibold text-[#0f2040] mb-4">
                LAMal pour les expatriés et nouveaux arrivants
              </h2>
              <p className="text-[16px] text-[#475569] leading-relaxed mb-5">
                Dès que vous établissez votre domicile en Suisse, vous êtes soumis à la LAMal.
                L'affiliation est obligatoire dans les 90 jours — ne manquez pas ce délai.
              </p>
              <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-[8px] p-5 mb-5">
                <p className="font-semibold text-[#0f2040] mb-1">Important : comparez avant de vous affilier</p>
                <p className="text-[15px] text-[#475569]">
                  Vous avez 90 jours pour choisir votre caisse. Profitez-en pour comparer les primes —
                  c'est plus facile qu'après, car changer de caisse se fait seulement au 1er janvier.
                </p>
              </div>
              <ul className="space-y-3">
                {[
                  { t: '90 jours pour s\'affilier dès l\'arrivée', d: 'La couverture est rétroactive à la date de prise de domicile si vous respectez ce délai. Au-delà, une caisse vous est attribuée d\'office.' },
                  { t: 'Pièces nécessaires', d: 'Permis de séjour (B, C, G, L ou N) + attestation de domicile officielle. La plupart des caisses permettent l\'inscription en ligne.' },
                  { t: 'Aucune sélection selon l\'état de santé', d: 'Aucun assureur ne peut vous refuser pour la LAMal de base, quelle que soit votre nationalité ou votre situation de santé.' },
                  { t: 'Modèle standard recommandé au début', d: 'Le temps de trouver un médecin de confiance, commencez par le modèle standard. Vous pourrez passer à un modèle alternatif dès janvier suivant.' },
                  { t: 'LCA internationale selon vos besoins', d: 'Pour les voyages fréquents hors Suisse ou le rapatriement sanitaire, une assurance complémentaire LCA internationale est souvent utile.' },
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

            {/* Frontalier */}
            <section id="frontalier">
              <h2 className="text-2xl font-semibold text-[#0f2040] mb-4">
                LAMal pour les frontaliers
              </h2>
              <p className="text-[16px] text-[#475569] leading-relaxed mb-5">
                Les travailleurs frontaliers (résidant hors Suisse, travaillant en Suisse) ont
                un droit d'option : s'assurer en Suisse ou rester couverts dans leur pays de résidence.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-[#f0fdf4] border border-[#86efac] rounded-[8px] p-5">
                  <h3 className="font-semibold text-[#0f2040] mb-2 text-[15px]">Option Suisse (LAMal)</h3>
                  <ul className="text-[14px] text-[#475569] space-y-1.5">
                    <li>• Mêmes droits qu'un résident suisse</li>
                    <li>• Accès complet au réseau médical suisse</li>
                    <li>• Subsides cantonaux possibles</li>
                    <li>• Primes selon canton de travail</li>
                  </ul>
                </div>
                <div className="bg-[#f1f5f9] border border-[#e2e8f0] rounded-[8px] p-5">
                  <h3 className="font-semibold text-[#0f2040] mb-2 text-[15px]">Option pays de résidence</h3>
                  <ul className="text-[14px] text-[#475569] space-y-1.5">
                    <li>• Couverture dans le pays de domicile</li>
                    <li>• Soins en Suisse limités aux urgences</li>
                    <li>• Formulaire S1 (ex-E106) nécessaire</li>
                    <li>• Attention aux soins non urgents en Suisse</li>
                  </ul>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  { t: 'Délai d\'option : 3 mois dès début emploi', d: 'Ce choix est définitif sauf changement de situation (mariage, déménagement, retraite). À exercer par écrit auprès de votre employeur ou de la caisse de compensation.' },
                  { t: 'Formulaire S1 (ex-E106)', d: 'Si vous optez pour le pays de résidence, votre employeur suisse doit vous fournir le formulaire S1 qui atteste de votre couverture accidents via la LAA.' },
                  { t: 'Spécificité Genève — frontaliers français', d: 'Les frontaliers français travaillant à Genève peuvent cumuler la CMU-C (France) et bénéficier d\'une couverture renforcée. Renseignez-vous auprès de la CPAM et de l\'employeur genevois.' },
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

            {/* Quitter la Suisse */}
            <section id="depart">
              <h2 className="text-2xl font-semibold text-[#0f2040] mb-4">
                Quitter la Suisse : résiliation de la LAMal
              </h2>
              <p className="text-[16px] text-[#475569] leading-relaxed mb-5">
                La LAMal est liée à la résidence en Suisse. Votre couverture cesse automatiquement
                à la date de radiation du registre des habitants. Voici les étapes à suivre.
              </p>
              <div className="space-y-4">
                {[
                  {
                    n: '01',
                    title: 'Prévenir votre caisse',
                    desc: 'Informez votre caisse de votre départ avec une attestation de radiation de commune (obtenue à l\'office cantonal). La caisse peut vous demander une preuve de couverture dans le pays de destination.',
                  },
                  {
                    n: '02',
                    title: 'Remboursement au prorata',
                    desc: 'Les primes payées au-delà de la date de départ vous seront remboursées automatiquement. La franchise de l\'année courante est calculée pro-rata temporis.',
                  },
                  {
                    n: '03',
                    title: 'Attention aux soins en cours',
                    desc: 'Les soins médicaux en cours (traitement, physio) restent couverts jusqu\'à la date de départ. Transmettez toutes vos factures en cours avant de fermer votre compte.',
                  },
                  {
                    n: '04',
                    title: 'LCA : conditions de résiliation distinctes',
                    desc: 'Les assurances complémentaires LCA ont leurs propres conditions de résiliation (délai de préavis, période d\'engagement). Vérifiez votre contrat séparément de la LAMal.',
                  },
                ].map(step => (
                  <div key={step.n} className="flex gap-5">
                    <div className="text-[26px] font-bold text-[#1d4ed8] leading-none shrink-0 w-10 text-right">
                      {step.n}
                    </div>
                    <div className="pt-0.5">
                      <h3 className="font-semibold text-[#0f2040] text-[16px] mb-1">{step.title}</h3>
                      <p className="text-[15px] text-[#475569]">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <FAQ items={faqItems} />

            <section>
              <h3 className="text-[16px] font-semibold text-[#0f2040] mb-3">Voir aussi</h3>
              <div className="flex flex-col gap-2">
                {[
                  { href: '/lamal/maternite', label: 'Maternité et LAMal — couverture pour les expatriées' },
                  { href: '/lamal/salarie-independant', label: 'LAMal pour salariés et indépendants' },
                  { href: '/lamal/famille-retraite', label: 'LAMal pour les familles et retraités' },
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
              <MultiStepLeadForm />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
