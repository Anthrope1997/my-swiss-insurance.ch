import type { Metadata } from 'next'
import AuthorBio from '@/components/ui/AuthorBio'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FAQ from '@/components/ui/FAQ'
import Link from 'next/link'
import NeedHelpSection from '@/components/ui/NeedHelpSection'
import FrontalierSimulateur from '@/components/lamal/FrontalierSimulateur'

export const metadata: Metadata = {
  title: 'LAMal pour les frontaliers français en Suisse romande 2026',
  description:
    "Droit d'option LAMal pour les frontaliers franco-suisses : délai de 3 mois, LAMal vs Sécurité sociale française, formulaire S1, cas Genève. Guide complet 2026.",
  openGraph: {
    title: 'LAMal frontaliers français — Suisse romande 2026',
    description:
      "Frontaliers franco-suisses : droit d'option LAMal ou Sécurité sociale, formulaire S1 et cas particulier genevois.",
    url: 'https://my-swiss-insurance.ch/lamal/frontalier-france',
    type: 'article',
  },
  alternates: { canonical: 'https://my-swiss-insurance.ch/lamal/frontalier-france' },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'LAMal pour les frontaliers français en Suisse romande 2026',
  datePublished: '2026-01-01',
  dateModified: '2026-04-22',
  author: { '@type': 'Organization', name: 'My Swiss Insurance' },
  publisher: { '@type': 'Organization', name: 'My Swiss Insurance' },
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://my-swiss-insurance.ch/lamal/frontalier-france' },
}

