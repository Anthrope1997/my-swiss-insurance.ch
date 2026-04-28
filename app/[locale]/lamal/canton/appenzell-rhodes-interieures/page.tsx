import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Assurance maladie dans le canton de Appenzell Rhodes-Intérieures — My Swiss Insurance',
  robots: { index: false },
}

export default function CantonPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-[11px] font-semibold text-slate uppercase tracking-widest mb-3">Par canton</p>
        <h1 className="text-4xl font-bold text-ink mb-4">Canton de Appenzell Rhodes-Intérieures</h1>
        <p className="text-slate text-[17px] mb-8">Cette page est en cours de rédaction. Revenez bientôt.</p>
        <Link href="/lamal" className="btn-secondary">Retour à la LAMal</Link>
      </div>
    </main>
  )
}
