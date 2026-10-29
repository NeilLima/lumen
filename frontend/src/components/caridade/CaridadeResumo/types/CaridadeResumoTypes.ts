import type { CaridadeResumo } from '../../main/types/CaridadeTypes';

export interface CaridadeResumoProps {
  resumo: CaridadeResumo;
  formatarValor: (v: number) => string;
}
