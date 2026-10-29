import type { Caridade, CaridadeFiltros } from '../../main/types/CaridadeTypes';

export interface CaridadeListProps {
  caridadesFiltradas: Caridade[];
  filtros: CaridadeFiltros;
  formatarValor: (v: number) => string;
  formatarData: (d: string) => string;
  getStatusLabel: (s: string) => string;
  getStatusCor: (s: string) => string;
  onAtualizarFiltro: (c: keyof CaridadeFiltros, v: string) => void;
  onLimparFiltros: () => void;
  onAbrirDetalhe: (d: Caridade) => void;
  onAbrirModalEditar: (d: Caridade) => void;
  onConfirmarExclusao: (d: Caridade) => void;
}
