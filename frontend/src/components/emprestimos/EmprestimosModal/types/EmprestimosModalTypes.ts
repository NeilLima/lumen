import type { EmprestimosFormData } from '../../main/types/EmprestimosTypes';

export interface EmprestimosModalProps {
  modalAberto: boolean;
  editandoId: string | null;
  formData: EmprestimosFormData;
  onFecharModal: () => void;
  onAtualizarForm: (c: keyof EmprestimosFormData, v: string) => void;
  onSalvarEmprestimo: () => void;
}
