'use client'

import { useState, useMemo } from 'react'

// Données réelles depuis franchises[] — caisse la moins chère, modèle standard, Genève
const FRANCHISES = [
  { montant: 300,  prime: 638.70 },
  { montant: 500,  prime: 627.90 },
  { montant: 1000, prime: 600.70 },
  { montant: 1500, prime: 573.60 },
  { montant: 2000, prime: 546.50 },
  { montant: 2500, prime: 519.40 },
]

// Palette data-viz — bleus et gris du design system
const COLORS = [
  '#1d4ed8',  // F300  — brand
  '#3b82f6',  // F500  — brand-light
  '#60a5fa',  // F1000 — bleu clair
  '#378ADD',  // F1500 — callout-icon
  '#64748b',  // F2000 — gris bleuté
  '#0f2040',  // F2500 — navy
]

function totalAnnuel(prime: number, franchise: number, frais: number): number {
  return (
    prime * 12 +
    Math.min(frais, franchise) +
    Math.min(Math.max(0, frais - franchise) * 0.1, 700)
  )
}

function meilleureIdx(frais: number): number {
  let best = 0
  let bestCost = totalAnnuel(FRANCHISES[0].prime, FRANCHISES[0].montant, frais)
  for (let i = 1; i < FRANCHISES.length; i++) {
    const c = totalAnnuel(FRANCHISES[i].prime, FRANCHISES[i].montant, frais)
    if (c < bestCost) { bestCost = c; best = i }
  }
  return best
}

const X_MAX   = 3000
const N_PTS   = 200
const PRESETS = [0, 500, 1000, 1500, 2000, 2500, 3000]

// Dimensions SVG — marges adaptées aux labels des deux axes
const SVG_W = 700
const SVG_H = 310
const M = { t: 28, r: 20, b: 52, l: 76 }
const CW = SVG_W - M.l - M.r   // 604
const CH = SVG_H - M.t - M.b   // 230

// Tokens design system en hex
const EDGE  = '#e2e8f0'
const MUTED = '#94a3b8'
const INK   = '#1a1a1a'

const fmt = (n: number) =>
  Math.round(n).toLocaleString('fr-CH', { maximumFractionDigits: 0 })

function toX(x: number): number {
  return M.l + (x / X_MAX) * CW
}
function toY(y: number, yMin: number, yMax: number): number {
  return M.t + CH - ((y - yMin) / (yMax - yMin)) * CH
}

