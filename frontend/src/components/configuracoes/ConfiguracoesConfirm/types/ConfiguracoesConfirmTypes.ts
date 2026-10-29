import type { Configuracao } from '../../main/types/ConfiguracoesTypes';

export interface ConfiguracoesConfirmProps {
  exclusaoPendente: Configuracao | null;
  formatarValor: (v: number) => string;
  onCancelarExclusao: () => void;
  onConfirmarEExcluir: () => void;
}
