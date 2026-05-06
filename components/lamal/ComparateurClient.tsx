'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import AuthorBio from '@/components/ui/AuthorBio'
import FAQ from '@/components/ui/FAQ'
import MultiStepLeadForm from '@/components/ui/MultiStepLeadForm'
import HeroStats from '@/components/ui/HeroStats'

// ─── Types ──────────────────────────────────────────────────────────────────

interface PrimeRow {
  assureur: string
  modele_nom: string
  prime_nette: number
}

interface NpaInfo {
  regionId: string
  canton: string
  ville: string
  commune: string
}

type Profil  = 'adulte' | 'jeune_adulte' | 'enfant'
type Modele  = 'BASE' | 'HAM' | 'HMO' | 'DIV'

// ─── Constants ───────────────────────────────────────────────────────────────

const YOB: Record<Profil, number> = { adulte: 1990, jeune_adulte: 2005, enfant: 2015 }

const FRANCHISES_ADULTE = [300, 500, 1000, 1500, 2000, 2500]
const FRANCHISES_ENFANT = [100, 200, 300, 400, 500, 600]

const MODELE_LABELS: Record<Modele, string> = {
  BASE: 'Standard',
  HAM:  'Médecin de famille',
  HMO:  'HMO',
  DIV:  'Télémédecine',
}

// ─── Data ───────────────────────────────────────────────────────────────────

const assureurs = [
  { name: 'SWICA',         part: '20.5', note: 'Leader en médecine intégrative' },
  { name: 'Helsana',       part: '18.0', note: 'Application mobile avancée, nombreuses options' },
  { name: 'Groupe Mutuel', part: '12.8', note: 'Très présent en Suisse romande' },
  { name: 'CSS',           part: '12.1', note: 'Large réseau, forte présence nationale' },
  { name: 'Visana',        part: '12.0', note: 'Forte présence romande et alémanique' },
  { name: 'Sanitas',       part: '6.8',  note: 'Forte en télémédecine et services digitaux' },
  { name: 'Concordia',     part: '5.0',  note: 'Bon service, réseau médecin de famille étendu' },
  { name: 'Assura',        part: '3.1',  note: 'Souvent la moins chère, service digital' },
]

const cantonTable = [
  { canton: 'Zoug',                code: 'ZG', prime: 403.06, economie: 700,  slug: null },
  { canton: 'Appenzell Rh.-Int.', code: 'AI', prime: 424.35, economie: 700,  slug: null },
  { canton: 'Nidwald',             code: 'NW', prime: 459.98, economie: 750,  slug: null },
  { canton: 'Uri',                 code: 'UR', prime: 463.33, economie: 750,  slug: null },
  { canton: 'Obwald',              code: 'OW', prime: 467.13, economie: 750,  slug: null },
  { canton: 'Schwyz',              code: 'SZ', prime: 484.88, economie: 800,  slug: null },
  { canton: 'Saint-Gall',          code: 'SG', prime: 495.59, economie: 850,  slug: null },
  { canton: 'Glaris',              code: 'GL', prime: 498.01, economie: 850,  slug: null },
  { canton: 'Lucerne',             code: 'LU', prime: 499.87, economie: 850,  slug: null },
  { canton: 'Appenzell Rh.-Ext.', code: 'AR', prime: 508.83, economie: 850,  slug: null },
  { canton: 'Thurgovie',           code: 'TG', prime: 508.64, economie: 850,  slug: null },
  { canton: 'Grisons',             code: 'GR', prime: 517.47, economie: 900,  slug: null },
  { canton: 'Fribourg',            code: 'FR', prime: 522.27, economie: 1099, slug: 'fribourg' },
  { canton: 'Valais',              code: 'VS', prime: 527.58, economie: 1445, slug: 'valais' },
  { canton: 'Argovie',             code: 'AG', prime: 527.98, economie: 900,  slug: null },
  { canton: 'Zurich',              code: 'ZH', prime: 530.65, economie: 950,  slug: null },
  { canton: 'Schaffhouse',         code: 'SH', prime: 535.68, economie: 950,  slug: null },
  { canton: 'Soleure',             code: 'SO', prime: 560.35, economie: 1000, slug: null },
  { canton: 'Berne',               code: 'BE', prime: 578.26, economie: 1000, slug: null },
  { canton: 'Bâle-Campagne',       code: 'BL', prime: 625.02, economie: 1050, slug: null },
  { canton: 'Jura',                code: 'JU', prime: 633.21, economie: 1390, slug: 'jura' },
  { canton: 'Vaud',                code: 'VD', prime: 637.64, economie: 1347, slug: 'vaud' },
  { canton: 'Neuchâtel',           code: 'NE', prime: 663.19, economie: 1747, slug: 'neuchatel' },
  { canton: 'Bâle-Ville',          code: 'BS', prime: 668.40, economie: 1150, slug: null },
  { canton: 'Tessin',              code: 'TI', prime: 686.10, economie: 1200, slug: null },
  { canton: 'Genève',              code: 'GE', prime: 710.41, economie: 5653, slug: 'geneve' },
]

