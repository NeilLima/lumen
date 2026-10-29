import type { Relatorio } from '../../main/types/RelatoriosTypes';

export interface RelatoriosConfirmProps {
  exclusaoPendente: Relatorio | null;
  formatarValor: (v: number) => string;
  onCancelarExclusao: () => void;
  onConfirmarEExcluir: () => void;
}
