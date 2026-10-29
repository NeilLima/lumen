'use client';

import type { DividasModalProps } from '../types/DividasModalTypes';
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
} from '../styles/DividasModalStyles';

export default function DividasModalComp({
  modalAberto,
  editandoId,
  formData,
  onFecharModal,
  onAtualizarForm,
  onSalvarDivida,
}: DividasModalProps) {
  return (
    <StyledModalOverlay $visible={modalAberto} onClick={onFecharModal}>
      <StyledModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>{editandoId ? 'Editar Dívida' : 'Nova Dívida'}</StyledModalTitle>
          <StyledModalClose onClick={onFecharModal}>✕</StyledModalClose>
        </StyledModalHeader>

        <StyledForm>
          <StyledFormGroup>
            <StyledLabel>Nome *</StyledLabel>
            <StyledInput
              type="text"
              placeholder="Ex: Empréstimo, Financiamento..."
              value={formData.nome}
              onChange={e => onAtualizarForm('nome', e.target.value)}
            />
          </StyledFormGroup>

          <StyledFormRow>
            <StyledFormGroup>
              <StyledLabel>Tipo</StyledLabel>
              <StyledFormSelect
                value={formData.tipo}
                onChange={e => onAtualizarForm('tipo', e.target.value)}
              >
                <option value="banco">Banco</option>
                <option value="pessoa">Pessoa</option>
                <option value="empresa">Empresa</option>
              </StyledFormSelect>
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

          <StyledFormRow>
            <StyledFormGroup>
              <StyledLabel>Valor *</StyledLabel>
              <StyledInput
                type="number"
                step="0.01"
                placeholder="0,00"
                value={formData.valor}
                onChange={e => onAtualizarForm('valor', e.target.value)}
              />
            </StyledFormGroup>

            <StyledFormGroup>
              <StyledLabel>Juros (%)</StyledLabel>
              <StyledInput
                type="number"
                step="0.1"
                placeholder="0"
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
                min="1"
                placeholder="1"
                value={formData.parcelas}
                onChange={e => onAtualizarForm('parcelas', e.target.value)}
              />
            </StyledFormGroup>

            <StyledFormGroup>
              <StyledLabel>Parcelas Pagas</StyledLabel>
              <StyledInput
                type="number"
                min="0"
                placeholder="0"
                value={formData.parcelasPagas}
                onChange={e => onAtualizarForm('parcelasPagas', e.target.value)}
              />
            </StyledFormGroup>
          </StyledFormRow>

          <StyledFormGroup>
            <StyledLabel>Data de Vencimento *</StyledLabel>
            <StyledInput
              type="date"
              value={formData.dataVencimento}
              onChange={e => onAtualizarForm('dataVencimento', e.target.value)}
            />
          </StyledFormGroup>

          <StyledFormGroup>
            <StyledLabel>Observações</StyledLabel>
            <StyledTextarea
              placeholder="Adicione observações sobre esta dívida..."
              value={formData.observacoes}
              onChange={e => onAtualizarForm('observacoes', e.target.value)}
            />
          </StyledFormGroup>

          <StyledModalActions>
            <StyledButton $variant="secondary" onClick={onFecharModal}>
              Cancelar
            </StyledButton>
            <StyledButton $variant="primary" onClick={onSalvarDivida}>
              {editandoId ? 'Salvar Alterações' : 'Cadastrar Dívida'}
            </StyledButton>
          </StyledModalActions>
        </StyledForm>
      </StyledModal>
    </StyledModalOverlay>
  );
}