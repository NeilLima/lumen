import type { EstoqueFormData, EstoqueCompraItemOption } from '../../main/types/EstoqueTypes';

export interface EstoqueModalProps {
  modalAberto: boolean;
  editandoId: string | null;
  formData: EstoqueFormData;
  data: { categorias: string[]; locais: string[] };
  itensCompra: EstoqueCompraItemOption[];
  formatarValor: (valor: number) => string;
  onFecharModal: () => void;
  onAtualizarForm: (campo: keyof EstoqueFormData, valor: string) => void;
  onSalvarItem: () => void;
  onSelecionarCompraItem: (compraItemId: string) => void;
}
