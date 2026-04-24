'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const CANTONS: { nom: string; code: string; slug: string }[] = [
  { nom: 'Argovie',                       code: 'AG', slug: 'argovie' },
  { nom: 'Appenzell Rh.-Int.',            code: 'AI', slug: 'appenzell-rhodes-interieures' },
  { nom: 'Appenzell Rh.-Ext.',            code: 'AR', slug: 'appenzell-rhodes-exterieures' },
  { nom: 'Bâle-Campagne',                code: 'BL', slug: 'bale-campagne' },
  { nom: 'Bâle-Ville',                   code: 'BS', slug: 'bale-ville' },
  { nom: 'Berne',                         code: 'BE', slug: 'berne' },
  { nom: 'Fribourg',                      code: 'FR', slug: 'fribourg' },
  { nom: 'Genève',                        code: 'GE', slug: 'geneve' },
  { nom: 'Glaris',                        code: 'GL', slug: 'glaris' },
  { nom: 'Grisons',                       code: 'GR', slug: 'grisons' },
  { nom: 'Jura',                          code: 'JU', slug: 'jura' },
  { nom: 'Lucerne',                       code: 'LU', slug: 'lucerne' },
  { nom: 'Neuchâtel',                     code: 'NE', slug: 'neuchatel' },
  { nom: 'Nidwald',                       code: 'NW', slug: 'nidwald' },
  { nom: 'Obwald',                        code: 'OW', slug: 'obwald' },
  { nom: 'Saint-Gall',                    code: 'SG', slug: 'saint-gall' },
  { nom: 'Schaffhouse',                   code: 'SH', slug: 'schaffhouse' },
  { nom: 'Schwyz',                        code: 'SZ', slug: 'schwyz' },
  { nom: 'Soleure',                       code: 'SO', slug: 'soleure' },
  { nom: 'Tessin',                        code: 'TI', slug: 'tessin' },
  { nom: 'Thurgovie',                     code: 'TG', slug: 'thurgovie' },
  { nom: 'Uri',                           code: 'UR', slug: 'uri' },
  { nom: 'Valais',                        code: 'VS', slug: 'valais' },
  { nom: 'Vaud',                          code: 'VD', slug: 'vaud' },
  { nom: 'Zoug',                          code: 'ZG', slug: 'zoug' },
  { nom: 'Zurich',                        code: 'ZH', slug: 'zurich' },
]

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
    router.push(`/lamal/canton/${c.slug}`)
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
                <span className="text-[15px] text-ink">{c.nom}</span>
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
