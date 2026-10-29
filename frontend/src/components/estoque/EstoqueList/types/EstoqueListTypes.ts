import type { EstoqueItem, EstoqueFiltros } from '../../main/types/EstoqueTypes';

export interface EstoqueListProps {
  itensFiltrados: EstoqueItem[];
  filtros: EstoqueFiltros;
  data: { categorias: string[]; locais: string[] };
  formatarValor: (valor: number) => string;
  getStatusCor: (quantidade: number, minima: number) => string;
  getStatusLabel: (quantidade: number, minima: number) => string;
  onAtualizarFiltro: (campo: keyof EstoqueFiltros, valor: string) => void;
  onLimparFiltros: () => void;
  onAbrirModalEditar: (item: EstoqueItem) => void;
  onConfirmarExclusao: (item: EstoqueItem) => void;
}