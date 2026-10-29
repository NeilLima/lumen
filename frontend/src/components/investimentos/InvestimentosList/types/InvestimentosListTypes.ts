import type { Investimento, InvestimentosFiltros } from '../../main/types/InvestimentosTypes';

export interface InvestimentosListProps {
  investimentosFiltradas: Investimento[];
  filtros: InvestimentosFiltros;
  formatarValor: (v: number) => string;
  formatarData: (d: string) => string;
  getStatusLabel: (s: string) => string;
  getStatusCor: (s: string) => string;
  onAtualizarFiltro: (c: keyof InvestimentosFiltros, v: string) => void;
  onLimparFiltros: () => void;
  onAbrirDetalhe: (d: Investimento) => void;
  onAbrirModalEditar: (d: Investimento) => void;
  onConfirmarExclusao: (d: Investimento) => void;
}
