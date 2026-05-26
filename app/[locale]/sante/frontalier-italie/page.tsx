import type { Metadata } from 'next'
import KeyFact from '@/components/ui/KeyFact'
import AuthorBio from '@/components/ui/AuthorBio'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FAQ from '@/components/ui/FAQ'
import Link from 'next/link'
import NeedHelpSection from '@/components/ui/NeedHelpSection'
import FrontalierSimulateur from '@/components/sante/FrontalierSimulateur'
import HeroStats from '@/components/ui/HeroStats'

export const metadata: Metadata = {
  title: 'LAMal pour les frontaliers italiens en Suisse 2026',
  robots: { index: false, follow: false },
  description:
    "Droit d'option LAMal pour les frontaliers italo-suisses : LAMal vs SSN italien, cantons Tessin, Grisons et Valais, formulaire S1 et démarches. Guide 2026.",
  openGraph: {
    title: 'LAMal frontaliers italiens — Suisse 2026',
    description:
      "Frontaliers italo-suisses : droit d'option LAMal ou SSN, Tessin, Grisons, Valais et démarches concrètes.",
    url: 'https://my-swiss-insurance.ch/sante/frontalier-italie',
    type: 'article',
  },
  alternates: { canonical: 'https://my-swiss-insurance.ch/sante/frontalier-italie' },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'LAMal pour les frontaliers italiens en Suisse 2026',
  datePublished: '2026-01-01',
  dateModified: '2026-04-22',
  author: { '@type': 'Organization', name: 'My Swiss Insurance' },
  publisher: { '@type': 'Organization', name: 'My Swiss Insurance' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://my-swiss-insurance.ch/sante/frontalier-italie' },
}

const faqItems = [
  {
    question: 'Un frontalier italien est-il obligé de prendre la LAMal suisse ?',
    answer:
      "Non. Les frontaliers italo-suisses disposent du droit d'option prévu par les accords bilatéraux Suisse-UE : ils peuvent choisir entre la LAMal suisse et le Servizio Sanitario Nazionale (SSN) italien. Ce choix doit être exercé dans les 3 mois suivant le début de l'emploi en Suisse. En l'absence de choix dans ce délai, la LAMal s'applique par défaut.",
  },
  {
    question: 'Quelle est la différence entre la LAMal et le SSN italien ?',
    answer:
      "Le SSN (Servizio Sanitario Nazionale) est le système de santé public universel italien, financé par l'impôt et gratuit au point de service pour la plupart des soins. La LAMal suisse est une assurance à prime fixe individuelle couvrant un catalogue défini de prestations. La principale différence est la structure de financement : prime mensuelle fixe (LAMal) contre financement fiscal indirect (SSN). La qualité des soins et les temps d'attente peuvent différer significativement selon les régions italiennes.",
  },
  {
    question: "Le droit d'option est-il définitif pour les frontaliers italiens ?",
    answer:
      "En principe oui. Une fois exercé, le droit d'option ne peut être modifié que lors de changements de situation reconnus : mariage ou divorce, déménagement hors d'Italie, départ à la retraite, perte d'emploi prolongée. Ces révisions doivent être demandées explicitement auprès des autorités compétentes suisses et italiennes.",
  },
  {
    question: "Comment s'inscrire au SSN en tant que frontalier avec le formulaire S1 ?",
    answer:
      "Si vous optez pour le SSN, votre employeur suisse vous remet le formulaire S1 (délivré par la caisse de compensation AVS). Ce document vous permet de vous inscrire auprès de l'Azienda Sanitaria Locale (ASL) de votre commune de résidence en Italie. Avec ce formulaire, vous pouvez choisir un médecin généraliste (medico di base) et accéder aux soins remboursés normalement.",
  },
  {
    question: 'Les frontaliers italiens ont-ils droit aux subsides LAMal ?',
    answer:
      "Oui, s'ils ont opté pour la LAMal et que leur revenu global (revenus mondiaux) est inférieur aux seuils du canton de travail. La demande se fait auprès du service cantonal compétent (Tessin, Grisons ou Valais selon le canton de travail). Un justificatif de revenu traduit et apostillé peut être nécessaire.",
  },
  {
    question: 'Que se passe-t-il à la retraite pour un frontalier italien avec la LAMal ?',
    answer:
      "À la retraite, si vous cessez votre activité en Suisse et résidez uniquement en Italie, votre droit à la LAMal s'éteint. Vous basculez vers la protection sociale italienne (SSN et pension INPS). Si vous continuez à résider partiellement en Suisse ou avez des droits de résidence, des dispositions spécifiques peuvent s'appliquer. Consultez un spécialiste en droit social transfrontalier.",
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
  { id: 'qui',           label: '1. Cantons concernés' },
  { id: 'comparaison',   label: '2. LAMal vs SSN'       },
  { id: 'option-lamal',  label: '3. Option LAMal'        },
  { id: 'option-ssn',    label: '4. Option SSN'          },
  { id: 'primes',        label: '5. Primes 2026'         },
  { id: 'comment-decider', label: '6. Comment décider'   },
  { id: 'simulateur',    label: '7. Simulateur'          },
  { id: 'faq',           label: '8. Questions fréquentes'},
]

const heroStats = [
  { value: '3 mois',   label: "Délai droit d'option",   sub: 'dès le premier jour de travail en Suisse' },
  { value: '~CHF 686', label: 'Prime mensuelle Tessin',  sub: 'adulte, modèle standard, franchise 300 CHF' },
  { value: '−20%',     label: 'Réduction prime possible', sub: 'avec télémédecine ou médecin de famille'   },
]

const enBref = [
  "Les frontaliers italo-suisses (Tessin, Grisons, Valais) ont un droit d'option entre la LAMal suisse et le SSN italien — à exercer dans les 3 mois suivant le début de l'emploi.",
  "Le SSN est financé par l'impôt et gratuit au point de service en Italie — la LAMal offre en échange un accès complet au réseau médical suisse de qualité homogène.",
  "Si votre famille et vos médecins sont en Italie, le SSN reste plus adapté ; si vous vous soignez principalement en Suisse, la LAMal est généralement préférable.",
]

export default function FrontalierItaliePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="bg-white border-b border-edge pt-12 pb-14">
        <div className="container-xl">
          <Breadcrumb items={[
            { label: 'Accueil', href: '/' },
            { label: 'LAMal', href: '/sante' },
            { label: 'Frontaliers', href: '/sante/frontalier' },
            { label: 'Frontaliers italiens' },
          ]} />
          <h1 className="text-4xl sm:text-5xl font-bold text-ink leading-tight mb-4">
            LAMal pour les frontaliers italiens en Suisse 2026
          </h1>
          <p className="text-[16px] text-slate max-w-2xl leading-relaxed mb-10">
            Les frontaliers italo-suisses travaillant dans les cantons du Tessin, des Grisons
            ou du Valais disposent du droit d&apos;option entre l&apos;assurance maladie de base LAMal et le Servizio
            Sanitario Nazionale (SSN) italien. Ce guide explique les différences entre les
            deux systèmes, la procédure de choix et les cas particuliers.
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

            {/* Cantons concernés */}
            <section id="qui" className="pt-2">
              <h2 className="article-h2">1. Quels cantons et accords bilatéraux s'appliquent ?</h2>
              <p className="article-p">
                Les accords bilatéraux Suisse-UE (ALCP, règlements CE 883/2004 et 987/2009)
                régissent la coordination de sécurité sociale entre la Suisse et l'Italie.
                Ces règles s'appliquent aux ressortissants italiens résidant en Italie et
                travaillant en Suisse.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div className="bg-cloud border border-edge rounded-[8px] p-5">
                  <h3 className="font-semibold text-ink text-[16px] mb-3">Cantons suisses concernés</h3>
                  <ul className="space-y-1.5 text-[13px] text-slate">
                    {[
                      'Tessin (canton majoritairement italophone)',
                      'Grisons (partie italophone, val Poschiavo, Bregaglia)',
                      'Valais (moins fréquent, frontière col du Simplon)',
                    ].map((c, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-brand font-bold shrink-0">•</span>{c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-cloud border border-edge rounded-[8px] p-5">
                  <h3 className="font-semibold text-ink text-[16px] mb-3">Délai du droit d'option</h3>
                  <p className="text-[13px] text-slate mb-2">
                    3 mois dès le premier jour de travail en Suisse. En l'absence de choix
                    explicite, la LAMal s'applique par défaut.
                  </p>
                  <p className="text-[13px] text-slate">
                    Le choix est en principe définitif sauf changement de situation reconnu.
                  </p>
                </div>
              </div>
            </section>

            {/* Comparaison LAMal vs SSN */}
            <section id="comparaison">
              <h2 className="article-h2">2. Quelles différences entre LAMal et SSN italien ?</h2>
              <p className="article-p">
                Le SSN est financé par l'impôt et gratuit au point de service — la LAMal est une
                prime fixe individuelle. La qualité des soins italiens varie fortement selon la région.
              </p>
              <div className="overflow-x-auto border border-edge rounded-[8px] mb-5">
                <table className="stripe-table w-full">
                  <thead>
                    <tr>
                      <th className="text-left whitespace-nowrap">Critère</th>
                      <th className="text-left whitespace-nowrap">LAMal suisse</th>
                      <th className="text-left whitespace-nowrap">SSN italien</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Financement', 'Prime mensuelle fixe par assuré', 'Financement fiscal (impôts)'],
                      ["Accès aux soins", "Complet en Suisse, urgences à l'étranger", 'Complet en Italie, urgences en Suisse'],
                      ['Qualité', 'Homogène sur tout le territoire', 'Variable selon la région italienne'],
                      ['Famille', 'Contrat individuel par membre', 'Couverture familiale incluse'],
                      ['Soins dentaires', 'Non couverts (LAMal de base)', 'Partiellement couverts selon région'],
                      ["Délais d'attente", 'Généralement courts', 'Variables, parfois longs selon régions'],
                    ].map((row, i) => (
                      <tr key={i}>
                        <td className="font-semibold text-ink">{row[0]}</td>
                        <td className="text-slate">{row[1]}</td>
                        <td className="text-slate">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <KeyFact>
                <strong>Cas du Tessin :</strong> le Tessin est le seul canton officiellement italophone.
                La plupart des médecins et hôpitaux tessinois travaillent en italien, ce qui facilite
                le choix de la LAMal pour les frontaliers provenant de Lombardie ou du Piémont.
              </KeyFact>
            </section>

            {/* Option LAMal */}
            <section id="option-lamal">
              <h2 className="article-h2">3. Pourquoi choisir la LAMal suisse ?</h2>
              <div className="space-y-4">
                {[
                  {
                    titre: 'Avantages de la LAMal pour les frontaliers italiens',
                    desc: "Accès complet au réseau médical suisse de haute qualité, primes calculées selon le canton de travail (Tessin, Grisons ou Valais), droit potentiel aux subsides cantonaux selon revenus, et absence des temps d'attente parfois élevés constatés dans certaines régions italiennes.",
                  },
                  {
                    titre: 'Primes LAMal au Tessin',
                    desc: "Le Tessin affiche des primes LAMal parmi les plus élevées de Suisse (environ CHF 686 par mois pour un adulte, modèle standard, franchise 300 CHF). Comparez les caisses disponibles et les modèles alternatifs (télémédecine, médecin de famille) pour réduire la prime de 10 à 20 %.",
                  },
                ].map((item, i) => (
                  <div key={i} className="border border-edge rounded-[8px] p-5 bg-white">
                    <h3 className="font-semibold text-ink text-[16px] mb-2">{item.titre}</h3>
                    <p className="text-[16px] text-slate">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Option SSN */}
            <section id="option-ssn">
              <h2 className="article-h2">4. Comment s'inscrire au SSN avec le formulaire S1 ?</h2>
              <p className="article-p">
                Si vous optez pour le Servizio Sanitario Nazionale, votre employeur suisse
                vous remet le formulaire S1. Ce document est le pivot de votre inscription
                dans le système de santé italien.
              </p>

              <div className="space-y-3">
                {[
                  { n: '01', t: 'Obtenir le formulaire S1 de votre employeur', d: "La caisse de compensation AVS dont dépend votre employeur délivre le formulaire S1 sur demande. Ce document atteste que vous êtes couvert pour les accidents du travail via la LAA suisse." },
                  { n: '02', t: "S'inscrire à l'ASL de votre commune italienne", d: "Présentez le formulaire S1 à l'Azienda Sanitaria Locale (ASL) de votre commune de résidence en Italie. Cette démarche vous permet de choisir un medico di base (médecin généraliste) et d'accéder aux soins italiens normalement remboursés." },
                  { n: '03', t: 'Couverture des soins en Suisse limitée aux urgences', d: "Avec le SSN, vos soins en Suisse se limitent aux urgences. Pour des soins programmés en Suisse (spécialiste, hospitalisation non urgente), vous devrez les financer directement ou souscrire une complémentaire privée." },
                ].map(step => (
                  <div key={step.n} className="flex gap-5">
                    <div className="text-[24px] font-bold text-brand leading-none shrink-0 w-10 text-right">{step.n}</div>
                    <div className="pt-0.5 border-b border-edge pb-3 flex-1">
                      <h3 className="font-semibold text-ink text-[16px] mb-1">{step.t}</h3>
                      <p className="text-[16px] text-slate">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Primes indicatives 2026 */}
            <section id="primes">
              <h2 className="article-h2">5. Primes indicatives 2026 dans votre canton de travail</h2>
              <p className="article-p">
                Adulte de 35 ans, franchise 300 CHF, modèle standard, données indicatives OFSP 2026.
                Le Tessin affiche les primes les plus élevées parmi les cantons frontaliers italiens.
              </p>
              <div className="overflow-x-auto border border-edge rounded-[8px] mb-5">
                <table className="stripe-table w-full">
                  <thead>
                    <tr>
                      <th className="text-left whitespace-nowrap">Canton de travail</th>
                      <th className="text-left whitespace-nowrap">Prime min. mensuelle</th>
                      <th className="text-left whitespace-nowrap">Prime max. mensuelle</th>
                      <th className="text-left whitespace-nowrap hidden md:table-cell">Économie max. possible</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Tessin',  'CHF 573', 'CHF 810', 'CHF 237/mois'],
                      ['Grisons', 'CHF 445', 'CHF 620', 'CHF 175/mois'],
                      ['Valais',  'CHF 433', 'CHF 575', 'CHF 142/mois'],
                    ].map((row, i) => (
                      <tr key={i}>
                        <td className="font-semibold text-ink">{row[0]}</td>
                        <td className="text-slate">{row[1]}</td>
                        <td className="text-slate">{row[2]}</td>
                        <td className="text-slate hidden md:table-cell">{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[13px] text-slate/60 mt-2 md:hidden">Tableau complet visible sur ordinateur.</p>
              <KeyFact>
                Les modèles alternatifs (médecin de famille, télémédecine) réduisent la prime de 10 à 20 % par rapport au modèle standard.
                Si vous êtes éligible aux subsides cantonaux, votre prime nette peut être significativement inférieure.
              </KeyFact>
            </section>

            {/* LAMal ou SSN */}
            <section id="comment-decider">
              <h2 className="article-h2">6. LAMal ou SSN : comment décider ?</h2>
              <p className="article-p">
                Si vos soins ont lieu principalement au Tessin ou en Suisse, la LAMal offre un accès
                complet sans avance de frais. Si votre famille et vos médecins sont en Italie, le SSN reste plus adapté.
              </p>
              <div className="overflow-x-auto border border-edge rounded-[8px] mb-5">
                <table className="stripe-table w-full">
                  <thead>
                    <tr>
                      <th className="text-left whitespace-nowrap">Critère</th>
                      <th className="text-left whitespace-nowrap">Plutôt LAMal</th>
                      <th className="text-left whitespace-nowrap">Plutôt SSN</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Soins principalement en Suisse', 'Accès complet au réseau suisse sans avance de frais', 'Couverture limitée aux urgences en Suisse'],
                      ['Famille restée en Italie', 'Chaque membre doit avoir son propre contrat LAMal', 'Famille couverte par le SSN en Italie'],
                      ['Éligibilité aux subsides', 'Subside cantonal possible si revenu < seuil cantonal', "SSN financé par l'impôt, gratuit au point de service en Italie"],
                      ["Durée de l'activité en Suisse", 'Emploi stable sur le long terme', 'Mission temporaire ou situation incertaine'],
                      ['Soins réguliers prévus', 'Spécialistes et traitements chroniques accessibles en Suisse', 'Continuité avec vos médecins et spécialistes en Italie'],
                    ].map((row, i) => (
                      <tr key={i}>
                        <td className="font-semibold text-ink">{row[0]}</td>
                        <td className="text-slate">{row[1]}</td>
                        <td className="text-slate">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Simulateur de décision */}
            <section id="simulateur">
              <h2 className="article-h2">7. Simulateur de décision</h2>
              <p className="article-p">
                Répondez à 5 questions pour obtenir une recommandation personnalisée adaptée à votre situation de frontalier italo-suisse.
              </p>
              <FrontalierSimulateur />
            </section>

            {/* FAQ */}
            <section id="faq" className="scroll-mt-20 border-t border-edge pt-8">
              <FAQ items={faqItems} title="8. Questions fréquentes" />
            </section>

            {/* Contact */}
            <NeedHelpSection />

            <AuthorBio publishedDate="1er janvier 2026" updatedDate="22 avril 2026" />

            {/* Guides associés */}
            <section>
              <p className="text-[13px] font-semibold text-slate uppercase tracking-widest mb-4">
                Guides associés
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { href: '/sante/frontalier',   label: 'Hub frontaliers'                              },
                  { href: '/sante/ma-situation',  label: 'LAMal selon votre situation professionnelle' },
                  { href: '/sante/guide',          label: 'Guide complet LAMal 2026'                    },
                ].map(({ href, label }) => (
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
