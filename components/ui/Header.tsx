'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const situationLinks = [
  { href: '/lamal/ma-situation', label: 'Ma situation professionnelle' },
  { href: '/lamal/ma-famille', label: 'Ma famille' },
  { href: '/lamal/frontalier', label: 'Frontaliers' },
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

  function toggleSection(name: string) {
    setExpandedSection(s => s === name ? null : name)
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

          {/* Hamburger button */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="p-2 text-white"
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
        <div className="bg-[#0f2040] border-t border-white/10 px-4 pb-6 overflow-y-auto max-h-[calc(100vh-4rem)]">

          {/* LAMal */}
          <Link href="/lamal"
            className="flex items-center py-3.5 text-[15px] text-slate-200 hover:text-white border-b border-white/10">
            LAMal
          </Link>

          {/* Comparateur */}
          <Link href="/lamal/comparateur"
            className="flex items-center py-3.5 text-[15px] text-slate-200 hover:text-white border-b border-white/10">
            Comparateur
          </Link>

          {/* Par situation — expandable */}
          <button
            onClick={() => toggleSection('situation')}
            className="w-full flex items-center justify-between py-3.5 text-[15px] text-slate-200 hover:text-white border-b border-white/10"
          >
            Par situation
            <ChevronDown rotated={expandedSection === 'situation'} />
          </button>
          {expandedSection === 'situation' && (
            <div className="bg-white/5 border-b border-white/10">
              {situationLinks.map(link => (
                <Link key={link.href} href={link.href}
                  className="block pl-5 py-2.5 text-[14px] text-slate-300 hover:text-white border-b border-white/5 last:border-0">
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Par canton — expandable */}
          <button
            onClick={() => toggleSection('canton')}
            className="w-full flex items-center justify-between py-3.5 text-[15px] text-slate-200 hover:text-white border-b border-white/10"
          >
            Par canton
            <ChevronDown rotated={expandedSection === 'canton'} />
          </button>
          {expandedSection === 'canton' && (
            <div className="bg-white/5 border-b border-white/10">
              {hamburgerCantonLinks.map(link => (
                <Link key={link.href} href={link.href}
                  className="block pl-5 py-2.5 text-[14px] text-slate-300 hover:text-white border-b border-white/5">
                  {link.label}
                </Link>
              ))}
              <Link href="/lamal/comparateur"
                className="block pl-5 py-2.5 text-[14px] text-[#93c5fd] hover:text-white border-t border-white/5">
                Autres cantons →
              </Link>
            </div>
          )}

          {/* CTA */}
          <Link
            href="/lamal/comparateur"
            onClick={() => setMobileOpen(false)}
            className="mt-6 block w-full text-center bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-sm font-medium px-4 py-3 rounded-md transition-colors"
          >
            Comparer ma prime LAMal
          </Link>
        </div>
      )}
    </header>
  )
}
