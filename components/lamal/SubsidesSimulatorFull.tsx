'use client'

import { useState } from 'react'
import {
  type Canton, type Situation, type SubsideResult,
  calculerSubsideGE, calculerSubsideVS, calculerSubsideNE,
  calculerSubsideVD, calculerSubsideJU, calculerSubsideFR,
} from '@/lib/lamal/calcul-subside'
import { SUBSIDES_2026, type CantonSubside2026 } from '@/lib/data/subsides-2026'

// ─── Data ────────────────────────────────────────────────────────────────────

const PRECISE_CANTONS = new Set<string>(['GE', 'VS', 'NE', 'VD', 'JU', 'FR'])

const ALL_CODES = Object.keys(SUBSIDES_2026).sort((a, b) =>
  SUBSIDES_2026[a as keyof typeof SUBSIDES_2026].nom.localeCompare(
    SUBSIDES_2026[b as keyof typeof SUBSIDES_2026].nom, 'fr'
  )
)

// ─── Calcul standard (interpolation linéaire) ─────────────────────────────────

function calculerSubsideStd(
  revenu: number,
  data: CantonSubside2026,
  situation: Situation,
  nbEnfants: number,
  isJeune: boolean,
): SubsideResult {
  const seuilBase   = data.seuilNum!
  const coupleBonus = situation === 'couple' ? Math.round(seuilBase * 0.70) : 0
  const childBonus  = nbEnfants * 12000
  const effectiveSeuil = seuilBase + coupleBonus + childBonus

  if (revenu >= effectiveSeuil) {
    return { adulte: 0, enfant: 0, total: 0, approx: true, label: 'Non éligible' }
  }

  const ratio  = 1 - revenu / effectiveSeuil
  const adulte = Math.max(0, Math.round(data.montantMaxNum * ratio * (isJeune ? 0.65 : 1)))
  const enfant = nbEnfants > 0 ? Math.max(0, Math.round(data.montantMaxNum * 0.35 * ratio)) : 0
  const nb     = situation === 'couple' ? 2 : 1

  return {
    adulte, enfant,
    total: adulte * nb + enfant * nbEnfants,
    approx: true,
    label: 'Ordinaire',
    note: 'Estimation indicative — barème cantonal appliqué de manière linéaire. Le montant réel est déterminé par le service cantonal sur votre dossier fiscal.',
  }
}

// ─── Dispatch calcul ──────────────────────────────────────────────────────────

