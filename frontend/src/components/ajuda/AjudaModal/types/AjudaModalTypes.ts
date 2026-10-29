import type { AjudaFormData } from '../../main/types/AjudaTypes';

export interface AjudaModalProps {
  modalAberto: boolean;
  editandoId: string | null;
  formData: AjudaFormData;
  onFecharModal: () => void;
  onAtualizarForm: (c: keyof AjudaFormData, v: string) => void;
  onSalvarAjuda: () => void;
}
