module.exports = {
  // purge: ['./dist/*.html'],
  // important: '#root',
  content: ["./src/**/*.tsx", "./src/**/*.html"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        animation: {
          "spin-slow": "spin 2s linear infinite",
        },
      },
    },
  },
  //   plugins: [require('@yd-components/plugin')],
};
