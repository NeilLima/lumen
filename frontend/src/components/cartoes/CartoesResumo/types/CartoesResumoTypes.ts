import type { CartoesResumo } from '../../main/types/CartoesTypes';

export interface CartoesResumoProps {
  resumo: CartoesResumo;
  formatarValor: (valor: number) => string;
}