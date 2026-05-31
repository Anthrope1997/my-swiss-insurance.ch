'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import LeadFormModal from '@/components/ui/LeadFormModal'
import ShieldIcon from '@/components/shared/ShieldIcon'
import fr from '@/dictionaries/fr.json'

const menuSections: {
  id: string
  label: string
  icon: React.ReactNode
  links: { href: string; label: string }[]
}[] = [
  {
    id: 'calculateurs',
    label: 'Calculateurs',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    links: [
      { href: '/sante/comparateur', label: 'Comparateur de primes LAMal' },
      { href: '/sante/subsides',    label: 'Simulateur de subsides'       },
    ],
  },
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
      { href: '/sante/guide',             label: 'Comprendre la LAMal'     },
      { href: '/sante/franchise',         label: 'Choisir sa franchise'    },
      { href: '/sante/modeles',           label: 'Les 4 modèles LAMal'     },
      { href: '/sante/lamal-vs-lca',      label: 'LAMal vs complémentaire' },
      { href: '/sante/changer-de-caisse', label: 'Changer de caisse'       },
    ],
  },
]

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
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const [offerOpen, setOfferOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
    setExpandedSections(new Set())
  }, [pathname])

  // Les deux sections s'ouvrent par défaut à l'ouverture du menu
  useEffect(() => {
    if (mobileOpen) {
      setExpandedSections(new Set(['calculateurs', 'guides']))
    }
  }, [mobileOpen])

  function close() {
    setMobileOpen(false)
    setExpandedSections(new Set())
  }

  function toggleSection(id: string) {
    setExpandedSections(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <>
      <header className="bg-navy sticky top-0 z-50">
        <style>{`
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-8px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .menu-slide { animation: slideDown 0.22s ease-out; }
        `}</style>

        <div className="container-xl">
          <div className="flex items-center h-16">

            {/* Logo — flex-1 mobile, auto desktop */}
            <Link href="/sante" className="flex items-center gap-2.5 flex-1 md:flex-none">
              <ShieldIcon />
              <span className="font-semibold text-white text-[16px] hidden md:inline">
                My Swiss Insurance
              </span>
            </Link>

            {/* Spacer desktop uniquement */}
            <div className="hidden md:block flex-1" />

            {/* CTA — ouvre le modal sur toutes les tailles d'écran */}
            <button
              onClick={() => setOfferOpen(true)}
              className="shrink-0 bg-brand hover:bg-brand-dark text-white font-medium
                         px-4 py-2 rounded-md text-[16px] transition-colors"
            >
              <span className="hidden min-[380px]:inline">{fr.header.ctaFull}</span>
              <span className="min-[380px]:hidden">{fr.header.ctaShort}</span>
            </button>

            {/* Hamburger — flex-1 mobile, ml-3 desktop */}
            <div className="flex-1 flex justify-end md:flex-none md:ml-3">
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
        </div>

        {/* Menu mobile déroulant */}
        {mobileOpen && (
          <div className="menu-slide bg-navy/95 backdrop-blur-sm border-t border-white/10 overflow-y-auto"
            style={{ maxHeight: '85vh' }}>
            <div className="container-xl py-2 pb-6">

              {menuSections.map(section => (
                <div key={section.id}>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center gap-3 py-3 text-[16px] text-white hover:text-blue-300 border-b border-white/10"
                  >
                    <span className="w-7 h-7 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                      {section.icon}
                    </span>
                    <span className="flex-1 text-left">{section.label}</span>
                    <ChevronDown rotated={expandedSections.has(section.id)} />
                  </button>
                  {expandedSections.has(section.id) && (
                    <div className="bg-white/5 border-b border-white/10">
                      {section.links.map((link, i) => (
                        <Link key={link.href} href={link.href} onClick={close}
                          className={`block pl-5 py-2.5 text-[13px] text-white hover:text-blue-300
                            ${i < section.links.length - 1 ? 'border-b border-white/5' : ''}`}>
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

            </div>
          </div>
        )}
      </header>

      <LeadFormModal open={offerOpen} onClose={() => setOfferOpen(false)} />
    </>
  )
}
