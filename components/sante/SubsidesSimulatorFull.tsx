'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  type Canton, type Situation, type SubsideResult,
  calculerSubsideGE, calculerSubsideVS, calculerSubsideNE,
  calculerSubsideVD, calculerSubsideJU, calculerSubsideFR,
} from '@/lib/sante/calcul-subside'
import { SUBSIDES_2026, type CantonSubside2026 } from '@/data/sante/cantons'
import LeadFormModal from '@/components/ui/LeadFormModal'

// ─── Data ────────────────────────────────────────────────────────────────────

const PRECISE_CANTONS = new Set<string>(['GE', 'VS', 'NE', 'VD', 'JU', 'FR'])

const NON_DATE_DELAI = new Set([
  'Non requis (automatique)',
  'Pas de délai annuel fixe (droit dès le 1er jour du 2e mois suivant le dépôt)', // VD
  'Pas de délai fixe (droit dès le mois suivant le dépôt)',                        // BS
  '31 oct. 2025 (ordonnaire) ; arrivants de l\'étranger et revenus en baisse –25% : jusqu\'au 31 déc. 2026', // LU — délai ordinaire dépassé
  '31 déc. 2025 (droit dès janv. 2026) ; hors délai : droit dès M+2',             // TI — dépassé
  '31 déc. 2025',                                                                   // AG — dépassé
])

const ALL_CODES = Object.keys(SUBSIDES_2026).sort((a, b) =>
  SUBSIDES_2026[a as keyof typeof SUBSIDES_2026].nom.localeCompare(
    SUBSIDES_2026[b as keyof typeof SUBSIDES_2026].nom, 'fr'
  )
)

// ─── Délais helpers ──────────────────────────────────────────────────────────

const FR_MOIS: Record<string, number> = {
  'janv.': 0, 'févr.': 1, 'mars': 2, 'avr.': 3, 'mai': 4, 'juin': 5,
  'juil.': 6, 'août': 7, 'sept.': 8, 'oct.': 9, 'nov.': 10, 'déc.': 11,
}

function parseDelai(delai: string): Date | null {
  const m = delai.match(/(\d{1,2})\s+(janv\.|févr\.|mars|avr\.|mai|juin|juil\.|août|sept\.|oct\.|nov\.|déc\.)\s+(\d{4})/)
  if (!m) return null
  return new Date(parseInt(m[3]), FR_MOIS[m[2]], parseInt(m[1]))
}

