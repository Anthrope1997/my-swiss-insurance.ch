'use client'

import { useState } from 'react'

interface Props {
  subject: string   // ex: "le comparatif complet Genève 2026"
}

export default function EmailCTA({ subject }: Props) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, type: 'email_capture' }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-blue-tint rounded-[8px] px-6 py-5 text-center">
        <svg className="w-8 h-8 text-brand mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
        <p className="font-semibold text-brand">Envoyé !</p>
        <p className="text-[13px] text-brand mt-0.5">Vérifiez votre boîte mail sous 5 minutes.</p>
      </div>
    )
  }

  return (
    <div className="bg-blue-hint border border-edge rounded-[8px] px-6 py-6">
      <h2 className="text-[18px] font-semibold text-navy mb-1">
        Recevez {subject} par email
      </h2>
      <p className="text-[13px] text-slate mb-4">
        Gratuit · Sans engagement · Données OFSP 2026
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.ch"
          className="input-field flex-1"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary whitespace-nowrap disabled:opacity-60"
        >
          {status === 'loading' ? '…' : 'Recevoir →'}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-[12px] text-red-600 mt-2">Une erreur est survenue. Réessayez.</p>
      )}
      <p className="text-[11px] text-muted mt-3">
        En soumettant, vous acceptez notre{' '}
        <a href="/politique-confidentialite" className="underline hover:text-slate">
          politique de confidentialité
        </a>.
      </p>
    </div>
  )
}
