import type { Notificacao } from '../../main/types/NotificacoesTypes';

export interface NotificacoesDetalheProps {
  detalheNotificacao: Notificacao | null;
  formatarValor: (v: number) => string;
  formatarData: (d: string) => string;
  getStatusLabel: (s: string) => string;
  getStatusCor: (s: string) => string;
  onFecharDetalhe: () => void;
  onEditar: (d: Notificacao) => void;
}
