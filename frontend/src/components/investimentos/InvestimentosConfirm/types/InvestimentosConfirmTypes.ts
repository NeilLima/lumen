import type { Investimento } from '../../main/types/InvestimentosTypes';

export interface InvestimentosConfirmProps {
  exclusaoPendente: Investimento | null;
  formatarValor: (v: number) => string;
  onCancelarExclusao: () => void;
  onConfirmarEExcluir: () => void;
}
