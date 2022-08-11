import { Calculadora } from "./calculadora.js";
import { Calculo } from "./calculo.type.js";
import { RepositorioLocalStorage } from "./repositorios/repositorioLocalStorage.js";

const operadorCalculo = document.getElementById("operador") as HTMLSelectElement;

const valor1 = document.getElementById("valor1") as HTMLInputElement;
const valor2 = document.getElementById("valor2") as HTMLInputElement;
const resultadoCalculo = document.getElementById("resultado") as HTMLParagraphElement;
const btnCalcular = document.getElementById("btnCalcular") as HTMLButtonElement;
const btnLimpar = document.getElementById("btnLimpar") as HTMLButtonElement;
const divHistorico = document.getElementById("historico") as HTMLDivElement;

const calculadora = new Calculadora();
const repositorioLocalStorage = new RepositorioLocalStorage();
exibirHistorico();

function calcularResultado(): void {
  const calculo: Calculo = {
    primeiroValor: Number(valor1.value),
    segundoValor: Number(valor2.value),
    operador: operadorCalculo.options[operadorCalculo.selectedIndex].value
  }

  const resultado = calculadora.calcular(calculo);

  repositorioLocalStorage.inserir(calculadora.historicoOperacoes);

  if (calculadora.historicoOperacoes.length === 0) {
    divHistorico.style.display = "none";
  } else {
    limparOperacao();
    exibirHistorico();
  }

  resultadoCalculo.innerText = "Resultado: " + resultado;
}

function exibirHistorico() {
  calculadora.historicoOperacoes = repositorioLocalStorage.selecionarTodos();

  if(calculadora.historicoOperacoes.length > 0){
    divHistorico.classList.remove("d-none");
  }
  calculadora.historicoOperacoes.forEach((operacao: string) => {
    const txtOperacao = document.createElement("h3") as HTMLHeadingElement;

    txtOperacao.className = "alert alert-success";
    txtOperacao.innerText = operacao;

    divHistorico.appendChild(txtOperacao);
  });
}

function limparOperacao() {
  while (divHistorico.firstChild) {
    divHistorico.removeChild(divHistorico.firstChild);
  };
}

btnCalcular.addEventListener("click", calcularResultado);
btnLimpar.addEventListener("click", () =>{
  repositorioLocalStorage.excluir();
  divHistorico.classList.add("d-none");
  exibirHistorico();
});

