import type { Emprestimo } from '../../main/types/EmprestimosTypes';

export interface EmprestimosConfirmProps {
  exclusaoPendente: Emprestimo | null;
  formatarValor: (v: number) => string;
  onCancelarExclusao: () => void;
  onConfirmarEExcluir: () => void;
}
