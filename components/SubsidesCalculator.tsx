'use client'

import { useState } from 'react'
import {
  type Canton, type Situation,
  CANTON_NAMES,
  calculerSubsideGE, calculerSubsideVS, calculerSubsideNE,
  calculerSubsideVD, calculerSubsideFR, calculerSubsideJU,
} from '@/lib/data/subsides-baremes'

// ─── Types ───────────────────────────────────────────────────────────────────

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

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

// ─── Component ───────────────────────────────────────────────────────────────

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
    <div className="space-y-8">

      {/* ── Canton selector (hidden when fixedCanton is provided) ── */}
      {!fixedCanton && (
        <div>
          <label className="block text-sm font-semibold text-ink mb-3">Canton</label>
          <div className="flex flex-wrap gap-2">
            {CANTONS.map(c => (
              <button
                key={c}
                onClick={() => set({ canton: c })}
                className={[
                  'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                  form.canton === c
                    ? 'bg-brand text-white'
                    : 'border border-edge text-slate hover:border-brand hover:text-brand',
                ].join(' ')}
              >
                {c} — {CANTON_NAMES[c]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Situation ── */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <div>
          <label className="block text-sm font-semibold text-ink mb-2">Situation</label>
          <select
            value={form.situation}
            onChange={e => set({ situation: e.target.value as Situation })}
            className="w-full border border-edge rounded-md px-3 py-2 text-sm text-ink bg-white focus:outline-none focus:ring-2 focus:ring-brand"
          >
            <option value="seul">Personne seule</option>
            <option value="couple">Couple</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink mb-2">Enfants à charge</label>
          <select
            value={form.nbEnfants}
            onChange={e => set({ nbEnfants: parseInt(e.target.value) })}
            className="w-full border border-edge rounded-md px-3 py-2 text-sm text-ink bg-white focus:outline-none focus:ring-2 focus:ring-brand"
          >
            {[0, 1, 2, 3, 4].map(n => (
              <option key={n} value={n}>{n === 0 ? 'Aucun' : `${n} enfant${n > 1 ? 's' : ''}`}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink mb-2">Âge adulte(s)</label>
          <select
            value={form.isJeune ? 'jeune' : 'adulte'}
            onChange={e => set({ isJeune: e.target.value === 'jeune' })}
            className="w-full border border-edge rounded-md px-3 py-2 text-sm text-ink bg-white focus:outline-none focus:ring-2 focus:ring-brand"
          >
            <option value="adulte">Adulte (26 ans et plus)</option>
            <option value="jeune">Jeune adulte (19–25 ans)</option>
          </select>
        </div>

      </div>

      {/* ── Revenu ── */}
      <div>
        <label className="block text-sm font-semibold text-ink mb-1">
          Revenu déterminant annuel (CHF)
        </label>
        <p className="text-xs text-slate mb-2">
          Revenu net fiscal du ménage. En cas de doute, utilisez votre revenu imposable de la dernière déclaration.
        </p>
        <input
          type="text"
          inputMode="numeric"
          placeholder="ex. 45 000"
          value={form.revenu}
          onChange={e => set({ revenu: e.target.value })}
          className="w-full max-w-xs border border-edge rounded-md px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </div>

      {/* ── Résultat ── */}
      {hasResult && (
        <div className={[
          'rounded-xl border-2 p-6 space-y-4',
          ineligible
            ? 'border-edge bg-cloud'
            : noSubside
              ? 'border-edge bg-cloud'
              : 'border-brand bg-blue-50',
        ].join(' ')}>

          {/* Header */}
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate font-semibold mb-1">
                Canton {form.canton} — {CANTON_NAMES[form.canton!]}
                {result.label ? ` — ${result.label}` : ''}
              </p>
              {ineligible ? (
                <p className="text-xl font-bold text-ink">Revenu trop élevé — pas de subside</p>
              ) : eligible ? (
                <p className="text-xl font-bold text-brand">Vous semblez éligible ✓</p>
              ) : noSubside ? (
                <p className="text-xl font-bold text-ink">Revenu hors barème</p>
              ) : (
                <p className="text-3xl font-bold text-brand">
                  CHF {fmt(result.total)}<span className="text-lg font-normal text-slate">/mois</span>
                </p>
              )}
            </div>

            {!ineligible && !eligible && !noSubside && (
              <div className="text-right">
                <p className="text-xs text-slate">Soit par année</p>
                <p className="text-2xl font-bold text-ink">CHF {fmt(result.total * 12)}</p>
              </div>
            )}
          </div>

          {/* Détail par personne */}
          {!ineligible && !eligible && !noSubside && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-brand/20">
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="text-xs text-slate mb-1">
                  {form.situation === 'couple' ? 'Par adulte' : 'Adulte'}
                </p>
                <p className="text-lg font-bold text-ink">CHF {fmt(result.adulte)}</p>
                <p className="text-xs text-slate">/ mois</p>
              </div>
              {form.nbEnfants > 0 && (
                <div className="bg-white rounded-lg p-3 text-center">
                  <p className="text-xs text-slate mb-1">Par enfant</p>
                  <p className="text-lg font-bold text-ink">CHF {fmt(result.enfant)}</p>
                  <p className="text-xs text-slate">/ mois</p>
                </div>
              )}
              {form.situation === 'couple' && (
                <div className="bg-white rounded-lg p-3 text-center">
                  <p className="text-xs text-slate mb-1">Total ménage</p>
                  <p className="text-lg font-bold text-brand">CHF {fmt(result.total)}</p>
                  <p className="text-xs text-slate">/ mois</p>
                </div>
              )}
            </div>
          )}

          {/* Note */}
          {result.note && (
            <p className="text-xs text-slate bg-white/60 rounded-md p-3 leading-relaxed">
              ℹ️ {result.note}
            </p>
          )}

          {/* Disclaimer approximation */}
          {result.approx && !ineligible && (
            <p className="text-xs text-slate">
              ⚠️ Estimation indicative 2026.{result.total > 0 && ' Le montant réel peut différer selon votre situation exacte.'}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
