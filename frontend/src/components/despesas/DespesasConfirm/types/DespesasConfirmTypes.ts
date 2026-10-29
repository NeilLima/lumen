import type { Despesa } from '../../main/types/DespesasTypes';

export interface DespesasConfirmProps {
  exclusaoPendente: Despesa | null;
  formatarValor: (valor: number) => string;
  onCancelarExclusao: () => void;
  onConfirmarEExcluir: () => void;
}