// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import 'cypress-metamask-v2';
import { injected } from './ethereum';

// import 'cypress-metamask-v2';
// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.Commands.overwrite('visit', (original, url, options) => {
  assert(typeof url === 'string');
  const targetUrl = url;
  cy.intercept('/*').then(() => {
    original({
      ...options,
      url: targetUrl,
      onBeforeLoad(win) {
        options?.onBeforeLoad?.(win);
        win.localStorage.setItem('cypress-test-env', 'yes');
        win.ethereum = injected;
      },
    });
  });
});

Cypress.on('uncaught:exception', (_err, _runnable) => {
  return false;
});
