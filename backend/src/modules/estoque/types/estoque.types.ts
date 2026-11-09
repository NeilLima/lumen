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
  compraItemId?: string | null;
  compraItem?: {
    id: string;
    nome: string;
    quantidade: number;
    precoUnitario: number;
  } | null;
  dataAtualizacao: Date;
  createdAt: Date;
  updatedAt: Date;
  product?: {
    id: string;
    name: string;
    // Add other product fields as needed
  };
}

export interface DeleteResult {
  deleted: boolean;
}