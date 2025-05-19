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
      }
    },
  },
  plugins: [],
}
