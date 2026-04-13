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
      <div id="lead-form" className="bg-white border border-edge rounded-[12px] p-8 text-center">
        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-semibold text-ink text-lg mb-1">Demande envoyée !</h3>
        <p className="text-slate text-[15px]">
          Un conseiller vous contacte sous 24h avec votre comparaison personnalisée.
        </p>
      </div>
    )
  }

  return (
    <div id="lead-form" className="bg-white border border-edge rounded-[12px] overflow-hidden">
      {/* Form header */}
      <div className="px-6 py-5 border-b border-edge">
        <p className={`font-semibold text-ink ${compact ? 'text-[16px]' : 'text-[18px]'}`}>
          Comparaison gratuite
        </p>
        <p className="text-[13px] text-slate mt-0.5">Sans engagement · Réponse sous 24h</p>
      </div>

      <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

        {/* Prénom */}
        <div>
          <label htmlFor="prenom" className="block text-[13px] font-medium text-slate mb-1.5">
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
          <label htmlFor="email" className="block text-[13px] font-medium text-slate mb-1.5">
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
          <label htmlFor="canton" className="block text-[13px] font-medium text-slate mb-1.5">
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
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate pointer-events-none"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Situation */}
        <div>
          <label htmlFor="situation" className="block text-[13px] font-medium text-slate mb-1.5">
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
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate pointer-events-none"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {error && <p className="text-red-600 text-[13px]">{error}</p>}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-brand hover:bg-brand-dark disabled:bg-slate/30 text-white font-medium
                     py-3.5 rounded-md transition-colors duration-150 text-[15px] mt-1"
        >
          {status === 'loading' ? 'Envoi en cours…' : 'Recevoir ma comparaison gratuite →'}
        </button>

        <p className="text-[12px] text-slate/60 text-center">
          Vos données ne sont pas revendues · RGPD conforme
        </p>
      </form>
    </div>
  )
}
