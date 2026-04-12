import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-primary text-white rounded-lg w-8 h-8 flex items-center justify-center text-sm font-bold">
                M
              </span>
              <span className="text-white font-bold">My Swiss Insurance</span>
            </div>
            <p className="text-sm leading-relaxed">
              Comparez les caisses maladie suisses et trouvez la meilleure couverture
              LAMal selon votre situation. Service gratuit, sans engagement.
            </p>
          </div>

          {/* LAMal links */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              LAMal
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/lamal" className="hover:text-white transition-colors">Hub LAMal</Link></li>
              <li><Link href="/lamal/guide" className="hover:text-white transition-colors">Guide complet</Link></li>
              <li><Link href="/lamal/comparateur" className="hover:text-white transition-colors">Comparateur</Link></li>
              <li><Link href="/lamal/lamal-vs-lca" className="hover:text-white transition-colors">LAMal vs LCA</Link></li>
              <li><Link href="/lamal/changer-de-caisse" className="hover:text-white transition-colors">Changer de caisse</Link></li>
              <li><Link href="/lamal/par-profil" className="hover:text-white transition-colors">Par profil</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">
              Informations
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link></li>
              <li><Link href="/politique-confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
          <p>
            &copy; {new Date().getFullYear()} My Swiss Insurance — Tous droits réservés.
          </p>
          <p className="text-gray-500">
            Ce site est un service de comparaison et génération de leads. Les informations fournies sont à titre indicatif.{' '}
            Sources : <a href="https://www.bag.admin.ch" className="hover:text-white" target="_blank" rel="noopener noreferrer">OFSP</a>,{' '}
            <a href="https://www.admin.ch" className="hover:text-white" target="_blank" rel="noopener noreferrer">admin.ch</a>.
          </p>
        </div>
      </div>
    </footer>
  )
}
