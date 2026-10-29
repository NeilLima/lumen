'use client';

import type { RelatoriosModalProps } from '../types/RelatoriosModalTypes';
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
} from '../styles/RelatoriosModalStyles';

export default function RelatoriosModalComp({
  modalAberto,
  editandoId,
  formData,
  onFecharModal,
  onAtualizarForm,
  onSalvarRelatorio,
}: RelatoriosModalProps) {
  return (
    <StyledModalOverlay $visible={modalAberto} onClick={onFecharModal}>
      <StyledModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>{editandoId ? 'Editar Relatorio' : 'Nova Relatorio'}</StyledModalTitle>
          <StyledModalClose onClick={onFecharModal}>✕</StyledModalClose>
        </StyledModalHeader>

        <StyledForm>

          <StyledFormRow>
            <StyledFormGroup>
              <StyledLabel>Nome *</StyledLabel>
              <StyledInput
                type="text"
                placeholder="Ex: Relatório Mensal..."
                
                
                
                
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
              <option value="receitas">Receitas</option>
              <option value="despesas">Despesas</option>
              <option value="fluxo">Fluxo de Caixa</option>
              <option value="patrimonio">Patrimônio</option>
              <option value="cartoes">Cartões</option>
              <option value="investimentos">Investimentos</option>
              <option value="categorias">Categorias</option>
              </StyledFormSelect>
            </StyledFormGroup>
          </StyledFormRow>

          <StyledFormRow>
            <StyledFormGroup>
              <StyledLabel>Período</StyledLabel>
              <StyledFormSelect
                value={formData.periodo}
                onChange={e => onAtualizarForm('periodo', e.target.value)}
              >
              <option value="mensal">Mensal</option>
              <option value="anual">Anual</option>
              </StyledFormSelect>
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledLabel>Data Início *</StyledLabel>
              <StyledInput
                type="date"
                
                
                
                
                
                value={formData.dataInicio}
                onChange={e => onAtualizarForm('dataInicio', e.target.value)}
              />
            </StyledFormGroup>
          </StyledFormRow>

          <StyledFormGroup>
            <StyledLabel>Data Fim *</StyledLabel>
            <StyledInput
              type="date"
              value={formData.dataFim}
              onChange={e => onAtualizarForm('dataFim', e.target.value)}
            />
          </StyledFormGroup>

          <StyledFormGroup>
            <StyledLabel>Observações</StyledLabel>
            <StyledTextarea
              placeholder="Adicione observações sobre este relatório..."
              value={formData.observacoes}
              onChange={e => onAtualizarForm('observacoes', e.target.value)}
            />
          </StyledFormGroup>

          <StyledModalActions>
            <StyledButton $variant="secondary" onClick={onFecharModal}>
              Cancelar
            </StyledButton>
            <StyledButton $variant="primary" onClick={onSalvarRelatorio}>
              {editandoId ? 'Salvar Alterações' : 'Cadastrar Relatorio'}
            </StyledButton>
          </StyledModalActions>
        </StyledForm>
      </StyledModal>
    </StyledModalOverlay>
  );
}
