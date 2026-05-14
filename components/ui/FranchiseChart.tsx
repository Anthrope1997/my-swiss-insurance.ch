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
const SEUIL     = Math.round((12 * (PRIME_300 - PRIME_2500) + 270) / 0.9)
const X_MAX     = 4000   // axe X va jusqu'à CHF 4 000
const CURVE_END = 3500   // les courbes s'arrêtent à CHF 3 500

// ─── Plage Y — calculée une seule fois au chargement du module ────────────────
const _ys: number[] = []
for (let x = 0; x <= CURVE_END; x += 20) {
  _ys.push(totalAnnuel(PRIME_300,  300,  x))
  _ys.push(totalAnnuel(PRIME_2500, 2500, x))
}
const _rawMin = Math.min(..._ys)          // ≈ 6 232.8 (F2500 à x=0)
const _rawMax = Math.max(..._ys)          // ≈ 8 832.8 (F2500 à x=3 500)
const _padY   = (_rawMax - _rawMin) * 0.09
const Y_MIN   = _rawMin - _padY          // ≈ 5 998.8
const Y_MAX   = _rawMax + _padY          // ≈ 9 066.8
const Y_RANGE = Y_MAX - Y_MIN

// ─── Dimensions canvas ────────────────────────────────────────────────────────
const CW  = 700
const CH  = 380
const PAD = { t: 72, r: 28, b: 54, l: 80 } as const
const CHART_W = CW - PAD.l - PAD.r   // 592
const CHART_H = CH - PAD.t - PAD.b   // 254

// ─── Tokens design system ─────────────────────────────────────────────────────
const C_F300      = '#1d4ed8'  // brand          — F300
const C_F2500     = '#3b82f6'  // brand-light    — F2500
const C_SEUIL     = '#16a34a'  // green-600      — seuil d'équilibre
const C_INFLEXION = '#cbd5e1'  // slate-200      — inflexion CHF 2 500
const C_EDGE      = '#e2e8f0'  // edge
const C_MUTED     = '#94a3b8'  // muted
const FONT        = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmtCHF = (n: number): string =>
  `CHF ${Math.round(n).toLocaleString('fr-CH', { maximumFractionDigits: 0 })}`

const mapX = (x: number): number => PAD.l + (x / X_MAX) * CHART_W
const mapY = (y: number): number => PAD.t + CHART_H * (1 - (y - Y_MIN) / Y_RANGE)

