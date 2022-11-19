import { token } from "../../support/commands";

const API_BASE = Cypress.env("API_BASE");

Cypress.Commands.add("adicionarEndereco", (idPessoa, endereco) => {
  cy.request({
    method: "POST",
    url: `${API_BASE}endereco/${idPessoa}`,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    qs: {
      idPessoa: idPessoa,
    },
    body: endereco,
    failOnStatusCode: false,
  })
    .as("response")
    .get("@response");
});
Cypress.Commands.add("atualizarEndereco", (idEndereco, endereco) => {
  cy.request({
    method: "PUT",
    url: `${API_BASE}endereco/${idEndereco}`,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: endereco,
    failOnStatusCode: false,
  })
    .as("response")
    .get("@response");
});

Cypress.Commands.add("listaEndereco", (idEndereco) => {
  cy.request({
    method: "GET",
    url: `${API_BASE}endereco/${idEndereco}`,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    failOnStatusCode: false,
  })
    .as("response")
    .get("@response");
});

Cypress.Commands.add("listarTodosEnderecos", (page, tamanho) => {
  cy.request({
    method: "GET",
    url: `${API_BASE}endereco`,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    qs: {
      pagina: page,
      tamanhoDasPaginas: tamanho,
    },
    failOnStatusCode: false,
  })
    .as("response")
    .get("@response");
});

Cypress.Commands.add("listarEnderecoPorIdPessoa", (idPessoa) => {
  cy.request({
    method: "GET",
    url: `${API_BASE}endereco/retorna-por-id-pessoa`,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    qs: {
      idPessoa: idPessoa,
    },
    failOnStatusCode: false,
  })
    .as("response")
    .get("@response");
});

Cypress.Commands.add("listarEnderecoPorPais", (pais) => {
  cy.request({
    method: "GET",
    url: `${API_BASE}endereco/retorna-por-pais`,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    qs: {
      País: pais,
    },
    failOnStatusCode: false,
  })
    .as("response")
    .get("@response");
});

Cypress.Commands.add("deletarEndereco", (idEndereco) => {
  cy.request({
    method: "DELETE",
    url: `${API_BASE}endereco/${idEndereco}`,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    failOnStatusCode: false,
  })
    .as("response")
    .get("@response");
});

export default class EnderecoContrato {
  contratoListaEndereco(contrato) {
    cy.listaEndereco(173).then((response) => {
      cy.validaContrato(contrato, response);
    });
  }

  contratoListaTodosEnderecos(contrato) {
    cy.listarTodosEnderecos(0, 20).then((response) => {
      cy.validaContrato(contrato, response);
    });
  }

  contratoListaEnderecosPorIdPessoa(contrato) {
    cy.listarEnderecoPorIdPessoa(956).then((response) => {
      cy.validaContrato(contrato, response);
    });
  }

  contratoListaEnderecoPorPais(contrato) {
    cy.listarEnderecoPorPais("Brasil").then((response) => {
      cy.validaContrato(contrato, response);
    });
  }
}
