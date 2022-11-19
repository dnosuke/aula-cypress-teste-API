///<reference types="cypress" />
import userPayload from "../../../fixtures/addUser.payload.json";
import addEnderecoPayload from "../../../fixtures/addEndereco.payload.json";
import atualizaEnderecoPayload from "../../../fixtures/atualizaEndereco.payload.json";

context("Endereco", () => {
  it("GET - Teste listar endereco por idEndereco", () => {
    cy.allure()
      .epic("Endereco")
      .feature("listar endereco por idEndereco")
      .story("Dados válidos");
    cy.adicionarPessoa(userPayload).then((pessoa) => {
      cy.adicionarEndereco(pessoa.body.idPessoa, addEnderecoPayload).then(
        (endereco) => {
          cy.listaEndereco(endereco.body.idEndereco).should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.logradouro).to.eq(
              "Rua Deputado Álvares Florence"
            );
          });
          cy.deletarEndereco(endereco.body.idEndereco);
        }
      );
      cy.deletarPessoa(pessoa.body.idPessoa);
    });
  });

  it("GET - Teste listar endereco por país", () => {
    cy.allure()
    .epic("Endereco")
    .feature("listar endereco por país")
    .story("Dados válidos");
    cy.adicionarPessoa(userPayload).then((pessoa) => {
      cy.adicionarEndereco(pessoa.body.idPessoa, addEnderecoPayload).then(
        (endereco) => {
          cy.listarEnderecoPorPais("Brasil").should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body[0].pais).to.eq("Brasil");
          });
          cy.deletarEndereco(endereco.body.idEndereco);
        }
      );
      cy.deletarPessoa(pessoa.body.idPessoa);
    });
  });

  it("GET - Teste listar enderecos por pagina", () => {
    const pagina = 0;
    const tamanho = 20;
    cy.allure()
    .epic("Endereco")
    .feature("listar endereco por pagina")
    .story("Dados válidos");
    cy.adicionarPessoa(userPayload).then((pessoa) => {
      cy.adicionarEndereco(pessoa.body.idPessoa, addEnderecoPayload).then(
        (endereco) => {
          cy.listarTodosEnderecos(pagina, tamanho).should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.content).that.is.not.empty;
          });
          cy.deletarEndereco(endereco.body.idEndereco);
        }
      );
      cy.deletarPessoa(pessoa.body.idPessoa);
    });
  });

  it("GET - Teste listar endereco por idPessoa", () => {
    cy.allure()
    .epic("Endereco")
    .feature("listar endereco por idPessoa")
    .story("Dados válidos");
    cy.adicionarPessoa(userPayload).then((pessoa) => {
      cy.adicionarEndereco(pessoa.body.idPessoa, addEnderecoPayload).then(
        (endereco) => {
          cy.listarEnderecoPorIdPessoa(pessoa.body.idPessoa).should(
            (response) => {
              expect(response.status).to.eq(200);
              expect(response.body[0].logradouro).to.eq(
                "Rua Deputado Álvares Florence"
              );
            }
          );
          cy.deletarEndereco(endereco.body.idEndereco);
        }
      );
      cy.deletarPessoa(pessoa.body.idPessoa);
    });
  });

  it("DELETE - Teste deletar endereco por idEndereco", () => {
    cy.allure()
    .epic("Endereco")
    .feature("deletar endereco por idEndereco")
    .story("Dados válidos");
    cy.adicionarPessoa(userPayload).then((pessoa) => {
      cy.adicionarEndereco(pessoa.body.idPessoa, addEnderecoPayload).then(
        (endereco) => {
          cy.deletarEndereco(endereco.body.idEndereco).should((response) => {
            expect(response.status).to.eq(200);
          });
        }
      );
      cy.deletarPessoa(pessoa.body.idPessoa);
    });
  });

  it("POST - Teste adicionar endereco com sucesso", () => {
    cy.allure()
    .epic("Endereco")
    .feature("adicionar endereco")
    .story("Dados válidos");
    cy.adicionarPessoa(userPayload).then((pessoa) => {
      cy.adicionarEndereco(pessoa.body.idPessoa, addEnderecoPayload).then(
        (endereco) => {
          expect(endereco.status).to.eq(200);
          expect(endereco.body.logradouro).to.eq(
            "Rua Deputado Álvares Florence"
          );
          cy.deletarEndereco(endereco.body.idEndereco);
        }
      );
      cy.deletarPessoa(pessoa.body.idPessoa);
    });
  });

  /* it("PUT - Teste atualizar endereco com sucesso", () => {
    cy.adicionarPessoa(userPayload).then((pessoa) => {
      cy.adicionarEndereco(pessoa.body.idPessoa, addEnderecoPayload).then(
        (endereco) => {
          cy.atualizarEndereco(
            endereco.body.idEndereco,
            atualizaEnderecoPayload
          ).should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.logradouro).to.eq("Avenida Brasil");
          });
          cy.deletarEndereco(endereco.body.idEndereco);
        }
      );
      cy.deletarPessoa(pessoa.body.idPessoa);
    });
  }); */
});
