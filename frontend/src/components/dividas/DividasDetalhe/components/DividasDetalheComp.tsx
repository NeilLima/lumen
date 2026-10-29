'use client';

import type { DividasDetalheProps } from '../types/DividasDetalheTypes';
import {
  StyledDetalheOverlay,
  StyledDetalheModal,
  StyledModalHeader,
  StyledModalTitle,
  StyledModalClose,
  StyledDetalheHeader,
  StyledDetalheIcon,
  StyledDetalheNome,
  StyledDetalheProgress,
  StyledDetalheBar,
  StyledDetalheFill,
  StyledDetalheProgressInfo,
  StyledDetalheGrid,
  StyledDetalheItem,
  StyledDetalheLabel,
  StyledDetalheValue,
  StyledDetalheObservacoes,
  StyledStatusBadge,
  StyledModalActions,
  StyledButton,
} from '../styles/DividasDetalheStyles';

export default function DividasDetalheComp({
  detalheDivida,
  formatarValor,
  formatarData,
  getSituacaoLabel,
  getSituacaoCor,
  getTipoLabel,
  calcularProgresso,
  onFecharDetalhe,
  onEditar,
}: DividasDetalheProps) {
  if (!detalheDivida) return null;

  const pct = calcularProgresso(detalheDivida.parcelasPagas, detalheDivida.parcelas);
  const cor = detalheDivida.situacao === 'quitada' ? '#10b981' : detalheDivida.situacao === 'atrasada' ? '#ef4444' : '#3b82f6';

  return (
    <StyledDetalheOverlay $visible={!!detalheDivida} onClick={onFecharDetalhe}>
      <StyledDetalheModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>Detalhes da Dívida</StyledModalTitle>
          <StyledModalClose onClick={onFecharDetalhe}>✕</StyledModalClose>
        </StyledModalHeader>

        {detalheDivida && (
          <>
            <StyledDetalheHeader>
              <StyledDetalheIcon $color={detalheDivida.categoriaCor}>
                {detalheDivida.categoriaIcone}
              </StyledDetalheIcon>
              <StyledDetalheNome>{detalheDivida.nome}</StyledDetalheNome>
            </StyledDetalheHeader>

            <StyledDetalheProgress>
              <StyledDetalheBar>
                <StyledDetalheFill $pct={pct} $color={cor} />
              </StyledDetalheBar>
              <StyledDetalheProgressInfo>
                <span>{detalheDivida.parcelasPagas}/{detalheDivida.parcelas} parcelas</span>
                <span>{pct}%</span>
              </StyledDetalheProgressInfo>
            </StyledDetalheProgress>

            <StyledDetalheGrid>
              <StyledDetalheItem>
                <StyledDetalheLabel>Situação</StyledDetalheLabel>
                <StyledStatusBadge $color={getSituacaoCor(detalheDivida.situacao)}>
                  {getSituacaoLabel(detalheDivida.situacao)}
                </StyledStatusBadge>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Tipo</StyledDetalheLabel>
                <StyledDetalheValue>{getTipoLabel(detalheDivida.tipo)}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Valor</StyledDetalheLabel>
                <StyledDetalheValue>R$ {formatarValor(detalheDivida.valor)}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Vencimento</StyledDetalheLabel>
                <StyledDetalheValue>{formatarData(detalheDivida.dataVencimento)}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Juros</StyledDetalheLabel>
                <StyledDetalheValue>{detalheDivida.juros}%</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Parcelas</StyledDetalheLabel>
                <StyledDetalheValue>{detalheDivida.parcelasPagas}/{detalheDivida.parcelas}</StyledDetalheValue>
              </StyledDetalheItem>
            </StyledDetalheGrid>

            {detalheDivida.observacoes && (
              <StyledDetalheObservacoes>
                <StyledDetalheLabel>Observações</StyledDetalheLabel>
                <StyledDetalheValue>{detalheDivida.observacoes}</StyledDetalheValue>
              </StyledDetalheObservacoes>
            )}

            <StyledModalActions>
              <StyledButton $variant="secondary" onClick={onFecharDetalhe}>
                Fechar
              </StyledButton>
              <StyledButton $variant="primary" onClick={() => onEditar(detalheDivida)}>
                Editar
              </StyledButton>
            </StyledModalActions>
          </>
        )}
      </StyledDetalheModal>
    </StyledDetalheOverlay>
  );
}