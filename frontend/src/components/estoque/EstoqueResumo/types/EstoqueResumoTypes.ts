import type { EstoqueItem } from '../../main/types/EstoqueTypes';

export interface EstoqueResumoProps {
  itens: EstoqueItem[];
  formatarValor: (valor: number) => string;
  getStatusCor: (quantidade: number, minima: number) => string;
}