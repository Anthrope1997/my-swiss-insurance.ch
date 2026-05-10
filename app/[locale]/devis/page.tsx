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
    <main className="min-h-screen bg-white">
      <div className="px-4 py-10">
        <p className="text-[16px] text-slate leading-relaxed text-center mb-7">
          Un conseiller spécialisé vous présente les offres les plus avantageuses sous 24 heures. C&apos;est gratuit et sans engagement.
        </p>
        <UnifiedLeadForm redirectOnSuccess="/fr/merci" />
      </div>
    </main>
  )
}
