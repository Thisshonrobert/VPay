import type { Config } from 'tailwindcss';
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ['class'],
  content: [
    "./**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './packages/ui/**/*.{js,ts,jsx,tsx}',
    "../../packages/**/*.{js,ts,jsx,tsx}",
    '!../../packages/**/node_modules/**',  // Exclude node_modules
    './ui/**/*.{ts,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
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
        // Google product palette, driven by the CSS vars so dark mode follows.
        gpay: {
          blue: 'var(--gpay-blue)',
          'blue-light': 'var(--gpay-blue-light)',
          green: 'var(--gpay-green)',
          'green-light': 'var(--gpay-green-light)',
          red: 'var(--gpay-red)',
          yellow: 'var(--gpay-yellow)',
          'blue-container': 'var(--gpay-blue-container)',
          'green-container': 'var(--gpay-green-container)',
          'red-container': 'var(--gpay-red-container)',
          'yellow-container': 'var(--gpay-yellow-container)',
        },
      },
      fontFamily: {
        // Roboto for UI text, Outfit standing in for Google Sans on headings.
        sans: ["var(--font-sans)", "Roboto", ...fontFamily.sans],
        display: ["var(--font-display)", "var(--font-sans)", ...fontFamily.sans],
      },
      fontSize: {
        // Material Design 3 type scale — [size, { lineHeight, letterSpacing, fontWeight }]
        'display-lg': ['3.5rem', { lineHeight: '4rem', letterSpacing: '-0.02em', fontWeight: '400' }],
        'display-md': ['2.8125rem', { lineHeight: '3.25rem', letterSpacing: '-0.015em', fontWeight: '400' }],
        'display-sm': ['2.25rem', { lineHeight: '2.75rem', letterSpacing: '-0.01em', fontWeight: '400' }],
        'headline-lg': ['2rem', { lineHeight: '2.5rem', letterSpacing: '-0.01em', fontWeight: '400' }],
        'headline-md': ['1.75rem', { lineHeight: '2.25rem', letterSpacing: '-0.005em', fontWeight: '400' }],
        'headline-sm': ['1.5rem', { lineHeight: '2rem', fontWeight: '400' }],
        'title-lg': ['1.375rem', { lineHeight: '1.75rem', fontWeight: '500' }],
        'title-md': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0.009em', fontWeight: '500' }],
        'title-sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.007em', fontWeight: '500' }],
        'body-lg': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0.031em', fontWeight: '400' }],
        'body-md': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.016em', fontWeight: '400' }],
        'body-sm': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em', fontWeight: '400' }],
        'label-lg': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.007em', fontWeight: '500' }],
        'label-md': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.042em', fontWeight: '500' }],
        'label-sm': ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.045em', fontWeight: '500' }],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 8px)',
        // M3 shape scale — generous corners are core to the GPay look.
        'm3-sm': '0.5rem',
        'm3-md': '0.75rem',
        'm3-lg': '1rem',
        'm3-xl': '1.75rem',
        'm3-2xl': '2rem',
      },
      boxShadow: {
        // M3 elevation levels — Google keeps shadows tight and low-opacity.
        'm3-1': '0 1px 2px 0 rgba(60,64,67,0.30), 0 1px 3px 1px rgba(60,64,67,0.15)',
        'm3-2': '0 1px 2px 0 rgba(60,64,67,0.30), 0 2px 6px 2px rgba(60,64,67,0.15)',
        'm3-3': '0 4px 8px 3px rgba(60,64,67,0.15), 0 1px 3px 0 rgba(60,64,67,0.30)',
        'm3-fab': '0 6px 10px 4px rgba(60,64,67,0.15), 0 2px 3px 0 rgba(60,64,67,0.30)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        // Staggered entrance for dashboard cards.
        'rise-in': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.94)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        // M3 emphasized easing: slow start, decisive finish.
        'rise-in': 'rise-in 0.45s cubic-bezier(0.2, 0, 0, 1) both',
        'scale-in': 'scale-in 0.35s cubic-bezier(0.2, 0, 0, 1) both',
        shimmer: 'shimmer 1.6s infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
