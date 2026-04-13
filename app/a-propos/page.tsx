import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'À propos — My Swiss Insurance',
  description:
    'My Swiss Insurance est un service indépendant d\'information et de comparaison des caisses maladie suisses, basé à Lausanne en Suisse romande.',
  openGraph: {
    title: 'À propos — My Swiss Insurance',
    description: 'Service indépendant de comparaison des caisses maladie suisses en Suisse romande.',
    url: 'https://my-swiss-insurance.ch/a-propos',
    type: 'article',
  },
}

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'À propos — My Swiss Insurance',
  description: 'Service indépendant de comparaison des caisses maladie suisses en Suisse romande',
  url: 'https://my-swiss-insurance.ch/a-propos',
}

export default function AProposPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />

      <div className="container-xl py-16 max-w-3xl">
        <nav className="flex items-center gap-2 text-[13px] text-slate mb-8">
          <Link href="/" className="hover:text-ink transition-colors">Accueil</Link>
          <span className="text-edge">/</span>
          <span className="text-ink">À propos</span>
        </nav>

        <h1 className="text-4xl font-bold text-ink mb-10">À propos de My Swiss Insurance</h1>

        <div className="space-y-10 text-[15px] text-slate leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-ink mb-3">Notre mission</h2>
            <p>
              My Swiss Insurance est un service d'information indépendant dédié à aider
              les résidents de Suisse romande à comprendre et optimiser leur assurance maladie LAMal.
            </p>
            <p className="mt-3">
              Nous ne sommes affiliés à aucune caisse maladie. Nos comparaisons sont basées
              uniquement sur les données officielles de l'OFSP (Office fédéral de la santé publique).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink mb-3">Notre équipe</h2>
            <p>
              My Swiss Insurance est édité par une équipe indépendante basée en Suisse romande,
              spécialisée dans l'analyse des assurances sociales suisses.
            </p>
            <p className="mt-3">
              Nous n'avons aucun lien capitalistique avec les caisses maladie que nous comparons.
              Notre rémunération provient exclusivement des leads qualifiés transmis à des courtiers
              partenaires agréés, ce que nous indiquons en toute transparence.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink mb-3">Nos données</h2>
            <p>
              Toutes les données de primes proviennent du comparateur officiel de l'OFSP
              (priminfo.admin.ch), mis à jour annuellement. Les données affichées sont celles
              de l'année 2026.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink mb-3">Contact</h2>
            <p>
              Email :{' '}
              <a href="mailto:contact@my-swiss-insurance.ch" className="text-brand hover:underline">
                contact@my-swiss-insurance.ch
              </a>
            </p>
            <p className="mt-2">
              Adresse : Rue du Grand-Saint-Jean 4<br />
              1003 Lausanne<br />
              Suisse
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-ink mb-3">Conformité</h2>
            <p>
              Politique de confidentialité conforme à la{' '}
              <strong className="text-ink">LPD (RS 235.1)</strong>.
              Responsable du traitement : La rédaction My Swiss Insurance.
            </p>
            <p className="mt-3">
              <Link href="/politique-confidentialite" className="text-brand hover:underline">
                Consulter notre politique de confidentialité →
              </Link>
            </p>
          </section>

        </div>
      </div>
    </>
  )
}
