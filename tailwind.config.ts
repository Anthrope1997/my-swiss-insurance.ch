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
        // Bleu principal
        brand:        '#1d4ed8',
        'brand-dark': '#1e40af',
        'brand-light':'#3b82f6',
        // Bleu pâle
        'blue-tint':  '#dbeafe',
        'blue-light2':'#eff6ff',
        'blue-hint':  '#f8fafc',
        // Marine
        navy:         '#0f2040',
        // Neutrals
        ink:          '#1a1a1a',
        slate:        '#475569',
        muted:        '#94a3b8',
        edge:         '#e2e8f0',
        cloud:        '#f1f5f9',
        // Icône callout
        'callout-icon':'#378ADD',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
