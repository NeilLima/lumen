import type { AjudaResumo } from '../../main/types/AjudaTypes';

export interface AjudaResumoProps {
  resumo: AjudaResumo;
  formatarValor: (v: number) => string;
}
