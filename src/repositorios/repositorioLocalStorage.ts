import { IRepositorio } from "../interfaces/IRepositorio";

export class RepositorioLocalStorage implements IRepositorio{
  private readonly localStorage: Storage;

  constructor(){
    this.localStorage = window.localStorage;
  }

  inserir(dados: any): void {
    const dadosJson = JSON.stringify(dados);
    this.localStorage.setItem("historico", dadosJson);
  }
  excluir(): void {
    this.localStorage.removeItem("historico");
  }
  selecionarTodos(): string[] {
    const dadosJson = this.localStorage.getItem("historico");
    if (!dadosJson) {
      return [];
    }
    return JSON.parse(dadosJson);
  }
}