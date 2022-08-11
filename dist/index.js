import { Calculadora } from "./calculadora.js";
import { RepositorioLocalStorage } from "./repositorios/repositorioLocalStorage.js";
const operadorCalculo = document.getElementById("operador");
const valor1 = document.getElementById("valor1");
const valor2 = document.getElementById("valor2");
const resultadoCalculo = document.getElementById("resultado");
const btnCalcular = document.getElementById("btnCalcular");
const btnLimpar = document.getElementById("btnLimpar");
const divHistorico = document.getElementById("historico");
const calculadora = new Calculadora();
const repositorioLocalStorage = new RepositorioLocalStorage();
exibirHistorico();
function calcularResultado() {
    const calculo = {
        primeiroValor: Number(valor1.value),
        segundoValor: Number(valor2.value),
        operador: operadorCalculo.options[operadorCalculo.selectedIndex].value
    };
    const resultado = calculadora.calcular(calculo);
    repositorioLocalStorage.inserir(calculadora.historicoOperacoes);
    if (calculadora.historicoOperacoes.length === 0) {
        divHistorico.style.display = "none";
    }
    else {
        limparOperacao();
        exibirHistorico();
    }
    resultadoCalculo.innerText = "Resultado: " + resultado;
}
function exibirHistorico() {
    calculadora.historicoOperacoes = repositorioLocalStorage.selecionarTodos();
    if (calculadora.historicoOperacoes.length > 0) {
        divHistorico.classList.remove("d-none");
    }
    calculadora.historicoOperacoes.forEach((operacao) => {
        const txtOperacao = document.createElement("h3");
        txtOperacao.className = "alert alert-success";
        txtOperacao.innerText = operacao;
        divHistorico.appendChild(txtOperacao);
    });
}
function limparOperacao() {
    while (divHistorico.firstChild) {
        divHistorico.removeChild(divHistorico.firstChild);
    }
    ;
}
btnCalcular.addEventListener("click", calcularResultado);
btnLimpar.addEventListener("click", () => {
    repositorioLocalStorage.excluir();
    divHistorico.classList.add("d-none");
    exibirHistorico();
});
