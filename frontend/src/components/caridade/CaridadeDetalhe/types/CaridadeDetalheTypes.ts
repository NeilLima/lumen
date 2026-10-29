import type { Caridade } from '../../main/types/CaridadeTypes';

export interface CaridadeDetalheProps {
  detalheCaridade: Caridade | null;
  formatarValor: (v: number) => string;
  formatarData: (d: string) => string;
  getStatusLabel: (s: string) => string;
  getStatusCor: (s: string) => string;
  onFecharDetalhe: () => void;
  onEditar: (d: Caridade) => void;
}
