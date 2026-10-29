import type { OrcamentoCategoria } from '../../main/types/OrcamentoTypes';

export interface OrcamentoChartProps {
  categorias: OrcamentoCategoria[];
  formatarValor: (v: number) => string;
}