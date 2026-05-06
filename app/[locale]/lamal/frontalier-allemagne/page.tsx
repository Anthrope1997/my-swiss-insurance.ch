import type { Metadata } from 'next'
import AuthorBio from '@/components/ui/AuthorBio'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FAQ from '@/components/ui/FAQ'
import Link from 'next/link'
import NeedHelpSection from '@/components/ui/NeedHelpSection'
import FrontalierSimulateur from '@/components/lamal/FrontalierSimulateur'

export const metadata: Metadata = {
  title: 'LAMal pour les frontaliers allemands en Suisse 2026',
  description:
    "Droit d'option LAMal pour les frontaliers germano-suisses : LAMal vs GKV allemand, cantons bâlois, formulaire S1 et démarches concrètes. Guide 2026.",
  openGraph: {
    title: 'LAMal frontaliers allemands — Suisse 2026',
    description:
      "Frontaliers germano-suisses : droit d'option LAMal ou GKV, cantons bâlois et cas particuliers.",
    url: 'https://my-swiss-insurance.ch/lamal/frontalier-allemagne',
    type: 'article',
  },
  alternates: { canonical: 'https://my-swiss-insurance.ch/lamal/frontalier-allemagne' },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'LAMal pour les frontaliers allemands en Suisse 2026',
  datePublished: '2026-01-01',
  dateModified: '2026-04-22',
  author: { '@type': 'Organization', name: 'My Swiss Insurance' },
  publisher: { '@type': 'Organization', name: 'My Swiss Insurance' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://my-swiss-insurance.ch/lamal/frontalier-allemagne' },
}

const faqItems = [
  {
    question: 'Un frontalier allemand est-il obligé de prendre la LAMal suisse ?',
    answer:
      "Non. Les frontaliers germano-suisses disposent du même droit d'option que les autres frontaliers UE : ils peuvent choisir entre la LAMal suisse et le système d'assurance de santé allemand (GKV ou assurance privée PKV). Ce choix doit être exercé dans les 3 mois suivant le début de l'emploi en Suisse. Passé ce délai, la LAMal suisse s'applique par défaut.",
  },
  {
    question: 'Quelle est la différence entre la LAMal suisse et le GKV allemand ?',
    answer:
      "La LAMal est une assurance individuelle à prime fixe par assuré, indépendante du revenu (sauf subsides). Le GKV est une assurance maladie légale à cotisation proportionnelle au salaire (environ 14,6 % du salaire brut, partagé entre employeur et employé, plafonné à environ 66 150 euros de revenu annuel en 2026). Le GKV couvre également les membres de la famille sans revenu propre gratuitement, ce qui peut être avantageux pour les familles.",
  },
  {
    question: "Le droit d'option est-il définitif pour les frontaliers allemands ?",
    answer:
      "En principe oui. Une fois exercé, le droit d'option ne peut être modifié que lors de changements de situation reconnus : mariage ou divorce, déménagement, départ à la retraite, changement de statut professionnel majeur. Ces révisions doivent être demandées explicitement auprès des autorités compétentes.",
  },
  {
    question: 'Comment fonctionne le formulaire S1 pour les frontaliers allemands ?',
    answer:
      "Le formulaire S1 (anciennement E106) est délivré par la caisse de compensation AVS de l'employeur suisse. Il atteste de la couverture accidents-maladie via la LAA suisse et permet au frontalier allemand ayant opté pour le GKV d'accéder aux soins en Allemagne. Il doit être présenté à la caisse maladie allemande (GKV ou PKV) choisie pour l'inscription.",
  },
  {
    question: 'Les frontaliers allemands ont-ils droit aux subsides LAMal ?',
    answer:
      "Oui, s'ils ont opté pour la LAMal et que leur revenu global (revenus mondiaux) est inférieur aux seuils cantonaux. Les subsides sont attribués selon les critères du canton de travail. Les frontaliers doivent en faire la demande auprès du service cantonal compétent, en justifiant leur revenu par une attestation fiscale allemande traduite si nécessaire.",
  },
  {
    question: 'Que se passe-t-il à la retraite pour un frontalier allemand avec la LAMal ?',
    answer:
      "À la retraite, si vous quittez la Suisse et cessez toute activité professionnelle en Suisse, votre droit à la LAMal s'éteint généralement. Vous basculez vers l'assurance maladie correspondant à votre lieu de résidence. En Allemagne, la retraite bascule sur le GKV ou la PKV selon votre historique. Anticipez cette transition en consultant un expert en protection sociale transfrontalière.",
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

export default function FrontalierAllemagnePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="bg-white border-b border-edge pt-12 pb-14">
        <div className="container-xl">
          <Breadcrumb items={[
            { label: 'Accueil', href: '/' },
            { label: 'LAMal', href: '/lamal' },
            { label: 'Frontaliers', href: '/lamal/frontalier' },
            { label: 'Frontaliers allemands' },
          ]} />
          <div className="badge mb-5">Données OFSP 2026</div>
          <h1 className="text-4xl sm:text-5xl font-bold text-ink leading-tight mb-4 max-w-2xl">
            LAMal pour les frontaliers allemands en Suisse 2026
          </h1>
          <p className="text-[18px] text-slate max-w-2xl leading-relaxed">
            Les frontaliers germano-suisses qui travaillent dans les cantons de Bâle-Ville,
            Bâle-Campagne, Schaffhouse, Thurgovie, Saint-Gall ou Argovie disposent du droit
            d'option entre la LAMal suisse et le système d'assurance maladie légale allemand (GKV).
            Ce guide explique les différences, les démarches et les cas particuliers.
          </p>
        </div>
      </section>

      <div className="container-xl py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12 items-start">

          {/* TOC */}
          <aside className="hidden lg:block">
            <nav className="sticky top-24">
              <p className="text-[11px] font-semibold text-slate uppercase tracking-widest mb-4 px-4">
                Sommaire
              </p>
              <ul className="space-y-0.5">
                {[
                  { id: 'qui', label: 'Cantons concernés' },
                  { id: 'comparaison', label: 'LAMal vs GKV' },
                  { id: 'bale', label: 'Cas bâlois' },
                  { id: 's1', label: 'Formulaire S1' },
                  { id: 'primes', label: 'Primes 2026' },
                  { id: 'comment-decider', label: 'Comment décider' },
                  { id: 'simulateur', label: 'Simulateur' },
                  { id: 'faq', label: 'Questions fréquentes' },
                  { id: 'contact', label: "Besoin d'aide" },
                ].map(item => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="toc-link">{item.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Article */}
          <article className="min-w-0 space-y-4">

            {/* Cantons et accords bilatéraux */}
            <section id="qui" className="pt-2">
              <h2 className="article-h2">Quels cantons et accords bilatéraux s'appliquent ?</h2>
              <p className="article-p">
                Les accords bilatéraux Suisse-UE (ALCP, règlements CE 883/2004 et 987/2009)
                définissent les règles de coordination de sécurité sociale entre la Suisse
                et l'Allemagne. Ces accords s'appliquent à l'ensemble des frontaliers
                germano-suisses, quelle que soit leur localisation exacte.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div className="bg-cloud border border-edge rounded-[8px] p-5">
                  <h3 className="font-semibold text-ink text-[15px] mb-3">Cantons suisses concernés</h3>
                  <ul className="space-y-1.5 text-[13px] text-slate">
                    {[
                      'Bâle-Ville (plus grand flux)',
                      'Bâle-Campagne',
                      'Schaffhouse',
                      'Thurgovie',
                      'Saint-Gall',
                      'Argovie',
                    ].map((c, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-brand font-bold shrink-0">•</span>{c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-cloud border border-edge rounded-[8px] p-5">
                  <h3 className="font-semibold text-ink text-[15px] mb-3">Délai du droit d'option</h3>
                  <p className="text-[13px] text-slate mb-2">
                    3 mois dès le premier jour de travail en Suisse. En l'absence de choix,
                    la LAMal s'applique par défaut dans la plupart des cantons.
                  </p>
                  <p className="text-[13px] text-slate">
                    Le choix est en principe définitif sauf changement de situation reconnu.
                  </p>
                </div>
              </div>
            </section>

            {/* Comparaison LAMal vs GKV */}
            <section id="comparaison">
              <h2 className="article-h2">Quelles sont les différences entre LAMal et GKV ?</h2>
              <p className="article-p">
                La structure de financement est le cœur de la différence : prime fixe individuelle
                côté suisse, cotisation proportionnelle au salaire côté allemand. La situation de votre famille change souvent la donne.
              </p>
              <div className="overflow-x-auto border border-edge rounded-[8px] mb-5">
                <table className="stripe-table w-full">
                  <thead>
                    <tr>
                      <th className="text-left whitespace-nowrap">Critère</th>
                      <th className="text-left whitespace-nowrap">LAMal suisse</th>
                      <th className="text-left whitespace-nowrap">GKV allemand</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Calcul de la prime', 'Prime fixe par assuré (varie selon caisse, canton, modèle)', 'Cotisation proportionnelle au salaire (~14,6 % partagé employeur/employé)'],
                      ['Couverture de la famille', 'Contrat individuel par membre de la famille', 'Membres sans revenu couverts gratuitement (co-assurance familiale)'],
                      ['Prestations', 'Standardisées (catalogue OFSP)', 'Standardisées (catalogue SGB)'],
                      ['Subsides', 'Subsides cantonaux selon revenus', 'Pas de subsides, mais cotisation proportionnelle au revenu'],
                      ['Soins en Suisse', 'Complets (réseau entier)', 'Urgences uniquement pour option GKV'],
                      ['Soins en Allemagne', 'Urgences uniquement', 'Complets'],
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

              <div className="callout text-[15px]">
                <strong>Point clé pour les familles :</strong> si votre conjoint ou vos enfants
                sans revenu résident en Allemagne, le GKV les couvre gratuitement.
                Avec la LAMal, chaque membre doit avoir son propre contrat payant.
                Ce facteur est souvent déterminant pour les familles avec enfants.
              </div>
            </section>

            {/* Cas particulier bâlois */}
            <section id="bale">
              <h2 className="article-h2">Qu'est-ce qui change pour les frontaliers bâlois ?</h2>
              <p className="article-p">
                La région de Bâle (Bâle-Ville et Bâle-Campagne) est l'un des pôles frontaliers
                les plus actifs de Suisse. Elle attire des travailleurs frontaliers d'Allemagne
                (Bade-Wurtemberg principalement) et de France (Alsace).
              </p>

              <div className="space-y-4">
                {[
                  {
                    titre: 'Spécificité tarifaire LAMal à Bâle',
                    desc: "Les primes LAMal dans les cantons de Bâle-Ville et Bâle-Campagne figurent parmi les plus élevées de Suisse (autour de CHF 625 à 668 par mois pour un adulte en modèle standard, franchise 300 CHF). Ce facteur est important dans le calcul économique entre LAMal et GKV pour les frontaliers à revenus modestes ou moyens.",
                  },
                  {
                    titre: 'Accès aux soins dans les deux pays',
                    desc: "Les frontaliers bâlois ayant opté pour la LAMal peuvent consulter librement dans les hôpitaux et cabinets médicaux suisses. Pour les soins en Allemagne, la couverture est limitée aux urgences. Beaucoup de frontaliers bâlois ayant opté pour la LAMal gardent une mutuelle privée allemande pour compléter.",
                  },
                ].map((item, i) => (
                  <div key={i} className="border border-edge rounded-[8px] p-5 bg-white">
                    <h3 className="font-semibold text-ink text-[15px] mb-2">{item.titre}</h3>
                    <p className="text-[14px] text-slate">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Formulaire S1 */}
            <section id="s1">
              <h2 className="article-h2">Comment obtenir et utiliser le formulaire S1 ?</h2>
              <p className="article-p">
                Si vous optez pour le GKV allemand, votre employeur suisse doit vous fournir
                le formulaire S1 (anciennement E106). Ce document est indispensable pour
                vous inscrire dans une caisse d'assurance maladie légale allemande.
              </p>

              <div className="space-y-3">
                {[
                  { n: '01', t: 'Informer votre employeur de votre choix', d: "Signalez votre décision d'opter pour le GKV à votre employeur ou à son service des ressources humaines dans les 3 mois suivant votre embauche." },
                  { n: '02', t: 'Obtenir le formulaire S1', d: "Votre employeur ou la caisse de compensation AVS dont il dépend délivre le formulaire S1. Ce document atteste que vous êtes couvert pour les accidents du travail via la LAA suisse." },
                  { n: '03', t: "S'inscrire dans une caisse GKV allemande", d: "Présentez le formulaire S1 à la caisse GKV allemande de votre choix. L'inscription est possible dans toutes les caisses légales allemandes (AOK, TK, Barmer, DAK, etc.)." },
                ].map(step => (
                  <div key={step.n} className="flex gap-5">
                    <div className="text-[24px] font-bold text-brand leading-none shrink-0 w-10 text-right">{step.n}</div>
                    <div className="pt-0.5 border-b border-edge pb-3 flex-1">
                      <h3 className="font-semibold text-ink text-[15px] mb-1">{step.t}</h3>
                      <p className="text-[14px] text-slate">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Primes indicatives 2026 */}
            <section id="primes">
              <h2 className="article-h2">Primes indicatives 2026 dans votre canton de travail</h2>
              <p className="article-p">
                Adulte de 35 ans, franchise 300 CHF, modèle standard, données indicatives OFSP 2026.
                L'écart entre la caisse la moins chère et la plus chère peut dépasser CHF 260 par mois dans les cantons bâlois.
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
                      ['Bâle-Ville',    'CHF 558', 'CHF 820', 'CHF 262/mois'],
                      ['Bâle-Campagne', 'CHF 520', 'CHF 738', 'CHF 218/mois'],
                      ['Schaffhouse',   'CHF 431', 'CHF 594', 'CHF 163/mois'],
                      ['Thurgovie',     'CHF 405', 'CHF 560', 'CHF 155/mois'],
                      ['Saint-Gall',    'CHF 413', 'CHF 571', 'CHF 158/mois'],
                      ['Argovie',       'CHF 395', 'CHF 546', 'CHF 151/mois'],
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
              <div className="callout text-[14px]">
                Les modèles alternatifs (médecin de famille, Telmed) réduisent la prime de 10 à 20 % par rapport au modèle standard.
                Si vous êtes éligible aux subsides cantonaux, votre prime nette peut être significativement inférieure.
              </div>
            </section>

            {/* LAMal ou GKV */}
            <section id="comment-decider">
              <h2 className="article-h2">LAMal ou GKV : comment décider ?</h2>
              <p className="article-p">
                Pour la plupart des familles avec enfants, le GKV est souvent plus économique grâce
                à la co-assurance gratuite. Pour un célibataire soigné principalement en Suisse, la LAMal est généralement préférable.
              </p>
              <div className="overflow-x-auto border border-edge rounded-[8px] mb-5">
                <table className="stripe-table w-full">
                  <thead>
                    <tr>
                      <th className="text-left whitespace-nowrap">Critère</th>
                      <th className="text-left whitespace-nowrap">Plutôt LAMal</th>
                      <th className="text-left whitespace-nowrap">Plutôt GKV</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Soins principalement en Suisse', 'Accès complet au réseau suisse sans avance de frais', 'Couverture limitée aux urgences en Suisse'],
                      ['Famille restée en Allemagne', 'Chaque membre doit avoir son propre contrat LAMal', 'Conjoint et enfants sans revenu couverts gratuitement par le GKV'],
                      ['Éligibilité aux subsides', 'Subside cantonal possible si revenu < seuil cantonal', 'Cotisation GKV proportionnelle au salaire (~14,6 % partagé), sans subside LAMal'],
                      ["Durée de l'activité en Suisse", 'Emploi stable sur le long terme', 'Mission temporaire ou situation incertaine'],
                      ['Soins réguliers prévus', 'Spécialistes et traitements chroniques accessibles en Suisse', 'Continuité avec vos médecins et spécialistes en Allemagne'],
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
              <h2 className="article-h2">Simulateur de décision</h2>
              <p className="article-p">
                Répondez à 5 questions pour obtenir une recommandation personnalisée adaptée à votre situation de frontalier germano-suisse.
              </p>
              <FrontalierSimulateur />
            </section>

            {/* FAQ */}
            <section id="faq" className="scroll-mt-20">
              <FAQ items={faqItems} />
            </section>

            {/* Contact */}
            <NeedHelpSection />

            <AuthorBio publishedDate="1er janvier 2026" updatedDate="22 avril 2026" />

            {/* Guides associés */}
            <section className="mt-8 pt-8 border-t border-edge">
              <h3 className="text-[15px] font-semibold text-ink mb-4">Guides associés</h3>
              <div className="flex flex-col gap-2">
                {[
                  { href: '/lamal/frontalier', label: 'Hub frontaliers' },
                  { href: '/lamal/ma-situation', label: 'LAMal selon votre situation professionnelle' },
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

          </article>
        </div>
      </div>
    </>
  )
}
