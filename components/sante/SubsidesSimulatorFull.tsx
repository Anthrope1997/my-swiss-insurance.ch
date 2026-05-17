'use client'

import { useState } from 'react'
import {
  type Canton, type Situation, type SubsideResult,
  calculerSubsideGE, calculerSubsideVS, calculerSubsideNE,
  calculerSubsideVD, calculerSubsideJU, calculerSubsideFR,
} from '@/lib/sante/calcul-subside'
import { SUBSIDES_2026, type CantonSubside2026 } from '@/data/sante/cantons'
import LeadFormModal from '@/components/ui/LeadFormModal'
import fr from '@/dictionaries/fr.json'

// ─── Data ────────────────────────────────────────────────────────────────────

const ALL_CODES = Object.keys(SUBSIDES_2026).sort((a, b) =>
  SUBSIDES_2026[a as keyof typeof SUBSIDES_2026].nom.localeCompare(
    SUBSIDES_2026[b as keyof typeof SUBSIDES_2026].nom, 'fr'
  )
)

// ─── Helpers ─────────────────────────────────────────────────────────────────

const FR_MOIS: Record<string, number> = {
  'janv.': 0, 'févr.': 1, 'mars': 2, 'avr.': 3, 'mai': 4, 'juin': 5,
  'juil.': 6, 'août': 7, 'sept.': 8, 'oct.': 9, 'nov.': 10, 'déc.': 11,
}

function parseDelai(delai: string): Date | null {
  const m = delai.match(/(\d{1,2})\s+(janv\.|févr\.|mars|avr\.|mai|juin|juil\.|août|sept\.|oct\.|nov\.|déc\.)\s+(\d{4})/)
  if (!m) return null
  return new Date(parseInt(m[3]), FR_MOIS[m[2]], parseInt(m[1]))
}

function cleanText(s: string): string {
  return s
    .replace(/ — /g, ' : ')
    .replace(/ → /g, ' : ')
    .replace(/ ; /g, '. ')
}

function retroStatus(text: string): 'oui' | 'non' | 'inconnu' {
  const lower = text.toLowerCase()
  if (lower.includes('pas de rétroactivité') || lower.includes('pas de rétroact')) return 'non'
  if (lower.includes('non publiée') || lower.includes('à vérifier')) return 'inconnu'
  if (lower.includes('rétroactif') || lower.includes('rétroactivité')) return 'oui'
  return 'inconnu'
}

function calculerSubsideStd(
  revenu: number,
  data: CantonSubside2026,
  situation: Situation,
  nbEnfants: number,
  isJeune: boolean,
): SubsideResult {
  const seuilBase      = data.seuilNum!
  const coupleBonus    = situation === 'couple' ? Math.round(seuilBase * 0.70) : 0
  const childBonus     = nbEnfants * 12000
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
  }
}

