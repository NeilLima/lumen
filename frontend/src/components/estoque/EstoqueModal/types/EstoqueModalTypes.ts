import type { EstoqueFormData } from '../../main/types/EstoqueTypes';

export interface EstoqueModalProps {
  modalAberto: boolean;
  editandoId: string | null;
  formData: EstoqueFormData;
  data: { categorias: string[]; locais: string[] };
  formatarValor: (valor: number) => string;
  onFecharModal: () => void;
  onAtualizarForm: (campo: keyof EstoqueFormData, valor: string) => void;
  onSalvarItem: () => void;
}