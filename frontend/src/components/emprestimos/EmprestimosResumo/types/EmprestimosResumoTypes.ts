import type { EmprestimosResumo } from '../../main/types/EmprestimosTypes';

export interface EmprestimosResumoProps {
  resumo: EmprestimosResumo;
  formatarValor: (v: number) => string;
}
