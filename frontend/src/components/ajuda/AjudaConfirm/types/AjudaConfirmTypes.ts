import type { Ajuda } from '../../main/types/AjudaTypes';

export interface AjudaConfirmProps {
  exclusaoPendente: Ajuda | null;
  formatarValor: (v: number) => string;
  onCancelarExclusao: () => void;
  onConfirmarEExcluir: () => void;
}
