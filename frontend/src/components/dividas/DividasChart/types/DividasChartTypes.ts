import type { Divida } from '../../main/types/DividasTypes';
export interface DividasChartProps { dividas: Divida[]; formatarValor: (v: number) => string; }