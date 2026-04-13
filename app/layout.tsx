import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
