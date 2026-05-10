'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import CantonCombobox, { CANTON_NAMES } from '@/components/ui/CantonCombobox'
import fr from '@/dictionaries/fr.json'

const d = fr

const STEP1_OPTIONS: { id: string; label: string; icon: React.ReactNode }[] = [
  {
    id: 'compare',
    label: d.form.objectifs.compare,
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
      </svg>
    ),
  },
  {
    id: 'switch',
    label: d.form.objectifs.switch,
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    id: 'subsides',
    label: d.form.objectifs.subsides,
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'conseil',
    label: d.form.objectifs.conseil,
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
]

const STEP3_OPTIONS = [
  { id: 'seul',     label: d.form.profils.seul     },
  { id: 'couple',   label: d.form.profils.couple   },
  { id: 'famille',  label: d.form.profils.famille  },
  { id: 'retraite', label: d.form.profils.retraite },
]

const PAYS_FRONTALIERS = [
  'France', 'Allemagne', 'Italie', 'Autriche', 'Liechtenstein',
]

const TRANCHES_AGE = [
  { value: 'enfant',       label: 'Enfant (0 à 18 ans)'        },
  { value: 'jeune_adulte', label: 'Jeune adulte (19 à 25 ans)' },
  { value: 'adulte',       label: 'Adulte (26 ans et plus)'    },
]

const STEP_LABELS = d.form.labels
const STEP_CONTEXT = d.form.contexts

interface PhoneCountry {
  code: string
  dialCode: string
  flag: string
  name: string
  placeholder: string
}

const PHONE_PRIORITY: PhoneCountry[] = [
  { code: 'CH', dialCode: '+41', flag: '🇨🇭', name: 'Suisse',         placeholder: '079 000 00 00' },
  { code: 'DE', dialCode: '+49', flag: '🇩🇪', name: 'Allemagne',      placeholder: '030 12345678'  },
  { code: 'AT', dialCode: '+43', flag: '🇦🇹', name: 'Autriche',       placeholder: '0660 1234567'  },
  { code: 'FR', dialCode: '+33', flag: '🇫🇷', name: 'France',         placeholder: '06 12 34 56 78'},
  { code: 'IT', dialCode: '+39', flag: '🇮🇹', name: 'Italie',         placeholder: '320 1234567'   },
  { code: 'LI', dialCode: '+423',flag: '🇱🇮', name: 'Liechtenstein',  placeholder: '790 12345'     },
]

