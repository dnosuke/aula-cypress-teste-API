import Activities from "../../service/pessoa.service";
const activities = new Activities();
import userPayload from "../../../fixtures/addUser.payload.json";

context("Contratos Pessoa", () => {
  it("Contrato - Validar contrato lista byname", () => {
    cy.allure().epic("Contratos Pessoa");
    activities.contraListaPorNome("listaByname.contrato");
  });

  it("Contrato - Validar contrato lista pessoas por pagina", () => {
    cy.allure().epic("Contratos Pessoa");
    activities.contratoListarPessoas("listaPessoa.contrato");
  });

  it("Contrato - Validar contrato lista relatorio", () => {
    cy.allure().epic("Contratos Pessoa");
    cy.adicionarPessoa(userPayload).then((pessoa) => {
      activities.contratoListarRelatorio(
        "listaRelatorio.contrato",
        pessoa.body.idPessoa
      );
      cy.deletarPessoa(pessoa.body.idPessoa);
    });
  });

  it("Contrato - Validar contrato lista contatos", () => {
    cy.allure().epic("Contratos Pessoa");
    activities.contratoListarContatos("listaContatos.contrato");
  });

  it("Contrato - Validar contrato lista enderecos", () => {
    cy.allure().epic("Contratos Pessoa");
    activities.contratoListaEnderecos("listaEnderecos.contrato");
  });
});
