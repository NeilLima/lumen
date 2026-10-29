import type { Receita } from '../../main/types/ReceitasTypes';

export interface ReceitasDetalheProps {
  detalheReceita: Receita | null;
  formatarValor: (valor: number) => string;
  formatarData: (data: string) => string;
  getStatusCor: (status: Receita['status']) => string;
  getStatusLabel: (status: Receita['status']) => string;
  getRecorrenciaLabel: (recorrencia: Receita['recorrencia']) => string;
  onFecharDetalhe: () => void;
  onEditar: (receita: Receita) => void;
}