import type { DespesasFormData, DespesasData } from '../../main/types/DespesasTypes';

export interface DespesasModalProps {
  modalAberto: boolean;
  editandoId: string | null;
  formData: DespesasFormData;
  data: DespesasData;
  onFecharModal: () => void;
  onAtualizarForm: (campo: keyof DespesasFormData, valor: string) => void;
  onSalvarDespesa: () => void;
}