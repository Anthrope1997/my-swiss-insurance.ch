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
      "Choisissez la franchise 300 CHF si vos frais médicaux annuels dépassent environ CHF 1 440 par an. Optez pour la franchise 2 500 CHF si vous êtes en bonne santé : vous économisez environ CHF 120 par mois sur la prime mais vous assumez jusqu'à CHF 2 500 par an de frais médicaux. Le seuil d'équilibre entre les deux franchises extrêmes se situe autour de CHF 1 440 par an.",
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
  { montant: 2500, prime: 444.63, ecMois: 119.98, ecAnn: 1440, seuilEquilibre: 'environ CHF 1 440', conseil: 'Optimal pour adultes très sains' },
  { montant: 2000, prime: 471.82, ecMois: 92.79,  ecAnn: 1113, seuilEquilibre: 'environ CHF 1 300', conseil: 'Recommandé sans maladie chronique' },
  { montant: 1500, prime: 499.20, ecMois: 65.41,  ecAnn: 785,  seuilEquilibre: 'environ CHF 1 100', conseil: 'Bon équilibre pour personnes saines' },
  { montant: 1000, prime: 526.57, ecMois: 38.04,  ecAnn: 456,  seuilEquilibre: 'environ CHF 800',   conseil: 'Adapté aux personnes peu malades' },
  { montant: 500,  prime: 554.03, ecMois: 10.58,  ecAnn: 127,  seuilEquilibre: 'environ CHF 300',   conseil: 'Avantage limité' },
  { montant: 300,  prime: 564.61, ecMois: 0,      ecAnn: 0,    seuilEquilibre: 'Réf.',           conseil: 'Franchise minimale, référence' },
]

const heroStats = [
  { value: '6',         label: 'Niveaux de franchise',       sub: 'de 300 à 2 500 CHF par an'         },
  { value: 'CHF 1 440', label: "Seuil d'équilibre maximum",  sub: 'franchise 300 vs 2 500 CHF par an' },
  { value: 'CHF 120',   label: 'Économie maximum par mois',  sub: 'sur la prime à Zurich, adulte'     },
]

const toc = [
  { id: 'definition', label: "1. Franchise et quote-part"         },
  { id: 'tableau',    label: "2. Tableau des seuils d'équilibre"  },
  { id: 'enfants',    label: "3. Franchise enfant"                },
  { id: 'changement', label: "4. Changer de franchise"            },
  { id: 'faq',        label: "5. Questions fréquentes"            },
]

const guidesAssocies = [
  { href: '/lamal/guide',            label: 'Comprendre la LAMal'       },
  { href: '/lamal/modeles',          label: 'Les 4 modèles LAMal'       },
  { href: '/lamal/subsides',         label: 'Calculer mes subsides'     },
  { href: '/lamal/changer-de-caisse', label: 'Changer de caisse maladie' },
]

