import type { ConfiguracoesFormData } from '../../main/types/ConfiguracoesTypes';

export interface ConfiguracoesModalProps {
  modalAberto: boolean;
  editandoId: string | null;
  formData: ConfiguracoesFormData;
  onFecharModal: () => void;
  onAtualizarForm: (c: keyof ConfiguracoesFormData, v: string) => void;
  onSalvarConfiguracao: () => void;
}
