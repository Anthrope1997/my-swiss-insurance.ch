import Link from 'next/link'

function ShieldIcon() {
  return (
    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  )
}

const columns: {
  title: string
  ctaLink?: { href: string; label: string }
  links: { href: string; label: string }[]
}[] = [
  {
    title: 'Guides',
    links: [
      { href: '/lamal/guide',            label: 'Comprendre la LAMal'   },
      { href: '/lamal/franchise',        label: 'Choisir sa franchise'  },
      { href: '/lamal/modeles',          label: 'Les 4 modèles LAMal'   },
      { href: '/lamal/lamal-vs-lca',     label: 'LAMal vs complémentaire' },
      { href: '/lamal/changer-de-caisse', label: 'Changer de caisse'    },
      { href: '/lamal/comparateur',      label: 'Comparateur de caisses' },
      { href: '/lamal/subsides',         label: 'Calculateur de subsides' },
    ],
  },
  {
    title: 'Par canton',
    ctaLink: { href: '/lamal/cantons', label: 'Tous les cantons →' },
    links: [
      { href: '/lamal/canton/zurich',    label: 'Zurich'    },
      { href: '/lamal/canton/berne',     label: 'Berne'     },
      { href: '/lamal/canton/vaud',      label: 'Vaud'      },
      { href: '/lamal/canton/argovie',   label: 'Argovie'   },
      { href: '/lamal/canton/saint-gall', label: 'Saint-Gall' },
      { href: '/lamal/canton/geneve',    label: 'Genève'    },
    ],
  },
  {
    title: 'Par situation de vie',
    links: [
      { href: '/lamal/ma-situation', label: 'Ma situation' },
      { href: '/lamal/ma-famille',   label: 'Ma famille'   },
      { href: '/lamal/frontalier',   label: 'Frontaliers'  },
    ],
  },
  {
    title: 'Légal',
    links: [
      { href: '/a-propos',           label: 'À propos'          },
      { href: '/mentions-legales',   label: 'Mentions légales'  },
      { href: '/confidentialite',    label: 'Confidentialité'   },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#0f2040] text-white/60">
      <div className="container-xl pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10 mb-14">

          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/lamal" className="flex items-center gap-2.5 mb-5">
              <div className="w-7 h-7 bg-[#1d4ed8] rounded-[6px] flex items-center justify-center shrink-0">
                <ShieldIcon />
              </div>
              <span className="text-white font-semibold text-[15px]">My Swiss Insurance</span>
            </Link>
            <p className="text-[14px] leading-relaxed">
              Comparez les caisses maladie suisses et optimisez votre LAMal. Service gratuit.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-white font-semibold text-[12px] uppercase tracking-widest mb-5">
                {col.title}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}
                      className="text-[14px] hover:text-white transition-colors duration-150">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {col.ctaLink && (
                <Link href={col.ctaLink.href}
                  className="inline-block mt-3 text-[13px] text-[#93c5fd] hover:text-white transition-colors duration-150">
                  {col.ctaLink.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-[13px]">&copy; {new Date().getFullYear()} My Swiss Insurance. Tous droits réservés.</p>
          <p className="text-slate-500 text-xs">
            Sources officielles :{' '}
            <a href="https://www.bag.admin.ch" target="_blank" rel="noopener"
              className="hover:text-slate-300 transition-colors">OFSP</a>
            {' / '}
            <a href="https://www.admin.ch" target="_blank" rel="noopener"
              className="hover:text-slate-300 transition-colors">admin.ch</a>
            {' / '}
            <a href="https://www.priminfo.ch" target="_blank" rel="noopener"
              className="hover:text-slate-300 transition-colors">priminfo.ch</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
