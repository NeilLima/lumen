import type { Categoria, CategoriasFiltros } from '../../main/types/CategoriasTypes';

export interface CategoriasListProps {
  categoriasFiltradas: Categoria[];
  filtros: CategoriasFiltros;
  formatarValor: (v: number) => string;
  formatarData: (d: string) => string;
  getStatusLabel: (s: string) => string;
  getStatusCor: (s: string) => string;
  onAtualizarFiltro: (c: keyof CategoriasFiltros, v: string) => void;
  onLimparFiltros: () => void;
  onAbrirDetalhe: (d: Categoria) => void;
  onAbrirModalEditar: (d: Categoria) => void;
  onConfirmarExclusao: (d: Categoria) => void;
}
