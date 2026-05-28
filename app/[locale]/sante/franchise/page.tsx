import type { Metadata } from 'next'
import NeedHelpSection from '@/components/ui/NeedHelpSection'
import FranchiseChart from '@/components/ui/FranchiseChart'
import FranchiseSimulator from '@/components/lamal/FranchiseSimulator'
import KeyFact from '@/components/ui/KeyFact'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FAQ from '@/components/ui/FAQ'
import Link from 'next/link'
import AuthorBio from '@/components/ui/AuthorBio'
import HeroStats from '@/components/ui/HeroStats'
import { nationalBreakEven, nationalBreakEvenJA, nationalBreakEvenEnfant, nationalAvgPrime } from '@/lib/sante/calcul-franchise'

export const metadata: Metadata = {
  title: "Franchise LAMal 2026 : quel montant choisir",
  description:
    "6 niveaux de franchise LAMal, de CHF 300 à CHF 2 500 par an. Tableau des seuils d'équilibre, franchise enfant et délais de changement. Guide complet 2026.",
  openGraph: {
    title: 'Franchise LAMal 2026 : quel montant choisir ?',
    description: "Franchise LAMal : seuils d'équilibre, quote-part, enfants. Guide 2026.",
    url: 'https://my-swiss-insurance.ch/sante/franchise',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Franchise LAMal 2026 : quel montant choisir ?',
  datePublished: '2026-01-01',
  dateModified: '2026-05-18',
  author: { '@type': 'Organization', name: 'My Swiss Insurance', url: 'https://my-swiss-insurance.ch' },
  publisher: { '@type': 'Organization', name: 'My Swiss Insurance' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://my-swiss-insurance.ch/sante/franchise' },
}

const seuil       = nationalBreakEven()
const seuilJA     = nationalBreakEvenJA()
const seuilEnfant = nationalBreakEvenEnfant()
const economieMoy = Math.round((nationalAvgPrime(300) - nationalAvgPrime(2500)) * 12)
const pctEconomie = Math.round((nationalAvgPrime(300) - nationalAvgPrime(2500)) / nationalAvgPrime(300) * 100)
const fmtChf = (n: number) => n.toLocaleString('fr-CH')

const faqItems = [
  {
    question: 'Quelle franchise LAMal choisir en 2026 ?',
    answer:
      `Choisissez la franchise de CHF 2 500 si vous êtes un adulte en bonne santé et avez peu de frais médicaux : vous économisez environ CHF 120 par mois sur la prime. Optez pour la franchise de CHF 300 si vos dépenses médicales dépassent CHF ${fmtChf(seuil)} par an en Suisse.`,
  },
  {
    question: "Peut-on changer de franchise en cours d'année ?",
    answer:
      "Non. Vous choisissez votre franchise une fois par an, au 1er janvier. Envoyez votre demande à votre caisse avant le 30 novembre.",
  },
  {
    question: "Quelle est la différence entre la franchise et la quote-part ?",
    answer:
      "La franchise est le montant fixe annuel que vous payez avant que l'assurance intervienne (CHF 300 à CHF 2 500 par an). La quote-part représente 10 % des frais médicaux dépassant la franchise. Son plafond est CHF 700 par an pour un adulte et CHF 350 pour un enfant.",
  },
  {
    question: "Quelle franchise recommander pour un enfant ?",
    answer:
      "Pour les enfants de 0 à 18 ans, choisissez la franchise de CHF 0. Les enfants consultent fréquemment : l'économie sur la prime ne compense pas le risque d'un reste à charge élevé. Les franchises disponibles vont de CHF 0 à CHF 600 par an.",
  },
  {
    question: "La franchise s'applique-t-elle à chaque prestation ?",
    answer:
      "Non, la franchise est annuelle. Dès qu'elle est épuisée, votre assurance prend en charge 90 % des soins supplémentaires. La franchise repart à zéro le 1er janvier de chaque année.",
  },
  {
    question: "La maternité est-elle soumise à la franchise ?",
    answer:
      "Non. La maternité (accouchement, consultations prénatales, soins post-partum OFSP) échappe à toute franchise et quote-part. La mère ne paie aucun reste à charge pour ces prestations.",
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


const enBref = [
  <>{"La franchise est le montant que vous payez avant que l'assurance n'intervienne. "}
    <strong className="font-medium text-ink">{"Une franchise élevée réduit votre prime mensuelle mais augmente votre charge financière"}</strong>
    {" en cas de frais médicaux."}</>,
  <>{"Pour un adulte (26 ans et plus), la franchise de CHF 2 500 est plus économique tant que vos frais médicaux annuels restent inférieurs à "}
    <strong className="font-medium text-ink">CHF {fmtChf(seuil)}</strong>
    {". Au-delà, la franchise de CHF 300 est plus avantageuse. Ce seuil descend à "}
    <strong className="font-medium text-ink">CHF {fmtChf(seuilJA)}</strong>
    {" pour un jeune adulte (19 à 25 ans) et à "}
    <strong className="font-medium text-ink">CHF {fmtChf(seuilEnfant)}</strong>
    {" pour un enfant (0 à 18 ans)."}</>,
  <>{"Pour changer de franchise, signalez-le à votre assureur "}
    <strong className="font-medium text-ink">{"avant le 30 novembre"}</strong>
    {". Le changement prend effet au 1er janvier. Sans demande, votre franchise actuelle est reconduite automatiquement."}</>,
]

const heroStats = [
  { value: `CHF ${fmtChf(economieMoy)}/an`, label: 'Économie moyenne réalisable',   sub: 'En changeant de franchise'                               },
  { value: '6',                          label: 'Niveaux de franchise pour adultes', sub: 'De CHF 300 à CHF 2 500 par an'                              },
  { value: 'CHF 700',                    label: 'Quote-part pour un adulte',         sub: 'CHF 350 pour un enfant'                                     },
]

const toc = [
  { id: 'simulateur', label: 'Quelle franchise pour votre profil ?' },
  { id: 'definition', label: 'Franchise et quote-part'               },
  { id: 'choisir',    label: 'Quelle franchise choisir ?'            },
  { id: 'changement', label: 'Changer de franchise'                  },
  { id: 'faq',        label: 'Questions fréquentes'                  },
]

const guidesAssocies = [
  { href: '/sante/guide',             label: 'Comprendre la LAMal'       },
  { href: '/sante/modeles',           label: 'Les 4 modèles LAMal'       },
  { href: '/sante/subsides',          label: 'Calculer mes subsides'     },
  { href: '/sante/changer-de-caisse', label: 'Changer de caisse maladie' },
]

const checkIcon = (
  <svg className="w-4 h-4 text-brand mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
  </svg>
)

export default function FranchisePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── ZONE 1 — Accroche ── */}
      <section className="bg-white border-b border-edge pt-10 pb-12">
        <div className="container-xl">

          <Breadcrumb items={[
            { label: 'Accueil', href: '/' },
            { label: 'LAMal', href: '/sante' },
            { label: 'Franchise LAMal' },
          ]} />

          <h1 className="text-4xl sm:text-5xl font-bold text-ink leading-tight mb-4">
            Franchise LAMal : quel montant choisir en 2026 ?
          </h1>
          <p className="text-[16px] text-slate leading-relaxed mb-10">
            La franchise est le montant annuel que vous payez avant que votre assurance maladie de base LAMal intervienne.
            La franchise de CHF 2 500 économise jusqu&apos;à CHF 120 par mois sur la prime par rapport à la franchise de CHF 300.
          </p>

          <HeroStats stats={heroStats} />

        </div>
      </section>

      {/* ── ZONE 2 — En bref / Sommaire ── */}
      <div className="bg-cloud border-b border-edge py-8">
        <div className="container-xl grid grid-cols-1 md:grid-cols-2 gap-5">

          <div className="bg-white border border-edge rounded-xl p-5">
            <p className="text-2xl font-semibold text-ink mb-3">En bref</p>
            <ul className="space-y-3">
              {enBref.map((phrase, i) => (
                <li key={i} className="flex gap-2.5 text-[16px] text-slate leading-relaxed">
                  <span className="text-brand font-bold shrink-0 mt-0.5" aria-hidden="true">•</span>
                  <span>{phrase}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-edge rounded-xl p-5">
            <p className="text-2xl font-semibold text-ink mb-3">Sommaire</p>
            <ul className="space-y-1">
              {toc.map((item, i) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="block text-[16px] text-slate leading-relaxed hover:text-brand hover:bg-cloud px-2 py-1 rounded transition-colors">
                    {i + 1}. {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ── ZONE 3 — Simulateur ── */}
      <div className="border-b border-edge bg-white py-10">
        <div className="container-xl">
          <section id="simulateur">
            <h2 className="article-h2">1. Quelle franchise pour votre profil ?</h2>
            <p className="article-p mb-2">
              Indiquez votre code postal, votre profil et vos frais médicaux annuels estimés.
              Le simulateur vous indique la franchise la plus avantageuse selon votre situation.
            </p>
            <FranchiseSimulator />
          </section>
        </div>
      </div>

      {/* ── ZONE 4 — Contenu détaillé ── */}
      <div className="container-xl py-12">
        <article className="space-y-4">

          {/* 02 — Définition */}
          <section id="definition">
            <h2 className="article-h2">2. Franchise et quote-part : quelle différence ?</h2>

            <p className="article-p mb-6">
              La franchise et la quote-part sont les deux mécanismes de participation aux frais médicaux.
              Ils s&apos;appliquent successivement dans l&apos;année et ont chacun un plafond propre.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-white border border-edge rounded-lg p-5">
                <h3 className="article-h3">La franchise</h3>
                <ul className="space-y-2">
                  {[
                    'Montant fixe : CHF 300 à CHF 2 500 par an (adulte)',
                    "Vous payez 100 % des frais médicaux jusqu'à ce montant",
                    'Vous la choisissez une fois par an, avant le 30 novembre',
                    'Plus la franchise est élevée, plus la prime mensuelle est basse',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-[16px] text-slate">{checkIcon}{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border border-edge rounded-lg p-5">
                <h3 className="article-h3">La quote-part</h3>
                <ul className="space-y-2">
                  {[
                    '10 % des frais médicaux dépassant la franchise',
                    'Plafond : CHF 700 par an (adulte), CHF 350 par an (enfant)',
                    'Automatique, non modifiable',
                    'Coût maximum total : franchise + CHF 700 par an',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-[16px] text-slate">{checkIcon}{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <KeyFact label="Exemple">
              <p className="font-semibold text-ink mb-1">Franchise de CHF 1 500 et CHF 2 000 de frais médicaux dans l&apos;année</p>
              <ul className="space-y-1">
                <li>Vous payez CHF 1 550 : CHF 1 500 (franchise) + CHF 50 (10 % de quote-part sur les CHF 500 restants).</li>
                <li>Votre caisse prend en charge CHF 450 : les 90 % au-dessus de la franchise.</li>
              </ul>
            </KeyFact>

            <p className="article-p mt-6">
              <Link href="/sante/guide" className="text-brand hover:underline">
                Comprendre le fonctionnement complet de la LAMal →
              </Link>
            </p>
          </section>

          {/* 03 — Quelle franchise choisir ? (adulte — tableau + graphique) */}
          <section id="choisir">
            <h2 className="article-h2">3. Quelle franchise choisir ?</h2>

            <p className="article-p mb-6">
              La franchise adaptée à votre situation dépend de vos frais médicaux annuels et de votre canton de résidence.
              Les franchises adulte vont de CHF 300 à CHF 2 500 par an. Les franchises enfant vont de CHF 0 à CHF 600 par an.
            </p>

            {/* Deux cartes : adulte / enfant */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-white border border-edge rounded-lg p-5">
                <h3 className="article-h3">Adulte, 19 ans et plus</h3>
                <ul className="space-y-2 mt-3">
                  <li className="flex gap-2 items-start text-[16px] text-ink">
                    {checkIcon}<span>6 niveaux de franchise</span>
                  </li>
                  <li className="flex gap-2 items-start text-[16px] text-ink">
                    {checkIcon}<span>CHF 300, 500, 1 000, 1 500, 2 000 et 2 500 par an</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white border border-edge rounded-lg p-5">
                <h3 className="article-h3">Enfants, 0 à 18 ans</h3>
                <ul className="space-y-2 mt-3">
                  <li className="flex gap-2 items-start text-[16px] text-ink">
                    {checkIcon}<span>6 niveaux de franchise</span>
                  </li>
                  <li className="flex gap-2 items-start text-[16px] text-ink">
                    {checkIcon}<span>CHF 0, 100, 200, 300, 400 et 600 par an</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Graphique — desktop uniquement */}
            <p className="article-p mb-4">
              Votre prime mensuelle dépend de la franchise que vous choisissez. Plus la franchise est élevée, plus la prime baisse, et inversement. La franchise optimale réduit votre coût total annuel tout en maintenant votre couverture LAMal.
            </p>
            <p className="text-[16px] font-semibold text-ink mb-3">
              Coût annuel moyen par franchise de l&apos;assurance LAMal la moins chère pour un adulte
            </p>
            <div className="hidden md:block">
              <FranchiseChart />
            </div>

            <KeyFact>
              Pour un adulte (26 ans et plus), en dessous de <strong>CHF {fmtChf(seuil)}</strong> de frais médicaux par an, la franchise de CHF 2 500 coûte moins cher.
              Au-delà, la franchise de CHF 300 est plus avantageuse. Ce seuil descend à <strong>CHF {fmtChf(seuilJA)}</strong> pour un jeune adulte (19 à 25 ans) et à <strong>CHF {fmtChf(seuilEnfant)}</strong> pour un enfant (0 à 18 ans).
            </KeyFact>

            {/* Franchise enfant */}
            <h3 className="article-h3 mt-8">Franchise enfant</h3>
            <p className="article-p mb-4">
              Les franchises enfant vont de CHF 0 à CHF 600 par an.
              La quote-part est plafonnée à CHF 350 par an, contre CHF 700 pour un adulte.
            </p>

            <div className="overflow-x-auto border border-edge rounded-[8px] mb-4">
              <table className="stripe-table w-full">
                <thead>
                  <tr>
                    <th className="text-left whitespace-nowrap">Franchise par an</th>
                    <th className="text-left whitespace-nowrap">Profil adapté</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['CHF 400 à 600', 'Adolescents en bonne santé, rarement malades'],
                    ['CHF 200 à 300', 'Enfants en bonne santé, quelques visites annuelles'],
                    ['CHF 100',       'Enfants avec des consultations régulières'],
                    ['CHF 0',         'Nourrissons et enfants en bas âge, consultations fréquentes'],
                  ].map(([fr, profil], i) => (
                    <tr key={i}>
                      <td className="font-semibold text-ink whitespace-nowrap">{fr}</td>
                      <td className="whitespace-nowrap">{profil}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <KeyFact label="Recommandation">
              Choisissez la franchise de CHF 0 pour les jeunes enfants qui consultent fréquemment.
              Pour un adolescent en bonne santé (15 à 18 ans), une franchise plus élevée réduit la prime sans risque disproportionné.
            </KeyFact>

          </section>

          {/* 04 — Changement */}
          <section id="changement">
            <h2 className="article-h2">4. Comment changer de franchise ?</h2>

            <p className="article-p mb-6">
              Le changement de franchise suit un calendrier strict et n&apos;est possible qu&apos;une fois par an.
              La date limite pour notifier votre caisse est le 30 novembre, pour une prise d&apos;effet au 1er janvier suivant.
            </p>

            <ol className="space-y-4 mb-6">
              {[
                {
                  n: '1',
                  t: 'Avant le 30 novembre',
                  d: "Informez votre caisse par écrit ou via votre espace client en ligne que vous souhaitez modifier votre franchise pour l'année suivante.",
                },
                {
                  n: '2',
                  t: "Prise d'effet au 1er janvier",
                  d: "La nouvelle franchise s'applique dès le 1er janvier. L'ancienne franchise couvre toutes les dépenses médicales de l'année écoulée.",
                },
                {
                  n: '3',
                  t: 'Franchise et changement de caisse',
                  d: 'Vous choisissez votre franchise chez la nouvelle caisse en même temps que vous changez de caisse. Une seule démarche suffit.',
                },
              ].map(s => (
                <li key={s.n} className="flex gap-4">
                  <span className="w-7 h-7 bg-brand text-white rounded-full flex items-center justify-center text-[16px] font-semibold shrink-0 mt-0.5">
                    {s.n}
                  </span>
                  <div>
                    <span className="font-semibold text-ink text-[16px]">{s.t} : </span>
                    <span className="text-slate text-[16px]">{s.d}</span>
                  </div>
                </li>
              ))}
            </ol>

            <KeyFact>
              Envoyez votre demande à votre caisse avant le 30 novembre pour une prise d&apos;effet au 1er janvier.
              Passé ce délai, votre franchise reste inchangée pour toute l&apos;année.
            </KeyFact>

            <p className="article-p mt-6">
              <Link href="/sante/changer-de-caisse" className="text-brand hover:underline">
                Guide complet : changer de caisse maladie →
              </Link>
            </p>
          </section>

          {/* 4 — FAQ */}
          <section id="faq" className="border-t border-edge pt-8">
            <FAQ items={faqItems} title="5. Questions fréquentes sur la franchise LAMal" />
          </section>

          {/* Formulaire */}
          <NeedHelpSection />

          <AuthorBio publishedDate="1er janvier 2026" updatedDate="17 mai 2026" />

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
