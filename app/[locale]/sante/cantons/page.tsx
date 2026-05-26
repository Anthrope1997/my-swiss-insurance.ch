import type { Metadata } from 'next'
import KeyFact from '@/components/ui/KeyFact'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import AuthorBio from '@/components/ui/AuthorBio'
import UnifiedLeadForm from '@/components/ui/UnifiedLeadForm'

export const metadata: Metadata = {
  title: 'Primes LAMal par canton 2026 — Comparatif Suisse',
  robots: { index: false, follow: false },
  description: 'Comparez les primes LAMal dans les 26 cantons suisses. Trouvez la caisse maladie la moins chère selon votre lieu de résidence.',
  alternates: { canonical: 'https://my-swiss-insurance.ch/sante/cantons' },
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
    <>
      {/* ── 1. HERO ── */}
      <section className="bg-white border-b border-edge pt-10 pb-12">
        <div className="container-xl">
          <Breadcrumb items={[
            { label: 'Accueil', href: '/' },
            { label: 'LAMal', href: '/sante' },
            { label: 'Primes par canton' },
          ]} />
          <h1 className="text-4xl sm:text-5xl font-bold text-ink leading-tight mb-4">
            Primes LAMal par canton
          </h1>
          <p className="text-[16px] text-slate leading-relaxed">
            En Suisse, les primes de l&apos;assurance maladie de base LAMal varient selon le canton de résidence.
            Sélectionnez votre canton pour consulter les primes 2026 et trouver la caisse la moins chère.
          </p>
        </div>
      </section>

      {/* ── 2. GRILLE DES CANTONS ── */}
      <section className="bg-white py-12">
        <div className="container-xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-10">
            {cantons.map((canton) => (
              <Link
                key={canton.slug}
                href={`/sante/canton/${canton.slug}`}
                className="flex items-center gap-3 px-4 py-3 rounded-lg border border-edge bg-white hover:border-brand hover:bg-blue-tint transition-colors duration-150 group"
              >
                <span className="w-9 h-9 rounded-md bg-cloud flex items-center justify-center shrink-0 text-[11px] font-bold text-slate group-hover:bg-brand group-hover:text-white transition-colors duration-150">
                  {canton.code}
                </span>
                <span className="text-[16px] font-medium text-ink group-hover:text-brand transition-colors duration-150">
                  {canton.name}
                </span>
              </Link>
            ))}
          </div>

          <KeyFact label="Méthode de calcul">
            Les montants affichés correspondent aux primes moyennes cantonales pour un adulte de 26 ans et plus,
            avec une franchise ordinaire de 300 CHF par an et le modèle médecin de famille (centre médical ou
            télémédecine). Source : OFSP, données 2026.
          </KeyFact>
        </div>
      </section>

      {/* ── 3. FORMULAIRE ── */}
      <div className="container-xl">
        <div id="contact" className="scroll-mt-20 border-t border-edge pt-12 mt-4">
          <h2 className="text-2xl font-semibold text-ink hover:text-brand transition-colors mb-3">Besoin d&apos;aide ?</h2>
          <p className="text-[16px] text-slate mb-6 leading-relaxed">
            Un expert vous rappelle sous 24 heures pour établir avec vous une solution
            personnalisée. Gratuit, sans engagement.
          </p>
          <UnifiedLeadForm redirectOnSuccess="/fr/merci" />
        </div>
      </div>

      <div className="container-xl mt-4 pb-12">
        <AuthorBio publishedDate="1er janvier 2026" updatedDate="10 mai 2026" />
      </div>
    </>
  )
}
