import Link from 'next/link'
import ShieldIcon from '@/components/shared/ShieldIcon'
import fr from '@/dictionaries/fr.json'

const columns: {
  title: string
  ctaLink?: { href: string; label: string }
  links: { href: string; label: string }[]
}[] = [
  {
    title: 'Guides',
    links: [
      { href: '/sante/guide',            label: 'Comprendre la LAMal'   },
      { href: '/sante/franchise',        label: 'Choisir sa franchise'  },
      { href: '/sante/modeles',          label: 'Les 4 modèles LAMal'   },
      { href: '/sante/lamal-vs-lca',     label: 'LAMal vs complémentaire' },
      { href: '/sante/changer-de-caisse', label: 'Changer de caisse'    },
      { href: '/sante/comparateur',      label: 'Comparateur de caisses' },
      { href: '/sante/subsides',          label: 'Calculateur de subsides' },
    ],
  },
  {
    title: 'Par canton',
    ctaLink: { href: '/sante/cantons', label: 'Tous les cantons →' },
    links: [
      { href: '/sante/canton/argovie',   label: 'Argovie'   },
      { href: '/sante/canton/berne',     label: 'Berne'     },
      { href: '/sante/canton/geneve',    label: 'Genève'    },
      { href: '/sante/canton/saint-gall', label: 'Saint-Gall' },
      { href: '/sante/canton/vaud',      label: 'Vaud'      },
      { href: '/sante/canton/zurich',    label: 'Zurich'    },
    ],
  },
  {
    title: 'Par situation de vie',
    links: [
      { href: '/sante/ma-situation', label: 'Ma situation' },
      { href: '/sante/ma-famille',   label: 'Ma famille'   },
      { href: '/sante/frontalier',   label: 'Frontaliers'  },
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
    <footer className="bg-navy text-white/60">
      <div className="container-xl pt-16 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10 mb-14">

          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/sante" className="flex items-center gap-2.5 mb-5">
              <ShieldIcon />
              <span className="text-white font-semibold text-[16px]">My Swiss Insurance</span>
            </Link>
            <p className="text-[13px] leading-relaxed">{fr.footer.tagline}</p>
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
                      className="text-[13px] hover:text-white transition-colors duration-150">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              {col.ctaLink && (
                <Link href={col.ctaLink.href}
                  className="inline-block mt-3 text-[13px] text-brand-light hover:text-white transition-colors duration-150">
                  {col.ctaLink.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-[13px]">&copy; {new Date().getFullYear()} My Swiss Insurance. {fr.footer.droits}.</p>
          <p className="text-slate-500 text-xs">
            {fr.footer.sources}{' '}
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
