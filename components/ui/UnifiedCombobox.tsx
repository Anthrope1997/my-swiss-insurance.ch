'use client'

import { useState, useRef, useEffect } from 'react'

export interface ComboOption {
  value: string
  label: string
  abbreviation?: string
}

interface Props {
  options: ComboOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  searchable?: boolean
  showAbbreviation?: boolean
  id?: string
  className?: string
}

function SearchIcon() {
  return (
    <svg
      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate/40 pointer-events-none"
      fill="none" stroke="currentColor" viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg className="w-4 h-4 text-slate shrink-0 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

export default function UnifiedCombobox({
  options,
  value,
  onChange,
  placeholder = 'Sélectionner',
  searchable = true,
  showAbbreviation = false,
  id,
  className = '',
}: Props) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedOpt = options.find(o => o.value === value)

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const filtered = query.length > 0
    ? options.filter(o =>
        o.label.toLowerCase().includes(query.toLowerCase()) ||
        (o.abbreviation != null && o.abbreviation.toLowerCase().startsWith(query.toLowerCase()))
      )
    : options

  function select(opt: ComboOption) {
    onChange(opt.value)
    setQuery('')
    setOpen(false)
  }

  const dropdownList = (open && (searchable ? filtered : options).length > 0) && (
    <ul className="absolute z-20 mt-1 w-full bg-white border border-edge rounded-md shadow-lg max-h-52 overflow-y-auto">
      {(searchable ? filtered : options).map(opt => (
        <li key={opt.value}>
          <button
            type="button"
            onClick={() => select(opt)}
            className={[
              'w-full flex items-center justify-between px-3 py-2.5 text-left transition-colors duration-100',
              opt.value === value ? 'bg-[#EBF3FB]' : 'hover:bg-cloud',
            ].join(' ')}
          >
            <span className="text-[16px] text-ink">{opt.label}</span>
            {showAbbreviation && opt.abbreviation != null && (
              <span className="text-[11px] font-semibold text-slate/50 uppercase tracking-wide">
                {opt.abbreviation}
              </span>
            )}
          </button>
        </li>
      ))}
    </ul>
  )

  // ── Non-searchable: styled button trigger ─────────────────────────────────
  if (!searchable) {
    return (
      <div ref={containerRef} className="relative">
        <button
          id={id}
          type="button"
          onClick={() => setOpen(v => !v)}
          className={`input-field text-left flex items-center justify-between gap-2 ${className}`}
        >
          <span className={`flex-1 truncate ${selectedOpt ? 'text-ink' : 'text-slate/40'}`}>
            {selectedOpt ? selectedOpt.label : placeholder}
          </span>
          <ChevronIcon />
        </button>
        {dropdownList}
      </div>
    )
  }

  // ── Searchable: magnifying glass + input ──────────────────────────────────
  const displayValue = open ? query : (selectedOpt?.label ?? query)

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <SearchIcon />
        <input
          id={id}
          type="text"
          value={displayValue}
          placeholder={placeholder}
          autoComplete="off"
          onChange={e => {
            setQuery(e.target.value)
            setOpen(true)
            if (value !== '') onChange('')
          }}
          onFocus={() => {
            setQuery('')
            setOpen(true)
          }}
          className={`input-field pl-9 ${className}`}
        />
      </div>
      {dropdownList}
    </div>
  )
}
