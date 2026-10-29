import type { Meta, MetasFiltros, MetasData } from '../../main/types/MetasTypes';
export interface MetasListProps {
  metasFiltradas: Meta[];
  filtros: MetasFiltros;
  data: MetasData;
  formatarValor: (valor: number) => string;
  formatarData: (data: string) => string;
  getPrioridadeLabel: (p: Meta['prioridade']) => string;
  getPrioridadeCor: (p: Meta['prioridade']) => string;
  getStatusLabel: (s: Meta['status']) => string;
  getStatusCor: (s: Meta['status']) => string;
  calcularProgresso: (meta: Meta) => number;
  onAtualizarFiltro: (campo: keyof MetasFiltros, valor: string) => void;
  onLimparFiltros: () => void;
  onAbrirDetalhe: (meta: Meta) => void;
  onAbrirModalEditar: (meta: Meta) => void;
  onConfirmarExclusao: (meta: Meta) => void;
}
