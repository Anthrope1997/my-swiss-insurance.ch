'use client'

import { useState, useMemo } from 'react'

// Primes réelles depuis franchises[] dans guide/page.tsx (caisse la moins chère, modèle standard, Genève)
const PRIME_300  = 638.70
const PRIME_2500 = 519.40

function totalAnnuel(prime: number, franchise: number, frais: number): number {
  const partFranchise  = Math.min(frais, franchise)
  const partQuotaPart  = Math.min(Math.max(0, frais - franchise) * 0.1, 700)
  return prime * 12 + partFranchise + partQuotaPart
}

// Seuil analytique : 12*(p300-p2500) + 270 = 0.9x → x ≈ 1 891
const SEUIL = Math.round((12 * (PRIME_300 - PRIME_2500) + 270) / 0.9)

const X_MAX = 3000
const N_PTS = 200

// Layout SVG — tokens design system dans les valeurs hex
const SVG_W = 700
const SVG_H = 290
const M = { t: 28, r: 16, b: 44, l: 60 }
const CW = SVG_W - M.l - M.r  // 624
const CH = SVG_H - M.t - M.b  // 218

const BRAND  = '#1d4ed8'  // token brand
const SLATE  = '#475569'  // token slate
const BLUE_TINT = '#dbeafe' // token blue-tint
const CLOUD  = '#f1f5f9'  // token cloud
const EDGE   = '#e2e8f0'  // token edge
const MUTED  = '#94a3b8'  // token muted
const INK    = '#1a1a1a'  // token ink

const fmt = (n: number) => Math.round(n).toLocaleString('fr-CH')

function toSvgX(frais: number) {
  return M.l + (frais / X_MAX) * CW
}

function toSvgY(cost: number, yMin: number, yMax: number) {
  return M.t + CH - ((cost - yMin) / (yMax - yMin)) * CH
}

