'use client';

import type { AssinaturasModalProps } from '../types/AssinaturasModalTypes';
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
} from '../styles/AssinaturasModalStyles';

export default function AssinaturasModalComp({
  modalAberto,
  editandoId,
  formData,
  onFecharModal,
  onAtualizarForm,
  onSalvarAssinatura,
}: AssinaturasModalProps) {
  return (
    <StyledModalOverlay $visible={modalAberto} onClick={onFecharModal}>
      <StyledModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>{editandoId ? 'Editar Assinatura' : 'Nova Assinatura'}</StyledModalTitle>
          <StyledModalClose onClick={onFecharModal}>✕</StyledModalClose>
        </StyledModalHeader>

        <StyledForm>

          <StyledFormRow>
            <StyledFormGroup>
              <StyledLabel>Nome *</StyledLabel>
              <StyledInput
                type="text"
                placeholder="Ex: Netflix, Spotify..."
                
                
                
                
                value={formData.nome}
                onChange={e => onAtualizarForm('nome', e.target.value)}
              />
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledLabel>Categoria</StyledLabel>
              <StyledFormSelect
                value={formData.categoria}
                onChange={e => onAtualizarForm('categoria', e.target.value)}
              >
              <option value="Streaming">Streaming</option>
              <option value="Música">Música</option>
              <option value="Produtividade">Produtividade</option>
              <option value="Saúde">Saúde</option>
              <option value="Internet">Internet</option>
              <option value="Telefone">Telefone</option>
              <option value="Outros">Outros</option>
              </StyledFormSelect>
            </StyledFormGroup>
          </StyledFormRow>

          <StyledFormRow>
            <StyledFormGroup>
              <StyledLabel>Valor *</StyledLabel>
              <StyledInput
                type="number"
                placeholder="0,00"
                step="0.01"
                
                
                
                value={formData.valor}
                onChange={e => onAtualizarForm('valor', e.target.value)}
              />
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledLabel>Ciclo de Cobrança</StyledLabel>
              <StyledFormSelect
                value={formData.ciclo}
                onChange={e => onAtualizarForm('ciclo', e.target.value)}
              >
              <option value="mensal">Mensal</option>
              <option value="anual">Anual</option>
              <option value="trimestral">Trimestral</option>
              </StyledFormSelect>
            </StyledFormGroup>
          </StyledFormRow>

          <StyledFormRow>
            <StyledFormGroup>
              <StyledLabel>Próxima Cobrança *</StyledLabel>
              <StyledInput
                type="date"
                
                
                
                
                
                value={formData.proximaCobranca}
                onChange={e => onAtualizarForm('proximaCobranca', e.target.value)}
              />
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledLabel>Status</StyledLabel>
              <StyledFormSelect
                value={formData.status}
                onChange={e => onAtualizarForm('status', e.target.value)}
              >
              <option value="ativa">Ativa</option>
              <option value="pausada">Pausada</option>
              <option value="cancelada">Cancelada</option>
              </StyledFormSelect>
            </StyledFormGroup>
          </StyledFormRow>

          <StyledFormGroup>
            <StyledLabel>Observações</StyledLabel>
            <StyledTextarea
              placeholder="Adicione observações sobre esta assinatura..."
              value={formData.observacoes}
              onChange={e => onAtualizarForm('observacoes', e.target.value)}
            />
          </StyledFormGroup>

          <StyledModalActions>
            <StyledButton $variant="secondary" onClick={onFecharModal}>
              Cancelar
            </StyledButton>
            <StyledButton $variant="primary" onClick={onSalvarAssinatura}>
              {editandoId ? 'Salvar Alterações' : 'Cadastrar Assinatura'}
            </StyledButton>
          </StyledModalActions>
        </StyledForm>
      </StyledModal>
    </StyledModalOverlay>
  );
}
