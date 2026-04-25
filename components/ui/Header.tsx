'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const menuSections: {
  id: string
  label: string
  icon: React.ReactNode
  links: { href: string; label: string }[]
  ctaLink?: { href: string; label: string }
}[] = [
  {
    id: 'guides',
    label: 'Guides',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    links: [
      { href: '/lamal/guide',             label: 'Comprendre la LAMal'     },
      { href: '/lamal/franchise',         label: 'Choisir sa franchise'    },
      { href: '/lamal/modeles',           label: 'Les 4 modèles LAMal'     },
      { href: '/lamal/lamal-vs-lca',      label: 'LAMal vs complémentaire' },
      { href: '/lamal/changer-de-caisse', label: 'Changer de caisse'       },
      { href: '/lamal/comparateur',       label: 'Comparateur de caisses'  },
      { href: '/lamal/subsides',          label: 'Calculateur de subsides' },
    ],
  },
  {
    id: 'canton',
    label: 'Par canton',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    links: [
      { href: '/lamal/canton/zurich',     label: 'Zurich'     },
      { href: '/lamal/canton/berne',      label: 'Berne'      },
      { href: '/lamal/canton/vaud',       label: 'Vaud'       },
      { href: '/lamal/canton/argovie',    label: 'Argovie'    },
      { href: '/lamal/canton/saint-gall', label: 'Saint-Gall' },
      { href: '/lamal/canton/geneve',     label: 'Genève'     },
    ],
    ctaLink: { href: '/lamal/cantons', label: 'Tous les cantons →' },
  },
  {
    id: 'situation',
    label: 'Par situation de vie',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    links: [
      { href: '/lamal/ma-situation', label: 'Ma situation' },
      { href: '/lamal/ma-famille',   label: 'Ma famille'   },
      { href: '/lamal/frontalier',   label: 'Frontaliers'  },
    ],
  },
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

          {menuSections.map(section => (
            <div key={section.id}>
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center gap-3 py-3 text-[15px] text-white hover:text-blue-300 border-b border-white/10"
              >
                <span className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                  {section.icon}
                </span>
                <span className="flex-1 text-left">{section.label}</span>
                <ChevronDown rotated={expandedSection === section.id} />
              </button>
              {expandedSection === section.id && (
                <div className="bg-white/5 border-b border-white/10">
                  {section.links.map((link, i) => (
                    <Link key={link.href} href={link.href} onClick={close}
                      className={`block pl-5 py-2.5 text-[14px] text-white hover:text-blue-300
                        ${i < section.links.length - 1 ? 'border-b border-white/5' : ''}`}>
                      {link.label}
                    </Link>
                  ))}
                  {section.ctaLink && (
                    <Link href={section.ctaLink.href} onClick={close}
                      className="block pl-5 py-2.5 text-[14px] text-white hover:text-blue-300 border-t border-white/5">
                      {section.ctaLink.label}
                    </Link>
                  )}
                </div>
              )}
            </div>
          ))}

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
