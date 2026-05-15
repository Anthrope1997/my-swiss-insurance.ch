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

// ─── Dimensions canvas (espace logique) ───────────────────────────────────────
const CW  = 700
const CH  = 266   // 38 % de CW
const PAD = { t: 52, r: 40, b: 42, l: 90 } as const
const CHART_W = CW - PAD.l - PAD.r   // 570
const CHART_H = CH - PAD.t - PAD.b   // 172

// ─── Tokens canvas ────────────────────────────────────────────────────────────
const C_F300     = '#1d4ed8'  // brand — courbe franchise CHF 300
const C_F2500    = '#3b82f6'  // brand-light — courbe franchise CHF 2 500
const C_LABEL    = '#6B7280'  // gris — titres d'axe et graduations
const C_SEUIL    = '#374151'  // slate-700 — ligne + valeur du seuil
const C_EDGE     = '#e2e8f0'  // edge — axes + ligne curseur
const C_GRID     = '#f1f5f9'  // cloud — grille horizontale
const C_ANN_2500 = '#378ADD'  // annotation zone CHF 2 500
const C_ANN_300  = '#0F4C8A'  // annotation zone CHF 300
const FONT    = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmtCHF = (n: number): string =>
  `CHF ${Math.round(n).toLocaleString('fr-CH', { maximumFractionDigits: 0 })}`

const mapX = (x: number): number => PAD.l + (x / X_MAX) * CHART_W
const mapY = (y: number): number => PAD.t + CHART_H * (1 - (y - Y_MIN) / Y_RANGE)

