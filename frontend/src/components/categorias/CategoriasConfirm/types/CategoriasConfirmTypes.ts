import type { Categoria } from '../../main/types/CategoriasTypes';

export interface CategoriasConfirmProps {
  exclusaoPendente: Categoria | null;
  formatarValor: (v: number) => string;
  onCancelarExclusao: () => void;
  onConfirmarEExcluir: () => void;
}
