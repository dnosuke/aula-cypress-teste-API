// ***********************************************
// This example commands.js shows you how to
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
const BASE_URL = "https://fakerestapi.azurewebsites.net/api/v1/Activities";
function createDate() {
  const date = new Date();
  return date.toISOString();
}
Cypress.Commands.add("criarAtividade", () => {
  cy.request({
    method: "POST",
    url: BASE_URL,
    failOnStatusCode: false,
    body: {
      id: 100,
      title: "string",
      dueDate: createDate(),
      completed: true,
    },
  })
    .as("response")
    .get("@response");
});

Cypress.Commands.add("pegarTodasAtividades", () => {
  cy.request({
    method: "GET",
    url: BASE_URL,
    failOnStatusCode: false,
  })
    .as("response")
    .get("@response");
});

Cypress.Commands.add("pegarAtividadePorId", (id) => {
  cy.request({
    method: "GET",
    url: `${BASE_URL}/${id}`,
    failOnStatusCode: false,
  })
    .as("response")
    .get("@response");
});

Cypress.Commands.add("atualizarAtividadePorId", (id) => {
  cy.request({
    method: "PUT",
    url: `${BASE_URL}/${id}`,
    failOnStatusCode: false,
    body: {
      id: 110,
      title: "string",
      dueDate: createDate(),
      completed: false,
    },
  })
    .as("response")
    .get("@response");
});

Cypress.Commands.add("deletarAtividadePorId", (id) => {
  cy.request({
    method: "DELETE",
    url: `${BASE_URL}/${id}`,
    failOnStatusCode: false,
  })
    .as("response")
    .get("@response");
});
