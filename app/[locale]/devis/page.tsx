import type { Metadata } from 'next'
import UnifiedLeadForm from '@/components/ui/UnifiedLeadForm'

export const metadata: Metadata = {
  title: 'Obtenir un devis LAMal — My Swiss Insurance',
  description:
    'Comparez gratuitement les primes LAMal 2026. Remplissez le formulaire et un expert vous répond sous 24 h.',
  robots: { index: false },
}

export default function DevisPage() {
  return (
    <main className="h-[calc(100dvh-64px)] flex flex-col overflow-hidden bg-white">
      <div className="shrink-0 px-4 pt-5 pb-3">
        <p className="text-[14px] text-slate leading-snug text-center">
          Un conseiller spécialisé vous présente les offres les plus avantageuses sous 24 heures.
          C&apos;est gratuit et sans engagement.
        </p>
      </div>
      <div className="flex-1 min-h-0 relative px-4">
        <UnifiedLeadForm redirectOnSuccess="/fr/merci" fullscreen />
      </div>
    </main>
  )
}
