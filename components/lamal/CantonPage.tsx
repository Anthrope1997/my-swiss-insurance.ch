import AuthorBio from '@/components/ui/AuthorBio'
import FAQ from '@/components/ui/FAQ'
import FormScrollButton from '@/components/ui/FormScrollButton'
import NeedHelpSection from '@/components/ui/NeedHelpSection'
import StickyBar from '@/components/ui/StickyBar'
import SubsidesCalculator from '@/components/lamal/SubsidesCalculator'
import Link from 'next/link'
import type { Canton } from '@/data/lamal/cantons'
import { allCantons } from '@/data/lamal/cantons'
import type { Canton as SubsideCanton } from '@/lib/lamal/calcul-subside'

const SLUG_TO_SUBSIDE: Record<string, SubsideCanton> = {
  vaud: 'VD', geneve: 'GE', fribourg: 'FR',
  valais: 'VS', neuchatel: 'NE', jura: 'JU',
}

function ordinal(n: number): string {
  return n === 1 ? '1er' : `${n}e`
}

function formatChf(n: number): string {
  return n.toLocaleString('fr-CH')
}

export default function CantonPage({ canton, noFaqSchema = false }: { canton: Canton; noFaqSchema?: boolean }) {
  const cheapest = canton.topCaisses[0]
  const subsideCanton = SLUG_TO_SUBSIDE[canton.slug]

  const rowMin = canton.franchiseTable.find((r) => r.franchise === 300)!
  const rowMax = canton.franchiseTable.find((r) => r.franchise === 2500)!
  const economieFranchise = rowMin.cout0 - rowMax.cout0

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
        `Avec une prime moyenne de ${canton.primeMoyenne} CHF par mois pour un adulte (franchise 300 CHF, modèle standard), le canton de ${canton.name} se classe au ${ordinal(canton.rang)} rang sur 26 cantons suisses, du moins cher au plus cher (source OFSP 2026). ` +
        `Les primes varient selon votre commune de résidence${canton.nbRegions > 1 ? `, le canton compte ${canton.nbRegions} régions tarifaires OFSP` : ''}, votre franchise et le modèle d'assurance choisi.`,
    },
    {
      question: `Quelle est la différence de prime entre adulte et jeune adulte dans le canton de ${canton.name} ?`,
      answer:
        `Dans le canton de ${canton.name} en 2026, la prime mensuelle moyenne pour un jeune adulte de 19 à 25 ans est de ${canton.primeMoyenneJA} CHF, contre ${canton.primeMoyenne} CHF pour un adulte de 26 ans et plus (franchise 300 CHF, modèle standard, source OFSP 2026). ` +
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
      `Prime LAMal moyenne ${canton.primeMoyenne} CHF par mois dans le ${canton.cantonDe}. ` +
      `Caisse la moins chère : ${cheapest.name} à ${cheapest.prime} CHF par mois. ` +
      `Économie maximum CHF ${canton.economieAn} par an. Données OFSP 2026.`,
    datePublished: '2026-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    author: { '@type': 'Organization', name: 'My Swiss Insurance', url: 'https://my-swiss-insurance.ch' },
    publisher: { '@type': 'Organization', name: 'My Swiss Insurance', url: 'https://my-swiss-insurance.ch' },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://my-swiss-insurance.ch/lamal/canton/${canton.slug}`,
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://my-swiss-insurance.ch' },
      { '@type': 'ListItem', position: 2, name: 'LAMal', item: 'https://my-swiss-insurance.ch/lamal' },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Canton de ${canton.name}`,
        item: `https://my-swiss-insurance.ch/lamal/canton/${canton.slug}`,
      },
    ],
  }

  const otherCantons = allCantons.filter((c) => c.slug !== canton.slug)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <StickyBar cantonName={canton.name} economieAn={canton.economieAn} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-edge pt-12 pb-14">
        <div className="container-xl">
          <div className="badge mb-5">Données OFSP 2026</div>

          <h1 className="text-4xl sm:text-5xl font-bold text-ink leading-tight mb-5 max-w-3xl">
            Assurance maladie dans le canton de {canton.name}
          </h1>

          <p className="text-lg text-slate leading-relaxed mb-10 max-w-2xl">
            Dans le canton de {canton.name} en 2026, les assurés {canton.demonym} peuvent économiser jusqu'à{' '}
            <strong className="text-[#16a34a]">CHF {formatChf(canton.economieAn)} par an</strong> en changeant
            de caisse, pour des prestations identiques. Le canton se classe{' '}
            <strong className="text-ink">{ordinal(canton.rang)} sur 26</strong> cantons suisses. La prime varie
            selon votre commune de résidence, votre franchise et votre modèle d'assurance.
          </p>

          {/* 3 chiffres clés */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3">
            <div className="bg-cloud border border-edge rounded-xl px-5 py-5">
              <p className="text-[11px] font-semibold text-slate uppercase tracking-widest mb-3">
                Meilleure prime
              </p>
              <p className="text-4xl font-bold text-ink leading-none">{cheapest.prime}</p>
              <p className="text-[14px] text-slate mt-2">CHF par mois</p>
            </div>
            <div className="bg-[#f0fdf4] border border-[#86efac] rounded-xl px-5 py-5">
              <p className="text-[11px] font-semibold text-[#166534] uppercase tracking-widest mb-3">
                Économie annuelle
              </p>
              <p className="text-4xl font-bold text-[#166534] leading-none">{formatChf(canton.economieAn)}</p>
              <p className="text-[14px] text-[#166534] mt-2">CHF par an</p>
            </div>
            <div className="bg-[#eff6ff] border border-[#bfdbfe] rounded-xl px-5 py-5">
              <p className="text-[11px] font-semibold text-brand uppercase tracking-widest mb-3">
                Subside mensuel maximal
              </p>
              {canton.subside.subsideMensuelMax ? (
                <>
                  <p className="text-4xl font-bold text-brand leading-none">
                    {canton.subside.subsideMensuelMax}
                  </p>
                  <p className="text-[14px] text-brand mt-2">CHF par mois</p>
                </>
              ) : (
                <>
                  <p className="text-4xl font-bold text-slate leading-none">–</p>
                  <p className="text-[14px] text-slate mt-2">Barème non publié</p>
                </>
              )}
            </div>
          </div>

          <p className="text-[12px] text-slate/60 mb-10">
            Données pour un adulte de 35 ans habitant à {canton.villePrincipale}. Utilisez le comparateur
            pour une simulation personnalisée.
          </p>

          {/* 2 CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <FormScrollButton intent="compare" className="btn-primary text-[15px] px-8 py-3.5">
              Comparer ma prime →
            </FormScrollButton>
            <FormScrollButton className="btn-secondary text-[15px] px-8 py-3.5">
              Être rappelé gratuitement
            </FormScrollButton>
          </div>

          {/* Encadré régions tarifaires */}
          <div className="bg-cloud border border-edge rounded-xl px-5 py-4 max-w-2xl">
            <p className="text-[13px] font-semibold text-ink mb-1.5">
              {canton.nbRegions > 1
                ? `${canton.nbRegions} régions tarifaires dans le canton`
                : 'Tarif uniforme dans le canton'}
            </p>
            <p className="text-[14px] text-slate leading-relaxed">
              {canton.nbRegions > 1
                ? `Dans le canton de ${canton.name}, les primes LAMal varient selon votre commune de résidence. L'OFSP divise le territoire en ${canton.nbRegions} régions tarifaires (${canton.regions.map((r) => r.id).join(' et ')}), avec des primes allant de ${Math.min(...canton.regions.map((r) => r.prime)).toFixed(0)} à ${Math.max(...canton.regions.map((r) => r.prime)).toFixed(0)} CHF par mois en moyenne.`
                : `Dans le canton de ${canton.name}, les primes LAMal sont uniformes pour l'ensemble des communes. La prime exacte dépend de votre caisse, de votre franchise et de votre modèle d'assurance.`}{' '}
              <Link href="/lamal/comparateur" className="text-brand hover:underline font-medium">
                Utilisez le comparateur pour votre code postal exact →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── Contenu principal ─────────────────────────────────────────────── */}
      <div className="container-xl py-14 space-y-16">

        {/* ── Top caisses ──────────────────────────────────────────────── */}
        <section id="top-caisses">
          <h2 className="text-2xl font-semibold text-ink border-b border-edge pb-4 mb-5">
            Caisses les moins chères, {canton.name} 2026
          </h2>
          <p className="text-[15px] text-slate mb-6 max-w-2xl">
            Classement pour un adulte de 35 ans, franchise 300 CHF, modèle standard, sans couverture accident,
            en moyenne sur {canton.nbRegions > 1 ? `les ${canton.nbRegions} régions tarifaires` : `l'ensemble`} du canton.
            Les primes varient selon votre profil exact et votre commune.
          </p>
          <div className="border border-edge rounded-[8px] overflow-hidden">
            <table className="stripe-table w-full">
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
                        <span className="w-6 h-6 rounded-full bg-[#dbeafe] text-brand text-xs font-bold inline-flex items-center justify-center">
                          {i + 1}
                        </span>
                      </td>
                      <td className="font-semibold text-ink whitespace-nowrap">{c.name}</td>
                      <td className="text-left font-bold text-brand whitespace-nowrap">{c.prime} CHF</td>
                      <td className="text-left whitespace-nowrap hidden sm:table-cell text-slate">
                        {formatChf(c.prime * 12)} CHF
                      </td>
                      <td className="text-left whitespace-nowrap hidden md:table-cell">
                        <span className="text-[#16a34a] font-semibold">
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
                  <td className="text-left whitespace-nowrap hidden md:table-cell text-[12px] text-slate/50 italic">
                    Caisse la plus chère
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <Link href="/lamal/comparateur" className="text-brand hover:underline text-[15px] font-medium">
              Comparer toutes les caisses pour votre profil exact →
            </Link>
          </div>
        </section>

        {/* ── Franchise ────────────────────────────────────────────────── */}
        <section id="franchise">
          <h2 className="text-2xl font-semibold text-ink border-b border-edge pb-4 mb-5">
            Quelle franchise choisir dans le canton de {canton.name} ?
          </h2>
          <p className="text-[15px] text-slate mb-6 max-w-2xl">
            Tableau établi pour <strong className="text-ink">{canton.caisseRef}</strong>, adulte de 35 ans,
            sans couverture accident. Le coût total inclut la prime annuelle, la franchise et la quote-part
            (10 %, maximum 700 CHF par an).
          </p>
          <div className="border border-edge rounded-[8px] overflow-hidden">
            <table className="stripe-table w-full text-[14px]">
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
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[#f0fdf4] border border-[#86efac] rounded-[8px] px-4 py-3">
              <p className="text-[13px] font-semibold text-[#166534] mb-0.5">Peu de frais médicaux</p>
              <p className="text-[13px] text-[#166534]">
                Franchise 2 500 CHF : économie de CHF {formatChf(economieFranchise)} par an sur la prime.
              </p>
            </div>
            <div className="bg-[#fff7ed] border border-[#fdba74] rounded-[8px] px-4 py-3">
              <p className="text-[13px] font-semibold text-[#9a3412] mb-0.5">Frais médicaux élevés</p>
              <p className="text-[13px] text-[#9a3412]">
                Franchise 300 CHF : reste à charge plafonné à CHF 1 000 par an.
              </p>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/lamal/franchise" className="text-brand hover:underline text-[15px] font-medium">
              Tout savoir sur le choix de la franchise →
            </Link>
          </div>
        </section>

        {/* ── Subsides ─────────────────────────────────────────────────── */}
        <section id="subsides">
          <h2 className="text-2xl font-semibold text-ink border-b border-edge pb-4 mb-5">
            Subsides LAMal, {canton.name}
          </h2>
          <div className="border border-edge rounded-[8px] overflow-hidden mb-5">
            <table className="w-full text-[14px]">
              <tbody>
                {[
                  ['Seuil de revenu déterminant', canton.subside.seuilRevenu],
                  ['Subside indicatif',            canton.subside.subsideMensuel],
                  ['Attribution',                  canton.subside.automatique
                    ? 'Automatique : aucune démarche requise'
                    : 'Sur demande auprès du canton'],
                  ...(canton.subside.delai ? [['Délai de demande', canton.subside.delai]] : []),
                ].map(([label, value], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-cloud'}>
                    <td className="px-5 py-3 text-slate w-56 shrink-0">{label}</td>
                    <td
                      className={`px-5 py-3 font-semibold ${
                        label === 'Subside indicatif' ? 'text-brand' : 'text-ink'
                      }`}
                    >
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[13px] text-slate mb-2">
            {canton.subside.automatique
              ? `Dans le ${canton.cantonDe}, les subsides sont attribués automatiquement après la taxation fiscale. Assurez-vous que votre déclaration est à jour.`
              : `Dans le ${canton.cantonDe}, une demande est nécessaire auprès de la caisse de compensation cantonale.`}
          </p>
          <p className="text-[12px] text-slate/60 mb-7">
            Données indicatives. Le montant exact est déterminé par le canton sur la base de votre dossier fiscal.
          </p>

          {/* Simulateur */}
          {subsideCanton && (
            <div className="mb-7">
              <h3 className="text-[18px] font-semibold text-ink mb-4">
                Simuler votre subside dans le {canton.cantonDe}
              </h3>
              <SubsidesCalculator fixedCanton={subsideCanton} />
            </div>
          )}

          <div className="mt-4">
            <Link href="/lamal/guide#subsides" className="text-brand hover:underline text-[15px] font-medium">
              Calculer mes subsides LAMal →
            </Link>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <div id="faq">
          <FAQ items={faqItems} />
        </div>

        {/* ── Formulaire multi-étapes ───────────────────────────────────── */}
        <NeedHelpSection />

        {/* ── Mise à jour ──────────────────────────────────────────────── */}
        <AuthorBio publishedDate="1er janvier 2026" updatedDate="21 avril 2026" />

        {/* ── Navigation cantons ───────────────────────────────────────── */}
        <section>
          <h2 className="text-xl font-semibold text-ink mb-4">Comparer avec d'autres cantons</h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {otherCantons.map((c) => (
              <Link
                key={c.slug}
                href={`/lamal/canton/${c.slug}`}
                className="text-[14px] font-medium text-brand bg-[#dbeafe] hover:bg-brand hover:text-white px-3 py-1.5 rounded-full transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </div>
          <h3 className="text-[16px] font-semibold text-ink mb-3">Pages utiles</h3>
          <div className="flex flex-col gap-2">
            {[
              { href: '/lamal/guide',             label: 'Comprendre la LAMal' },
              { href: '/lamal/changer-de-caisse', label: 'Changer de caisse maladie' },
              { href: '/lamal/comparateur',       label: 'Comparateur de primes 2026' },
              { href: '/lamal/guide#subsides',     label: 'Calculateur de subsides' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[15px] text-brand hover:underline flex items-center gap-1"
              >
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {link.label}
              </Link>
            ))}
          </div>
        </section>

      </div>
    </>
  )
}
