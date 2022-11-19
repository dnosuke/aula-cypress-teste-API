import Contato from "../../service/contato.service";
const contato = new Contato();

context("Contratos Pessoa", () => {
  it("Contrato - Validar contrato lista contato", () => {
    contato.contratoListaContato("listaTodosContatos.contrato");
  });

  it("Contrato - Validar contrato lista todos os enderecos", () => {
    contato.contratoListaContatoPorId("listaContatosId.contrato");
  });
});
