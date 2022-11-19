import Endereco from "../../service/endereco.service";
const endereco = new Endereco();

context("Contratos Endereco", () => {
  it("Contrato - Validar contrato lista endereco", () => {
    cy.allure().epic("Contratos Endereco");
    endereco.contratoListaEndereco("listaEndereco.contrato");
  });

  it("Contrato - Validar contrato lista todos os enderecos", () => {
    cy.allure().epic("Contratos Endereco");
    endereco.contratoListaTodosEnderecos("listaTodosEndereco.contrato");
  });

  it("Contrato - Validar contrato lista enderecos por idPessoa", () => {
    cy.allure().epic("Contratos Endereco");
    endereco.contratoListaEnderecosPorIdPessoa(
      "listaEnderecoIdPessoa.contrato"
    );
  });

  it("Contrato - Validar contrato lista enderecos por pais", () => {
    cy.allure().epic("Contratos Endereco");
    endereco.contratoListaEnderecoPorPais("listaEnderecoPais.contrato");
  });
});
