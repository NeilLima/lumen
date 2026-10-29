import type { Cartao } from '../../main/types/CartoesTypes';

export interface CartoesDetalheProps {
  detalheCartao: Cartao | null;
  formatarValor: (valor: number) => string;
  getBandeiraLabel: (bandeira: Cartao['bandeira']) => string;
  getBandeiraCor: (bandeira: Cartao['bandeira']) => string;
  getStatusLabel: (status: Cartao['status']) => string;
  getStatusCor: (status: Cartao['status']) => string;
  formatarLimite: (valor: number) => string;
  onFecharDetalhe: () => void;
  onEditar: (cartao: Cartao) => void;
}