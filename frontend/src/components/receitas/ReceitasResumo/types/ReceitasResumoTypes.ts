import type { ReceitasResumo } from '../../main/types/ReceitasTypes';

export interface ReceitasResumoProps {
  resumo: ReceitasResumo;
  formatarValor: (valor: number) => string;
}