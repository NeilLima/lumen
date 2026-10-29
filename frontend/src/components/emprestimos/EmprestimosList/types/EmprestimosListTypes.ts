import type { Emprestimo, EmprestimosFiltros } from '../../main/types/EmprestimosTypes';

export interface EmprestimosListProps {
  emprestimosFiltradas: Emprestimo[];
  filtros: EmprestimosFiltros;
  formatarValor: (v: number) => string;
  formatarData: (d: string) => string;
  getStatusLabel: (s: string) => string;
  getStatusCor: (s: string) => string;
  calcularProgresso: (pg: number, pt: number) => number;
  onAtualizarFiltro: (c: keyof EmprestimosFiltros, v: string) => void;
  onLimparFiltros: () => void;
  onAbrirDetalhe: (d: Emprestimo) => void;
  onAbrirModalEditar: (d: Emprestimo) => void;
  onConfirmarExclusao: (d: Emprestimo) => void;
}
