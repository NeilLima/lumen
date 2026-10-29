'use client';
import type { ContasDetalheProps } from '../types/ContasDetalheTypes';
import { StyledDetalheOverlay, StyledDetalheModal, StyledModalHeader, StyledModalTitle, StyledModalClose, StyledDetalheContent, StyledDetalheRow, StyledDetalheLabel, StyledDetalheValue, StyledModalActions, StyledButton } from '../styles/ContasDetalheStyles';
export default function ContasDetalheComp({ detalheConta, formatarValor, getTipoLabel, onFecharDetalhe, onEditar }: ContasDetalheProps) {
  if (!detalheConta) return null;
  return <StyledDetalheOverlay onClick={onFecharDetalhe}><StyledDetalheModal onClick={e => e.stopPropagation()} style={{ borderTop: `4px solid ${detalheConta.cor}` }}>
    <StyledModalHeader><StyledModalTitle>{detalheConta.icone} {detalheConta.nome}</StyledModalTitle><StyledModalClose onClick={onFecharDetalhe} data-testid="contas-detalhe-fechar-x">✕</StyledModalClose></StyledModalHeader>
    <StyledDetalheContent>
      <StyledDetalheRow><StyledDetalheLabel>Banco</StyledDetalheLabel><StyledDetalheValue>{detalheConta.banco}</StyledDetalheValue></StyledDetalheRow>
      <StyledDetalheRow><StyledDetalheLabel>Tipo</StyledDetalheLabel><StyledDetalheValue>{getTipoLabel(detalheConta.tipo)}</StyledDetalheValue></StyledDetalheRow>
      <StyledDetalheRow><StyledDetalheLabel>Saldo</StyledDetalheLabel><StyledDetalheValue style={{ color: '#10b981', fontSize: '20px' }}>R$ {formatarValor(detalheConta.saldo)}</StyledDetalheValue></StyledDetalheRow>
      <StyledDetalheRow><StyledDetalheLabel>Status</StyledDetalheLabel><StyledDetalheValue style={{ color: detalheConta.ativa ? '#10b981' : '#ef4444' }}>{detalheConta.ativa ? 'Ativa' : 'Inativa'}</StyledDetalheValue></StyledDetalheRow>
    </StyledDetalheContent>
    <StyledModalActions><StyledButton $variant="secondary" onClick={onFecharDetalhe} data-testid="contas-detalhe-fechar">Fechar</StyledButton><StyledButton onClick={() => onEditar(detalheConta)} data-testid="contas-detalhe-editar">Editar</StyledButton></StyledModalActions>
  </StyledDetalheModal></StyledDetalheOverlay>;
}
