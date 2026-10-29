import type { Meta } from '../../main/types/MetasTypes';
export interface MetasDetalheProps {
  detalheMeta: Meta | null; formatarValor: (valor: number) => string; formatarData: (data: string) => string;
  getPrioridadeLabel: (p: Meta['prioridade']) => string; getPrioridadeCor: (p: Meta['prioridade']) => string;
  getStatusLabel: (s: Meta['status']) => string; getStatusCor: (s: Meta['status']) => string;
  calcularProgresso: (meta: Meta) => number;
  onFecharDetalhe: () => void; onEditar: (meta: Meta) => void;
}
