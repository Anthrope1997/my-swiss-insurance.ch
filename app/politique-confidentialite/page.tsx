import type { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumb'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Politique de confidentialité — LPD',
  description: 'Politique de confidentialité de My Swiss Insurance conforme à la Loi fédérale sur la Protection des Données (LPD, RS 235.1).',
  robots: { index: false, follow: false },
}

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="container-xl py-16 max-w-3xl">
      <Breadcrumb items={[{ label: 'Accueil', href: '/' }, { label: 'Politique de confidentialité' }]} className="mb-8" />

      <h1 className="text-4xl font-bold text-ink mb-2">Politique de confidentialité</h1>
      <p className="text-slate text-[14px] mb-12">Dernière mise à jour : avril 2026</p>

      <div className="prose-legal space-y-10 text-[15px] text-slate leading-relaxed">

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Loi applicable</h2>
          <p>
            Le traitement de vos données personnelles est régi par la{' '}
            <strong className="text-ink">Loi fédérale sur la Protection des Données (LPD, RS 235.1)</strong>{' '}
            et son ordonnance d'application (OLPD). My Swiss Insurance est un service destiné aux
            résidents en Suisse romande et opère exclusivement sous le droit suisse.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Responsable du traitement</h2>
          <p>
            My Swiss Insurance<br />
            <a href="mailto:contact@my-swiss-insurance.ch" className="text-brand hover:underline">
              contact@my-swiss-insurance.ch
            </a><br />
            Suisse romande, Suisse
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Données collectées</h2>
          <p>Lors de la soumission du formulaire de comparaison, nous collectons :</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Prénom et nom</li>
            <li>Adresse e-mail</li>
            <li>Numéro de téléphone</li>
            <li>Canton de résidence</li>
            <li>Informations relatives à votre couverture actuelle (caisse, franchise, modèle)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Base légale et finalité du traitement</h2>
          <p>
            Vos données sont traitées sur la base de votre <strong className="text-ink">consentement (LPD art. 6)</strong>{' '}
            dans le but de vous fournir une comparaison personnalisée des caisses maladie et de vous
            mettre en relation avec un courtier ou conseiller en assurance maladie.
          </p>
          <p className="mt-3">
            Vos données peuvent être transmises à des courtiers en assurance maladie agréés en Suisse
            dans le cadre de ce service. Ces tiers sont soumis aux mêmes obligations de confidentialité.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Durée de conservation</h2>
          <p>
            Vos données sont conservées <strong className="text-ink">24 mois maximum</strong> à compter
            de votre dernière interaction avec notre service, puis supprimées ou anonymisées.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Vos droits (LPD art. 25)</h2>
          <p>Conformément à la LPD (RS 235.1), vous disposez des droits suivants :</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Droit d'accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l'effacement</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit d'opposition</li>
          </ul>
          <p className="mt-3">
            Pour exercer ces droits, contactez-nous à{' '}
            <a href="mailto:contact@my-swiss-insurance.ch" className="text-brand hover:underline">
              contact@my-swiss-insurance.ch
            </a>.
            Nous répondons dans un délai de 30 jours.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Retrait du consentement</h2>
          <p>
            Vous pouvez retirer votre consentement à tout moment en nous contactant par e-mail.
            Le retrait du consentement ne remet pas en cause la licéité du traitement effectué
            avant ce retrait.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Cookies et données de navigation</h2>
          <p>
            Ce site utilise des cookies techniques nécessaires à son fonctionnement. Aucun cookie
            publicitaire ou de suivi tiers n'est utilisé sans votre consentement explicite.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-ink mb-3">Autorité compétente</h2>
          <p>
            Pour toute réclamation relative à la protection de vos données, vous pouvez contacter le{' '}
            <strong className="text-ink">
              Préposé fédéral à la protection des données et à la transparence (PFPDT)
            </strong>{' '}
            — <a href="https://www.pfpdt.admin.ch" target="_blank" rel="noopener noreferrer"
              className="text-brand hover:underline">www.pfpdt.admin.ch</a>
          </p>
        </section>

      </div>
    </div>
  )
}
