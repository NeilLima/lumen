import type { Notificacao, NotificacoesFiltros } from '../../main/types/NotificacoesTypes';

export interface NotificacoesListProps {
  notificacoesFiltradas: Notificacao[];
  filtros: NotificacoesFiltros;
  formatarValor: (v: number) => string;
  formatarData: (d: string) => string;
  getStatusLabel: (s: string) => string;
  getStatusCor: (s: string) => string;
  onAtualizarFiltro: (c: keyof NotificacoesFiltros, v: string) => void;
  onLimparFiltros: () => void;
  onAbrirDetalhe: (d: Notificacao) => void;
  onAbrirModalEditar: (d: Notificacao) => void;
  onConfirmarExclusao: (d: Notificacao) => void;
}
