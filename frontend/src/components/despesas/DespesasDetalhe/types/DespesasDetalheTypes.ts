import type { Despesa } from '../../main/types/DespesasTypes';

export interface DespesasDetalheProps {
  detalheDespesa: Despesa | null;
  formatarValor: (valor: number) => string;
  formatarData: (data: string) => string;
  getStatusCor: (status: Despesa['status']) => string;
  getStatusLabel: (status: Despesa['status']) => string;
  getPrioridadeCor: (prioridade: Despesa['prioridade']) => string;
  getPrioridadeLabel: (prioridade: Despesa['prioridade']) => string;
  onFecharDetalhe: () => void;
  onEditar: (despesa: Despesa) => void;
}