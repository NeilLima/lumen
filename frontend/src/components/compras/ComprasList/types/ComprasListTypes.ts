import type { Compra, CompraFilters, ComprasData } from '../../main/types/ComprasTypes';

export interface ComprasListProps {
  comprasFiltradas: Compra[];
  filtros: CompraFilters;
  data: ComprasData;
  formatarValor: (valor: number) => string;
  formatarData: (data: string) => string;
  getStatusCor: (status: string) => string;
  getStatusLabel: (status: string) => string;
  onAtualizarFiltro: (campo: keyof CompraFilters, valor: string) => void;
  onLimparFiltros: () => void;
  onAbrirDetalhe: (compra: Compra) => void;
  onAbrirModalEditar: (compra: Compra) => void;
  onConfirmarExclusao: (compra: Compra) => void;
}
