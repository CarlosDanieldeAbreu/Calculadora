export class Calculadora {
    constructor() {
        this.historicoOperacoes = [];
    }
    calcular(calculo) {
        let resultado = 0;
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
        const operacao = `${calculo.primeiroValor} ${calculo.operador} ${calculo.segundoValor} = ${resultado}`;
        this.historicoOperacoes.push(operacao);
        return resultado;
    }
}
