import Ajv from "ajv";
import { token } from "../../support/commands";

const API_BASE = Cypress.env("API_BASE");

Cypress.Commands.add("adicionarPessoa", (body) => {
  cy.request({
    method: "POST",
    url: `${API_BASE}pessoa`,
    headers: {
      Authorization: token,
      "Content-Type": "application/JSON",
    },
    body: body,
    failOnStatusCode: false,
  })
    .as("response")
    .get("@response");
});

Cypress.Commands.add("deletarPessoa", (idPessoa) => {
  cy.request({
    method: "DELETE",
    url: `${API_BASE}pessoa/${idPessoa}`,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("listarPessoas", (page, tamanho) => {
  cy.request({
    method: "GET",
    url: `${API_BASE}pessoa`,
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

Cypress.Commands.add("atualizarPessoa", (idPessoa) => {
  cy.request({
    method: "PUT",
    url: `${API_BASE}pessoa/${idPessoa}`,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: {
      nome: "Delon",
      dataNascimento: "2003-12-08",
      cpf: "56448825002",
      email: "superman@dbccompany.com.br",
    },
    failOnStatusCode: false,
  })
    .as("response")
    .get("@response");
});

Cypress.Commands.add("listarPessoaPeloNome", (nome) => {
  cy.request({
    method: "GET",
    url: `${API_BASE}pessoa/byname`,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    qs: {
      nome: nome,
    },
    failOnStatusCode: false,
  })
    .as("response")
    .get("@response");
});

Cypress.Commands.add("listarRelatorio", (idPessoa) => {
  cy.request({
    method: "GET",
    url: `${API_BASE}pessoa/relatorio`,
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

Cypress.Commands.add("listaCompleta", (idPessoa) => {
  cy.request({
    method: "GET",
    url: `${API_BASE}pessoa/lista-completa`,
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

Cypress.Commands.add("listaEnderecos", (_idPessoa) => {
  cy.request({
    method: "GET",
    url: `${API_BASE}pessoa/lista-com-enderecos`,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    qs: {
      idPessoa: _idPessoa,
    },
    failOnStatusCode: false,
  })
    .as("response")
    .get("@response");
});

Cypress.Commands.add("listaContatos", (_idPessoa) => {
  cy.request({
    method: "GET",
    url: `${API_BASE}pessoa/lista-com-contatos`,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    qs: {
      idPessoa: _idPessoa,
    },
    failOnStatusCode: false,
  })
    .as("response")
    .get("@response");
});

Cypress.Commands.add("login", () => {
  cy.request({
    method: "POST",
    url: `${API_BASE}/auth`,
    failOnStatusCode: false,
    body: {
      login: "admin",
      senha: "123",
    },
  })
    .its("body")
    .then((response) => cy.setLocalStorage("token", response));
});

Cypress.Commands.add("listaPessoasDataNascimento", (data, dtFinal) => {
  cy.request({
    method: "GET",
    url: `${API_BASE}pessoa/data-nascimento`,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    qs: {
      data: data,
      dtFinal: dtFinal,
    },
    failOnStatusCode: false,
  })
    .as("response")
    .get("@response");
});

export default class Contrato {
  contraListaPorNome(contrato) {
    cy.listarPessoaPeloNome("Mordekaiser").then((response) => {
      cy.validaContrato(contrato, response);
    });
  }

  contratoListarPessoas(contrato) {
    cy.listarPessoas(1, 20).then((response) => {
      cy.validaContrato(contrato, response);
    });
  }

  contratoListarRelatorio(contrato) {
    cy.listarRelatorio(4).then((response) => {
      cy.validaContrato(contrato, response);
    });
  }
  contratoListarCompleta(contrato) {
    cy.listaCompleta(4).then((response) => {
      cy.validaContrato(contrato, response);
    });
  }

  contratoListarContatos(contrato) {
    cy.listaContatos(4).then((response) => {
      cy.validaContrato(contrato, response);
    });
  }
  contratoListaEnderecos(contrato) {
    cy.listaEnderecos(4).then((response) => {
      cy.validaContrato(contrato, response);
    });
  }
}
