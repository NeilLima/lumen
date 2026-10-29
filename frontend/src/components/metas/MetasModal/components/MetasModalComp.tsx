'use client';
import type { MetasModalProps } from '../types/MetasModalTypes';
import {
  StyledModalOverlay, StyledModal, StyledModalHeader, StyledModalTitle, StyledModalClose,
  StyledForm, StyledFormGroup, StyledFormRow, StyledLabel, StyledInput, StyledTextarea,
  StyledFormSelect, StyledModalActions, StyledButton,
} from '../styles/MetasModalStyles';

export default function MetasModalComp({ modalAberto, editandoId, formData, data, onFecharModal, onAtualizarForm, onSalvarMeta }: MetasModalProps) {
  return (
    <StyledModalOverlay $visible={modalAberto} onClick={onFecharModal}>
      <StyledModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>{editandoId ? 'Editar Meta' : 'Nova Meta'}</StyledModalTitle>
          <StyledModalClose onClick={onFecharModal}>✕</StyledModalClose>
        </StyledModalHeader>
        <StyledForm>
          <StyledFormGroup>
            <StyledLabel>Nome *</StyledLabel>
            <StyledInput type="text" placeholder="Ex: Reserva de Emergência..." value={formData.nome} onChange={e => onAtualizarForm('nome', e.target.value)} />
          </StyledFormGroup>
          <StyledFormRow>
            <StyledFormGroup>
              <StyledLabel>Valor Alvo *</StyledLabel>
              <StyledInput type="number" step="0.01" placeholder="0,00" value={formData.valorAlvo} onChange={e => onAtualizarForm('valorAlvo', e.target.value)} />
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledLabel>Valor Atual *</StyledLabel>
              <StyledInput type="number" step="0.01" placeholder="0,00" value={formData.valorAtual} onChange={e => onAtualizarForm('valorAtual', e.target.value)} />
            </StyledFormGroup>
          </StyledFormRow>
          <StyledFormRow>
            <StyledFormGroup>
              <StyledLabel>Categoria *</StyledLabel>
              <StyledFormSelect value={formData.categoria} onChange={e => onAtualizarForm('categoria', e.target.value)}>
                <option value="">Selecione...</option>
                {data.categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </StyledFormSelect>
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledLabel>Data Limite *</StyledLabel>
              <StyledInput type="date" value={formData.dataLimite} onChange={e => onAtualizarForm('dataLimite', e.target.value)} />
            </StyledFormGroup>
          </StyledFormRow>
          <StyledFormRow>
            <StyledFormGroup>
              <StyledLabel>Prioridade</StyledLabel>
              <StyledFormSelect value={formData.prioridade} onChange={e => onAtualizarForm('prioridade', e.target.value)}>
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
              </StyledFormSelect>
            </StyledFormGroup>
            <StyledFormGroup>
              <StyledLabel>Status</StyledLabel>
              <StyledFormSelect value={formData.status} onChange={e => onAtualizarForm('status', e.target.value)}>
                <option value="em_andamento">Em Andamento</option>
                <option value="concluida">Concluída</option>
                <option value="pausada">Pausada</option>
              </StyledFormSelect>
            </StyledFormGroup>
          </StyledFormRow>
          <StyledFormGroup>
            <StyledLabel>Descrição</StyledLabel>
            <StyledTextarea placeholder="Descreva sua meta..." value={formData.descricao} onChange={e => onAtualizarForm('descricao', e.target.value)} />
          </StyledFormGroup>
          <StyledModalActions>
            <StyledButton $variant="secondary" onClick={onFecharModal}>Cancelar</StyledButton>
            <StyledButton $variant="primary" onClick={onSalvarMeta}>{editandoId ? 'Salvar Alterações' : 'Criar Meta'}</StyledButton>
          </StyledModalActions>
        </StyledForm>
      </StyledModal>
    </StyledModalOverlay>
  );
}
