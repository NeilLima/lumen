'use client';

import type { DespesasModalProps } from '../types/DespesasModalTypes';
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
} from '../styles/DespesasModalStyles';

export default function DespesasModalComp({
  modalAberto,
  editandoId,
  formData,
  data,
  onFecharModal,
  onAtualizarForm,
  onSalvarDespesa,
}: DespesasModalProps) {
  return (
    <StyledModalOverlay $visible={modalAberto} onClick={onFecharModal}>
      <StyledModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>{editandoId ? 'Editar Despesa' : 'Nova Despesa'}</StyledModalTitle>
          <StyledModalClose onClick={onFecharModal}>✕</StyledModalClose>
        </StyledModalHeader>

        <StyledForm>
          <StyledFormGroup>
            <StyledLabel>Nome *</StyledLabel>
            <StyledInput
              type="text"
              placeholder="Ex: Aluguel, Supermercado..."
              value={formData.nome}
              onChange={e => onAtualizarForm('nome', e.target.value)}
            />
          </StyledFormGroup>

          <StyledFormRow>
            <StyledFormGroup>
              <StyledLabel>Categoria *</StyledLabel>
              <StyledFormSelect
                value={formData.categoria}
                onChange={e => onAtualizarForm('categoria', e.target.value)}
              >
                <option value="">Selecione...</option>
                {data.categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </StyledFormSelect>
            </StyledFormGroup>

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
          </StyledFormRow>

          <StyledFormRow>
            <StyledFormGroup>
              <StyledLabel>Conta *</StyledLabel>
              <StyledFormSelect
                value={formData.conta}
                onChange={e => onAtualizarForm('conta', e.target.value)}
              >
                <option value="">Selecione...</option>
                {data.contas.map(conta => (
                  <option key={conta} value={conta}>{conta}</option>
                ))}
              </StyledFormSelect>
            </StyledFormGroup>

            <StyledFormGroup>
              <StyledLabel>Cartão (opcional)</StyledLabel>
              <StyledInput
                type="text"
                placeholder="Ex: Nubank, Visa..."
                value={formData.cartao}
                onChange={e => onAtualizarForm('cartao', e.target.value)}
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
              <StyledLabel>Parcelas</StyledLabel>
              <StyledInput
                type="number"
                min="1"
                placeholder="1"
                value={formData.parcelas}
                onChange={e => onAtualizarForm('parcelas', e.target.value)}
              />
            </StyledFormGroup>
          </StyledFormRow>

          <StyledFormGroup>
            <StyledLabel>Prioridade</StyledLabel>
            <StyledFormSelect
              value={formData.prioridade}
              onChange={e => onAtualizarForm('prioridade', e.target.value)}
            >
              <option value="baixa">Baixa</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
            </StyledFormSelect>
          </StyledFormGroup>

          <StyledFormGroup>
            <StyledLabel>Observações</StyledLabel>
            <StyledTextarea
              placeholder="Adicione observações sobre esta despesa..."
              value={formData.observacoes}
              onChange={e => onAtualizarForm('observacoes', e.target.value)}
            />
          </StyledFormGroup>

          <StyledModalActions>
            <StyledButton $variant="secondary" onClick={onFecharModal}>
              Cancelar
            </StyledButton>
            <StyledButton $variant="primary" onClick={onSalvarDespesa}>
              {editandoId ? 'Salvar Alterações' : 'Cadastrar Despesa'}
            </StyledButton>
          </StyledModalActions>
        </StyledForm>
      </StyledModal>
    </StyledModalOverlay>
  );
}