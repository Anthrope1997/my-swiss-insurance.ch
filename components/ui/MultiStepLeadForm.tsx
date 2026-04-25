'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const STEP1_OPTIONS: { id: string; label: string; icon: React.ReactNode }[] = [
  {
    id: 'compare',
    label: 'Trouver la caisse la moins chère',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
      </svg>
    ),
  },
  {
    id: 'switch',
    label: 'Changer de caisse facilement',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    id: 'subsides',
    label: 'Vérifier mes subsides',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'conseil',
    label: 'Ajuster mon contrat',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
]

const STEP3_OPTIONS = [
  { id: 'seul',     label: 'Seul(e)' },
  { id: 'couple',   label: 'Couple' },
  { id: 'famille',  label: 'Famille avec enfants' },
  { id: 'retraite', label: 'Retraité(e)' },
]

const CANTONS = [
  'Argovie', 'Appenzell Rhodes-Extérieures', 'Appenzell Rhodes-Intérieures',
  'Bâle-Campagne', 'Bâle-Ville', 'Berne', 'Fribourg', 'Genève', 'Glaris',
  'Grisons', 'Jura', 'Lucerne', 'Neuchâtel', 'Nidwald', 'Obwald',
  'Saint-Gall', 'Schaffhouse', 'Schwyz', 'Soleure', 'Tessin',
  'Thurgovie', 'Uri', 'Valais', 'Vaud', 'Zoug', 'Zurich',
]

const PAYS_FRONTALIERS = [
  'France', 'Allemagne', 'Italie', 'Autriche', 'Liechtenstein',
]

const TRANCHES_AGE = [
  { value: 'enfant',       label: 'Enfant (0 à 18 ans)'        },
  { value: 'jeune_adulte', label: 'Jeune adulte (19 à 25 ans)' },
  { value: 'adulte',       label: 'Adulte (26 ans et plus)'    },
]

const STEP_LABELS = ['Votre objectif', 'Votre situation', 'Votre profil', 'Vos coordonnées']

const STEP_CONTEXT = [
  'Dites-nous ce que vous recherchez',
  'Quelques infos sur votre situation',
  'Votre profil familial',
  'Pour vous recontacter sous 24 heures',
]

interface FormData {
  intent: string
  residenceType: 'resident' | 'frontalier'
  canton: string
  codePostal: string
  pays: string
  cantonTravail: string
  trancheAge: string
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

export default function MultiStepLeadForm({ redirectOnSuccess }: { redirectOnSuccess?: string } = {}) {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>({
    intent: '',
    residenceType: 'resident',
    canton: '', codePostal: '', pays: '', cantonTravail: '', trancheAge: '',
    situation: '',
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

  const step2Valid = form.residenceType === 'resident'
    ? (form.canton !== '' && form.codePostal !== '' && form.trancheAge !== '')
    : (form.pays !== '' && form.cantonTravail !== '' && form.trancheAge !== '')

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
          ...(form.residenceType === 'resident'
            ? { codePostal: form.codePostal, canton: form.canton }
            : { pays: form.pays, cantonTravail: form.cantonTravail }
          ),
          profil: form.trancheAge,
          situation: form.situation,
          intention: form.intent,
          type: form.residenceType === 'frontalier' ? 'frontalier' : 'canton',
        }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      if (redirectOnSuccess) router.push(redirectOnSuccess)
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
        <p className="text-slate text-[15px]">Un expert vous contacte sous 24 heures ouvrables.</p>
      </div>
    )
  }

