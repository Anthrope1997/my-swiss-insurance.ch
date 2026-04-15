import AuthorBio from '@/components/AuthorBio'
import Breadcrumb from '@/components/Breadcrumb'
import FAQ from '@/components/FAQ'
import LeadForm from '@/components/LeadForm'
import PrimeCalculator from '@/components/PrimeCalculator'
import Link from 'next/link'
import type { Canton } from '@/lib/canton-data'
import { allCantons } from '@/lib/canton-data'

const DISCLAIMER = (
  <div className="text-xs text-[#475569] bg-[#f1f5f9] border border-[#e2e8f0] rounded px-3 py-2 mb-6">
    Données indicatives à titre illustratif. Les primes exactes sont disponibles sur{' '}
    <a href="https://www.priminfo.admin.ch" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#0f2040]">
      priminfo.admin.ch
    </a>{' '}
    — comparateur officiel de l'OFSP.
  </div>
)

export default function CantonPage({ canton }: { canton: Canton }) {
  const faqItems = [
    {
      question: `Quelle est la prime LAMal moyenne dans le ${canton.cantonDe} en 2026 ?`,
      answer: `La prime LAMal moyenne dans le ${canton.cantonDe} est de ${canton.primeMoyenne} CHF/mois pour un adulte de 26 ans et plus avec une franchise de 300 CHF et un modèle standard (données indicatives OFSP 2026).`,
    },
    {
      question: `Ai-je droit à un subside LAMal dans le ${canton.cantonDe} ?`,
      answer: `Dans le ${canton.cantonDe}, les personnes dont le revenu déterminant ne dépasse pas ${canton.subside.seuilRevenu} peuvent bénéficier d'un subside mensuel moyen de ${canton.subside.subsideMensuel}. La demande se fait via ${canton.subside.demandeVia}. Ces données sont indicatives — vérifiez votre droit exact sur le site officiel cantonal.`,
    },
    {
      question: `Quelle est la caisse la moins chère dans le ${canton.cantonDe} ?`,
      answer: `Pour un adulte de 35 ans avec une franchise de 300 CHF et un modèle standard, la caisse la moins chère dans le ${canton.cantonDe} est ${canton.topCaisses[0].name} à partir de ${canton.topCaisses[0].prime} CHF/mois (données indicatives 2026). Utilisez notre calculateur pour votre profil exact.`,
    },
  ]

  const otherCantons = allCantons.filter((c) => c.slug !== canton.slug)

  return (
    <>
      {/* Page header */}
      <section className="bg-white border-b border-[#e2e8f0] pt-12 pb-10">
        <div className="container-xl">
          <Breadcrumb
            items={[
              { label: 'Accueil', href: '/' },
              { label: 'LAMal', href: '/lamal' },
              { label: `Canton de ${canton.name}` },
            ]}
          />
          <h1 className="text-5xl font-bold text-[#0f2040] leading-tight mb-4 max-w-2xl">
            Assurance maladie LAMal dans le {canton.cantonDe}.
          </h1>
          <p className="text-xl text-[#475569] max-w-2xl leading-relaxed">
            Primes 2026, top 3 des caisses, subsides cantonaux et calculateur personnalisé
            pour le {canton.cantonDe}.
          </p>
        </div>
      </section>

      <div className="container-xl py-16">
        {DISCLAIMER}
        <AuthorBio publishedDate="1er janvier 2026" updatedDate="13 avril 2026" />

        <div className="flex gap-12">
          <div className="flex-1 min-w-0 space-y-14">

            {/* Section 1 — Chiffres clés */}
            <section>
              <h2 className="text-2xl font-semibold text-[#0f2040] mb-6">
                Chiffres clés LAMal — {canton.name} 2026
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#f1f5f9] border border-[#e2e8f0] rounded-[8px] p-5 text-center">
                  <div className="text-3xl font-bold text-[#1d4ed8] mb-1">{canton.primeMoyenne} CHF</div>
                  <div className="text-[13px] font-medium text-[#0f2040]">Prime moyenne adulte</div>
                  <div className="text-[12px] text-[#475569] mt-0.5">/mois · franchise 300 CHF</div>
                </div>
                <div className="bg-[#f1f5f9] border border-[#e2e8f0] rounded-[8px] p-5 text-center">
                  <div className="text-3xl font-bold text-[#1d4ed8] mb-1">{canton.economiePossible}</div>
                  <div className="text-[13px] font-medium text-[#0f2040]">Économie possible</div>
                  <div className="text-[12px] text-[#475569] mt-0.5">adulte · modèle standard · franchise 300 CHF</div>
                </div>
                <div className="bg-[#f1f5f9] border border-[#e2e8f0] rounded-[8px] p-5 text-center">
                  <div className="text-3xl font-bold text-[#1d4ed8] mb-1">{canton.subsidesPct}</div>
                  <div className="text-[13px] font-medium text-[#0f2040]">Droit aux subsides</div>
                  <div className="text-[12px] text-[#475569] mt-0.5">des assurés du canton</div>
                </div>
              </div>
            </section>

            {/* Section 2 — Top 3 caisses */}
            <section>
              <h2 className="text-2xl font-semibold text-[#0f2040] mb-2">
                Top 3 caisses — {canton.name} 2026
              </h2>
              <p className="text-[15px] text-[#475569] mb-6">
                Profil de référence : adulte 35 ans, franchise 300 CHF, modèle standard.
              </p>
              <div className="border border-[#e2e8f0] rounded-[8px] overflow-hidden">
                <table className="stripe-table w-full">
                  <thead>
                    <tr>
                      <th>Rang</th>
                      <th>Caisse maladie</th>
                      <th className="text-right">Prime mensuelle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {canton.topCaisses.map((c, i) => (
                      <tr key={c.name}>
                        <td>
                          <span className="w-6 h-6 rounded-full bg-[#dbeafe] text-[#1d4ed8] text-xs font-bold inline-flex items-center justify-center">
                            {i + 1}
                          </span>
                        </td>
                        <td className="font-semibold text-[#0f2040]">{c.name}</td>
                        <td className="text-right font-bold text-[#1d4ed8]">{c.prime} CHF/mois</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[12px] text-[#475569]/70 mt-3">
                Données indicatives — source OFSP 2026. Utilisez le calculateur ci-dessous pour votre profil exact.
              </p>
            </section>

            {/* Section 3 — Calculateur */}
            <PrimeCalculator canton={canton} />

            {/* Section 4 — Subsides */}
            <section>
              <h2 className="text-2xl font-semibold text-[#0f2040] mb-6">
                Subsides cantonaux — {canton.name}
              </h2>
              <div className="bg-[#f1f5f9] border border-[#e2e8f0] rounded-[8px] p-6 space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-[#e2e8f0]">
                  <span className="text-[15px] text-[#475569]">Seuil de revenu déterminant</span>
                  <span className="font-semibold text-[#0f2040]">{canton.subside.seuilRevenu}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-[#e2e8f0]">
                  <span className="text-[15px] text-[#475569]">Subside mensuel moyen</span>
                  <span className="font-semibold text-[#1d4ed8]">{canton.subside.subsideMensuel}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-[15px] text-[#475569]">Comment faire la demande</span>
                  <span className="font-semibold text-[#0f2040]">{canton.subside.demandeVia}</span>
                </div>
              </div>
              <p className="text-[12px] text-[#475569]/70 mt-3">
                Données indicatives. Vérifiez votre droit exact sur le site officiel de votre canton.
              </p>
            </section>

            {/* Section 5 — FAQ */}
            <FAQ items={faqItems} />

            {/* Section 6 — Liens internes */}
            <section>
              <h2 className="text-xl font-semibold text-[#0f2040] mb-4">
                Comparer avec d'autres cantons romands
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
              <h3 className="text-[16px] font-semibold text-[#0f2040] mb-3">En savoir plus</h3>
              <div className="flex flex-col gap-2">
                {[
                  { href: '/lamal/guide', label: 'Comprendre la LAMal' },
                  { href: '/lamal/changer-de-caisse', label: 'Changer de caisse maladie' },
                  { href: '/lamal/guide#franchises', label: 'Calculer ma franchise idéale' },
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

          {/* Sticky sidebar */}
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
