/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    outputFileTracingIncludes: {
      '/api/primes': ['./lib/data/*.json'],
    },
  },
}

export default nextConfig
