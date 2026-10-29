import type { Ajuda, AjudaFiltros } from '../../main/types/AjudaTypes';

export interface AjudaListProps {
  ajudasFiltradas: Ajuda[];
  filtros: AjudaFiltros;
  formatarValor: (v: number) => string;
  formatarData: (d: string) => string;
  getStatusLabel: (s: string) => string;
  getStatusCor: (s: string) => string;
  onAtualizarFiltro: (c: keyof AjudaFiltros, v: string) => void;
  onLimparFiltros: () => void;
  onAbrirDetalhe: (d: Ajuda) => void;
  onAbrirModalEditar: (d: Ajuda) => void;
  onConfirmarExclusao: (d: Ajuda) => void;
}
