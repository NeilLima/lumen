'use client';
import type { OrcamentoModalProps } from '../types/OrcamentoModalTypes';
import { StyledOverlay, StyledModal, StyledHeader, StyledTitle, StyledClose, StyledForm, StyledGroup, StyledRow, StyledLabel, StyledInput, StyledSelect, StyledActions, StyledButton } from '../styles/OrcamentoModalStyles';
export default function OrcamentoModalComp({ modalAberto, editandoId, formData, data, onFecharModal, onAtualizarForm, onSalvarCategoria }: OrcamentoModalProps) {
  return (
    <StyledOverlay $visible={modalAberto} onClick={onFecharModal}>
      <StyledModal onClick={e => e.stopPropagation()}>
        <StyledHeader><StyledTitle>{editandoId ? 'Editar Limite' : 'Novo Limite'}</StyledTitle><StyledClose onClick={onFecharModal}>✕</StyledClose></StyledHeader>
        <StyledForm>
          <StyledGroup><StyledLabel>Categoria *</StyledLabel><StyledInput type="text" placeholder="Ex: Mercado..." value={formData.categoria} onChange={e => onAtualizarForm('categoria', e.target.value)} /></StyledGroup>
          <StyledRow>
            <StyledGroup><StyledLabel>Limite *</StyledLabel><StyledInput type="number" step="0.01" placeholder="0,00" value={formData.limite} onChange={e => onAtualizarForm('limite', e.target.value)} /></StyledGroup>
            <StyledGroup><StyledLabel>Gasto *</StyledLabel><StyledInput type="number" step="0.01" placeholder="0,00" value={formData.gasto} onChange={e => onAtualizarForm('gasto', e.target.value)} /></StyledGroup>
          </StyledRow>
          <StyledRow>
            <StyledGroup><StyledLabel>Mês</StyledLabel><StyledSelect value={formData.mes} onChange={e => onAtualizarForm('mes', e.target.value)}>{data.meses.map((m, i) => <option key={i} value={String(i + 1)}>{m}</option>)}</StyledSelect></StyledGroup>
            <StyledGroup><StyledLabel>Ano</StyledLabel><StyledSelect value={formData.ano} onChange={e => onAtualizarForm('ano', e.target.value)}>{data.anos.map(a => <option key={a} value={String(a)}>{a}</option>)}</StyledSelect></StyledGroup>
          </StyledRow>
          <StyledActions><StyledButton $variant="secondary" onClick={onFecharModal}>Cancelar</StyledButton><StyledButton $variant="primary" onClick={onSalvarCategoria}>{editandoId ? 'Salvar' : 'Criar'}</StyledButton></StyledActions>
        </StyledForm>
      </StyledModal>
    </StyledOverlay>
  );
}
