import type { DividasResumo } from '../../main/types/DividasTypes';
export interface DividasResumoProps { resumo: DividasResumo; formatarValor: (v: number) => string; }