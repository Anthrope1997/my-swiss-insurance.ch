'use client'

import { useState, useEffect } from 'react'

interface Props {
  cantonName: string
  economieAn: number
}

function formatChf(n: number) {
  return n.toLocaleString('fr-CH')
}

export default function StickyBar({ cantonName, economieAn }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      setVisible(total > 0 && scrolled / total >= 0.4)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollToForm() {
    document.getElementById('formulaire')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.dispatchEvent(new CustomEvent('canton-form-intent', { detail: 'compare' }))
  }

  return (
    <div
      aria-hidden={!visible}
      className={[
        'fixed left-0 right-0 z-40 transition-opacity duration-300',
        'bottom-0 md:bottom-auto md:top-16',
        'bg-ink shadow-lg',
        'border-t border-white/10 md:border-t-0 md:border-b md:border-white/10',
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      ].join(' ')}
    >
      <div className="container-xl">
        <div className="flex items-center justify-between gap-4 py-3">
          <p className="text-white text-[13px] sm:text-[14px] leading-snug truncate">
            <span className="hidden sm:inline">Dans le canton de {cantonName} · </span>
            Économisez jusqu'à{' '}
            <strong className="text-[#4ade80]">CHF {formatChf(economieAn)} par an</strong>
            {' '}en changeant de caisse
          </p>
          <button
            onClick={scrollToForm}
            className="shrink-0 bg-brand hover:bg-brand-dark text-white text-[13px] font-semibold px-4 py-2 rounded-md transition-colors whitespace-nowrap"
          >
            Comparer ma prime →
          </button>
        </div>
      </div>
    </div>
  )
}
