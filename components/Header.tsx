'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

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
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (href: string) =>
    href === '/lamal' ? pathname === href : pathname.startsWith(href)

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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-md text-[15px] transition-colors duration-150 ${
                  isActive(link.href)
                    ? 'text-white font-medium bg-white/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA — always visible on mobile and desktop */}
          <button
            onClick={handleCTA}
            className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-sm font-medium px-4 py-2 rounded-md transition-colors duration-150 whitespace-nowrap"
          >
            Comparer gratuitement
          </button>

        </div>
      </div>
    </header>
  )
}
