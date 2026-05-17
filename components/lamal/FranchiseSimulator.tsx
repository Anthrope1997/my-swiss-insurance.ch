'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cantonBySlug } from '@/data/sante/cantons'

type AgeGroup = 'adulte' | 'jeuneAdulte' | 'enfant'

// Sorted from most specific to least specific — first match wins
const POSTAL_RANGES: Array<[number, number, string]> = [
  [1200, 1299, 'geneve'],
  [1700, 1799, 'fribourg'],
  [1900, 1999, 'valais'],
  [1000, 1999, 'vaud'],
  [2000, 2399, 'neuchatel'],
  [2800, 2999, 'jura'],
  [2400, 2799, 'berne'],
  [3000, 3899, 'berne'],
  [3900, 3999, 'valais'],
  [4000, 4059, 'bale-ville'],
  [4100, 4499, 'bale-campagne'],
  [4500, 4999, 'soleure'],
  [5000, 5999, 'argovie'],
  [6060, 6079, 'obwald'],
  [6390, 6399, 'obwald'],
  [6300, 6369, 'zoug'],
  [6370, 6389, 'nidwald'],
  [6400, 6459, 'schwyz'],
  [6460, 6499, 'uri'],
  [6500, 6999, 'tessin'],
  [6000, 6299, 'lucerne'],
  [7000, 7999, 'grisons'],
  [8200, 8299, 'schaffhouse'],
  [8500, 8599, 'thurgovie'],
  [8750, 8779, 'glaris'],
  [9040, 9049, 'appenzell-rhodes-exterieures'],
  [9050, 9059, 'appenzell-rhodes-interieures'],
  [8000, 8999, 'zurich'],
  [9000, 9699, 'saint-gall'],
]

function slugFromPostal(code: string): string | null {
  if (!/^\d{4}$/.test(code)) return null
  const n = parseInt(code, 10)
  for (const [from, to, slug] of POSTAL_RANGES) {
    if (n >= from && n <= to) return slug
  }
  return null
}

const CHILD_FACTORS: { franchise: number; factor: number }[] = [
  { franchise: 0,   factor: 1.08 },
  { franchise: 100, factor: 1.04 },
  { franchise: 200, factor: 1.02 },
  { franchise: 300, factor: 1.00 },
  { franchise: 400, factor: 0.97 },
  { franchise: 600, factor: 0.93 },
]

interface Option { franchise: number; primeMois: number; total: number }

function calcTotal(primeMois: number, franchise: number, frais: number, maxQP: number): number {
  const charge = Math.min(frais, franchise) + Math.min(0.1 * Math.max(frais - franchise, 0), maxQP)
  return Math.round(primeMois * 12 + charge)
}

function fmtN(n: number): string {
  return Math.round(n).toLocaleString('fr-CH')
}

