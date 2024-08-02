import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        xxs: "420px",
        xs: "475px",
      },
      width: {
        12.5: "3.125rem",
      },
      height: {
        12.5: "3.125rem",
      },
      maxWidth: {
        // 67.5rem = 1080px
        "5.5xl": "67.5rem",
      },
      padding: {
        // 7px
        1.75: "0.4375rem",
        // 5px
        1.25: "0.3125rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "blue-pattern": "url('/assets/bg-blue.png')",
        "darkblue-pattern": "url('/assets/bg-darkblue.png')",
        "lightblue-pattern": "url('/assets/bg-lightblue.png')",
        "purple-pattern": "url('/assets/bg-purple.png')",
        "yellow-pattern": "url('/assets/bg-yellow.png')",
      },
      fontSize: {
        // 1.625rem = 26px
        "2.5xl": "1.625rem",
      },
      fontFamily: {
        pixel: ["var(--font-pixeloid-sans)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      keyframes: {
        "slide-in-bottom": {
          "0%": {
            transform: "translateY(120px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        "slide-from-top": {
          "0%": {
            transform: "translateY(-50px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        "slide-from-bottom": {
          "0%": {
            transform: "translateY(50px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        "slide-from-left": {
          "0%": {
            transform: "translateX(-20px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "slide-in-bottom":
          "slide-in-bottom 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
        "slide-from-top":
          "slide-from-top 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
        "slide-from-left": "slide-from-left 0.3s ease both",
        "slide-from-bottom":
          "slide-from-bottom 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        "widget-text": "var(--widget-text)",
        "widget-bg": "var(--widget-bg)",
        "widget-border": "var(--widget-border)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "translate-z": (value) => ({
            "--tw-translate-z": value,
            transform: ` translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`,
          }),
        },
        { values: theme("translate"), supportsNegativeValues: true }
      );
    }),
    require("tailwindcss-animate")
  ],
} satisfies Config;
export default config;