function DelaiInfo({ data }: { data: CantonSubside2026 }) {
  const today = new Date()

  if (data.auto) {
    return (
      <div className="space-y-1.5">
        <p className="text-[14px] font-semibold text-ink">Versement automatique — aucune démarche requise</p>
        <p className="text-[14px] text-slate leading-relaxed">
          Le subside est calculé sur la base de votre taxation et déduit directement de votre prime chaque mois pour toute l&apos;année civile 2026.
        </p>
        {data.retroactivite && (
          <p className="text-[13px] text-slate/60 leading-relaxed">{data.retroactivite}</p>
        )}
      </div>
    )
  }

  if (data.delai.startsWith('Pas de délai')) {
    const isM2 = data.delai.includes('2e mois')
    return (
      <div className="space-y-1.5">
        <p className="text-[14px] font-semibold text-ink">Pas de date butoir — déposez à tout moment</p>
        <p className="text-[14px] text-slate leading-relaxed">
          Le droit s&apos;ouvre {isM2
            ? 'le 1er jour du 2e mois suivant le dépôt'
            : 'le mois suivant le dépôt'} de votre dossier.
          Le subside est ensuite déduit chaque mois de votre prime.
        </p>
        <p className="text-[13px] text-slate/60">
          Pas de rétroactivité au 1er janvier — chaque mois sans dossier déposé est définitivement perdu.
        </p>
      </div>
    )
  }

  const deadline = parseDelai(data.delai)
  const isPast   = deadline ? today > deadline : false

  if (isPast) {
    return (
      <div className="space-y-1.5">
        <p className="text-[14px] font-semibold" style={{ color: '#b45309' }}>
          Délai dépassé ({data.delai})
        </p>
        <p className="text-[14px] text-slate leading-relaxed">
          {data.retroactivite
            ?? 'Renseignez-vous auprès du service cantonal pour connaître vos options en cours d\'année.'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-1.5">
      <p className="text-[14px] font-semibold text-ink">
        Démarche à effectuer avant le <span className="text-brand">{data.delai}</span>
      </p>
      {data.retroactivite && (
        <p className="text-[14px] text-slate leading-relaxed">{data.retroactivite}</p>
      )}
    </div>
  )
}

// ─── Calcul standard ─────────────────────────────────────────────────────────

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

function Chevron() {
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
  const [offerOpen, setOfferOpen] = useState(false)

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
    <div className="bg-white border border-edge rounded-xl overflow-hidden">

      {/* ── Formulaire ── */}
      <div className="px-6 py-6 space-y-5">

        {/* Row 1 : canton + revenu */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-[16px] font-medium text-ink mb-2">
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
              <Chevron />
            </div>
            {showNoFormula && cantonData && (
              <p className="text-[13px] text-slate/60 mt-1.5">
                Le canton de {cantonData.nom} n&apos;a pas publié de barème standard — consultez directement le service cantonal.
              </p>
            )}
          </div>

          <div>
            <label className="block text-[16px] font-medium text-ink mb-2">
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
            <p className="text-[13px] text-slate/60 mt-1.5">
              Revenu net fiscal — en cas de doute, utilisez votre revenu imposable.
            </p>
          </div>
        </div>

        {/* Row 2 : âge + situation + enfants */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[16px] font-medium text-ink mb-2">
              Âge
            </label>
            <div className="relative">
              <select
                value={form.isJeune ? 'jeune' : 'adulte'}
                onChange={e => set({ isJeune: e.target.value === 'jeune' })}
                className="select-field pr-9"
              >
                <option value="adulte">Adulte (26 ans et plus)</option>
                <option value="jeune">Jeune adulte (19 à 25 ans)</option>
              </select>
              <Chevron />
            </div>
          </div>

          <div>
            <label className="block text-[16px] font-medium text-ink mb-2">
              Situation familiale
            </label>
            <div className="relative">
              <select
                value={form.situation}
                onChange={e => set({ situation: e.target.value as Situation })}
                className="select-field pr-9"
              >
                <option value="seul">Personne seule</option>
                <option value="couple">Couple</option>
              </select>
              <Chevron />
            </div>
          </div>

          <div>
            <label className="block text-[16px] font-medium text-ink mb-2">
              Enfants à charge
            </label>
            <div className="relative">
              <select
                value={form.nbEnfants}
                onChange={e => set({ nbEnfants: parseInt(e.target.value) })}
                className="select-field pr-9"
              >
                {[0, 1, 2, 3, 4].map(n => (
                  <option key={n} value={n}>{n === 0 ? 'Aucun' : `${n} enfant${n > 1 ? 's' : ''}`}</option>
                ))}
              </select>
              <Chevron />
            </div>
          </div>
        </div>

        {/* Bouton */}
        <button
          onClick={() => { if (form.canton) setSubmitted(true) }}
          disabled={!form.canton}
          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Calculer mon subside
        </button>

      </div>

      {/* ── Résultats ── */}
      {submitted && cantonData && (
        <div style={{ borderTop: '0.5px solid var(--border)' }}>
          <div className="px-3 sm:px-6 py-6 space-y-4">

            {/* Revenu manquant */}
            {showResult && !hasRevenu && (
              <p className="text-[16px] text-red-600">
                Entrez votre revenu déterminant pour obtenir une estimation chiffrée.
              </p>
            )}

            {/* Non éligible */}
            {showResult && hasRevenu && result && ineligible && (
              <div className="flex items-center gap-3 rounded-[8px] border border-edge bg-cloud px-5 py-4">
                <div className="w-9 h-9 rounded-full bg-white border border-edge flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-slate/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-ink text-[16px]">Revenu hors barème</p>
                  <p className="text-[16px] text-slate mt-0.5">
                    Votre revenu dépasse le seuil d&apos;éligibilité dans le canton de {cantonData.nom}.
                  </p>
                </div>
              </div>
            )}

            {/* Résultat chiffré */}
            {showResult && hasRevenu && result && hasAmount && (
              <div className="rounded-[8px] bg-[var(--blue-tint)] border border-brand/20 overflow-hidden">

                {/* En-tête : montant à gauche, canton à droite (desktop) */}
                <div className="px-4 sm:px-6 py-5 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <span className="inline-flex items-center bg-brand text-white text-[11px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full mb-2">
                      Estimation subside mensuel
                    </span>
                    <p className="text-4xl font-bold text-ink">
                      CHF {fmt(result.total)}
                      <span className="text-[16px] font-normal text-slate ml-2">/mois</span>
                    </p>
                    <p className="text-[16px] text-slate mt-1.5">
                      soit environ CHF {fmt(result.total * 12)} par an déduits de votre prime
                    </p>
                    <span className="flex items-center gap-1.5 mt-2 text-[16px] text-slate">
                      {cantonData.auto ? (
                        <>
                          <svg className="w-3.5 h-3.5 text-brand shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Versé automatiquement</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-3.5 h-3.5 text-slate shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="9" />
                            <path d="M12 7v5l3 3" />
                          </svg>
                          <span>Sur demande — voir détails ci-dessous</span>
                        </>
                      )}
                    </span>
                  </div>
                  <div className="hidden sm:block text-right shrink-0">
                    <p className="text-[16px] font-semibold text-ink">{cantonData.nom}</p>
                    <p className="text-[16px] text-slate">Barème 2026</p>
                  </div>
                </div>


                {/* Délais & démarches */}
                <div className="border-t border-brand/10 px-4 sm:px-6 py-4">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-slate/40 mb-2.5">Délais & démarches</p>
                  <DelaiInfo data={cantonData} />
                </div>

                {/* Disclaimer + CTA */}
                <div className="border-t border-brand/10 px-4 sm:px-6 py-5 space-y-4">
                  <div>
                    <span className="inline-flex items-center bg-brand text-white text-[11px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full mb-2">
                      Estimation indicative
                    </span>
                    <p className="text-[16px] text-slate leading-relaxed">
                      Les conditions varient selon votre canton et votre situation fiscale. Comme chaque situation est unique, un expert peut vérifier votre éligibilité et vous accompagner dans vos démarches, gratuitement et sans engagement.
                    </p>
                  </div>
                  <button
                    onClick={() => setOfferOpen(true)}
                    className="hidden md:flex w-full bg-white border border-edge rounded-lg px-5 py-3 items-center justify-center gap-2 text-[16px] font-semibold text-brand hover:bg-cloud transition-colors"
                  >
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                      <path d="M3 21v-2a4 4 0 0 1 4-4h4" />
                      <path d="m16 19 2 2 4-4" />
                    </svg>
                    Faire vérifier mon dossier par un expert →
                  </button>
                  <Link
                    href="/devis"
                    className="md:hidden flex w-full bg-white border border-edge rounded-lg px-5 py-3 items-center justify-center text-[16px] font-semibold text-brand"
                  >
                    Vérifier mes droits →
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      <LeadFormModal open={offerOpen} onClose={() => setOfferOpen(false)} />
    </div>
  )
}
