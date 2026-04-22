'use client'

import { useState, useEffect } from 'react'

type Intent = 'compare' | 'switch' | 'subsides' | 'conseil' | null

const STEP1_OPTIONS = [
  { id: 'compare',  label: 'Trouver la caisse la moins chère' },
  { id: 'switch',   label: 'Changer de caisse facilement' },
  { id: 'subsides', label: 'Vérifier mes subsides' },
  { id: 'conseil',  label: 'Optimiser ma franchise et mon modèle' },
]

const STEP3_OPTIONS = [
  { id: 'seul',     label: 'Seul(e)' },
  { id: 'couple',   label: 'Couple' },
  { id: 'famille',  label: 'Famille avec enfants' },
  { id: 'retraite', label: 'Retraité(e)' },
]

const STEP_LABELS = ['Votre objectif', 'Votre situation', 'Votre profil', 'Vos coordonnées']

interface FormData {
  intent: string
  codePostal: string
  profil: string
  situation: string
  prenom: string
  nom: string
  telephone: string
  email: string
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  )
}

export default function MultiStepLeadForm() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>({
    intent: '', codePostal: '', profil: '', situation: '',
    prenom: '', nom: '', telephone: '', email: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    function onIntent(e: Event) {
      const intent = (e as CustomEvent<string>).detail
      setForm(f => ({ ...f, intent }))
      setStep(1)
    }
    window.addEventListener('canton-form-intent', onIntent)
    return () => window.removeEventListener('canton-form-intent', onIntent)
  }, [])

  function set(patch: Partial<FormData>) {
    setForm(f => ({ ...f, ...patch }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setError('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: `${form.prenom} ${form.nom}`.trim(),
          email: form.email,
          telephone: form.telephone,
          codePostal: form.codePostal,
          profil: form.profil,
          situation: form.situation,
          intention: form.intent,
          type: 'canton',
        }),
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
      <div className="card-sm text-center py-10">
        <div className="w-12 h-12 bg-brand rounded-full flex items-center justify-center mx-auto mb-4 text-white">
          <CheckIcon />
        </div>
        <h3 className="font-semibold text-ink text-[18px] mb-1">Demande envoyée</h3>
        <p className="text-slate text-[15px]">Un courtier vous contacte sous 24 heures ouvrables.</p>
      </div>
    )
  }

  return (
    <div className="card-sm">
      {/* Progress bar */}
      <div className="flex gap-1.5 mb-5">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= step ? 'bg-brand' : 'bg-edge'}`}
          />
        ))}
      </div>

      {/* Step label */}
      <p className="text-[11px] font-semibold text-slate uppercase tracking-widest mb-1">
        Étape {step} sur 4
      </p>
      <p className="text-[18px] font-semibold text-ink mb-6">{STEP_LABELS[step - 1]}</p>

      {/* Step 1 — Objectif */}
      {step === 1 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {STEP1_OPTIONS.map(opt => (
            <button
              key={opt.id}
              onClick={() => { set({ intent: opt.id }); setStep(2) }}
              className={[
                'text-left px-4 py-4 rounded-lg border-2 transition-colors duration-150 text-[14px] font-medium',
                form.intent === opt.id
                  ? 'border-brand bg-[#eff6ff] text-brand'
                  : 'border-edge bg-white text-ink hover:border-brand hover:bg-[#f8fbff]',
              ].join(' ')}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {/* Step 2 — Situation */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="block text-[13px] font-medium text-ink mb-1.5">Code postal (NPA)</label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="1000"
              value={form.codePostal}
              onChange={e => set({ codePostal: e.target.value })}
              className="input-field max-w-[160px]"
              maxLength={4}
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-ink mb-1.5">Profil</label>
            <select
              value={form.profil}
              onChange={e => set({ profil: e.target.value })}
              className="select-field max-w-xs"
            >
              <option value="">Sélectionner</option>
              <option value="adulte">Adulte (26 ans et plus)</option>
              <option value="jeune_adulte">Jeune adulte (19 à 25 ans)</option>
              <option value="enfant">Enfant (0 à 18 ans)</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setStep(1)} className="btn-secondary text-[14px] px-5 py-2.5">
              ← Retour
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!form.codePostal || !form.profil}
              className="btn-primary text-[14px] px-6 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continuer →
            </button>
          </div>
        </div>
      )}

      {/* Step 3 — Profil de ménage */}
      {step === 3 && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {STEP3_OPTIONS.map(opt => (
              <button
                key={opt.id}
                onClick={() => { set({ situation: opt.id }); setStep(4) }}
                className={[
                  'text-left px-4 py-4 rounded-lg border-2 transition-colors duration-150 text-[14px] font-medium',
                  form.situation === opt.id
                    ? 'border-brand bg-[#eff6ff] text-brand'
                    : 'border-edge bg-white text-ink hover:border-brand hover:bg-[#f8fbff]',
                ].join(' ')}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(2)} className="btn-secondary text-[14px] px-5 py-2.5">
            ← Retour
          </button>
        </div>
      )}

      {/* Step 4 — Coordonnées */}
      {step === 4 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[13px] font-medium text-ink mb-1.5">Prénom</label>
              <input
                type="text" required placeholder="Marie"
                value={form.prenom}
                onChange={e => set({ prenom: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-ink mb-1.5">Nom</label>
              <input
                type="text" required placeholder="Dupont"
                value={form.nom}
                onChange={e => set({ nom: e.target.value })}
                className="input-field"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[13px] font-medium text-ink mb-1.5">Téléphone</label>
              <input
                type="tel" required placeholder="+41 79 000 00 00"
                value={form.telephone}
                onChange={e => set({ telephone: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-ink mb-1.5">Adresse e-mail</label>
              <input
                type="email" required placeholder="marie@exemple.ch"
                value={form.email}
                onChange={e => set({ email: e.target.value })}
                className="input-field"
              />
            </div>
          </div>
          {error && (
            <p className="text-red-600 text-[13px] border border-red-200 bg-red-50 rounded-md px-3 py-2">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full btn-primary py-4 text-[15px] mt-1 disabled:opacity-60"
          >
            {status === 'loading' ? 'Envoi en cours…' : 'Recevoir mon conseil gratuit →'}
          </button>
          <p className="text-[12px] text-slate/60 text-center leading-relaxed">
            Vos données sont protégées conformément à la LPD · Sans engagement · Réponse sous 24 heures
          </p>
          <button type="button" onClick={() => setStep(3)} className="block text-[13px] text-slate hover:text-ink">
            ← Retour
          </button>
        </form>
      )}
    </div>
  )
}
