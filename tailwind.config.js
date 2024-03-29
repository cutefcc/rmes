/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './src/**/*.html'],
  darkMode: true,
  theme: {
    // Customizing Spacing
    // customizimg 0 - 0px  1 - 1px  ... ... 999 - 999px
    spacing: Array(1000)
      .fill('1')
      .map((item, index) => ({ [index]: `${index}px` }))
      .reduce((pre, curr) => ({ ...pre, ...curr })),
    extend: {
      colors: {
        animation: {
          'spin-slow': 'spin 2s linear infinite',
        },
      },
    },
  },
  plugins: [],
};
