import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Demande reçue — My Swiss Insurance',
  description: 'Votre demande a bien été reçue. Un expert vous contacte sous 24 heures ouvrables.',
  robots: { index: false },
}

export default function MerciPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center py-24">
        <div className="w-16 h-16 bg-[#dbeafe] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-ink mb-3">Demande bien reçue</h1>
        <p className="text-[17px] text-slate leading-relaxed mb-8">
          Un expert vous contacte sous 24 heures ouvrables.
        </p>
        <Link href="/fr" className="btn-secondary">
          Retour à l'accueil
        </Link>
      </div>
    </main>
  )
}
