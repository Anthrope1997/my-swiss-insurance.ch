'use client'

import { useRef, useLayoutEffect, useState } from 'react'

// ─── Données réelles — primes moyennes suisses, caisse la moins chère, modèle standard ──
const PRIME_300  = 534.75
const PRIME_2500 = 415.00

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
const Y_MIN   = 4500
const Y_MAX   = 8500
const Y_RANGE = Y_MAX - Y_MIN

// ─── Tokens de couleur ────────────────────────────────────────────────────────
const C_F300  = '#1d4ed8'
const C_F2500 = '#3b82f6'
const C_LABEL = '#1a1a1a'
const C_SEUIL = '#374151'
const C_EDGE  = '#e2e8f0'
const C_GRID  = '#f1f5f9'

const fmtCHF = (n: number): string =>
  `CHF ${Math.round(n).toLocaleString('fr-CH', { maximumFractionDigits: 0 })}`

// ─── Layout desktop ───────────────────────────────────────────────────────────
// viewBox 700×266 → ratio 2.63:1 → OK sur desktop (> 520 px)
const VW  = 700
const VH  = 266
const PAD = { t: 52, r: 40, b: 42, l: 100 } as const
const CHART_W = VW - PAD.l - PAD.r   // 560
const CHART_H = VH - PAD.t - PAD.b   // 172

const mapX = (x: number): number => PAD.l + (x / X_MAX) * CHART_W
const mapY = (y: number): number => PAD.t + CHART_H * (1 - (y - Y_MIN) / Y_RANGE)

function curvePath(prime: number, franchise: number): string {
  const pts: string[] = []
  for (let x = 0; x <= X_MAX; x += 5) {
    pts.push(x === 0
      ? `M${mapX(x)},${mapY(totalAnnuel(prime, franchise, x))}`
      : `L${mapX(x)},${mapY(totalAnnuel(prime, franchise, x))}`)
  }
  return pts.join(' ')
}

const PATH_F2500 = curvePath(PRIME_2500, 2500)
const PATH_F300  = curvePath(PRIME_300, 300)

const cL      = PAD.l
const cR      = PAD.l + CHART_W
const cT      = PAD.t
const cB      = PAD.t + CHART_H
const seuilX  = mapX(SEUIL)
const leftCx  = mapX(SEUIL / 2)
const rightCx = mapX((SEUIL + X_MAX) / 2)

// ─── Layout mobile ────────────────────────────────────────────────────────────
// viewBox 700×500 → ratio 1.4:1 → à 290 px de large, hauteur rendue ≈ 207 px
// Même VW = 700 → scaled() identique, textes en px CSS exacts
const MVH  = 500
const MPAD = { t: 42, r: 40, b: 62, l: 76 } as const
const MCHART_W = VW - MPAD.l - MPAD.r   // 584
const MCHART_H = MVH - MPAD.t - MPAD.b  // 396

const mmapX = (x: number): number => MPAD.l + (x / X_MAX) * MCHART_W
const mmapY = (y: number): number => MPAD.t + MCHART_H * (1 - (y - Y_MIN) / Y_RANGE)

function mcurvePath(prime: number, franchise: number): string {
  const pts: string[] = []
  for (let x = 0; x <= X_MAX; x += 5) {
    pts.push(x === 0
      ? `M${mmapX(x)},${mmapY(totalAnnuel(prime, franchise, x))}`
      : `L${mmapX(x)},${mmapY(totalAnnuel(prime, franchise, x))}`)
  }
  return pts.join(' ')
}

const M_PATH_F2500 = mcurvePath(PRIME_2500, 2500)
const M_PATH_F300  = mcurvePath(PRIME_300, 300)

const mCL      = MPAD.l
const mCR      = MPAD.l + MCHART_W
const mCT      = MPAD.t
const mCB      = MPAD.t + MCHART_H
const mSeuilX  = mmapX(SEUIL)
const mLeftCx  = mmapX(SEUIL / 2)
const mRightCx = mmapX((SEUIL + X_MAX) / 2)

// ─── Ticks ────────────────────────────────────────────────────────────────────
const Y_TICKS = [5000, 6000, 7000, 8000]
const X_TICKS = [0, 1000, 2000, 3000, 4000]

