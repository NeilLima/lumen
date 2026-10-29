import type { RelatoriosResumo } from '../../main/types/RelatoriosTypes';

export interface RelatoriosResumoProps {
  resumo: RelatoriosResumo;
  formatarValor: (v: number) => string;
}
