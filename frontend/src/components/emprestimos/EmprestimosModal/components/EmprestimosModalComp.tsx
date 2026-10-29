'use client';

import type { EmprestimosModalProps } from '../types/EmprestimosModalTypes';
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
} from '../styles/EmprestimosModalStyles';

export default function EmprestimosModalComp({
  modalAberto,
  editandoId,
  formData,
  onFecharModal,
  onAtualizarForm,
  onSalvarEmprestimo,
}: EmprestimosModalProps) {
  return (
    <StyledModalOverlay $visible={modalAberto} onClick={onFecharModal}>
      <StyledModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>{editandoId ? 'Editar Emprestimo' : 'Nova Emprestimo'}</StyledModalTitle>
          <StyledModalClose onClick={onFecharModal}>✕</StyledModalClose>
        </StyledModalHeader>

        <StyledForm>

          <StyledFormRow>
            <StyledFormGroup>
              <StyledLabel>Nome *</StyledLabel>
              <StyledInput
                type="text"
                placeholder="Ex: Empréstimo Banco X..."
                
                
                
                
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
              <option value="feito">Feito por mim</option>
              <option value="recebido">Recebido por mim</option>
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
              <StyledLabel>Juros (%)</StyledLabel>
              <StyledInput
                type="number"
                placeholder="0"
                
                step="0.1"
                
                
                value={formData.juros}
                onChange={e => onAtualizarForm('juros', e.target.value)}
              />
            </StyledFormGroup>
          </StyledFormRow>

          <StyledFormRow>
            <StyledFormGroup>
              <StyledLabel>Parcelas</StyledLabel>
              <StyledInput
                type="number"
                placeholder="1"
                
                
                min="1"
                
                value={formData.parcelas}
                onChange={e => onAtualizarForm('parcelas', e.target.value)}
              />
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledLabel>Parcelas Pagas</StyledLabel>
              <StyledInput
                type="number"
                placeholder="0"
                
                
                
                min="0"
                value={formData.parcelasPagas}
                onChange={e => onAtualizarForm('parcelasPagas', e.target.value)}
              />
            </StyledFormGroup>
          </StyledFormRow>

          <StyledFormRow>
            <StyledFormGroup>
              <StyledLabel>Data de Vencimento *</StyledLabel>
              <StyledInput
                type="date"
                
                
                
                
                
                value={formData.dataVencimento}
                onChange={e => onAtualizarForm('dataVencimento', e.target.value)}
              />
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledLabel>Situação</StyledLabel>
              <StyledFormSelect
                value={formData.situacao}
                onChange={e => onAtualizarForm('situacao', e.target.value)}
              >
              <option value="em_dia">Em Dia</option>
              <option value="atrasada">Atrasada</option>
              <option value="quitada">Quitada</option>
              </StyledFormSelect>
            </StyledFormGroup>
          </StyledFormRow>

          <StyledFormGroup>
            <StyledLabel>Observações</StyledLabel>
            <StyledTextarea
              placeholder="Adicione observações sobre este empréstimo..."
              value={formData.observacoes}
              onChange={e => onAtualizarForm('observacoes', e.target.value)}
            />
          </StyledFormGroup>

          <StyledModalActions>
            <StyledButton $variant="secondary" onClick={onFecharModal}>
              Cancelar
            </StyledButton>
            <StyledButton $variant="primary" onClick={onSalvarEmprestimo}>
              {editandoId ? 'Salvar Alterações' : 'Cadastrar Emprestimo'}
            </StyledButton>
          </StyledModalActions>
        </StyledForm>
      </StyledModal>
    </StyledModalOverlay>
  );
}
