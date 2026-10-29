import type { DespesasResumo } from '../../main/types/DespesasTypes';

export interface DespesasResumoProps {
  resumo: DespesasResumo;
  formatarValor: (valor: number) => string;
}