  return (
    <div className="card-sm">
      <style>{`
        @keyframes stepIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .step-anim { animation: stepIn 0.18s ease-out; }
      `}</style>

      {/* Progress bar */}
      <div className="flex gap-1.5 mb-5">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= step ? 'bg-brand' : 'bg-edge'}`}
          />
        ))}
      </div>

      {/* Step label + context */}
      <p className="text-[11px] font-semibold text-slate uppercase tracking-widest mb-1">
        Étape {step} sur 4
      </p>
      <p className="text-[18px] font-semibold text-ink mb-1">{STEP_LABELS[step - 1]}</p>
      <p className="text-[13px] text-slate mb-6">{STEP_CONTEXT[step - 1]}</p>

      {/* Step 1 — Objectif */}
      {step === 1 && (
        <div className="step-anim">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {STEP1_OPTIONS.map(opt => (
              <button
                key={opt.id}
                onClick={() => set({ intent: opt.id })}
                className={[
                  'flex items-center gap-3 text-left px-4 py-4 rounded-lg border-2 transition-colors duration-150 text-[14px] font-medium',
                  form.intent === opt.id
                    ? 'border-brand bg-[#eff6ff] text-brand'
                    : 'border-edge bg-white text-ink hover:border-brand hover:bg-[#f8fbff]',
                ].join(' ')}
              >
                <span className={[
                  'w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-colors duration-150',
                  form.intent === opt.id ? 'bg-brand text-white' : 'bg-[#dbeafe] text-brand',
                ].join(' ')}>
                  {opt.icon}
                </span>
                {opt.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep(2)}
            disabled={!form.intent}
            className="btn-primary text-[14px] px-6 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Commencer →
          </button>
        </div>
      )}

      {/* Step 2 — Situation */}
      {step === 2 && (
        <div className="step-anim space-y-3">

          {/* Segmented control */}
          <div className="flex bg-cloud rounded-lg p-1 gap-1">
            <button
              type="button"
              onClick={() => set({ residenceType: 'resident' })}
              className={[
                'flex-1 py-2 text-[13px] font-medium rounded-md transition-all duration-150',
                form.residenceType === 'resident'
                  ? 'bg-white text-brand shadow-sm'
                  : 'text-slate hover:text-ink',
              ].join(' ')}
            >
              Résident suisse
            </button>
            <button
              type="button"
              onClick={() => set({ residenceType: 'frontalier' })}
              className={[
                'flex-1 py-2 text-[13px] font-medium rounded-md transition-all duration-150',
                form.residenceType === 'frontalier'
                  ? 'bg-white text-brand shadow-sm'
                  : 'text-slate hover:text-ink',
              ].join(' ')}
            >
              Frontalier
            </button>
          </div>

          {/* Résident branch */}
          {form.residenceType === 'resident' && (
            <div className="rounded-xl border border-edge bg-[#f8fafc] p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[13px] font-medium text-ink mb-1.5">Canton</label>
                  <input
                    type="text"
                    list="cantons-residence-list"
                    placeholder="Vaud"
                    value={form.canton}
                    onChange={e => set({ canton: e.target.value })}
                    className="input-field !h-11"
                  />
                  <datalist id="cantons-residence-list">
                    {CANTONS.map(c => <option key={c} value={c} />)}
                  </datalist>
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-ink mb-1.5">NPA</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="1000"
                    value={form.codePostal}
                    onChange={e => set({ codePostal: e.target.value })}
                    className="input-field !h-11"
                    maxLength={4}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-medium text-ink mb-1.5">Tranche d'âge</label>
                <div className="relative">
                  <select
                    value={form.trancheAge}
                    onChange={e => set({ trancheAge: e.target.value })}
                    className="select-field !h-11 pr-9"
                  >
                    <option value="">Sélectionner</option>
                    {TRANCHES_AGE.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate pointer-events-none"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Frontalier branch */}
          {form.residenceType === 'frontalier' && (
            <div className="rounded-xl border border-edge bg-[#f8fafc] p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[13px] font-medium text-ink mb-1.5">Pays</label>
                  <input
                    type="text"
                    list="pays-frontaliers-list"
                    placeholder="France"
                    value={form.pays}
                    onChange={e => set({ pays: e.target.value })}
                    className="input-field !h-11"
                  />
                  <datalist id="pays-frontaliers-list">
                    {PAYS_FRONTALIERS.map(p => <option key={p} value={p} />)}
                  </datalist>
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-ink mb-1.5">Canton de travail</label>
                  <input
                    type="text"
                    list="cantons-travail-list"
                    placeholder="Genève"
                    value={form.cantonTravail}
                    onChange={e => set({ cantonTravail: e.target.value })}
                    className="input-field !h-11"
                  />
                  <datalist id="cantons-travail-list">
                    {CANTONS.map(c => <option key={c} value={c} />)}
                  </datalist>
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-medium text-ink mb-1.5">Tranche d'âge</label>
                <div className="relative">
                  <select
                    value={form.trancheAge}
                    onChange={e => set({ trancheAge: e.target.value })}
                    className="select-field !h-11 pr-9"
                  >
                    <option value="">Sélectionner</option>
                    {TRANCHES_AGE.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate pointer-events-none"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <button onClick={() => setStep(1)} className="btn-secondary text-[14px] px-5 py-2.5">
              ← Retour
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!step2Valid}
              className="btn-primary text-[14px] px-6 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continuer →
            </button>
          </div>
        </div>
      )}

      {/* Step 3 — Profil de ménage */}
      {step === 3 && (
        <div className="step-anim">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {STEP3_OPTIONS.map(opt => (
              <button
                key={opt.id}
                onClick={() => set({ situation: opt.id })}
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
          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="btn-secondary text-[14px] px-5 py-2.5">
              ← Retour
            </button>
            <button
              onClick={() => setStep(4)}
              disabled={!form.situation}
              className="btn-primary text-[14px] px-6 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Continuer →
            </button>
          </div>
        </div>
      )}

      {/* Step 4 — Coordonnées */}
      {step === 4 && (
        <form className="step-anim space-y-4" onSubmit={handleSubmit}>
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
            className="w-full btn-primary h-12 text-[15px] mt-1 disabled:opacity-60"
          >
            {status === 'loading' ? 'Envoi en cours…' : 'Envoyer ma demande →'}
          </button>
          <p className="text-[12px] text-slate/60 text-center leading-relaxed">
            Vos données sont protégées conformément à la LPD, sans engagement, réponse sous 24 heures.
          </p>
          <button type="button" onClick={() => setStep(3)} className="block text-[13px] text-slate hover:text-ink">
            ← Retour
          </button>
        </form>
      )}
    </div>
  )
}
