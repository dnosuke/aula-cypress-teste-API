///<reference types="cypress" />
import "cypress-localstorage-commands";

const userPayload = require("../../../fixtures/addUser.payload.json");
const enderecoPayload = require("../../../fixtures/addEndereco.payload.json");
const contatoPayload = require("../../../fixtures/addContato.payload.json");

context("Pessoa", () => {
  it("POST - Teste adicionar pessoa", () => {
    cy.allure()
      .epic("Pessoa")
      .feature("adicionar pessoa")
      .story("Dados válidos");
    cy.adicionarPessoa(userPayload)
      .should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.nome).to.eq("Alain");
        expect(response.body.email).to.eq("batman@gmail.com");
      })
      .then((pessoa) => {
        cy.deletarPessoa(pessoa.body.idPessoa);
      });
  });

  it("GET - Teste listar pessoa pelo nome ", () => {
    cy.allure()
      .epic("Pessoa")
      .feature("consultar pessoa pelo nome")
      .story("Dados válidos");
    cy.adicionarPessoa(userPayload).then((pessoa) => {
      cy.listarPessoaPeloNome(pessoa.body.nome).should((response) => {
        expect(response.status).to.eq(200);
      });
      cy.deletarPessoa(pessoa.body.idPessoa);
    });
  });

  it("GET - Teste listar relatorio ", () => {
    cy.allure()
      .epic("Pessoa")
      .feature("listar relatorio")
      .story("Dados válidos");
    cy.adicionarPessoa(userPayload).then((pessoa) => {
      cy.listarRelatorio(pessoa.body.idPessoa).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body[0].idPessoa).to.eq(pessoa.body.idPessoa);
      });
      cy.deletarPessoa(pessoa.body.idPessoa);
    });
  });

  it("GET - Teste lista completa", () => {
    cy.allure().epic("Pessoa").feature("lista completa").story("Dados válidos");
    cy.adicionarPessoa(userPayload).then((pessoa) => {
      cy.listaCompleta(pessoa.body.idPessoa).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body[0].idPessoa).to.eq(pessoa.body.idPessoa);
      });
      cy.deletarPessoa(pessoa.body.idPessoa);
    });
  });

  it("GET - Teste lista com enderecos", () => {
    cy.allure()
      .epic("Pessoa")
      .feature("lista com enderecos")
      .story("Dados válidos");
    cy.adicionarPessoa(userPayload).then((pessoa) => {
      cy.adicionarEndereco(pessoa.body.idPessoa, enderecoPayload).then(
        (endereco) => {
          cy.listaEnderecos(pessoa.body.idPessoa).should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body[0].enderecos).that.is.not.empty;
            expect(response.body[0].enderecos[0].pais).to.eq("Brasil");
          });
          cy.deletarEndereco(endereco.body.idEndereco);
        }
      );
      cy.deletarPessoa(pessoa.body.idPessoa);
    });
  });

  it("GET - Teste retornar lista com enderecos sem passar idPessoa", () => {
    cy.allure()
      .epic("Pessoa")
      .feature("lista com enderecos sem passar idPessoa")
      .story("Dados válidos");
    cy.listaEnderecos().should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).that.is.not.empty;
    });
  });

  it("GET - Teste lista com contatos", () => {
    cy.allure()
      .epic("Pessoa")
      .feature("lista com contatos")
      .story("Dados válidos");
    cy.adicionarPessoa(userPayload).then((pessoa) => {
      cy.adicionarContato(pessoa.body.idPessoa, contatoPayload).then(
        (contato) => {
          cy.listaContatosPessoa(pessoa.body.idPessoa).should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body[0].contatos[0].idContato).to.eq(
              contato.body.idContato
            );
          });
          cy.deletarContato(contato.body.idContato);
        }
      );
      cy.deletarPessoa(pessoa.body.idPessoa);
    });
  });

  it("GET - Teste retorna lista com contatos sem passar idPessoa", () => {
    cy.allure()
      .epic("Pessoa")
      .feature("lista com contatos sem passar idPessoa")
      .story("Dados válidos");
    cy.listaContatosPessoa().should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).that.is.not.empty;
    });
  });

  it("DELETE - Teste deletar pessoa", () => {
    cy.allure().epic("Pessoa").feature("deletar pessoa").story("Dados válidos");
    cy.adicionarPessoa(userPayload).then((pessoa) => {
      cy.deletarPessoa(pessoa.body.idPessoa).should((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  it("PUT - atualizar pessoa", () => {
    cy.allure()
      .epic("Pessoa")
      .feature("atualizar pessoa")
      .story("Dados válidos");
    cy.adicionarPessoa(userPayload).then((pessoa) => {
      cy.atualizarPessoa(pessoa.body.idPessoa).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.nome).to.eq("Delon");
        expect(response.body.email).to.eq("superman@dbccompany.com.br");
      });
      cy.deletarPessoa(pessoa.body.idPessoa);
    });
  });

  it("GET - Teste listar todas as pessoas ", () => {
    const page = null;
    const tamanho = null;
    cy.allure()
      .epic("Pessoa")
      .feature("listar todas as pessoas")
      .story("Dados válidos");
    cy.listarPessoas(page, tamanho).should((response) => {
      expect(response.status).to.eq(200);
    });
  });

  // NEGATIVOS

  it("POST - Adicionar pessoa sem preencher nome retorna codigo 400", () => {
    const body = {
      nome: "",
      dataNascimento: "2003-12-08",
      cpf: "1233563152",
      email: "batman@gmail.com",
    };
    cy.allure()
      .epic("Pessoa")
      .feature("adicionar pessoa")
      .story("Dados inválidos");
    cy.adicionarPessoa(body).should((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it("GET - Teste buscar pessoa com nome não cadastrado retorna vazio ", () => {
    const nome = "Shud12345";
    cy.allure()
      .epic("Pessoa")
      .feature("consultar pessoa pelo nome")
      .story("Dados inválidos");
    cy.listarPessoaPeloNome(nome).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).that.is.empty;
    });
  });

  it("DELETE - Teste deletar pessoa passando id inexistente retorna codigo 404", () => {
    cy.allure()
      .epic("Pessoa")
      .feature("deletar pessoa")
      .story("Dados inválidos");
    cy.adicionarPessoa(userPayload).then((pessoa) => {
      cy.deletarPessoa(pessoa.body.idPessoa);
      cy.deletarPessoa(pessoa.body.idPessoa).should((response) => {
        expect(response.status).to.eq(404);
        expect(response.body.message).to.eq("ID da pessoa nao encontrada");
      });
    });
  });

  it("PUT - Atualizar Pessoa Passando Id Inexistente Retorna Codigo 404", () => {
    cy.allure()
      .epic("Pessoa")
      .feature("atualizar pessoa")
      .story("Dados inválidos");
    cy.adicionarPessoa(userPayload).then((pessoa) => {
      cy.deletarPessoa(pessoa.body.idPessoa);
      cy.atualizarPessoa(pessoa.body.idPessoa).should((response) => {
        expect(response.status).to.eq(404);
        expect(response.body.message).to.eq("ID da pessoa nao encontrada");
      });
    });
  });

  it("GET - Teste Buscar Relatorio Passando idPessoa Inexistente Retorna Vazio ", () => {
    cy.allure()
      .epic("Pessoa")
      .feature("listar relatorio")
      .story("Dados inválidos");
    cy.adicionarPessoa(userPayload).then((pessoa) => {
      cy.deletarPessoa(pessoa.body.idPessoa);
      cy.listarRelatorio(pessoa.body.idPessoa).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).that.is.empty;
      });
    });
  });

  it("GET - Teste Buscar Lista Completa Passando idPessoa Inexistente Retorna Vazio ", () => {
    cy.allure()
      .epic("Pessoa")
      .feature("lista completa")
      .story("Dados inválidos");
    cy.adicionarPessoa(userPayload).then((pessoa) => {
      cy.deletarPessoa(pessoa.body.idPessoa);
      cy.listaCompleta(pessoa.body.idPessoa).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).that.is.empty;
      });
    });
  });

  it("GET - Teste Buscar Lista De Enderecos Passando idPessoa Inexistente Retorna Codigo 404", () => {
    cy.allure()
      .epic("Pessoa")
      .feature("lista de enderecos")
      .story("Dados inválidos");
    cy.adicionarPessoa(userPayload).then((pessoa) => {
      cy.deletarPessoa(pessoa.body.idPessoa);
      cy.listaEnderecos(pessoa.body.idPessoa).should((response) => {
        expect(response.status).to.eq(404);
        expect(response.body.message).to.eq("ID da pessoa nao encontrada");
      });
    });
  });

  it("GET - Teste Buscar Lista Com Contatos Passando Id Pessoa Inexistente Retorna Codigo 404", () => {
    cy.allure()
      .epic("Pessoa")
      .feature("lista com contatos")
      .story("Dados inválidos");
    cy.adicionarPessoa(userPayload).then((pessoa) => {
      cy.deletarPessoa(pessoa.body.idPessoa);
      cy.listaContatosPessoa(pessoa.body.idPessoa).should((response) => {
        expect(response.status).to.eq(404);
        expect(response.body).that.is.not.empty;
      });
    });
  });

  it("GET - Teste Consultar Pessoa Pelo Nome Passando Nome Invalido Retorna Vazio ", () => {
    const nome = "1234";
    cy.allure()
      .epic("Pessoa")
      .feature("consultar pessoa pelo nome")
      .story("Dados inválidos");
    cy.listarPessoaPeloNome(nome).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).that.is.empty;
    });
  });

  /* it("GET - Lista pessoas com nascimento entre as datas", () => {
    const data = "23/08/1980";
    const dtFinal = "23/08/2007";
    cy.listaPessoasDataNascimento(data, dtFinal).then(() => {
      // ERRO NA API
    });
  }); */
});
