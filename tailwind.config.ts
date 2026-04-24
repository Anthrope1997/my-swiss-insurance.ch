import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Navy & Slate palette
        brand: '#1d4ed8',
        'brand-dark': '#1e40af',
        'brand-light': '#3b82f6',
        ink: '#1a1a1a',
        slate: '#475569',
        edge: '#e2e8f0',
        cloud: '#f1f5f9',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
