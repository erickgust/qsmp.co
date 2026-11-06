import type { Config } from 'tailwindcss'

const config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xxs: '420px',
        xs: '475px',
      },
      width: {
        12.5: '3.125rem',
      },
      maxWidth: {
        '5.5xl': '67.5rem',
      },
      backgroundImage: {
        'blue-pattern': "url('/assets/bg-blue.png')",
        'darkblue-pattern': "url('/assets/bg-darkblue.png')",
        'lightblue-pattern': "url('/assets/bg-lightblue.png')",
        'purple-pattern': "url('/assets/bg-purple.png')",
      },
      fontSize: {
        '2.5xl': '1.625rem',
      },
      fontFamily: {
        pixel: ['var(--font-pixeloid-sans)', 'sans-serif'],
      },
      keyframes: {
        'dropdown-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'dropdown-out': {
          from: { opacity: '1', transform: 'scale(1)' },
          to: { opacity: '0', transform: 'scale(0.95)' },
        },
        'check-in': {
          from: { opacity: '0', transform: 'scale(0.8)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'dropdown-in': 'dropdown-in 180ms cubic-bezier(0.23, 1, 0.32, 1) both',
        'dropdown-out':
          'dropdown-out 120ms cubic-bezier(0.23, 1, 0.32, 1) both',
        'check-in': 'check-in 150ms cubic-bezier(0.23, 1, 0.32, 1) both',
        'fade-in': 'fade-in 150ms ease both',
      },
    },
  },
} satisfies Config
export default config
