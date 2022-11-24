import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return require('./cypress/plugins/index.js')(on, config);
    },
    specPattern: 'tests/e2e/**/*.{js,jsx,ts,tsx}',
  },
});
