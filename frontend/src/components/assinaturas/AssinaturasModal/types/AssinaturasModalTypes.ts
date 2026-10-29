import type { AssinaturasFormData } from '../../main/types/AssinaturasTypes';

export interface AssinaturasModalProps {
  modalAberto: boolean;
  editandoId: string | null;
  formData: AssinaturasFormData;
  onFecharModal: () => void;
  onAtualizarForm: (c: keyof AssinaturasFormData, v: string) => void;
  onSalvarAssinatura: () => void;
}
