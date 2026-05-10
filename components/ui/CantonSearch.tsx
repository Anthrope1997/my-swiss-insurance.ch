'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CANTONS as RAW_CANTONS } from '@/data/shared/cantons'

const CANTONS = RAW_CANTONS.map(c => ({
  nom:  c.nomCourt ?? c.nom,
  code: c.code,
  slug: c.slug,
}))

export default function CantonSearch() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const results = query.length > 0
    ? CANTONS.filter(c =>
        c.nom.toLowerCase().includes(query.toLowerCase()) ||
        c.code.toLowerCase().includes(query.toLowerCase())
      )
    : []

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  function select(c: typeof CANTONS[number]) {
    setQuery(c.nom)
    setOpen(false)
    router.push(`/sante/canton/${c.slug}`)
  }

  return (
    <div ref={ref} className="relative max-w-md">
      <div className="relative">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate/50 pointer-events-none"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          type="text"
          placeholder="Rechercher votre canton..."
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => { if (query.length > 0) setOpen(true) }}
          className="input-field pl-10"
        />
      </div>

      {open && results.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full bg-white border border-edge rounded-md shadow-lg max-h-64 overflow-y-auto">
          {results.map(c => (
            <li key={c.code}>
              <button
                onClick={() => select(c)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-cloud transition-colors duration-100"
              >
                <span className="text-[16px] text-ink">{c.nom}</span>
                <span className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-slate/60 uppercase tracking-wide">
                    {c.code}
                  </span>
                  <span className="text-[11px] text-brand font-medium">Voir →</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

    </div>
  )
}
