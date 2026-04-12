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
  const [form, setForm] = useState<FormData>({
    prenom: '',
    email: '',
    canton: '',
    situation: '',
  })
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

      if (!res.ok) throw new Error('Erreur serveur')
      setStatus('success')
    } catch {
      setStatus('error')
      setError('Une erreur est survenue. Veuillez réessayer.')
    }
  }

  if (status === 'success') {
    return (
      <div id="lead-form" className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <svg className="w-12 h-12 text-green-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="font-bold text-green-800 text-lg mb-1">Demande envoyée !</h3>
        <p className="text-green-700 text-sm">
          Un conseiller vous contactera sous 24h avec votre comparaison personnalisée.
        </p>
      </div>
    )
  }

  return (
    <div id="lead-form" className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-primary px-5 py-4">
        <h2 className={`text-white font-bold ${compact ? 'text-base' : 'text-lg'}`}>
          Comparez votre LAMal gratuitement
        </h2>
        <p className="text-blue-100 text-xs mt-1">Sans engagement · Réponse sous 24h</p>
      </div>

      <form onSubmit={handleSubmit} className="p-5 space-y-3">
        {/* Prénom */}
        <div>
          <label htmlFor="prenom" className="block text-xs font-semibold text-gray-600 mb-1">
            Prénom
          </label>
          <input
            id="prenom"
            type="text"
            required
            value={form.prenom}
            onChange={(e) => setForm({ ...form, prenom: e.target.value })}
            placeholder="Votre prénom"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-gray-600 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="votre@email.ch"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Canton */}
        <div>
          <label htmlFor="canton" className="block text-xs font-semibold text-gray-600 mb-1">
            Canton
          </label>
          <select
            id="canton"
            required
            value={form.canton}
            onChange={(e) => setForm({ ...form, canton: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
          >
            <option value="">Sélectionner votre canton</option>
            {cantons.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name} ({c.code})
              </option>
            ))}
          </select>
        </div>

        {/* Situation */}
        <div>
          <label htmlFor="situation" className="block text-xs font-semibold text-gray-600 mb-1">
            Votre situation
          </label>
          <select
            id="situation"
            required
            value={form.situation}
            onChange={(e) => setForm({ ...form, situation: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
          >
            <option value="">Votre situation</option>
            {situations.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p className="text-red-600 text-xs">{error}</p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-sm"
        >
          {status === 'loading' ? 'Envoi en cours…' : 'Recevoir ma comparaison gratuite →'}
        </button>

        <p className="text-xs text-gray-400 text-center">
          Vos données sont protégées · Pas de spam
        </p>
      </form>
    </div>
  )
}
