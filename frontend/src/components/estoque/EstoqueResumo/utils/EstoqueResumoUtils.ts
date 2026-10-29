import type { EstoqueItem } from '../../main/types/EstoqueTypes';

export function calcularTotalItens(itens: EstoqueItem[]): number {
  return itens.length;
}

export function calcularValorTotal(itens: EstoqueItem[]): number {
  return itens.reduce((acc, i) => acc + i.quantidade * i.preco, 0);
}

export function calcularItensCriticos(
  itens: EstoqueItem[],
  getStatusCor: (quantidade: number, minima: number) => string,
): number {
  return itens.filter(i => getStatusCor(i.quantidade, i.quantidadeMinima) === '#ef4444').length;
}

export function calcularItensBaixos(
  itens: EstoqueItem[],
  getStatusCor: (quantidade: number, minima: number) => string,
): number {
  return itens.filter(i => getStatusCor(i.quantidade, i.quantidadeMinima) === '#f59e0b').length;
}

export interface EstoqueResumoCalculos {
  totalItens: number;
  valorTotal: number;
  itensCriticos: number;
  itensBaixos: number;
}

export function calcularResumo(
  itens: EstoqueItem[],
  getStatusCor: (quantidade: number, minima: number) => string,
): EstoqueResumoCalculos {
  return {
    totalItens: calcularTotalItens(itens),
    valorTotal: calcularValorTotal(itens),
    itensCriticos: calcularItensCriticos(itens, getStatusCor),
    itensBaixos: calcularItensBaixos(itens, getStatusCor),
  };
}

export function useEstoqueResumo() {
  return {
    state: {},
    actions: {},
  };
}