'use client';

import type { DespesasDetalheProps } from '../types/DespesasDetalheTypes';
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
  StyledDetalheObservacoes,
  StyledStatusBadge,
  StyledPrioridadeBadge,
  StyledModalActions,
  StyledButton,
} from '../styles/DespesasDetalheStyles';

export default function DespesasDetalheComp({
  detalheDespesa,
  formatarValor,
  formatarData,
  getStatusCor,
  getStatusLabel,
  getPrioridadeCor,
  getPrioridadeLabel,
  onFecharDetalhe,
  onEditar,
}: DespesasDetalheProps) {
  return (
    <StyledDetalheOverlay $visible={!!detalheDespesa} onClick={onFecharDetalhe}>
      <StyledDetalheModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>Detalhes da Despesa</StyledModalTitle>
          <StyledModalClose onClick={onFecharDetalhe}>✕</StyledModalClose>
        </StyledModalHeader>

        {detalheDespesa && (
          <>
            <StyledDetalheHeader>
              <StyledDetalheIcon $color={detalheDespesa.categoriaCor}>
                {detalheDespesa.categoriaIcone}
              </StyledDetalheIcon>
              <StyledDetalheNome>{detalheDespesa.nome}</StyledDetalheNome>
            </StyledDetalheHeader>

            <StyledDetalheGrid>
              <StyledDetalheItem>
                <StyledDetalheLabel>Valor</StyledDetalheLabel>
                <StyledDetalheValue>R$ {formatarValor(detalheDespesa.valor)}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Categoria</StyledDetalheLabel>
                <StyledDetalheValue>{detalheDespesa.categoria}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Conta</StyledDetalheLabel>
                <StyledDetalheValue>{detalheDespesa.conta}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Cartão</StyledDetalheLabel>
                <StyledDetalheValue>{detalheDespesa.cartao || '—'}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Data</StyledDetalheLabel>
                <StyledDetalheValue>{formatarData(detalheDespesa.data)}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Parcelas</StyledDetalheLabel>
                <StyledDetalheValue>{detalheDespesa.parcelas}x</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Prioridade</StyledDetalheLabel>
                <StyledPrioridadeBadge $color={getPrioridadeCor(detalheDespesa.prioridade)}>
                  {getPrioridadeLabel(detalheDespesa.prioridade)}
                </StyledPrioridadeBadge>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Status</StyledDetalheLabel>
                <StyledStatusBadge $color={getStatusCor(detalheDespesa.status)}>
                  {getStatusLabel(detalheDespesa.status)}
                </StyledStatusBadge>
              </StyledDetalheItem>
            </StyledDetalheGrid>

            {detalheDespesa.observacoes && (
              <StyledDetalheObservacoes>
                <StyledDetalheLabel>Observações</StyledDetalheLabel>
                <StyledDetalheValue>{detalheDespesa.observacoes}</StyledDetalheValue>
              </StyledDetalheObservacoes>
            )}

            <StyledModalActions>
              <StyledButton $variant="secondary" onClick={onFecharDetalhe}>
                Fechar
              </StyledButton>
              <StyledButton $variant="primary" onClick={() => onEditar(detalheDespesa)}>
                Editar
              </StyledButton>
            </StyledModalActions>
          </>
        )}
      </StyledDetalheModal>
    </StyledDetalheOverlay>
  );
}