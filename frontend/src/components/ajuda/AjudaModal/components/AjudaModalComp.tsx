'use client';

import type { AjudaModalProps } from '../types/AjudaModalTypes';
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
} from '../styles/AjudaModalStyles';

export default function AjudaModalComp({
  modalAberto,
  editandoId,
  formData,
  onFecharModal,
  onAtualizarForm,
  onSalvarAjuda,
}: AjudaModalProps) {
  return (
    <StyledModalOverlay $visible={modalAberto} onClick={onFecharModal}>
      <StyledModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>{editandoId ? 'Editar Ajuda' : 'Nova Ajuda'}</StyledModalTitle>
          <StyledModalClose onClick={onFecharModal}>✕</StyledModalClose>
        </StyledModalHeader>

        <StyledForm>

          <StyledFormRow>
            <StyledFormGroup>
              <StyledLabel>Título *</StyledLabel>
              <StyledInput
                type="text"
                placeholder="Ex: Como criar uma despesa..."
                
                
                
                
                value={formData.titulo}
                onChange={e => onAtualizarForm('titulo', e.target.value)}
              />
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledLabel>Categoria</StyledLabel>
              <StyledFormSelect
                value={formData.categoria}
                onChange={e => onAtualizarForm('categoria', e.target.value)}
              >
              <option value="inicio">Primeiros Passos</option>
              <option value="despesas">Despesas</option>
              <option value="receitas">Receitas</option>
              <option value="cartoes">Cartões</option>
              <option value="contas">Contas</option>
              <option value="investimentos">Investimentos</option>
              <option value="outros">Outros</option>
              </StyledFormSelect>
            </StyledFormGroup>
          </StyledFormRow>

          <StyledFormGroup>
            <StyledLabel>Conteúdo *</StyledLabel>
            <StyledTextarea
              placeholder="Descreva a solução..."
              value={formData.conteudo}
              onChange={e => onAtualizarForm('conteudo', e.target.value)}
            />
          </StyledFormGroup>

          <StyledFormGroup>
            <StyledLabel>Status</StyledLabel>
            <StyledFormSelect
              value={formData.status}
              onChange={e => onAtualizarForm('status', e.target.value)}
            >
              <option value="publicado">Publicado</option>
              <option value="rascunho">Rascunho</option>
            </StyledFormSelect>
          </StyledFormGroup>

          <StyledModalActions>
            <StyledButton $variant="secondary" onClick={onFecharModal}>
              Cancelar
            </StyledButton>
            <StyledButton $variant="primary" onClick={onSalvarAjuda}>
              {editandoId ? 'Salvar Alterações' : 'Cadastrar Ajuda'}
            </StyledButton>
          </StyledModalActions>
        </StyledForm>
      </StyledModal>
    </StyledModalOverlay>
  );
}
