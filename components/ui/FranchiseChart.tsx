'use client'

import { useRef, useLayoutEffect, useState } from 'react'

// ─── Données réelles — caisse la moins chère, modèle standard, Genève ─────────
const PRIME_300  = 638.70
const PRIME_2500 = 519.40

function totalAnnuel(prime: number, franchise: number, frais: number): number {
  return (
    prime * 12 +
    Math.min(frais, franchise) +
    Math.min(Math.max(0, frais - franchise) * 0.1, 700)
  )
}

// Seuil analytique : 12*(p300−p2500) + 270 = 0.9x  →  x ≈ 1 891
const SEUIL = Math.round((12 * (PRIME_300 - PRIME_2500) + 270) / 0.9)
const X_MAX = 4000

// ─── Plage Y — fixe ───────────────────────────────────────────────────────────
const Y_MIN   = 5500
const Y_MAX   = 10000
const Y_RANGE = Y_MAX - Y_MIN

// ─── Dimensions SVG (viewBox logique) ─────────────────────────────────────────
const VW  = 700
const VH  = 266
const PAD = { t: 52, r: 40, b: 42, l: 100 } as const
const CHART_W = VW - PAD.l - PAD.r   // 560
const CHART_H = VH - PAD.t - PAD.b   // 172

// ─── Tokens de couleur ────────────────────────────────────────────────────────
const C_F300  = '#1d4ed8'  // brand — courbe franchise CHF 300
const C_F2500 = '#3b82f6'  // brand-light — courbe franchise CHF 2 500
const C_LABEL = '#1a1a1a'  // noir — titres d'axe et graduations
const C_SEUIL = '#374151'  // slate-700 — ligne + valeur du seuil
const C_EDGE  = '#e2e8f0'  // edge — axes + ligne curseur
const C_GRID  = '#f1f5f9'  // cloud — grille horizontale

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmtCHF = (n: number): string =>
  `CHF ${Math.round(n).toLocaleString('fr-CH', { maximumFractionDigits: 0 })}`

const mapX = (x: number): number => PAD.l + (x / X_MAX) * CHART_W
const mapY = (y: number): number => PAD.t + CHART_H * (1 - (y - Y_MIN) / Y_RANGE)

// ─── Paths de courbe pré-calculés ─────────────────────────────────────────────
function curvePath(prime: number, franchise: number): string {
  const pts: string[] = []
  for (let x = 0; x <= X_MAX; x += 5) {
    const cx = mapX(x)
    const cy = mapY(totalAnnuel(prime, franchise, x))
    pts.push(x === 0 ? `M${cx},${cy}` : `L${cx},${cy}`)
  }
  return pts.join(' ')
}

const PATH_F2500 = curvePath(PRIME_2500, 2500)
const PATH_F300  = curvePath(PRIME_300, 300)

// ─── Coordonnées fixes ────────────────────────────────────────────────────────
const Y_TICKS = [6000, 7000, 8000, 9000, 10000]
const X_TICKS = [0, 1000, 2000, 3000, 4000]

const cL      = PAD.l
const cR      = PAD.l + CHART_W
const cT      = PAD.t
const cB      = PAD.t + CHART_H
const seuilX  = mapX(SEUIL)
const leftCx  = mapX(SEUIL / 2)
const rightCx = mapX((SEUIL + X_MAX) / 2)
// annotY calculé dynamiquement dans le composant (dépend de scaled)

