/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    outputFileTracingIncludes: {
      '/api/primes': ['./data/lamal/*.json'],
    },
  },
}

export default nextConfig
