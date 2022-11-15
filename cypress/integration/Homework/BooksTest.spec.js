///<reference types="cypress" />
const BASE_URL = "https://fakerestapi.azurewebsites.net/api/v1/Books";

context("Books", () => {
  it("GET - Buscar todos os livros", () => {
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
        title: "Abracadabra",
        description: "Um livro mágico",
        pageCount: 20,
        excerpt: "string",
        publishDate: "2022-11-15T00:18:36.797Z",
      },
    })
      .as("response")
      .get("@response")
      .should((response) => {
        expect(response.status).to.eq(200);
      });
  });

  it("GET - Buscar livro por id", () => {
    cy.request({
      method: "GET",
      url: `${BASE_URL}/6`,
      failOnStatusCode: false,
    })
      .as("response")
      .get("@response")
      .should((response) => {
        console.log(response.body);

        expect(response.status).to.eq(200);
        expect(response.body.id).to.eq(6);
        expect(response.body.title).to.eq("Book 6");
      });
  });

  it("PUT - Atualizar livro", () => {
    cy.request({
      method: "POST",
      url: BASE_URL,
      failOnStatusCode: false,
      body: {
        id: 666,
        title: "Abracadabra 2",
        description: "Um livro mágico 2",
        pageCount: 20,
        excerpt: "string",
        publishDate: "2022-11-15T00:18:36.797Z",
      },
    })
      .as("response")
      .get("@response")
      .should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.id).to.eq(666);
        expect(response.body.pageCount).to.eq(20);
        expect(response.body.title).to.eq("Abracadabra 2");
      });
  });

  it("DELETE - deletar livro", () => {
    cy.request({
      method: "DELETE",
      url: `${BASE_URL}/6`,
      failOnStatusCode: false,
    }).should((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