export default function FranchiseChart() {
  const [frais, setFrais] = useState(1000)

  const { xs, costs300, costs2500, yMin, yMax } = useMemo(() => {
    const xs = Array.from({ length: N_PTS + 1 }, (_, i) => (X_MAX / N_PTS) * i)
    const costs300  = xs.map(x => totalAnnuel(PRIME_300,  300,  x))
    const costs2500 = xs.map(x => totalAnnuel(PRIME_2500, 2500, x))
    const all = [...costs300, ...costs2500]
    const rawMin = Math.min(...all)
    const rawMax = Math.max(...all)
    const pad = (rawMax - rawMin) * 0.12
    return { xs, costs300, costs2500, yMin: rawMin - pad, yMax: rawMax + pad }
  }, [])

  const path300 = useMemo(() =>
    xs.map((x, i) =>
      `${i === 0 ? 'M' : 'L'}${toSvgX(x).toFixed(1)},${toSvgY(costs300[i], yMin, yMax).toFixed(1)}`
    ).join(' '),
    [xs, costs300, yMin, yMax]
  )

  const path2500 = useMemo(() =>
    xs.map((x, i) =>
      `${i === 0 ? 'M' : 'L'}${toSvgX(x).toFixed(1)},${toSvgY(costs2500[i], yMin, yMax).toFixed(1)}`
    ).join(' '),
    [xs, costs2500, yMin, yMax]
  )

  const yTicks = useMemo(() => {
    const step = 500
    const start = Math.ceil(yMin / step) * step
    const ticks: number[] = []
    for (let y = start; y <= yMax; y += step) ticks.push(y)
    return ticks
  }, [yMin, yMax])

  const xTicks = [0, 500, 1000, 1500, 2000, 2500, 3000]

  const seuilX    = toSvgX(SEUIL)
  const chartBot  = M.t + CH
  const chartRight = M.l + CW

  // Valeurs au point du slider
  const c300  = totalAnnuel(PRIME_300,  300,  frais)
  const c2500 = totalAnnuel(PRIME_2500, 2500, frais)
  const diff  = Math.abs(c300 - c2500)
  const f300Better = c300 < c2500

  const sliderX  = toSvgX(frais)
  const sliderY300  = toSvgY(c300,  yMin, yMax)
  const sliderY2500 = toSvgY(c2500, yMin, yMax)

  // Centres des zones pour les labels inline
  const leftLabelX  = M.l + ((SEUIL / 2)             / X_MAX) * CW
  const rightLabelX = M.l + (((SEUIL + X_MAX) / 2)   / X_MAX) * CW
  const zoneLabelY  = M.t + CH * 0.82  // sous les deux courbes

  return (
    <div className="mb-6">
      <p className="text-[15px] font-medium text-ink mb-3">
        Coût total annuel selon vos frais médicaux — caisse la moins chère, modèle standard
      </p>

      {/* Graphique SVG */}
      <div className="border border-edge rounded-[8px] bg-white overflow-hidden">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full" aria-hidden="true">

          {/* Zones colorées */}
          <rect x={M.l}     y={M.t} width={Math.max(0, seuilX - M.l)}         height={CH} fill={CLOUD}     />
          <rect x={seuilX}  y={M.t} width={Math.max(0, chartRight - seuilX)}   height={CH} fill={BLUE_TINT} opacity="0.55" />

          {/* Grille Y */}
          {yTicks.map(y => {
            const sy = toSvgY(y, yMin, yMax)
            if (sy < M.t || sy > chartBot) return null
            return <line key={y} x1={M.l} y1={sy} x2={chartRight} y2={sy} stroke={EDGE} strokeWidth={1} />
          })}

          {/* Labels axe Y */}
          {yTicks.map(y => {
            const sy = toSvgY(y, yMin, yMax)
            if (sy < M.t || sy > chartBot) return null
            return (
              <text key={y} x={M.l - 6} y={sy + 4} textAnchor="end" fontSize={10} fill={MUTED}>
                {fmt(y)}
              </text>
            )
          })}

          {/* Labels axe X */}
          {xTicks.map(x => (
            <text key={x} x={toSvgX(x)} y={chartBot + 16} textAnchor="middle" fontSize={10} fill={MUTED}>
              {x === 0 ? '0' : fmt(x)}
            </text>
          ))}

          {/* Axes */}
          <line x1={M.l} y1={M.t}    x2={M.l}        y2={chartBot} stroke={EDGE} strokeWidth={1} />
          <line x1={M.l} y1={chartBot} x2={chartRight} y2={chartBot} stroke={EDGE} strokeWidth={1} />

          {/* Courbe franchise 2 500 CHF */}
          <path d={path2500} fill="none" stroke={SLATE} strokeWidth={2.5} strokeLinejoin="round" />

          {/* Courbe franchise 300 CHF */}
          <path d={path300}  fill="none" stroke={BRAND} strokeWidth={2.5} strokeLinejoin="round" />

          {/* Ligne verticale seuil d'équilibre */}
          <line
            x1={seuilX} y1={M.t}
            x2={seuilX} y2={chartBot}
            stroke={INK} strokeWidth={1.5} strokeDasharray="5,4"
          />

          {/* Montant seuil au-dessus */}
          <text x={seuilX} y={M.t - 7} textAnchor="middle" fontSize={11} fontWeight="600" fill={INK}>
            CHF {fmt(SEUIL)}
          </text>

          {/* Labels zones inline */}
          <text x={leftLabelX}  y={zoneLabelY} textAnchor="middle" fontSize={10} fontWeight="500" fill={SLATE}>
            F. 2 500 CHF avantageuse
          </text>
          <text x={rightLabelX} y={zoneLabelY} textAnchor="middle" fontSize={10} fontWeight="500" fill={BRAND}>
            F. 300 CHF avantageuse
          </text>

          {/* Ligne verticale slider */}
          <line
            x1={sliderX} y1={M.t}
            x2={sliderX} y2={chartBot}
            stroke={MUTED} strokeWidth={1.5} strokeDasharray="4,3"
          />

          {/* Points sur les courbes */}
          <circle cx={sliderX} cy={sliderY2500} r={5} fill={SLATE} stroke="white" strokeWidth={2} />
          <circle cx={sliderX} cy={sliderY300}  r={5} fill={BRAND} stroke="white" strokeWidth={2} />
        </svg>
      </div>

      {/* Unité axe X */}
      <p className="text-[11px] text-center mt-1 mb-3" style={{ color: MUTED }}>
        Frais médicaux annuels (CHF)
      </p>

      {/* Légende */}
      <div className="flex gap-6 px-1 mb-4">
        <div className="flex items-center gap-2">
          <span className="inline-block w-5 rounded" style={{ height: '2.5px', backgroundColor: BRAND }} />
          <span className="text-[13px] text-ink">Franchise 300 CHF</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-5 rounded" style={{ height: '2.5px', backgroundColor: SLATE }} />
          <span className="text-[13px] text-ink">Franchise 2 500 CHF</span>
        </div>
      </div>

      {/* Slider interactif */}
      <div className="border border-edge rounded-[8px] bg-cloud px-4 py-4">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="frais-slider" className="text-[14px] font-medium text-ink">
            Vos frais médicaux estimés
          </label>
          <span className="text-[14px] font-semibold text-ink whitespace-nowrap">
            CHF {fmt(frais)}
          </span>
        </div>
        <input
          id="frais-slider"
          type="range"
          min={0}
          max={3000}
          step={10}
          value={frais}
          onChange={e => setFrais(Number(e.target.value))}
          className="w-full accent-brand cursor-pointer"
        />
        <p className="mt-3 text-[14px]">
          {f300Better ? (
            <span className="font-medium" style={{ color: BRAND }}>
              Franchise 300 CHF plus avantageuse de CHF {fmt(diff)} par an
            </span>
          ) : (
            <span className="font-medium" style={{ color: SLATE }}>
              Franchise 2 500 CHF plus avantageuse de CHF {fmt(diff)} par an
            </span>
          )}
        </p>
      </div>
    </div>
  )
}
