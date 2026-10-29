import { parseMoeda } from '@/shared/utils/moeda';
import type { EstoqueFormData } from '../../main/types/EstoqueTypes';

export function calcularPreco(precoStr: string): number {
  return parseMoeda(precoStr);
}

export function calcularQuantidade(qtdStr: string): number {
  return Number(qtdStr) || 0;
}

export function calcularTotalEstoque(preco: number, quantidade: number): number {
  return preco * quantidade;
}

export interface EstoqueModalCalculos {
  preco: number;
  quantidade: number;
  totalEstoque: number;
}

export function calcularCalculosModal(formData: EstoqueFormData): EstoqueModalCalculos {
  const preco = calcularPreco(formData.preco);
  const quantidade = calcularQuantidade(formData.quantidade);
  return {
    preco,
    quantidade,
    totalEstoque: calcularTotalEstoque(preco, quantidade),
  };
}

export function useEstoqueModal() {
  return {
    state: {},
    actions: {},
  };
}