const faqItems = [
  {
    question: 'Quelle est la caisse maladie la moins chère en Suisse ?',
    answer: "La caisse la moins chère dépend de votre canton, de votre âge et du modèle choisi. Pour un adulte avec franchise 300 CHF et modèle standard, les primes débutent à CHF 403 par mois à Zoug et atteignent CHF 710 par mois à Genève. Les écarts entre caisses dans une même région atteignent jusqu'à CHF 229 par mois.",
  },
  {
    question: 'Les prestations sont-elles identiques dans toutes les caisses ?',
    answer: "Oui. Pour la LAMal de base, les prestations sont strictement identiques chez tous les assureurs agréés par l'OFSP. Seules les primes, la qualité du service client et les options complémentaires diffèrent.",
  },
  {
    question: 'Comment économiser sur sa prime LAMal ?',
    answer: "Trois leviers principaux : choisir un modèle alternatif (médecin de famille, HMO, Télémédecine) pour jusqu'à 24% de réduction selon la caisse et le canton ; augmenter sa franchise si vous êtes en bonne santé ; changer de caisse chaque année avant le 30 novembre.",
  },
  {
    question: 'Frontalier ou expatrié, suis-je concerné par la LAMal ?',
    answer: "Les frontaliers travaillant en Suisse ont en principe le choix entre la LAMal suisse et une assurance dans leur pays de résidence. Ce droit d'option doit être exercé dans les trois mois suivant le début de l'activité. Les expatriés résidant en Suisse sont soumis à l'obligation d'affiliation dans les 90 jours suivant leur arrivée, sauf exceptions prévues par les accords bilatéraux.",
  },
  {
    question: 'Quelle est la différence entre une franchise de 300 et 2 500 CHF ?',
    answer: "Avec une franchise de 300 CHF, vous payez moins lors des soins (l'assurance prend en charge après 300 CHF de frais par an) mais votre prime mensuelle est plus élevée. Avec une franchise de 2 500 CHF, vous assumez davantage de frais médicaux en cas de maladie, mais votre prime est nettement plus basse. Ce choix est avantageux si vous êtes en bonne santé et consultez peu. En règle générale, le point mort se situe autour de 1 000 à 1 500 CHF de frais médicaux annuels.",
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmtChf(n: number, decimals = 2): string {
  return n.toLocaleString('fr-CH', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

function fmtAn(n: number): string {
  // Swiss apostrophe thousands separator, no decimals
  const s = String(Math.round(n))
  if (s.length <= 3) return s
  if (s.length <= 6) return s.slice(0, s.length - 3) + '\u2019' + s.slice(s.length - 3)
  return s.slice(0, s.length - 6) + '\u2019' + s.slice(s.length - 6, s.length - 3) + '\u2019' + s.slice(s.length - 3)
}

// ─── Info tooltip ────────────────────────────────────────────────────────────

function InfoTooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false)
  return (
    <span className="relative inline-flex ml-1.5 align-middle">
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        onClick={() => setShow(s => !s)}
        className="w-4 h-4 rounded-full bg-edge text-slate text-[10px] font-bold flex items-center justify-center hover:bg-brand hover:text-white transition-colors leading-none"
        aria-label="Information"
      >
        i
      </button>
      {show && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-[var(--navy)] text-white text-[12px] leading-relaxed rounded-lg px-3 py-2.5 shadow-xl z-50 pointer-events-none">
          {text}
          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[var(--navy)]" />
        </span>
      )}
    </span>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function ComparateurClient() {
  // — Calculator state —
  const [npa, setNpa]               = useState('')
  const [npaInfo, setNpaInfo]       = useState<NpaInfo | null>(null)
  const [npaError, setNpaError]     = useState('')
  const [npaLoading, setNpaLoading] = useState(false)
  const [franchise, setFranchise]   = useState(300)
  const [modele, setModele]         = useState<Modele>('BASE')
  const [profil, setProfil]         = useState<Profil>('adulte')
  const [accident, setAccident]     = useState(false)

  // — Results state —
  const [results, setResults]       = useState<PrimeRow[] | null>(null)
  const [calcLoading, setCalcLoading] = useState(false)
  const [calcError, setCalcError]   = useState('')
  const [showResults, setShowResults] = useState(false)

  const resultsRef = useRef<HTMLDivElement>(null)

  // Reset franchise when profil changes
  useEffect(() => {
    if (profil === 'enfant') {
      if (!FRANCHISES_ENFANT.includes(franchise)) setFranchise(100)
    } else {
      if (!FRANCHISES_ADULTE.includes(franchise)) setFranchise(300)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profil])

  // — NPA validation —
  const validateNpa = useCallback(async (value: string) => {
    setNpaLoading(true)
    setNpaError('')
    try {
      const res = await fetch(`/api/primes?npa=${value}`)
      if (res.ok) setNpaInfo(await res.json())
      else { setNpaInfo(null); setNpaError('Code postal introuvable') }
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
    setShowResults(false)
    if (digits.length === 4) validateNpa(digits)
  }

  // — Calculate —
  const calculate = async () => {
    if (!npaInfo) return
    setCalcLoading(true)
    setCalcError('')
    setResults(null)
    setShowResults(false)
    try {
      const params = new URLSearchParams({
        npa,
        yob:      String(YOB[profil]),
        franchise: String(franchise),
        accident:  String(profil === 'enfant' ? true : accident),
        modele,
      })
      const res = await fetch(`/api/primes?${params}`)
      if (!res.ok) throw new Error()
      const data = await res.json()
      const sorted: PrimeRow[] = (data.results ?? []).sort(
        (a: PrimeRow, b: PrimeRow) => a.prime_nette - b.prime_nette,
      )
      setResults(sorted)
      setShowResults(true)
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 150)
    } catch {
      setCalcError('Impossible de charger les données. Veuillez réessayer.')
    } finally {
      setCalcLoading(false)
    }
  }

  const franchises = profil === 'enfant' ? FRANCHISES_ENFANT : FRANCHISES_ADULTE
  const maxPrime   = results ? results[results.length - 1].prime_nette : 0

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-edge pt-10 pb-12">
        <div className="container-xl">
          <Breadcrumb items={[
            { label: 'Accueil', href: '/' },
            { label: 'LAMal', href: '/lamal' },
            { label: 'Comparateur de caisses' },
          ]} />
          <h1 className="text-4xl sm:text-5xl font-bold text-ink leading-tight mb-4 max-w-3xl">
            Comparateur de caisses maladie LAMal 2026
          </h1>
          <p className="text-[18px] text-slate max-w-2xl leading-relaxed mb-10">
            En Suisse, les primes LAMal varient jusqu'à 97% au sein d'une même région selon l'assureur choisi.
            Comparez toutes les caisses selon votre code postal, votre franchise et votre modèle d'assurance.
          </p>
          {/* StatsGrid */}
          <HeroStats stats={[
            { value: '34 caisses',  label: 'Comparées en temps réel',  sub: 'Données officielles OFSP 2026'      },
            { value: 'CHF 5 653',   label: 'Économie possible par an', sub: 'Canton de Genève, tous profils confondus'  },
            { value: '97%',         label: 'Écart de prime possible',  sub: 'Entre caisses dans une même région' },
          ]} className="mb-8" />
        </div>
      </section>

      {/* ── OUTIL DE COMPARAISON ──────────────────────────────────────────── */}
      <section className="bg-white border-b border-edge py-12">
        <div className="container-xl">

          {/* Form */}
          <div className="bg-white border border-edge rounded-xl p-6 sm:p-8 shadow-sm">

            {/* Ligne 1 — 3 colonnes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">

              {/* NPA */}
              <div>
                <label className="block text-[13px] font-medium text-ink mb-1.5">
                  Code postal (NPA)
                </label>
                <div className="relative">
                  <input
                    type="text" inputMode="numeric" maxLength={4}
                    value={npa}
                    onChange={e => handleNpaChange(e.target.value)}
                    placeholder="1000"
                    className={`input-field ${npaError ? 'border-red-400' : ''}`}
                  />
                  {npaLoading && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                  )}
                </div>
                {npaInfo && (
                  <p className="mt-1 text-[12px] text-brand font-medium">
                    {npaInfo.ville}, région {npaInfo.regionId}
                  </p>
                )}
                {npaError && <p className="mt-1 text-[12px] text-red-500">{npaError}</p>}
              </div>

              {/* Franchise */}
              <div>
                <label className="block text-[13px] font-medium text-ink mb-1.5">
                  Franchise
                </label>
                <div className="relative">
                  <select
                    value={franchise}
                    onChange={e => setFranchise(Number(e.target.value))}
                    className="select-field pr-9"
                  >
                    {franchises.map(f => (
                      <option key={f} value={f}>
                        {f.toLocaleString('fr-CH')} CHF
                      </option>
                    ))}
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Modèle */}
              <div>
                <label className="flex items-center text-[13px] font-medium text-ink mb-1.5">
                  Modèle d'assurance
                  <InfoTooltip text="Standard : libre choix du médecin et spécialiste. Médecin de famille (−15 %) : passage obligatoire par votre médecin traitant. HMO (−18 %) : soins via le réseau HMO. Télémédecine (−20 %) : première consultation par téléphone. Les réductions varient selon la caisse et le canton." />
                </label>
                <div className="relative">
                  <select
                    value={modele}
                    onChange={e => setModele(e.target.value as Modele)}
                    className="select-field pr-9"
                  >
                    {(Object.entries(MODELE_LABELS) as [Modele, string][]).map(([k, v]) => (
                      <option key={k} value={k}>{v}</option>
                    ))}
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Ligne 2 — 2 colonnes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

              {/* Profil */}
              <div>
                <label className="block text-[13px] font-medium text-ink mb-1.5">
                  Profil
                </label>
                <div className="relative">
                  <select
                    value={profil}
                    onChange={e => setProfil(e.target.value as Profil)}
                    className="select-field pr-9"
                  >
                    <option value="adulte">Adulte (26 ans et plus)</option>
                    <option value="jeune_adulte">Jeune adulte (19 à 25 ans)</option>
                    <option value="enfant">Enfant (0 à 18 ans)</option>
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Couverture accident (masquée pour enfant) */}
              {profil !== 'enfant' && (
                <div>
                  <label className="flex items-center text-[13px] font-medium text-ink mb-1.5">
                    Couverture accident
                    <InfoTooltip text="Les salariés travaillant plus de 8 heures par semaine chez un employeur sont couverts pour les accidents via la LAA. Si vous êtes indépendant ou travaillez moins de 8h/semaine, sélectionnez 'Avec couverture accident'." />
                  </label>
                  <div className="relative">
                    <select
                      value={accident ? 'oui' : 'non'}
                      onChange={e => setAccident(e.target.value === 'oui')}
                      className="select-field pr-9"
                    >
                      <option value="non">Sans couverture accident</option>
                      <option value="oui">Avec couverture accident</option>
                    </select>
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              onClick={calculate}
              disabled={!npaInfo || calcLoading}
              className="w-full bg-brand hover:bg-brand-dark disabled:bg-slate text-white font-semibold py-4 rounded-md transition-colors duration-150 text-[16px] flex items-center justify-center gap-2"
            >
              {calcLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Calcul en cours…
                </>
              ) : (
                'Comparer les primes →'
              )}
            </button>

            {calcError && (
              <p className="mt-3 text-[13px] text-red-500 text-center">{calcError}</p>
            )}
          </div>

          {/* ── Résultats ────────────────────────────────────────────────── */}
          {showResults && results && results.length > 0 && (
            <div ref={resultsRef} className="mt-6">

              {/* En-tête résultats */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <p className="text-[14px] text-slate">
                  <span className="font-semibold text-ink">{npaInfo?.ville}</span>
                  {npaInfo && <> ({npaInfo.regionId})</>}
                  {', '}Franchise {franchise.toLocaleString('fr-CH')} CHF
                  {', '}{MODELE_LABELS[modele]}
                </p>
                <p className="text-[13px] font-medium text-slate shrink-0">
                  {results.length} caisses comparées
                </p>
              </div>

              {/* Liste des caisses — top 5 + référence */}
              {(() => {
                const totalCount = results.length
                const displayRows = totalCount > 6
                  ? [...results.slice(0, 5), results[totalCount - 1]]
                  : results
                return (
                  <div className="space-y-2">
                    {displayRows.map((row, i) => {
                      const isFirst   = i === 0
                      const isRef     = i === displayRows.length - 1 && totalCount > 6
                      const realRank  = isRef ? totalCount : i + 1
                      const economieAn = Math.round((maxPrime - row.prime_nette) * 12)

                      return (
                        <div
                          key={`${row.assureur}-${i}`}
                          className={`flex items-center gap-3 sm:gap-4 px-4 py-3.5 rounded-[8px] border transition-all ${
                            isFirst
                              ? 'border-brand bg-[var(--blue-tint)]'
                              : isRef
                              ? 'border-edge bg-cloud opacity-60'
                              : 'border-edge bg-white'
                          }`}
                        >
                          {/* Rang */}
                          <div className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-[12px] font-bold ${
                            isFirst ? 'bg-brand text-white' : 'bg-edge text-slate'
                          }`}>
                            {realRank}
                          </div>

                          {/* Nom + badge */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`font-medium text-[14px] sm:text-[15px] ${isFirst ? 'text-brand' : 'text-ink'}`}>
                                {row.assureur}
                              </span>
                              {isFirst && (
                                <span className="text-[11px] font-semibold bg-brand text-white px-2 py-0.5 rounded-full">
                                  Meilleur prix
                                </span>
                              )}
                              {isRef && (
                                <span className="text-[11px] text-slate/60">Référence</span>
                              )}
                            </div>
                          </div>

                          {/* Prix */}
                          <div className="text-right shrink-0">
                            <p className={`font-semibold text-[15px] ${isFirst ? 'text-brand' : 'text-ink'}`}>
                              CHF {fmtChf(row.prime_nette)}
                            </p>
                            <p className="text-[11px] text-slate">par mois</p>
                          </div>

                          {/* Économie */}
                          {!isRef && economieAn > 0 && (
                            <div className="text-right shrink-0 hidden sm:block">
                              <p className="text-[13px] font-semibold text-brand">
                                CHF {fmtAn(economieAn)}
                              </p>
                              <p className="text-[11px] text-slate">par an</p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )
              })()}

              <p className="mt-3 text-[12px] text-slate/60">
                Source : Office fédéral de la santé publique (OFSP) 2026. Primes nettes après remboursements.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── CONVERSION POST-RÉSULTATS ──────────────────────────────────────── */}
      {showResults && (
        <section className="bg-[#0f2040] border-b border-white/10 py-12">
          <div className="container-xl max-w-2xl text-center">
            <p className="text-[16px] text-white/80 mb-8 leading-relaxed">
              Un expert confirme la caisse optimale pour votre profil, vérifie vos droits aux subsides et gère le changement à votre place.
            </p>
            <MultiStepLeadForm redirectOnSuccess="/fr/merci" />
          </div>
        </section>
      )}

      {/* ── PARTS DE MARCHÉ ───────────────────────────────────────────────── */}
      <section id="assureurs" className="bg-white border-b border-edge py-16">
        <div className="container-xl">

          <h2 className="article-h2 !mt-0">
            1. Quels assureurs dominent le marché suisse ?
          </h2>
          <p className="article-p mb-10">
            8 groupes se partagent la totalité du marché de l'assurance maladie obligatoire en Suisse.
            Les prestations LAMal sont strictement identiques chez tous les assureurs agréés.
            La différence porte uniquement sur le prix et la qualité du service.
          </p>

          {/* Grille top 4 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {assureurs.slice(0, 4).map(a => (
              <div key={a.name} className="bg-white border border-edge rounded-xl p-5">
                <p className="font-semibold text-ink text-[16px] mb-1">{a.name}</p>
                <p className="text-2xl font-bold text-ink mb-2">{a.part}%</p>
                <p className="text-[13px] text-slate leading-snug">{a.note}</p>
              </div>
            ))}
          </div>

          {/* Tableau complet */}
          <div className="border border-edge rounded-[8px] overflow-hidden">
            <table className="stripe-table w-full">
              <thead>
                <tr>
                  <th className="text-left whitespace-nowrap">Assureur</th>
                  <th className="text-left whitespace-nowrap">Part de marché</th>
                  <th className="hidden sm:table-cell text-left whitespace-nowrap">Caractéristiques</th>
                </tr>
              </thead>
              <tbody>
                {assureurs.map(a => (
                  <tr key={a.name}>
                    <td className="font-semibold text-ink">{a.name}</td>
                    <td className="font-medium text-brand">{a.part}%</td>
                    <td className="hidden sm:table-cell text-slate">{a.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-[12px] text-slate/60">
            Source : FINMA 2024. Ce tableau représente les parts de marché des assureurs maladie en Suisse.
          </p>
        </div>
      </section>

      {/* ── PRIMES MOYENNES PAR CANTON ────────────────────────────────────── */}
      <section id="primes" className="bg-white border-b border-edge py-16">
        <div className="container-xl">

          <h2 className="article-h2 !mt-0">
            2. Quelle est la prime LAMal dans votre canton ?
          </h2>
          <p className="article-p mb-8">
            Primes de référence pour un adulte de 35 ans, modèle standard, franchise 300 CHF, sans couverture accident.
            Les écarts entre caisses au sein d'un même canton peuvent atteindre plusieurs centaines de francs par mois.
          </p>

          {/* Tableau cantons avec barres */}
          {(() => {
            const maxP = cantonTable[cantonTable.length - 1].prime
            return (
              <div className="space-y-1 mb-4">
                {cantonTable.map((row, i) => {
                  const barPct = Math.round((row.prime / maxP) * 100)
                  const isMin  = false
                  return (
                    <div
                      key={row.code}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg ${isMin ? 'bg-cloud border border-edge' : 'bg-white border border-edge'}`}
                    >
                      {/* Badge code */}
                      <span className={`w-9 shrink-0 text-center py-0.5 rounded text-[11px] font-bold ${isMin ? 'bg-brand text-white' : 'bg-[var(--navy)] text-white'}`}>
                        {row.code}
                      </span>
                      {/* Canton + barre */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className={`text-[13px] font-medium truncate ${isMin ? 'text-brand' : 'text-ink'}`}>
                            {row.canton}
                          </span>
                          <span className={`text-[13px] font-semibold shrink-0 ${isMin ? 'text-brand' : 'text-ink'}`}>
                            CHF {fmtChf(row.prime)}
                          </span>
                        </div>
                        <div className="h-1.5 bg-edge rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${isMin ? 'bg-brand' : 'bg-brand'}`}
                            style={{ width: `${barPct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })()}

          <p className="text-[12px] text-slate/60 mb-6">Source : OFSP 2026.</p>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-edge py-16">
        <div className="container-xl">
          <FAQ items={faqItems} title="3. Vos questions sur la prime LAMal" />
        </div>
      </section>

      {/* ── FORMULAIRE ────────────────────────────────────────────────────── */}
      <div id="contact" className="scroll-mt-20 bg-white border-b border-edge py-12">
        <div className="container-xl">
          <h2 className="text-2xl font-semibold text-ink mb-3">Besoin d'aide ?</h2>
          <p className="text-[16px] text-slate mb-6 leading-relaxed">
            Un expert vous rappelle sous 24 heures pour comparer les caisses adaptées à votre profil.
            Gratuit, sans engagement.
          </p>
          <MultiStepLeadForm redirectOnSuccess="/fr/merci" />
        </div>
      </div>

      {/* ── AUTEUR + GUIDES ───────────────────────────────────────────────── */}
      <div className="container-xl py-12 space-y-8">
        <AuthorBio publishedDate="1er janvier 2026" updatedDate="22 avril 2026" />

        <section className="pt-8 border-t border-edge">
          <p className="text-[13px] font-semibold text-slate uppercase tracking-widest mb-4">
            Guides associés
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: '/lamal/guide',             label: 'Comprendre la LAMal'       },
              { href: '/lamal/franchise',         label: 'Choisir sa franchise'      },
              { href: '/lamal/subsides',          label: 'Calculateur de subsides'   },
              { href: '/lamal/changer-de-caisse', label: 'Changer de caisse maladie' },
            ].map(({ href, label }) => (
              <Link key={href} href={href}
                className="flex items-center gap-2 text-[14px] text-slate hover:text-brand border border-edge rounded-[8px] px-4 py-3 transition-colors hover:border-brand/30">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
