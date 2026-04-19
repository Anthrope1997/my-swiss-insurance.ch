'use client'

import { useState, useEffect, useCallback } from 'react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PrimeRow {
  assureur: string
  modele_nom: string
  prime_mensuelle: number
  remboursement: number
  prime_nette: number
}

interface NpaInfo {
  regionId: string
  canton: string
  ville: string
  commune: string
}

type AgeGroup = 'adulte' | 'jeune' | 'enfant'
type Modele   = 'BASE' | 'HAM' | 'HMO' | 'DIV'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const YOB: Record<AgeGroup, number> = { adulte: 1990, jeune: 2005, enfant: 2015 }

const FRANCHISES: Record<AgeGroup, number[]> = {
  adulte: [300, 500, 1000, 1500, 2000, 2500],
  jeune:  [300, 500, 1000, 1500, 2000, 2500],
  enfant: [100, 200, 300, 400, 500, 600],
}

const MODELE_LABELS: Record<Modele, string> = {
  BASE: 'Libre choix du médecin (standard)',
  HAM:  'Médecin de famille',
  HMO:  'HMO (réseau de soins)',
  DIV:  'Télémédecine',
}

const MODELE_INFO: Record<Modele, string> = {
  BASE: 'Accès direct à n\'importe quel médecin ou spécialiste en Suisse, sans restriction. C\'est le modèle le plus cher — il sert de référence pour comparer les autres.',
  HAM:  'Vous consultez d\'abord votre médecin de famille, qui vous oriente si besoin. Réduction moyenne de 11% (jusqu\'à −20%) selon la caisse et le canton.',
  HMO:  'Vous êtes rattaché à un réseau fermé de médecins agréés (cabinet ou centre HMO). Réduction moyenne de 12% (de −3% à −20%) selon la région.',
  DIV:  'Première consultation par téléphone ou application avant tout rendez-vous en cabinet. Réduction moyenne de 12% (de −5% à −24%) selon la caisse.',
}

const AGE_LABELS: Record<AgeGroup, string> = {
  adulte: 'Adulte (26 ans et +)',
  jeune:  'Jeune adulte (19–25 ans)',
  enfant: 'Enfant (0–18 ans)',
}

