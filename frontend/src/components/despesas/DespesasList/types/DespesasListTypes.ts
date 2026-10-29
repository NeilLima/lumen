import type { Despesa, DespesasFiltros, DespesasData } from '../../main/types/DespesasTypes';

export interface DespesasListProps {
  despesasFiltradas: Despesa[];
  filtros: DespesasFiltros;
  data: DespesasData;
  formatarValor: (valor: number) => string;
  formatarData: (data: string) => string;
  getStatusCor: (status: Despesa['status']) => string;
  getStatusLabel: (status: Despesa['status']) => string;
  getPrioridadeCor: (prioridade: Despesa['prioridade']) => string;
  getPrioridadeLabel: (prioridade: Despesa['prioridade']) => string;
  onAtualizarFiltro: (campo: keyof DespesasFiltros, valor: string) => void;
  onLimparFiltros: () => void;
  onAbrirDetalhe: (despesa: Despesa) => void;
  onAbrirModalEditar: (despesa: Despesa) => void;
  onConfirmarExclusao: (despesa: Despesa) => void;
}