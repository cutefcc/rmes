// describe('empty spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io');
//   });
// });
describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true);
  });

  it('input', () => {
    cy.window().then(win => {
      // win is the remote window
      console.log('win', win);
    });
  });
});

// describe('User can load page', () => {
//   // before(() => {
//   //   cy.setupMetamask();
//   //   cy.changeMetamaskNetwork('localhost');
//   //   cy.visit('/');
//   // });
//   it('is expected to display a sussess message', () => {
//     cy.get('[data-cy=title]').should('contain.text', 'MetaMask Detected');
//   });

//   it('is expected to display the local wallet address', () => {
//     cy.get('[data-cy=address').should(
//       'contain.text',
//       'Your address is: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
//     );
//   });

//   it('is expected to display the local wallet  balance', () => {
//     cy.get('[data-cy=balance').should('contain.text', 'Balance: 10000000000000000000000');
//   });
// });
