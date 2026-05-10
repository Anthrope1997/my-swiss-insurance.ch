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
    <main className="min-h-screen bg-surface">
      <div className="container-xl py-12 md:py-20">
        <div className="max-w-[600px] mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-ink mb-3">
              Obtenez votre devis personnalisé
            </h1>
            <p className="text-[17px] text-slate leading-relaxed">
              Comparez gratuitement les primes LAMal 2026. Un expert vous répond sous 24 h.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-edge p-6 md:p-8">
            <UnifiedLeadForm redirectOnSuccess="/fr/merci" />
          </div>
        </div>
      </div>
    </main>
  )
}
