/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      mock(route: String, payload: any): Chainable<void>
      login(): Chainable<void>
    }
  }
}

Cypress.Commands.add("mock", (route: String, payload: any) => {
  cy.intercept(`${Cypress.env("API_URL")}${route}`, {
    statusCode: 200,
    body: payload
  })
})

Cypress.Commands.add("login", () => {
  cy.visit("/")

  cy.mock("token", "d7ipu978eP2reoXqTHFkA4anadHbcJDLqISwIida")

  cy.mock("login", {
    api_token: "token",
    success: true,
  })

  cy.mock("me*", {
    description: null,
    email: "luca@pilloni.fr",
    first_name: null,
    id: 1,
    last_name: null,
    username: "luca",
  })

  cy.get('form input[type="email"]').type("luca@pilloni.fr")
  cy.get('form input[type="password"]')
    .type("LupiLupi_1993")
    .type("{enter}")

  cy.url().should("contain", "/profile")
})
