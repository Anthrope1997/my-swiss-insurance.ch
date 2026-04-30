'use client'

import { useState } from 'react'
import {
  type Canton, type Situation,
  calculerSubsideGE, calculerSubsideVS, calculerSubsideNE,
  calculerSubsideVD, calculerSubsideFR, calculerSubsideJU,
} from '@/lib/lamal/calcul-subside'

// ─── Data ────────────────────────────────────────────────────────────────────

const CALC_CANTONS = new Set<string>(['GE', 'VD', 'NE', 'FR', 'JU', 'VS'])

const ROMAND_CODES  = ['GE', 'VD', 'NE', 'FR', 'JU', 'VS']
const OTHER_CODES   = ['ZH', 'BE', 'LU', 'UR', 'SZ', 'OW', 'NW', 'GL', 'ZG', 'BS', 'BL', 'SH', 'AR', 'AI', 'SG', 'GR', 'AG', 'TG', 'TI', 'SO']

interface CantonData {
  nom: string
  seuilRevenu: string
  montantMax: string
  auto: boolean
  delai: string
  lien: string
  primeMoyenne: number
}

const CANTON_DATA: Record<string, CantonData> = {
  GE: { nom: 'Genève',             seuilRevenu: '≈ 50 000 CHF/an',             montantMax: '≤ 348 CHF/mois', auto: true,  delai: 'Non requis (automatique)',  lien: 'https://www.ge.ch/informations-generales-subside-assurance-maladie',                                                    primeMoyenne: 710 },
  VD: { nom: 'Vaud',               seuilRevenu: '≈ 50 000 CHF/an',             montantMax: '≤ 331 CHF/mois', auto: false, delai: 'Voir OVAM 2026',            lien: 'https://www.vd.ch/sante-soins-et-handicap/assurance-maladie/subside-a-lassurance-maladie',                            primeMoyenne: 638 },
  NE: { nom: 'Neuchâtel',          seuilRevenu: '≈ 65 000 CHF/an',             montantMax: '≤ 643 CHF/mois', auto: true,  delai: 'Non requis (automatique)',  lien: 'https://www.ne.ch/themes/social/assurance-maladie/subsides-assurance-maladie-lamal',                                    primeMoyenne: 663 },
  FR: { nom: 'Fribourg',           seuilRevenu: '≈ 37 000 CHF/an',             montantMax: 'Sur dossier',    auto: false, delai: '31 août 2026',              lien: 'https://www.ecasfr.ch/fr/Assurances/Reduction-des-primes-d-assurance-maladie/Reduction-des-primes-d-assurance-maladie.html', primeMoyenne: 522 },
  JU: { nom: 'Jura',               seuilRevenu: '≈ 27 000 CHF/an',             montantMax: '≤ 568 CHF/mois', auto: false, delai: '31 déc. 2026',              lien: 'https://www.ecasjura.ch/fr/Assurances/Assurance-maladie',                                                              primeMoyenne: 633 },
  VS: { nom: 'Valais',             seuilRevenu: '≈ 38 500 CHF/an',             montantMax: '≤ 521 CHF/mois', auto: true,  delai: 'Non requis (automatique)',  lien: 'https://www.avsvalais.ch/fr/Assurances/RIP-Reduction-individuelle-des-primes-d-assurance-maladie',                        primeMoyenne: 528 },
  ZH: { nom: 'Zurich',             seuilRevenu: 'Variable selon profil',       montantMax: '≤ 252 CHF/mois', auto: false, delai: '31 mars 2026',              lien: 'https://www.zh.ch/de/soziales/individuelle-praemienverbilligung.html',                                                    primeMoyenne: 442 },
  BE: { nom: 'Berne',              seuilRevenu: '≈ 50 000 CHF/an',             montantMax: '≤ 221 CHF/mois', auto: false, delai: '31 déc. 2026',              lien: 'https://www.be.ch/de/start/themen/soziales/praemienverbilligung.html',                                                    primeMoyenne: 397 },
  LU: { nom: 'Lucerne',            seuilRevenu: '≈ 42 000 CHF/an',             montantMax: '≤ 469 CHF/mois', auto: false, delai: '31 déc. 2026',              lien: 'https://www.lu.ch/verwaltung/ASD/sa',                                                                                    primeMoyenne: 395 },
  UR: { nom: 'Uri',                seuilRevenu: '≈ 32 000 CHF/an',             montantMax: '≤ 364 CHF/mois', auto: false, delai: '31 déc. 2026',              lien: 'https://www.ur.ch',                                                                                                      primeMoyenne: 310 },
  SZ: { nom: 'Schwytz',            seuilRevenu: '≈ 38 000 CHF/an',             montantMax: '≤ 465 CHF/mois', auto: false, delai: '31 déc. 2026',              lien: 'https://www.sz.ch',                                                                                                      primeMoyenne: 347 },
  OW: { nom: 'Obwald',             seuilRevenu: '≈ 32 000 CHF/an',             montantMax: '≤ 418 CHF/mois', auto: false, delai: '31 déc. 2026',              lien: 'https://www.ow.ch',                                                                                                      primeMoyenne: 303 },
  NW: { nom: 'Nidwald',            seuilRevenu: '≈ 32 000 CHF/an',             montantMax: '≤ 450 CHF/mois', auto: false, delai: '31 déc. 2026',              lien: 'https://www.nw.ch',                                                                                                      primeMoyenne: 288 },
  GL: { nom: 'Glaris',             seuilRevenu: '≈ 36 000 CHF/an',             montantMax: '≤ 454 CHF/mois', auto: false, delai: '31 déc. 2026',              lien: 'https://www.gl.ch',                                                                                                      primeMoyenne: 345 },
  ZG: { nom: 'Zoug',               seuilRevenu: '≈ 36 000 CHF/an',             montantMax: '≤ 415 CHF/mois', auto: false, delai: '31 mars 2026',              lien: 'https://www.zg.ch/behoerden/soziale-einrichtungen/jugendamt/individuelle-praemienverbilligung',                            primeMoyenne: 360 },
  BS: { nom: 'Bâle-Ville',         seuilRevenu: '≈ 38 000 CHF/an',             montantMax: '≤ 444 CHF/mois', auto: false, delai: '31 déc. 2026',              lien: 'https://www.bs.ch',                                                                                                      primeMoyenne: 500 },
  BL: { nom: 'Bâle-Campagne',      seuilRevenu: '≈ 38 000 CHF/an',             montantMax: 'Sur dossier',    auto: false, delai: '31 déc. 2026',              lien: 'https://www.bl.ch',                                                                                                      primeMoyenne: 466 },
  SH: { nom: 'Schaffhouse',        seuilRevenu: '≈ 38 000 CHF/an',             montantMax: '≤ 322 CHF/mois', auto: false, delai: '31 déc. 2026',              lien: 'https://www.sh.ch',                                                                                                      primeMoyenne: 431 },
  AR: { nom: 'Appenzell Rh.-Ext.', seuilRevenu: '≈ 40 000 CHF/an',             montantMax: '≤ 502 CHF/mois', auto: false, delai: '31 déc. 2026',              lien: 'https://www.ar.ch',                                                                                                      primeMoyenne: 432 },
  AI: { nom: 'Appenzell Rh.-Int.', seuilRevenu: '≈ 36 000 CHF/an',             montantMax: '≤ 387 CHF/mois', auto: false, delai: '31 déc. 2026',              lien: 'https://www.ai.ch',                                                                                                      primeMoyenne: 382 },
  SG: { nom: 'Saint-Gall',         seuilRevenu: '≈ 42 000 CHF/an',             montantMax: '≤ 524 CHF/mois', auto: false, delai: '31 mars 2026',              lien: 'https://www.sg.ch/gesundheit-soziales/soziales/individuelle-praemienverbilligung.html',                                    primeMoyenne: 430 },
  GR: { nom: 'Grisons',            seuilRevenu: '≈ 40 000 CHF/an',             montantMax: '≤ 493 CHF/mois', auto: false, delai: '31 déc. 2026',              lien: 'https://www.gr.ch',                                                                                                      primeMoyenne: 390 },
  AG: { nom: 'Argovie',            seuilRevenu: '≈ 40 000 CHF/an',             montantMax: '≤ 486 CHF/mois', auto: false, delai: '30 sept. 2026',             lien: 'https://www.ag.ch',                                                                                                      primeMoyenne: 419 },
  TG: { nom: 'Thurgovie',          seuilRevenu: '≈ 38 000 CHF/an',             montantMax: 'Sur dossier',    auto: false, delai: '31 mars 2026',              lien: 'https://www.tg.ch',                                                                                                      primeMoyenne: 360 },
  TI: { nom: 'Tessin',             seuilRevenu: 'Formule de calcul cantonale', montantMax: '≤ 668 CHF/mois', auto: false, delai: '31 déc. 2026',              lien: 'https://www.ti.ch',                                                                                                      primeMoyenne: 531 },
  SO: { nom: 'Soleure',            seuilRevenu: '≈ 38 000 CHF/an',             montantMax: '≤ 422 CHF/mois', auto: false, delai: '31 déc. 2026',              lien: 'https://www.so.ch',                                                                                                      primeMoyenne: 387 },
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormState {
  canton:    string
  revenu:    string
  situation: Situation
  nbEnfants: number
  isJeune:   boolean
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return n.toLocaleString('fr-CH', { maximumFractionDigits: 0 })
}

function computeCalcResult(form: FormState) {
  const rev = parseInt(form.revenu.replace(/['\s]/g, '')) || 0
  if (rev <= 0) return null
  switch (form.canton as Canton) {
    case 'GE': return calculerSubsideGE(rev, form.situation, form.nbEnfants, form.isJeune)
    case 'VS': return calculerSubsideVS(rev, form.situation, form.nbEnfants, form.isJeune)
    case 'NE': return calculerSubsideNE(rev, form.situation, form.nbEnfants, form.isJeune)
    case 'VD': return calculerSubsideVD(rev, form.situation, form.nbEnfants, form.isJeune)
    case 'FR': return calculerSubsideFR(rev, form.situation, form.nbEnfants)
    case 'JU': return calculerSubsideJU(rev, form.situation, form.nbEnfants, form.isJeune)
    default:   return null
  }
}

function ChevronDown() {
  return (
    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function SubsidesSimulatorFull() {
  const [form, setForm] = useState<FormState>({
    canton: '', revenu: '', situation: 'seul', nbEnfants: 0, isJeune: false,
  })

  const set = (patch: Partial<FormState>) => setForm(f => ({ ...f, ...patch }))

  const cantonData  = form.canton ? CANTON_DATA[form.canton] : null
  const isCalc      = CALC_CANTONS.has(form.canton)
  const revNum      = parseInt(form.revenu.replace(/['\s]/g, '')) || 0
  const hasRevenu   = revNum > 0
  const showResults = Boolean(form.canton) && (isCalc ? hasRevenu : true)
  const calcResult  = (isCalc && hasRevenu) ? computeCalcResult(form) : null

  const isFR       = form.canton === 'FR'
  const ineligible = calcResult !== null && (calcResult.label === 'Non éligible' || (calcResult.total === 0 && !isFR))
  const isEligFR   = calcResult !== null && isFR && calcResult.label !== 'Non éligible'
  const hasAmount  = calcResult !== null && calcResult.total > 0

  return (
    <div className="bg-cloud border border-edge rounded-xl p-6 space-y-6">

      {/* ── Inputs row 1: canton + revenu ── */}
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
              <optgroup label="Suisse romande — calcul détaillé">
                {ROMAND_CODES.map(c => (
                  <option key={c} value={c}>{c} — {CANTON_DATA[c].nom}</option>
                ))}
              </optgroup>
              <optgroup label="Autres cantons — données indicatives">
                {OTHER_CODES.map(c => (
                  <option key={c} value={c}>{c} — {CANTON_DATA[c].nom}</option>
                ))}
              </optgroup>
            </select>
            <ChevronDown />
          </div>
        </div>

        {isCalc && form.canton && (
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

      {/* ── Inputs row 2: situation (calc cantons only) ── */}
      {isCalc && form.canton && (
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

      {/* ── Results ── */}
      {showResults && cantonData && (
        <div className="space-y-4 pt-2">

          {/* Main result */}
          {isCalc ? (
            calcResult ? (
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
              ) : isEligFR ? (
                <div className="rounded-lg border border-brand/20 bg-[var(--blue-tint)] p-5 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-ink text-[15px]">Vous semblez éligible</p>
                    <p className="text-[13px] text-slate mt-0.5">
                      Le montant exact est calculé par le canton de {cantonData.nom} sur la base de votre dossier fiscal.
                    </p>
                  </div>
                </div>
              ) : hasAmount ? (
                <div className="rounded-lg bg-[var(--navy)] p-6 space-y-4">
                  <div className="flex items-end justify-between gap-4 flex-wrap">
                    <div>
                      <p className="text-[11px] text-white/50 uppercase tracking-wide mb-1">
                        Estimation subside mensuel
                        {calcResult.label && calcResult.label !== 'Ordinaire' ? ` — ${calcResult.label}` : ''}
                      </p>
                      <p className="text-4xl font-bold text-white">
                        CHF {fmt(calcResult.total)}
                        <span className="text-lg font-normal text-white/50 ml-1">/mois</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] text-white/50">par année</p>
                      <p className="text-xl font-semibold text-white">CHF {fmt(calcResult.total * 12)}</p>
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
                          CHF {fmt(calcResult.adulte)}
                          <span className="text-[12px] font-normal text-white/50">/mois</span>
                        </p>
                      </div>
                      {form.nbEnfants > 0 && (
                        <div className="bg-white/10 rounded-lg px-4 py-3">
                          <p className="text-[11px] text-white/50 mb-0.5">Par enfant</p>
                          <p className="text-[17px] font-bold text-white">
                            CHF {fmt(calcResult.enfant)}
                            <span className="text-[12px] font-normal text-white/50">/mois</span>
                          </p>
                        </div>
                      )}
                      {form.situation === 'couple' && (
                        <div className="bg-white/10 rounded-lg px-4 py-3">
                          <p className="text-[11px] text-white/50 mb-0.5">Total ménage</p>
                          <p className="text-[17px] font-bold text-white">
                            CHF {fmt(calcResult.total)}
                            <span className="text-[12px] font-normal text-white/50">/mois</span>
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {calcResult.note && (
                    <p className="text-[12px] text-white/50 leading-relaxed border-t border-white/10 pt-3">
                      {calcResult.note}
                    </p>
                  )}
                  <p className="text-[11px] text-white/40">
                    Estimation indicative 2026 — le montant réel est déterminé par le canton sur la base de votre dossier fiscal.
                  </p>
                </div>
              ) : null
            ) : null
          ) : (
            <div className="rounded-lg border border-brand/20 bg-[var(--blue-tint)] p-4">
              <p className="text-[14px] text-ink">
                Le calcul détaillé n&apos;est pas disponible pour le canton de {cantonData.nom}. Consultez directement le service cantonal avec les informations ci-dessous.
              </p>
            </div>
          )}

          {/* Info grid: 4 cells */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Seuil de revenu',  value: cantonData.seuilRevenu },
              { label: 'Montant maximum',  value: cantonData.montantMax  },
              { label: 'Attribution',      value: cantonData.auto ? 'Automatique' : 'Sur demande' },
              { label: 'Délai 2026',       value: cantonData.delai       },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white border border-edge rounded-[8px] px-4 py-3">
                <p className="text-[11px] text-slate/60 uppercase tracking-wide mb-1">{label}</p>
                <p className="text-[13px] font-medium text-ink">{value}</p>
              </div>
            ))}
          </div>

          {/* Prime de référence + lien officiel */}
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

          {/* CTA expert */}
          <div className="border-t border-edge pt-3">
            <a href="#contact" className="text-[14px] text-brand hover:underline">
              Vous souhaitez qu&apos;un expert vérifie vos droits et effectue la démarche pour vous ? →
            </a>
          </div>

        </div>
      )}

    </div>
  )
}