export default function FranchiseChart() {
  const [frais, setFrais] = useState(1000)

  // Calcul des courbes — fait une seule fois
  const { xs, allCosts, yMin, yMax } = useMemo(() => {
    const xs = Array.from({ length: N_PTS + 1 }, (_, i) => (X_MAX / N_PTS) * i)
    const allCosts = FRANCHISES.map(f =>
      xs.map(x => totalAnnuel(f.prime, f.montant, x))
    )
    const flat = allCosts.flat()
    const rawMin = Math.min(...flat)
    const rawMax = Math.max(...flat)
    const pad = (rawMax - rawMin) * 0.10
    return { xs, allCosts, yMin: rawMin - pad, yMax: rawMax + pad }
  }, [])

  const paths = useMemo(() =>
    allCosts.map(costs =>
      xs.map((x, i) =>
        `${i === 0 ? 'M' : 'L'}${toX(x).toFixed(1)},${toY(costs[i], yMin, yMax).toFixed(1)}`
      ).join(' ')
    ),
    [xs, allCosts, yMin, yMax]
  )

  const yTicks = useMemo(() => {
    const step = 500
    const start = Math.ceil(yMin / step) * step
    const ticks: number[] = []
    for (let y = start; y <= yMax; y += step) ticks.push(y)
    return ticks
  }, [yMin, yMax])

  const xTicks = [0, 500, 1000, 1500, 2000, 2500, 3000]
  const chartBot   = M.t + CH
  const chartRight = M.l + CW

  // Valeurs réactives au slider
  const bestIdx = meilleureIdx(frais)
  const bestF   = FRANCHISES[bestIdx]
  const sliderX = toX(frais)
  const sliderYs = FRANCHISES.map(f =>
    toY(totalAnnuel(f.prime, f.montant, frais), yMin, yMax)
  )

  return (
    <div className="mb-6">

      {/* Phrase dynamique — dessus du graphique */}
      <div className="bg-blue-tint rounded-[8px] px-4 py-3 mb-3">
        <p className="text-[16px] text-ink">
          La franchise de{' '}
          <strong className="text-brand">CHF {fmt(bestF.montant)}</strong>{' '}
          est la plus avantageuse pour{' '}
          <strong>CHF {fmt(frais)}</strong>{' '}
          de frais médicaux annuels
        </p>
      </div>

      {/* Graphique SVG */}
      <div className="border border-edge rounded-[8px] bg-white overflow-hidden">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full" aria-hidden="true">

          {/* Label axe Y — rotaté -90° */}
          <text
            transform="rotate(-90)"
            x={-(M.t + CH / 2)}
            y={14}
            textAnchor="middle"
            fontSize={11}
            fill={MUTED}
          >
            Coût annuel assurance LAMal (CHF)
          </text>

          {/* Grille Y */}
          {yTicks.map(y => {
            const sy = toY(y, yMin, yMax)
            return sy >= M.t && sy <= chartBot
              ? <line key={y} x1={M.l} y1={sy} x2={chartRight} y2={sy} stroke={EDGE} strokeWidth={1} />
              : null
          })}

          {/* Valeurs axe Y */}
          {yTicks.map(y => {
            const sy = toY(y, yMin, yMax)
            return sy >= M.t && sy <= chartBot
              ? <text key={y} x={M.l - 6} y={sy + 4} textAnchor="end" fontSize={10} fill={MUTED}>{fmt(y)}</text>
              : null
          })}

          {/* Valeurs axe X */}
          {xTicks.map(x => (
            <text key={x} x={toX(x)} y={chartBot + 16} textAnchor="middle" fontSize={10} fill={MUTED}>
              {x === 0 ? '0' : fmt(x)}
            </text>
          ))}

          {/* Label axe X */}
          <text x={M.l + CW / 2} y={SVG_H - 5} textAnchor="middle" fontSize={11} fill={MUTED}>
            Frais médicaux annuels (CHF)
          </text>

          {/* Axes */}
          <line x1={M.l} y1={M.t}     x2={M.l}        y2={chartBot}  stroke={EDGE} strokeWidth={1} />
          <line x1={M.l} y1={chartBot} x2={chartRight}  y2={chartBot} stroke={EDGE} strokeWidth={1} />

          {/* Courbes secondaires — fondues */}
          {FRANCHISES.map((f, i) => i === bestIdx ? null : (
            <path
              key={f.montant}
              d={paths[i]}
              fill="none"
              stroke={COLORS[i]}
              strokeWidth={1.8}
              strokeLinejoin="round"
              opacity={0.45}
            />
          ))}

          {/* Meilleure courbe — en avant */}
          <path
            d={paths[bestIdx]}
            fill="none"
            stroke={COLORS[bestIdx]}
            strokeWidth={3}
            strokeLinejoin="round"
          />

          {/* Ligne verticale — position frais */}
          <line
            x1={sliderX} y1={M.t}
            x2={sliderX} y2={chartBot}
            stroke={MUTED} strokeWidth={1.5} strokeDasharray="4,3"
          />

          {/* Points sur chaque courbe à la position frais */}
          {FRANCHISES.map((f, i) => (
            <circle
              key={f.montant}
              cx={sliderX}
              cy={sliderYs[i]}
              r={i === bestIdx ? 6 : 4}
              fill={COLORS[i]}
              stroke="white"
              strokeWidth={2}
              opacity={i === bestIdx ? 1 : 0.55}
            />
          ))}
        </svg>
      </div>

      {/* Boutons presets — directement sous le graphique */}
      <div className="flex flex-wrap gap-2 mt-3">
        {PRESETS.map(v => (
          <button
            key={v}
            onClick={() => setFrais(v)}
            className={`px-3 py-1.5 rounded-[6px] text-[16px] font-medium border transition-colors ${
              frais === v
                ? 'bg-brand text-white border-brand'
                : 'bg-white text-ink border-edge hover:border-brand hover:text-brand'
            }`}
          >
            CHF {fmt(v)}
          </button>
        ))}
      </div>

      {/* Slider */}
      <div className="mt-3 mb-5">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="frais-slider" className="text-[16px] font-medium text-ink">
            Ajuster les frais médicaux
          </label>
          <span className="text-[16px] font-semibold text-ink whitespace-nowrap ml-4">
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
      </div>

      {/* Légende — 6 franchises avec coût recalculé en temps réel */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2.5">
        {FRANCHISES.map((f, i) => {
          const cost  = totalAnnuel(f.prime, f.montant, frais)
          const isBest = i === bestIdx
          return (
            <div key={f.montant} className="flex items-center gap-2">
              <span
                className="inline-block w-6 shrink-0 rounded"
                style={{ height: '3px', backgroundColor: COLORS[i], opacity: isBest ? 1 : 0.45 }}
              />
              <span
                className={`text-[16px] ${isBest ? 'font-semibold text-ink' : 'text-ink opacity-60'}`}
              >
                CHF {fmt(f.montant)} — CHF {fmt(cost)}/an
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