const FREE_ROWS = 5

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PrimeCalculatorReal() {
  // --- Form state ---
  const [npa,        setNpa]        = useState('')
  const [npaInfo,    setNpaInfo]    = useState<NpaInfo | null>(null)
  const [npaError,   setNpaError]   = useState('')
  const [npaLoading, setNpaLoading] = useState(false)

  const [ageGroup,  setAgeGroup]  = useState<AgeGroup>('adulte')
  const [franchise, setFranchise] = useState<number>(300)
  const [modele,    setModele]    = useState<Modele>('BASE')
  const [accident,  setAccident]  = useState(false)

  // --- Results state ---
  const [results,     setResults]     = useState<PrimeRow[] | null>(null)
  const [calcLoading, setCalcLoading] = useState(false)
  const [calcError,   setCalcError]   = useState('')

  // --- Tooltips ---
  const [showModeleInfo,   setShowModeleInfo]   = useState(false)
  const [showAccidentInfo, setShowAccidentInfo] = useState(false)

  // --- Lead gate state ---
  const [showAll,    setShowAll]    = useState(false)
  const [prenom,     setPrenom]     = useState('')
  const [email,      setEmail]      = useState('')
  const [gateStatus, setGateStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  // Reset franchise to first valid value when age group changes
  useEffect(() => {
    const options = FRANCHISES[ageGroup]
    if (!options.includes(franchise)) setFranchise(options[0])
    if (ageGroup === 'enfant') setAccident(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ageGroup])

  // --- NPA validation ---
  const validateNpa = useCallback(async (value: string) => {
    if (value.length !== 4) { setNpaInfo(null); setNpaError(''); return }
    setNpaLoading(true)
    setNpaError('')
    try {
      const res = await fetch(`/api/primes?npa=${value}`)
      if (res.ok) {
        setNpaInfo(await res.json())
      } else {
        setNpaInfo(null)
        setNpaError('Code postal introuvable')
      }
    } catch {
      setNpaError('Erreur réseau')
    } finally {
      setNpaLoading(false)
    }
  }, [])

  const handleNpaChange = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 4)
    setNpa(digits)
    setNpaInfo(null)
    setNpaError('')
    setResults(null)
    setShowAll(false)
    if (digits.length === 4) validateNpa(digits)
  }

  // --- Calculate ---
  const calculate = async () => {
    if (!npaInfo) return
    setCalcLoading(true)
    setCalcError('')
    setResults(null)
    setShowAll(false)
    try {
      const params = new URLSearchParams({
        npa,
        yob:      String(YOB[ageGroup]),
        franchise: String(franchise),
        accident: String(ageGroup === 'enfant' ? true : accident),
        modele,
      })
      const res = await fetch(`/api/primes?${params}`)
      if (!res.ok) throw new Error('Erreur serveur')
      const data = await res.json()
      const sorted = (data.results ?? []).slice().sort(
        (a: PrimeRow, b: PrimeRow) => a.prime_nette - b.prime_nette
      )
      setResults(sorted)
    } catch {
      setCalcError('Impossible de charger les données. Réessayez.')
    } finally {
      setCalcLoading(false)
    }
  }

  // --- Lead gate submit ---
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
          email:  email.trim(),
          canton: npaInfo?.canton ?? '',
          situation: `Calculateur · ${npa} · ${AGE_LABELS[ageGroup]} · CHF ${franchise} · ${MODELE_LABELS[modele]}`,
        }),
      })
      if (res.ok) { setShowAll(true); setGateStatus('done') }
      else setGateStatus('error')
    } catch {
      setGateStatus('error')
    }
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  const canCalculate    = !!npaInfo && !npaLoading
  const visibleResults  = showAll ? results : results?.slice(0, FREE_ROWS)
  const hiddenCount     = results ? Math.max(0, results.length - FREE_ROWS) : 0

  return (
    <section id="calculateur" className="scroll-mt-24 space-y-6">

      {/* ------------------------------------------------------------------ */}
      {/* Modèle info modal                                                   */}
      {/* ------------------------------------------------------------------ */}
      {showModeleInfo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setShowModeleInfo(false)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-edge">
              <h3 className="text-[17px] font-semibold text-ink">Les 4 modèles d'assurance LAMal</h3>
              <button
                type="button"
                onClick={() => setShowModeleInfo(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-brand hover:bg-[#dbeafe] transition-colors"
                aria-label="Fermer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-5 space-y-4">
              {(Object.keys(MODELE_LABELS) as Modele[]).map(k => (
                <div key={k} className={`rounded-lg p-4 ${k === modele ? 'bg-[#eff6ff] border border-[#bfdbfe]' : 'bg-cloud'}`}>
                  <p className="font-semibold text-ink text-[15px] mb-1">{MODELE_LABELS[k]}</p>
                  <p className="text-slate text-[14px] leading-relaxed">{MODELE_INFO[k]}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Accident info modal                                                 */}
      {/* ------------------------------------------------------------------ */}
      {showAccidentInfo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setShowAccidentInfo(false)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-edge">
              <h3 className="text-[17px] font-semibold text-ink">Couverture accident LAMal</h3>
              <button
                type="button"
                onClick={() => setShowAccidentInfo(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-brand hover:bg-[#dbeafe] transition-colors"
                aria-label="Fermer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="bg-cloud rounded-lg p-4">
                <p className="font-semibold text-ink text-[15px] mb-1">Sans couverture accident (recommandé pour la plupart)</p>
                <p className="text-slate text-[14px] leading-relaxed">
                  Si vous êtes salarié à <strong>8 heures ou plus par semaine</strong> chez un même employeur, votre assurance accident est obligatoirement couverte par votre employeur (LAA). Vous ne devez pas la payer via la LAMal — cochez cette option pour une prime moins élevée.
                </p>
              </div>
              <div className="bg-cloud rounded-lg p-4">
                <p className="font-semibold text-ink text-[15px] mb-1">Avec couverture accident</p>
                <p className="text-slate text-[14px] leading-relaxed">
                  Si vous êtes <strong>indépendant</strong>, <strong>sans emploi</strong>, ou salarié à <strong>moins de 8 heures par semaine</strong>, vous n'êtes pas couvert par la LAA. Vous devez inclure la couverture accident dans votre LAMal. La prime sera légèrement plus élevée.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Form                                                                */}
      {/* ------------------------------------------------------------------ */}
      <div className="bg-white border border-edge rounded-xl overflow-hidden">

        <div className="px-6 py-5 border-b border-edge">
          <p className="font-semibold text-ink text-[16px]">Votre profil</p>
          <p className="text-[13px] text-slate mt-0.5">Entrez votre code postal pour comparer toutes les caisses</p>
        </div>

        <div className="px-6 py-5 space-y-5">

          {/* NPA */}
          <div>
            <label className="block text-sm font-medium text-ink mb-1">
              Code postal (NPA)
            </label>
            <div className="relative max-w-xs">
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                placeholder="Ex. 1201"
                value={npa}
                onChange={e => handleNpaChange(e.target.value)}
                className="input-field"
              />
              {npaLoading && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate text-xs animate-pulse">
                  recherche…
                </span>
              )}
            </div>
            {npaInfo && (
              <p className="mt-1.5 text-[13px] text-brand font-medium">
                ✓ {npaInfo.commune} · {npaInfo.canton}
              </p>
            )}
            {npaError && (
              <p className="mt-1.5 text-[13px] text-red-500">{npaError}</p>
            )}
          </div>

          {/* Age + Franchise + Modèle */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <div>
              <label className="block text-sm font-medium text-ink mb-1">Tranche d'âge</label>
              <div className="relative">
                <select
                  value={ageGroup}
                  onChange={e => setAgeGroup(e.target.value as AgeGroup)}
                  className="select-field pr-9"
                >
                  {(Object.keys(AGE_LABELS) as AgeGroup[]).map(k => (
                    <option key={k} value={k}>{AGE_LABELS[k]}</option>
                  ))}
                </select>
                <Chevron />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-1">Franchise annuelle</label>
              <div className="relative">
                <select
                  value={franchise}
                  onChange={e => setFranchise(Number(e.target.value))}
                  className="select-field pr-9"
                >
                  {FRANCHISES[ageGroup].map(f => (
                    <option key={f} value={f}>CHF {f}</option>
                  ))}
                </select>
                <Chevron />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <label className="block text-sm font-medium text-ink">Modèle d'assurance</label>
                <button
                  type="button"
                  onClick={() => setShowModeleInfo(v => !v)}
                  className="w-4 h-4 rounded-full bg-brand text-white text-[10px] font-bold leading-none flex items-center justify-center shrink-0 hover:bg-brand-dark transition-colors"
                  aria-label="Informations sur les modèles"
                >
                  i
                </button>
              </div>
              <div className="relative">
                <select
                  value={modele}
                  onChange={e => setModele(e.target.value as Modele)}
                  className="select-field pr-9"
                >
                  {(Object.keys(MODELE_LABELS) as Modele[]).map(k => (
                    <option key={k} value={k}>{MODELE_LABELS[k]}</option>
                  ))}
                </select>
                <Chevron />
              </div>
            </div>
          </div>

          {/* Accident + CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-1">
            {ageGroup !== 'enfant' ? (
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={accident}
                  onChange={e => setAccident(e.target.checked)}
                  className="w-4 h-4 rounded accent-brand cursor-pointer"
                />
                <span className="text-[14px] text-slate">Inclure la couverture accident</span>
                <button
                  type="button"
                  onClick={() => setShowAccidentInfo(v => !v)}
                  className="w-4 h-4 rounded-full bg-brand text-white text-[10px] font-bold leading-none flex items-center justify-center shrink-0 hover:bg-brand-dark transition-colors"
                  aria-label="Informations sur la couverture accident"
                >
                  i
                </button>
              </label>
            ) : (
              <p className="text-[13px] text-slate">
                Couverture accident incluse automatiquement pour les enfants.
              </p>
            )}

            <button
              onClick={calculate}
              disabled={!canCalculate || calcLoading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              {calcLoading ? 'Calcul en cours…' : 'Comparer les primes →'}
            </button>
          </div>

          {calcError && (
            <p className="text-[13px] text-red-500">{calcError}</p>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Results                                                             */}
      {/* ------------------------------------------------------------------ */}
      {results !== null && (
        <>
          {results.length === 0 ? (
            <div className="callout">
              Aucune offre trouvée pour cette combinaison. Essayez un autre modèle ou une autre franchise.
            </div>
          ) : (
            <>
              {/* Savings callout */}
              {results.length >= 2 && (() => {
                const saving = results[results.length - 1].prime_nette - results[0].prime_nette
                return (
                  <div className="callout-warning">
                    <span className="font-semibold text-ink">
                      Économie potentielle&nbsp;: CHF&nbsp;{(saving * 12).toFixed(0)}/an
                    </span>
                    <span className="text-slate text-[14px]">
                      {' '}(CHF&nbsp;{saving.toFixed(2)}/mois) entre la caisse la moins chère et la plus chère pour ce profil.
                    </span>
                  </div>
                )
              })()}

              {/* Table header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[17px] font-semibold text-ink">
                    {results.length} offres — {npaInfo?.commune} · {npaInfo?.canton}
                  </h3>
                  <p className="text-[13px] text-slate mt-0.5">
                    {MODELE_LABELS[modele]} · Franchise CHF&nbsp;{franchise} · {AGE_LABELS[ageGroup]}
                  </p>
                </div>
              </div>

              {/* Table */}
              <div className="border border-edge rounded-xl overflow-hidden">
                <table className="stripe-table w-full">
                  <thead>
                    <tr>
                      <th className="w-10">#</th>
                      <th>Assureur</th>
                      <th className="text-right">Prime mensuelle</th>
                      <th className="text-right hidden sm:table-cell">Prime annuelle</th>
                      <th className="text-right hidden md:table-cell">Économie max</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleResults!.map((row, i) => {
                      const maxNette = results![results!.length - 1].prime_nette
                      const saving   = maxNette - row.prime_nette
                      return (
                        <tr key={i} className={i === 0 ? 'bg-[#f0fdf4]' : ''}>
                          <td>
                            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[12px] font-bold ${i === 0 ? 'bg-green-500 text-white' : 'bg-cloud text-slate'}`}>
                              {i + 1}
                            </span>
                          </td>
                          <td className={`font-semibold ${i === 0 ? 'text-ink' : ''}`}>{row.assureur}</td>
                          <td className={`text-right font-bold ${i === 0 ? 'text-green-700' : 'text-ink'}`}>
                            {row.prime_nette.toFixed(2)}&nbsp;CHF
                          </td>
                          <td className="text-right hidden sm:table-cell">
                            {(row.prime_nette * 12).toFixed(0)}&nbsp;CHF
                          </td>
                          <td className="text-right hidden md:table-cell">
                            {saving > 0
                              ? <span className="text-green-700 font-medium">−{(saving * 12).toFixed(0)}&nbsp;CHF/an</span>
                              : <span className="text-slate">—</span>
                            }
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Lead gate */}
              {!showAll && hiddenCount > 0 && (
                <div className="bg-white border border-edge rounded-xl overflow-hidden">
                  <div className="px-6 py-5 border-b border-edge">
                    <p className="font-semibold text-ink text-[16px]">
                      Demandez à être rappelé par un courtier
                    </p>
                    <p className="text-[13px] text-slate mt-0.5">
                      Un courtier partenaire vous aide à choisir la meilleure caisse pour votre profil.
                    </p>
                  </div>
                  <form onSubmit={handleGate} className="px-6 py-5">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        placeholder="Votre prénom"
                        required
                        value={prenom}
                        onChange={e => setPrenom(e.target.value)}
                        className="input-field sm:max-w-[180px]"
                      />
                      <input
                        type="email"
                        placeholder="votre@email.ch"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="input-field sm:flex-1"
                      />
                      <button
                        type="submit"
                        disabled={gateStatus === 'loading'}
                        className="btn-primary shrink-0 disabled:opacity-50"
                      >
                        {gateStatus === 'loading' ? 'Envoi…' : 'Demander un rappel →'}
                      </button>
                    </div>
                    {gateStatus === 'error' && (
                      <p className="mt-2 text-[13px] text-red-500">Une erreur est survenue. Réessayez.</p>
                    )}
                    <p className="mt-3 text-[12px] text-slate/60">
                      Sans engagement · Conformément à la LPD ·{' '}
                      <a href="/politique-confidentialite" className="underline">Politique de confidentialité</a>
                    </p>
                  </form>
                </div>
              )}

              {showAll && (
                <div className="callout-success flex items-center gap-2 text-[14px]">
                  <svg className="w-4 h-4 shrink-0 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Récapitulatif envoyé à <strong>{email}</strong>
                </div>
              )}
            </>
          )}
        </>
      )}
    </section>
  )
}

function Chevron() {
  return (
    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate pointer-events-none"
      fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}
