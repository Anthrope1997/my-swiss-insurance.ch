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
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-bold text-ink mb-2">
            Obtenez votre devis personnalisé
          </h1>
          <p className="text-[16px] text-slate leading-relaxed">
            Comparez gratuitement les primes LAMal 2026.<br />Un expert vous répond sous 24 h.
          </p>
        </div>
        <UnifiedLeadForm redirectOnSuccess="/fr/merci" />
      </div>
    </main>
  )
}
