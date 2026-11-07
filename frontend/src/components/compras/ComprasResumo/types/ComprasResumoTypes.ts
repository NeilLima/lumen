import type { CompraResumo } from '../../main/types/ComprasTypes';

export interface ComprasResumoProps {
  resumo: CompraResumo;
  formatarValor: (valor: number) => string;
}

