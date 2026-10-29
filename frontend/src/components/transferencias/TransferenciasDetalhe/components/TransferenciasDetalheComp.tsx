'use client';
import type { TransferenciasDetalheProps } from '../types/TransferenciasDetalheTypes';
import { StyledDetalheOverlay, StyledDetalheModal, StyledModalHeader, StyledModalTitle, StyledModalClose, StyledDetalheContent, StyledDetalheRow, StyledDetalheLabel, StyledDetalheValue, StyledModalActions, StyledButton } from '../styles/TransferenciasDetalheStyles';
export default function TransferenciasDetalheComp({ detalheTransferencia, formatarValor, formatarData, onFecharDetalhe, onEditar }: TransferenciasDetalheProps) {
  if (!detalheTransferencia) return null;
  return <StyledDetalheOverlay onClick={onFecharDetalhe}><StyledDetalheModal onClick={e => e.stopPropagation()}>
    <StyledModalHeader><StyledModalTitle>{detalheTransferencia.descricao}</StyledModalTitle><StyledModalClose onClick={onFecharDetalhe}>✕</StyledModalClose></StyledModalHeader>
    <StyledDetalheContent>
      <StyledDetalheRow><StyledDetalheLabel>Valor</StyledDetalheLabel><StyledDetalheValue style={{ color: '#10b981' }}>R$ {formatarValor(detalheTransferencia.valor)}</StyledDetalheValue></StyledDetalheRow>
      <StyledDetalheRow><StyledDetalheLabel>Origem</StyledDetalheLabel><StyledDetalheValue>{detalheTransferencia.contaOrigem}</StyledDetalheValue></StyledDetalheRow>
      <StyledDetalheRow><StyledDetalheLabel>Destino</StyledDetalheLabel><StyledDetalheValue>{detalheTransferencia.contaDestino}</StyledDetalheValue></StyledDetalheRow>
      <StyledDetalheRow><StyledDetalheLabel>Data</StyledDetalheLabel><StyledDetalheValue>{formatarData(detalheTransferencia.data)}</StyledDetalheValue></StyledDetalheRow>
      {detalheTransferencia.observacoes && <StyledDetalheRow><StyledDetalheLabel>Observações</StyledDetalheLabel><StyledDetalheValue>{detalheTransferencia.observacoes}</StyledDetalheValue></StyledDetalheRow>}
    </StyledDetalheContent>
    <StyledModalActions><StyledButton $variant="secondary" onClick={onFecharDetalhe}>Fechar</StyledButton><StyledButton onClick={() => onEditar(detalheTransferencia)}>Editar</StyledButton></StyledModalActions>
  </StyledDetalheModal></StyledDetalheOverlay>;
}
