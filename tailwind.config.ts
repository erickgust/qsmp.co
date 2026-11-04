import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      screens: {
        xxs: '420px',
        xs: '475px',
      },
      width: {
        12.5: '3.125rem',
      },
      height: {
        12.5: '3.125rem',
      },
      maxWidth: {
        // 67.5rem = 1080px
        '5.5xl': '67.5rem',
      },
      padding: {
        // 7px
        1.75: '0.4375rem',
        // 5px
        1.25: '0.3125rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'blue-pattern': "url('/assets/bg-blue.png')",
        'darkblue-pattern': "url('/assets/bg-darkblue.png')",
        'lightblue-pattern': "url('/assets/bg-lightblue.png')",
        'purple-pattern': "url('/assets/bg-purple.png')",
        'yellow-pattern': "url('/assets/bg-yellow.png')",
      },
      fontSize: {
        // 1.625rem = 26px
        '2.5xl': '1.625rem',
      },
      fontFamily: {
        pixel: ['var(--font-pixeloid-sans)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
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
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'translate-z': (value) => ({
            '--tw-translate-z': value,
            transform: ` translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`,
          }),
        },
        { values: theme('translate'), supportsNegativeValues: true },
      )
    }),
  ],
} satisfies Config
export default config
