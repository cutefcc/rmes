/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './src/**/*.html'],
  darkMode: true,
  theme: {
    // Customizing Spacing
    spacing: {
      1: '1px',
      2: '2px',
      3: '3px',
      4: '4px',
      5: '5px',
      6: '6px',
      10: '10px',
      24: '24px',
      32: '32px',
      40: '40px',
      60: '60px',
      64: '64px',
    },
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
