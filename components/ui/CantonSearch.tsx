'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const CANTONS: { nom: string; code: string; slug: string | null }[] = [
  { nom: 'Argovie',             code: 'AG', slug: null },
  { nom: 'Appenzell Rh.-Int.',  code: 'AI', slug: null },
  { nom: 'Appenzell Rh.-Ext.', code: 'AR', slug: null },
  { nom: 'Bâle-Campagne',      code: 'BL', slug: null },
  { nom: 'Bâle-Ville',         code: 'BS', slug: null },
  { nom: 'Berne',              code: 'BE', slug: null },
  { nom: 'Fribourg',           code: 'FR', slug: 'fribourg' },
  { nom: 'Genève',             code: 'GE', slug: 'geneve' },
  { nom: 'Glaris',             code: 'GL', slug: null },
  { nom: 'Grisons',            code: 'GR', slug: null },
  { nom: 'Jura',               code: 'JU', slug: 'jura' },
  { nom: 'Lucerne',            code: 'LU', slug: null },
  { nom: 'Neuchâtel',          code: 'NE', slug: 'neuchatel' },
  { nom: 'Nidwald',            code: 'NW', slug: null },
  { nom: 'Obwald',             code: 'OW', slug: null },
  { nom: 'Saint-Gall',         code: 'SG', slug: null },
  { nom: 'Schaffhouse',        code: 'SH', slug: null },
  { nom: 'Schwyz',             code: 'SZ', slug: null },
  { nom: 'Soleure',            code: 'SO', slug: null },
  { nom: 'Tessin',             code: 'TI', slug: null },
  { nom: 'Thurgovie',          code: 'TG', slug: null },
  { nom: 'Uri',                code: 'UR', slug: null },
  { nom: 'Valais',             code: 'VS', slug: 'valais' },
  { nom: 'Vaud',               code: 'VD', slug: 'vaud' },
  { nom: 'Zoug',               code: 'ZG', slug: null },
  { nom: 'Zurich',             code: 'ZH', slug: null },
]

export default function CantonSearch() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)
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
    if (c.slug) {
      router.push(`/lamal/canton/${c.slug}`)
    } else {
      setNotice(`La page pour ${c.nom} est en cours de rédaction. Revenez bientôt.`)
    }
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
          onChange={e => { setQuery(e.target.value); setOpen(true); setNotice(null) }}
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
                  {c.slug
                    ? <span className="text-[11px] text-brand font-medium">Voir →</span>
                    : <span className="text-[11px] text-slate/50">Bientôt</span>
                  }
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {notice && (
        <p className="mt-2 text-[13px] text-slate bg-cloud border border-edge rounded-md px-3 py-2">
          {notice}
        </p>
      )}
    </div>
  )
}
