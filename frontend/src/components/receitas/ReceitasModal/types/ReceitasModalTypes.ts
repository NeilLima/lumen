import type { ReceitasFormData, ReceitasData } from '../../main/types/ReceitasTypes';

export interface ReceitasModalProps {
  modalAberto: boolean;
  editandoId: string | null;
  formData: ReceitasFormData;
  data: ReceitasData;
  isSaving?: boolean;
  onFecharModal: () => void;
  onAtualizarForm: (campo: keyof ReceitasFormData, valor: string) => void;
  onSalvarReceita: () => void | Promise<void>;
}