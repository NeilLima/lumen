import type { Caridade } from '../../main/types/CaridadeTypes';

export interface CaridadeConfirmProps {
  exclusaoPendente: Caridade | null;
  formatarValor: (v: number) => string;
  onCancelarExclusao: () => void;
  onConfirmarEExcluir: () => void;
}
