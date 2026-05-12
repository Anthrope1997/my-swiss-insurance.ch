import AuthorBio from '@/components/ui/AuthorBio'
import FAQ from '@/components/ui/FAQ'
import HeroStats from '@/components/ui/HeroStats'
import NeedHelpSection from '@/components/ui/NeedHelpSection'
import CantonSearch from '@/components/ui/CantonSearch'
import RelatedGuides from '@/components/shared/RelatedGuides'
import InfoBox from '@/components/shared/InfoBox'
import Link from 'next/link'
import type { ReactNode } from 'react'
import type { Canton } from '@/data/sante/cantons'

function ordinal(n: number): string {
  return n === 1 ? '1er' : `${n}e`
}

function formatChf(n: number): string {
  return n.toLocaleString('fr-CH')
}

export default function CantonPage({ canton, noFaqSchema = false, heroIntro, overrideHeroStats, overrideEnBref }: {
  canton: Canton
  noFaqSchema?: boolean
  heroIntro?: ReactNode
  overrideHeroStats?: Array<{ value: string; label: string; sub: string }>
  overrideEnBref?: string[]
}) {
  const cheapest = canton.topCaisses[0]

  const rowMin = canton.franchiseTable.find((r) => r.franchise === 300)!
  const rowMax = canton.franchiseTable.find((r) => r.franchise === 2500)!
  const economieFranchise = rowMin.cout0 - rowMax.cout0
  const savingF    = rowMin.cout0    - rowMax.cout0
  const crossoverF = rowMax.cout3000 - rowMin.cout3000
  const breakEven  = Math.round(3000 * savingF / (savingF + crossoverF))

  const heroStats = overrideHeroStats ?? [
    {
      value: `${cheapest.prime} CHF`,
      label: 'Prime adulte la moins chère',
      sub: 'adulte 35 ans, modèle standard, franchise 300 CHF',
    },
    {
      value: `${canton.primeMoyenneEnfant} CHF`,
      label: 'Prime enfant la moins chère',
      sub: 'enfant 0–18 ans, modèle standard, franchise 300 CHF',
    },
    {
      value: canton.subside.subsideMensuelMax ? `${canton.subside.subsideMensuelMax} CHF` : '–',
      label: 'Subside mensuel max.',
      sub: canton.subside.subsideMensuelMax ? 'barème cantonal 2026' : 'Barème non publié',
    },
  ]

  const enBref = overrideEnBref ?? [
    `Avec une franchise de 300 CHF, la prime la moins chère est de ${Math.round(rowMin.primeMois)} CHF par mois (${formatChf(rowMin.primeAn)} CHF par an).`,
    `Avec une franchise de 2 500 CHF, la prime la moins chère est de ${Math.round(rowMax.primeMois)} CHF par mois (${formatChf(rowMax.primeAn)} CHF par an).`,
    `La franchise 300 CHF devient plus avantageuse si vos frais médicaux dépassent CHF ${formatChf(breakEven)} par an.`,
  ]

  const tocBase = [
    { id: 'top-caisses', label: 'Caisses les moins chères'                                 },
    ...(canton.modelesAlternatifs ? [{ id: 'modeles', label: 'Modèles alternatifs' }] : []),
    { id: 'franchise',   label: 'Choisir sa franchise'                                     },
    { id: 'subsides',    label: 'Subsides LAMal'                                           },
    { id: 'faq',         label: 'Questions fréquentes'                                     },
  ]
  const toc = tocBase.map((s, i) => ({ ...s, label: `${i + 1}. ${s.label}` }))

  const faqItems = [
    {
      question: `Quelle est la caisse la moins chère à ${canton.villePrincipale} en 2026 ?`,
      answer:
        `${cheapest.name} est la caisse la moins chère à ${canton.villePrincipale} en 2026, à partir de ${cheapest.prime} CHF par mois pour un adulte de 35 ans (franchise 300 CHF, modèle standard, source OFSP 2026). ` +
        `En choisissant la meilleure caisse plutôt que la plus chère, vous économisez jusqu'à CHF ${formatChf(canton.economieAn)} par an pour des prestations identiques.`,
    },
    {
      question: `Comment changer de caisse maladie dans le canton de ${canton.name} ?`,
      answer:
        `Pour changer de caisse maladie dans le canton de ${canton.name}, vous devez envoyer votre résiliation par courrier recommandé au plus tard le 30 novembre pour un changement au 1er janvier suivant. ` +
        `Si votre caisse annonce une hausse de prime en septembre, vous disposez d'un délai supplémentaire d'un mois pour résilier. ` +
        `Votre nouvelle caisse prend ensuite en charge toutes les démarches d'affiliation.`,
    },
    {
      question: `Quelle est la différence entre le modèle standard et le médecin de famille ?`,
      answer:
        `Le modèle standard vous permet de consulter directement n'importe quel médecin ou spécialiste sans restriction. ` +
        `Le modèle médecin de famille vous oblige à passer d'abord par votre médecin de famille, qui vous oriente si nécessaire vers un spécialiste. ` +
        `En contrepartie, le modèle médecin de famille est moins coûteux, avec des primes généralement réduites de 10 à 20 % par rapport au modèle standard. ` +
        `Les prestations remboursées sont identiques dans les deux cas.`,
    },
    {
      question: `Le canton de ${canton.name} est-il cher pour l'assurance maladie ?`,
      answer:
        `Avec une prime moyenne de ${canton.primeMoyenne} CHF par mois pour un adulte (tous modèles et franchises confondus), le canton de ${canton.name} se classe au ${ordinal(canton.rang)} rang sur 26 cantons suisses, du moins cher au plus cher (source OFSP 2026). ` +
        `Les primes varient selon votre commune de résidence${canton.nbRegions > 1 ? `, le canton compte ${canton.nbRegions} régions tarifaires OFSP` : ''}, votre franchise et le modèle d'assurance choisi.`,
    },
    {
      question: `Quelle est la différence de prime entre adulte et jeune adulte dans le canton de ${canton.name} ?`,
      answer:
        `Dans le canton de ${canton.name} en 2026, la prime standard (franchise 300 CHF, modèle de base) est de ${canton.primeMoyenneJA} CHF par mois pour un jeune adulte de 19 à 25 ans. La prime moyenne tous profils confondus est de ${canton.primeMoyenne} CHF pour un adulte. ` +
        `Cet écart de ${canton.primeMoyenne - canton.primeMoyenneJA} CHF par mois représente ${formatChf((canton.primeMoyenne - canton.primeMoyenneJA) * 12)} CHF par an.`,
    },
    {
      question: `Les prestations LAMal sont-elles identiques dans toutes les caisses ?`,
      answer:
        `Oui, toutes les caisses maladie agréées par l'OFSP sont tenues de rembourser exactement les mêmes prestations de base dans le cadre de la LAMal. ` +
        `Ce sont la prime mensuelle, le service client et les offres complémentaires qui diffèrent d'une caisse à l'autre. ` +
        `Choisir la caisse la moins chère ne diminue donc en aucun cas la qualité ou l'étendue de vos remboursements médicaux.`,
    },
  ]

  // ── Schemas ───────────────────────────────────────────────────────────────

  const faqSchema = !noFaqSchema
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }
    : null

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Assurance maladie dans le canton de ${canton.name}`,
    description:
      `Prime LAMal moyenne ${canton.primeMoyenne} CHF par mois dans le ${canton.cantonDe} (tous modèles et franchises). ` +
      `Caisse la moins chère : ${cheapest.name} à ${cheapest.prime} CHF par mois. ` +
      `Économie maximum CHF ${canton.economieAn} par an. Données OFSP 2026.`,
    datePublished: '2026-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    author: { '@type': 'Organization', name: 'My Swiss Insurance', url: 'https://my-swiss-insurance.ch' },
    publisher: { '@type': 'Organization', name: 'My Swiss Insurance', url: 'https://my-swiss-insurance.ch' },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://my-swiss-insurance.ch/sante/canton/${canton.slug}`,
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://my-swiss-insurance.ch' },
      { '@type': 'ListItem', position: 2, name: 'LAMal', item: 'https://my-swiss-insurance.ch/sante' },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Canton de ${canton.name}`,
        item: `https://my-swiss-insurance.ch/sante/canton/${canton.slug}`,
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-edge pt-12 pb-14">
        <div className="container-xl">

          <h1 className="text-4xl sm:text-5xl font-bold text-ink leading-tight mb-5">
            Assurance maladie de base LAMal dans le {canton.cantonDe}
          </h1>

          {heroIntro ?? (
            <p className="text-[18px] text-slate leading-relaxed mb-8">
              Dans le {canton.cantonDe} en 2026, les assurés peuvent économiser jusqu'à{' '}
              <strong>CHF {formatChf(canton.economieAn)} par an</strong> en changeant de caisse,
              à prestations identiques. Le canton se classe{' '}
              <strong>{ordinal(canton.rang)} sur 26</strong> cantons suisses.
            </p>
          )}

          <HeroStats stats={heroStats} className="mb-10" />
        </div>
      </section>

      {/* ── Zone 2 — En bref + Sommaire ──────────────────────────────────── */}
      <div className="bg-cloud border-b border-edge py-8">
        <div className="container-xl grid grid-cols-1 md:grid-cols-2 gap-5">
          <InfoBox title="En bref" items={enBref} />
          <div className="bg-white border border-edge rounded-xl p-5">
            <p className="text-2xl font-semibold text-ink mb-3">Sommaire</p>
            <ul className="space-y-1">
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="block text-[17px] text-slate leading-relaxed hover:text-brand hover:bg-cloud px-2 py-1 rounded transition-colors">{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Contenu principal ─────────────────────────────────────────────── */}
      <div className="container-xl py-14 space-y-16">

        {/* ── Top caisses ──────────────────────────────────────────────── */}
        <section id="top-caisses">
          <h2 className="article-h2">
            Quelles caisses sont les moins chères dans le {canton.cantonDe} en 2026 ?
          </h2>
          <p className="text-[16px] text-slate mb-6">
            Classement pour un adulte de 35 ans, franchise 300 CHF, modèle standard, sans couverture accident,
            en moyenne sur {canton.nbRegions > 1 ? `les ${canton.nbRegions} régions tarifaires` : `l'ensemble`} du canton.
            Les primes varient selon votre profil exact et votre commune.
          </p>
          <div className="border border-edge rounded-[8px] overflow-hidden">
            <table className="stripe-table w-full text-[16px]">
              <thead>
                <tr>
                  <th className="w-12 text-left whitespace-nowrap">Rang</th>
                  <th className="text-left whitespace-nowrap">Caisse</th>
                  <th className="text-left whitespace-nowrap">Prime par mois</th>
                  <th className="text-left whitespace-nowrap hidden sm:table-cell">Prime par an</th>
                  <th className="text-left whitespace-nowrap hidden md:table-cell">Économie annuelle</th>
                </tr>
              </thead>
              <tbody>
                {canton.topCaisses.map((c, i) => {
                  const econAn = (canton.caissePlusChere.prime - c.prime) * 12
                  return (
                    <tr key={c.name}>
                      <td>
                        <span className="w-6 h-6 rounded-full bg-blue-tint text-brand text-xs font-bold inline-flex items-center justify-center">
                          {i + 1}
                        </span>
                      </td>
                      <td className="font-semibold text-ink whitespace-nowrap">{c.name}</td>
                      <td className="text-left font-bold text-brand whitespace-nowrap">{c.prime} CHF</td>
                      <td className="text-left whitespace-nowrap hidden sm:table-cell text-slate">
                        {formatChf(c.prime * 12)} CHF
                      </td>
                      <td className="text-left whitespace-nowrap hidden md:table-cell">
                        <span className="text-brand font-semibold">
                          {formatChf(econAn)} CHF par an
                        </span>
                      </td>
                    </tr>
                  )
                })}
                {/* Ligne de référence : caisse la plus chère */}
                <tr className="bg-cloud/70">
                  <td>
                    <span className="w-6 h-6 rounded-full bg-cloud text-slate/50 text-xs font-bold inline-flex items-center justify-center">
                      {canton.topCaisses.length + 1}
                    </span>
                  </td>
                  <td className="text-slate whitespace-nowrap">{canton.caissePlusChere.name}</td>
                  <td className="text-left text-slate whitespace-nowrap">{canton.caissePlusChere.prime} CHF</td>
                  <td className="text-left whitespace-nowrap hidden sm:table-cell text-slate/60">
                    {formatChf(canton.caissePlusChere.prime * 12)} CHF
                  </td>
                  <td className="text-left whitespace-nowrap hidden md:table-cell text-[16px] text-slate/50 italic">
                    Caisse la plus chère
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <Link href="/sante/comparateur" className="text-brand hover:underline text-[16px] font-medium">
              Comparer les primes →
            </Link>
          </div>

          {canton.caisseJA && (
            <p className="text-[16px] text-slate mt-5">
              Pour un jeune adulte de 19 à 25 ans, la meilleure prime dans le {canton.cantonDe} est de{' '}
              <strong className="text-ink">{canton.caisseJA.prime} CHF par mois</strong>{' '}
              ({canton.caisseJA.name}, franchise 300 CHF, modèle standard).
            </p>
          )}
          <p className="text-[16px] text-slate mt-3">
            Pour un enfant de 0 à 18 ans, la meilleure prime dans le {canton.cantonDe} est de{' '}
            <strong className="text-ink">{canton.primeMoyenneEnfant} CHF par mois</strong>{' '}
            (franchise 300 CHF, modèle standard).
          </p>
        </section>

        {/* ── Modèles alternatifs ───────────────────────────────────────── */}
        {canton.modelesAlternatifs && (
          <section id="modeles">
            <h2 className="article-h2">
              Économiser avec un modèle alternatif dans le {canton.cantonDe}
            </h2>
            <p className="text-[16px] text-slate mb-6">
              Le modèle standard offre la liberté de consulter n&apos;importe quel médecin sans restriction. En optant pour un modèle alternatif (médecin de famille, HMO ou télémédecine), vous réduisez votre prime tout en conservant les mêmes remboursements LAMal.
            </p>
            <div className="border border-edge rounded-[8px] overflow-hidden">
              <table className="stripe-table w-full text-[16px]">
                <thead>
                  <tr>
                    <th className="text-left whitespace-nowrap">Modèle</th>
                    <th className="text-left whitespace-nowrap">Caisse</th>
                    <th className="text-left whitespace-nowrap">Prime / mois</th>
                    <th className="text-left whitespace-nowrap hidden sm:table-cell">Économie annuelle</th>
                    <th className="text-left whitespace-nowrap hidden sm:table-cell">Économie %</th>
                  </tr>
                </thead>
                <tbody>
                  {canton.modelesAlternatifs.map((m, i) => {
                    const ref = canton.modelesAlternatifs![0].prime
                    const econAn = i === 0 ? 0 : Math.round((ref - m.prime) * 12)
                    const econPct = i === 0 ? 0 : Math.round(((ref - m.prime) / ref) * 100)
                    return (
                      <tr key={m.modele} className={i === 0 ? 'bg-cloud/70' : ''}>
                        <td className="font-medium text-ink whitespace-nowrap">{m.modele}</td>
                        <td className="whitespace-nowrap text-slate">{m.caisse}</td>
                        <td className={`text-left whitespace-nowrap font-semibold ${i === 0 ? 'text-slate' : 'text-brand'}`}>
                          {m.prime.toFixed(2)} CHF
                        </td>
                        <td className="text-left whitespace-nowrap hidden sm:table-cell">
                          {i === 0 ? (
                            <span className="text-slate/50 text-[16px] italic">Référence</span>
                          ) : (
                            <span className="text-brand font-semibold">{formatChf(econAn)} CHF</span>
                          )}
                        </td>
                        <td className="text-left whitespace-nowrap hidden sm:table-cell text-slate">
                          {i === 0 ? '—' : `−${econPct} %`}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <Link href="/sante/comparateur" className="text-brand hover:underline text-[16px] font-medium">
                Comparer les modèles alternatifs →
              </Link>
            </div>
          </section>
        )}

        {/* ── Franchise ────────────────────────────────────────────────── */}
        <section id="franchise">
          <h2 className="article-h2">
            Quelle franchise choisir dans le {canton.cantonDe} ?
          </h2>
          <p className="text-[16px] text-slate mb-6">
            Tableau établi pour <strong className="text-ink">{canton.caisseRef}</strong>, adulte de 35 ans,
            sans couverture accident. Le coût total inclut la prime annuelle, la franchise et la quote-part
            (10 %, maximum 700 CHF par an).
          </p>
          <div className="border border-edge rounded-[8px] overflow-hidden">
            <table className="stripe-table w-full text-[16px]">
              <thead>
                <tr>
                  <th className="text-left whitespace-nowrap">Franchise</th>
                  <th className="text-left whitespace-nowrap">Prime par mois</th>
                  <th className="text-left whitespace-nowrap hidden sm:table-cell">Prime par an</th>
                  <th className="text-left whitespace-nowrap">Si aucun frais</th>
                  <th className="text-left whitespace-nowrap hidden sm:table-cell">Si 3 000 CHF</th>
                  <th className="text-left whitespace-nowrap hidden md:table-cell">Si 8 000 CHF</th>
                </tr>
              </thead>
              <tbody>
                {canton.franchiseTable.map((row) => (
                  <tr key={row.franchise}>
                    <td className="font-semibold text-ink whitespace-nowrap">CHF {formatChf(row.franchise)}</td>
                    <td className="text-left text-brand font-semibold whitespace-nowrap">{row.primeMois.toFixed(2)}</td>
                    <td className="text-left whitespace-nowrap hidden sm:table-cell text-slate">{formatChf(row.primeAn)}</td>
                    <td className="text-left font-medium whitespace-nowrap">{formatChf(row.cout0)}</td>
                    <td className="text-left whitespace-nowrap hidden sm:table-cell text-slate">{formatChf(row.cout3000)}</td>
                    <td className="text-left whitespace-nowrap hidden md:table-cell text-slate">{formatChf(row.cout8000)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-cloud border border-edge rounded-[8px] px-5 py-4">
              <p className="text-[16px] font-bold text-ink/50 uppercase tracking-wide mb-3">
                Si vous êtes rarement malade
              </p>
              <p className="text-xl font-bold text-brand mb-1">Franchise 2 500 CHF</p>
              <p className="text-[16px] text-ink">
                Économie de {formatChf(economieFranchise)} CHF par an sur la prime
              </p>
            </div>
            <div className="bg-cloud border border-edge rounded-[8px] px-5 py-4">
              <p className="text-[16px] font-bold text-ink/50 uppercase tracking-wide mb-3">
                Si vous avez des soins réguliers
              </p>
              <p className="text-xl font-bold text-brand mb-1">Franchise 300 CHF</p>
              <p className="text-[16px] text-ink">
                Franchise plus avantageuse à partir de CHF {formatChf(breakEven)} de frais médicaux
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/sante/comparateur" className="text-brand hover:underline text-[16px] font-medium">
              Comparer les franchises →
            </Link>
          </div>
        </section>

        {/* ── Subsides ─────────────────────────────────────────────────── */}
        <section id="subsides">
          <h2 className="article-h2">
            Quels subsides LAMal dans le {canton.cantonDe} ?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            <div className="bg-cloud border border-edge rounded-[8px] px-4 py-3">
              <p className="text-[16px] font-bold text-slate/60 uppercase tracking-wide mb-1">Attribution</p>
              <p className="text-[16px] font-medium text-ink">
                {canton.subside.automatique ? 'Automatique' : 'Sur demande'}
              </p>
            </div>
            <div className="bg-cloud border border-edge rounded-[8px] px-4 py-3">
              <p className="text-[16px] font-bold text-slate/60 uppercase tracking-wide mb-1">Date butoir</p>
              <p className="text-[16px] font-medium text-ink">
                {canton.subside.automatique ? 'Non requis' : (canton.subside.delai ?? '—')}
              </p>
            </div>
            <div className="bg-cloud border border-edge rounded-[8px] px-4 py-3">
              <p className="text-[16px] font-bold text-slate/60 uppercase tracking-wide mb-1">Subside max</p>
              <p className="text-[16px] font-medium text-brand">
                {canton.subside.subsideMensuelMax ? `${canton.subside.subsideMensuelMax} CHF / mois` : '—'}
              </p>
            </div>
            <div className="bg-cloud border border-edge rounded-[8px] px-4 py-3">
              <p className="text-[16px] font-bold text-slate/60 uppercase tracking-wide mb-1">Revenu max (seul)</p>
              <p className="text-[16px] font-medium text-ink">{canton.subside.seuilRevenu}</p>
            </div>
          </div>

          <p className="text-[16px] text-slate/60 mb-5">
            Les règles de calcul sont complexes, spécifiques à chaque canton et dépendent de votre profil. Le montant exact est déterminé par le canton sur la base de votre dossier fiscal.
          </p>

          <Link href="/sante/subsides" className="text-brand hover:underline text-[16px] font-medium">
            Calculer mes subsides LAMal →
          </Link>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section id="faq" className="border-t border-edge pt-8">
          <FAQ items={faqItems} title="Questions fréquentes" />
        </section>

        {/* ── Formulaire multi-étapes ───────────────────────────────────── */}
        <NeedHelpSection />

        {/* ── Mise à jour ──────────────────────────────────────────────── */}
        <AuthorBio publishedDate="1er janvier 2026" updatedDate="21 avril 2026" />

        {/* ── Recherche par canton ─────────────────────────────────────── */}
        <section>
          <p className="text-[13px] font-semibold text-slate uppercase tracking-widest mb-4">
            Comparer un autre canton
          </p>
          <CantonSearch />
        </section>

        <RelatedGuides guides={[
          { href: '/sante/guide',             label: 'Comprendre la LAMal'       },
          { href: '/sante/franchise',         label: 'Choisir sa franchise'      },
          { href: '/sante/changer-de-caisse', label: 'Changer de caisse maladie' },
          { href: '/sante/subsides',          label: 'Calculateur de subsides'   },
        ]} />

      </div>
    </>
  )
}