function computeResult(
  revenu: number,
  canton: string,
  data: CantonSubside2026,
  situation: Situation,
  nbEnfants: number,
  isJeune: boolean,
): SubsideResult | null {
  if (!data.seuilNum) return null
  if (revenu <= 0) return null

  switch (canton as Canton) {
    case 'GE': return calculerSubsideGE(revenu, situation, nbEnfants, isJeune)
    case 'VS': return calculerSubsideVS(revenu, situation, nbEnfants, isJeune)
    case 'NE': return calculerSubsideNE(revenu, situation, nbEnfants, isJeune)
    case 'VD': return calculerSubsideVD(revenu, situation, nbEnfants, isJeune)
    case 'JU': return calculerSubsideJU(revenu, situation, nbEnfants, isJeune)
    case 'FR': return calculerSubsideFR(revenu, situation, nbEnfants, isJeune)
    default:   return calculerSubsideStd(revenu, data, situation, nbEnfants, isJeune)
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  canton:    string
  revenu:    string
  situation: Situation
  nbEnfants: number
  isJeune:   boolean
}

function fmt(n: number) {
  return n.toLocaleString('fr-CH', { maximumFractionDigits: 0 })
}

function ChevronDown() {
  return (
    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate pointer-events-none"
         fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SubsidesSimulatorFull() {
  const [form, setForm] = useState<FormState>({
    canton: '', revenu: '', situation: 'seul', nbEnfants: 0, isJeune: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const set = (patch: Partial<FormState>) => {
    setSubmitted(false)
    setForm(f => ({ ...f, ...patch }))
  }

  const cantonData    = form.canton ? SUBSIDES_2026[form.canton as keyof typeof SUBSIDES_2026] ?? null : null
  const hasSeuilNum   = Boolean(cantonData?.seuilNum)
  const revNum        = parseInt(form.revenu.replace(/['\s]/g, '')) || 0
  const hasRevenu     = revNum > 0
  const showNoFormula = Boolean(cantonData && !hasSeuilNum)

  const result = (submitted && cantonData && hasSeuilNum && hasRevenu)
    ? computeResult(revNum, form.canton, cantonData, form.situation, form.nbEnfants, form.isJeune)
    : null

  const ineligible = result !== null && result.total === 0
  const hasAmount  = result !== null && result.total > 0
  const showResult = submitted && Boolean(cantonData) && hasSeuilNum

  return (
    <div className="bg-[#dbeafe] border-2 border-[#1d4ed8] rounded-xl p-6 space-y-5">

      <p className="text-[11px] font-semibold text-[#1d4ed8] uppercase tracking-widest">
        Estimez votre subside en 30 secondes
      </p>

      {/* ── Row 1 : canton + revenu ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

        <div>
          <label className="block text-[11px] font-semibold text-slate/60 uppercase tracking-widest mb-2">
            Canton de résidence
          </label>
          <div className="relative">
            <select
              value={form.canton}
              onChange={e => set({ canton: e.target.value, revenu: '' })}
              className="select-field pr-9"
            >
              <option value="">Sélectionner votre canton…</option>
              {ALL_CODES.map(c => (
                <option key={c} value={c}>{c} — {SUBSIDES_2026[c as keyof typeof SUBSIDES_2026].nom}</option>
              ))}
            </select>
            <ChevronDown />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate/60 uppercase tracking-widest mb-2">
            Revenu déterminant annuel (CHF)
          </label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="ex. 45 000"
            value={form.revenu}
            onChange={e => set({ revenu: e.target.value })}
            className="input-field"
          />
          <p className="text-[12px] text-slate/60 mt-1.5">
            Revenu net fiscal — en cas de doute, utilisez votre revenu imposable.
          </p>
        </div>

      </div>

      {/* ── Row 2 : situation + enfants + âge ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div>
          <label className="block text-[11px] font-semibold text-slate/60 uppercase tracking-widest mb-2">
            Situation familiale
          </label>
          <div className="relative">
            <select
              value={form.situation}
              onChange={e => set({ situation: e.target.value as Situation })}
              className="select-field pr-9 text-[14px]"
            >
              <option value="seul">Personne seule</option>
              <option value="couple">Couple</option>
            </select>
            <ChevronDown />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate/60 uppercase tracking-widest mb-2">
            Enfants à charge
          </label>
          <div className="relative">
            <select
              value={form.nbEnfants}
              onChange={e => set({ nbEnfants: parseInt(e.target.value) })}
              className="select-field pr-9 text-[14px]"
            >
              {[0, 1, 2, 3, 4].map(n => (
                <option key={n} value={n}>{n === 0 ? 'Aucun' : `${n} enfant${n > 1 ? 's' : ''}`}</option>
              ))}
            </select>
            <ChevronDown />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate/60 uppercase tracking-widest mb-2">
            Âge
          </label>
          <div className="relative">
            <select
              value={form.isJeune ? 'jeune' : 'adulte'}
              onChange={e => set({ isJeune: e.target.value === 'jeune' })}
              className="select-field pr-9 text-[14px]"
            >
              <option value="adulte">Adulte (26 ans et plus)</option>
              <option value="jeune">Jeune adulte (19 à 25 ans)</option>
            </select>
            <ChevronDown />
          </div>
        </div>

      </div>

      {/* ── Bouton de calcul ── */}
      <button
        onClick={() => { if (form.canton) setSubmitted(true) }}
        disabled={!form.canton}
        className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Calculer mon subside →
      </button>

      {/* ── Note ZH / TI — formule non publiée ── */}
      {showNoFormula && cantonData && (
        <p className="text-[12px] text-slate/60 leading-relaxed">
          Le canton de {cantonData.nom} n&apos;a pas publié de barème standard. L&apos;estimation chiffrée n&apos;est pas disponible — consultez directement le service cantonal.
        </p>
      )}

      {/* ── Zone résultats ── */}
      {submitted && cantonData && (
        <div className="space-y-4 pt-2 border-t border-[#1d4ed8]/20">

          {/* Revenu non renseigné — canton standard */}
          {showResult && !hasRevenu && (
            <p className="text-[13px] text-slate/70">
              Entrez votre revenu déterminant pour obtenir une estimation chiffrée.
            </p>
          )}

          {/* Résultat chiffré */}
          {showResult && hasRevenu && result && (
            ineligible ? (
              <div className="rounded-lg border border-edge bg-white p-5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-cloud flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-slate/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-ink text-[15px]">Revenu hors barème</p>
                  <p className="text-[13px] text-slate mt-0.5">
                    Votre revenu dépasse le seuil d&apos;éligibilité dans le canton de {cantonData.nom}.
                  </p>
                </div>
              </div>
            ) : hasAmount ? (
              <div className="rounded-lg bg-[var(--navy)] p-6 space-y-4">
                <div className="flex items-end justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-[11px] text-white/50 uppercase tracking-wide mb-1">
                      Estimation subside mensuel
                      {result.label && result.label !== 'Ordinaire' ? ` — ${result.label}` : ''}
                    </p>
                    <p className="text-4xl font-bold text-white">
                      CHF {fmt(result.total)}
                      <span className="text-lg font-normal text-white/50 ml-1">/mois</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-white/50">par année</p>
                    <p className="text-xl font-semibold text-white">CHF {fmt(result.total * 12)}</p>
                  </div>
                </div>

                {(form.nbEnfants > 0 || form.situation === 'couple') && (
                  <div className={`grid gap-2 pt-4 border-t border-white/10 ${
                    form.nbEnfants > 0 && form.situation === 'couple' ? 'grid-cols-3' : 'grid-cols-2'
                  }`}>
                    <div className="bg-white/10 rounded-lg px-4 py-3">
                      <p className="text-[11px] text-white/50 mb-0.5">
                        {form.situation === 'couple' ? 'Par adulte' : 'Adulte'}
                      </p>
                      <p className="text-[17px] font-bold text-white">
                        CHF {fmt(result.adulte)}
                        <span className="text-[12px] font-normal text-white/50">/mois</span>
                      </p>
                    </div>
                    {form.nbEnfants > 0 && (
                      <div className="bg-white/10 rounded-lg px-4 py-3">
                        <p className="text-[11px] text-white/50 mb-0.5">Par enfant</p>
                        <p className="text-[17px] font-bold text-white">
                          CHF {fmt(result.enfant)}
                          <span className="text-[12px] font-normal text-white/50">/mois</span>
                        </p>
                      </div>
                    )}
                    {form.situation === 'couple' && (
                      <div className="bg-white/10 rounded-lg px-4 py-3">
                        <p className="text-[11px] text-white/50 mb-0.5">Total ménage</p>
                        <p className="text-[17px] font-bold text-white">
                          CHF {fmt(result.total)}
                          <span className="text-[12px] font-normal text-white/50">/mois</span>
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {result.note && (
                  <p className="text-[12px] text-white/50 leading-relaxed border-t border-white/10 pt-3">
                    {result.note}
                  </p>
                )}
                {!PRECISE_CANTONS.has(form.canton) && (
                  <div className="flex items-start gap-2 border-t border-white/10 pt-3">
                    <svg className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    </svg>
                    <p className="text-[12px] text-amber-300 leading-relaxed">
                      Estimation indicative — les coefficients couple / jeune adulte / enfant sont des approximations linéaires. Le montant réel est calculé par le service cantonal sur la base de votre dossier fiscal. Vérifiez auprès de votre canton.
                    </p>
                  </div>
                )}
              </div>
            ) : null
          )}

          <InfoGrid cantonData={cantonData} />
          <PrimeLien cantonData={cantonData} />
          <CtaExpert />

        </div>
      )}

    </div>
  )
}

// ─── Sous-composants partagés ─────────────────────────────────────────────────

function InfoGrid({ cantonData }: { cantonData: CantonSubside2026 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {[
        { label: 'Seuil de revenu',  value: cantonData.seuilRevenu },
        { label: 'Montant maximum',  value: cantonData.montantMax  },
        { label: 'Attribution',      value: cantonData.auto ? 'Automatique' : 'Sur demande' },
        { label: 'Délai 2026',       value: cantonData.delai },
      ].map(({ label, value }) => (
        <div key={label} className="bg-white border border-edge rounded-[8px] px-4 py-3">
          <p className="text-[11px] text-slate/60 uppercase tracking-wide mb-1">{label}</p>
          <p className="text-[13px] font-medium text-ink">{value}</p>
        </div>
      ))}
    </div>
  )
}

function PrimeLien({ cantonData }: { cantonData: CantonSubside2026 }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-edge rounded-[8px] px-4 py-3">
      <p className="text-[13px] text-slate">
        Prime de référence {cantonData.nom} (adulte, f=300) :{' '}
        <span className="font-semibold text-ink">CHF {cantonData.primeMoyenne} par mois</span>
      </p>
      <a
        href={cantonData.lien}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand hover:underline text-[13px] font-medium shrink-0"
      >
        Service cantonal officiel →
      </a>
    </div>
  )
}

function CtaExpert() {
  return (
    <div className="border-t border-edge pt-3">
      <a href="#contact" className="text-[14px] text-brand hover:underline">
        Vous souhaitez qu&apos;un expert vérifie vos droits et effectue la démarche pour vous ? →
      </a>
    </div>
  )
}