function computeResult(canton: string, ageGroup: AgeGroup, frais: number) {
  const data = cantonBySlug[canton]
  if (!data) return null

  let options: Option[]

  if (ageGroup === 'enfant') {
    const base = data.primeMoyenneEnfant
    options = CHILD_FACTORS.map(({ franchise, factor }) => {
      const primeMois = Math.round(base * factor * 100) / 100
      return { franchise, primeMois, total: calcTotal(primeMois, franchise, frais, 350) }
    })
  } else {
    const ratio = ageGroup === 'jeuneAdulte' && data.primeMoyenne > 0
      ? data.primeMoyenneJA / data.primeMoyenne
      : 1
    options = data.franchiseTable.map(row => {
      const primeMois = Math.round(row.primeMois * ratio * 100) / 100
      return { franchise: row.franchise, primeMois, total: calcTotal(primeMois, row.franchise, frais, 700) }
    })
  }

  if (options.length === 0) return null
  const sorted = [...options].sort((a, b) => a.total - b.total)
  const best   = sorted[0]
  const worst  = sorted[sorted.length - 1]
  return { best, worst, economy: worst.total - best.total }
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

export default function FranchiseSimulator() {
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('adulte')
  const [postalCode, setPostalCode] = useState('')
  const [fraisRaw, setFraisRaw]     = useState('')
  const [submitted, setSubmitted]   = useState(false)

  const set = (patch: Partial<{ ageGroup: AgeGroup; postalCode: string; fraisRaw: string }>) => {
    setSubmitted(false)
    if (patch.ageGroup !== undefined) setAgeGroup(patch.ageGroup)
    if (patch.postalCode !== undefined) setPostalCode(patch.postalCode)
    if (patch.fraisRaw !== undefined) setFraisRaw(patch.fraisRaw)
  }

  const detectedSlug = slugFromPostal(postalCode)
  const canton       = detectedSlug ?? 'zurich'
  const cantonName   = cantonBySlug[canton]?.name ?? 'Zurich'
  const frais        = Math.max(0, parseInt(fraisRaw.replace(/\s/g, ''), 10) || 0)
  const canCalculate = fraisRaw.trim() !== ''

  const result = submitted ? computeResult(canton, ageGroup, frais) : null

  const phrase = result
    ? ageGroup === 'enfant'
      ? `Dans le canton de ${cantonName}, avec CHF ${fmtN(frais)} de frais médicaux estimés, la franchise de CHF ${fmtN(result.best.franchise)} est la plus avantageuse pour votre enfant.`
      : `Dans le canton de ${cantonName}, avec CHF ${fmtN(frais)} de frais médicaux estimés, la franchise de CHF ${fmtN(result.best.franchise)} est la plus avantageuse.`
    : null

  const economyLine = result && result.economy > 0
    ? `Économie de CHF ${fmtN(result.economy)} par an par rapport à la franchise de CHF ${fmtN(result.worst.franchise)}`
    : null

  const comparateurUrl =
    `/sante/comparateur?canton=${canton}&franchise=${result?.best.franchise ?? 300}&profil=${ageGroup}`

  return (
    <div className="bg-white border border-edge rounded-xl overflow-hidden mt-8">

      {/* ── Formulaire ── */}
      <div className="px-6 py-6 space-y-5">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          {/* Profil */}
          <div>
            <label htmlFor="sim-profil" className="block text-[16px] font-medium text-ink mb-2">
              Profil
            </label>
            <div className="relative">
              <select
                id="sim-profil"
                value={ageGroup}
                onChange={e => set({ ageGroup: e.target.value as AgeGroup })}
                className="select-field pr-9"
              >
                <option value="adulte">Adulte — 26 ans et plus</option>
                <option value="jeuneAdulte">Jeune adulte — 19 à 25 ans</option>
                <option value="enfant">Enfant — 0 à 18 ans</option>
              </select>
              <Chevron />
            </div>
          </div>

          {/* Code postal */}
          <div>
            <label htmlFor="sim-postal" className="block text-[16px] font-medium text-ink mb-2">
              Code postal
            </label>
            <input
              id="sim-postal"
              type="text"
              inputMode="numeric"
              maxLength={4}
              placeholder="ex. 1201"
              value={postalCode}
              onChange={e => set({ postalCode: e.target.value.replace(/\D/g, '') })}
              className="input-field"
            />
          </div>

          {/* Frais médicaux */}
          <div>
            <label htmlFor="sim-frais" className="block text-[16px] font-medium text-ink mb-2">
              Frais médicaux (CHF / an)
            </label>
            <input
              id="sim-frais"
              type="text"
              inputMode="numeric"
              placeholder="ex. 1500"
              value={fraisRaw}
              onChange={e => set({ fraisRaw: e.target.value.replace(/\D/g, '') })}
              className="input-field"
            />
          </div>

        </div>

        {/* Actions */}
        <div>
          <button
            onClick={() => { if (canCalculate) setSubmitted(true) }}
            disabled={!canCalculate}
            className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Trouver ma franchise optimale →
          </button>
        </div>

      </div>

      {/* ── Résultat ── */}
      {submitted && result && phrase && (
        <div style={{ borderTop: '0.5px solid var(--border)' }}>
          <div className="px-6 py-6">
            <div className="rounded-[8px] bg-[var(--blue-tint)] border border-brand/20 px-5 py-5">
              <div className="flex items-center gap-2 mb-2">
                <svg
                  className="w-5 h-5 text-brand shrink-0" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24" aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[16px] font-semibold text-ink">
                  Franchise recommandée : CHF {fmtN(result.best.franchise)}
                </span>
              </div>
              <p className="text-[16px] text-ink leading-relaxed mb-1">{phrase}</p>
              {economyLine && (
                <p className="text-[16px] font-semibold text-brand mb-4">{economyLine}</p>
              )}
              <Link href={comparateurUrl} className="btn-primary inline-flex items-center gap-2">
                Comparer les primes dans mon canton →
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
