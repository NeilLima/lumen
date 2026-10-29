import type { Investimento } from '../../main/types/InvestimentosTypes';

export interface InvestimentosDetalheProps {
  detalheInvestimento: Investimento | null;
  formatarValor: (v: number) => string;
  formatarData: (d: string) => string;
  getStatusLabel: (s: string) => string;
  getStatusCor: (s: string) => string;
  onFecharDetalhe: () => void;
  onEditar: (d: Investimento) => void;
}
