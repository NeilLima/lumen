import type { Assinatura } from '../../main/types/AssinaturasTypes';

export interface AssinaturasDetalheProps {
  detalheAssinatura: Assinatura | null;
  formatarValor: (v: number) => string;
  formatarData: (d: string) => string;
  getStatusLabel: (s: string) => string;
  getStatusCor: (s: string) => string;
  onFecharDetalhe: () => void;
  onEditar: (d: Assinatura) => void;
}
