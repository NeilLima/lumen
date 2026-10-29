'use client';

import type { ReceitasModalProps } from '../types/ReceitasModalTypes';
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
} from '../styles/ReceitasModalStyles';

export default function ReceitasModalComp({
  modalAberto,
  editandoId,
  formData,
  data,
  onFecharModal,
  onAtualizarForm,
  onSalvarReceita,
}: ReceitasModalProps) {
  return (
    <StyledModalOverlay $visible={modalAberto} onClick={onFecharModal}>
      <StyledModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>{editandoId ? 'Editar Receita' : 'Nova Receita'}</StyledModalTitle>
          <StyledModalClose onClick={onFecharModal} data-testid="receitas-modal-fechar-x">✕</StyledModalClose>
        </StyledModalHeader>

        <StyledForm>
          <StyledFormGroup>
            <StyledLabel>Nome *</StyledLabel>
            <StyledInput
              type="text"
              placeholder="Ex: Salário, Freelance..."
              value={formData.nome}
              onChange={e => onAtualizarForm('nome', e.target.value)}
              data-testid="receitas-nome"
            />
          </StyledFormGroup>

          <StyledFormRow>
            <StyledFormGroup>
              <StyledLabel>Categoria *</StyledLabel>
              <StyledFormSelect
                value={formData.categoria}
              data-testid="receitas-categoria"
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
              data-testid="receitas-valor"
                onChange={e => onAtualizarForm('valor', e.target.value)}
              />
            </StyledFormGroup>
          </StyledFormRow>

          <StyledFormRow>
            <StyledFormGroup>
              <StyledLabel>Conta *</StyledLabel>
              <StyledFormSelect
                value={formData.conta}
              data-testid="receitas-conta"
                onChange={e => onAtualizarForm('conta', e.target.value)}
              >
                <option value="">Selecione...</option>
                {data.contas.map(conta => (
                  <option key={conta} value={conta}>{conta}</option>
                ))}
              </StyledFormSelect>
            </StyledFormGroup>

            <StyledFormGroup>
              <StyledLabel>Data *</StyledLabel>
              <StyledInput
                type="date"
                value={formData.data}
              data-testid="receitas-data"
                onChange={e => onAtualizarForm('data', e.target.value)}
              />
            </StyledFormGroup>
          </StyledFormRow>

          <StyledFormGroup>
            <StyledLabel>Recorrência</StyledLabel>
            <StyledFormSelect
              value={formData.recorrencia}
              onChange={e => onAtualizarForm('recorrencia', e.target.value)}
              data-testid="receitas-recorrencia"
            >
              <option value="unica">Única</option>
              <option value="semanal">Semanal</option>
              <option value="mensal">Mensal</option>
              <option value="anual">Anual</option>
            </StyledFormSelect>
          </StyledFormGroup>

          <StyledFormGroup>
            <StyledLabel>Observações</StyledLabel>
            <StyledTextarea
              placeholder="Adicione observações sobre esta receita..."
              value={formData.observacoes}
              data-testid="receitas-observacoes"
              onChange={e => onAtualizarForm('observacoes', e.target.value)}
            />
          </StyledFormGroup>

          <StyledFormGroup>
            <StyledLabel>Comprovante (URL)</StyledLabel>
            <StyledInput
              type="url"
              placeholder="https://..."
              value={formData.comprovante || ''}
              onChange={(e) => onAtualizarForm('comprovante', e.target.value)}
              data-testid="receitas-comprovante"
            />
          </StyledFormGroup>

          <StyledModalActions>
            <StyledButton
              $variant="secondary"
              onClick={onFecharModal}
              data-testid="receitas-cancelar"
            >
              Cancelar
            </StyledButton>
            <StyledButton
              $variant="primary"
              onClick={onSalvarReceita}
              data-testid="receitas-salvar"
            >
              {editandoId ? 'Salvar Alterações' : 'Cadastrar Receita'}
            </StyledButton>
          </StyledModalActions>
        </StyledForm>
      </StyledModal>
    </StyledModalOverlay>
  );
}