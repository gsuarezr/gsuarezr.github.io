// tailwind.config.mjs
import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      typography: ({ theme }) => ({
        DEFAULT: { // Styles for standard prose (light mode)
          css: {
            color: theme('colors.gray.500'), // Ensure base text is dark in light mode
            a: {
              color: theme('colors.blue.700'),
              '&:hover': {
                color: theme('colors.blue.900'),
              },
            },
          },
        },
        dark: { // Styles for prose-invert (dark mode)
          css: {
            // THE KEY CHANGE IS HERE:
            color: theme('colors.white.100'), // Set default text color to a light gray, which appears white on a dark background
            a: {
              color: theme('colors.blue.300'),
              '&:hover': {
                color: theme('colors.blue.100'),
              },
            },
            // It's also good practice to make sure headings are readable
            h1: { color: theme('colors.gray.100') },
            h2: { color: theme('colors.gray.100') },
            h3: { color: theme('colors.gray.100') },
            h4: { color: theme('colors.gray.100') },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  darkMode: 'class',
};