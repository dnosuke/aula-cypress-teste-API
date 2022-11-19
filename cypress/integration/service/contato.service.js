import { token } from "../../support/commands";

const API_BASE = Cypress.env("API_BASE");

Cypress.Commands.add("listaContatos", () => {
  cy.request({
    method: "GET",
    url: `${API_BASE}contato`,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    failOnStatusCode: false,
  })
    .as("response")
    .get("@response");
});

Cypress.Commands.add("listaContatoPorId", (idPessoa) => {
  cy.request({
    method: "GET",
    url: `${API_BASE}contato/${idPessoa}`,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    failOnStatusCode: false,
  })
    .as("response")
    .get("@response");
});

Cypress.Commands.add("adicionarContato", (idPessoa, contato) => {
  cy.request({
    method: "POST",
    url: `${API_BASE}contato/${idPessoa}`,
    headers: {
      Authorization: token,
      "Content-Type": "application/JSON",
    },
    body: contato,
    failOnStatusCode: false,
  })
    .as("response")
    .get("@response");
});

Cypress.Commands.add("atualizaContato", (idContato, contato) => {
  cy.request({
    method: "PUT",
    url: `${API_BASE}contato/${idContato}`,
    headers: {
      Authorization: token,
      "Content-Type": "application/JSON",
    },
    body: contato,
    failOnStatusCode: false,
  })
    .as("response")
    .get("@response");
});

Cypress.Commands.add("deletarContato", (idContato) => {
  cy.request({
    method: "DELETE",
    url: `${API_BASE}contato/${idContato}`,
    headers: {
      Authorization: token,
      "Content-Type": "application/JSON",
    },
    failOnStatusCode: false,
  })
    .as("response")
    .get("@response");
});

export default class ContatoContrato {
  contratoListaContato(contrato) {
    cy.listaContatos().then((response) => {
      cy.validaContrato(contrato, response);
    });
  }
  contratoListaContatoPorId(contrato) {
    cy.listaContatoPorId(893).then((response) => {
      cy.validaContrato(contrato, response);
    });
  }
}
