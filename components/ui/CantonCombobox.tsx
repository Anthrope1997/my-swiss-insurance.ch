'use client'

import { useState, useRef, useEffect } from 'react'

const CANTONS: { nom: string; code: string }[] = [
  { nom: 'Argovie',                       code: 'AG' },
  { nom: 'Appenzell Rhodes-Extérieures',  code: 'AR' },
  { nom: 'Appenzell Rhodes-Intérieures',  code: 'AI' },
  { nom: 'Bâle-Campagne',                 code: 'BL' },
  { nom: 'Bâle-Ville',                    code: 'BS' },
  { nom: 'Berne',                          code: 'BE' },
  { nom: 'Fribourg',                       code: 'FR' },
  { nom: 'Genève',                         code: 'GE' },
  { nom: 'Glaris',                         code: 'GL' },
  { nom: 'Grisons',                        code: 'GR' },
  { nom: 'Jura',                           code: 'JU' },
  { nom: 'Lucerne',                        code: 'LU' },
  { nom: 'Neuchâtel',                      code: 'NE' },
  { nom: 'Nidwald',                        code: 'NW' },
  { nom: 'Obwald',                         code: 'OW' },
  { nom: 'Saint-Gall',                     code: 'SG' },
  { nom: 'Schaffhouse',                    code: 'SH' },
  { nom: 'Schwyz',                         code: 'SZ' },
  { nom: 'Soleure',                        code: 'SO' },
  { nom: 'Tessin',                         code: 'TI' },
  { nom: 'Thurgovie',                      code: 'TG' },
  { nom: 'Uri',                            code: 'UR' },
  { nom: 'Valais',                         code: 'VS' },
  { nom: 'Vaud',                           code: 'VD' },
  { nom: 'Zoug',                           code: 'ZG' },
  { nom: 'Zurich',                         code: 'ZH' },
]

export const CANTON_NAMES = CANTONS.map(c => c.nom)

interface Props {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  id?: string
}

export default function CantonCombobox({ value, onChange, placeholder = 'Vaud ou VD', id }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const results = value.length > 0
    ? CANTONS.filter(c =>
        c.nom.toLowerCase().includes(value.toLowerCase()) ||
        c.code.toLowerCase().startsWith(value.toLowerCase())
      )
    : []

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  function select(c: (typeof CANTONS)[number]) {
    onChange(c.nom)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate/40 pointer-events-none"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          id={id}
          type="text"
          value={value}
          placeholder={placeholder}
          autoComplete="off"
          onChange={e => { onChange(e.target.value); setOpen(true) }}
          onFocus={() => { if (value.length > 0) setOpen(true) }}
          className="input-field !h-11 !text-[14px] pl-9"
        />
      </div>

      {open && results.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full bg-white border border-edge rounded-md shadow-lg max-h-52 overflow-y-auto">
          {results.map(c => (
            <li key={c.code}>
              <button
                type="button"
                onClick={() => select(c)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-cloud transition-colors duration-100"
              >
                <span className="text-[14px] text-ink">{c.nom}</span>
                <span className="text-[11px] font-semibold text-slate/50 uppercase tracking-wide">
                  {c.code}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
