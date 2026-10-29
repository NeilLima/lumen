import type { Cartao, CartoesFiltros, CartoesData } from '../../main/types/CartoesTypes';

export interface CartoesListProps {
  cartoesFiltrados: Cartao[];
  filtros: CartoesFiltros;
  data: CartoesData;
  formatarValor: (valor: number) => string;
  getBandeiraLabel: (bandeira: Cartao['bandeira']) => string;
  getBandeiraCor: (bandeira: Cartao['bandeira']) => string;
  getStatusLabel: (status: Cartao['status']) => string;
  getStatusCor: (status: Cartao['status']) => string;
  formatarLimite: (valor: number) => string;
  onAtualizarFiltro: (campo: keyof CartoesFiltros, valor: string) => void;
  onLimparFiltros: () => void;
  onAbrirDetalhe: (cartao: Cartao) => void;
  onAbrirModalEditar: (cartao: Cartao) => void;
  onConfirmarExclusao: (cartao: Cartao) => void;
}