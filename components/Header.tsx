'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/lamal', label: 'LAMal' },
  { href: '/lamal/guide', label: 'Guide' },
  { href: '/lamal/comparateur', label: 'Comparateur' },
  { href: '/lamal/par-profil', label: 'Par profil' },
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
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/lamal' ? pathname === href : pathname.startsWith(href)

  return (
    <header className="bg-white border-b border-edge sticky top-0 z-50">
      <div className="container-xl">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-7 h-7 bg-brand rounded-[6px] flex items-center justify-center">
              <ShieldIcon />
            </div>
            <span className="font-semibold text-ink text-[15px] hidden sm:inline">
              My Swiss Insurance
            </span>
            <span className="font-semibold text-ink text-[15px] sm:hidden">MSI</span>
          </Link>

          {/* Desktop nav — centered */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-md text-[15px] transition-colors duration-150 ${
                  isActive(link.href)
                    ? 'text-ink font-medium'
                    : 'text-slate hover:text-ink'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a href="#lead-form" className="btn-primary text-[14px] py-2 px-5">
              Comparer gratuitement
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-slate hover:text-ink rounded-md transition-colors"
            aria-label="Menu"
          >
            {open ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-edge">
          <div className="container-xl py-4 flex flex-col gap-1">
            <Link href="/" onClick={() => setOpen(false)}
              className="text-[15px] text-slate hover:text-ink py-2 px-2 rounded-md hover:bg-cloud transition-colors">
              Accueil
            </Link>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
                className={`text-[15px] py-2 px-2 rounded-md transition-colors ${
                  isActive(link.href) ? 'text-ink font-medium bg-cloud' : 'text-slate hover:text-ink hover:bg-cloud'
                }`}>
                {link.label}
              </Link>
            ))}
            <a href="#lead-form" onClick={() => setOpen(false)}
              className="btn-primary text-sm mt-3 py-3">
              Comparer gratuitement
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
