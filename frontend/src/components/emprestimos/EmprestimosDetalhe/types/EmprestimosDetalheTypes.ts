import type { Emprestimo } from '../../main/types/EmprestimosTypes';

export interface EmprestimosDetalheProps {
  detalheEmprestimo: Emprestimo | null;
  formatarValor: (v: number) => string;
  formatarData: (d: string) => string;
  getStatusLabel: (s: string) => string;
  getStatusCor: (s: string) => string;
  calcularProgresso: (pg: number, pt: number) => number;
  onFecharDetalhe: () => void;
  onEditar: (d: Emprestimo) => void;
}
