'use client'

import { useState } from 'react'
import {
  type Canton, type Situation, type SubsideResult,
  calculerSubsideGE, calculerSubsideVS, calculerSubsideNE,
  calculerSubsideVD, calculerSubsideJU,
} from '@/lib/lamal/calcul-subside'

// ─── Data ────────────────────────────────────────────────────────────────────

interface CantonData {
  nom: string
  seuilRevenu: string
  seuilNum?: number     // seuil personne seule — absent = formule propriétaire (ZH, TI)
  montantMaxNum: number // CHF/mois adulte seul au plafond
  montantMax: string    // libellé affiché
  auto: boolean
  delai: string
  lien: string
  primeMoyenne: number
}

const CANTON_DATA: Record<string, CantonData> = {
  AG: { nom: 'Argovie',             seuilRevenu: '≈ 40 000 CHF/an', seuilNum: 40000, montantMaxNum: 486, montantMax: '≤ 486 CHF/mois', auto: false, delai: '30 sept. 2026',           lien: 'https://www.ag.ch',                                                                             primeMoyenne: 419 },
  AI: { nom: 'Appenzell Rh.-Int.',  seuilRevenu: '≈ 36 000 CHF/an', seuilNum: 36000, montantMaxNum: 387, montantMax: '≤ 387 CHF/mois', auto: false, delai: '31 déc. 2026',              lien: 'https://www.ai.ch',                                                                             primeMoyenne: 382 },
  AR: { nom: 'Appenzell Rh.-Ext.',  seuilRevenu: '≈ 40 000 CHF/an', seuilNum: 40000, montantMaxNum: 502, montantMax: '≤ 502 CHF/mois', auto: false, delai: '31 déc. 2026',              lien: 'https://www.ar.ch',                                                                             primeMoyenne: 432 },
  BE: { nom: 'Berne',               seuilRevenu: '≈ 50 000 CHF/an', seuilNum: 50000, montantMaxNum: 221, montantMax: '≤ 221 CHF/mois', auto: false, delai: '31 déc. 2026',              lien: 'https://www.be.ch/de/start/themen/soziales/praemienverbilligung.html',                        primeMoyenne: 397 },
  BL: { nom: 'Bâle-Campagne',       seuilRevenu: '≈ 38 000 CHF/an', seuilNum: 38000, montantMaxNum: 466, montantMax: '≤ 466 CHF/mois', auto: false, delai: '31 déc. 2026',              lien: 'https://www.bl.ch',                                                                             primeMoyenne: 466 },
  BS: { nom: 'Bâle-Ville',          seuilRevenu: '≈ 38 000 CHF/an', seuilNum: 38000, montantMaxNum: 444, montantMax: '≤ 444 CHF/mois', auto: false, delai: '31 déc. 2026',              lien: 'https://www.bs.ch',                                                                             primeMoyenne: 500 },
  FR: { nom: 'Fribourg',            seuilRevenu: '≈ 37 000 CHF/an', seuilNum: 37000, montantMaxNum: 522, montantMax: '≤ 522 CHF/mois', auto: false, delai: '31 août 2026',              lien: 'https://www.ecasfr.ch/fr/Assurances/Reduction-des-primes-d-assurance-maladie/Reduction-des-primes-d-assurance-maladie.html', primeMoyenne: 522 },
  GE: { nom: 'Genève',              seuilRevenu: '≈ 50 000 CHF/an', seuilNum: 50000, montantMaxNum: 348, montantMax: '≤ 348 CHF/mois', auto: true,  delai: 'Non requis (automatique)', lien: 'https://www.ge.ch/informations-generales-subside-assurance-maladie',                             primeMoyenne: 710 },
  GL: { nom: 'Glaris',              seuilRevenu: '≈ 36 000 CHF/an', seuilNum: 36000, montantMaxNum: 454, montantMax: '≤ 454 CHF/mois', auto: false, delai: '31 déc. 2026',              lien: 'https://www.gl.ch',                                                                             primeMoyenne: 345 },
  GR: { nom: 'Grisons',             seuilRevenu: '≈ 40 000 CHF/an', seuilNum: 40000, montantMaxNum: 493, montantMax: '≤ 493 CHF/mois', auto: false, delai: '31 déc. 2026',              lien: 'https://www.gr.ch',                                                                             primeMoyenne: 390 },
  JU: { nom: 'Jura',                seuilRevenu: '≈ 27 000 CHF/an', seuilNum: 27000, montantMaxNum: 568, montantMax: '≤ 568 CHF/mois', auto: false, delai: '31 déc. 2026',              lien: 'https://www.ecasjura.ch/fr/Assurances/Assurance-maladie',                                        primeMoyenne: 633 },
  LU: { nom: 'Lucerne',             seuilRevenu: '≈ 42 000 CHF/an', seuilNum: 42000, montantMaxNum: 469, montantMax: '≤ 469 CHF/mois', auto: false, delai: '31 déc. 2026',              lien: 'https://www.lu.ch/verwaltung/ASD/sa',                                                           primeMoyenne: 395 },
  NE: { nom: 'Neuchâtel',           seuilRevenu: '≈ 65 000 CHF/an', seuilNum: 65000, montantMaxNum: 643, montantMax: '≤ 643 CHF/mois', auto: true,  delai: 'Non requis (automatique)', lien: 'https://www.ne.ch/themes/social/assurance-maladie/subsides-assurance-maladie-lamal',             primeMoyenne: 663 },
  NW: { nom: 'Nidwald',             seuilRevenu: '≈ 32 000 CHF/an', seuilNum: 32000, montantMaxNum: 450, montantMax: '≤ 450 CHF/mois', auto: false, delai: '31 déc. 2026',              lien: 'https://www.nw.ch',                                                                             primeMoyenne: 288 },
  OW: { nom: 'Obwald',              seuilRevenu: '≈ 32 000 CHF/an', seuilNum: 32000, montantMaxNum: 418, montantMax: '≤ 418 CHF/mois', auto: false, delai: '31 déc. 2026',              lien: 'https://www.ow.ch',                                                                             primeMoyenne: 303 },
  SG: { nom: 'Saint-Gall',          seuilRevenu: '≈ 42 000 CHF/an', seuilNum: 42000, montantMaxNum: 524, montantMax: '≤ 524 CHF/mois', auto: false, delai: '31 mars 2026',              lien: 'https://www.sg.ch/gesundheit-soziales/soziales/individuelle-praemienverbilligung.html',          primeMoyenne: 430 },
  SH: { nom: 'Schaffhouse',         seuilRevenu: '≈ 38 000 CHF/an', seuilNum: 38000, montantMaxNum: 322, montantMax: '≤ 322 CHF/mois', auto: false, delai: '31 déc. 2026',              lien: 'https://www.sh.ch',                                                                             primeMoyenne: 431 },
  SO: { nom: 'Soleure',             seuilRevenu: '≈ 38 000 CHF/an', seuilNum: 38000, montantMaxNum: 422, montantMax: '≤ 422 CHF/mois', auto: false, delai: '31 déc. 2026',              lien: 'https://www.so.ch',                                                                             primeMoyenne: 387 },
  SZ: { nom: 'Schwytz',             seuilRevenu: '≈ 38 000 CHF/an', seuilNum: 38000, montantMaxNum: 465, montantMax: '≤ 465 CHF/mois', auto: false, delai: '31 déc. 2026',              lien: 'https://www.sz.ch',                                                                             primeMoyenne: 347 },
  TG: { nom: 'Thurgovie',           seuilRevenu: '≈ 38 000 CHF/an', seuilNum: 38000, montantMaxNum: 360, montantMax: '≤ 360 CHF/mois', auto: false, delai: '31 mars 2026',              lien: 'https://www.tg.ch',                                                                             primeMoyenne: 360 },
  TI: { nom: 'Tessin',              seuilRevenu: 'Formule cantonale',                 montantMaxNum: 531, montantMax: '≤ 668 CHF/mois', auto: false, delai: '31 déc. 2026',              lien: 'https://www.ti.ch',                                                                             primeMoyenne: 531 },
  UR: { nom: 'Uri',                 seuilRevenu: '≈ 32 000 CHF/an', seuilNum: 32000, montantMaxNum: 364, montantMax: '≤ 364 CHF/mois', auto: false, delai: '31 déc. 2026',              lien: 'https://www.ur.ch',                                                                             primeMoyenne: 310 },
  VD: { nom: 'Vaud',                seuilRevenu: '≈ 50 000 CHF/an', seuilNum: 50000, montantMaxNum: 331, montantMax: '≤ 331 CHF/mois', auto: false, delai: 'Voir OVAM 2026',            lien: 'https://www.vd.ch/sante-soins-et-handicap/assurance-maladie/subside-a-lassurance-maladie',    primeMoyenne: 638 },
  VS: { nom: 'Valais',              seuilRevenu: '≈ 38 500 CHF/an', seuilNum: 38500, montantMaxNum: 521, montantMax: '≤ 521 CHF/mois', auto: true,  delai: 'Non requis (automatique)', lien: 'https://www.avsvalais.ch/fr/Assurances/RIP-Reduction-individuelle-des-primes-d-assurance-maladie', primeMoyenne: 528 },
  ZG: { nom: 'Zoug',                seuilRevenu: '≈ 36 000 CHF/an', seuilNum: 36000, montantMaxNum: 415, montantMax: '≤ 415 CHF/mois', auto: false, delai: '31 mars 2026',              lien: 'https://www.zg.ch/behoerden/soziale-einrichtungen/jugendamt/individuelle-praemienverbilligung', primeMoyenne: 360 },
  ZH: { nom: 'Zurich',              seuilRevenu: 'Formule cantonale',                 montantMaxNum: 442, montantMax: '≤ 252 CHF/mois', auto: false, delai: '31 mars 2026',              lien: 'https://www.zh.ch/de/soziales/individuelle-praemienverbilligung.html',                         primeMoyenne: 442 },
}

