import type { Relatorio } from '../../main/types/RelatoriosTypes';

export interface RelatoriosDetalheProps {
  detalheRelatorio: Relatorio | null;
  formatarValor: (v: number) => string;
  formatarData: (d: string) => string;
  getStatusLabel: (s: string) => string;
  getStatusCor: (s: string) => string;
  onFecharDetalhe: () => void;
  onEditar: (d: Relatorio) => void;
}
