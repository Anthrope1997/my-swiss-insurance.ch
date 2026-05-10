'use client'

import { useEffect, useRef } from 'react'
import UnifiedLeadForm from '@/components/ui/UnifiedLeadForm'

const HEADER = 64

export default function DevisClient() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    // Empêche le scroll du document (iOS scroll le document pour amener le champ
    // actif en vue quand le clavier apparaît — on bloque ça ici)
    const html = document.documentElement
    const body = document.body
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'

    const vv = window.visualViewport
    if (!vv) return

    function fit() {
      if (ref.current) {
        ref.current.style.height = `${vv!.height - HEADER}px`
      }
    }

    fit()
    vv.addEventListener('resize', fit)

    return () => {
      html.style.overflow = ''
      body.style.overflow = ''
      vv.removeEventListener('resize', fit)
    }
  }, [])

  return (
    <main
      ref={ref}
      style={{ height: `calc(100dvh - ${HEADER}px)` }}
      className="flex flex-col overflow-hidden bg-white"
    >
      <div className="shrink-0 px-4 pt-5 pb-3">
        <p className="text-[16px] text-slate leading-snug text-center">
          Un conseiller spécialisé vous présente les offres les plus avantageuses sous 24 heures.
          C&apos;est gratuit et sans engagement.
        </p>
      </div>
      <div className="flex-1 min-h-0 relative px-4">
        <UnifiedLeadForm redirectOnSuccess="/fr/merci" fullscreen />
      </div>
    </main>
  )
}
