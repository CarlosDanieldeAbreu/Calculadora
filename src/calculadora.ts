import { Calculo } from "./calculo.type.js";

export class Calculadora {
  historicoOperacoes: string[];

  constructor() {
    this.historicoOperacoes = [];
  }

  calcular(calculo: Calculo): number {
    let resultado: number = 0;

    if (calculo.operador == "x") {
      resultado = calculo.primeiroValor * calculo.segundoValor;
    }
    else if (calculo.operador == "+") {
      resultado = calculo.primeiroValor + calculo.segundoValor;
    }
    else if (calculo.operador == "-") {
      resultado = calculo.primeiroValor - calculo.segundoValor;
    }
    else if (calculo.operador == "/") {
      if (calculo.segundoValor == 0) {
        resultado = 0;
      }
      else if (calculo.segundoValor < 0 || calculo.segundoValor > 0) {
        resultado = calculo.primeiroValor / calculo.segundoValor;
      }
    }

    const operacao: string = `${calculo.primeiroValor} ${calculo.operador} ${calculo.segundoValor} = ${resultado}`
    this.historicoOperacoes.push(operacao);

    return resultado;
  }
}