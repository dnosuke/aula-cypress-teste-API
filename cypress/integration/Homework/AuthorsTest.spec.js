///<reference types="cypress" />
const BASE_URL = "https://fakerestapi.azurewebsites.net/api/v1/Authors";

context("Authors", () => {
  it("GET - Buscar todos os autores", () => {
    cy.request({
      method: "GET",
      url: BASE_URL,
      failOnStatusCode: false,
    })
      .as("response")
      .get("@response")
      .should((response) => {
        expect(response.status).to.eq(200);
      });
  });
  it("POST - Adicionar um novo autor", () => {
    cy.request({
      method: "POST",
      url: BASE_URL,
      failOnStatusCode: false,
      body: {
        id: 600,
        idBook: 600,
        firstName: "Carlos",
        lastName: "Macedo",
      },
    })
      .as("response")
      .get("@response")
      .should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.idBook).to.eq(600);
        expect(response.body.id).to.eq(600);
        expect(response.body.firstName).to.eq("Carlos");
      });
  });

  it("GET - Buscar livro do autor por id", () => {
    cy.request({
      method: "GET",
      url: `${BASE_URL}/authors/books/6`,
      failOnStatusCode: false,
    })
      .as("response")
      .get("@response")
      .should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body[0].idBook).to.eq(6);
      });
  });

  it("GET - Buscar autor por id", () => {
    cy.request({
      method: "GET",
      url: `${BASE_URL}/6`,
      failOnStatusCode: false,
    })
      .as("response")
      .get("@response")
      .should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.id).to.eq(6);
        expect(response.body.lastName).to.eq("Last Name 6");
      });
  });

  it("PUT - Atualizar autor", () => {
    cy.request({
      method: "POST",
      url: BASE_URL,
      failOnStatusCode: false,
      body: {
        id: 603,
        idBook: 603,
        firstName: "Carlo",
        lastName: "Macedo",
      },
    })
      .as("response")
      .get("@response")
      .should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.idBook).to.eq(603);
        expect(response.body.id).to.eq(603);
        expect(response.body.firstName).to.eq("Carlo");
      });
  });

  it("DELETE - deletar autor por id", () => {
    cy.request({
      method: "GET",
      url: `${BASE_URL}/6`,
      failOnStatusCode: false,
    }).should((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