// Cantons avec formule officielle précise publiée
const PRECISE_CANTONS = new Set<string>(['GE', 'VS', 'NE', 'VD', 'JU'])

const ALL_CODES = Object.keys(CANTON_DATA).sort((a, b) =>
  CANTON_DATA[a].nom.localeCompare(CANTON_DATA[b].nom, 'fr')
)

// ─── Calcul standard (interpolation linéaire) ─────────────────────────────────
// Utilisé pour les 18 cantons hors Suisse romande précise + FR
// seuilNum = seuil personne seule ; l'ajustement situation/enfants/âge est appliqué

function calculerSubsideStd(
  revenu: number,
  data: CantonData,
  situation: Situation,
  nbEnfants: number,
  isJeune: boolean,
): SubsideResult {
  const seuilBase = data.seuilNum!
  // Ajustement du seuil selon situation familiale et enfants
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
  data: CantonData,
  situation: Situation,
  nbEnfants: number,
  isJeune: boolean,
): SubsideResult | null {
  if (!data.seuilNum) return null  // ZH, TI : formule non publiée
  if (revenu <= 0) return null

  switch (canton as Canton) {
    case 'GE': return calculerSubsideGE(revenu, situation, nbEnfants, isJeune)
    case 'VS': return calculerSubsideVS(revenu, situation, nbEnfants, isJeune)
    case 'NE': return calculerSubsideNE(revenu, situation, nbEnfants, isJeune)
    case 'VD': return calculerSubsideVD(revenu, situation, nbEnfants, isJeune)
    case 'JU': return calculerSubsideJU(revenu, situation, nbEnfants, isJeune)
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

  const set = (patch: Partial<FormState>) => setForm(f => ({ ...f, ...patch }))

  const cantonData = form.canton ? CANTON_DATA[form.canton] : null
  const hasSeuilNum = Boolean(cantonData?.seuilNum)
  const revNum      = parseInt(form.revenu.replace(/['\s]/g, '')) || 0
  const hasRevenu   = revNum > 0

  const result = (cantonData && hasRevenu)
    ? computeResult(revNum, form.canton, cantonData, form.situation, form.nbEnfants, form.isJeune)
    : null

  const ineligible = result !== null && result.total === 0
  const hasAmount  = result !== null && result.total > 0

  // Cantons ZH/TI : afficher l'info dès la sélection
  const showNoFormula = Boolean(cantonData && !hasSeuilNum)
  // Cantons avec seuilNum : afficher résultat dès qu'un revenu est saisi
  const showResult = hasSeuilNum && hasRevenu

  return (
    <div className="bg-cloud border border-edge rounded-xl p-6 space-y-6">

      {/* ── Inputs row 1 : canton + revenu ── */}
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
                <option key={c} value={c}>{c} — {CANTON_DATA[c].nom}</option>
              ))}
            </select>
            <ChevronDown />
          </div>
        </div>

        {form.canton && hasSeuilNum && (
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
        )}

      </div>

      {/* ── Inputs row 2 : situation (tous les cantons avec seuilNum) ── */}
      {form.canton && hasSeuilNum && (
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
      )}

      {/* ── ZH / TI — formule non publiée ── */}
      {showNoFormula && cantonData && (
        <div className="space-y-4">
          <div className="rounded-lg border border-[var(--blue-tint)] bg-[var(--blue-tint)] p-5">
            <p className="text-[14px] text-ink">
              Le canton de {cantonData.nom} applique une formule de calcul propre qui n&apos;est pas publiée
              sous forme de barème standard. Consultez directement le service cantonal (lien ci-dessous)
              pour vérifier votre éligibilité et obtenir une estimation.
            </p>
          </div>
          <InfoGrid cantonData={cantonData} />
          <PrimeLien cantonData={cantonData} />
          <CtaExpert />
        </div>
      )}

      {/* ── 24 cantons avec seuilNum — résultat chiffré ── */}
      {showResult && cantonData && (
        <div className="space-y-4 pt-2">

          {/* Résultat principal */}
          {result && (
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
                  <p className="text-[11px] text-white/40">
                    Estimation indicative 2026 — le montant réel est déterminé par le service cantonal sur la base de votre dossier fiscal.
                  </p>
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

function InfoGrid({ cantonData }: { cantonData: CantonData }) {
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

function PrimeLien({ cantonData }: { cantonData: CantonData }) {
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
