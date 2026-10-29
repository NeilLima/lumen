import type { Notificacao } from '../../main/types/NotificacoesTypes';

export interface NotificacoesConfirmProps {
  exclusaoPendente: Notificacao | null;
  formatarValor: (v: number) => string;
  onCancelarExclusao: () => void;
  onConfirmarEExcluir: () => void;
}
