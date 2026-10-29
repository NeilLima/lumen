'use client';
import type { ContasModalProps } from '../types/ContasModalTypes';
import { StyledModalOverlay, StyledModal, StyledModalHeader, StyledModalTitle, StyledModalClose, StyledForm, StyledFormGroup, StyledLabel, StyledInput, StyledSelect, StyledColorInput, StyledModalActions, StyledButton } from '../styles/ContasModalStyles';
export default function ContasModalComp({ modalAberto, editandoId, formData, onFecharModal, onAtualizarForm, onSalvarConta }: ContasModalProps) {
  if (!modalAberto) return null;
  return <StyledModalOverlay onClick={onFecharModal}><StyledModal onClick={e => e.stopPropagation()}>
    <StyledModalHeader><StyledModalTitle>{editandoId ? 'Editar' : 'Nova'} Conta</StyledModalTitle><StyledModalClose onClick={onFecharModal} data-testid="contas-modal-fechar-x">✕</StyledModalClose></StyledModalHeader>
    <StyledForm>
      <StyledFormGroup><StyledLabel>Nome</StyledLabel><StyledInput value={formData.nome} onChange={e => onAtualizarForm('nome', e.target.value)} placeholder="Ex: Conta Corrente" data-testid="contas-nome" /></StyledFormGroup>
      <StyledFormGroup><StyledLabel>Tipo</StyledLabel><StyledSelect value={formData.tipo} onChange={e => onAtualizarForm('tipo', e.target.value)} data-testid="contas-tipo"><option value="corrente">Conta Corrente</option><option value="poupanca">Poupança</option><option value="carteira">Carteira</option><option value="digital">Conta Digital</option></StyledSelect></StyledFormGroup>
      <StyledFormGroup><StyledLabel>Banco</StyledLabel><StyledInput value={formData.banco} onChange={e => onAtualizarForm('banco', e.target.value)} placeholder="Ex: Nubank" data-testid="contas-banco" /></StyledFormGroup>
      <StyledFormGroup><StyledLabel>Saldo (R$)</StyledLabel><StyledInput type="number" value={formData.saldo} onChange={e => onAtualizarForm('saldo', e.target.value)} placeholder="Ex: 5000" data-testid="contas-saldo" /></StyledFormGroup>
      <StyledFormGroup><StyledLabel>Cor</StyledLabel><StyledColorInput type="color" value={formData.cor} onChange={e => onAtualizarForm('cor', e.target.value)} data-testid="contas-cor" /></StyledFormGroup>
      <StyledModalActions><StyledButton $variant="secondary" onClick={onFecharModal} data-testid="contas-cancelar">Cancelar</StyledButton><StyledButton onClick={onSalvarConta} data-testid="contas-salvar">{editandoId ? 'Salvar' : 'Criar'}</StyledButton></StyledModalActions>
    </StyledForm>
  </StyledModal></StyledModalOverlay>;
}
