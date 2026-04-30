import type { Metadata } from 'next'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FAQ from '@/components/ui/FAQ'
import Link from 'next/link'
import AuthorBio from '@/components/ui/AuthorBio'
import NeedHelpSection from '@/components/ui/NeedHelpSection'
import SubsidesSimulatorFull from '@/components/lamal/SubsidesSimulatorFull'

export const metadata: Metadata = {
  title: 'Calculateur de subsides LAMal 2026 — Estimez votre aide cantonale',
  description:
    "Calculez votre subside LAMal 2026 en 30 secondes : sélectionnez votre canton, entrez votre revenu, obtenez une estimation personnalisée. Données officielles pour les 26 cantons.",
  openGraph: {
    title: 'Calculateur de subsides LAMal 2026 — Estimez votre aide cantonale',
    description: "Simulateur de subsides LAMal 2026 : estimation personnalisée par canton, revenu et situation familiale. Données officielles.",
    url: 'https://my-swiss-insurance.ch/lamal/subsides',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Calculateur de subsides LAMal 2026 — Estimez votre aide cantonale',
  datePublished: '2026-01-01',
  dateModified: '2026-04-30',
  author: { '@type': 'Organization', name: 'My Swiss Insurance', url: 'https://my-swiss-insurance.ch' },
  publisher: { '@type': 'Organization', name: 'My Swiss Insurance' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://my-swiss-insurance.ch/lamal/subsides' },
}

const faqItems = [
  {
    question: 'Quand suis-je éligible aux subsides LAMal ?',
    answer:
      "Vous êtes éligible si votre revenu déterminant est inférieur aux seuils fixés par votre canton de résidence. Ces seuils varient de 27 000 CHF/an (Jura) à plus de 65 000 CHF/an (Neuchâtel) selon le canton, votre situation familiale et le nombre d'enfants à charge. Environ 2,5 millions de personnes en bénéficient en Suisse.",
  },
  {
    question: 'Comment est calculé le revenu déterminant ?',
    answer:
      "Le revenu déterminant correspond en général à votre revenu net imposable (revenu fiscal), auquel certains cantons ajoutent une fraction de la fortune nette (souvent 10% de la fortune imposable). En cas de doute, utilisez le revenu indiqué sur votre avis de taxation. Pour les travailleurs indépendants, le revenu de l'activité lucrative indépendante est retenu.",
  },
  {
    question: 'Dois-je faire une demande ou le subside est-il attribué automatiquement ?',
    answer:
      "Cela dépend de votre canton. Dans les cantons de Genève, Neuchâtel et Valais, le subside est attribué automatiquement après la taxation fiscale — aucune démarche n'est requise. Dans les autres cantons (Vaud, Fribourg, Jura et l'ensemble des cantons alémaniques et tessinois), une demande doit être déposée auprès du service cantonal compétent, généralement avant une date limite annuelle.",
  },
  {
    question: 'Le subside est-il versé directement sur mon compte ou à ma caisse maladie ?',
    answer:
      "Dans la très grande majorité des cantons, le subside est versé directement à votre caisse maladie, qui déduit ce montant de votre facture mensuelle. Vous ne recevez donc pas de versement en espèces : vous voyez simplement une prime nette réduite sur votre bulletin de prime. Certains cantons peuvent dans des cas particuliers procéder à un versement direct à l'assuré.",
  },
  {
    question: "Mon revenu a changé depuis ma dernière déclaration. Puis-je quand même bénéficier d'un subside ?",
    answer:
      "Oui. Si votre revenu a baissé significativement (chômage, retraite, séparation), vous pouvez en général signaler ce changement à votre service cantonal et demander une réévaluation en cours d'année. La procédure varie selon le canton. Il est recommandé de contacter directement le service compétent pour connaître les conditions de révision.",
  },
  {
    question: 'Le subside couvre-t-il aussi mes assurances complémentaires (LCA) ?',
    answer:
      "Non. Les subsides LAMal s'appliquent uniquement à la prime de l'assurance de base obligatoire (LAMal). Les primes des assurances complémentaires (LCA : hospitalisation, dentaire, médecines douces…) ne sont pas concernées.",
  },
  {
    question: "J'ai déménagé dans un autre canton en cours d'année. Quel subside s'applique ?",
    answer:
      "C'est votre canton de résidence au 1er janvier de l'année civile qui détermine votre droit au subside pour l'année entière. En cas de déménagement en cours d'année, les règles varient : certains cantons transfèrent automatiquement le dossier, d'autres exigent une nouvelle demande. Informez proactivement les deux services cantonaux de votre changement de domicile.",
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

const toc = [
  { id: 'simulateur',    label: '1. Simulateur'              },
  { id: 'fonctionnement', label: '2. Comment ça fonctionne'  },
  { id: 'reforme-2025',  label: '3. Réforme 2025'            },
  { id: 'faq',           label: '4. Questions fréquentes'    },
]

export default function SubsidesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── HERO ── */}
      <section className="bg-white border-b border-edge pt-12 pb-14">
        <div className="container-xl">

          <Breadcrumb items={[
            { label: 'Accueil', href: '/' },
            { label: 'LAMal',   href: '/lamal' },
            { label: 'Calculateur de subsides' },
          ]} />

          <h1 className="text-4xl sm:text-5xl font-bold text-ink leading-tight mb-4 max-w-3xl">
            Calculateur de subsides LAMal 2026
          </h1>
          <p className="text-[18px] text-slate max-w-2xl leading-relaxed mb-10">
            Estimez en 30 secondes le subside auquel vous avez droit selon votre canton,
            votre revenu et votre situation familiale. Données officielles 2026 pour les 26 cantons.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { value: '2,5 millions', label: 'Bénéficiaires en Suisse', sub: 'Soit environ 29% de la population' },
              { value: '26 cantons',   label: 'Barèmes distincts',       sub: 'Critères et montants variables' },
              { value: '≤ 643 CHF',   label: 'Subside mensuel maximum', sub: "Canton de Neuchâtel, barème 2026" },
            ].map(s => (
              <div key={s.label} className="bg-cloud/60 border border-edge rounded-xl px-5 py-4">
                <div className="text-2xl font-bold text-ink leading-none">{s.value}</div>
                <div className="text-[13px] font-medium text-ink/70 mt-0.5">{s.label}</div>
                <div className="text-[12px] text-slate mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── LAYOUT 2 COLONNES ── */}
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

            {/* §1 — Simulateur */}
            <section id="simulateur" className="scroll-mt-24">
              <h2 className="article-h2">1. Simulateur de subsides</h2>
              <p className="article-p">
                Sélectionnez votre canton et renseignez votre revenu annuel. Pour les cantons de Suisse
                romande, entrez également votre situation familiale pour obtenir une estimation détaillée.
              </p>
              <SubsidesSimulatorFull />
            </section>

            {/* §2 — Comment ça fonctionne */}
            <section id="fonctionnement" className="scroll-mt-24">
              <h2 className="article-h2">2. Comment ça fonctionne</h2>

              <h3 className="article-h3">Le revenu déterminant</h3>
              <p className="article-p">
                Chaque canton calcule les subsides sur la base du <strong>revenu déterminant</strong>,
                qui correspond généralement au revenu net fiscal issu de la déclaration d'impôts.
                Certains cantons y ajoutent une fraction de la fortune nette imposable (en général 10%),
                afin de tenir compte du patrimoine de l'assuré.
              </p>

              <h3 className="article-h3">Automatique ou sur demande</h3>
              <p className="article-p">
                Dans les cantons de Genève, Neuchâtel et Valais, le subside est attribué{' '}
                <strong>automatiquement</strong> après la taxation fiscale. Aucune démarche n'est
                nécessaire : la caisse maladie reçoit directement le montant et le déduit de votre
                prime mensuelle.
              </p>
              <p className="article-p">
                Dans les autres cantons, vous devez déposer une <strong>demande explicite</strong> auprès
                du service cantonal compétent, généralement avant la date limite annuelle indiquée dans
                le simulateur. Un subside non réclamé n'est pas versé rétroactivement.
              </p>

              <div className="callout flex gap-3">
                <svg className="text-brand shrink-0 mt-0.5" width="20" height="20"
                     viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                     strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
                  <line x1="9.5" y1="18" x2="14.5" y2="18" />
                  <line x1="10" y1="21" x2="14" y2="21" />
                </svg>
                <p className="text-[15px]">
                  <strong>À retenir :</strong> si vous pensez avoir droit à un subside mais n&apos;en avez pas reçu,
                  contactez votre caisse maladie ou le service cantonal compétent. Les subsides non réclamés
                  ne sont pas versés rétroactivement dans la plupart des cantons.
                </p>
              </div>
            </section>

            {/* §3 — Réforme 2025 */}
            <section id="reforme-2025" className="scroll-mt-24">
              <h2 className="article-h2">3. Réforme 2025 : garanties renforcées</h2>
              <p className="article-p">
                Depuis le 1er janvier 2025, la loi fédérale garantit des montants minimaux de subside
                pour les enfants et les jeunes adultes, indépendamment du canton de résidence.
                Cette réforme vise à alléger significativement la charge des familles.
              </p>

              <div className="overflow-x-auto border border-edge rounded-[8px] mb-4">
                <table className="stripe-table w-full">
                  <thead>
                    <tr>
                      <th className="text-left whitespace-nowrap">Bénéficiaire</th>
                      <th className="text-left whitespace-nowrap">Garantie fédérale 2025</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Enfants (0 à 18 ans)',           'Subside couvrant 100% de la prime de référence cantonale'],
                      ['Jeunes adultes (19 à 25 ans)',   'Subside couvrant au minimum 80% de la prime de référence cantonale'],
                    ].map((row, i) => (
                      <tr key={i}>
                        <td className="font-medium text-ink whitespace-nowrap">{row[0]}</td>
                        <td>{row[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-[13px] text-slate/60 mb-4">
                Ces garanties s'appliquent aux ménages dont le revenu est inférieur au seuil cantonal.
                Les cantons peuvent accorder des montants supérieurs à ces minimaux fédéraux.
              </p>

              <p className="article-p">
                Pour les familles avec enfants, cette réforme signifie que la prime nette après subside
                peut être ramenée à zéro pour les enfants dès lors que le revenu familial est sous le
                seuil cantonal. Vérifiez l'éligibilité de vos enfants dans le simulateur ci-dessus.
              </p>
            </section>

            {/* §4 — FAQ */}
            <section id="faq" className="scroll-mt-24">
              <FAQ items={faqItems} title="4. Questions fréquentes sur les subsides" />
            </section>

            {/* §5 — Formulaire contact */}
            <NeedHelpSection />

            {/* §6 — Bandeau MSI */}
            <AuthorBio publishedDate="1er janvier 2026" updatedDate="30 avril 2026" />

            {/* §7 — Guides associés */}
            <section className="pt-8 border-t border-edge mt-4">
              <p className="text-[13px] font-semibold text-slate uppercase tracking-widest mb-4">
                Guides associés
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { href: '/lamal/guide',             label: 'Comprendre la LAMal'       },
                  { href: '/lamal/franchise',         label: 'Choisir sa franchise'      },
                  { href: '/lamal/modeles',           label: 'Les 4 modèles LAMal'       },
                  { href: '/lamal/changer-de-caisse', label: 'Changer de caisse maladie' },
                ].map(({ href, label }) => (
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
      </div>
    </>
  )
}
