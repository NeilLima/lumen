import type { Compra } from '../../main/types/ComprasTypes';

export interface ComprasDetalheProps {
  detalheCompra: Compra | null;
  formatarValor: (valor: number) => string;
  formatarData: (data: string) => string;
  getStatusCor: (status: string) => string;
  getStatusLabel: (status: string) => string;
  onFecharDetalhe: () => void;
  onEditar: (compra: Compra) => void;
}
