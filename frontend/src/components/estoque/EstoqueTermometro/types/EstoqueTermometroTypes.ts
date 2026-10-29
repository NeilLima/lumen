import type { EstoqueItem } from '../../main/types/EstoqueTypes';

export interface EstoqueTermometroProps {
  itens: EstoqueItem[];
  getStatusCor: (quantidade: number, minima: number) => string;
  getStatusLabel: (quantidade: number, minima: number) => string;
}