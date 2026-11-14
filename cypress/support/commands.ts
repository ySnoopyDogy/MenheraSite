// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to get element by data-cy values
       * @example cy.getByDataTest('selector')
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getByDataTest(selector: string, ...args: any[]): Chainable<Window>;
    }
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
Cypress.Commands.add('getByDataTest', (selector: string, ...args) => {
  return cy.get(`[data-test="${selector}"]`, ...args);
});

export {};
