/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    outputFileTracingIncludes: {
      '/api/primes': ['./data/lamal/*.json'],
    },
  },
  async redirects() {
    return [
      { source: '/lamal/salarie-independant', destination: '/lamal/ma-situation', permanent: true },
      { source: '/lamal/famille-retraite', destination: '/lamal/ma-famille', permanent: true },
      { source: '/lamal/maternite', destination: '/lamal/ma-famille', permanent: true },
      { source: '/lamal/expatrie-frontalier', destination: '/lamal/frontalier', permanent: true },
      { source: '/lamal/frontalier-choix-assurance', destination: '/lamal/frontalier', permanent: true },
      { source: '/confidentialite', destination: '/politique-confidentialite', permanent: true },
    ]
  },
}

export default nextConfig