const PHONE_REST: PhoneCountry[] = [
  { code: 'ZA', dialCode: '+27',  flag: '🇿🇦', name: 'Afrique du Sud',       placeholder: '' },
  { code: 'DZ', dialCode: '+213', flag: '🇩🇿', name: 'Algérie',               placeholder: '' },
  { code: 'AD', dialCode: '+376', flag: '🇦🇩', name: 'Andorre',               placeholder: '' },
  { code: 'AO', dialCode: '+244', flag: '🇦🇴', name: 'Angola',                placeholder: '' },
  { code: 'SA', dialCode: '+966', flag: '🇸🇦', name: 'Arabie saoudite',       placeholder: '' },
  { code: 'AR', dialCode: '+54',  flag: '🇦🇷', name: 'Argentine',             placeholder: '' },
  { code: 'AM', dialCode: '+374', flag: '🇦🇲', name: 'Arménie',               placeholder: '' },
  { code: 'AU', dialCode: '+61',  flag: '🇦🇺', name: 'Australie',             placeholder: '' },
  { code: 'AZ', dialCode: '+994', flag: '🇦🇿', name: 'Azerbaïdjan',           placeholder: '' },
  { code: 'BE', dialCode: '+32',  flag: '🇧🇪', name: 'Belgique',              placeholder: '' },
  { code: 'BY', dialCode: '+375', flag: '🇧🇾', name: 'Biélorussie',           placeholder: '' },
  { code: 'BO', dialCode: '+591', flag: '🇧🇴', name: 'Bolivie',               placeholder: '' },
  { code: 'BA', dialCode: '+387', flag: '🇧🇦', name: 'Bosnie-Herzégovine',    placeholder: '' },
  { code: 'BR', dialCode: '+55',  flag: '🇧🇷', name: 'Brésil',                placeholder: '' },
  { code: 'BG', dialCode: '+359', flag: '🇧🇬', name: 'Bulgarie',              placeholder: '' },
  { code: 'CA', dialCode: '+1',   flag: '🇨🇦', name: 'Canada',                placeholder: '' },
  { code: 'CL', dialCode: '+56',  flag: '🇨🇱', name: 'Chili',                 placeholder: '' },
  { code: 'CN', dialCode: '+86',  flag: '🇨🇳', name: 'Chine',                 placeholder: '' },
  { code: 'CO', dialCode: '+57',  flag: '🇨🇴', name: 'Colombie',              placeholder: '' },
  { code: 'KR', dialCode: '+82',  flag: '🇰🇷', name: 'Corée du Sud',          placeholder: '' },
  { code: 'CI', dialCode: '+225', flag: '🇨🇮', name: "Côte d'Ivoire",         placeholder: '' },
  { code: 'HR', dialCode: '+385', flag: '🇭🇷', name: 'Croatie',               placeholder: '' },
  { code: 'DK', dialCode: '+45',  flag: '🇩🇰', name: 'Danemark',              placeholder: '' },
  { code: 'EG', dialCode: '+20',  flag: '🇪🇬', name: 'Égypte',                placeholder: '' },
  { code: 'AE', dialCode: '+971', flag: '🇦🇪', name: 'Émirats arabes unis',   placeholder: '' },
  { code: 'ES', dialCode: '+34',  flag: '🇪🇸', name: 'Espagne',               placeholder: '' },
  { code: 'US', dialCode: '+1',   flag: '🇺🇸', name: 'États-Unis',            placeholder: '' },
  { code: 'FI', dialCode: '+358', flag: '🇫🇮', name: 'Finlande',              placeholder: '' },
  { code: 'GH', dialCode: '+233', flag: '🇬🇭', name: 'Ghana',                 placeholder: '' },
  { code: 'GR', dialCode: '+30',  flag: '🇬🇷', name: 'Grèce',                 placeholder: '' },
  { code: 'HU', dialCode: '+36',  flag: '🇭🇺', name: 'Hongrie',               placeholder: '' },
  { code: 'IN', dialCode: '+91',  flag: '🇮🇳', name: 'Inde',                  placeholder: '' },
  { code: 'ID', dialCode: '+62',  flag: '🇮🇩', name: 'Indonésie',             placeholder: '' },
  { code: 'IQ', dialCode: '+964', flag: '🇮🇶', name: 'Irak',                  placeholder: '' },
  { code: 'IR', dialCode: '+98',  flag: '🇮🇷', name: 'Iran',                  placeholder: '' },
  { code: 'IE', dialCode: '+353', flag: '🇮🇪', name: 'Irlande',               placeholder: '' },
  { code: 'IL', dialCode: '+972', flag: '🇮🇱', name: 'Israël',                placeholder: '' },
  { code: 'JP', dialCode: '+81',  flag: '🇯🇵', name: 'Japon',                 placeholder: '' },
  { code: 'JO', dialCode: '+962', flag: '🇯🇴', name: 'Jordanie',              placeholder: '' },
  { code: 'KZ', dialCode: '+7',   flag: '🇰🇿', name: 'Kazakhstan',            placeholder: '' },
  { code: 'KE', dialCode: '+254', flag: '🇰🇪', name: 'Kenya',                 placeholder: '' },
  { code: 'XK', dialCode: '+383', flag: '🇽🇰', name: 'Kosovo',                placeholder: '' },
  { code: 'KW', dialCode: '+965', flag: '🇰🇼', name: 'Koweït',                placeholder: '' },
  { code: 'LB', dialCode: '+961', flag: '🇱🇧', name: 'Liban',                 placeholder: '' },
  { code: 'LU', dialCode: '+352', flag: '🇱🇺', name: 'Luxembourg',            placeholder: '' },
  { code: 'MG', dialCode: '+261', flag: '🇲🇬', name: 'Madagascar',            placeholder: '' },
  { code: 'MY', dialCode: '+60',  flag: '🇲🇾', name: 'Malaisie',              placeholder: '' },
  { code: 'ML', dialCode: '+223', flag: '🇲🇱', name: 'Mali',                  placeholder: '' },
  { code: 'MA', dialCode: '+212', flag: '🇲🇦', name: 'Maroc',                 placeholder: '' },
  { code: 'MX', dialCode: '+52',  flag: '🇲🇽', name: 'Mexique',               placeholder: '' },
  { code: 'MD', dialCode: '+373', flag: '🇲🇩', name: 'Moldavie',              placeholder: '' },
  { code: 'MN', dialCode: '+976', flag: '🇲🇳', name: 'Mongolie',              placeholder: '' },
  { code: 'MZ', dialCode: '+258', flag: '🇲🇿', name: 'Mozambique',            placeholder: '' },
  { code: 'NG', dialCode: '+234', flag: '🇳🇬', name: 'Nigéria',               placeholder: '' },
  { code: 'NO', dialCode: '+47',  flag: '🇳🇴', name: 'Norvège',               placeholder: '' },
  { code: 'NZ', dialCode: '+64',  flag: '🇳🇿', name: 'Nouvelle-Zélande',      placeholder: '' },
  { code: 'PK', dialCode: '+92',  flag: '🇵🇰', name: 'Pakistan',              placeholder: '' },
  { code: 'NL', dialCode: '+31',  flag: '🇳🇱', name: 'Pays-Bas',              placeholder: '' },
  { code: 'PE', dialCode: '+51',  flag: '🇵🇪', name: 'Pérou',                 placeholder: '' },
  { code: 'PH', dialCode: '+63',  flag: '🇵🇭', name: 'Philippines',           placeholder: '' },
  { code: 'PL', dialCode: '+48',  flag: '🇵🇱', name: 'Pologne',               placeholder: '' },
  { code: 'PT', dialCode: '+351', flag: '🇵🇹', name: 'Portugal',              placeholder: '' },
  { code: 'RO', dialCode: '+40',  flag: '🇷🇴', name: 'Roumanie',              placeholder: '' },
  { code: 'GB', dialCode: '+44',  flag: '🇬🇧', name: 'Royaume-Uni',           placeholder: '' },
  { code: 'RU', dialCode: '+7',   flag: '🇷🇺', name: 'Russie',                placeholder: '' },
  { code: 'SN', dialCode: '+221', flag: '🇸🇳', name: 'Sénégal',               placeholder: '' },
  { code: 'RS', dialCode: '+381', flag: '🇷🇸', name: 'Serbie',                placeholder: '' },
  { code: 'SK', dialCode: '+421', flag: '🇸🇰', name: 'Slovaquie',             placeholder: '' },
  { code: 'SI', dialCode: '+386', flag: '🇸🇮', name: 'Slovénie',              placeholder: '' },
  { code: 'SE', dialCode: '+46',  flag: '🇸🇪', name: 'Suède',                 placeholder: '' },
  { code: 'SY', dialCode: '+963', flag: '🇸🇾', name: 'Syrie',                 placeholder: '' },
  { code: 'TW', dialCode: '+886', flag: '🇹🇼', name: 'Taïwan',                placeholder: '' },
  { code: 'TZ', dialCode: '+255', flag: '🇹🇿', name: 'Tanzanie',              placeholder: '' },
  { code: 'CZ', dialCode: '+420', flag: '🇨🇿', name: 'Tchéquie',              placeholder: '' },
  { code: 'TH', dialCode: '+66',  flag: '🇹🇭', name: 'Thaïlande',             placeholder: '' },
  { code: 'TN', dialCode: '+216', flag: '🇹🇳', name: 'Tunisie',               placeholder: '' },
  { code: 'TR', dialCode: '+90',  flag: '🇹🇷', name: 'Turquie',               placeholder: '' },
  { code: 'UA', dialCode: '+380', flag: '🇺🇦', name: 'Ukraine',               placeholder: '' },
  { code: 'UY', dialCode: '+598', flag: '🇺🇾', name: 'Uruguay',               placeholder: '' },
  { code: 'VE', dialCode: '+58',  flag: '🇻🇪', name: 'Venezuela',             placeholder: '' },
  { code: 'VN', dialCode: '+84',  flag: '🇻🇳', name: 'Viêt Nam',              placeholder: '' },
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

function normalizePhone(localNumber: string, dialCode: string): string {
  const stripped = localNumber.replace(/[\s\-\(\)\.]/g, '')
  if (!stripped) return ''
  if (stripped.startsWith('+')) return stripped
  if (stripped.startsWith('00')) return '+' + stripped.slice(2)
  if (stripped.startsWith('0')) return dialCode + stripped.slice(1)
  return dialCode + stripped
}

export default function UnifiedLeadForm({ redirectOnSuccess, fullscreen, tagline }: { redirectOnSuccess?: string; fullscreen?: boolean; tagline?: string } = {}) {
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
  const [selectedCountry, setSelectedCountry] = useState<PhoneCountry>(PHONE_PRIORITY[0])
  const [showPhoneDropdown, setShowPhoneDropdown] = useState(false)
  const [phoneError, setPhoneError] = useState('')
  const [emailError, setEmailError] = useState('')
  const phoneGroupRef = useRef<HTMLDivElement>(null)
  const phoneDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [step])

  useEffect(() => {
    function onIntent(e: Event) {
      const intent = (e as CustomEvent<string>).detail
      setForm(f => ({ ...f, intent }))
      setStep(1)
    }
    window.addEventListener('canton-form-intent', onIntent)
    return () => window.removeEventListener('canton-form-intent', onIntent)
  }, [])

  useEffect(() => {
    if (!showPhoneDropdown) return
    function handleOutsideClick(e: MouseEvent) {
      if (phoneDropdownRef.current && !phoneDropdownRef.current.contains(e.target as Node)) {
        setShowPhoneDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [showPhoneDropdown])

  function set(patch: Partial<FormData>) {
    setForm(f => ({ ...f, ...patch }))
  }

  const isValidCanton = (v: string) => CANTON_NAMES.some(n => n.toLowerCase() === v.toLowerCase())
  const step2Valid = form.residenceType === 'resident'
    ? (isValidCanton(form.canton) && form.codePostal !== '' && form.trancheAge !== '')
    : (form.pays !== '' && isValidCanton(form.cantonTravail) && form.trancheAge !== '')

  function validatePhone(): boolean {
    const local = form.telephone.trim()
    if (!local) {
      setPhoneError('Votre numéro est requis pour vous recontacter.')
      return false
    }
    const digits = local.replace(/\D/g, '')
    if (digits.length < 6 || digits.length > 15) {
      setPhoneError('Ce numéro ne semble pas valide.')
      return false
    }
    setPhoneError('')
    return true
  }

  function validatePhoneOnBlur(e: React.FocusEvent<HTMLInputElement>) {
    if (phoneGroupRef.current && phoneGroupRef.current.contains(e.relatedTarget as Node)) return
    const local = form.telephone.trim()
    if (!local) return
    const digits = local.replace(/\D/g, '')
    if (digits.length < 6 || digits.length > 15) {
      setPhoneError('Ce numéro ne semble pas valide.')
    } else {
      setPhoneError('')
    }
  }

  function validateEmail(): boolean {
    const email = form.email.trim()
    if (!email) {
      setEmailError('Votre adresse e-mail est requise pour vous recontacter.')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setEmailError('Cette adresse e-mail ne semble pas valide.')
      return false
    }
    setEmailError('')
    return true
  }

  function validateEmailOnBlur() {
    const email = form.email.trim()
    if (!email) return
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setEmailError('Cette adresse e-mail ne semble pas valide.')
    } else {
      setEmailError('')
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const phoneOk = validatePhone()
    const emailOk = validateEmail()
    if (!phoneOk || !emailOk) return

    setStatus('loading')
    setError('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: `${form.prenom} ${form.nom}`.trim(),
          email: form.email,
          telephone: normalizePhone(form.telephone, selectedCountry.dialCode),
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
        <h3 className="font-semibold text-ink text-[18px] mb-1">{d.form.succes.titre}</h3>
        <p className="text-slate text-[16px]">{d.form.succes.message}</p>
      </div>
    )
  }

  return (
    <div className={fullscreen ? 'h-full flex flex-col' : 'card-sm lead-form-card'}>
      <style>{`
        @keyframes stepIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .step-anim { animation: stepIn 0.18s ease-out; }
      `}</style>

      {/* ── Top: progress bar + step labels ── */}
      <div>
        <div className={`flex gap-1.5 ${fullscreen ? 'mb-2' : 'mb-5'}`}>
          {[1, 2, 3, 4].map(i => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= step ? 'bg-brand' : 'bg-edge'}`}
            />
          ))}
        </div>
        <p className={`text-[11px] font-semibold text-slate uppercase tracking-widest ${fullscreen ? 'mb-0' : 'mb-1'}`}>
          {d.form.etape} {step} {d.form.sur} 4
        </p>
        {tagline && step === 1 && (
          <p className="text-[14px] text-slate leading-snug mt-1 mb-2">{tagline}</p>
        )}
        <p className={`font-semibold text-ink ${fullscreen ? 'text-[16px] mb-0' : 'text-[18px] mb-1'}`}>{STEP_LABELS[step - 1]}</p>
        <p className={`text-[13px] text-slate ${fullscreen ? 'mb-3' : 'mb-6'}`}>{STEP_CONTEXT[step - 1]}</p>
      </div>

      {/* ── Middle: step content ── */}
      <div className={fullscreen ? 'flex-1 min-h-0 overflow-y-auto' : 'flex-1'}>

        {/* Step 1 — Objectif */}
        {step === 1 && (
          <div className="step-anim">
            <div className={`grid grid-cols-1 ${fullscreen ? 'gap-2' : 'gap-3'}`}>
              {STEP1_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => set({ intent: opt.id })}
                  className={[
                    `flex items-center gap-3 text-left px-4 ${fullscreen ? 'py-3' : 'py-4'} rounded-lg border-2 transition-colors duration-150 !text-[16px] font-medium`,
                    form.intent === opt.id
                      ? 'border-brand bg-blue-light2 text-brand'
                      : 'border-edge bg-white text-ink hover:border-brand hover:bg-blue-hint',
                  ].join(' ')}
                >
                  <span className={[
                    'w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-colors duration-150',
                    form.intent === opt.id ? 'bg-brand text-white' : 'bg-blue-tint text-brand',
                  ].join(' ')}>
                    {opt.icon}
                  </span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 — Situation */}
        {step === 2 && (
          <div className={`step-anim ${fullscreen ? 'space-y-2' : 'space-y-3'}`}>
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
                {d.form.residenceType.resident}
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
                {d.form.residenceType.frontalier}
              </button>
            </div>

            {form.residenceType === 'resident' && (
              <div className={`rounded-md border border-edge bg-white ${fullscreen ? 'p-3 space-y-2' : 'p-4 space-y-3'}`}>
                <div className={`grid grid-cols-2 ${fullscreen ? 'gap-2' : 'gap-3'}`}>
                  <div>
                    <label className={`block text-[13px] font-medium text-ink ${fullscreen ? 'mb-1' : 'mb-1.5'}`}>{d.form.champs.canton}</label>
                    <CantonCombobox
                      value={form.canton}
                      onChange={v => set({ canton: v })}
                      placeholder="Vaud ou VD"
                    />
                  </div>
                  <div>
                    <label className={`block text-[13px] font-medium text-ink ${fullscreen ? 'mb-1' : 'mb-1.5'}`}>{d.form.champs.npa}</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="1000"
                      value={form.codePostal}
                      onChange={e => set({ codePostal: e.target.value })}
                      className={`input-field ${fullscreen ? '!h-10' : '!h-11'}`}
                      maxLength={4}
                    />
                  </div>
                </div>
                <div>
                  <label className={`block text-[13px] font-medium text-ink ${fullscreen ? 'mb-1' : 'mb-1.5'}`}>{d.form.champs.trancheAge}</label>
                  <div className="relative">
                    <select
                      value={form.trancheAge}
                      onChange={e => set({ trancheAge: e.target.value })}
                      className={`select-field ${fullscreen ? '!h-10' : '!h-11'} pr-9`}
                    >
                      <option value="">{d.form.champs.selectPlaceholder}</option>
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

            {form.residenceType === 'frontalier' && (
              <div className={`rounded-md border border-edge bg-white ${fullscreen ? 'p-3 space-y-2' : 'p-4 space-y-3'}`}>
                <div className={`grid grid-cols-2 ${fullscreen ? 'gap-2' : 'gap-3'}`}>
                  <div>
                    <label className={`block text-[13px] font-medium text-ink ${fullscreen ? 'mb-1' : 'mb-1.5'}`}>{d.form.champs.pays}</label>
                    <input
                      type="text"
                      list="pays-frontaliers-list"
                      placeholder="France"
                      value={form.pays}
                      onChange={e => set({ pays: e.target.value })}
                      className={`input-field ${fullscreen ? '!h-10' : '!h-11'}`}
                    />
                    <datalist id="pays-frontaliers-list">
                      {PAYS_FRONTALIERS.map(p => <option key={p} value={p} />)}
                    </datalist>
                  </div>
                  <div>
                    <label className={`block text-[13px] font-medium text-ink ${fullscreen ? 'mb-1' : 'mb-1.5'}`}>{d.form.champs.cantonTravail}</label>
                    <CantonCombobox
                      value={form.cantonTravail}
                      onChange={v => set({ cantonTravail: v })}
                      placeholder="Genève ou GE"
                    />
                  </div>
                </div>
                <div>
                  <label className={`block text-[13px] font-medium text-ink ${fullscreen ? 'mb-1' : 'mb-1.5'}`}>{d.form.champs.trancheAge}</label>
                  <div className="relative">
                    <select
                      value={form.trancheAge}
                      onChange={e => set({ trancheAge: e.target.value })}
                      className={`select-field ${fullscreen ? '!h-10' : '!h-11'} pr-9`}
                    >
                      <option value="">{d.form.champs.selectPlaceholder}</option>
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
          </div>
        )}

        {/* Step 3 — Profil de ménage */}
        {step === 3 && (
          <div className="step-anim">
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${fullscreen ? 'gap-2' : 'gap-3'}`}>
              {STEP3_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => set({ situation: opt.id })}
                  className={[
                    `text-left px-4 ${fullscreen ? 'py-3' : 'py-4'} rounded-lg border-2 transition-colors duration-150 text-[16px] font-medium`,
                    form.situation === opt.id
                      ? 'border-brand bg-blue-light2 text-brand'
                      : 'border-edge bg-white text-ink hover:border-brand hover:bg-blue-hint',
                  ].join(' ')}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4 — Coordonnées */}
        {step === 4 && (
          <form id="lead-form-step4" className={`step-anim ${fullscreen ? 'space-y-2' : 'space-y-4'}`} onSubmit={handleSubmit}>
            <div className={`grid grid-cols-2 ${fullscreen ? 'gap-2' : 'gap-3'}`}>
              <div>
                <label className={`block text-[13px] font-medium text-ink ${fullscreen ? 'mb-1' : 'mb-1.5'}`}>{d.form.champs.prenom}</label>
                <input
                  type="text" required placeholder="Marie"
                  value={form.prenom}
                  onChange={e => set({ prenom: e.target.value })}
                  className={`input-field ${fullscreen ? '!h-10' : '!h-11'}`}
                />
              </div>
              <div>
                <label className={`block text-[13px] font-medium text-ink ${fullscreen ? 'mb-1' : 'mb-1.5'}`}>{d.form.champs.nom}</label>
                <input
                  type="text" required placeholder="Dupont"
                  value={form.nom}
                  onChange={e => set({ nom: e.target.value })}
                  className={`input-field ${fullscreen ? '!h-10' : '!h-11'}`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-[13px] font-medium text-ink ${fullscreen ? 'mb-1' : 'mb-1.5'}`}>{d.form.champs.telephone}</label>
              <div className="flex gap-2 items-start" ref={phoneGroupRef}>
                <div className="relative shrink-0" ref={phoneDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setShowPhoneDropdown(v => !v)}
                    className={`flex items-center gap-1.5 ${fullscreen ? 'h-10' : 'h-11'} px-3 border border-edge rounded-md bg-white hover:border-brand focus:border-brand focus:outline-none focus:ring-2 focus:ring-blue-tint transition-colors`}
                    aria-label="Sélectionner l'indicatif pays"
                  >
                    <span className="text-[18px] leading-none">{selectedCountry.flag}</span>
                    <span className="text-[13px] text-slate font-medium tabular-nums">{selectedCountry.dialCode}</span>
                    <svg className="w-3 h-3 text-slate shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showPhoneDropdown && (
                    <div className="absolute z-50 top-full left-0 mt-1 w-64 bg-white border border-edge rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {PHONE_PRIORITY.map(country => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => { setSelectedCountry(country); setShowPhoneDropdown(false) }}
                          className={[
                            'w-full flex items-center gap-2.5 px-3 py-2 text-[13px] hover:bg-cloud text-left transition-colors',
                            selectedCountry.code === country.code ? 'bg-blue-light2 text-brand' : 'text-ink',
                          ].join(' ')}
                        >
                          <span className="text-[16px] leading-none shrink-0">{country.flag}</span>
                          <span className="flex-1">{country.name}</span>
                          <span className="text-slate tabular-nums">{country.dialCode}</span>
                        </button>
                      ))}
                      <div className="border-t border-edge my-1" />
                      {PHONE_REST.map(country => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => { setSelectedCountry(country); setShowPhoneDropdown(false) }}
                          className={[
                            'w-full flex items-center gap-2.5 px-3 py-2 text-[13px] hover:bg-cloud text-left transition-colors',
                            selectedCountry.code === country.code ? 'bg-blue-light2 text-brand' : 'text-ink',
                          ].join(' ')}
                        >
                          <span className="text-[16px] leading-none shrink-0">{country.flag}</span>
                          <span className="flex-1">{country.name}</span>
                          <span className="text-slate tabular-nums">{country.dialCode}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <input
                  type="tel"
                  placeholder={selectedCountry.placeholder || 'Numéro de téléphone'}
                  value={form.telephone}
                  onChange={e => { set({ telephone: e.target.value.replace(/[^0-9\s\-\(\)\+]/g, '') }); if (phoneError) setPhoneError('') }}
                  onBlur={validatePhoneOnBlur}
                  className={`input-field ${fullscreen ? '!h-10' : '!h-11'} flex-1`}
                />
              </div>
              {phoneError && (
                <p className="text-red-600 text-[13px] mt-1">{phoneError}</p>
              )}
            </div>

            <div>
              <label className={`block text-[13px] font-medium text-ink ${fullscreen ? 'mb-1' : 'mb-1.5'}`}>{d.form.champs.email}</label>
              <input
                type="email"
                placeholder="marie@exemple.ch"
                value={form.email}
                onChange={e => { set({ email: e.target.value }); if (emailError) setEmailError('') }}
                onBlur={validateEmailOnBlur}
                className={`input-field ${fullscreen ? '!h-10' : '!h-11'}`}
              />
              {emailError && (
                <p className="text-red-600 text-[13px] mt-1">{emailError}</p>
              )}
            </div>

            {error && (
              <p className="text-red-600 text-[13px] border border-red-200 bg-red-50 rounded-md px-3 py-2">
                {error}
              </p>
            )}
          </form>
        )}

      </div>

      {/* ── Bottom: navigation buttons (position absolue en mode fullscreen) ── */}
      <div className={fullscreen ? 'shrink-0 border-t border-edge px-4 pt-3 pb-4' : 'pt-5'}>
        {step === 1 && (
          <button
            onClick={() => setStep(2)}
            disabled={!form.intent}
            className="btn-primary text-[16px] px-6 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {d.form.commencer}
          </button>
        )}

        {step === 2 && (
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="btn-secondary text-[16px] px-5 py-2.5">
              {d.form.retour}
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={!step2Valid}
              className="btn-primary text-[16px] px-6 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {d.form.continuer}
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="btn-secondary text-[16px] px-5 py-2.5">
              {d.form.retour}
            </button>
            <button
              onClick={() => setStep(4)}
              disabled={!form.situation}
              className="btn-primary text-[16px] px-6 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {d.form.continuer}
            </button>
          </div>
        )}

        {step === 4 && (
          <>
            <button
              type="submit"
              form="lead-form-step4"
              disabled={status === 'loading'}
              className={`w-full btn-primary text-[16px] disabled:opacity-60 ${fullscreen ? 'h-11' : 'h-12'}`}
            >
              {status === 'loading' ? d.form.loading : d.form.envoyer}
            </button>
            <p className={`text-slate/60 text-center leading-snug ${fullscreen ? 'text-[11px] mt-1.5' : 'text-[12px] mt-3'}`}>
              {d.form.legal}
            </p>
            <button
              type="button"
              onClick={() => setStep(3)}
              className={`block text-[13px] text-slate hover:text-ink ${fullscreen ? 'mt-1' : 'mt-2'}`}
            >
              {d.form.retour}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
