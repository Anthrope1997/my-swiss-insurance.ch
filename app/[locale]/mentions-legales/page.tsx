import type { Metadata } from 'next'
import Breadcrumb from '@/components/ui/Breadcrumb'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales de My Swiss Insurance — informations sur l\'éditeur, la responsabilité et la protection des données (LPD).',
  robots: { index: false, follow: false },
}

export default function MentionsLegalesPage() {
  return (
    <div className="container-xl py-16 max-w-3xl">
      <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'Mentions légales' }]} className="mb-8" />

      <h1 className="text-4xl font-bold text-ink mb-2">Mentions légales</h1>
      <p className="text-slate text-[14px] mb-12">Dernière mise à jour : avril 2026</p>

      <div className="space-y-10 text-[15px] text-slate leading-relaxed">

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Éditeur du site</h2>
          <p>
            My Swiss Insurance<br />
            Suisse romande, Suisse<br />
            <a href="mailto:contact@my-swiss-insurance.ch" className="text-brand hover:underline">
              contact@my-swiss-insurance.ch
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Objet du service</h2>
          <p>
            My Swiss Insurance est un service d'information et de mise en relation gratuit destiné
            aux résidents en Suisse romande souhaitant comparer les caisses maladie LAMal. Ce site
            ne constitue pas un conseil en assurance au sens de la loi sur la surveillance des
            assurances (LSA).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Droit applicable</h2>
          <p>
            Le présent site et ses contenus sont soumis au droit suisse. Tout litige relatif à
            l'utilisation de ce site sera soumis aux tribunaux compétents en Suisse romande.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Protection des données</h2>
          <p>
            Le traitement des données personnelles collectées via ce site est régi par la{' '}
            <strong className="text-ink">Loi fédérale sur la Protection des Données (LPD, RS 235.1)</strong>{' '}
            et son ordonnance d'application (OLPD).
          </p>
          <p className="mt-3">
            Pour toute réclamation relative à la protection de vos données, vous pouvez contacter le{' '}
            <strong className="text-ink">
              Préposé fédéral à la protection des données et à la transparence (PFPDT)
            </strong>{' '}
            — <a href="https://www.pfpdt.admin.ch" target="_blank" rel="noopener noreferrer"
              className="text-brand hover:underline">www.pfpdt.admin.ch</a>
          </p>
          <p className="mt-3">
            Consultez notre{' '}
            <Link href="/politique-confidentialite" className="text-brand hover:underline">
              politique de confidentialité
            </Link>{' '}
            pour le détail complet du traitement de vos données.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Propriété intellectuelle</h2>
          <p>
            L'ensemble des contenus de ce site (textes, graphiques, logos) sont la propriété de
            My Swiss Insurance ou de ses partenaires. Toute reproduction sans autorisation préalable
            est interdite.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Sources des données</h2>
          <p>
            Les données relatives aux primes LAMal sont issues des publications officielles de
            l'Office fédéral de la santé publique (OFSP) et de priminfo.ch. My Swiss Insurance
            ne garantit pas l'exactitude en temps réel de ces informations et recommande de
            vérifier les primes directement auprès des assureurs ou sur priminfo.ch.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Limitation de responsabilité</h2>
          <p>
            Les informations fournies sur ce site ont un caractère indicatif et ne constituent pas
            un conseil personnalisé en assurance. My Swiss Insurance décline toute responsabilité
            pour les décisions prises sur la seule base des informations publiées sur ce site.
          </p>
        </section>

      </div>
    </div>
  )
}
