import type { Assinatura } from '../../main/types/AssinaturasTypes';

export interface AssinaturasConfirmProps {
  exclusaoPendente: Assinatura | null;
  formatarValor: (v: number) => string;
  onCancelarExclusao: () => void;
  onConfirmarEExcluir: () => void;
}
