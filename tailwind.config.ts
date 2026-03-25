import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Custom font families based on frontend-design-system guidelines
      fontFamily: {
        // Tech & Minimal: Space Grotesk for headers, Inter for body
        heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      
      // Custom color palette - dark mode optimized
      colors: {
        // Primary brand color - sophisticated teal/cyan
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        // Secondary accent - warm amber
        secondary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Dark mode backgrounds
        background: {
          DEFAULT: '#0a0a0b',
          secondary: '#121214',
          tertiary: '#18181b',
          elevated: '#1c1c1f',
        },
        // Surface colors with subtle borders
        surface: {
          DEFAULT: '#18181b',
          hover: '#1f1f23',
          border: '#27272a',
        },
        // Text colors with proper contrast
        text: {
          primary: '#fafafa',
          secondary: '#a1a1aa',
          tertiary: '#71717a',
          muted: '#52525b',
        },
      },
      
      // Animation and transitions
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
        'scale-in': 'scaleIn 0.2s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(20, 184, 166, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(20, 184, 166, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      
      // Glassmorphism effects
      backdropBlur: {
        xs: '2px',
      },
      
      // Border radius scale
      borderRadius: {
        '4xl': '2rem',
      },
      
      // Spacing scale extensions
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Typography plugin extensions
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: '#fafafa',
            '[class~="lead"]': {
              color: '#a1a1aa',
            },
            a: {
              color: '#2dd4bf',
              '&:hover': {
                color: '#5eead4',
              },
            },
            strong: {
              color: '#fafafa',
            },
            'ol > li::marker': {
              color: '#a1a1aa',
            },
            'ul > li::marker': {
              color: '#2dd4bf',
            },
            hr: {
              borderColor: '#27272a',
            },
            blockquote: {
              color: '#a1a1aa',
              borderLeftColor: '#27272a',
            },
            h1: {
              color: '#fafafa',
            },
            h2: {
              color: '#fafafa',
            },
            h3: {
              color: '#fafafa',
            },
            h4: {
              color: '#fafafa',
            },
            'figure figcaption': {
              color: '#71717a',
            },
            code: {
              color: '#fafafa',
              backgroundColor: '#27272a',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
            },
            'a code': {
              color: '#2dd4bf',
            },
            pre: {
              color: '#fafafa',
              backgroundColor: '#18181b',
            },
            thead: {
              borderBottomColor: '#27272a',
            },
            'tbody tr': {
              borderBottomColor: '#27272a',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
