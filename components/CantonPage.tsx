import AuthorBio from '@/components/AuthorBio'
import Breadcrumb from '@/components/Breadcrumb'
import FAQ from '@/components/FAQ'
import LeadForm from '@/components/LeadForm'
import Link from 'next/link'
import type { Canton } from '@/lib/canton-data'
import { allCantons } from '@/lib/canton-data'

function ordinal(n: number): string {
  return n === 1 ? '1er' : `${n}e`
}

function formatChf(n: number): string {
  return n.toLocaleString('fr-CH')
}

export default function CantonPage({ canton }: { canton: Canton }) {
  const cheapest = canton.topCaisses[0]

  // Économie franchise : différence prime annuelle f=300 vs f=2500
  const rowMin = canton.franchiseTable.find((r) => r.franchise === 300)!
  const rowMax = canton.franchiseTable.find((r) => r.franchise === 2500)!
  const economieFranchise = rowMin.cout0 - rowMax.cout0

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
        : `Dans le ${canton.cantonDe}, vous devez faire une demande de réduction de prime auprès du canton. Le droit s'ouvre si votre revenu déterminant ne dépasse pas ${canton.subside.seuilRevenu}. Montant indicatif : ${canton.subside.subsideMensuel}. Déposez votre demande chaque année, en général avant le 31 mars.`,
    },
    {
      question: `Quelle franchise choisir à ${canton.name} ?`,
      answer: `Si vous consultez rarement et êtes en bonne santé, la franchise 2500 CHF est avantageuse : vous économisez ${formatChf(economieFranchise)} CHF/an sur la prime (avec ${canton.caisseRef}). Si vous avez des frais médicaux réguliers ou prévisibles, la franchise 300 CHF limite votre reste à charge à CHF 1 000 maximum par an (franchise + quote-part).`,
    },
    {
      question: 'Peut-on changer de caisse LAMal en cours d\'année ?',
      answer: 'Non, sauf si votre caisse annonce une hausse de prime en septembre. Dans ce cas, vous avez un mois pour résilier. En dehors de ce cas, la date limite ordinaire est le 30 novembre pour un changement au 1er janvier suivant. Le délai de préavis est de 3 mois.',
    },
    {
      question: `Combien y a-t-il de régions de primes dans le ${canton.cantonDe} ?`,
      answer: canton.nbRegions === 1
        ? `Le ${canton.cantonDe} constitue une seule région de primes OFSP (${canton.regions[0].id}). Toutes les caisses affichent la même prime de référence pour l'ensemble du canton.`
        : `Le ${canton.cantonDe} est divisé en ${canton.nbRegions} régions de primes OFSP (${canton.regions.map((r) => r.id).join(', ')}). La prime varie selon la région : de ${Math.min(...canton.regions.map((r) => r.prime)).toFixed(0)} à ${Math.max(...canton.regions.map((r) => r.prime)).toFixed(0)} CHF/mois en moyenne.`,
    },
    {
      question: `Quelle est la différence de prime entre adulte et jeune adulte à ${canton.name} ?`,
      answer: `Pour un jeune adulte de 19 à 25 ans, la prime est de ${canton.primeMoyenneJA} CHF/mois contre ${canton.primeMoyenne} CHF/mois pour un adulte de 26 ans et plus (même franchise 300 CHF, même modèle standard). L'écart est de ${canton.primeMoyenne - canton.primeMoyenneJA} CHF/mois, soit ${formatChf((canton.primeMoyenne - canton.primeMoyenneJA) * 12)} CHF/an.`,
    },
  ]

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `Assurance maladie LAMal dans le ${canton.cantonDe} 2026`,
    datePublished: '2026-01-01',
    dateModified: '2026-04-01',
    author: { '@type': 'Organization', name: 'My Swiss Insurance' },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── En-tête ─────────────────────────────────────────── */}
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
          <h1 className="text-5xl font-bold text-[#0f2040] leading-tight mb-4 max-w-2xl">
            Assurance maladie à {canton.name} 2026.
          </h1>
          <p className="text-xl text-[#475569] max-w-2xl leading-relaxed">
            Primes, top 5 des caisses, tableau des franchises, subsides et FAQ
            pour le {canton.cantonDe}.
          </p>
        </div>
      </section>

      <div className="container-xl py-16">
        <AuthorBio publishedDate="1er janvier 2026" updatedDate="13 avril 2026" />

        <div className="flex gap-12">
          <div className="flex-1 min-w-0 space-y-14">

            {/* ── BLOC 1 — Paragraphe citable ─────────────────── */}
            <div className="callout">
              <p className="font-semibold text-ink mb-1">En bref — {canton.name} 2026</p>
              <p className="text-[15px] leading-relaxed">
                En 2026, la prime LAMal moyenne dans le {canton.cantonDe} est de{' '}
                <strong>{canton.primeMoyenne} CHF/mois</strong> pour un adulte avec une franchise
                de 300 CHF et le modèle standard (libre choix du médecin). Le canton se situe
                au <strong>{ordinal(canton.rang)} rang sur 26</strong> en Suisse, du moins cher au plus cher.
                En choisissant la caisse la moins chère plutôt que la plus chère dans la même région,
                il est possible d'économiser jusqu'à{' '}
                <strong>CHF {formatChf(canton.economieAn)}/an</strong> ({canton.economieMois} CHF/mois).
                Source : OFSP, données 2026.
              </p>
            </div>

            {/* ── BLOC 2 — Tableau "En bref" ──────────────────── */}
            <section>
              <h2 className="text-2xl font-semibold text-[#0f2040] mb-6">
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
                      ['Subsides automatiques', canton.subside.automatique ? 'Oui' : 'Sur demande', `seuil indicatif ${canton.subside.seuilRevenu}`],
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
                Données indicatives OFSP 2026. Profil de référence : adulte ~35 ans · franchise 300 CHF · modèle standard · sans couverture accident.
              </p>
            </section>

            {/* ── BLOC 3 — Top 5 caisses ──────────────────────── */}
            <section>
              <h2 className="text-2xl font-semibold text-[#0f2040] mb-2">
                Top 5 caisses les moins chères — {canton.name} 2026
              </h2>
              <p className="text-[15px] text-[#475569] mb-6">
                Profil de référence : adulte ~35 ans · franchise 300 CHF · modèle standard. Moyenne sur les {canton.nbRegions} région{canton.nbRegions > 1 ? 's' : ''} du canton.
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
            </section>

            {/* ── BLOC 4 — Tableau franchises ─────────────────── */}
            <section>
              <h2 className="text-2xl font-semibold text-[#0f2040] mb-2">
                Quelle franchise choisir à {canton.name} ?
              </h2>
              <p className="text-[15px] text-[#475569] mb-6">
                Tableau pour <strong>{canton.caisseRef}</strong> (caisse la moins chère du canton) ·
                adulte ~35 ans · sans couverture accident.
                Coût total = prime annuelle + franchise + quote-part (10%, max CHF 700/an).
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
                Données indicatives OFSP 2026. Les primes sont moyennées sur les régions du canton.
              </p>
            </section>

            {/* ── BLOC 5 — Régions de primes ──────────────────── */}
            <section>
              <h2 className="text-2xl font-semibold text-[#0f2040] mb-4">
                Régions de primes OFSP — {canton.name}
              </h2>
              {canton.nbRegions === 1 ? (
                <p className="text-[15px] text-[#475569] leading-relaxed">
                  Le {canton.cantonDe} constitue une seule région de primes OFSP ({canton.regions[0].id}).
                  Toutes les caisses affichent la même prime de référence pour l'ensemble du canton — il n'y a
                  pas d'avantage géographique selon le lieu de résidence.
                </p>
              ) : (
                <>
                  <p className="text-[15px] text-[#475569] mb-6">
                    Le {canton.cantonDe} est divisé en {canton.nbRegions} régions de primes.
                    La prime varie selon votre lieu de résidence.
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
            <section>
              <h2 className="text-2xl font-semibold text-[#0f2040] mb-6">
                Subsides LAMal — {canton.name}
              </h2>
              <div className="bg-[#f1f5f9] border border-[#e2e8f0] rounded-[8px] p-6 space-y-0">
                {[
                  ['Seuil de revenu déterminant', canton.subside.seuilRevenu],
                  ['Subside mensuel moyen', canton.subside.subsideMensuel],
                  ['Mode d\'attribution', canton.subside.automatique ? 'Automatique (pas de démarche requise)' : 'Sur demande auprès du canton'],
                  ['Bénéficiaires estimés', `${canton.subsidesPct} des assurés du canton`],
                ].map(([label, value], i, arr) => (
                  <div key={label} className={`flex justify-between items-center py-3 ${i < arr.length - 1 ? 'border-b border-[#e2e8f0]' : ''}`}>
                    <span className="text-[15px] text-[#475569]">{label}</span>
                    <span className={`font-semibold ${label === 'Subside mensuel moyen' ? 'text-[#1d4ed8]' : 'text-[#0f2040]'}`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-start gap-3">
                {canton.subside.automatique ? (
                  <p className="text-[13px] text-[#475569]">
                    Dans le {canton.cantonDe}, les subsides sont attribués <strong>automatiquement</strong> aux personnes
                    éligibles. Assurez-vous que votre déclaration fiscale est à jour et que votre adresse est connue du canton.
                  </p>
                ) : (
                  <p className="text-[13px] text-[#475569]">
                    Dans le {canton.cantonDe}, une <strong>demande annuelle</strong> est nécessaire.
                    Déposez votre demande chaque printemps (en général avant le 31 mars) pour bénéficier
                    des subsides de l'année en cours.
                  </p>
                )}
              </div>
              <a
                href={canton.subside.lienOfficiel}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-[14px] font-medium text-[#1d4ed8] hover:underline"
              >
                Site officiel du {canton.cantonDe}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <p className="text-[12px] text-[#475569]/70 mt-2">
                Données indicatives. Vérifiez votre droit exact sur le site officiel de votre canton.
              </p>
            </section>

            {/* ── BLOC 7 — FAQ ────────────────────────────────── */}
            <FAQ items={faqItems} />

            {/* ── BLOC 8 — CTA ────────────────────────────────── */}
            <section className="bg-[#dbeafe] border border-[#1d4ed8]/20 rounded-[8px] p-8 text-center">
              <h2 className="text-xl font-semibold text-[#0f2040] mb-2">
                Comparez toutes les caisses à {canton.name}
              </h2>
              <p className="text-[15px] text-[#475569] mb-5">
                Entrez votre code postal pour voir toutes les primes disponibles dans votre région,
                avec votre franchise et votre modèle d'assurance.
              </p>
              <Link
                href="/lamal/comparateur"
                className="btn-primary inline-block"
              >
                Ouvrir le comparateur →
              </Link>
            </section>

            {/* ── BLOC 9 — Maillage ───────────────────────────── */}
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
                  { href: '/lamal/guide',           label: 'Comprendre la LAMal' },
                  { href: '/lamal/changer-de-caisse', label: 'Changer de caisse maladie' },
                  { href: '/lamal/comparateur',       label: 'Comparateur de primes 2026' },
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

          {/* ── Sidebar sticky ──────────────────────────────────── */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <LeadForm compact />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
