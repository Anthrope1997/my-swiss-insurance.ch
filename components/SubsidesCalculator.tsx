'use client'

import { useState } from 'react'
import {
  type Canton, type Situation,
  CANTON_NAMES,
  calculerSubsideGE, calculerSubsideVS, calculerSubsideNE,
  calculerSubsideVD, calculerSubsideFR, calculerSubsideJU,
} from '@/lib/data/subsides-baremes'

interface FormState {
  canton:    Canton | null
  situation: Situation
  nbEnfants: number
  isJeune:   boolean
  revenu:    string
}

const CANTONS: Canton[] = ['GE', 'VD', 'NE', 'FR', 'JU', 'VS']

interface Props {
  fixedCanton?: Canton
}

function fmt(n: number) {
  return n.toLocaleString('fr-CH', { maximumFractionDigits: 0 })
}

function computeResult(s: FormState) {
  if (!s.canton) return null
  const rev = parseInt(s.revenu.replace(/['\s]/g, '')) || 0
  if (rev <= 0) return null

  switch (s.canton) {
    case 'GE': return calculerSubsideGE(rev, s.situation, s.nbEnfants, s.isJeune)
    case 'VS': return calculerSubsideVS(rev, s.situation, s.nbEnfants, s.isJeune)
    case 'NE': return calculerSubsideNE(rev, s.situation, s.nbEnfants, s.isJeune)
    case 'VD': return calculerSubsideVD(rev, s.situation, s.nbEnfants, s.isJeune)
    case 'FR': return calculerSubsideFR(rev, s.situation, s.nbEnfants)
    case 'JU': return calculerSubsideJU(rev, s.situation, s.nbEnfants, s.isJeune)
  }
}

const isEligibilityOnly = (c: Canton) => c === 'FR'

export default function SubsidesCalculator({ fixedCanton }: Props = {}) {
  const [form, setForm] = useState<FormState>({
    canton: fixedCanton ?? null, situation: 'seul', nbEnfants: 0,
    isJeune: false, revenu: '',
  })

  const set = (patch: Partial<FormState>) => setForm(f => ({ ...f, ...patch }))

  const result     = computeResult(form)
  const hasResult  = result !== null
  const noSubside  = hasResult && result.total === 0 && !isEligibilityOnly(form.canton!)
  const eligible   = hasResult && isEligibilityOnly(form.canton!) && result.label !== 'Non éligible'
  const ineligible = hasResult && result.label === 'Non éligible'

  return (
    <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6 space-y-6">

      {/* Canton selector */}
      {!fixedCanton && (
        <div>
          <p className="text-[11px] font-semibold text-[#94a3b8] uppercase tracking-widest mb-3">Canton</p>
          <div className="flex flex-wrap gap-2">
            {CANTONS.map(c => (
              <button
                key={c}
                onClick={() => set({ canton: c })}
                className={[
                  'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                  form.canton === c
                    ? 'bg-[#0f2040] text-white'
                    : 'bg-white border border-[#e2e8f0] text-[#475569] hover:border-[#1d4ed8] hover:text-[#1d4ed8]',
                ].join(' ')}
              >
                {c} — {CANTON_NAMES[c]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Situation */}
      <div>
        <p className="text-[11px] font-semibold text-[#94a3b8] uppercase tracking-widest mb-3">Votre situation</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[13px] text-[#475569] mb-1.5">Situation familiale</label>
            <select
              value={form.situation}
              onChange={e => set({ situation: e.target.value as Situation })}
              className="select-field text-[14px]"
            >
              <option value="seul">Personne seule</option>
              <option value="couple">Couple</option>
            </select>
          </div>
          <div>
            <label className="block text-[13px] text-[#475569] mb-1.5">Enfants à charge</label>
            <select
              value={form.nbEnfants}
              onChange={e => set({ nbEnfants: parseInt(e.target.value) })}
              className="select-field text-[14px]"
            >
              {[0, 1, 2, 3, 4].map(n => (
                <option key={n} value={n}>{n === 0 ? 'Aucun' : `${n} enfant${n > 1 ? 's' : ''}`}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[13px] text-[#475569] mb-1.5">Âge</label>
            <select
              value={form.isJeune ? 'jeune' : 'adulte'}
              onChange={e => set({ isJeune: e.target.value === 'jeune' })}
              className="select-field text-[14px]"
            >
              <option value="adulte">Adulte (26+)</option>
              <option value="jeune">Jeune adulte (19–25)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Revenu */}
      <div>
        <p className="text-[11px] font-semibold text-[#94a3b8] uppercase tracking-widest mb-3">Revenu</p>
        <label className="block text-[13px] text-[#475569] mb-1.5">
          Revenu déterminant annuel (CHF)
        </label>
        <div className="flex items-center gap-3">
          <input
            type="text"
            inputMode="numeric"
            placeholder="ex. 45 000"
            value={form.revenu}
            onChange={e => set({ revenu: e.target.value })}
            className="input-field max-w-[200px] text-[14px]"
          />
          <span className="text-[13px] text-[#94a3b8]">CHF / an</span>
        </div>
        <p className="text-[12px] text-[#94a3b8] mt-1.5">
          Revenu net fiscal — en cas de doute, utilisez votre revenu imposable.
        </p>
      </div>

      {/* Résultat */}
      {hasResult && (
        <div className={[
          'rounded-lg border p-5',
          ineligible || noSubside
            ? 'bg-white border-[#e2e8f0]'
            : 'bg-[#0f2040] border-[#0f2040]',
        ].join(' ')}>

          {ineligible || noSubside ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#f1f5f9] flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-[#94a3b8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#0f2040] text-[15px]">Revenu hors barème</p>
                <p className="text-[13px] text-[#475569] mt-0.5">Votre revenu dépasse le seuil d'éligibilité pour ce canton.</p>
              </div>
            </div>
          ) : eligible ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#dbeafe] flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-[#1d4ed8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#0f2040] text-[15px]">Vous semblez éligible</p>
                <p className="text-[13px] text-[#475569] mt-0.5">Le montant exact est calculé par le canton sur dossier.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Montant principal */}
              <div className="flex items-end justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-[12px] text-[#94a3b8] uppercase tracking-wide mb-1">
                    Estimation subside mensuel{result.label && result.label !== 'Ordinaire' ? ` — ${result.label}` : ''}
                  </p>
                  <p className="text-4xl font-bold text-white">
                    CHF {fmt(result.total)}
                    <span className="text-lg font-normal text-[#94a3b8] ml-1">/mois</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[12px] text-[#94a3b8]">par année</p>
                  <p className="text-xl font-semibold text-white">CHF {fmt(result.total * 12)}</p>
                </div>
              </div>

              {/* Détail par personne */}
              <div className={`grid gap-2 pt-3 border-t border-white/10 ${form.nbEnfants > 0 || form.situation === 'couple' ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-1'}`}>
                <div className="bg-white/10 rounded-lg px-4 py-3">
                  <p className="text-[11px] text-[#94a3b8] mb-0.5">
                    {form.situation === 'couple' ? 'Par adulte' : 'Adulte'}
                  </p>
                  <p className="text-[17px] font-bold text-white">CHF {fmt(result.adulte)}<span className="text-[12px] font-normal text-[#94a3b8]">/mois</span></p>
                </div>
                {form.nbEnfants > 0 && (
                  <div className="bg-white/10 rounded-lg px-4 py-3">
                    <p className="text-[11px] text-[#94a3b8] mb-0.5">Par enfant</p>
                    <p className="text-[17px] font-bold text-white">CHF {fmt(result.enfant)}<span className="text-[12px] font-normal text-[#94a3b8]">/mois</span></p>
                  </div>
                )}
                {form.situation === 'couple' && (
                  <div className="bg-white/10 rounded-lg px-4 py-3">
                    <p className="text-[11px] text-[#94a3b8] mb-0.5">Total ménage</p>
                    <p className="text-[17px] font-bold text-white">CHF {fmt(result.total)}<span className="text-[12px] font-normal text-[#94a3b8]">/mois</span></p>
                  </div>
                )}
              </div>

              {/* Note */}
              {result.note && (
                <p className="text-[12px] text-[#94a3b8] leading-relaxed border-t border-white/10 pt-3">
                  {result.note}
                </p>
              )}

              {/* Disclaimer */}
              <p className="text-[11px] text-[#64748b]">
                Estimation indicative 2026 — le montant réel est déterminé par le canton sur la base de votre dossier fiscal.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
