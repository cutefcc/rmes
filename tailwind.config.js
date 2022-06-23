/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './src/**/*.html'],
  darkMode: false,
  theme: {
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
