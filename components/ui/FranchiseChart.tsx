'use client'

import { useRef, useEffect, useState } from 'react'

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

// ─── Dimensions canvas ────────────────────────────────────────────────────────
const CW  = 700
const CH  = 266   // 38 % de CW
const PAD = { t: 52, r: 40, b: 42, l: 120 } as const
const CHART_W = CW - PAD.l - PAD.r   // 540
const CHART_H = CH - PAD.t - PAD.b   // 172

// ─── Tokens canvas — mappés sur le design system ──────────────────────────────
const C_F300  = '#1d4ed8'  // brand
const C_F2500 = '#3b82f6'  // brand-light
const C_LABEL = '#475569'  // slate — text-secondary
const C_INK   = '#1a1a1a'  // ink — text-primary
const C_EDGE  = '#e2e8f0'  // edge — border
const FONT    = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmtCHF = (n: number): string =>
  `CHF ${Math.round(n).toLocaleString('fr-CH', { maximumFractionDigits: 0 })}`

const mapX = (x: number): number => PAD.l + (x / X_MAX) * CHART_W
const mapY = (y: number): number => PAD.t + CHART_H * (1 - (y - Y_MIN) / Y_RANGE)

// ─── Dessin canvas ────────────────────────────────────────────────────────────
function draw(ctx: CanvasRenderingContext2D, frais: number): void {
  ctx.clearRect(0, 0, CW, CH)

  const seuilX = mapX(SEUIL)
  const cL     = PAD.l
  const cR     = PAD.l + CHART_W
  const cT     = PAD.t
  const cB     = PAD.t + CHART_H

  // 1 ─ Grille Y horizontale — 0.5 px, edge, en premier pour passer derrière tout
  const yStep  = 1000
  const yStart = Math.ceil(Y_MIN / yStep) * yStep
  ctx.strokeStyle = C_EDGE
  ctx.lineWidth   = 0.5
  ctx.setLineDash([])
  for (let y = yStart; y <= Y_MAX; y += yStep) {
    const py = mapY(y)
    if (py < cT - 1 || py > cB + 1) continue
    ctx.beginPath(); ctx.moveTo(cL, py); ctx.lineTo(cR, py); ctx.stroke()
  }

  // 2 ─ Lignes d'axes (L + bottom)
  ctx.strokeStyle = C_EDGE
  ctx.lineWidth   = 1
  ctx.beginPath()
  ctx.moveTo(cL, cT); ctx.lineTo(cL, cB); ctx.lineTo(cR, cB)
  ctx.stroke()

  // 3 ─ Ligne de seuil — 1 px pointillé, edge (border-secondary)
  ctx.strokeStyle = C_EDGE
  ctx.lineWidth   = 1
  ctx.setLineDash([5, 4])
  ctx.beginPath(); ctx.moveTo(seuilX, cT); ctx.lineTo(seuilX, cB); ctx.stroke()
  ctx.setLineDash([])

  // 4 ─ Courbe F2500
  ctx.strokeStyle = C_F2500
  ctx.lineWidth   = 2
  ctx.beginPath()
  for (let x = 0; x <= X_MAX; x += 5) {
    const px = mapX(x)
    const py = mapY(totalAnnuel(PRIME_2500, 2500, x))
    x === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
  }
  ctx.stroke()

  // 5 ─ Courbe F300
  ctx.strokeStyle = C_F300
  ctx.lineWidth   = 2
  ctx.beginPath()
  for (let x = 0; x <= X_MAX; x += 5) {
    const px = mapX(x)
    const py = mapY(totalAnnuel(PRIME_300, 300, x))
    x === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
  }
  ctx.stroke()

  // 6 ─ Labels axe Y (valeurs CHF) — dessinés sur la grille
  for (let y = yStart; y <= Y_MAX; y += yStep) {
    const py = mapY(y)
    if (py < cT - 1 || py > cB + 1) continue
    ctx.textAlign = 'right'
    ctx.font      = `13px ${FONT}`
    ctx.fillStyle = C_LABEL
    ctx.fillText(fmtCHF(y), cL - 8, py + 4)
  }

  // 7 ─ Labels axe X
  const xTicks = [0, 1000, 2000, 3000, 4000]
  ctx.textAlign = 'center'
  ctx.font      = `13px ${FONT}`
  ctx.fillStyle = C_LABEL
  for (const x of xTicks) {
    ctx.fillText(
      x === 0 ? 'CHF 0' : `CHF ${x.toLocaleString('fr-CH')}`,
      mapX(x), cB + 18
    )
  }

  // 8 ─ Titre axe Y — dans PAD.top, à gauche, au-dessus du label seuil (cT-8)
  ctx.textAlign = 'left'
  ctx.font      = `13px ${FONT}`
  ctx.fillStyle = C_LABEL
  ctx.fillText('Coût annuel de votre assurance LAMal', cL, cT - 32)

  // 9 ─ Label seuil — montant seul, weight 500, text-primary
  ctx.textAlign = 'center'
  ctx.font      = `500 12px ${FONT}`
  ctx.fillStyle = C_INK
  ctx.fillText(fmtCHF(SEUIL), seuilX, cT - 8)

  // 10 ─ Labels de zone — texte seul (pas de fond coloré), halo blanc pour lisibilité
  const leftCx  = (cL + seuilX) / 2
  const rightCx = (seuilX + cR) / 2
  const zY1     = cB - 26
  const zY2     = cB - 10

  ctx.shadowColor  = 'white'
  ctx.shadowBlur   = 5

  ctx.textAlign = 'center'
  ctx.font      = `600 11px ${FONT}`
  ctx.fillStyle = C_F2500
  ctx.fillText('Franchise de CHF 2 500', leftCx, zY1)
  ctx.font      = `11px ${FONT}`
  ctx.fillText('plus avantageuse', leftCx, zY2)

  ctx.font      = `600 11px ${FONT}`
  ctx.fillStyle = C_F300
  ctx.fillText('Franchise de CHF 300', rightCx, zY1)
  ctx.font      = `11px ${FONT}`
  ctx.fillText('plus avantageuse', rightCx, zY2)

  ctx.shadowBlur = 0

  // 11 ─ Labels courbes à x = 3 500 — weight 500, couleur courbe, sans fond
  const labelX     = mapX(3500)
  const labelY2500 = mapY(totalAnnuel(PRIME_2500, 2500, 3500))
  const labelY300  = mapY(totalAnnuel(PRIME_300,  300,  3500))

  ctx.textAlign = 'center'
  ctx.font      = `500 12px ${FONT}`
  ctx.fillStyle = C_F2500
  ctx.fillText('Franchise CHF 2 500', labelX, labelY2500 - 10)
  ctx.fillStyle = C_F300
  ctx.fillText('Franchise CHF 300', labelX, labelY300 + 16)

  // 12 ─ Interaction slider — ligne + points sur les courbes
  if (frais > 0) {
    const sliderX = mapX(frais)

    ctx.strokeStyle = C_EDGE
    ctx.lineWidth   = 1
    ctx.setLineDash([4, 3])
    ctx.beginPath(); ctx.moveTo(sliderX, cT); ctx.lineTo(sliderX, cB); ctx.stroke()
    ctx.setLineDash([])

    const dotY2500 = mapY(totalAnnuel(PRIME_2500, 2500, frais))
    ctx.fillStyle   = C_F2500
    ctx.strokeStyle = 'white'
    ctx.lineWidth   = 2
    ctx.beginPath(); ctx.arc(sliderX, dotY2500, 4, 0, Math.PI * 2); ctx.fill(); ctx.stroke()

    const dotY300 = mapY(totalAnnuel(PRIME_300, 300, frais))
    ctx.fillStyle   = C_F300
    ctx.beginPath(); ctx.arc(sliderX, dotY300, 4, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
  }
}

// ─── Composant React ──────────────────────────────────────────────────────────
export default function FranchiseChart() {
  const [frais, setFrais] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr    = window.devicePixelRatio || 1
    canvas.width  = CW * dpr
    canvas.height = CH * dpr
    ctx.scale(dpr, dpr)
    draw(ctx, frais)
  }, [frais])

  // Alignement slider ↔ axes canvas
  const leftPct  = `${((PAD.l / CW) * 100).toFixed(2)}%`
  const rightPct = `${((PAD.r / CW) * 100).toFixed(2)}%`

  // ─── Bannière — texte seul, sans fond, montants en font-semibold text-brand ─
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

      {/* Bannière — ligne de texte centrée, sans fond coloré */}
      <p className="text-[16px] text-center text-ink mb-3">
        {bannerText}
      </p>

      {/* Tuile — fond blanc, bordure edge, border-radius card, padding 24px */}
      <div className="border border-edge rounded-lg bg-white p-6">

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          width={CW}
          height={CH}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />

        {/* Zone slider — séparée par border-t, sans fond coloré */}
        <div className="border-t border-edge mt-4 pt-4">
          <p className="text-[16px] font-medium text-ink text-center mb-3">
            Frais médicaux annuels : {fmtCHF(frais)}
          </p>
          {/* padding aligné sur les axes du canvas */}
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
          <p className="text-[13px] text-muted text-center mt-3 px-4">
            Calculée avec la caisse la moins chère pour chaque franchise à Genève, modèle standard
          </p>
        </div>
      </div>
    </div>
  )
}
