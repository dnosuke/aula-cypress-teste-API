///<reference types="cypress" />

context("Activities", () => {
  it("GET - Buscar todas as atividades", () => {
    cy.pegarTodasAtividades().should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body[0].id).to.eq(1);
      expect(response.body[0].title).to.eq("Activity 1");
      expect(response.body.length).to.eq(30);
    });
  });

  it("POST - Criar uma nova atividade", () => {
    cy.criarAtividade().should((response) => {
      expect(response.status).to.eq(200);
      expect(response.statusText).to.eq("OK");
    });
  });

  it("GET - Pegar atividade de 1", () => {
    cy.pegarAtividadePorId(1).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(1);
      expect(response.body.completed).to.eq(false);
    });
  });

  it("PUT - atulizar atividade por id", () => {
    cy.atualizarAtividadePorId(100).should((response) => {
      expect(response.body.id).to.eq(110);
    });
  });

  it("DELETE - deletar atividade 1", () => {
    cy.deletarAtividadePorId(1).should((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
