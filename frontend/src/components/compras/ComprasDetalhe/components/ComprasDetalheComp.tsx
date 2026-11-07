'use client';

import type { ComprasDetalheProps } from '../types/ComprasDetalheTypes';
import {
  StyledDetalheOverlay,
  StyledDetalheModal,
  StyledModalHeader,
  StyledModalTitle,
  StyledModalClose,
  StyledDetalheHeader,
  StyledDetalheIcon,
  StyledDetalheNome,
  StyledDetalheGrid,
  StyledDetalheItem,
  StyledDetalheLabel,
  StyledDetalheValue,
  StyledStatusBadge,
  StyledModalActions,
  StyledButton,
} from '../styles/ComprasDetalheStyles';

export default function ComprasDetalheComp({
  detalheCompra,
  formatarValor,
  formatarData,
  getStatusCor,
  getStatusLabel,
  onFecharDetalhe,
  onEditar,
}: ComprasDetalheProps) {
  return (
    <StyledDetalheOverlay $visible={!!detalheCompra} onClick={onFecharDetalhe}>
      <StyledDetalheModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>Detalhes da Compra</StyledModalTitle>
          <StyledModalClose onClick={onFecharDetalhe}>?</StyledModalClose>
        </StyledModalHeader>

        {detalheCompra && (
          <>
            <StyledDetalheHeader>
              <StyledDetalheIcon $color="#8b5cf6">{'\u{1F6D2}'}</StyledDetalheIcon>
              <StyledDetalheNome>{detalheCompra.local || 'Sem local'}</StyledDetalheNome>
            </StyledDetalheHeader>

            <StyledDetalheGrid>
              <StyledDetalheItem>
                <StyledDetalheLabel>Total</StyledDetalheLabel>
                <StyledDetalheValue>R$ {formatarValor(detalheCompra.totalAmount)}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Status</StyledDetalheLabel>
                <StyledStatusBadge $color={getStatusCor(detalheCompra.statusPagamento)}>
                  {getStatusLabel(detalheCompra.statusPagamento)}
                </StyledStatusBadge>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Data</StyledDetalheLabel>
                <StyledDetalheValue>{formatarData(detalheCompra.dataCompra)}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Parcelas</StyledDetalheLabel>
                <StyledDetalheValue>{detalheCompra.parcels}x ({detalheCompra.parcelasPagas} pagas)</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Itens</StyledDetalheLabel>
                <StyledDetalheValue>{detalheCompra.itens?.length || 0}</StyledDetalheValue>
              </StyledDetalheItem>
            </StyledDetalheGrid>

            <StyledModalActions>
              <StyledButton $variant="secondary" onClick={onFecharDetalhe}>
                Fechar
              </StyledButton>
              <StyledButton $variant="primary" onClick={() => onEditar(detalheCompra)}>
                Editar
              </StyledButton>
            </StyledModalActions>
          </>
        )}
      </StyledDetalheModal>
    </StyledDetalheOverlay>
  );
}
