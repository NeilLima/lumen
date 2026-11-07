import type { Compra } from '../../main/types/ComprasTypes';

export interface ComprasConfirmProps {
  exclusaoPendente: Compra | null;
  formatarValor: (valor: number) => string;
  onCancelarExclusao: () => void;
  onConfirmarEExcluir: () => void;
}
