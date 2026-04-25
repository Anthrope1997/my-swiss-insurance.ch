'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const situationLinks = [
  {
    href: '/lamal/ma-situation',
    label: 'Ma situation',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    href: '/lamal/ma-famille',
    label: 'Ma famille',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    href: '/lamal/frontalier',
    label: 'Frontaliers',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

const hamburgerCantonLinks = [
  { href: '/lamal/canton/geneve',    label: 'Genève' },
  { href: '/lamal/canton/vaud',      label: 'Vaud' },
  { href: '/lamal/canton/fribourg',  label: 'Fribourg' },
  { href: '/lamal/canton/valais',    label: 'Valais' },
  { href: '/lamal/canton/neuchatel', label: 'Neuchâtel' },
  { href: '/lamal/canton/jura',      label: 'Jura' },
  { href: '/lamal/canton/zurich',    label: 'Zurich' },
  { href: '/lamal/canton/berne',     label: 'Berne' },
]

function ShieldIcon() {
  return (
    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  )
}

function ChevronDown({ rotated }: { rotated: boolean }) {
  return (
    <svg
      className={`w-4 h-4 transition-transform duration-200 ${rotated ? 'rotate-180' : ''}`}
      fill="none" stroke="currentColor" viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

export default function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  useEffect(() => {
    setMobileOpen(false)
    setExpandedSection(null)
  }, [pathname])

  function close() {
    setMobileOpen(false)
    setExpandedSection(null)
  }

  function toggleSection(name: string) {
    setExpandedSection(s => s === name ? null : name)
  }

  return (
    <header className="bg-[#0f2040] sticky top-0 z-50">
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .menu-slide { animation: slideDown 0.22s ease-out; }
      `}</style>

      <div className="container-xl">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-7 h-7 bg-[#1d4ed8] rounded-md flex items-center justify-center">
              <ShieldIcon />
            </div>
            <span className="font-semibold text-white text-[15px] hidden sm:inline">
              My Swiss Insurance
            </span>
            <span className="font-semibold text-white text-[15px] sm:hidden">MSI</span>
          </Link>

          {/* Hamburger — animated 3-lines → X */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="p-2 flex flex-col justify-center items-center gap-[5px]"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            <span className={`block w-5 h-[2px] bg-white rounded-full transition-all duration-300 origin-center
              ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-[2px] bg-white rounded-full transition-all duration-300
              ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-5 h-[2px] bg-white rounded-full transition-all duration-300 origin-center
              ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>

        </div>
      </div>

      {/* Dropdown menu */}
      {mobileOpen && (
        <div className="menu-slide bg-[#0f2040]/95 backdrop-blur-sm border-t border-white/10
                        px-4 pb-6 overflow-y-auto"
          style={{ maxHeight: '85vh' }}>

          {/* LAMal */}
          <Link href="/lamal" onClick={close}
            className="flex items-center gap-3 py-3 text-[15px] text-slate-200 hover:text-blue-300 border-b border-white/10">
            <span className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </span>
            LAMal
          </Link>

          {/* Comparateur */}
          <Link href="/lamal/comparateur" onClick={close}
            className="flex items-center gap-3 py-3 text-[15px] text-slate-200 hover:text-blue-300 border-b border-white/10">
            <span className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </span>
            Comparateur
          </Link>

          {/* Par situation — expandable */}
          <button
            onClick={() => toggleSection('situation')}
            className="w-full flex items-center gap-3 py-3 text-[15px] text-slate-200 hover:text-blue-300 border-b border-white/10"
          >
            <span className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            <span className="flex-1 text-left">Par situation</span>
            <ChevronDown rotated={expandedSection === 'situation'} />
          </button>
          {expandedSection === 'situation' && (
            <div className="bg-white/5 border-b border-white/10">
              {situationLinks.map(link => (
                <Link key={link.href} href={link.href} onClick={close}
                  className="flex items-center gap-3 pl-5 py-2.5 text-[14px] text-slate-300 hover:text-blue-300 border-b border-white/5 last:border-0">
                  <span className="text-white/40">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Par canton — expandable */}
          <button
            onClick={() => toggleSection('canton')}
            className="w-full flex items-center gap-3 py-3 text-[15px] text-slate-200 hover:text-blue-300 border-b border-white/10"
          >
            <span className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
            <span className="flex-1 text-left">Par canton</span>
            <ChevronDown rotated={expandedSection === 'canton'} />
          </button>
          {expandedSection === 'canton' && (
            <div className="bg-white/5 border-b border-white/10">
              {hamburgerCantonLinks.map(link => (
                <Link key={link.href} href={link.href} onClick={close}
                  className="block pl-5 py-2.5 text-[14px] text-slate-300 hover:text-blue-300 border-b border-white/5">
                  {link.label}
                </Link>
              ))}
              <Link href="/lamal/comparateur" onClick={close}
                className="block pl-5 py-2.5 text-[14px] text-[#93c5fd] hover:text-blue-300 border-t border-white/5">
                Autres cantons →
              </Link>
            </div>
          )}

          {/* CTA */}
          <Link
            href="/lamal/comparateur"
            onClick={close}
            className="mt-5 flex items-center justify-center gap-2 w-full bg-[#1d4ed8] hover:bg-[#1e40af]
                       text-white text-[14px] font-medium px-4 py-3 rounded-md transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Comparer ma prime LAMal
          </Link>
        </div>
      )}
    </header>
  )
}
