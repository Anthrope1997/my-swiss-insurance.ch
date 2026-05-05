import type { Metadata } from 'next'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FAQ from '@/components/ui/FAQ'
import Link from 'next/link'
import AuthorBio from '@/components/ui/AuthorBio'
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

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Franchise LAMal 2026 : quel montant choisir ?',
  datePublished: '2026-01-01',
  dateModified: '2026-04-22',
  author: { '@type': 'Organization', name: 'My Swiss Insurance', url: 'https://my-swiss-insurance.ch' },
  publisher: { '@type': 'Organization', name: 'My Swiss Insurance' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://my-swiss-insurance.ch/lamal/franchise' },
}

const faqItems = [
  {
    question: 'Quelle franchise LAMal choisir en 2026 ?',
    answer:
      "Choisissez la franchise 2 500 CHF si vous êtes en bonne santé et avez peu de frais médicaux : vous économisez environ CHF 120 par mois sur la prime. Optez pour la franchise 300 CHF si vos dépenses médicales dépassent CHF 1 440 par an.",
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

const franchises = [
  { montant: 2500, prime: 444.65, seuil: 'CHF 1 440', conseil: "Aucune consultation prévue dans l'année" },
  { montant: 2000, prime: 471.80, seuil: 'CHF 1 114', conseil: '1 à 2 consultations par an maximum' },
  { montant: 1500, prime: 499.20, seuil: 'CHF 785',   conseil: 'Quelques consultations, pas de traitement régulier' },
  { montant: 1000, prime: 526.55, seuil: 'CHF 456',   conseil: 'Consultations occasionnelles' },
  { montant: 500,  prime: 554.05, seuil: 'CHF 127',   conseil: 'Suivi médical régulier' },
  { montant: 300,  prime: 564.60, seuil: 'Référence',  conseil: 'Traitement chronique, médicaments réguliers, grossesse' },
]

const enBref = [
  "La franchise 2 500 CHF économise 120 CHF par mois sur votre prime et vous expose à 3 200 CHF de reste à charge maximum par an.",
  "Le seuil d'équilibre entre franchise 300 CHF et 2 500 CHF est de 1 440 CHF de frais médicaux annuels.",
  "Les enfants bénéficient de franchises de 0 à 600 CHF par an, avec une quote-part plafonnée à 350 CHF par an.",
]

const heroStats = [
  { value: '6',         label: 'Niveaux de franchise',       sub: 'de 300 à 2 500 CHF par an'         },
  { value: 'CHF 1 440', label: "Seuil d'équilibre maximum",  sub: 'franchise 300 vs 2 500 CHF par an' },
  { value: 'CHF 120',   label: 'Économie maximum par mois',  sub: 'sur la prime à Zurich, adulte'     },
]

const toc = [
  { id: 'definition', label: "1. Franchise et quote-part"    },
  { id: 'tableau',    label: "2. Quelle franchise choisir ?" },
  { id: 'enfants',    label: "3. Franchise enfant"           },
  { id: 'changement', label: "4. Changer de franchise"       },
  { id: 'faq',        label: "5. Questions fréquentes"       },
]

const guidesAssocies = [
  { href: '/lamal/guide',             label: 'Comprendre la LAMal'       },
  { href: '/lamal/modeles',           label: 'Les 4 modèles LAMal'       },
  { href: '/lamal/subsides',          label: 'Calculer mes subsides'     },
  { href: '/lamal/changer-de-caisse', label: 'Changer de caisse maladie' },
]

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
            { label: 'LAMal', href: '/lamal' },
            { label: 'Franchise LAMal' },
          ]} />

          <h1 className="text-4xl sm:text-5xl font-bold text-ink leading-tight mb-4 max-w-3xl">
            Franchise LAMal : quel montant choisir en 2026 ?
          </h1>
          <p className="text-[18px] text-slate max-w-2xl leading-relaxed mb-10">
            La franchise est le montant annuel que vous payez avant que votre caisse intervienne.
            Choisir le bon niveau, entre 300 et 2 500 CHF par an, peut économiser jusqu&apos;à 120 CHF par mois sur votre prime.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {heroStats.map(s => (
              <div key={s.label} className="bg-cloud/60 border border-edge rounded-xl px-5 py-4">
                <div className="text-2xl font-bold text-ink leading-none">{s.value}</div>
                <div className="text-[13px] font-medium text-ink/70 mt-0.5">{s.label}</div>
                <div className="text-[12px] text-slate mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── ZONE 2 — Navigation rapide ── */}
      <div className="bg-cloud border-b border-edge py-8">
        <div className="container-xl grid grid-cols-1 md:grid-cols-2 gap-5">

          <div className="bg-white border border-edge rounded-xl p-5">
            <p className="text-[11px] font-semibold text-ink uppercase tracking-widest mb-3">
              En bref
            </p>
            <ul className="space-y-3">
              {enBref.map((phrase, i) => (
                <li key={i} className="flex gap-2.5 text-[15px] text-ink leading-relaxed">
                  <span className="text-brand font-bold shrink-0 mt-0.5" aria-hidden="true">•</span>
                  <span>{phrase}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-edge rounded-xl p-5">
            <p className="text-[11px] font-semibold text-ink uppercase tracking-widest mb-3">
              Sommaire
            </p>
            <ul className="space-y-1">
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="toc-link">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ── ZONE 3 — Contenu détaillé ── */}
      <div className="container-xl py-12">
        <article className="max-w-3xl space-y-4">

          {/* 1 — Définition */}
          <section id="definition">
            <h2 className="article-h2">1. Franchise et quote-part : quelle différence ?</h2>

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
                    <li key={i} className="flex gap-3 text-[16px] text-slate">
                      <svg className="w-4 h-4 text-brand mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
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
                    <li key={i} className="flex gap-3 text-[16px] text-slate">
                      <svg className="w-4 h-4 text-brand mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="callout flex gap-3">
              <svg className="text-[#378ADD] shrink-0 mt-0.5" width="20" height="20"
                   viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                   strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
                <line x1="9.5" y1="18" x2="14.5" y2="18" />
                <line x1="10" y1="21" x2="14" y2="21" />
              </svg>
              <div>
                <p className="font-semibold text-ink mb-1">Exemple : franchise 1 500 CHF, CHF 2 000 de frais dans l&apos;année</p>
                <ul className="space-y-1">
                  <li className="text-[16px]">Vous payez CHF 1 550 : CHF 1 500 (franchise) + CHF 50 (10% de quote-part sur les CHF 500 restants).</li>
                  <li className="text-[16px]">Votre caisse prend en charge CHF 450 : les 90% au-dessus de la franchise.</li>
                </ul>
              </div>
            </div>

            <p className="article-p mt-6">
              <Link href="/lamal/guide" className="text-brand hover:underline">
                Comprendre le fonctionnement complet de la LAMal →
              </Link>
            </p>
          </section>

          {/* 2 — Tableau comparatif */}
          <section id="tableau">
            <h2 className="article-h2">2. Quelle franchise choisir selon vos frais médicaux annuels ?</h2>

            <p className="article-p mb-6">
              La franchise 2 500 CHF est avantageuse si vos frais médicaux annuels restent sous 1 440 CHF.
              Au-delà, la franchise 300 CHF devient moins coûteuse au total, prime et reste à charge confondus.
            </p>

            <div className="overflow-x-auto border border-edge rounded-[8px] mb-2">
              <table className="stripe-table w-full">
                <thead>
                  <tr>
                    <th className="text-left whitespace-nowrap">Franchise</th>
                    <th className="text-left whitespace-nowrap">Prime par mois</th>
                    <th className="text-left whitespace-nowrap hidden md:table-cell">Avantageuse si frais annuels inférieurs à</th>
                    <th className="text-left whitespace-nowrap">Profil concerné</th>
                  </tr>
                </thead>
                <tbody>
                  {franchises.map((f) => (
                    <tr key={f.montant} className={f.montant === 300 ? 'bg-[#eff6ff]' : ''}>
                      <td className="font-semibold text-ink whitespace-nowrap">
                        CHF {f.montant.toLocaleString('fr-CH')} par an
                      </td>
                      <td className="font-medium text-ink whitespace-nowrap">
                        CHF {f.prime.toFixed(2)}
                      </td>
                      <td className="text-ink whitespace-nowrap hidden md:table-cell">{f.seuil}</td>
                      <td className="text-slate whitespace-nowrap">{f.conseil}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[13px] text-slate/60 mt-2 md:hidden">Tableau complet visible sur ordinateur.</p>
            <p className="text-[13px] text-slate/60 mt-3 mb-4">
              Primes pour un adulte (26 ans et plus) à Zurich, modèle standard, OFSP 2026.
            </p>

            <div className="callout flex gap-3">
              <svg className="text-[#378ADD] shrink-0 mt-0.5" width="20" height="20"
                   viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                   strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
                <line x1="9.5" y1="18" x2="14.5" y2="18" />
                <line x1="10" y1="21" x2="14" y2="21" />
              </svg>
              <div>
                <p className="font-semibold text-ink mb-1">Vous hésitez entre CHF 2 500 et CHF 300 ?</p>
                <p className="text-[16px]">
                  Avec la franchise CHF 2 500, vous économisez CHF 1 440 par an sur votre prime (CHF 120 par mois).
                  En contrepartie, vous payez jusqu&apos;à CHF 2 500 de votre poche en cas de maladie.
                  Le point de bascule se situe à CHF 1 440 de frais médicaux annuels : en dessous, la franchise CHF 2 500
                  est gagnante. Au-dessus, c&apos;est la franchise CHF 300.
                </p>
              </div>
            </div>

            <p className="article-p mt-6">
              <Link href="/lamal/comparateur" className="text-brand hover:underline">
                Comparer les primes LAMal par canton →
              </Link>
            </p>
          </section>

          {/* 3 — Franchise enfant */}
          <section id="enfants">
            <h2 className="article-h2">3. Quelle franchise choisir pour un enfant ?</h2>

            <p className="article-p mb-6">
              Les franchises enfant sont distinctes des franchises adultes, de 0 à 600 CHF par an.
              La quote-part est plafonnée à 350 CHF par an, contre 700 CHF pour un adulte.
            </p>

            <div className="callout-success flex gap-3 mb-6">
              <svg className="text-[#378ADD] shrink-0 mt-0.5" width="20" height="20"
                   viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                   strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
                <line x1="9.5" y1="18" x2="14.5" y2="18" />
                <line x1="10" y1="21" x2="14" y2="21" />
              </svg>
              <p className="text-[16px]">
                <strong>Recommandation :</strong> la franchise 0 CHF par an est conseillée pour les
                jeunes enfants qui consultent fréquemment. À partir de l&apos;adolescence (15 à 18 ans),
                une franchise plus élevée peut être envisagée si l&apos;enfant est en bonne santé.
              </p>
            </div>

            <div className="overflow-x-auto border border-edge rounded-[8px]">
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

            <p className="article-p mt-6">
              <Link href="/lamal/ma-famille" className="text-brand hover:underline">
                Assurance maladie famille et maternité : ce qu&apos;il faut savoir →
              </Link>
            </p>
          </section>

          {/* 4 — Changement */}
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

            <div className="bg-cloud border-l-4 border-ink rounded-r-lg px-5 py-4 my-4">
              <p className="text-[12px] font-semibold text-ink uppercase tracking-widest mb-1.5">À retenir</p>
              <p className="text-[15px] text-ink leading-relaxed">
                La demande doit parvenir à votre caisse avant le 30 novembre pour une prise d&apos;effet au 1er janvier.
                Passé ce délai, votre franchise reste inchangée pour toute l&apos;année suivante.
              </p>
            </div>

            <p className="article-p mt-6">
              <Link href="/lamal/changer-de-caisse" className="text-brand hover:underline">
                Guide complet : changer de caisse maladie →
              </Link>
            </p>
          </section>

          {/* 5 — FAQ */}
          <section id="faq">
            <FAQ items={faqItems} title="5. Questions fréquentes sur la franchise LAMal" />
          </section>

          {/* Formulaire */}
          <div id="contact" className="scroll-mt-20 border-t border-edge pt-12 mt-4">
            <h2 className="text-2xl font-semibold text-ink mb-3">Besoin d&apos;aide ?</h2>
            <p className="text-[16px] text-slate mb-6 leading-relaxed">
              Un expert vous rappelle sous 24 heures pour établir avec vous une solution
              personnalisée. Gratuit, sans engagement.
            </p>
            <MultiStepLeadForm redirectOnSuccess="/fr/merci" />
          </div>

          {/* Bandeau MSI */}
          <AuthorBio publishedDate="1er janvier 2026" updatedDate="22 avril 2026" />

          {/* Guides associés */}
          <section className="pt-8 border-t border-edge mt-4">
            <p className="text-[13px] font-semibold text-slate uppercase tracking-widest mb-4">
              Guides associés
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {guidesAssocies.map(({ href, label }) => (
                <Link key={href} href={href}
                  className="flex items-center gap-2 text-[14px] text-slate hover:text-brand border border-edge rounded-[8px] px-4 py-3 transition-colors hover:border-brand/30">
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
