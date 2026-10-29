import type { InvestimentosResumo } from '../../main/types/InvestimentosTypes';

export interface InvestimentosResumoProps {
  resumo: InvestimentosResumo;
  formatarValor: (v: number) => string;
}
