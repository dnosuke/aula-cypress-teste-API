import Contato from "../../service/contato.service";
const contato = new Contato();
import contatoPayload from "../../../fixtures/addContato.payload.json";
import userPayload from "../../../fixtures/addUser.payload.json";

context("Contratos Contato", () => {
  it("Contrato - Validar contrato lista contato", () => {
    cy.allure().epic("Contratos Contato");
    contato.contratoListaContato("listaTodosContatos.contrato");
  });

  it("Contrato - Validar contrato lista todos os enderecos", () => {
    cy.allure().epic("Contratos Contato");
    cy.adicionarPessoa(userPayload).then((pessoa) => {
      cy.adicionarContato(pessoa.body.idPessoa, contatoPayload).then((cont) => {
        contato.contratoListaContatoPorId(
          "listaContatosId.contrato",
          pessoa.body.idPessoa
        );
      });
    });
  });
});
