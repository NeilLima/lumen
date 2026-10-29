import type { NotificacoesResumo } from '../../main/types/NotificacoesTypes';

export interface NotificacoesResumoProps {
  resumo: NotificacoesResumo;
  formatarValor: (v: number) => string;
}
