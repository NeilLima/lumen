import type { NotificacoesFormData } from '../../main/types/NotificacoesTypes';

export interface NotificacoesModalProps {
  modalAberto: boolean;
  editandoId: string | null;
  formData: NotificacoesFormData;
  onFecharModal: () => void;
  onAtualizarForm: (c: keyof NotificacoesFormData, v: string) => void;
  onSalvarNotificacao: () => void;
}
