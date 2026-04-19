'use client'

import { useState } from 'react'

const cantons = [
  { code: 'AG', name: 'Argovie' },
  { code: 'AI', name: 'Appenzell Rhodes-Intérieures' },
  { code: 'AR', name: 'Appenzell Rhodes-Extérieures' },
  { code: 'BE', name: 'Berne' },
  { code: 'BL', name: 'Bâle-Campagne' },
  { code: 'BS', name: 'Bâle-Ville' },
  { code: 'FR', name: 'Fribourg' },
  { code: 'GE', name: 'Genève' },
  { code: 'GL', name: 'Glaris' },
  { code: 'GR', name: 'Grisons' },
  { code: 'JU', name: 'Jura' },
  { code: 'LU', name: 'Lucerne' },
  { code: 'NE', name: 'Neuchâtel' },
  { code: 'NW', name: 'Nidwald' },
  { code: 'OW', name: 'Obwald' },
  { code: 'SG', name: 'Saint-Gall' },
  { code: 'SH', name: 'Schaffhouse' },
  { code: 'SO', name: 'Soleure' },
  { code: 'SZ', name: 'Schwyz' },
  { code: 'TG', name: 'Thurgovie' },
  { code: 'TI', name: 'Tessin' },
  { code: 'UR', name: 'Uri' },
  { code: 'VD', name: 'Vaud' },
  { code: 'VS', name: 'Valais' },
  { code: 'ZG', name: 'Zoug' },
  { code: 'ZH', name: 'Zurich' },
]

const situations = [
  { value: 'salarie', label: 'Salarié(e)' },
  { value: 'independant', label: 'Indépendant(e)' },
  { value: 'retraite', label: 'Retraité(e)' },
  { value: 'etudiant', label: 'Étudiant(e)' },
  { value: 'expatrie', label: 'Expatrié(e)' },
]

interface FormData {
  prenom: string
  email: string
  canton: string
  situation: string
}

export default function LeadForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState<FormData>({ prenom: '', email: '', canton: '', situation: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setError('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
      setError('Une erreur est survenue. Veuillez réessayer.')
    }
  }

  if (status === 'success') {
    return (
      <div id="lead-form" className="bg-[#dbeafe] border border-[#1d4ed8]/20 rounded-xl p-8 text-center">
        <div className="w-12 h-12 bg-[#1d4ed8] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-semibold text-[#0f2040] text-lg mb-1">Demande envoyée !</h3>
        <p className="text-[#1d4ed8] text-[15px]">
          Un courtier vous contacte sous 24h pour vous accompagner.
        </p>
      </div>
    )
  }

  return (
    <div id="lead-form" className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden">

      {/* Header */}
      <div className="px-6 py-5 border-b border-[#e2e8f0]">
        <p className={`font-semibold text-[#0f2040] ${compact ? 'text-[16px]' : 'text-xl'}`}>
          Être rappelé par un courtier
        </p>
        <p className="text-[13px] text-[#475569] mt-0.5">Sans engagement · Réponse sous 24h</p>
      </div>

      <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

        {/* Prénom */}
        <div>
          <label htmlFor="prenom" className="block text-sm font-medium text-[#0f2040] mb-1">
            Prénom
          </label>
          <input
            id="prenom" type="text" required
            value={form.prenom}
            onChange={(e) => setForm({ ...form, prenom: e.target.value })}
            placeholder="Votre prénom"
            className="input-field"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#0f2040] mb-1">
            Adresse email
          </label>
          <input
            id="email" type="email" required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="votre@email.ch"
            className="input-field"
          />
        </div>

        {/* Canton */}
        <div>
          <label htmlFor="canton" className="block text-sm font-medium text-[#0f2040] mb-1">
            Canton de résidence
          </label>
          <div className="relative">
            <select
              id="canton" required
              value={form.canton}
              onChange={(e) => setForm({ ...form, canton: e.target.value })}
              className="select-field pr-9"
            >
              <option value="">Sélectionner</option>
              {cantons.map((c) => (
                <option key={c.code} value={c.code}>{c.name} ({c.code})</option>
              ))}
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569] pointer-events-none"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Situation */}
        <div>
          <label htmlFor="situation" className="block text-sm font-medium text-[#0f2040] mb-1">
            Votre situation
          </label>
          <div className="relative">
            <select
              id="situation" required
              value={form.situation}
              onChange={(e) => setForm({ ...form, situation: e.target.value })}
              className="select-field pr-9"
            >
              <option value="">Sélectionner</option>
              {situations.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#475569] pointer-events-none"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {error && (
          <p className="text-red-600 text-[13px] border border-red-300 bg-red-50 rounded-md px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] disabled:bg-[#475569] text-white
                     font-medium py-4 rounded-md transition-colors duration-150 text-base mt-1"
        >
          {status === 'loading' ? 'Envoi en cours…' : 'Être rappelé par un courtier →'}
        </button>

        <p className="text-[12px] text-[#475569]/60 text-center leading-relaxed">
          En soumettant ce formulaire, vous acceptez que vos données soient traitées conformément
          à notre <a href="/politique-confidentialite" className="underline hover:text-[#475569] transition-colors">politique de confidentialité</a> (LPD, RS&nbsp;235.1).
          Vous pouvez retirer votre consentement à tout moment en nous contactant à{' '}
          <a href="mailto:contact@my-swiss-insurance.ch" className="underline hover:text-[#475569] transition-colors">contact@my-swiss-insurance.ch</a>.
        </p>
      </form>
    </div>
  )
}
