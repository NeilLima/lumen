import type { CategoriasResumo } from '../../main/types/CategoriasTypes';

export interface CategoriasResumoProps {
  resumo: CategoriasResumo;
  formatarValor: (v: number) => string;
}
