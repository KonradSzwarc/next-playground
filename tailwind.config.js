const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');
const formsPlugin = require('@tailwindcss/forms');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      brand: colors.indigo,
      gray: colors.slate,
      danger: colors.red,
      success: colors.emerald,
    },
    extend: {
      fontFamily: {
        sans: ['var(--inter-font-family)', ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        4.5: '1.125rem',
      },
      aria: {
        invalid: 'invalid="true"',
      },
    },
  },
  plugins: [formsPlugin],
};
