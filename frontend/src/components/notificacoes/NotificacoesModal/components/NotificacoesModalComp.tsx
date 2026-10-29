'use client';

import type { NotificacoesModalProps } from '../types/NotificacoesModalTypes';
import {
  StyledModalOverlay,
  StyledModal,
  StyledModalHeader,
  StyledModalTitle,
  StyledModalClose,
  StyledForm,
  StyledFormGroup,
  StyledFormRow,
  StyledLabel,
  StyledInput,
  StyledTextarea,
  StyledFormSelect,
  StyledModalActions,
  StyledButton,
} from '../styles/NotificacoesModalStyles';

export default function NotificacoesModalComp({
  modalAberto,
  editandoId,
  formData,
  onFecharModal,
  onAtualizarForm,
  onSalvarNotificacao,
}: NotificacoesModalProps) {
  return (
    <StyledModalOverlay $visible={modalAberto} onClick={onFecharModal}>
      <StyledModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>{editandoId ? 'Editar Notificacao' : 'Nova Notificacao'}</StyledModalTitle>
          <StyledModalClose onClick={onFecharModal}>✕</StyledModalClose>
        </StyledModalHeader>

        <StyledForm>

          <StyledFormRow>
            <StyledFormGroup>
              <StyledLabel>Título *</StyledLabel>
              <StyledInput
                type="text"
                placeholder="Ex: Pagamento próximo..."
                
                
                
                
                value={formData.titulo}
                onChange={e => onAtualizarForm('titulo', e.target.value)}
              />
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledLabel>Tipo</StyledLabel>
              <StyledFormSelect
                value={formData.tipo}
                onChange={e => onAtualizarForm('tipo', e.target.value)}
              >
              <option value="pagamento">Pagamento</option>
              <option value="conta">Conta</option>
              <option value="meta">Meta</option>
              <option value="cartao">Cartão</option>
              <option value="orcamento">Orçamento</option>
              </StyledFormSelect>
            </StyledFormGroup>
          </StyledFormRow>

          <StyledFormGroup>
            <StyledLabel>Mensagem *</StyledLabel>
            <StyledTextarea
              placeholder="Descreva a notificação..."
              value={formData.mensagem}
              onChange={e => onAtualizarForm('mensagem', e.target.value)}
            />
          </StyledFormGroup>

          <StyledFormRow>
            <StyledFormGroup>
              <StyledLabel>Data *</StyledLabel>
              <StyledInput
                type="date"
                
                
                
                
                
                value={formData.data}
                onChange={e => onAtualizarForm('data', e.target.value)}
              />
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledLabel>Status</StyledLabel>
              <StyledFormSelect
                value={formData.status}
                onChange={e => onAtualizarForm('status', e.target.value)}
              >
              <option value="nao_lida">Não Lida</option>
              <option value="lida">Lida</option>
              <option value="arquivada">Arquivada</option>
              </StyledFormSelect>
            </StyledFormGroup>
          </StyledFormRow>

          <StyledModalActions>
            <StyledButton $variant="secondary" onClick={onFecharModal}>
              Cancelar
            </StyledButton>
            <StyledButton $variant="primary" onClick={onSalvarNotificacao}>
              {editandoId ? 'Salvar Alterações' : 'Cadastrar Notificacao'}
            </StyledButton>
          </StyledModalActions>
        </StyledForm>
      </StyledModal>
    </StyledModalOverlay>
  );
}
