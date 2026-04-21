import AuthorBio from '@/components/AuthorBio'
import Breadcrumb from '@/components/Breadcrumb'
import FAQ from '@/components/FAQ'
import LeadForm from '@/components/LeadForm'
import SubsidesCalculator from '@/components/SubsidesCalculator'
import Link from 'next/link'
import type { Canton } from '@/lib/canton-data'
import { allCantons } from '@/lib/canton-data'
import type { Canton as SubsideCanton } from '@/lib/data/subsides-baremes'

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

export default function CantonPage({ canton }: { canton: Canton }) {
  const cheapest = canton.topCaisses[0]
  const subsideCanton = SLUG_TO_SUBSIDE[canton.slug]

  const rowMin = canton.franchiseTable.find((r) => r.franchise === 300)!
  const rowMax = canton.franchiseTable.find((r) => r.franchise === 2500)!
  const economieFranchise = rowMin.cout0 - rowMax.cout0

  const tocItems = [
    { id: 'chiffres-cles',  label: 'Chiffres clés' },
    { id: 'top-caisses',    label: 'Top 5 caisses' },
    { id: 'franchise',      label: 'Franchise' },
    { id: 'regions',        label: 'Régions de primes' },
    { id: 'subsides',       label: 'Subsides' },
    ...(subsideCanton ? [{ id: 'simulateur', label: 'Simuler mon subside' }] : []),
    { id: 'faq',            label: 'FAQ' },
  ]

  const faqItems = [
    {
      question: `Quelle est la caisse la moins chère à ${canton.name} en 2026 ?`,
      answer: `La caisse la moins chère dans le ${canton.cantonDe} est ${cheapest.name}, à partir de ${cheapest.prime} CHF/mois pour un adulte avec une franchise de 300 CHF et le modèle standard (données OFSP 2026, moyenne sur les régions du canton).`,
    },
    {
      question: `Combien coûte la LAMal à ${canton.name} en 2026 ?`,
      answer: `La prime moyenne est de ${canton.primeMoyenne} CHF/mois pour un adulte avec une franchise de 300 CHF et le modèle standard. Elle varie de ${cheapest.prime} CHF/mois (${cheapest.name}) à ${canton.caissePlusChere.prime} CHF/mois (${canton.caissePlusChere.name}) selon la caisse choisie. Source : OFSP 2026.`,
    },
    {
      question: `Comment obtenir un subside LAMal à ${canton.name} ?`,
      answer: canton.subside.automatique
        ? `Dans le ${canton.cantonDe}, les subsides sont attribués automatiquement aux personnes dont le revenu déterminant ne dépasse pas ${canton.subside.seuilRevenu}. Aucune démarche particulière n'est nécessaire si vous déposez votre déclaration fiscale. Montant indicatif : ${canton.subside.subsideMensuel}.`
        : `Dans le ${canton.cantonDe}, une demande de réduction de prime doit être déposée auprès du canton. Le droit s'ouvre si votre revenu déterminant ne dépasse pas ${canton.subside.seuilRevenu}. Montant indicatif : ${canton.subside.subsideMensuel}.`,
    },
    {
      question: `Quelle franchise choisir à ${canton.name} ?`,
      answer: `Si vous consultez rarement, la franchise 2 500 CHF est avantageuse : vous économisez ${formatChf(economieFranchise)} CHF/an sur la prime (avec ${canton.caisseRef}). Si vous avez des frais médicaux réguliers, la franchise 300 CHF plafonne votre reste à charge à CHF 1 000/an maximum (franchise + quote-part 10 %).`,
    },
    {
      question: 'Peut-on changer de caisse LAMal en cours d\'année ?',
      answer: 'Non, sauf si votre caisse annonce une hausse de prime en septembre — vous avez alors un mois pour résilier. Hors de ce cas, la date limite est le 30 novembre pour un changement au 1er janvier suivant (préavis de 3 mois).',
    },
    {
      question: `Combien y a-t-il de régions de primes dans le ${canton.cantonDe} ?`,
      answer: canton.nbRegions === 1
        ? `Le ${canton.cantonDe} constitue une seule région de primes OFSP (${canton.regions[0].id}). Toutes les caisses affichent la même prime de référence pour l'ensemble du canton.`
        : `Le ${canton.cantonDe} est divisé en ${canton.nbRegions} régions de primes OFSP (${canton.regions.map((r) => r.id).join(', ')}). La prime varie de ${Math.min(...canton.regions.map((r) => r.prime)).toFixed(0)} à ${Math.max(...canton.regions.map((r) => r.prime)).toFixed(0)} CHF/mois selon votre commune.`,
    },
    {
      question: `Quelle est la différence de prime entre adulte et jeune adulte à ${canton.name} ?`,
      answer: `Pour un jeune adulte de 19 à 25 ans, la prime est de ${canton.primeMoyenneJA} CHF/mois contre ${canton.primeMoyenne} CHF/mois pour un adulte de 26 ans et plus (franchise 300 CHF, modèle standard). L'écart est de ${canton.primeMoyenne - canton.primeMoyenneJA} CHF/mois, soit ${formatChf((canton.primeMoyenne - canton.primeMoyenneJA) * 12)} CHF/an.`,
    },
  ]

  // ── Schemas ────────────────────────────────────────────────────────────────

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Assurance maladie LAMal dans le ${canton.cantonDe} 2026`,
    description: `Prime LAMal moyenne ${canton.primeMoyenne} CHF/mois dans le ${canton.cantonDe}. Caisse la moins chère : ${cheapest.name} à ${cheapest.prime} CHF/mois. Économie max CHF ${canton.economieAn}/an. Subsides disponibles jusqu'à ${canton.subside.seuilRevenu}. Données OFSP 2026.`,
    datePublished: '2026-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    author: { '@type': 'Organization', name: 'My Swiss Insurance', url: 'https://my-swiss-insurance.ch' },
    publisher: { '@type': 'Organization', name: 'My Swiss Insurance', url: 'https://my-swiss-insurance.ch' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://my-swiss-insurance.ch/lamal/canton/${canton.slug}` },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://my-swiss-insurance.ch' },
      { '@type': 'ListItem', position: 2, name: 'LAMal', item: 'https://my-swiss-insurance.ch/lamal' },
      { '@type': 'ListItem', position: 3, name: `Canton de ${canton.name}`, item: `https://my-swiss-insurance.ch/lamal/canton/${canton.slug}` },
    ],
  }

  const otherCantons = allCantons.filter((c) => c.slug !== canton.slug)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="bg-white border-b border-[#e2e8f0] pt-12 pb-10">
        <div className="container-xl">
          <Breadcrumb
            items={[
              { label: 'Accueil', href: '/' },
              { label: 'LAMal', href: '/lamal' },
              { label: `Canton de ${canton.name}` },
            ]}
          />
          <div className="badge mb-4">Données OFSP · 2026</div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#0f2040] leading-tight mb-4 max-w-2xl">
            Assurance maladie à {canton.name} 2026.
          </h1>
          <p className="text-xl text-[#475569] max-w-2xl leading-relaxed mb-6">
            Primes, top 5 des caisses, tableau des franchises, subsides et FAQ
            pour le {canton.cantonDe}.
          </p>
          {/* Quick stats chips */}
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 text-[13px] font-medium bg-[#f1f5f9] text-[#0f2040] px-3 py-1.5 rounded-full border border-[#e2e8f0]">
              <span className="text-[#1d4ed8]">#{canton.rang}</span> sur 26 cantons
            </span>
            <span className="inline-flex items-center gap-1.5 text-[13px] font-medium bg-[#f1f5f9] text-[#0f2040] px-3 py-1.5 rounded-full border border-[#e2e8f0]">
              <span className="text-[#1d4ed8]">{canton.primeMoyenne} CHF/mois</span> adulte
            </span>
            <span className="inline-flex items-center gap-1.5 text-[13px] font-medium bg-[#f1f5f9] text-[#0f2040] px-3 py-1.5 rounded-full border border-[#e2e8f0]">
              Économie max <span className="text-[#16a34a] font-semibold">CHF {canton.economieMois}/mois</span>
            </span>
            {subsideCanton && (
              <span className="inline-flex items-center gap-1.5 text-[13px] font-medium bg-[#dbeafe] text-[#1d4ed8] px-3 py-1.5 rounded-full border border-[#bfdbfe]">
                Subsides jusqu'à {canton.subside.seuilRevenu}
              </span>
            )}
          </div>
        </div>
      </section>

      <div className="container-xl py-12">
        <AuthorBio publishedDate="1er janvier 2026" updatedDate="21 avril 2026" />

        {/* Mobile jump-to links */}
        <nav className="lg:hidden flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {tocItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="flex-shrink-0 text-[12px] font-medium text-[#475569] bg-[#f1f5f9] hover:bg-[#dbeafe] hover:text-[#1d4ed8] border border-[#e2e8f0] px-3 py-1.5 rounded-full transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex gap-14">

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0 space-y-16">

            {/* ── BLOC 1 — En bref ────────────────────────────── */}
            <div className="callout" id="chiffres-cles">
              <p className="font-semibold text-ink mb-1">En bref — {canton.name} 2026</p>
              <p className="text-[15px] leading-relaxed">
                En 2026, la prime LAMal moyenne dans le {canton.cantonDe} est de{' '}
                <strong>{canton.primeMoyenne} CHF/mois</strong> pour un adulte avec une franchise
                de 300 CHF et le modèle standard. Le canton se situe
                au <strong>{ordinal(canton.rang)} rang sur 26</strong> du moins cher au plus cher.
                En choisissant la caisse la moins chère plutôt que la plus chère, il est possible
                d'économiser jusqu'à{' '}
                <strong>CHF {formatChf(canton.economieAn)}/an</strong> ({canton.economieMois} CHF/mois).
                Source : OFSP, données 2026.
              </p>
            </div>

            {/* ── BLOC 2 — Tableau chiffres clés ─────────────── */}
            <section>
              <h2 className="text-2xl font-semibold text-[#0f2040] border-b border-[#e2e8f0] pb-4 mb-6">
                Chiffres clés — {canton.name} 2026
              </h2>
              <div className="border border-[#e2e8f0] rounded-[8px] overflow-hidden">
                <table className="w-full text-[14px]">
                  <tbody>
                    {[
                      ['Prime adulte (26 ans+)', `${canton.primeMoyenne} CHF/mois`, 'franchise 300 CHF · standard'],
                      ['Prime jeune adulte (19–25 ans)', `${canton.primeMoyenneJA} CHF/mois`, 'franchise 300 CHF · standard'],
                      ['Prime enfant (0–18 ans)', `${canton.primeMoyenneEnfant} CHF/mois`, 'franchise 300 CHF · standard'],
                      ['Caisse la moins chère', `${cheapest.name} — ${cheapest.prime} CHF/mois`, 'adulte · franchise 300 CHF · standard'],
                      ['Caisse la plus chère', `${canton.caissePlusChere.name} — ${canton.caissePlusChere.prime} CHF/mois`, 'même profil'],
                      ['Économie max / an', `CHF ${formatChf(canton.economieAn)}`, `soit ${canton.economieMois} CHF/mois`],
                      ['Régions de primes OFSP', `${canton.nbRegions}`, canton.nbRegions > 1 ? canton.regions.map((r) => r.id).join(' · ') : canton.regions[0].id],
                      ['Subsides', canton.subside.automatique ? 'Attribution automatique' : 'Sur demande', `seuil ${canton.subside.seuilRevenu}`],
                      ['Rang suisse', `${ordinal(canton.rang)} / 26`, 'du moins cher au plus cher'],
                    ].map(([label, value, sub], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f8fafc]'}>
                        <td className="px-5 py-3 text-[#475569] w-52 shrink-0">{label}</td>
                        <td className="px-5 py-3 font-semibold text-[#0f2040]">{value}</td>
                        <td className="px-5 py-3 text-[#94a3b8] hidden sm:table-cell">{sub}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[12px] text-[#475569]/70 mt-2">
                Profil de référence : adulte ~35 ans · franchise 300 CHF · modèle standard · sans couverture accident. Source : OFSP 2026.
              </p>
            </section>

            {/* ── BLOC 3 — Top 5 caisses ──────────────────────── */}
            <section id="top-caisses">
              <h2 className="text-2xl font-semibold text-[#0f2040] border-b border-[#e2e8f0] pb-4 mb-2">
                Top 5 caisses les moins chères — {canton.name} 2026
              </h2>
              <p className="text-[15px] text-[#475569] mb-6">
                Adulte ~35 ans · franchise 300 CHF · modèle standard. Moyenne sur les {canton.nbRegions} région{canton.nbRegions > 1 ? 's' : ''} du canton.
              </p>
              <div className="border border-[#e2e8f0] rounded-[8px] overflow-hidden">
                <table className="stripe-table w-full">
                  <thead>
                    <tr>
                      <th>Rang</th>
                      <th>Caisse</th>
                      <th className="text-right">Prime/mois</th>
                      <th className="text-right hidden sm:table-cell">Prime/an</th>
                      <th className="text-right hidden md:table-cell">Économie vs moyenne</th>
                    </tr>
                  </thead>
                  <tbody>
                    {canton.topCaisses.map((c, i) => {
                      const econAnVsMoy = Math.round((canton.primeMoyenne - c.prime) * 12)
                      return (
                        <tr key={c.name}>
                          <td>
                            <span className="w-6 h-6 rounded-full bg-[#dbeafe] text-[#1d4ed8] text-xs font-bold inline-flex items-center justify-center">
                              {i + 1}
                            </span>
                          </td>
                          <td className="font-semibold text-[#0f2040]">{c.name}</td>
                          <td className="text-right font-bold text-[#1d4ed8]">{c.prime} CHF</td>
                          <td className="text-right hidden sm:table-cell text-[#475569]">{formatChf(c.prime * 12)} CHF</td>
                          <td className="text-right hidden md:table-cell">
                            {econAnVsMoy > 0 ? (
                              <span className="text-[#16a34a] font-semibold">−{formatChf(econAnVsMoy)} CHF/an</span>
                            ) : (
                              <span className="text-[#475569]">—</span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <p className="text-[13px] text-[#475569] mt-4 bg-[#f1f5f9] border border-[#e2e8f0] rounded px-4 py-2">
                En passant de {canton.caissePlusChere.name} ({canton.caissePlusChere.prime} CHF/mois) à {cheapest.name} ({cheapest.prime} CHF/mois),
                vous économisez <strong>CHF {formatChf((canton.caissePlusChere.prime - cheapest.prime) * 12)}/an</strong> pour les mêmes prestations de base.
              </p>
              <Link
                href="/lamal/comparateur"
                className="mt-4 flex items-center gap-2 bg-[#eff6ff] border border-[#bfdbfe] rounded-[8px] px-4 py-3 text-[14px] font-medium text-[#1d4ed8] hover:bg-[#dbeafe] transition-colors group"
              >
                <svg className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Comparer ma LAMal →
              </Link>
            </section>

            {/* ── BLOC 4 — Franchise ──────────────────────────── */}
            <section id="franchise">
              <h2 className="text-2xl font-semibold text-[#0f2040] border-b border-[#e2e8f0] pb-4 mb-2">
                Quelle franchise choisir à {canton.name} ?
              </h2>
              <p className="text-[15px] text-[#475569] mb-6">
                Tableau pour <strong>{canton.caisseRef}</strong> (caisse la moins chère) ·
                adulte ~35 ans · sans couverture accident.
                Coût total = prime annuelle + franchise + quote-part (10 %, max CHF 700/an).
              </p>
              <div className="border border-[#e2e8f0] rounded-[8px] overflow-hidden">
                <table className="stripe-table w-full text-[14px]">
                  <thead>
                    <tr>
                      <th>Franchise</th>
                      <th className="text-right">Prime/mois</th>
                      <th className="text-right hidden sm:table-cell">Prime/an</th>
                      <th className="text-right">Si 0 fr. médicaux</th>
                      <th className="text-right hidden sm:table-cell">Si 3 000 CHF</th>
                      <th className="text-right hidden md:table-cell">Si 8 000 CHF</th>
                    </tr>
                  </thead>
                  <tbody>
                    {canton.franchiseTable.map((row) => (
                      <tr key={row.franchise}>
                        <td className="font-semibold text-[#0f2040]">CHF {formatChf(row.franchise)}</td>
                        <td className="text-right text-[#1d4ed8] font-semibold">{row.primeMois.toFixed(2)}</td>
                        <td className="text-right hidden sm:table-cell text-[#475569]">{formatChf(row.primeAn)}</td>
                        <td className="text-right font-medium">{formatChf(row.cout0)}</td>
                        <td className="text-right hidden sm:table-cell text-[#475569]">{formatChf(row.cout3000)}</td>
                        <td className="text-right hidden md:table-cell text-[#475569]">{formatChf(row.cout8000)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-[#f0fdf4] border border-[#86efac] rounded-[8px] px-4 py-3">
                  <p className="text-[13px] font-semibold text-[#166534] mb-0.5">Peu de frais médicaux</p>
                  <p className="text-[13px] text-[#166534]">
                    Franchise 2 500 CHF — économie de CHF {formatChf(economieFranchise)}/an sur la prime.
                  </p>
                </div>
                <div className="bg-[#fff7ed] border border-[#fdba74] rounded-[8px] px-4 py-3">
                  <p className="text-[13px] font-semibold text-[#9a3412] mb-0.5">Frais médicaux élevés</p>
                  <p className="text-[13px] text-[#9a3412]">
                    Franchise 300 CHF — reste à charge plafonné à CHF 1 000/an (300 + 700 quote-part max).
                  </p>
                </div>
              </div>
              <p className="text-[12px] text-[#475569]/70 mt-3">
                Données indicatives OFSP 2026.
              </p>
            </section>

            {/* ── BLOC 5 — Régions de primes ──────────────────── */}
            <section id="regions">
              <h2 className="text-2xl font-semibold text-[#0f2040] border-b border-[#e2e8f0] pb-4 mb-4">
                Régions de primes OFSP — {canton.name}
              </h2>
              {canton.nbRegions === 1 ? (
                <p className="text-[15px] text-[#475569] leading-relaxed">
                  Le {canton.cantonDe} constitue une seule région de primes OFSP ({canton.regions[0].id}).
                  Toutes les caisses affichent la même prime de référence pour l'ensemble du canton — votre
                  lieu de résidence n'influe pas sur la prime.
                </p>
              ) : (
                <>
                  <p className="text-[15px] text-[#475569] mb-6">
                    Le {canton.cantonDe} est divisé en {canton.nbRegions} régions de primes.
                    La prime varie selon votre commune de résidence.
                  </p>
                  <div className="border border-[#e2e8f0] rounded-[8px] overflow-hidden">
                    <table className="stripe-table w-full">
                      <thead>
                        <tr>
                          <th>Région OFSP</th>
                          <th className="text-right">Prime moyenne adulte</th>
                          <th className="text-right hidden sm:table-cell">Écart vs canton</th>
                        </tr>
                      </thead>
                      <tbody>
                        {canton.regions.map((r) => {
                          const ecart = r.prime - canton.primeMoyenne
                          return (
                            <tr key={r.id}>
                              <td className="font-medium text-[#0f2040]">{r.label}</td>
                              <td className="text-right font-bold text-[#1d4ed8]">{r.prime.toFixed(2)} CHF/mois</td>
                              <td className="text-right hidden sm:table-cell">
                                <span className={ecart > 0 ? 'text-[#dc2626]' : 'text-[#16a34a]'}>
                                  {ecart > 0 ? '+' : ''}{ecart.toFixed(2)} CHF
                                </span>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </section>

            {/* ── BLOC 6 — Subsides ───────────────────────────── */}
            <section id="subsides">
              <h2 className="text-2xl font-semibold text-[#0f2040] border-b border-[#e2e8f0] pb-4 mb-6">
                Subsides LAMal — {canton.name}
              </h2>
              <div className="bg-[#f1f5f9] border border-[#e2e8f0] rounded-[8px] p-6">
                {[
                  ['Seuil de revenu déterminant', canton.subside.seuilRevenu],
                  ['Subside indicatif', canton.subside.subsideMensuel],
                  ['Attribution', canton.subside.automatique ? 'Automatique — pas de démarche requise' : 'Sur demande auprès du canton'],
                  ['Bénéficiaires estimés', `${canton.subsidesPct} des assurés du canton`],
                ].map(([label, value], i, arr) => (
                  <div key={label} className={`flex justify-between items-center py-3 ${i < arr.length - 1 ? 'border-b border-[#e2e8f0]' : ''}`}>
                    <span className="text-[15px] text-[#475569]">{label}</span>
                    <span className={`font-semibold text-right ml-4 ${label === 'Subside indicatif' ? 'text-[#1d4ed8]' : 'text-[#0f2040]'}`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                {canton.subside.automatique ? (
                  <p className="text-[13px] text-[#475569]">
                    Dans le {canton.cantonDe}, les subsides sont attribués <strong>automatiquement</strong> aux personnes
                    éligibles. Assurez-vous que votre déclaration fiscale est à jour et que votre adresse est connue du canton.
                  </p>
                ) : (
                  <p className="text-[13px] text-[#475569]">
                    Dans le {canton.cantonDe}, une <strong>demande</strong> est nécessaire.
                    Renseignez-vous auprès de la caisse de compensation cantonale pour connaître les délais en vigueur.
                  </p>
                )}
              </div>
              <p className="text-[12px] text-[#475569]/70 mt-2">
                Données indicatives. Le montant exact est déterminé par le canton sur la base de votre dossier fiscal.
              </p>
            </section>

            {/* ── BLOC 7 — Simulateur de subsides ────────────── */}
            {subsideCanton && (
              <section id="simulateur">
                <h2 className="text-2xl font-semibold text-[#0f2040] border-b border-[#e2e8f0] pb-4 mb-2">
                  Simuler votre subside dans le {canton.cantonDe}
                </h2>
                <p className="text-[15px] text-[#475569] mb-3">
                  Estimez votre subside LAMal 2026 en renseignant votre situation.
                </p>
                <p className="text-[13px] text-[#475569] bg-[#f1f5f9] border border-[#e2e8f0] rounded-[8px] px-4 py-3 mb-6">
                  <strong>Estimation uniquement.</strong> Ce simulateur applique les barèmes officiels 2026 au cas standard.
                  Le montant réel est déterminé individuellement par le canton sur la base de votre dossier fiscal complet.
                </p>
                <SubsidesCalculator fixedCanton={subsideCanton} />
              </section>
            )}

            {/* ── BLOC 8 — FAQ ────────────────────────────────── */}
            <div id="faq">
              <FAQ items={faqItems} />
            </div>

            {/* ── BLOC 9 — CTA courtier ───────────────────────── */}
            <LeadForm compact />

            {/* ── BLOC 10 — Maillage ──────────────────────────── */}
            <section>
              <h2 className="text-xl font-semibold text-[#0f2040] mb-4">
                Comparer avec d'autres cantons
              </h2>
              <div className="flex flex-wrap gap-2 mb-8">
                {otherCantons.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/lamal/canton/${c.slug}`}
                    className="text-[14px] font-medium text-[#1d4ed8] bg-[#dbeafe] hover:bg-[#1d4ed8] hover:text-white px-3 py-1.5 rounded-full transition-colors"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
              <h3 className="text-[16px] font-semibold text-[#0f2040] mb-3">Pages utiles</h3>
              <div className="flex flex-col gap-2">
                {[
                  { href: '/lamal/guide',             label: 'Comprendre la LAMal' },
                  { href: '/lamal/changer-de-caisse', label: 'Changer de caisse maladie' },
                  { href: '/lamal/comparateur',       label: 'Comparateur de primes 2026' },
                  { href: '/lamal/subsides',          label: 'Calculateur de subsides' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[15px] text-[#1d4ed8] hover:underline flex items-center gap-1"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {link.label}
                  </Link>
                ))}
              </div>
            </section>

          </div>

          {/* ── Sticky TOC sidebar (desktop) ── */}
          <aside className="hidden lg:block w-52 shrink-0">
            <div className="sticky top-24 space-y-6">
              <div>
                <p className="text-[11px] font-semibold text-[#94a3b8] uppercase tracking-widest mb-3">
                  Sur cette page
                </p>
                <nav className="space-y-0">
                  {tocItems.map(item => (
                    <a key={item.id} href={`#${item.id}`} className="toc-link">
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Sidebar CTA */}
              <div className="bg-[#0f2040] rounded-[10px] p-4">
                <p className="text-white text-[13px] font-semibold mb-1">
                  Comparez votre prime
                </p>
                <p className="text-[#94a3b8] text-[12px] mb-3 leading-snug">
                  Économisez jusqu'à CHF {canton.economieMois}/mois en changeant de caisse.
                </p>
                <Link
                  href="/lamal/comparateur"
                  className="block w-full text-center bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-[12px] font-semibold py-2 rounded-md transition-colors"
                >
                  Comparer →
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </>
  )
}
