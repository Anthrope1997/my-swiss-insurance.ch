'use client'

import { useState } from 'react'
import type { Canton } from '@/data/lamal/cantons'

const AGE_OPTIONS = ['0-18', '19-25', '26-35', '36-50', '51-65', '65+']
const FRANCHISE_OPTIONS = ['300', '500', '1000', '1500', '2000', '2500']
const MODELE_OPTIONS = ['Standard', 'Médecin de famille', 'HMO', 'Telmed']

const AGE_COEF: Record<string, number> = {
  '0-18': 0.45, '19-25': 0.78, '26-35': 1.00,
  '36-50': 1.15, '51-65': 1.42, '65+': 1.68,
}
const FRANCHISE_COEF: Record<string, number> = {
  '300': 1.00, '500': 0.94, '1000': 0.86,
  '1500': 0.80, '2000': 0.75, '2500': 0.71,
}
const MODELE_COEF: Record<string, number> = {
  'Standard': 1.00, 'Médecin de famille': 0.88, 'HMO': 0.85, 'Telmed': 0.82,
}

interface Result { caisse: string; prime: number }

export default function PrimeCalculator({ canton }: { canton: Canton }) {
  const [age, setAge] = useState('26-35')
  const [franchise, setFranchise] = useState('300')
  const [modele, setModele] = useState('Standard')
  const [results, setResults] = useState<Result[] | null>(null)
  const [unlocked, setUnlocked] = useState(false)
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [gateStatus, setGateStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  const calculate = () => {
    const coef = AGE_COEF[age] * FRANCHISE_COEF[franchise] * MODELE_COEF[modele]
    setResults(
      canton.topCaisses.map((c) => ({ caisse: c.name, prime: Math.round(c.prime * coef) }))
    )
    setUnlocked(false)
  }

  const handleGate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prenom.trim() || !email.trim()) return
    setGateStatus('loading')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prenom: prenom.trim(),
          email: email.trim(),
          canton: canton.name,
          situation: `Calculateur · ${age} ans · franchise ${franchise} CHF · ${modele}`,
        }),
      })
      if (res.ok) { setUnlocked(true); setGateStatus('done') }
      else setGateStatus('error')
    } catch { setGateStatus('error') }
  }

  const selectClass = "w-full border border-[#e2e8f0] rounded-md px-3 py-2.5 text-[14px] text-[#0f2040] bg-white focus:outline-none focus:ring-2 focus:ring-[#1d4ed8] focus:border-transparent"

  return (
    <section id="calculateur" className="scroll-mt-24">
      <h2 className="text-2xl font-semibold text-[#0f2040] mb-2">
        Calculez votre prime personnalisée
      </h2>
      <p className="text-[15px] text-[#475569] mb-6">
        Estimez votre prime LAMal dans le {canton.cantonDe} selon votre profil exact.
      </p>

      {/* Selects grid */}
      <div className="bg-[#f1f5f9] border border-[#e2e8f0] rounded-[8px] p-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-[12px] font-semibold text-[#475569] uppercase tracking-wide mb-1.5">
              Tranche d'âge
            </label>
            <select className={selectClass} value={age} onChange={(e) => setAge(e.target.value)}>
              {AGE_OPTIONS.map((v) => (
                <option key={v} value={v}>{v} ans</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-[#475569] uppercase tracking-wide mb-1.5">
              Franchise
            </label>
            <select className={selectClass} value={franchise} onChange={(e) => setFranchise(e.target.value)}>
              {FRANCHISE_OPTIONS.map((v) => (
                <option key={v} value={v}>CHF {v}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[12px] font-semibold text-[#475569] uppercase tracking-wide mb-1.5">
              Modèle
            </label>
            <select className={selectClass} value={modele} onChange={(e) => setModele(e.target.value)}>
              {MODELE_OPTIONS.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-[13px] text-[#475569]">
            Canton : <strong className="text-[#0f2040]">{canton.name}</strong>
            <span className="ml-2 text-[#475569]/60">(pré-rempli)</span>
          </p>
          <button
            onClick={calculate}
            className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-medium px-6 py-2.5 rounded-md text-[15px] transition-colors"
          >
            Calculer ma prime →
          </button>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-3">
          {/* Result 1 — free */}
          <div className="bg-[#f0fdf4] border border-[#86efac] rounded-[8px] px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#22c55e] text-white text-xs font-bold flex items-center justify-center shrink-0">1</span>
              <span className="font-semibold text-[#0f2040] text-[16px]">{results[0].caisse}</span>
            </div>
            <span className="text-2xl font-bold text-[#16a34a]">{results[0].prime} CHF<span className="text-sm font-normal text-[#475569]">/mois</span></span>
          </div>

          {/* Results 2 & 3 — blurred */}
          {[1, 2].map((i) => (
            <div key={i} className="relative rounded-[8px] border border-[#e2e8f0] overflow-hidden">
              <div className="px-5 py-4 flex items-center justify-between blur-sm select-none pointer-events-none">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#e2e8f0] text-[#475569] text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <span className="font-semibold text-[#0f2040] text-[16px]">{results[i].caisse}</span>
                </div>
                <span className="text-2xl font-bold text-[#0f2040]">{results[i].prime} CHF<span className="text-sm font-normal text-[#475569]">/mois</span></span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-white/60">
                <svg className="w-4 h-4 text-[#475569]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-[13px] font-medium text-[#475569]">Débloquez pour voir</span>
              </div>
            </div>
          ))}

          {/* LeadGate or confirmation */}
          {!unlocked ? (
            <div className="bg-white border border-[#1d4ed8] rounded-[8px] p-6 mt-4">
              <h3 className="text-[18px] font-semibold text-[#0f2040] mb-1">
                Débloquez votre comparaison complète
              </h3>
              <p className="text-[14px] text-[#475569] mb-5">
                Top 3 complet + économie annuelle calculée · Gratuit · Sans engagement
              </p>
              <form onSubmit={handleGate} className="space-y-3">
                <input
                  type="text" placeholder="Votre prénom" required
                  value={prenom} onChange={(e) => setPrenom(e.target.value)}
                  className="w-full border border-[#e2e8f0] rounded-md px-3 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]"
                />
                <input
                  type="email" placeholder="Votre email" required
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-[#e2e8f0] rounded-md px-3 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]"
                />
                <button
                  type="submit"
                  disabled={gateStatus === 'loading'}
                  className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] disabled:bg-[#475569] text-white font-medium py-3 rounded-md text-[15px] transition-colors"
                >
                  {gateStatus === 'loading' ? 'Envoi en cours…' : 'Recevoir ma comparaison gratuite →'}
                </button>
                {gateStatus === 'error' && (
                  <p className="text-[13px] text-red-600 text-center">Une erreur est survenue. Réessayez.</p>
                )}
                <p className="text-[11px] text-[#475569]/60 text-center leading-relaxed">
                  Données traitées conformément à notre{' '}
                  <a href="/politique-confidentialite" className="underline">politique de confidentialité</a>{' '}
                  (LPD, RS 235.1). Consentement retirable à tout moment.
                </p>
              </form>
            </div>
          ) : (
            <div className="bg-[#f0fdf4] border border-[#86efac] rounded-[8px] p-4 flex items-center gap-3 mt-4">
              <svg className="w-5 h-5 text-[#16a34a] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-[14px] text-[#16a34a] font-medium">
                Votre comparaison a été envoyée à <strong>{email}</strong>. Vérifiez votre boîte mail.
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
