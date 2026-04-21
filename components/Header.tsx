'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

const lamalGuides = [
  { href: '/lamal/guide', label: 'Comprendre la LAMal' },
  { href: '/lamal/subsides', label: 'Calculateur de subsides' },
  { href: '/lamal/comparateur', label: 'Comparateur de caisses' },
  { href: '/lamal/lamal-vs-lca', label: 'LAMal vs complémentaire' },
  { href: '/lamal/changer-de-caisse', label: 'Changer de caisse' },
]

const cantonLinks = [
  { href: '/lamal/canton/vaud', label: 'Vaud' },
  { href: '/lamal/canton/geneve', label: 'Genève' },
  { href: '/lamal/canton/fribourg', label: 'Fribourg' },
  { href: '/lamal/canton/valais', label: 'Valais' },
  { href: '/lamal/canton/neuchatel', label: 'Neuchâtel' },
  { href: '/lamal/canton/jura', label: 'Jura' },
]

const situationLinks = [
  { href: '/lamal/salarie-independant', label: 'Salarié / Indépendant' },
  { href: '/lamal/famille-retraite', label: 'Famille / Retraité' },
  { href: '/lamal/expatrie-frontalier', label: 'Expatrié / Frontalier' },
]

function ShieldIcon() {
  return (
    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  )
}

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [lamalOpen, setLamalOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const isLamalActive = pathname.startsWith('/lamal')

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLamalOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    setLamalOpen(false)
    setMobileOpen(false)
  }, [pathname])

  const handleCTA = () => {
    if (pathname === '/') {
      document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    } else {
      router.push('/#lead-form')
    }
  }

  return (
    <header className="bg-[#0f2040] sticky top-0 z-50">
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

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {/* LAMal dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLamalOpen((o) => !o)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md text-[15px] transition-colors duration-150 ${
                  isLamalActive
                    ? 'text-white font-medium bg-white/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                LAMal
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-150 ${lamalOpen ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {lamalOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white rounded-[12px] shadow-xl border border-[#e2e8f0] w-[520px] p-5 z-50">

                  {/* Guides */}
                  <p className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-widest mb-2.5">Guides</p>
                  <div className="grid grid-cols-2 gap-0.5 mb-4">
                    {lamalGuides.map((link) => (
                      <Link key={link.href} href={link.href}
                        className="text-[14px] text-[#0f2040] hover:text-[#1d4ed8] hover:bg-[#f1f5f9] px-3 py-2 rounded-md transition-colors">
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  <div className="border-t border-[#e2e8f0] mb-4" />

                  {/* Par canton */}
                  <p className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-widest mb-2.5">Par canton</p>
                  <div className="grid grid-cols-3 gap-0.5 mb-4">
                    {cantonLinks.map((link) => (
                      <Link key={link.href} href={link.href}
                        className="text-[14px] text-[#0f2040] hover:text-[#1d4ed8] hover:bg-[#f1f5f9] px-3 py-2 rounded-md transition-colors">
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  <div className="border-t border-[#e2e8f0] mb-4" />

                  {/* Par situation */}
                  <p className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-widest mb-2.5">Par situation</p>
                  <div className="grid grid-cols-3 gap-0.5">
                    {situationLinks.map((link) => (
                      <Link key={link.href} href={link.href}
                        className="text-[14px] text-[#0f2040] hover:text-[#1d4ed8] hover:bg-[#f1f5f9] px-3 py-2 rounded-md transition-colors">
                        {link.label}
                      </Link>
                    ))}
                  </div>

                </div>
              )}
            </div>
          </nav>

          {/* CTA — hidden on mobile to save space */}
          <button
            onClick={handleCTA}
            className="hidden sm:block bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-sm font-medium px-4 py-2 rounded-md transition-colors duration-150 whitespace-nowrap"
          >
            Comparer ma prime LAMal
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="md:hidden p-2 text-slate-300 hover:text-white"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0f2040] border-t border-white/10 px-4 pb-6 overflow-y-auto max-h-[calc(100vh-4rem)]">

          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest pt-5 pb-2">Guides</p>
          {lamalGuides.map(link => (
            <Link key={link.href} href={link.href}
              className="block py-2.5 text-[15px] text-slate-200 hover:text-white border-b border-white/5">
              {link.label}
            </Link>
          ))}

          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest pt-5 pb-2">Par canton</p>
          {cantonLinks.map(link => (
            <Link key={link.href} href={link.href}
              className="block py-2.5 text-[15px] text-slate-200 hover:text-white border-b border-white/5">
              {link.label}
            </Link>
          ))}

          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest pt-5 pb-2">Par situation</p>
          {situationLinks.map(link => (
            <Link key={link.href} href={link.href}
              className="block py-2.5 text-[15px] text-slate-200 hover:text-white border-b border-white/5">
              {link.label}
            </Link>
          ))}

          <button
            onClick={() => { setMobileOpen(false); handleCTA() }}
            className="mt-6 w-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-sm font-medium px-4 py-3 rounded-md transition-colors"
          >
            Comparer ma prime LAMal
          </button>
        </div>
      )}
    </header>
  )
}
