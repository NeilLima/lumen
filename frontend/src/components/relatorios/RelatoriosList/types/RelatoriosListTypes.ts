import type { Relatorio, RelatoriosFiltros } from '../../main/types/RelatoriosTypes';

export interface RelatoriosListProps {
  relatoriosFiltradas: Relatorio[];
  filtros: RelatoriosFiltros;
  formatarValor: (v: number) => string;
  formatarData: (d: string) => string;
  getStatusLabel: (s: string) => string;
  getStatusCor: (s: string) => string;
  onAtualizarFiltro: (c: keyof RelatoriosFiltros, v: string) => void;
  onLimparFiltros: () => void;
  onAbrirDetalhe: (d: Relatorio) => void;
  onAbrirModalEditar: (d: Relatorio) => void;
  onConfirmarExclusao: (d: Relatorio) => void;
}
