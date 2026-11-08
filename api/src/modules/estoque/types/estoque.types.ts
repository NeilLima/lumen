/* eslint-disable prettier/prettier */
/**
 * Tipos específicos do módulo de estoque.
 */

export type EstoqueUnidade = 'un' | 'kg' | 'g' | 'l' | 'ml' | 'pacote' | 'cx';

export interface EstoqueItemResponse {
  id: string;
  userId: string;
  nome: string;
  categoria: string;
  quantidade: number;
  unidade: string;
  preco: number;
  localCompra: string;
  quantidadeMinima: number;
  dataAtualizacao: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeleteResult {
  deleted: boolean;
}