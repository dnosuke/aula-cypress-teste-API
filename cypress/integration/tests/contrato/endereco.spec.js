import Endereco from "../../service/endereco.service";
const endereco = new Endereco();

context("Contratos Pessoa", () => {
  it("Contrato - Validar contrato lista endereco", () => {
    endereco.contratoListaEndereco("listaEndereco.contrato");
  });

  it("Contrato - Validar contrato lista todos os enderecos", () => {
    endereco.contratoListaTodosEnderecos("listaTodosEndereco.contrato");
  });

  it("Contrato - Validar contrato lista enderecos por idPessoa", () => {
    endereco.contratoListaEnderecosPorIdPessoa(
      "listaEnderecoIdPessoa.contrato"
    );
  });

  it("Contrato - Validar contrato lista enderecos por pais", () => {
    endereco.contratoListaEnderecoPorPais("listaEnderecoPais.contrato");
  });
});