// ─── Dessin canvas ─────────────────────────────────────────────────────────────
// scale = CW / displayWidth : ramène les tailles de police de pixels canvas
// vers des pixels CSS réels, quelle que soit la largeur d'affichage du canvas.
function draw(ctx: CanvasRenderingContext2D, frais: number, scale: number): void {
  // px() convertit une cible CSS px en px logiques canvas
  const px = (n: number) => Math.round(n * scale)

  ctx.clearRect(0, 0, CW, CH)

  const seuilX = mapX(SEUIL)
  const cL     = PAD.l
  const cR     = PAD.l + CHART_W
  const cT     = PAD.t
  const cB     = PAD.t + CHART_H

  // 1 ─ Grille Y horizontale — 0.5 px logique, en premier
  const yStep  = 1000
  const yStart = Math.ceil(Y_MIN / yStep) * yStep
  ctx.strokeStyle = C_GRID
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

  // 3 ─ Ligne de seuil — 1 px pointillé, slate-700
  ctx.strokeStyle = C_SEUIL
  ctx.lineWidth   = 1
  ctx.setLineDash([5, 4])
  ctx.beginPath(); ctx.moveTo(seuilX, cT); ctx.lineTo(seuilX, cB); ctx.stroke()
  ctx.setLineDash([])

  // 4 ─ Courbe F2500
  ctx.strokeStyle = C_F2500
  ctx.lineWidth   = 2
  ctx.beginPath()
  for (let x = 0; x <= X_MAX; x += 5) {
    const p = mapX(x), q = mapY(totalAnnuel(PRIME_2500, 2500, x))
    x === 0 ? ctx.moveTo(p, q) : ctx.lineTo(p, q)
  }
  ctx.stroke()

  // 5 ─ Courbe F300
  ctx.strokeStyle = C_F300
  ctx.lineWidth   = 2
  ctx.beginPath()
  for (let x = 0; x <= X_MAX; x += 5) {
    const p = mapX(x), q = mapY(totalAnnuel(PRIME_300, 300, x))
    x === 0 ? ctx.moveTo(p, q) : ctx.lineTo(p, q)
  }
  ctx.stroke()

  // 6 ─ Labels axe Y — 13 CSS px, left-alignés à x=cL (flottants dans le graphique)
  for (let y = yStart; y <= Y_MAX; y += yStep) {
    const py = mapY(y)
    if (py < cT - 1 || py > cB + 1) continue
    ctx.textAlign = 'left'
    ctx.font      = `${px(13)}px ${FONT}`
    ctx.fillStyle = C_LABEL
    ctx.fillText(fmtCHF(y), cL, py + px(5))
  }

  // 7 ─ Labels axe X — 13 CSS px ; dernier tick right-aligné (évite le débord)
  const xTicks = [0, 1000, 2000, 3000, 4000]
  ctx.font      = `${px(13)}px ${FONT}`
  ctx.fillStyle = C_LABEL
  for (const x of xTicks) {
    const label = x === 0 ? 'CHF 0' : `CHF ${x.toLocaleString('fr-CH')}`
    if (x === X_MAX) {
      ctx.textAlign = 'right'
      ctx.fillText(label, cR, cB + px(18))
    } else {
      ctx.textAlign = 'center'
      ctx.fillText(label, mapX(x), cB + px(18))
    }
  }

  // 8 ─ Titre axe Y — 16 CSS px, dans PAD.top, left-aligné à x=cL
  ctx.textAlign = 'left'
  ctx.font      = `${px(16)}px ${FONT}`
  ctx.fillStyle = C_LABEL
  ctx.fillText('Coût annuel de votre assurance LAMal', cL, cT - px(30))

  // 9 ─ Valeur seuil — 20 CSS px, weight 600, slate-700, left-alignée à x=cL
  ctx.textAlign = 'left'
  ctx.font      = `600 ${px(20)}px ${FONT}`
  ctx.fillStyle = C_SEUIL
  ctx.fillText(fmtCHF(SEUIL), cL, cT - px(8))

  // 10 ─ Annotations de zone — coin supérieur de chaque zone, au-dessus des courbes
  const leftCx  = mapX(SEUIL / 2)
  const rightCx = mapX((SEUIL + X_MAX) / 2)
  const labelY  = mapY(9700)  // y=9700 : toujours au-dessus des deux courbes

  ctx.shadowColor = 'white'
  ctx.shadowBlur  = 6

  ctx.textAlign = 'center'
  ctx.font      = `600 ${px(14)}px ${FONT}`
  ctx.fillStyle = C_ANN_2500
  ctx.fillText('Franchise CHF 2 500', leftCx, labelY)
  ctx.font      = `${px(14)}px ${FONT}`
  ctx.fillText('plus avantageuse', leftCx, labelY + px(16))

  ctx.font      = `600 ${px(14)}px ${FONT}`
  ctx.fillStyle = C_ANN_300
  ctx.fillText('Franchise CHF 300', rightCx, labelY)
  ctx.font      = `${px(14)}px ${FONT}`
  ctx.fillText('plus avantageuse', rightCx, labelY + px(16))

  ctx.shadowBlur = 0

  // 12 ─ Interaction slider
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
    ctx.beginPath(); ctx.arc(sliderX, dotY2500, px(4), 0, Math.PI * 2); ctx.fill(); ctx.stroke()

    const dotY300 = mapY(totalAnnuel(PRIME_300, 300, frais))
    ctx.fillStyle   = C_F300
    ctx.beginPath(); ctx.arc(sliderX, dotY300, px(4), 0, Math.PI * 2); ctx.fill(); ctx.stroke()
  }
}

// ─── Composant React ──────────────────────────────────────────────────────────
export default function FranchiseChart() {
  const [frais, setFrais]             = useState(0)
  const [displayWidth, setDisplayWidth] = useState(CW)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Redessine quand frais ou displayWidth changent
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1
    canvas.width  = CW * dpr
    canvas.height = CH * dpr
    ctx.scale(dpr, dpr)
    // scale = ratio logique/affiché → convertit px CSS en px canvas
    draw(ctx, frais, CW / displayWidth)
  }, [frais, displayWidth])

  // Mesure la largeur d'affichage réelle pour calibrer les polices
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ro = new ResizeObserver(entries => {
      const w = entries[0].contentRect.width
      if (w > 0) setDisplayWidth(w)
    })
    ro.observe(canvas)
    return () => ro.disconnect()
  }, [])

  // Alignement slider ↔ axes canvas
  const leftPct  = `${((PAD.l / CW) * 100).toFixed(2)}%`
  const rightPct = `${((PAD.r / CW) * 100).toFixed(2)}%`

  // ─── Bannière ────────────────────────────────────────────────────────────────
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

        <canvas
          ref={canvasRef}
          width={CW}
          height={CH}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />

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
