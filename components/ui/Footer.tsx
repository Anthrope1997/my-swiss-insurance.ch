import Link from 'next/link'
import ShieldIcon from '@/components/shared/ShieldIcon'
import fr from '@/dictionaries/fr.json'

const columns: {
  title: string
  links: { href: string; label: string }[]
}[] = [
  {
    title: 'Calculateurs',
    links: [
      { href: '/sante/comparateur', label: 'Comparateur de primes LAMal' },
      { href: '/sante/subsides',    label: 'Simulateur de subsides'       },
    ],
  },
  {
    title: 'Guides',
    links: [
      { href: '/sante/guide',             label: 'Comprendre la LAMal'     },
      { href: '/sante/franchise',         label: 'Choisir sa franchise'    },
      { href: '/sante/modeles',           label: 'Les 4 modèles LAMal'     },
      { href: '/sante/lamal-vs-lca',      label: 'LAMal vs complémentaire' },
      { href: '/sante/changer-de-caisse', label: 'Changer de caisse'       },
    ],
  },
]

const legalLinks = [
  { href: '/a-propos',         label: 'À propos'         },
  { href: '/mentions-legales', label: 'Mentions légales'  },
  { href: '/confidentialite',  label: 'Confidentialité'   },
]

export default function Footer() {
  return (
    <footer className="bg-navy text-white/60">
      <div className="container-xl pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 mb-14">

          {/* Colonne marque */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/sante" className="flex items-center gap-2.5 mb-5">
              <ShieldIcon />
              <span className="text-white font-semibold text-[16px]">My Swiss Insurance</span>
            </Link>
            <p className="text-[13px] leading-relaxed">{fr.footer.tagline}</p>
          </div>

          {/* Colonnes de liens */}
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
            </div>
          ))}

        </div>

        {/* Bande basse — copyright + liens légaux */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-[13px]">&copy; {new Date().getFullYear()} My Swiss Insurance. {fr.footer.droits}.</p>
          <nav className="flex flex-wrap gap-x-6 gap-y-1">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className="text-[13px] hover:text-white transition-colors duration-150">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

      </div>
    </footer>
  )
}