// ─── Composant React ──────────────────────────────────────────────────────────
export default function FranchiseChart() {
  const [frais, setFrais]               = useState(0)
  const [displayWidth, setDisplayWidth] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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

  // scaled() : cible CSS px → unités SVG viewBox (VW = 700 dans les deux layouts)
  const scaled = (n: number) => displayWidth ? n * VW / displayWidth : n

  const isMobile = displayWidth !== null && displayWidth < 520

  // Jeu de coordonnées actif selon le breakpoint
  const aVH     = isMobile ? MVH     : VH
  const aCL     = isMobile ? mCL     : cL
  const aCR     = isMobile ? mCR     : cR
  const aCT     = isMobile ? mCT     : cT
  const aCB     = isMobile ? mCB     : cB
  const aSeuilX = isMobile ? mSeuilX : seuilX
  const aLeftCx = isMobile ? mLeftCx : leftCx
  const aRightCx= isMobile ? mRightCx: rightCx
  const aMapX   = isMobile ? mmapX   : mapX
  const aMapY   = isMobile ? mmapY   : mapY
  const aPathF2500 = isMobile ? M_PATH_F2500 : PATH_F2500
  const aPathF300  = isMobile ? M_PATH_F300  : PATH_F300
  const aLeftPad   = isMobile ? MPAD.l : PAD.l
  const aRightPad  = isMobile ? MPAD.r : PAD.r

  const annotY    = aCB - scaled(32)
  const sliderX   = aMapX(frais)
  const dotY2500  = aMapY(totalAnnuel(PRIME_2500, 2500, frais))
  const dotY300   = aMapY(totalAnnuel(PRIME_300, 300, frais))

  // Labels axe Y : "CHF 8 000" sur desktop, "8k" sur mobile
  const fmtYLabel    = (v: number) => isMobile ? `${v / 1000}k` : fmtCHF(v)
  // Bord gauche des labels Y — aligné à gauche depuis la marge
  const yLabelX      = scaled(6)
  const xLabelGapPx  = isMobile ? 10 : 24
  const annotFontPx  = isMobile ? 12 : 16
  const annotLinePx  = isMobile ? 15 : 20

  const leftPct  = `${((aLeftPad / VW) * 100).toFixed(2)}%`
  const rightPct = `${((aRightPad / VW) * 100).toFixed(2)}%`

  const bannerText =
    frais === 0 ? (
      <span className="text-slate">
        Déplacez le curseur pour voir quelle franchise est la plus avantageuse
      </span>
    ) : frais < SEUIL ? (
      <>
        La franchise de{' '}
        <span className="font-semibold text-brand text-[18px]">CHF 2 500</span>
        {' '}est plus avantageuse pour{' '}
        <span className="font-semibold text-brand text-[18px]">{fmtCHF(frais)}</span>
        {' '}de frais médicaux annuels
      </>
    ) : (
      <>
        La franchise de{' '}
        <span className="font-semibold text-brand text-[18px]">CHF 300</span>
        {' '}est plus avantageuse pour{' '}
        <span className="font-semibold text-brand text-[18px]">{fmtCHF(frais)}</span>
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
        <p className="text-[16px] font-semibold text-center text-ink mb-3">
          {bannerText}
        </p>

        <div ref={containerRef}>
          <svg
            viewBox={`0 0 ${VW} ${aVH}`}
            width="100%"
            overflow="visible"
            style={{ display: 'block' }}
            aria-hidden="true"
          >
            {/* 1 — Grille Y */}
            {Y_TICKS.map(y => (
              <line
                key={y}
                x1={aCL} y1={aMapY(y)}
                x2={aCR} y2={aMapY(y)}
                stroke={C_GRID}
                strokeWidth={0.5}
              />
            ))}

            {/* 2 — Axes L + bottom */}
            <path
              d={`M${aCL},${aCT} L${aCL},${aCB} L${aCR},${aCB}`}
              stroke={C_EDGE}
              strokeWidth={1}
              fill="none"
            />

            {/* 3 — Ligne de seuil pointillée */}
            <line
              x1={aSeuilX} y1={aCT}
              x2={aSeuilX} y2={aCB}
              stroke={C_SEUIL}
              strokeWidth={1}
              strokeDasharray="5,4"
            />

            {/* 4 — Courbe F2500 */}
            <path d={aPathF2500} stroke={C_F2500} strokeWidth={2} fill="none" />

            {/* 5 — Courbe F300 */}
            <path d={aPathF300} stroke={C_F300} strokeWidth={2} fill="none" />

            {/* 12a — Ligne slider — derrière le texte */}
            {frais > 0 && (
              <line
                x1={sliderX} y1={aCT}
                x2={sliderX} y2={aCB}
                stroke={C_EDGE}
                strokeWidth={1}
                strokeDasharray="4,3"
              />
            )}

            {/* Texte masqué jusqu'à la première mesure */}
            <g visibility={displayWidth === null ? 'hidden' : 'visible'}>

              {/* 6 — Labels axe Y */}
              {Y_TICKS.map(y => (
                <text
                  key={y}
                  x={yLabelX}
                  y={aMapY(y)}
                  textAnchor="start"
                  dominantBaseline="middle"
                  fontSize={scaled(16)}
                  fill={C_LABEL}
                >
                  {fmtYLabel(y)}
                </text>
              ))}

              {/* 7 — Labels axe X */}
              {X_TICKS.map(x => {
                const label = isMobile
                  ? (x === 0 ? '0' : `${x / 1000}k`)
                  : (x === 0 ? 'CHF 0' : `CHF ${x.toLocaleString('fr-CH')}`)
                const isLast = x === X_MAX
                return (
                  <text
                    key={x}
                    x={isLast ? aCR : aMapX(x)}
                    y={aCB + scaled(xLabelGapPx)}
                    textAnchor={isLast ? 'end' : 'middle'}
                    fontSize={scaled(16)}
                    fill={C_LABEL}
                  >
                    {label}
                  </text>
                )
              })}

              {/* 8 — Titre axe Y — masqué sur mobile */}
              {!isMobile && (
                <text
                  x={yLabelX}
                  y={aCT - scaled(48)}
                  textAnchor="start"
                  fontSize={scaled(16)}
                  fill={C_LABEL}
                >
                  Coût annuel de votre assurance LAMal
                </text>
              )}

              {/* 9 — Valeur seuil */}
              <text
                x={aSeuilX}
                y={aCT - scaled(isMobile ? 6 : 12)}
                textAnchor="middle"
                fontSize={scaled(isMobile ? 13 : 16)}
                fontWeight={600}
                fill={C_SEUIL}
              >
                {isMobile ? `${Math.round(SEUIL / 100) / 10}k` : fmtCHF(SEUIL)}
              </text>

              {/* 10 — Annotations de zone */}
              <text x={aLeftCx} y={annotY} textAnchor="middle" fontSize={scaled(annotFontPx)} fontWeight={600} fill={C_F2500}>
                {isMobile ? 'CHF 2 500' : 'Franchise CHF 2 500'}
              </text>
              <text x={aLeftCx} y={annotY + scaled(annotLinePx)} textAnchor="middle" fontSize={scaled(annotFontPx)} fontWeight={600} fill={C_F2500}>
                plus avantageuse
              </text>

              <text x={aRightCx} y={annotY} textAnchor="middle" fontSize={scaled(annotFontPx)} fontWeight={600} fill={C_F300}>
                {isMobile ? 'CHF 300' : 'Franchise CHF 300'}
              </text>
              <text x={aRightCx} y={annotY + scaled(annotLinePx)} textAnchor="middle" fontSize={scaled(annotFontPx)} fontWeight={600} fill={C_F300}>
                plus avantageuse
              </text>

            </g>

            {/* 12b — Dots slider — devant le texte */}
            {frais > 0 && (
              <>
                <circle cx={sliderX} cy={dotY2500} r={4} fill={C_F2500} stroke="white" strokeWidth={2} />
                <circle cx={sliderX} cy={dotY300}  r={4} fill={C_F300}  stroke="white" strokeWidth={2} />
              </>
            )}
          </svg>
        </div>

        {/* Zone slider */}
        <div className="mt-5">
          <p className="text-[16px] text-ink text-center mb-3">
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
          Calculée avec les primes moyennes suisses, caisse la moins chère par franchise, modèle standard
        </p>
      </div>
    </div>
  )
}
