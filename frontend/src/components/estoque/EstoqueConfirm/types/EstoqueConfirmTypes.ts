import type { EstoqueItem } from '../../main/types/EstoqueTypes';

export interface EstoqueConfirmProps {
  exclusaoPendente: EstoqueItem | null;
  formatarValor: (valor: number) => string;
  onCancelar: () => void;
  onConfirmar: () => void;
}