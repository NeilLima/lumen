import type { Ajuda } from '../../main/types/AjudaTypes';

export interface AjudaDetalheProps {
  detalheAjuda: Ajuda | null;
  formatarValor: (v: number) => string;
  formatarData: (d: string) => string;
  getStatusLabel: (s: string) => string;
  getStatusCor: (s: string) => string;
  onFecharDetalhe: () => void;
  onEditar: (d: Ajuda) => void;
}
