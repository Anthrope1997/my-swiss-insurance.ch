'use client'

import { useEffect, useRef } from 'react'
import UnifiedLeadForm from '@/components/ui/UnifiedLeadForm'

const HEADER = 64

export default function DevisClient() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const vv = window.visualViewport
    if (!vv) return

    function fit() {
      if (ref.current) {
        ref.current.style.height = `${vv!.height - HEADER}px`
      }
      // iOS scrolle la page quand un input est focalisé — on remet à 0
      if (window.scrollY > 0) window.scrollTo(0, 0)
    }

    fit()
    vv.addEventListener('resize', fit)
    vv.addEventListener('scroll', fit)
    window.addEventListener('scroll', fit)

    return () => {
      vv.removeEventListener('resize', fit)
      vv.removeEventListener('scroll', fit)
      window.removeEventListener('scroll', fit)
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
