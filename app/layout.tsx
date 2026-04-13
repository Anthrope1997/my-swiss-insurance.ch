import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'My Swiss Insurance',
  url: 'https://my-swiss-insurance.ch',
  logo: 'https://my-swiss-insurance.ch/logo.png',
  description: 'Service indépendant de comparaison des caisses maladie suisses en Suisse romande',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rue du Grand-Saint-Jean 4',
    postalCode: '1003',
    addressLocality: 'Lausanne',
    addressRegion: 'Vaud',
    addressCountry: 'CH',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contact@my-swiss-insurance.ch',
    contactType: 'customer service',
    availableLanguage: 'French',
  },
  sameAs: [],
}

const editorialSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'La rédaction My Swiss Insurance',
  description: "Service éditorial indépendant spécialisé dans l'analyse des assurances sociales suisses",
  url: 'https://my-swiss-insurance.ch/a-propos',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rue du Grand-Saint-Jean 4',
    postalCode: '1003',
    addressLocality: 'Lausanne',
    addressRegion: 'Vaud',
    addressCountry: 'CH',
  },
}

export const metadata: Metadata = {
  metadataBase: new URL('https://my-swiss-insurance.ch'),
  title: {
    default: 'My Swiss Insurance — Assurance maladie en Suisse',
    template: '%s | My Swiss Insurance',
  },
  description:
    'Comparez les caisses maladie suisses, choisissez la meilleure franchise et économisez sur votre LAMal. Conseils gratuits et comparaison personnalisée.',
  openGraph: {
    siteName: 'My Swiss Insurance',
    locale: 'fr_CH',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CH">
      <body className="flex flex-col min-h-screen bg-white">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(editorialSchema) }} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
