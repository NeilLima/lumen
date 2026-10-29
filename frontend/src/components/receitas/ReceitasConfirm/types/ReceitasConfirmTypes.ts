import type { Receita } from '../../main/types/ReceitasTypes';

export interface ReceitasConfirmProps {
  exclusaoPendente: Receita | null;
  formatarValor: (valor: number) => string;
  onCancelarExclusao: () => void;
  onConfirmarEExcluir: () => void | Promise<void>;
}