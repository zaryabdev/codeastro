import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      animation: {
        backAndForth: 'backAndForth 3s ease infinite',
      },
      fontFamily: {
        serif: ['Droid Serif', ...defaultTheme.fontFamily.serif],
      },
      keyframes: {
        backAndForth: {
          '0%, 100%': {
            'background-position': '0% 0%',
          },
          '50%': {
            'background-position': '100% 0%',
          },
        },
      },
      lineHeight: {
        chill: 1.8,
      },
    },
  },
  plugins: [],
}
