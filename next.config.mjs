/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    outputFileTracingIncludes: {
      '/api/primes': ['./data/sante/*.json'],
    },
  },
  async redirects() {
    return [
      { source: '/fr', destination: '/fr/sante', permanent: true },
      { source: '/fr/lamal', destination: '/fr/sante', permanent: true },
      { source: '/fr/lamal/:path*', destination: '/fr/sante/:path*', permanent: true },
      { source: '/sante/salarie-independant', destination: '/sante/ma-situation', permanent: true },
      { source: '/sante/famille-retraite', destination: '/sante/ma-famille', permanent: true },
      { source: '/sante/maternite', destination: '/sante/ma-famille', permanent: true },
      { source: '/sante/expatrie-frontalier', destination: '/sante/frontalier', permanent: true },
      { source: '/sante/frontalier-choix-assurance', destination: '/sante/frontalier', permanent: true },
      { source: '/confidentialite', destination: '/politique-confidentialite', permanent: true },
    ]
  },
}

export default nextConfig
