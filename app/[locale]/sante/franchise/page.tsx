import type { Metadata } from 'next'
import FranchiseChart from '@/components/ui/FranchiseChart'
import FranchiseSimulator from '@/components/lamal/FranchiseSimulator'
import KeyFact from '@/components/ui/KeyFact'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FAQ from '@/components/ui/FAQ'
import Link from 'next/link'
import AuthorBio from '@/components/ui/AuthorBio'
import UnifiedLeadForm from '@/components/ui/UnifiedLeadForm'
import HeroStats from '@/components/ui/HeroStats'

export const metadata: Metadata = {
  title: "Franchise LAMal 2026 : quel montant choisir — My Swiss Insurance",
  description:
    "6 niveaux de franchise LAMal, de 300 à 2 500 CHF par an. Tableau des seuils d'équilibre, franchise enfant et délais de changement. Guide complet 2026.",
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
  dateModified: '2026-05-17',
  author: { '@type': 'Organization', name: 'My Swiss Insurance', url: 'https://my-swiss-insurance.ch' },
  publisher: { '@type': 'Organization', name: 'My Swiss Insurance' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://my-swiss-insurance.ch/sante/franchise' },
}

const faqItems = [
  {
    question: 'Quelle franchise LAMal choisir en 2026 ?',
    answer:
      "Choisissez la franchise 2 500 CHF si vous êtes en bonne santé et avez peu de frais médicaux : vous économisez environ CHF 120 par mois sur la prime. Optez pour la franchise 300 CHF si vos dépenses médicales dépassent CHF 1 899 par an (seuil moyen suisse : 1 897 CHF).",
  },
  {
    question: "Peut-on changer de franchise en cours d'année ?",
    answer:
      "Non. La franchise se choisit une fois par an, au 1er janvier. La demande doit être envoyée à votre caisse avant le 30 novembre.",
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


const enBref = [
  "La franchise 2 500 CHF économise environ 120 CHF par mois sur votre prime et vous expose à 3 200 CHF de reste à charge maximum par an.",
  "Le seuil d'équilibre entre franchise 300 CHF et 2 500 CHF est de 1 897 CHF de frais médicaux annuels en moyenne suisse.",
  "Les enfants bénéficient de franchises de 0 à 600 CHF par an, avec une quote-part plafonnée à 350 CHF par an.",
]

const heroStats = [
  { value: '6',           label: 'Niveaux de franchise',        sub: 'de 300 à 2 500 CHF par an'                         },
  { value: '1 897 CHF',   label: "Seuil d'équilibre moyen",      sub: 'F300 vs F2500 · 42 régions · adulte 35 ans'        },
  { value: '1 463 CHF',   label: 'Économie max. sur la prime',  sub: 'en passant à F2500 · adulte 35 ans · OFSP 2026'    },
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
            Choisir le bon niveau, entre 300 et 2 500 CHF par an, peut économiser jusqu&apos;à 120 CHF par mois sur votre prime.
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
              Le simulateur calcule la franchise qui minimise votre coût total annuel.
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
                    'Montant fixe : 300 à 2 500 CHF par an (adulte)',
                    "Vous payez 100% des frais jusqu'à ce montant",
                    'Choisie une fois par an, avant le 30 novembre',
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
                    '10% des frais dépassant la franchise',
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
              <p className="font-semibold text-ink mb-1">Franchise 1 500 CHF, CHF 2 000 de frais dans l&apos;année</p>
              <ul className="space-y-1">
                <li>Vous payez CHF 1 550 : CHF 1 500 (franchise) + CHF 50 (10% de quote-part sur les CHF 500 restants).</li>
                <li>Votre caisse prend en charge CHF 450 : les 90% au-dessus de la franchise.</li>
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
              La franchise optimale dépend de vos frais médicaux annuels et de votre canton de résidence.
              Les franchises adulte vont de 300 à 2 500 CHF par an. Les franchises enfant vont de 0 à 600 CHF par an.
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
            <p className="text-[16px] font-semibold text-ink mb-3">
              Illustration de l&apos;évolution du coût annuel de l&apos;assurance LAMal d&apos;un adulte ayant choisi la prime la moins chère par franchise en Suisse
            </p>
            <div className="hidden md:block">
              <FranchiseChart />
            </div>

            <KeyFact>
              <p className="mb-2">
                En moyenne en Suisse, pour les primes adultes les moins chères, le point de bascule se situe
                vers <strong>CHF 1 897 de frais médicaux annuels</strong> (franchise 300 vs 2 500 CHF).
                En dessous de ce seuil, la franchise CHF 2 500 est plus avantageuse.
                Au-dessus, la franchise CHF 300 limite mieux le reste à charge total.
              </p>
              <p className="mb-2">
                <strong>Jeune adulte (19–25 ans) :</strong> seuil d&apos;équilibre franchise 300 vs 2 500 CHF à environ{' '}
                <strong>CHF 1 722</strong> en moyenne suisse — les primes JA étant plus basses, l&apos;économie sur la prime est moindre.
              </p>
              <p>
                <strong>Enfant (0–18 ans) :</strong> seuil d&apos;équilibre franchise 0 vs 600 CHF à environ{' '}
                <strong>CHF 200</strong> en moyenne suisse — dès le premier médecin, la franchise 0 CHF devient avantageuse.
              </p>
            </KeyFact>

            {/* Franchise enfant */}
            <h3 className="article-h3 mt-8">Franchise enfant</h3>
            <p className="article-p mb-4">
              Les franchises enfant sont distinctes des franchises adultes, de 0 à 600 CHF par an.
              La quote-part est plafonnée à 350 CHF par an, contre 700 CHF pour un adulte.
            </p>

            <KeyFact label="Recommandation">
              La franchise 0 CHF par an est conseillée pour les jeunes enfants qui consultent fréquemment.
              À partir de l&apos;adolescence (15 à 18 ans), une franchise plus élevée peut être envisagée si l&apos;enfant est en bonne santé.
            </KeyFact>

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

            <p className="article-p">
              <Link href="/sante/ma-famille" className="text-brand hover:underline">
                Assurance maladie famille et maternité : ce qu&apos;il faut savoir →
              </Link>
            </p>
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
                  d: "Informez votre caisse par écrit ou via votre espace client en ligne de votre souhait de modifier votre franchise pour l'année suivante.",
                },
                {
                  n: '2',
                  t: "Prise d'effet au 1er janvier",
                  d: "La nouvelle franchise s'applique dès le 1er janvier. Toutes les dépenses médicales de l'année précédente sont calculées avec l'ancienne franchise.",
                },
                {
                  n: '3',
                  t: 'Franchise et changement de caisse',
                  d: 'Si vous changez de caisse, vous choisissez simultanément votre franchise chez la nouvelle caisse. Le processus se fait en une seule démarche.',
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
              La demande doit parvenir à votre caisse avant le 30 novembre pour une prise d&apos;effet au 1er janvier.
              Passé ce délai, votre franchise reste inchangée pour toute l&apos;année suivante.
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
          <div id="contact" className="scroll-mt-20 border-t border-edge pt-12 mt-4">
            <h2 className="text-2xl font-semibold text-ink hover:text-brand transition-colors mb-3">Besoin d&apos;aide ?</h2>
            <p className="text-[16px] text-slate mb-6 leading-relaxed">
              Un expert vous rappelle sous 24 heures pour établir avec vous une solution
              personnalisée. Gratuit, sans engagement.
            </p>
            <UnifiedLeadForm redirectOnSuccess="/fr/merci" />
          </div>

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
