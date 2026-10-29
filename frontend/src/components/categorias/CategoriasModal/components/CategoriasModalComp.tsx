'use client';

import type { CategoriasModalProps } from '../types/CategoriasModalTypes';
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
} from '../styles/CategoriasModalStyles';

export default function CategoriasModalComp({
  modalAberto,
  editandoId,
  formData,
  onFecharModal,
  onAtualizarForm,
  onSalvarCategoria,
}: CategoriasModalProps) {
  return (
    <StyledModalOverlay $visible={modalAberto} onClick={onFecharModal}>
      <StyledModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>{editandoId ? 'Editar Categoria' : 'Nova Categoria'}</StyledModalTitle>
          <StyledModalClose onClick={onFecharModal}>✕</StyledModalClose>
        </StyledModalHeader>

        <StyledForm>

          <StyledFormRow>
            <StyledFormGroup>
              <StyledLabel>Nome *</StyledLabel>
              <StyledInput
                type="text"
                placeholder="Ex: Moradia, Alimentação..."
                
                
                
                
                value={formData.nome}
                onChange={e => onAtualizarForm('nome', e.target.value)}
              />
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledLabel>Ícone (Emoji) *</StyledLabel>
              <StyledInput
                type="text"
                placeholder="Ex: 🏠, 🛒..."
                
                
                
                
                value={formData.icone}
                onChange={e => onAtualizarForm('icone', e.target.value)}
              />
            </StyledFormGroup>
          </StyledFormRow>

          <StyledFormRow>
            <StyledFormGroup>
              <StyledLabel>Cor *</StyledLabel>
              <StyledInput
                type="text"
                placeholder="Ex: #8b5cf6"
                
                
                
                
                value={formData.cor}
                onChange={e => onAtualizarForm('cor', e.target.value)}
              />
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledLabel>Tipo</StyledLabel>
              <StyledFormSelect
                value={formData.tipo}
                onChange={e => onAtualizarForm('tipo', e.target.value)}
              >
              <option value="despesa">Despesa</option>
              <option value="receita">Receita</option>
              <option value="ambos">Ambos</option>
              </StyledFormSelect>
            </StyledFormGroup>
          </StyledFormRow>

          <StyledFormGroup>
            <StyledLabel>Descrição</StyledLabel>
            <StyledTextarea
              placeholder="Adicione uma descrição para esta categoria..."
              value={formData.descricao}
              onChange={e => onAtualizarForm('descricao', e.target.value)}
            />
          </StyledFormGroup>

          <StyledModalActions>
            <StyledButton $variant="secondary" onClick={onFecharModal}>
              Cancelar
            </StyledButton>
            <StyledButton $variant="primary" onClick={onSalvarCategoria}>
              {editandoId ? 'Salvar Alterações' : 'Cadastrar Categoria'}
            </StyledButton>
          </StyledModalActions>
        </StyledForm>
      </StyledModal>
    </StyledModalOverlay>
  );
}
