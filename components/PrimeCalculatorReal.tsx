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
  BASE: 'Standard',
  HAM:  'Médecin de famille',
  HMO:  'HMO',
  DIV:  'Autres modèles',
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
  const [npa,       setNpa]       = useState('')
  const [npaInfo,   setNpaInfo]   = useState<NpaInfo | null>(null)
  const [npaError,  setNpaError]  = useState('')
  const [npaLoading,setNpaLoading]= useState(false)

  const [ageGroup,  setAgeGroup]  = useState<AgeGroup>('adulte')
  const [franchise, setFranchise] = useState<number>(300)
  const [modele,    setModele]    = useState<Modele>('BASE')
  const [accident,  setAccident]  = useState(false)

  // --- Results state ---
  const [results,   setResults]   = useState<PrimeRow[] | null>(null)
  const [calcLoading, setCalcLoading] = useState(false)
  const [calcError,   setCalcError]   = useState('')

  // --- Lead gate state ---
  const [showAll,     setShowAll]     = useState(false)
  const [prenom,      setPrenom]      = useState('')
  const [email,       setEmail]       = useState('')
  const [gateStatus,  setGateStatus]  = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  // Reset franchise to first valid value when age group changes
  useEffect(() => {
    const options = FRANCHISES[ageGroup]
    if (!options.includes(franchise)) setFranchise(options[0])
    // Children always have accident coverage
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
      setResults(data.results ?? [])
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
  // Render helpers
  // ---------------------------------------------------------------------------

  const inputCls = 'w-full border border-edge rounded-md px-3 py-2.5 text-[14px] text-ink bg-white focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-shadow'
  const labelCls = 'block text-[12px] font-semibold text-slate uppercase tracking-wide mb-1.5'

  const canCalculate = !!npaInfo && !npaLoading

  const visibleResults = showAll ? results : results?.slice(0, FREE_ROWS)
  const hiddenCount    = results ? Math.max(0, results.length - FREE_ROWS) : 0

  return (
    <section id="calculateur" className="scroll-mt-24">

      {/* ------------------------------------------------------------------ */}
      {/* Form                                                                */}
      {/* ------------------------------------------------------------------ */}
      <div className="bg-cloud border border-edge rounded-xl p-6 md:p-8">

        {/* Row 1 : NPA */}
        <div className="mb-5">
          <label className={labelCls}>Votre code postal (NPA)</label>
          <div className="relative max-w-xs">
            <input
              type="text"
              inputMode="numeric"
              maxLength={4}
              placeholder="Ex. 1201"
              value={npa}
              onChange={e => handleNpaChange(e.target.value)}
              className={inputCls}
            />
            {npaLoading && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate text-xs animate-pulse">
                recherche…
              </span>
            )}
          </div>

          {npaInfo && (
            <p className="mt-1.5 text-[13px] text-brand font-medium">
              ✓ {npaInfo.commune} · {npaInfo.canton} · Région {npaInfo.regionId}
            </p>
          )}
          {npaError && (
            <p className="mt-1.5 text-[13px] text-red-500">{npaError}</p>
          )}
        </div>

        {/* Row 2 : Age + Franchise + Modèle */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <div>
            <label className={labelCls}>Tranche d'âge</label>
            <select
              value={ageGroup}
              onChange={e => setAgeGroup(e.target.value as AgeGroup)}
              className={inputCls}
            >
              {(Object.keys(AGE_LABELS) as AgeGroup[]).map(k => (
                <option key={k} value={k}>{AGE_LABELS[k]}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls}>Franchise</label>
            <select
              value={franchise}
              onChange={e => setFranchise(Number(e.target.value))}
              className={inputCls}
            >
              {FRANCHISES[ageGroup].map(f => (
                <option key={f} value={f}>CHF {f}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls}>Modèle d'assurance</label>
            <select
              value={modele}
              onChange={e => setModele(e.target.value as Modele)}
              className={inputCls}
            >
              {(Object.keys(MODELE_LABELS) as Modele[]).map(k => (
                <option key={k} value={k}>{MODELE_LABELS[k]}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 3 : Accident toggle (adults only) + CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {ageGroup !== 'enfant' ? (
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={accident}
                onChange={e => setAccident(e.target.checked)}
                className="w-4 h-4 rounded accent-brand cursor-pointer"
              />
              <span className="text-[14px] text-slate">Inclure couverture accident</span>
              <span className="text-[11px] text-slate/60">(si non salarié ou &lt; 8h/sem.)</span>
            </label>
          ) : (
            <p className="text-[13px] text-slate italic">
              Couverture accident incluse automatiquement pour les enfants.
            </p>
          )}

          <button
            onClick={calculate}
            disabled={!canCalculate || calcLoading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
          >
            {calcLoading ? 'Calcul en cours…' : 'Calculer mes primes →'}
          </button>
        </div>

        {calcError && (
          <p className="mt-3 text-[13px] text-red-500">{calcError}</p>
        )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Results                                                             */}
      {/* ------------------------------------------------------------------ */}
      {results !== null && (
        <div className="mt-6">
          {results.length === 0 ? (
            <div className="callout">
              Aucune offre trouvée pour cette combinaison. Essayez un autre modèle ou une autre franchise.
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-[17px] font-semibold text-ink">
                    {results.length} offres disponibles
                  </h3>
                  <p className="text-[13px] text-slate mt-0.5">
                    {npaInfo?.commune} · {MODELE_LABELS[modele]} · CHF {franchise} · {AGE_LABELS[ageGroup]}
                  </p>
                </div>
                <span className="text-[12px] text-slate">Prime brute / nette (après remboursement)</span>
              </div>

              {/* Table */}
              <div className="border border-edge rounded-xl overflow-hidden">
                <table className="w-full text-[14px]">
                  <thead>
                    <tr className="bg-cloud border-b border-edge">
                      <th className="text-left py-3 px-4 font-semibold text-slate text-[12px] uppercase tracking-wide w-8">#</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate text-[12px] uppercase tracking-wide">Assureur</th>
                      <th className="text-left py-3 px-4 font-semibold text-slate text-[12px] uppercase tracking-wide hidden sm:table-cell">Plan</th>
                      <th className="text-right py-3 px-4 font-semibold text-slate text-[12px] uppercase tracking-wide">Prime/mois</th>
                      <th className="text-right py-3 px-4 font-semibold text-slate text-[12px] uppercase tracking-wide hidden md:table-cell">Nette</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleResults!.map((row, i) => (
                      <tr
                        key={i}
                        className={`border-b border-edge last:border-0 transition-colors ${i === 0 ? 'bg-green-50' : 'bg-white hover:bg-cloud/60'}`}
                      >
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[12px] font-bold ${i === 0 ? 'bg-green-500 text-white' : 'bg-cloud text-slate'}`}>
                            {i + 1}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-ink">{row.assureur}</td>
                        <td className="py-3 px-4 text-slate hidden sm:table-cell">{row.modele_nom}</td>
                        <td className={`py-3 px-4 text-right font-bold ${i === 0 ? 'text-green-600' : 'text-ink'}`}>
                          {row.prime_mensuelle.toFixed(2)}<span className="text-[12px] font-normal text-slate"> CHF</span>
                        </td>
                        <td className="py-3 px-4 text-right text-slate hidden md:table-cell">
                          {row.prime_nette.toFixed(2)} CHF
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Lead gate */}
              {!showAll && hiddenCount > 0 && (
                <div className="mt-4 border border-brand/30 bg-white rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#dbeafe] flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-ink text-[16px] mb-1">
                        Voir les {hiddenCount} autres offres — gratuit
                      </h4>
                      <p className="text-[14px] text-slate mb-4">
                        Entrez votre prénom et email pour accéder à la comparaison complète et recevoir un récapitulatif personnalisé.
                      </p>
                      <form onSubmit={handleGate} className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="text"
                          placeholder="Votre prénom"
                          required
                          value={prenom}
                          onChange={e => setPrenom(e.target.value)}
                          className={inputCls + ' sm:max-w-[160px]'}
                        />
                        <input
                          type="email"
                          placeholder="Votre email"
                          required
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          className={inputCls + ' sm:flex-1'}
                        />
                        <button
                          type="submit"
                          disabled={gateStatus === 'loading'}
                          className="btn-primary shrink-0 disabled:opacity-50"
                        >
                          {gateStatus === 'loading' ? 'Envoi…' : 'Voir toutes les offres →'}
                        </button>
                      </form>
                      {gateStatus === 'error' && (
                        <p className="mt-2 text-[13px] text-red-500">Une erreur est survenue. Réessayez.</p>
                      )}
                      <p className="mt-2 text-[11px] text-slate/60">
                        Sans engagement · Conformément à la LPD ·{' '}
                        <a href="/politique-confidentialite" className="underline">Politique de confidentialité</a>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {showAll && (
                <div className="mt-3 flex items-center gap-2 text-[13px] text-green-600">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Récapitulatif envoyé à <strong>{email}</strong>
                </div>
              )}

              {/* Savings callout */}
              {results.length >= 2 && (
                <div className="mt-4 bg-[#eff6ff] border border-[#bfdbfe] rounded-lg p-4 flex items-center gap-3">
                  <span className="text-2xl">💡</span>
                  <p className="text-[14px] text-ink">
                    Écart entre la 1ère et la dernière offre :{' '}
                    <strong className="text-brand">
                      CHF {(results[results.length - 1].prime_mensuelle - results[0].prime_mensuelle).toFixed(2)}/mois
                    </strong>{' '}
                    soit{' '}
                    <strong className="text-brand">
                      CHF {((results[results.length - 1].prime_mensuelle - results[0].prime_mensuelle) * 12).toFixed(0)}/an
                    </strong>{' '}
                    d'économie potentielle.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </section>
  )
}
