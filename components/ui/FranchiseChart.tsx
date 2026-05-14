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
const CH  = 266   // 38 % de CW → graphique + slider visible sans scroll sur 1280 px
const PAD = { t: 52, r: 40, b: 42, l: 120 } as const
const CHART_W = CW - PAD.l - PAD.r   // 540
const CHART_H = CH - PAD.t - PAD.b   // 172

// ─── Tokens design system ─────────────────────────────────────────────────────
const C_F300      = '#1d4ed8'
const C_F2500     = '#3b82f6'
const C_SEUIL = '#64748b'  // slate-500 — moins agressif que l'ink
const C_EDGE      = '#e2e8f0'
const C_MUTED     = '#94a3b8'
const FONT        = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'

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

  // 1 ─ Zones colorées
  ctx.fillStyle = 'rgba(59, 130, 246, 0.07)'
  ctx.fillRect(cL, cT, seuilX - cL, CHART_H)
  ctx.fillStyle = 'rgba(29, 78, 216, 0.07)'
  ctx.fillRect(seuilX, cT, cR - seuilX, CHART_H)

  // 2 ─ Grille Y — dessinée en premier pour passer derrière tout le texte
  const yStep  = 1000
  const yStart = Math.ceil(Y_MIN / yStep) * yStep
  ctx.strokeStyle = C_EDGE
  ctx.lineWidth   = 1
  ctx.setLineDash([])
  for (let y = yStart; y <= Y_MAX; y += yStep) {
    const py = mapY(y)
    if (py < cT - 1 || py > cB + 1) continue
    ctx.beginPath(); ctx.moveTo(cL, py); ctx.lineTo(cR, py); ctx.stroke()
  }

  // 3 ─ Lignes d'axes
  ctx.strokeStyle = C_EDGE
  ctx.lineWidth   = 1
  ctx.beginPath()
  ctx.moveTo(cL, cT); ctx.lineTo(cL, cB); ctx.lineTo(cR, cB)
  ctx.stroke()

  // 4 ─ Seuil d'équilibre (slate, pointillé)
  ctx.strokeStyle = C_SEUIL
  ctx.lineWidth   = 1.5
  ctx.setLineDash([5, 4])
  ctx.beginPath(); ctx.moveTo(seuilX, cT); ctx.lineTo(seuilX, cB); ctx.stroke()
  ctx.setLineDash([])

  // 5 ─ Courbe F2500 — jusqu'à X_MAX
  ctx.strokeStyle = C_F2500
  ctx.lineWidth   = 2.5
  ctx.beginPath()
  for (let x = 0; x <= X_MAX; x += 5) {
    const px = mapX(x)
    const py = mapY(totalAnnuel(PRIME_2500, 2500, x))
    x === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
  }
  ctx.stroke()

  // 6 ─ Courbe F300 — jusqu'à X_MAX
  ctx.strokeStyle = C_F300
  ctx.lineWidth   = 2.5
  ctx.beginPath()
  for (let x = 0; x <= X_MAX; x += 5) {
    const px = mapX(x)
    const py = mapY(totalAnnuel(PRIME_300, 300, x))
    x === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
  }
  ctx.stroke()

  // 7 ─ Labels axe Y — par-dessus les lignes de grille
  for (let y = yStart; y <= Y_MAX; y += yStep) {
    const py = mapY(y)
    if (py < cT - 1 || py > cB + 1) continue
    ctx.textAlign = 'right'
    ctx.font      = `13px ${FONT}`
    ctx.fillStyle = C_MUTED
    ctx.fillText(fmtCHF(y), cL - 8, py + 4)
  }

  // 8 ─ Labels axe X
  const xTicks = [0, 1000, 2000, 3000, 4000]
  ctx.textAlign = 'center'
  ctx.font      = `13px ${FONT}`
  ctx.fillStyle = C_MUTED
  for (const x of xTicks) {
    ctx.fillText(
      x === 0 ? 'CHF 0' : `CHF ${x.toLocaleString('fr-CH')}`,
      mapX(x), cB + 20
    )
  }

  // 9 ─ Label seuil (au-dessus de la ligne pointillée)
  ctx.textAlign = 'center'
  ctx.font      = `bold 12px ${FONT}`
  ctx.fillStyle = C_SEUIL
  ctx.fillText(`Seuil : ${fmtCHF(SEUIL)}`, seuilX, cT - 8)

  // 11 ─ Labels courbes à droite (x = X_MAX) — F2500 au-dessus, F300 en dessous
  const endY2500 = mapY(totalAnnuel(PRIME_2500, 2500, X_MAX))
  const endY300  = mapY(totalAnnuel(PRIME_300,  300,  X_MAX))

  ctx.textAlign = 'right'
  ctx.font      = `bold 12px ${FONT}`
  ctx.fillStyle = C_F2500
  ctx.fillText('Franchise CHF 2 500', cR - 4, endY2500 - 10)
  ctx.fillStyle = C_F300
  ctx.fillText('Franchise CHF 300', cR - 4, endY300 + 17)

  // 12 ─ Labels de zone (bas du graphique) — en dernier pour rester lisibles
  const leftCx  = (cL + seuilX) / 2
  const rightCx = (seuilX + cR) / 2
  const zY1     = cB - 26
  const zY2     = cB - 10

  ctx.textAlign = 'center'
  ctx.font      = `bold 11px ${FONT}`
  ctx.fillStyle = C_F2500
  ctx.fillText('Franchise de CHF 2 500', leftCx, zY1)
  ctx.font      = `11px ${FONT}`
  ctx.fillText('plus avantageuse', leftCx, zY2)

  ctx.font      = `bold 11px ${FONT}`
  ctx.fillStyle = C_F300
  ctx.fillText('Franchise de CHF 300', rightCx, zY1)
  ctx.font      = `11px ${FONT}`
  ctx.fillText('plus avantageuse', rightCx, zY2)

  // 13 ─ Interaction slider
  if (frais > 0) {
    const sliderX = mapX(frais)

    ctx.strokeStyle = C_MUTED
    ctx.lineWidth   = 1.5
    ctx.setLineDash([4, 3])
    ctx.beginPath(); ctx.moveTo(sliderX, cT); ctx.lineTo(sliderX, cB); ctx.stroke()
    ctx.setLineDash([])

    const dotY2500 = mapY(totalAnnuel(PRIME_2500, 2500, frais))
    ctx.fillStyle   = C_F2500
    ctx.strokeStyle = 'white'
    ctx.lineWidth   = 2
    ctx.beginPath(); ctx.arc(sliderX, dotY2500, 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke()

    const dotY300 = mapY(totalAnnuel(PRIME_300, 300, frais))
    ctx.fillStyle   = C_F300
    ctx.beginPath(); ctx.arc(sliderX, dotY300, 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
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

  // ─── Bannière — trois états (pas de vert : bg-blue-tint pour les deux états actifs)
  const bannerBg =
    frais === 0
      ? 'bg-cloud'
      : 'bg-blue-tint'

  const bannerContent =
    frais === 0 ? (
      <span className="text-[16px] text-muted">
        Déplacez le curseur pour voir quelle franchise est la plus avantageuse
      </span>
    ) : frais < SEUIL ? (
      <span className="text-[16px] text-ink">
        La franchise de{' '}
        <span className="text-[22px] font-bold text-brand">CHF 2 500</span>
        {' '}est plus avantageuse pour{' '}
        <span className="text-[22px] font-bold text-brand">{fmtCHF(frais)}</span>
        {' '}de frais médicaux annuels
      </span>
    ) : (
      <span className="text-[16px] text-ink">
        La franchise de{' '}
        <span className="text-[22px] font-bold text-brand">CHF 300</span>
        {' '}est plus avantageuse pour{' '}
        <span className="text-[22px] font-bold text-brand">{fmtCHF(frais)}</span>
        {' '}de frais médicaux annuels
      </span>
    )

  // Le slider s'aligne sur les axes du canvas via des % de la largeur totale
  const leftPct  = `${((PAD.l / CW) * 100).toFixed(2)}%`
  const rightPct = `${((PAD.r / CW) * 100).toFixed(2)}%`

  return (
    <div className="mb-6">
      <style>{`
        .franchise-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 6px;
          background: #dbeafe;
          outline: none;
          cursor: pointer;
        }
        .franchise-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #1d4ed8;
          cursor: pointer;
          box-shadow: 0 1px 4px rgba(29,78,216,0.35);
          border: 2px solid white;
        }
        .franchise-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #1d4ed8;
          cursor: pointer;
          box-shadow: 0 1px 4px rgba(29,78,216,0.35);
          border: 2px solid white;
          box-sizing: border-box;
        }
        .franchise-slider::-moz-range-track {
          height: 6px;
          border-radius: 6px;
          background: #dbeafe;
        }
      `}</style>

      {/* Bannière dynamique */}
      <div className={`${bannerBg} rounded-[8px] px-4 py-3 mb-3 text-center`}>
        <p>{bannerContent}</p>
      </div>

      {/* Label axe Y — hors du canvas, aligné à gauche au niveau de CHF 10 000 */}
      <p className="text-[16px] text-muted mb-1">
        Coût annuel de votre assurance LAMal
      </p>

      {/* Tuile — graphique + slider + source */}
      <div className="border border-edge rounded-[8px] bg-white overflow-hidden">

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          width={CW}
          height={CH}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />

        {/* Zone slider — fond cloud légèrement distinct */}
        <div className="border-t border-edge bg-cloud py-4">
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
