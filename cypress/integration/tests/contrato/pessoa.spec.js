import Activities from "../../service/pessoa.service";
const activities = new Activities();

context("Contratos Pessoa", () => {
  it("Contrato - Validar contrato lista byname", () => {
    activities.contraListaPorNome("listaByname.contrato");
  });

  it("Contrato - Validar contrato lista pessoas por pagina", () => {
    activities.contratoListarPessoas("listaPessoa.contrato");
  });

  it("Contrato - Validar contrato lista relatorio", () => {
    activities.contratoListarRelatorio("listaRelatorio.contrato");
  });

  it("Contrato - Validar contrato lista contatos", () => {
    activities.contratoListarContatos("listaContatos.contrato");
  });

  it("Contrato - Validar contrato lista enderecos", () => {
    activities.contratoListaEnderecos("listaEnderecos.contrato");
  });
});