const faqItems = [
  {
    question: 'Un frontalier français est-il obligé de prendre la LAMal suisse ?',
    answer:
      "Non. Les frontaliers franco-suisses ont un droit d'option : ils peuvent choisir de s'affilier à la LAMal suisse ou de rester couverts par la Sécurité sociale française. Ce choix doit être exercé dans les 3 mois suivant le début de l'emploi en Suisse. En l'absence de choix dans ce délai, la LAMal suisse est appliquée par défaut dans la plupart des cantons.",
  },
  {
    question: 'Puis-je me faire soigner en France avec une LAMal suisse ?',
    answer:
      "Oui, mais avec des limitations importantes. La LAMal suisse prend en charge les soins urgents en France dans la limite du double du tarif suisse applicable. Les soins non urgents programmés en France ne sont généralement pas remboursés par la LAMal. Si vous consultez régulièrement des médecins français, le système de la Sécurité sociale française pourrait être plus adapté.",
  },
  {
    question: 'Que se passe-t-il si je ne fais pas mon choix dans les 3 mois ?',
    answer:
      "Passé le délai de 3 mois, le droit d'option est généralement considéré comme perdu. Selon le canton de travail et les accords bilatéraux applicables, la LAMal suisse peut être imposée automatiquement. Dans certains cas, une attribution d'office par l'autorité cantonale intervient. Ne laissez pas ce délai s'écouler sans décision.",
  },
  {
    question: "Le droit d'option est-il réversible ?",
    answer:
      "Non, sauf en cas de changement de situation. Une fois exercé, le droit d'option ne peut en principe plus être modifié. Les changements de situation reconnus comme motifs de révision incluent : mariage ou divorce, déménagement dans un autre pays, départ à la retraite, perte d'emploi prolongée, et changement de statut professionnel majeur.",
  },
  {
    question: 'Les frontaliers français ont-ils droit aux subsides LAMal ?',
    answer:
      "Oui, s'ils ont opté pour la LAMal et que leurs revenus correspondent aux critères cantonaux. Les subsides sont calculés sur la base du revenu déterminant, lequel inclut les revenus mondiaux. Les frontaliers peuvent y avoir droit si leur revenu global est modeste. La demande se fait auprès du service cantonal compétent dans le canton de travail.",
  },
  {
    question: 'Quelle caisse LAMal choisir en tant que frontalier français ?',
    answer:
      "Les primes LAMal pour les frontaliers sont calculées selon le canton de travail (pas le canton de résidence). Comparez les caisses disponibles dans votre canton de travail principal — les écarts peuvent dépasser CHF 100 par mois entre la caisse la moins chère et la plus chère pour un même profil. Le modèle Telmed ou médecin de famille réduit la prime de 10 à 20 % supplémentaires.",
  },
  {
    question: 'Que devient mon assurance si je cesse mon activité en Suisse ?',
    answer:
      "La LAMal est liée à la résidence ou à l'activité en Suisse. Si vous cessez toute activité en Suisse et résidez uniquement en France, votre droit à la LAMal s'éteint. Vous devrez résilier votre contrat LAMal en fournissant une preuve de cessation d'activité. Vous retrouvez automatiquement les droits de la Sécurité sociale française dans les conditions habituelles.",
  },
  {
    question: 'Ma famille restée en France est-elle couverte par ma LAMal suisse ?',
    answer:
      "Non. La LAMal suisse couvre uniquement l'assuré lui-même et les personnes qui résident en Suisse. Les membres de votre famille restés en France ne sont pas couverts par votre LAMal et doivent être affiliés à la Sécurité sociale française de façon indépendante. Si votre famille réside en Suisse, chaque membre doit avoir son propre contrat LAMal.",
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

export default function FrontalierFrancePage() {
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
            { label: 'Frontaliers français' },
          ]} />
          <div className="badge mb-5">Données OFSP 2026</div>
          <h1 className="text-4xl sm:text-5xl font-bold text-ink leading-tight mb-4 max-w-2xl">
            LAMal pour les frontaliers français en Suisse romande 2026
          </h1>
          <p className="text-[18px] text-slate max-w-2xl leading-relaxed">
            Les frontaliers franco-suisses qui travaillent dans les cantons de Genève, Vaud,
            Neuchâtel, Jura ou Valais disposent d'un droit d'option entre la LAMal suisse
            et la Sécurité sociale française. Ce choix est structurant, difficile à inverser,
            et doit être exercé dans les 3 mois suivant le début de l'emploi en Suisse.
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
                  { id: 'qui', label: 'Qui est concerné' },
                  { id: 'droit-option', label: "Droit d'option" },
                  { id: 'option-lamal', label: 'Option LAMal' },
                  { id: 'option-secu', label: 'Option Sécu française' },
                  { id: 'geneve', label: 'Cas Genève' },
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

            {/* Qui est concerné */}
            <section id="qui" className="pt-2">
              <h2 className="article-h2">Qui est concerné par ce droit d'option ?</h2>
              <p className="article-p">
                Le droit d'option s'applique aux personnes résidant en France et
                travaillant en Suisse (statut frontalier). Les accords bilatéraux Suisse-UE
                (en particulier l'Accord sur la libre circulation des personnes, ALCP)
                encadrent ce dispositif.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-cloud border border-edge rounded-[8px] p-5">
                  <h3 className="font-semibold text-ink text-[15px] mb-3">Cantons principalement concernés</h3>
                  <ul className="space-y-1.5 text-[13px] text-slate">
                    {['Genève (le plus grand flux frontalier)', 'Vaud', 'Neuchâtel', 'Jura', 'Valais'].map((c, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-brand font-bold shrink-0">•</span>{c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-cloud border border-edge rounded-[8px] p-5">
                  <h3 className="font-semibold text-ink text-[15px] mb-3">Conditions du statut frontalier</h3>
                  <ul className="space-y-1.5 text-[13px] text-slate">
                    {[
                      'Résidence habituelle en France',
                      'Emploi salarié en Suisse',
                      "Retour au domicile en principe chaque jour ou au moins une fois par semaine",
                      'Permis de travail G ou équivalent',
                    ].map((c, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-brand font-bold shrink-0">•</span>{c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Le droit d'option */}
            <section id="droit-option">
              <h2 className="article-h2">Le droit d'option : fonctionnement</h2>

              <div className="callout-warning mb-5">
                <p className="font-semibold text-[#0f2040] mb-1">Délai de 3 mois — à ne pas manquer</p>
                <p className="text-[15px] text-[#475569]">
                  Dès le premier jour de travail en Suisse, vous disposez de 3 mois pour exercer
                  votre droit d'option. Ce choix est en principe définitif sauf changement de situation.
                  Passé ce délai, la LAMal suisse est généralement appliquée par défaut.
                </p>
              </div>

              <div className="space-y-4 mb-5">
                {[
                  {
                    titre: "Comment exercer le droit d'option",
                    desc: "La démarche se fait par écrit auprès de la caisse de compensation AVS de votre employeur ou auprès du service cantonal compétent. Si vous optez pour la Sécurité sociale française, vous devez le déclarer explicitement et obtenir le formulaire S1 auprès de votre caisse de sécurité sociale française (CPAM).",
                  },
                  {
                    titre: 'Situations ouvrant une révision du choix',
                    desc: "Le droit d'option ne peut être modifié qu'en cas de changement de situation reconnu : mariage ou divorce, déménagement hors de France, départ à la retraite, perte d'emploi prolongée. Ces révisions ne sont pas automatiques — elles doivent être sollicitées auprès des autorités compétentes.",
                  },
                ].map((item, i) => (
                  <div key={i} className="border border-edge rounded-[8px] p-5 bg-white">
                    <h3 className="font-semibold text-ink text-[15px] mb-2">{item.titre}</h3>
                    <p className="text-[14px] text-slate">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Option LAMal */}
            <section id="option-lamal">
              <h2 className="article-h2">Option LAMal suisse</h2>

              <div className="bg-[#f0fdf4] border border-[#86efac] rounded-[8px] p-5 mb-5">
                <h3 className="font-semibold text-ink text-[15px] mb-3">Avantages de la LAMal</h3>
                <ul className="space-y-2 text-[13px] text-slate">
                  {[
                    'Droits identiques à un résident suisse : accès complet au réseau médical suisse',
                    'Primes calculées selon le canton de travail',
                    'Droit potentiel aux subsides cantonaux selon revenus',
                    'Liberté de choix de la caisse et du modèle',
                    "Couverture accidents automatique en cas d'emploi salarié (LAA)",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <svg className="w-3.5 h-3.5 text-[#22c55e] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-edge rounded-[8px] p-5 bg-white mb-5">
                <h3 className="font-semibold text-ink text-[15px] mb-2">Se faire soigner en France avec la LAMal</h3>
                <p className="text-[14px] text-slate">
                  La LAMal prend en charge les soins urgents en France dans la limite du double
                  du tarif suisse. Les soins non urgents programmés en France sont généralement
                  exclus. Si vous consultez régulièrement en France (médecin de famille, spécialiste),
                  prévoyez une complémentaire LCA internationale ou optez pour la Sécurité sociale française.
                </p>
              </div>
            </section>

            {/* Option Sécurité sociale */}
            <section id="option-secu">
              <h2 className="article-h2">Option Sécurité sociale française</h2>

              <div className="bg-cloud border border-edge rounded-[8px] p-5 mb-5">
                <h3 className="font-semibold text-ink text-[15px] mb-3">Avantages du maintien en France</h3>
                <ul className="space-y-2 text-[13px] text-slate">
                  {[
                    'Continuité avec votre médecin traitant et réseau de soins français',
                    'Couverture de votre famille restée en France',
                    "Pas de rupture avec vos droits de retraite en France",
                    'Complémentaire santé française (mutuelle) applicable',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-slate font-bold shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                {[
                  {
                    titre: 'Le formulaire S1 (ex-formulaire E106)',
                    desc: "Si vous optez pour la Sécurité sociale française, votre employeur suisse doit vous fournir le formulaire S1. Ce document atteste de votre couverture accident-maladie via la LAA suisse et vous permet d'accéder aux soins en France. Il est délivré par la caisse de compensation AVS de votre employeur.",
                  },
                  {
                    titre: 'Couverture en Suisse limitée aux urgences',
                    desc: "Avec l'option Sécurité sociale française, vos soins en Suisse ne sont remboursés qu'en cas d'urgence médicale. Les consultations programmées chez un médecin suisse ne sont pas prises en charge. Pour travailler en Suisse, votre employeur vous couvre via la LAA pour les accidents du travail.",
                  },
                ].map((item, i) => (
                  <div key={i} className="border border-edge rounded-[8px] p-5 bg-white">
                    <h3 className="font-semibold text-ink text-[15px] mb-2">{item.titre}</h3>
                    <p className="text-[14px] text-slate">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Cas Genève */}
            <section id="geneve">
              <h2 className="article-h2">Cas particulier des frontaliers genevois</h2>
              <p className="article-p">
                Genève est le canton suisse avec le plus grand nombre de frontaliers français
                (environ 100 000 personnes). Des dispositions spécifiques s'appliquent dans
                ce contexte particulier.
              </p>

              <div className="space-y-4">
                {[
                  {
                    titre: "Droit d'option spécifique au canton de Genève",
                    desc: "Les frontaliers genevois disposent du même droit d'option que les autres frontaliers franco-suisses, mais avec des particularités liées aux conventions fiscales franco-genevoises et aux accords bilatéraux de coordination sociale.",
                  },
                  {
                    titre: 'Complémentaire Santé Solidaire (ex-CMU-C) en France',
                    desc: "Les frontaliers genevois optant pour la Sécurité sociale française et dont les revenus le permettent peuvent bénéficier de la Complémentaire Santé Solidaire (anciennement CMU-C) en France. Cette couverture complémentaire gratuite ou à tarif réduit est attribuée sous conditions de ressources par la CPAM de Haute-Savoie ou de l'Ain selon le département de résidence.",
                  },
                  {
                    titre: 'Évolutions récentes à surveiller',
                    desc: "Les accords bilatéraux Suisse-UE et leurs implications sur la protection sociale des frontaliers évoluent. Consultez régulièrement le site de la CPAM ou de la caisse de compensation genevoise (OCAS) pour les mises à jour relatives à votre situation.",
                  },
                ].map((item, i) => (
                  <div key={i} className="border border-edge rounded-[8px] p-5 bg-white">
                    <h3 className="font-semibold text-ink text-[15px] mb-2">{item.titre}</h3>
                    <p className="text-[14px] text-slate">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Primes indicatives 2026 */}
            <section id="primes">
              <h2 className="article-h2">Primes indicatives 2026 dans votre canton de travail</h2>
              <p className="article-p">
                Adulte de 35 ans, franchise 300 CHF, modèle standard, données OFSP 2026.
                L'écart entre la caisse la moins chère et la plus chère peut dépasser CHF 200 par mois dans le même canton.
              </p>
              <div className="overflow-x-auto border border-edge rounded-[8px] mb-5">
                <table className="stripe-table w-full">
                  <thead>
                    <tr>
                      <th className="text-left whitespace-nowrap">Canton de travail</th>
                      <th className="text-left whitespace-nowrap">Prime min. mensuelle</th>
                      <th className="text-left whitespace-nowrap">Prime max. mensuelle</th>
                      <th className="text-left whitespace-nowrap">Économie max. possible</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Genève',    'CHF 634', 'CHF 863', 'CHF 229/mois'],
                      ['Vaud',      'CHF 579', 'CHF 686', 'CHF 107/mois'],
                      ['Neuchâtel', 'CHF 610', 'CHF 755', 'CHF 145/mois'],
                      ['Jura',      'CHF 592', 'CHF 707', 'CHF 115/mois'],
                      ['Valais',    'CHF 433', 'CHF 575', 'CHF 142/mois'],
                    ].map((row, i) => (
                      <tr key={i}>
                        <td className="font-semibold text-ink">{row[0]}</td>
                        <td className="text-slate">{row[1]}</td>
                        <td className="text-slate">{row[2]}</td>
                        <td className="text-slate">{row[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="callout text-[14px]">
                Les modèles alternatifs (médecin de famille, Telmed) réduisent la prime de 10 à 20 % par rapport au modèle standard.
                Si vous êtes éligible aux subsides cantonaux, votre prime nette peut être significativement inférieure.
              </div>
            </section>

            {/* LAMal ou Sécurité sociale */}
            <section id="comment-decider">
              <h2 className="article-h2">LAMal ou Sécurité sociale : comment décider ?</h2>
              <div className="overflow-x-auto border border-edge rounded-[8px] mb-5">
                <table className="stripe-table w-full">
                  <thead>
                    <tr>
                      <th className="text-left whitespace-nowrap">Critère</th>
                      <th className="text-left whitespace-nowrap">Plutôt LAMal</th>
                      <th className="text-left whitespace-nowrap">Plutôt Sécurité sociale</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Soins principalement en Suisse', 'Accès complet au réseau suisse sans avance de frais', 'Couverture limitée aux urgences en Suisse'],
                      ['Famille restée en France', 'Chaque membre doit avoir son propre contrat LAMal', 'Conjoint et enfants couverts par la Sécu, mutuelle applicable'],
                      ['Éligibilité aux subsides', 'Subside cantonal possible si revenu < seuil cantonal', 'Cotisation Sécu proportionnelle au salaire, sans subside LAMal'],
                      ["Durée de l'activité en Suisse", 'Emploi stable sur le long terme', 'Mission temporaire ou situation incertaine'],
                      ['Soins réguliers prévus', 'Spécialistes et traitements chroniques accessibles en Suisse', 'Continuité avec vos médecins et spécialistes en France'],
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
                Répondez à 5 questions pour obtenir une recommandation personnalisée adaptée à votre situation de frontalier franco-suisse.
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
