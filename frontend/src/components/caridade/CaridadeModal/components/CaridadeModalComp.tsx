'use client';

import type { CaridadeModalProps } from '../types/CaridadeModalTypes';
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
} from '../styles/CaridadeModalStyles';

export default function CaridadeModalComp({
  modalAberto,
  editandoId,
  formData,
  onFecharModal,
  onAtualizarForm,
  onSalvarCaridade,
}: CaridadeModalProps) {
  return (
    <StyledModalOverlay $visible={modalAberto} onClick={onFecharModal}>
      <StyledModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>{editandoId ? 'Editar Caridade' : 'Nova Caridade'}</StyledModalTitle>
          <StyledModalClose onClick={onFecharModal}>✕</StyledModalClose>
        </StyledModalHeader>

        <StyledForm>

          <StyledFormRow>
            <StyledFormGroup>
              <StyledLabel>Nome *</StyledLabel>
              <StyledInput
                type="text"
                placeholder="Ex: Doação para ONG..."
                
                
                
                
                value={formData.nome}
                onChange={e => onAtualizarForm('nome', e.target.value)}
              />
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledLabel>Tipo</StyledLabel>
              <StyledFormSelect
                value={formData.tipo}
                onChange={e => onAtualizarForm('tipo', e.target.value)}
              >
              <option value="unica">Única</option>
              <option value="recorrente">Recorrente</option>
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
              <StyledLabel>Instituição</StyledLabel>
              <StyledInput
                type="text"
                placeholder="Ex: ONG, Igreja..."
                
                
                
                
                value={formData.instituicao}
                onChange={e => onAtualizarForm('instituicao', e.target.value)}
              />
            </StyledFormGroup>
          </StyledFormRow>

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
              <option value="realizada">Realizada</option>
              <option value="pendente">Pendente</option>
              </StyledFormSelect>
            </StyledFormGroup>
          </StyledFormRow>

          <StyledFormGroup>
            <StyledLabel>Observações</StyledLabel>
            <StyledTextarea
              placeholder="Adicione observações sobre esta doação..."
              value={formData.observacoes}
              onChange={e => onAtualizarForm('observacoes', e.target.value)}
            />
          </StyledFormGroup>

          <StyledModalActions>
            <StyledButton $variant="secondary" onClick={onFecharModal}>
              Cancelar
            </StyledButton>
            <StyledButton $variant="primary" onClick={onSalvarCaridade}>
              {editandoId ? 'Salvar Alterações' : 'Cadastrar Caridade'}
            </StyledButton>
          </StyledModalActions>
        </StyledForm>
      </StyledModal>
    </StyledModalOverlay>
  );
}
