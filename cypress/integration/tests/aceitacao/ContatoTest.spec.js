///<reference types="cypress" />
import userPayload from "../../../fixtures/addUser.payload.json";
import contatoPayload from "../../../fixtures/addContato.payload.json";
import atualizaPayload from "../../../fixtures/atualizaContato.payload.json";

context("Contato", () => {
  it("POST - Teste adicionar contato", () => {
    cy.allure()
      .epic("Contato")
      .feature("adicionar contato")
      .story("Dados válidos");
    cy.adicionarPessoa(userPayload).then((pessoa) => {
      cy.adicionarContato(pessoa.body.idPessoa, contatoPayload).should(
        (response) => {
          expect(response.status).to.eq(200);
          expect(response.body.idPessoa).to.eq(response.body.idPessoa);
          expect(response.body.telefone).to.eq("(54)91234-1232");
        }
      );
      cy.deletarPessoa(pessoa.body.idPessoa);
    });
  });

  it("POST - Teste adicionar contato com idPessoa inválido retorna codigo 400", () => {
    const idPessoa = "shud123";
    cy.allure()
      .epic("Contato")
      .feature("adicionar contato")
      .story("Dados inválidos");
    cy.adicionarContato(idPessoa, contatoPayload).should((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it("POST - Teste adicionar contato com idPessoa inexistente", () => {
    cy.allure()
      .epic("Contato")
      .feature("adicionar contato")
      .story("Dados inválidos");
    cy.adicionarPessoa(userPayload).then((pessoa) => {
      cy.deletarPessoa(pessoa.body.idPessoa);
      cy.adicionarContato(pessoa.body.idPessoa, contatoPayload).should(
        (response) => {
          expect(response.status).to.eq(404);
          expect(response.body.message).to.eq("ID da pessoa nao encontrada");
        }
      );
    });
  });

  it("DELETE - Teste deletar contato", () => {
    cy.allure()
      .epic("Contato")
      .feature("deletar contato")
      .story("Dados válidos");
    cy.adicionarPessoa(userPayload).then((pessoa) => {
      cy.adicionarContato(pessoa.body.idPessoa, contatoPayload).then(
        (contato) => {
          cy.deletarContato(contato.body.idContato).should((response) => {
            expect(response.status).to.eq(200);
          });
        }
      );
      cy.deletarPessoa(pessoa.body.idPessoa);
    });
  });

  it("DELETE - Teste deletar contato com idContato inexistente retorna codigo 404", () => {
    cy.allure()
      .epic("Contato")
      .feature("deletar contato")
      .story("Dados inválidos");
    cy.adicionarPessoa(userPayload).then((pessoa) => {
      cy.adicionarContato(pessoa.body.idPessoa, contatoPayload).then(
        (contato) => {
          cy.deletarContato(contato.body.idContato);
          cy.deletarContato(contato.body.idContato).should((response) => {
            expect(response.status).to.eq(404);
            expect(response.body.message).to.eq("{idContato} não encontrado");
          });
        }
      );
      cy.deletarPessoa(pessoa.body.idPessoa);
    });
  });

  it("PUT - Teste atualizar contato", () => {
    cy.allure()
      .epic("Contato")
      .feature("atualizar contato")
      .story("Dados válidos");
    cy.adicionarPessoa(userPayload).then((pessoa) => {
      cy.adicionarContato(pessoa.body.idPessoa, contatoPayload).then(
        (contato) => {
          cy.atualizaContato(contato.body.idContato, atualizaPayload).should(
            (response) => {
              expect(response.status).to.eq(200);
              expect(response.body.descricao).to.eq("telegram");
            }
          );
          cy.deletarContato(contato.body.idContato);
        }
      );
      cy.deletarPessoa(pessoa.body.idPessoa);
    });
  });

  it("PUT - Teste atualizar contato com idContato inexistente retorna mensagem '{idContato} não encontrado'", () => {
    cy.allure()
      .epic("Contato")
      .feature("atualizar contato")
      .story("Dados inválidos");
    cy.adicionarPessoa(userPayload).then((pessoa) => {
      cy.adicionarContato(pessoa.body.idPessoa, contatoPayload).then(
        (contato) => {
          cy.deletarContato(contato.body.idContato);
          cy.atualizaContato(contato.body.idContato, atualizaPayload).should(
            (response) => {
              expect(response.status).to.eq(404);
              expect(response.body.message).to.eq("{idContato} não encontrado");
            }
          );
        }
      );
      cy.deletarPessoa(pessoa.body.idPessoa);
    });
  });

  it("GET - Teste listar contatos", () => {
    cy.allure()
      .epic("Contato")
      .feature("listar contatos")
      .story("Dados válidos");
    cy.listaContatos().should((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("GET - Teste listar contato por idPessoa", () => {
    cy.allure()
      .epic("Contato")
      .feature("listar contato por idPessoa")
      .story("Dados válidos");
    cy.adicionarPessoa(userPayload).then((pessoa) => {
      cy.adicionarContato(pessoa.body.idPessoa, contatoPayload).then(
        (contato) => {
          cy.listaContatoPorId(pessoa.body.idPessoa).should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.idPessoa).to.eq(pessoa.body.id);
            expect(response.body.idContato).to.eq(contato.body.id);
          });
          cy.deletarContato(contato.body.idContato);
        }
      );
      cy.deletarPessoa(pessoa.body.idPessoa);
    });
  });

  it("GET - Teste listar contato com idPessoa inexistente retorna mensagem 'ID da pessoa nao encontrada'", () => {
    cy.allure()
      .epic("Contato")
      .feature("listar contato por idPessoa")
      .story("Dados inválidos");
    cy.adicionarPessoa(userPayload).then((pessoa) => {
      cy.adicionarContato(pessoa.body.idPessoa, contatoPayload).then(
        (contato) => {
          cy.deletarPessoa(pessoa.body.idPessoa);
          cy.listaContatoPorId(pessoa.body.idPessoa).should((response) => {
            expect(response.status).to.eq(404);
            expect(response.body.message).to.eq("ID da pessoa nao encontrada");
          });
          cy.deletarContato(contato.body.idContato);
        }
      );
    });
  });
});
