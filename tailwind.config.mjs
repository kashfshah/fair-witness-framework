/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#1a3c5b',   // Deep blue representing objectivity
        secondary: '#e0e5ec', // Cool gray as neutral background
        accent1: '#ff9d00',   // Amber for knowledge synthesis
        accent2: '#27a594'    // Teal for analytical function
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif']
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.primary'),
            h1: {
              color: theme('colors.primary'),
              fontFamily: theme('fontFamily.display')
            },
            h2: {
              color: theme('colors.primary'),
              fontFamily: theme('fontFamily.display'),
              fontWeight: '600'
            },
            h3: {
              color: theme('colors.primary'),
              fontFamily: theme('fontFamily.display'),
              fontWeight: '600'
            },
            strong: {
              color: theme('colors.accent1')
            },
            'ol > li::before': {
              color: theme('colors.accent2')
            },
            'ul > li::before': {
              backgroundColor: theme('colors.accent2')
            },
            a: {
              color: theme('colors.accent1'),
              textDecoration: 'none',
              '&:hover': {
                color: theme('colors.accent2'),
                textDecoration: 'underline',
              },
            }
          },
        },
        dark: {
          css: {
            color: theme('colors.secondary'),
            h1: {
              color: theme('colors.secondary'),
            },
            h2: {
              color: theme('colors.secondary'),
            },
            h3: {
              color: theme('colors.secondary'),
            },
            strong: {
              color: theme('colors.accent1')
            },
            'ol > li::before': {
              color: theme('colors.accent1')
            },
            'ul > li::before': {
              backgroundColor: theme('colors.accent1')
            },
            a: {
              color: theme('colors.accent1'),
              '&:hover': {
                color: theme('colors.accent2'),
              },
            }
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
