import type { AssinaturasResumo } from '../../main/types/AssinaturasTypes';

export interface AssinaturasResumoProps {
  resumo: AssinaturasResumo;
  formatarValor: (v: number) => string;
}
