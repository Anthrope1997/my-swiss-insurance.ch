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

const profils = [
  { value: 'enfant',        label: 'Enfant (0–18 ans)' },
  { value: 'jeune_adulte',  label: 'Jeune adulte (19–25 ans)' },
  { value: 'adulte',        label: 'Adulte (26 ans et plus)' },
  { value: 'frontalier',    label: 'Frontalier' },
]

interface FormData {
  nom: string
  email: string
  telephone: string
  canton: string
  codePostal: string
  profil: string
}

export default function LeadForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState<FormData>({
    nom: '', email: '', telephone: '', canton: '', codePostal: '', profil: '',
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
          Un expert vous contacte sous 24 heures pour vous accompagner.
        </p>
      </div>
    )
  }

  return (
    <div id="lead-form" className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden">

      {/* Header */}
      <div className="px-6 py-5 border-b border-[#e2e8f0]">
        <p className={`font-semibold text-[#0f2040] ${compact ? 'text-[16px]' : 'text-xl'}`}>
          Recevoir un conseil personnalisé
        </p>
        <p className="text-[13px] text-[#475569] mt-0.5">Sans engagement, réponse sous 24 heures</p>
      </div>

      <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

        {/* Nom */}
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-[#0f2040] mb-1">
            Nom
          </label>
          <input
            id="nom" type="text" required
            value={form.nom}
            onChange={(e) => setForm({ ...form, nom: e.target.value })}
            placeholder="Votre nom"
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

        {/* Téléphone */}
        <div>
          <label htmlFor="telephone" className="block text-sm font-medium text-[#0f2040] mb-1">
            Téléphone
          </label>
          <input
            id="telephone" type="tel" required
            value={form.telephone}
            onChange={(e) => setForm({ ...form, telephone: e.target.value })}
            placeholder="+41 79 000 00 00"
            className="input-field"
          />
        </div>

        {/* Canton + Code postal — 2 colonnes */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="canton" className="block text-sm font-medium text-[#0f2040] mb-1">
              Canton
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

          <div>
            <label htmlFor="codePostal" className="block text-sm font-medium text-[#0f2040] mb-1">
              Code postal
            </label>
            <input
              id="codePostal" type="text" required
              value={form.codePostal}
              onChange={(e) => setForm({ ...form, codePostal: e.target.value })}
              placeholder="1000"
              className="input-field"
            />
          </div>
        </div>

        {/* Profil */}
        <div>
          <label htmlFor="profil" className="block text-sm font-medium text-[#0f2040] mb-1">
            Profil
          </label>
          <div className="relative">
            <select
              id="profil" required
              value={form.profil}
              onChange={(e) => setForm({ ...form, profil: e.target.value })}
              className="select-field pr-9"
            >
              <option value="">Sélectionner</option>
              {profils.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
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
          {status === 'loading' ? 'Envoi en cours…' : 'Recevoir mon conseil personnalisé →'}
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
