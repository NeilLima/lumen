import type { OrcamentoCategoria, OrcamentoFiltros, OrcamentoData } from '../../main/types/OrcamentoTypes';
export interface OrcamentoListProps {
  categoriasFiltradas: OrcamentoCategoria[]; filtros: OrcamentoFiltros; data: OrcamentoData;
  formatarValor: (v: number) => string; getStatusLabel: (s: string) => string; getStatusCor: (s: string) => string; calcularPercentual: (gasto: number, limite: number) => number;
  onAtualizarFiltro: (campo: keyof OrcamentoFiltros, valor: string) => void; onLimparFiltros: () => void; onAbrirDetalhe: (cat: OrcamentoCategoria) => void; onAbrirModalEditar: (cat: OrcamentoCategoria) => void; onConfirmarExclusao: (cat: OrcamentoCategoria) => void;
}