function computeResult(
  revenu: number,
  canton: string,
  data: CantonSubside2026,
  situation: Situation,
  nbEnfants: number,
  isJeune: boolean,
): SubsideResult | null {
  if (!data.seuilNum || revenu <= 0) return null

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

function fmt(n: number) {
  return n.toLocaleString('fr-CH', { maximumFractionDigits: 0 })
}

// ─── Icons ───────────────────────────────────────────────────────────────────

function IconCalendarCheck({ past }: { past?: boolean }) {
  return (
    <svg
      className="w-5 h-5 shrink-0 mt-0.5"
      style={{ color: past ? '#BA7517' : 'var(--brand)' }}
      fill="none" stroke="currentColor" strokeWidth={1.5}
      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
    >
      <path d="M11.5 21h-5.5a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6" />
      <path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" />
      <path d="M15 19l2 2 4-4" />
    </svg>
  )
}

function IconClockBack() {
  return (
    <svg
      className="w-5 h-5 shrink-0 mt-0.5 text-brand"
      fill="none" stroke="currentColor" strokeWidth={1.5}
      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
    >
      <path d="M12 8v4l2.5 2.5" />
      <path d="M3.05 11a9 9 0 1 0 .5-4.5" />
      <path d="M3 3v5h5" />
    </svg>
  )
}

function IconPlaneArrival() {
  return (
    <svg
      className="w-5 h-5 shrink-0 mt-0.5 text-brand"
      fill="none" stroke="currentColor" strokeWidth={1.5}
      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
    >
      <path d="M15 12h5a2 2 0 0 1 0 4h-15l-3-6h3l2 2h3l-2-7h3z" transform="rotate(-15 12 12) translate(0 -1)" />
      <path d="M3 21h18" />
    </svg>
  )
}

function Chevron() {
  return (
    <svg
      className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate pointer-events-none"
      fill="none" stroke="currentColor" viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

// ─── Form state ───────────────────────────────────────────────────────────────

interface FormState {
  canton:    string
  revenu:    string
  situation: Situation
  nbEnfants: number
  isJeune:   boolean
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SubsidesSimulatorFull() {
  const [form, setForm] = useState<FormState>({
    canton: '', revenu: '', situation: 'seul', nbEnfants: 0, isJeune: false,
  })
  const [submitted, setSubmitted] = useState(false)
  const [offerOpen, setOfferOpen] = useState(false)

  const t = fr.simulator

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

  // ── How-to logic (only relevant when hasAmount) ──
  const today        = new Date()
  const deadline     = cantonData ? parseDelai(cantonData.delai) : null
  const isPast       = deadline ? today > deadline : false
  const isNoDeadline = Boolean(cantonData?.delai.startsWith('Pas de délai'))
  const isM2         = Boolean(cantonData?.delai.includes('2e mois'))

  let calTitle = ''
  let calBody  = ''
  if (cantonData) {
    if (cantonData.auto) {
      calTitle = t.howTo.autoTitre
      calBody  = t.howTo.autoBody
    } else if (isNoDeadline) {
      calTitle = t.howTo.noDeadlineTitre
      calBody  = isM2 ? t.howTo.noDeadlineBodyM2 : t.howTo.noDeadlineBodyM1
    } else if (isPast) {
      calTitle = t.howTo.pastTitre
      calBody  = t.howTo.pastBody
    } else {
      calTitle = `${t.howTo.futureTitre} ${cantonData.delai}`
      calBody  = ''
    }
  }

  let alertBody:  string | null = null
  let retroTitle: string        = ''
  if (cantonData && !cantonData.auto) {
    if (isNoDeadline) {
      alertBody  = t.howTo.noDeadlineWarning
      retroTitle = t.howTo.retroactifNon
    } else if (cantonData.retroactivite) {
      alertBody  = cantonData.retroactivite
      const s    = retroStatus(cantonData.retroactivite)
      retroTitle = s === 'oui' ? t.howTo.retroactifOui : s === 'non' ? t.howTo.retroactifNon : t.howTo.retroactifInconnu
    }
  }

  return (
    <div className="space-y-6">

      {/* ── Formulaire ── */}
      <div className="rounded-xl border border-[#B5D4F4] bg-[#FAFCFE] px-6 py-6 space-y-5">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Canton */}
          <div>
            <label className="block text-[16px] font-medium text-ink mb-2">
              {t.form.canton}
            </label>
            <div className="relative">
              <select
                value={form.canton}
                onChange={e => set({ canton: e.target.value, revenu: '' })}
                className="select-field pr-9"
              >
                <option value="">{t.form.cantonPlaceholder}</option>
                {ALL_CODES.map(c => (
                  <option key={c} value={c}>
                    {c} — {SUBSIDES_2026[c as keyof typeof SUBSIDES_2026].nom}
                  </option>
                ))}
              </select>
              <Chevron />
            </div>
            {showNoFormula && cantonData && (
              <p className="text-[16px] text-slate/60 mt-1.5">{t.form.noFormula}</p>
            )}
          </div>

          {/* Revenu */}
          <div>
            <label className="block text-[16px] font-medium text-ink mb-2">
              {t.form.revenu}
            </label>
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                placeholder={t.form.revenuPlaceholder}
                value={form.revenu}
                onChange={e => set({ revenu: e.target.value })}
                className="input-field pr-24"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[16px] text-slate/60 pointer-events-none">
                {t.form.revenuSuffix}
              </span>
            </div>
            <p className="text-[16px] text-slate/60 mt-1.5">{t.form.revenuHint}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* Âge */}
          <div>
            <label className="block text-[16px] font-medium text-ink mb-2">
              {t.form.age}
            </label>
            <div className="relative">
              <select
                value={form.isJeune ? 'jeune' : 'adulte'}
                onChange={e => set({ isJeune: e.target.value === 'jeune' })}
                className="select-field pr-9"
              >
                <option value="adulte">{t.form.adulte}</option>
                <option value="jeune">{t.form.jeune}</option>
              </select>
              <Chevron />
            </div>
          </div>

          {/* Situation */}
          <div>
            <label className="block text-[16px] font-medium text-ink mb-2">
              {t.form.situation}
            </label>
            <div className="relative">
              <select
                value={form.situation}
                onChange={e => set({ situation: e.target.value as Situation })}
                className="select-field pr-9"
              >
                <option value="seul">{t.form.seul}</option>
                <option value="couple">{t.form.couple}</option>
              </select>
              <Chevron />
            </div>
          </div>

          {/* Enfants */}
          <div>
            <label className="block text-[16px] font-medium text-ink mb-2">
              {t.form.enfants}
            </label>
            <div className="relative">
              <select
                value={form.nbEnfants}
                onChange={e => set({ nbEnfants: parseInt(e.target.value) })}
                className="select-field pr-9"
              >
                {[0, 1, 2, 3, 4].map(n => (
                  <option key={n} value={n}>
                    {n === 0 ? t.form.aucunEnfant : `${n} enfant${n > 1 ? 's' : ''}`}
                  </option>
                ))}
              </select>
              <Chevron />
            </div>
          </div>
        </div>

        <button
          onClick={() => { if (form.canton) setSubmitted(true) }}
          disabled={!form.canton}
          className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {t.form.cta}
        </button>
      </div>

      {/* ── Résultats ── */}
      {submitted && cantonData && (
        <>
          {/* Pas de revenu */}
          {!hasRevenu && hasSeuilNum && (
            <p className="text-[16px] text-red-600 px-1">{t.result.noRevenu}</p>
          )}

          {/* Non éligible */}
          {hasRevenu && result && ineligible && (
            <div className="flex items-center gap-3 rounded-xl border border-edge bg-cloud px-5 py-4">
              <div className="w-9 h-9 rounded-full bg-white border border-edge flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-slate/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-ink text-[16px]">{t.result.ineligible}</p>
                <p className="text-[16px] text-slate mt-0.5">{t.result.ineligibleDetail}</p>
              </div>
            </div>
          )}

          {/* ── Carte résultat unique ── */}
          {hasRevenu && result && hasAmount && (
            <div className="rounded-xl border border-brand/20 overflow-hidden">

              {/* Montant */}
              <div className="bg-[#EBF3FB] px-5 sm:px-6 py-6">
                <span className="inline-flex items-center bg-brand text-white text-[16px] font-semibold px-3 py-1 rounded-full mb-3">
                  {t.result.badge}
                </span>
                <p className="font-semibold text-ink leading-none mb-1" style={{ fontSize: '32px' }}>
                  CHF {fmt(result.total)}
                  <span className="text-[16px] font-normal text-slate ml-2">{t.result.perMois}</span>
                </p>
                <p className="text-[16px] text-slate">
                  soit CHF {fmt(result.total * 12)} par an déduits de votre prime
                </p>
              </div>

              {/* Comment obtenir + disclaimer + CTA */}
              <div className="bg-white border-t border-brand/10 px-5 sm:px-6 py-5 space-y-5">
                <p className="text-[16px] font-semibold text-ink">{t.howTo.titre}</p>

                {/* Délai / versement */}
                <div className="flex gap-3 items-start">
                  <IconCalendarCheck past={isPast && !cantonData.auto} />
                  <div>
                    <p
                      className="text-[16px] font-semibold"
                      style={{ color: isPast && !cantonData.auto ? '#BA7517' : 'var(--ink)' }}
                    >
                      {calTitle}
                    </p>
                    {calBody && (
                      <p className="text-[16px] text-slate mt-0.5 leading-relaxed">{calBody}</p>
                    )}
                  </div>
                </div>

                {/* Rétroactivité */}
                {alertBody && (
                  <div className="flex gap-3 items-start">
                    <IconClockBack />
                    <div>
                      <p className="text-[16px] font-semibold text-ink">{retroTitle}</p>
                      <p className="text-[16px] text-slate mt-0.5 leading-relaxed">{cleanText(alertBody)}</p>
                    </div>
                  </div>
                )}

                {/* Nouveaux arrivants */}
                {cantonData.arrivants && (
                  <div className="flex gap-3 items-start">
                    <IconPlaneArrival />
                    <div>
                      <p className="text-[16px] font-semibold text-ink">{t.howTo.arrivantsTitre}</p>
                      <p className="text-[16px] text-slate/70 mt-0.5">{t.howTo.arrivantsSub}</p>
                      <p className="text-[16px] text-slate mt-1 leading-relaxed">{cleanText(cantonData.arrivants)}</p>
                    </div>
                  </div>
                )}

                {/* Badge estimation + CTA */}
                <div className="border-t border-edge pt-4 space-y-3">
                  <div className="flex items-start gap-3 rounded-lg border border-edge bg-cloud px-4 py-3">
                    <span className="inline-flex shrink-0 mt-0.5 items-center bg-brand text-white text-[16px] font-semibold px-3 py-1 rounded-full">
                      {t.estimationBadge}
                    </span>
                    <p className="text-[16px] text-slate leading-relaxed">{t.estimationNote}</p>
                  </div>
                  <button
                    onClick={() => setOfferOpen(true)}
                    className="btn-primary w-full"
                  >
                    {t.ctaExpert}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <LeadFormModal open={offerOpen} onClose={() => setOfferOpen(false)} />
    </div>
  )
}
