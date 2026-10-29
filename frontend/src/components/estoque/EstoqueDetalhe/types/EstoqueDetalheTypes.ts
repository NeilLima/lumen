import type { EstoqueItem } from '../../main/types/EstoqueTypes';

export interface EstoqueDetalheProps {
  detalheItem: EstoqueItem | null;
  formatarValor: (valor: number) => string;
  formatarData: (data: string) => string;
  getStatusCor: (quantidade: number, minima: number) => string;
  getStatusLabel: (quantidade: number, minima: number) => string;
  onFecharDetalhe: () => void;
  onEditar: (item: EstoqueItem) => void;
}