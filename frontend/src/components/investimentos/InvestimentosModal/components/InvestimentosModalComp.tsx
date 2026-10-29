'use client';

import type { InvestimentosModalProps } from '../types/InvestimentosModalTypes';
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
} from '../styles/InvestimentosModalStyles';

export default function InvestimentosModalComp({
  modalAberto,
  editandoId,
  formData,
  onFecharModal,
  onAtualizarForm,
  onSalvarInvestimento,
}: InvestimentosModalProps) {
  return (
    <StyledModalOverlay $visible={modalAberto} onClick={onFecharModal}>
      <StyledModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>{editandoId ? 'Editar Investimento' : 'Nova Investimento'}</StyledModalTitle>
          <StyledModalClose onClick={onFecharModal}>✕</StyledModalClose>
        </StyledModalHeader>

        <StyledForm>

          <StyledFormRow>
            <StyledFormGroup>
              <StyledLabel>Nome *</StyledLabel>
              <StyledInput
                type="text"
                placeholder="Ex: Tesouro Direto, CDB..."
                
                
                
                
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
              <option value="cdb">CDB</option>
              <option value="tesouro">Tesouro</option>
              <option value="acoes">Ações</option>
              <option value="fundos">Fundos</option>
              <option value="cripto">Criptomoedas</option>
              </StyledFormSelect>
            </StyledFormGroup>
          </StyledFormRow>

          <StyledFormRow>
            <StyledFormGroup>
              <StyledLabel>Valor Aplicado *</StyledLabel>
              <StyledInput
                type="number"
                placeholder="0,00"
                step="0.01"
                
                
                
                value={formData.valorAplicado}
                onChange={e => onAtualizarForm('valorAplicado', e.target.value)}
              />
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledLabel>Valor Atual *</StyledLabel>
              <StyledInput
                type="number"
                placeholder="0,00"
                step="0.01"
                
                
                
                value={formData.valorAtual}
                onChange={e => onAtualizarForm('valorAtual', e.target.value)}
              />
            </StyledFormGroup>
          </StyledFormRow>

          <StyledFormRow>
            <StyledFormGroup>
              <StyledLabel>Data de Aplicação *</StyledLabel>
              <StyledInput
                type="date"
                
                
                
                
                
                value={formData.dataAplicacao}
                onChange={e => onAtualizarForm('dataAplicacao', e.target.value)}
              />
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledLabel>Status</StyledLabel>
              <StyledFormSelect
                value={formData.status}
                onChange={e => onAtualizarForm('status', e.target.value)}
              >
              <option value="ativo">Ativo</option>
              <option value="resgatado">Resgatado</option>
              <option value="perda">Perda</option>
              </StyledFormSelect>
            </StyledFormGroup>
          </StyledFormRow>

          <StyledFormGroup>
            <StyledLabel>Observações</StyledLabel>
            <StyledTextarea
              placeholder="Adicione observações sobre este investimento..."
              value={formData.observacoes}
              onChange={e => onAtualizarForm('observacoes', e.target.value)}
            />
          </StyledFormGroup>

          <StyledModalActions>
            <StyledButton $variant="secondary" onClick={onFecharModal}>
              Cancelar
            </StyledButton>
            <StyledButton $variant="primary" onClick={onSalvarInvestimento}>
              {editandoId ? 'Salvar Alterações' : 'Cadastrar Investimento'}
            </StyledButton>
          </StyledModalActions>
        </StyledForm>
      </StyledModal>
    </StyledModalOverlay>
  );
}