// ─── Dessin canvas ────────────────────────────────────────────────────────────
function draw(ctx: CanvasRenderingContext2D, frais: number): void {
  ctx.clearRect(0, 0, CW, CH)

  const seuilX  = mapX(SEUIL)
  const inflexX = mapX(2500)
  const endX    = mapX(CURVE_END)
  const cL      = PAD.l
  const cR      = PAD.l + CHART_W
  const cT      = PAD.t
  const cB      = PAD.t + CHART_H

  // 1 ─ Zones colorées
  ctx.fillStyle = 'rgba(59, 130, 246, 0.07)'   // bleu clair 7 % — F2500 avantageuse
  ctx.fillRect(cL, cT, seuilX - cL, CHART_H)
  ctx.fillStyle = 'rgba(29, 78, 216, 0.07)'    // bleu foncé 7 % — F300 avantageuse
  ctx.fillRect(seuilX, cT, cR - seuilX, CHART_H)

  // 2 ─ Labels de zone (centrés en bas, deux lignes)
  const leftCx  = (cL + seuilX) / 2
  const rightCx = (seuilX + cR) / 2
  const zY1     = cB - 26   // ligne bold
  const zY2     = cB - 10   // ligne regular

  ctx.textAlign = 'center'
  ctx.font      = `bold 10px ${FONT}`
  ctx.fillStyle = C_F2500
  ctx.fillText('Franchise de CHF 2 500', leftCx, zY1)
  ctx.font      = `10px ${FONT}`
  ctx.fillText('plus avantageuse', leftCx, zY2)

  ctx.font      = `bold 10px ${FONT}`
  ctx.fillStyle = C_F300
  ctx.fillText('Franchise de CHF 300', rightCx, zY1)
  ctx.font      = `10px ${FONT}`
  ctx.fillText('plus avantageuse', rightCx, zY2)

  // 3 ─ Grille Y + labels axe Y
  const yStep  = 500
  const yStart = Math.ceil(Y_MIN / yStep) * yStep
  for (let y = yStart; y <= Y_MAX; y += yStep) {
    const py = mapY(y)
    if (py < cT - 1 || py > cB + 1) continue
    // Ligne de grille
    ctx.strokeStyle = C_EDGE
    ctx.lineWidth   = 1
    ctx.setLineDash([])
    ctx.beginPath(); ctx.moveTo(cL, py); ctx.lineTo(cR, py); ctx.stroke()
    // Label
    ctx.textAlign  = 'right'
    ctx.font       = `10px ${FONT}`
    ctx.fillStyle  = C_MUTED
    ctx.fillText(fmtCHF(y), cL - 6, py + 4)
  }

  // 4 ─ Labels axe X
  const xTicks = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000]
  ctx.textAlign = 'center'
  ctx.font      = `10px ${FONT}`
  ctx.fillStyle = C_MUTED
  for (const x of xTicks) {
    ctx.fillText(
      x === 0 ? 'CHF 0' : `CHF ${x.toLocaleString('fr-CH')}`,
      mapX(x), cB + 18
    )
  }

  // 5 ─ Label axe Y (horizontal, au-dessus)
  ctx.textAlign = 'left'
  ctx.font      = `10px ${FONT}`
  ctx.fillStyle = C_MUTED
  ctx.fillText('Coût annuel total (CHF)', cL, cT - 12)

  // 6 ─ Lignes d'axes
  ctx.strokeStyle = C_EDGE
  ctx.lineWidth   = 1
  ctx.setLineDash([])
  ctx.beginPath()
  ctx.moveTo(cL, cT); ctx.lineTo(cL, cB); ctx.lineTo(cR, cB)
  ctx.stroke()

  // 7 ─ Ligne d'inflexion CHF 2 500 (gris clair, pointillé)
  ctx.strokeStyle = C_INFLEXION
  ctx.lineWidth   = 1
  ctx.setLineDash([4, 4])
  ctx.beginPath(); ctx.moveTo(inflexX, cT); ctx.lineTo(inflexX, cB); ctx.stroke()

  // 8 ─ Seuil d'équilibre (vert, pointillé)
  ctx.strokeStyle = C_SEUIL
  ctx.lineWidth   = 1.5
  ctx.setLineDash([5, 4])
  ctx.beginPath(); ctx.moveTo(seuilX, cT); ctx.lineTo(seuilX, cB); ctx.stroke()
  ctx.setLineDash([])

  ctx.textAlign = 'center'
  ctx.font      = `bold 10px ${FONT}`
  ctx.fillStyle = C_SEUIL
  ctx.fillText(`CHF ${SEUIL.toLocaleString('fr-CH')}`, seuilX, cT - 4)

  // 9 ─ Courbe F2500 (bleu secondaire)
  ctx.strokeStyle = C_F2500
  ctx.lineWidth   = 2.5
  ctx.setLineDash([])
  ctx.beginPath()
  for (let x = 0; x <= CURVE_END; x += 5) {
    const px = mapX(x)
    const py = mapY(totalAnnuel(PRIME_2500, 2500, x))
    x === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
  }
  ctx.stroke()

  // 10 ─ Courbe F300 (bleu foncé)
  ctx.strokeStyle = C_F300
  ctx.lineWidth   = 2.5
  ctx.beginPath()
  for (let x = 0; x <= CURVE_END; x += 5) {
    const px = mapX(x)
    const py = mapY(totalAnnuel(PRIME_300, 300, x))
    x === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
  }
  ctx.stroke()

  // 11 ─ Labels courbes à x = CURVE_END (centrés au-dessus du point final)
  const endY2500 = mapY(totalAnnuel(PRIME_2500, 2500, CURVE_END))
  const endY300  = mapY(totalAnnuel(PRIME_300,  300,  CURVE_END))

  ctx.textAlign = 'center'
  ctx.font      = `bold 10px ${FONT}`
  ctx.fillStyle = C_F2500
  ctx.fillText('Franchise de CHF 2 500', endX, endY2500 - 10)
  ctx.fillStyle = C_F300
  ctx.fillText('Franchise de CHF 300', endX, endY300 - 10)

  // 12 ─ Interaction slider
  if (frais > 0) {
    const sliderX = mapX(frais)

    // Ligne verticale pointillée
    ctx.strokeStyle = C_MUTED
    ctx.lineWidth   = 1.5
    ctx.setLineDash([4, 3])
    ctx.beginPath(); ctx.moveTo(sliderX, cT); ctx.lineTo(sliderX, cB); ctx.stroke()
    ctx.setLineDash([])

    // Points sur les courbes (uniquement si frais ≤ CURVE_END)
    if (frais <= CURVE_END) {
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
    // Resize pour les écrans haute densité — réinitialise le contexte
    const dpr    = window.devicePixelRatio || 1
    canvas.width  = CW * dpr
    canvas.height = CH * dpr
    ctx.scale(dpr, dpr)
    draw(ctx, frais)
  }, [frais])

  // Bannière — trois états
  const banner =
    frais === 0
      ? {
          bg:  'bg-cloud',
          cls: 'text-muted',
          msg: 'Déplacez le curseur pour voir quelle franchise est la plus avantageuse',
        }
      : frais < SEUIL
      ? {
          bg:  'bg-blue-tint',
          cls: 'text-ink',
          msg: `La franchise de CHF 2 500 est plus avantageuse pour ${fmtCHF(frais)} de frais médicaux annuels`,
        }
      : {
          bg:  'bg-[#dcfce7]',
          cls: 'text-ink',
          msg: `La franchise de CHF 300 est plus avantageuse pour ${fmtCHF(frais)} de frais médicaux annuels`,
        }

  // Alignement slider ↔ axes canvas (en % de la largeur du canvas)
  const leftPct  = `${((PAD.l / CW) * 100).toFixed(2)}%`
  const rightPct = `${((PAD.r / CW) * 100).toFixed(2)}%`

  return (
    <div className="mb-6">
      {/* Bannière dynamique */}
      <div className={`${banner.bg} rounded-[8px] px-4 py-3 mb-3 text-center`}>
        <p className={`text-[16px] ${banner.cls}`}>{banner.msg}</p>
      </div>

      {/* Graphique Canvas */}
      <div className="border border-edge rounded-[8px] bg-white overflow-hidden">
        <canvas
          ref={canvasRef}
          width={CW}
          height={CH}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>

      {/* Label + slider aligné sur les axes */}
      <div className="mt-4">
        <p className="text-[16px] font-medium text-ink text-center mb-2">
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
            className="w-full accent-brand cursor-pointer"
          />
        </div>
      </div>

      {/* Source */}
      <p className="text-[13px] text-muted text-center mt-2">
        Calculée avec la caisse la moins chère pour chaque franchise à Genève, modèle standard
      </p>
    </div>
  )
}
