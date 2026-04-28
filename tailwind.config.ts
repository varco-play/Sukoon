import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark':        '#080F08',
        'brand-green-dark':  '#0F1F0F',
        'brand-green':       '#1C3A1C',
        'brand-green-mid':   '#243D24',
        'brand-gold':        '#C9A84C',
        'brand-gold-light':  '#E5C87A',
        'brand-cream':       '#F5F0E8',
        'brand-cream-muted': '#B8AFA0',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(201, 168, 76, 0.35)',
        'gold-lg':   '0 0 40px rgba(201, 168, 76, 0.50)',
        'card-dark': '0 4px 24px rgba(0, 0, 0, 0.40)',
      },
      keyframes: {
        'gold-shimmer': {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'slot-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,168,76,0)' },
          '50%':      { boxShadow: '0 0 12px 2px rgba(201,168,76,0.35)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'gold-shimmer': 'gold-shimmer 3s linear infinite',
        'slot-pulse':   'slot-pulse 2s ease-in-out infinite',
        'fade-in':      'fade-in 0.4s ease-out',
      },
    },
  },
  plugins: [],
}
export default config
