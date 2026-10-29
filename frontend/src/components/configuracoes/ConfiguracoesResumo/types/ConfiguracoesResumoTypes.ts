import type { ConfiguracoesResumo } from '../../main/types/ConfiguracoesTypes';

export interface ConfiguracoesResumoProps {
  resumo: ConfiguracoesResumo;
  formatarValor: (v: number) => string;
}
