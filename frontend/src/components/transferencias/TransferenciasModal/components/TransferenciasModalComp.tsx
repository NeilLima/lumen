'use client';
import type { TransferenciasModalProps } from '../types/TransferenciasModalTypes';
import { StyledModalOverlay, StyledModal, StyledModalHeader, StyledModalTitle, StyledModalClose, StyledForm, StyledFormGroup, StyledLabel, StyledInput, StyledSelect, StyledTextarea, StyledModalActions, StyledButton } from '../styles/TransferenciasModalStyles';
export default function TransferenciasModalComp({ modalAberto, editandoId, formData, data, onFecharModal, onAtualizarForm, onSalvarTransferencia }: TransferenciasModalProps) {
  if (!modalAberto) return null;
  return <StyledModalOverlay onClick={onFecharModal}><StyledModal onClick={e => e.stopPropagation()}>
    <StyledModalHeader><StyledModalTitle>{editandoId ? 'Editar' : 'Nova'} Transferência</StyledModalTitle><StyledModalClose onClick={onFecharModal}>✕</StyledModalClose></StyledModalHeader>
    <StyledForm>
      <StyledFormGroup><StyledLabel>Descrição</StyledLabel><StyledInput value={formData.descricao} onChange={e => onAtualizarForm('descricao', e.target.value)} placeholder="Ex: Transferência para poupança" /></StyledFormGroup>
      <StyledFormGroup><StyledLabel>Valor (R$)</StyledLabel><StyledInput type="number" value={formData.valor} onChange={e => onAtualizarForm('valor', e.target.value)} placeholder="Ex: 1000" /></StyledFormGroup>
      <StyledFormGroup><StyledLabel>Conta de Origem</StyledLabel><StyledSelect value={formData.contaOrigem} onChange={e => onAtualizarForm('contaOrigem', e.target.value)}>
        <option value="">Selecione</option>{data?.contas.map(c => <option key={c} value={c}>{c}</option>)}
      </StyledSelect></StyledFormGroup>
      <StyledFormGroup><StyledLabel>Conta de Destino</StyledLabel><StyledSelect value={formData.contaDestino} onChange={e => onAtualizarForm('contaDestino', e.target.value)}>
        <option value="">Selecione</option>{data?.contas.map(c => <option key={c} value={c}>{c}</option>)}
      </StyledSelect></StyledFormGroup>
      <StyledFormGroup><StyledLabel>Data</StyledLabel><StyledInput type="date" value={formData.data} onChange={e => onAtualizarForm('data', e.target.value)} /></StyledFormGroup>
      <StyledFormGroup><StyledLabel>Observações</StyledLabel><StyledTextarea value={formData.observacoes} onChange={e => onAtualizarForm('observacoes', e.target.value)} /></StyledFormGroup>
      <StyledModalActions><StyledButton $variant="secondary" onClick={onFecharModal}>Cancelar</StyledButton><StyledButton onClick={onSalvarTransferencia}>{editandoId ? 'Salvar' : 'Criar'}</StyledButton></StyledModalActions>
    </StyledForm>
  </StyledModal></StyledModalOverlay>;
}