// ─── Composant React ──────────────────────────────────────────────────────────
export default function FranchiseChart() {
  const [frais, setFrais]               = useState(0)
  const [displayWidth, setDisplayWidth] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Mesure avant le premier paint — displayWidth null jusqu'ici, texte SVG masqué
  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return
    const initial = el.getBoundingClientRect().width
    if (initial > 0) setDisplayWidth(initial)
    const ro = new ResizeObserver(entries => {
      const w = entries[0].contentRect.width
      if (w > 0) setDisplayWidth(w)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // scaled() : cible CSS px → unités SVG viewBox (identité si pas encore mesuré)
  const scaled = (n: number) => displayWidth ? n * VW / displayWidth : n

  const annotY   = cB - scaled(32)
  const sliderX  = mapX(frais)
  const dotY2500 = mapY(totalAnnuel(PRIME_2500, 2500, frais))
  const dotY300  = mapY(totalAnnuel(PRIME_300, 300, frais))

  const leftPct  = `${((PAD.l / VW) * 100).toFixed(2)}%`
  const rightPct = `${((PAD.r / VW) * 100).toFixed(2)}%`

  const bannerText =
    frais === 0 ? (
      <span className="text-slate">
        Déplacez le curseur pour voir quelle franchise est la plus avantageuse
      </span>
    ) : frais < SEUIL ? (
      <>
        La franchise de{' '}
        <span className="font-semibold text-brand">CHF 2 500</span>
        {' '}est plus avantageuse pour{' '}
        <span className="font-semibold text-brand">{fmtCHF(frais)}</span>
        {' '}de frais médicaux annuels
      </>
    ) : (
      <>
        La franchise de{' '}
        <span className="font-semibold text-brand">CHF 300</span>
        {' '}est plus avantageuse pour{' '}
        <span className="font-semibold text-brand">{fmtCHF(frais)}</span>
        {' '}de frais médicaux annuels
      </>
    )

  return (
    <div className="mb-6">
      <style>{`
        .franchise-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 4px;
          border-radius: 99px;
          background: #e2e8f0;
          outline: none;
          cursor: pointer;
        }
        .franchise-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #1d4ed8;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(29, 78, 216, 0.25);
        }
        .franchise-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #1d4ed8;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(29, 78, 216, 0.25);
          border: none;
          box-sizing: border-box;
        }
        .franchise-slider::-moz-range-track {
          height: 4px;
          border-radius: 99px;
          background: #e2e8f0;
        }
      `}</style>

      {/* Encadré unique — phrase + graphique + slider + légende */}
      <div className="card-sm">
        <p className="text-[16px] text-center text-ink mb-3">
          {bannerText}
        </p>

        <div ref={containerRef} style={{ position: 'relative' }}>

          {/* CHF 1 891 — HTML pur : taille exactement 20px CSS, jamais scalée par le viewBox */}
          <span style={{
            position:   'absolute',
            left:       `${(seuilX / VW * 100).toFixed(2)}%`,
            top:        `${((cT - 8) / VH * 100).toFixed(2)}%`,
            transform:  'translate(-50%, -100%)',
            fontSize:   '20px',
            fontWeight: 600,
            color:      C_SEUIL,
            whiteSpace: 'nowrap',
            lineHeight: 1,
            pointerEvents: 'none',
          }}>
            {fmtCHF(SEUIL)}
          </span>

        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          width="100%"
          style={{ display: 'block' }}
          aria-hidden="true"
        >
          {/* 1 — Grille Y horizontale */}
          {Y_TICKS.map(y => (
            <line
              key={y}
              x1={cL} y1={mapY(y)}
              x2={cR} y2={mapY(y)}
              stroke={C_GRID}
              strokeWidth={0.5}
            />
          ))}

          {/* 2 — Axes L + bottom */}
          <path
            d={`M${cL},${cT} L${cL},${cB} L${cR},${cB}`}
            stroke={C_EDGE}
            strokeWidth={1}
            fill="none"
          />

          {/* 3 — Ligne de seuil pointillée */}
          <line
            x1={seuilX} y1={cT}
            x2={seuilX} y2={cB}
            stroke={C_SEUIL}
            strokeWidth={1}
            strokeDasharray="5,4"
          />

          {/* 4 — Courbe F2500 */}
          <path d={PATH_F2500} stroke={C_F2500} strokeWidth={2} fill="none" />

          {/* 5 — Courbe F300 */}
          <path d={PATH_F300} stroke={C_F300} strokeWidth={2} fill="none" />

          {/* Texte masqué tant que displayWidth n'est pas mesuré (avant premier paint) */}
          <g visibility={displayWidth === null ? 'hidden' : 'visible'}>

            {/* 6 — Labels axe Y */}
            {Y_TICKS.map(y => (
              <text
                key={y}
                x={4}
                y={mapY(y)}
                textAnchor="start"
                dominantBaseline="middle"
                fontSize={scaled(16)}
                fill={C_LABEL}
              >
                {fmtCHF(y)}
              </text>
            ))}

            {/* 7 — Labels axe X ; dernier tick right-aligné */}
            {X_TICKS.map(x => {
              const label = x === 0 ? 'CHF 0' : `CHF ${x.toLocaleString('fr-CH')}`
              const isLast = x === X_MAX
              return (
                <text
                  key={x}
                  x={isLast ? cR : mapX(x)}
                  y={cB + scaled(18)}
                  textAnchor={isLast ? 'end' : 'middle'}
                  fontSize={scaled(16)}
                  fill={C_LABEL}
                >
                  {label}
                </text>
              )
            })}

            {/* 8 — Titre axe Y */}
            <text
              x={4}
              y={scaled(14)}
              textAnchor="start"
              fontSize={scaled(16)}
              fill={C_LABEL}
            >
              Coût annuel de votre assurance LAMal
            </text>

            {/* 10 — Annotations de zone */}
            <text x={leftCx} y={annotY} textAnchor="middle" fontSize={scaled(16)} fontWeight={600} fill={C_F2500}>
              Franchise CHF 2 500
            </text>
            <text x={leftCx} y={annotY + scaled(20)} textAnchor="middle" fontSize={scaled(16)} fill={C_F2500}>
              plus avantageuse
            </text>

            <text x={rightCx} y={annotY} textAnchor="middle" fontSize={scaled(16)} fontWeight={600} fill={C_F300}>
              Franchise CHF 300
            </text>
            <text x={rightCx} y={annotY + scaled(20)} textAnchor="middle" fontSize={scaled(16)} fill={C_F300}>
              plus avantageuse
            </text>

          </g>

          {/* 12 — Interaction slider */}
          {frais > 0 && (
            <>
              <line
                x1={sliderX} y1={cT}
                x2={sliderX} y2={cB}
                stroke={C_EDGE}
                strokeWidth={1}
                strokeDasharray="4,3"
              />
              <circle cx={sliderX} cy={dotY2500} r={4} fill={C_F2500} stroke="white" strokeWidth={2} />
              <circle cx={sliderX} cy={dotY300}  r={4} fill={C_F300}  stroke="white" strokeWidth={2} />
            </>
          )}
        </svg>
        </div>

        {/* Zone slider */}
        <div className="mt-3">
          <p className="text-[16px] font-medium text-ink text-center mb-3">
            Frais médicaux annuels : {fmtCHF(frais)}
          </p>
          <div style={{ paddingLeft: leftPct, paddingRight: rightPct }}>
            <input
              type="range"
              min={0}
              max={4000}
              step={50}
              value={frais}
              onChange={e => setFrais(Number(e.target.value))}
              className="franchise-slider"
            />
          </div>
        </div>

        <p className="text-[16px] text-slate/60 text-center mt-3">
          Calculée avec la caisse la moins chère pour chaque franchise dans le canton de Genève, modèle standard
        </p>
      </div>
    </div>
  )
}