export default function FranchisePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── Hero ── */}
      <section className="bg-white border-b border-edge pt-12 pb-14">
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
            Bien choisir sa franchise peut vous faire économiser jusqu'à CHF 120 par mois sur votre prime,
            ou vous exposer à un reste à charge élevé en cas de maladie.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {heroStats.map(s => (
              <div key={s.label} className="bg-cloud/60 border border-edge rounded-xl px-5 py-4">
                <div className="text-2xl font-bold text-ink leading-none">{s.value}</div>
                <div className="text-[16px] font-medium text-ink/70 mt-0.5">{s.label}</div>
                <div className="text-[16px] text-slate mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Layout 2 colonnes ── */}
      <div className="container-xl py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12 items-start">

          {/* TOC sticky */}
          <aside className="hidden lg:block">
            <nav className="sticky top-24">
              <p className="text-[11px] font-semibold text-slate uppercase tracking-widest mb-4 px-4">
                Sommaire
              </p>
              <ul className="space-y-0.5">
                {toc.map(item => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="toc-link">{item.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Article */}
          <article className="min-w-0 space-y-4">

            {/* 1 — Définition */}
            <section id="definition" className="pt-2">
              <h2 className="article-h2">1. Franchise et quote-part : quelle différence ?</h2>
              <p className="article-p">
                La franchise et la quote-part sont les deux mécanismes de participation financière
                aux soins. Ils s'appliquent successivement dans l'année et ont chacun un plafond propre.
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
                <p className="text-[16px]">
                  <strong>Exemple concret : </strong>
                  avec une franchise de 1 500 CHF par an et CHF 2 000 de frais médicaux dans l'année,
                  vous payez CHF 1 500 (franchise) + 10% de CHF 500 = CHF 50 (quote-part), soit{' '}
                  <strong>CHF 1 550 au total</strong>. Votre caisse prend en charge CHF 450.
                </p>
              </div>
            </section>

            {/* 2 — Tableau */}
            <section id="tableau">
              <h2 className="article-h2">2. Tableau des seuils d'équilibre par franchise</h2>
              <p className="article-p">
                Le seuil d'équilibre indique le montant de frais médicaux annuels à partir duquel
                la franchise 300 CHF devient plus avantageuse que la franchise indiquée.
                En dessous de ce seuil, la franchise élevée est préférable.
              </p>

              <p className="text-[16px] text-slate/60 italic mb-4">
                Primes indicatives pour un adulte de 26 ans et plus à Zurich, modèle standard
                (source : OFSP 2026). Les montants varient selon votre canton.
              </p>

              <div className="overflow-x-auto border border-edge rounded-[8px] mb-4">
                <table className="stripe-table w-full">
                  <thead>
                    <tr>
                      <th className="text-left whitespace-nowrap">Franchise</th>
                      <th className="text-left whitespace-nowrap">Prime par mois</th>
                      <th className="text-left whitespace-nowrap">Économie par an</th>
                      <th className="text-left whitespace-nowrap">Profil recommandé</th>
                    </tr>
                  </thead>
                  <tbody>
                    {franchises.map((f) => (
                      <tr key={f.montant} className={f.montant === 300 ? 'bg-[#eff6ff]' : ''}>
                        <td className="font-semibold text-ink whitespace-nowrap">
                          CHF {f.montant.toLocaleString('fr-CH')}
                        </td>
                        <td className="font-medium text-ink whitespace-nowrap">
                          CHF {f.prime.toFixed(2)}
                        </td>
                        <td className="text-ink whitespace-nowrap">
                          {f.ecAnn > 0 ? `−CHF ${f.ecAnn}` : 'Référence'}
                        </td>
                        <td className="text-slate whitespace-nowrap">{f.conseil}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Données complémentaires — colonnes retirées du tableau */}
              <div className="bg-cloud border border-edge rounded-lg px-5 py-4 mb-4 text-[16px] text-slate space-y-2">
                <p>
                  <span className="font-medium text-ink">Économie mensuelle sur la prime</span>{' '}
                  par rapport à la franchise 300 CHF : 500 CHF → −CHF 10.58 ; 1 000 CHF → −CHF 38.04 ;
                  1 500 CHF → −CHF 65.41 ; 2 000 CHF → −CHF 92.79 ; 2 500 CHF → −CHF 119.98 par mois.
                </p>
                <p>
                  <span className="font-medium text-ink">Seuils d'équilibre</span>{' '}
                  (frais médicaux annuels à partir desquels la franchise 300 CHF devient avantageuse) :
                  500 CHF → environ CHF 300 ; 1 000 CHF → environ CHF 800 ; 1 500 CHF → environ CHF 1 100 ;
                  2 000 CHF → environ CHF 1 300 ; 2 500 CHF → environ CHF 1 440.
                </p>
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
                  <p className="font-semibold text-ink mb-1">Comment calculer le seuil d'équilibre</p>
                  <p className="text-[16px]">
                    Franchise 300 CHF vs 2 500 CHF par an : l'économie annuelle sur la prime est de
                    CHF 1 440 par an. Si vos frais médicaux annuels dépassent CHF 1 440 par an, la
                    franchise 300 CHF est plus avantageuse. En dessous, la franchise 2 500 CHF vous
                    permet d'économiser davantage au total.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <Link href="/lamal/comparateur" className="text-brand hover:underline text-[16px] font-medium">
                  Comparer les primes LAMal par canton →
                </Link>
              </div>
            </section>

            {/* 3 — Enfants */}
            <section id="enfants">
              <h2 className="article-h2">3. Franchise pour les enfants (0 à 18 ans)</h2>
              <p className="article-p">
                Les franchises enfants sont distinctes des franchises adultes. Elles vont de 0 à 600 CHF
                par an et la quote-part est plafonnée à CHF 350 par an, contre CHF 700 par an pour un adulte.
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
                  jeunes enfants qui consultent fréquemment. À partir de l'adolescence (15 à 18 ans),
                  une franchise plus élevée peut être envisagée si l'enfant est en bonne santé.
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
                      ['CHF 400 à 600',  'Adolescents robustes, rarement malades'],
                      ['CHF 200 à 300',  'Enfants en bonne santé, quelques visites annuelles'],
                      ['CHF 100',        'Enfants avec quelques consultations par an'],
                      ['CHF 0',          'Nourrissons et enfants en bas âge, consultations fréquentes'],
                    ].map(([fr, profil], i) => (
                      <tr key={i}>
                        <td className="font-semibold text-ink whitespace-nowrap">{fr}</td>
                        <td className="whitespace-nowrap">{profil}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 4 — Changement */}
            <section id="changement">
              <h2 className="article-h2">4. Comment changer de franchise</h2>
              <p className="article-p">
                Le changement de franchise suit un calendrier strict. Il n'est possible qu'une fois
                par an, avec une date limite impérative pour notifier votre caisse.
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

              <div className="mt-6">
                <Link href="/lamal/changer-de-caisse" className="text-brand hover:underline text-[16px] font-medium">
                  Guide complet : changer de caisse maladie →
                </Link>
              </div>
            </section>

            {/* 5 — FAQ */}
            <section id="faq">
              <FAQ items={faqItems} title="5. Questions fréquentes sur la franchise LAMal" />
            </section>

            {/* Formulaire */}
            <div id="contact" className="scroll-mt-20 border-t border-edge pt-12 mt-4">
              <h2 className="text-2xl font-semibold text-ink mb-3">
                Besoin d'aide ?
              </h2>
              <p className="text-[16px] text-slate mb-6 leading-relaxed">
                Choisir le bon contrat est complexe : caisse maladie, franchise et modèle.
                Un conseiller spécialisé prend le temps d'analyser votre situation et vous
                propose la solution la mieux adaptée. C'est gratuit et sans engagement.
              </p>
              <MultiStepLeadForm redirectOnSuccess="/fr/merci" />
            </div>

            {/* Bandeau MSI */}
            <AuthorBio publishedDate="1er janvier 2026" updatedDate="22 avril 2026" />

            {/* Guides associés */}
            <section className="pt-8 border-t border-edge mt-4">
              <p className="text-[16px] font-semibold text-slate uppercase tracking-widest mb-4">
                Guides associés
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {guidesAssocies.map(({ href, label }) => (
                  <Link key={href} href={href}
                    className="flex items-center gap-2 text-[16px] text-slate hover:text-brand border border-edge rounded-[8px] px-4 py-3 transition-colors hover:border-brand/30">
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
      </div>
    </>
  )
}
