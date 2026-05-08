import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'

export const metadata: Metadata = {
  title: 'Primes LAMal par canton 2026 — Comparatif Suisse',
  description: 'Comparez les primes LAMal dans les 26 cantons suisses. Trouvez la caisse maladie la moins chère selon votre lieu de résidence.',
}

const cantons = [
  { slug: 'zurich',                       name: 'Zurich',                          code: 'ZH' },
  { slug: 'berne',                         name: 'Berne',                           code: 'BE' },
  { slug: 'lucerne',                       name: 'Lucerne',                         code: 'LU' },
  { slug: 'uri',                           name: 'Uri',                             code: 'UR' },
  { slug: 'schwyz',                        name: 'Schwyz',                          code: 'SZ' },
  { slug: 'obwald',                        name: 'Obwald',                          code: 'OW' },
  { slug: 'nidwald',                       name: 'Nidwald',                         code: 'NW' },
  { slug: 'glaris',                        name: 'Glaris',                          code: 'GL' },
  { slug: 'zoug',                          name: 'Zoug',                            code: 'ZG' },
  { slug: 'fribourg',                      name: 'Fribourg',                        code: 'FR' },
  { slug: 'soleure',                       name: 'Soleure',                         code: 'SO' },
  { slug: 'bale-ville',                    name: 'Bâle-Ville',                      code: 'BS' },
  { slug: 'bale-campagne',                 name: 'Bâle-Campagne',                   code: 'BL' },
  { slug: 'schaffhouse',                   name: 'Schaffhouse',                     code: 'SH' },
  { slug: 'appenzell-rhodes-exterieures',  name: 'Appenzell Rhodes-Extérieures',    code: 'AR' },
  { slug: 'appenzell-rhodes-interieures',  name: 'Appenzell Rhodes-Intérieures',    code: 'AI' },
  { slug: 'saint-gall',                    name: 'Saint-Gall',                      code: 'SG' },
  { slug: 'grisons',                       name: 'Grisons',                         code: 'GR' },
  { slug: 'argovie',                       name: 'Argovie',                         code: 'AG' },
  { slug: 'thurgovie',                     name: 'Thurgovie',                       code: 'TG' },
  { slug: 'tessin',                        name: 'Tessin',                          code: 'TI' },
  { slug: 'vaud',                          name: 'Vaud',                            code: 'VD' },
  { slug: 'valais',                        name: 'Valais',                          code: 'VS' },
  { slug: 'neuchatel',                     name: 'Neuchâtel',                       code: 'NE' },
  { slug: 'geneve',                        name: 'Genève',                          code: 'GE' },
  { slug: 'jura',                          name: 'Jura',                            code: 'JU' },
]

export default function CantonHubPage() {
  return (
    <div className="container-xl py-[3.75rem]">
      <Breadcrumb
        items={[
          { label: 'Accueil', href: '/' },
          { label: 'LAMal', href: '/lamal' },
          { label: 'Primes par canton' },
        ]}
        className="mb-8"
      />

      <div className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-ink leading-tight mb-4">Primes LAMal par canton</h1>
        <p className="text-slate text-[17px] leading-relaxed">
          En Suisse, les primes de l&apos;assurance maladie de base LAMal varient selon le canton de résidence.
          Sélectionnez votre canton pour consulter les primes 2026 et trouver la caisse la moins chère.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-12">
        {cantons.map((canton) => (
          <Link
            key={canton.slug}
            href={`/lamal/canton/${canton.slug}`}
            className="flex items-center gap-3 px-4 py-3 rounded-lg border border-edge bg-white hover:border-brand hover:bg-[#f8fbff] transition-colors duration-150 group"
          >
            <span className="w-9 h-9 rounded-md bg-cloud flex items-center justify-center shrink-0 text-[11px] font-bold text-slate group-hover:bg-[#dbeafe] group-hover:text-brand transition-colors duration-150">
              {canton.code}
            </span>
            <span className="text-[14px] font-medium text-ink group-hover:text-brand transition-colors duration-150">
              {canton.name}
            </span>
          </Link>
        ))}
      </div>

      <div className="callout flex gap-3">
        <svg className="text-[#378ADD] shrink-0 mt-0.5" width="20" height="20"
             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
             strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
          <line x1="9.5" y1="18" x2="14.5" y2="18" />
          <line x1="10" y1="21" x2="14" y2="21" />
        </svg>
        <p className="text-[14px] text-slate leading-relaxed">
          <strong className="text-ink">Comment sont calculées les primes ?</strong> Les montants
          affichés correspondent aux primes moyennes cantonales pour un adulte de 26 ans et plus,
          avec une franchise ordinaire de 300 CHF par an et le modèle médecin de famille (HMO ou
          télémédecine). Source : OFSP, données 2026.
        </p>
      </div>
    </div>
  )
}
