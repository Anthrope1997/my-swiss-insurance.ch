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
      <div className="px-4 py-8 max-w-[560px] mx-auto">
        <UnifiedLeadForm
          redirectOnSuccess="/fr/merci"
          tagline="Un conseiller spécialisé vous présente les offres les plus avantageuses sous 24 heures. C'est gratuit et sans engagement."
        />
      </div>
    </main>
  )
}
