import type { CategoriasFormData } from '../../main/types/CategoriasTypes';

export interface CategoriasModalProps {
  modalAberto: boolean;
  editandoId: string | null;
  formData: CategoriasFormData;
  onFecharModal: () => void;
  onAtualizarForm: (c: keyof CategoriasFormData, v: string) => void;
  onSalvarCategoria: () => void;
}
