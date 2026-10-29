'use client';
import type { MetasDetalheProps } from '../types/MetasDetalheTypes';
import {
  StyledDetalheOverlay, StyledDetalheModal, StyledModalHeader, StyledModalTitle, StyledModalClose,
  StyledDetalheHeader, StyledDetalheIcon, StyledDetalheNome, StyledProgressSection,
  StyledProgressBar, StyledProgressFill, StyledProgressText, StyledDetalheContent,
  StyledDetalheGrid, StyledDetalheItem, StyledDetalheLabel, StyledDetalheValue,
  StyledDetalheDescricao, StyledStatusBadge, StyledModalActions, StyledButton,
} from '../styles/MetasDetalheStyles';

export default function MetasDetalheComp({
  detalheMeta, formatarValor, formatarData, getPrioridadeLabel, getPrioridadeCor,
  getStatusLabel, getStatusCor, calcularProgresso, onFecharDetalhe, onEditar,
}: MetasDetalheProps) {
  return (
    <StyledDetalheOverlay $visible={!!detalheMeta} onClick={onFecharDetalhe}>
      <StyledDetalheModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>Detalhes da Meta</StyledModalTitle>
          <StyledModalClose onClick={onFecharDetalhe}>✕</StyledModalClose>
        </StyledModalHeader>
        {detalheMeta && (
          <>
            <StyledDetalheHeader>
              <StyledDetalheIcon $color={detalheMeta.categoriaCor}>{detalheMeta.categoriaIcone}</StyledDetalheIcon>
              <StyledDetalheNome>{detalheMeta.nome}</StyledDetalheNome>
            </StyledDetalheHeader>
            <StyledProgressSection>
              <StyledProgressBar>
                <StyledProgressFill $progresso={calcularProgresso(detalheMeta)} $color={calcularProgresso(detalheMeta) >= 100 ? '#10b981' : '#3b82f6'} />
              </StyledProgressBar>
              <StyledProgressText>
                <span>R$ {formatarValor(detalheMeta.valorAtual)}</span>
                <span>{calcularProgresso(detalheMeta)}%</span>
                <span>R$ {formatarValor(detalheMeta.valorAlvo)}</span>
              </StyledProgressText>
            </StyledProgressSection>
            <StyledDetalheContent>
              <StyledDetalheGrid>
                <StyledDetalheItem>
                  <StyledDetalheLabel>Status</StyledDetalheLabel>
                  <StyledStatusBadge $color={getStatusCor(detalheMeta.status)}>{getStatusLabel(detalheMeta.status)}</StyledStatusBadge>
                </StyledDetalheItem>
                <StyledDetalheItem>
                  <StyledDetalheLabel>Prioridade</StyledDetalheLabel>
                  <StyledStatusBadge $color={getPrioridadeCor(detalheMeta.prioridade)}>{getPrioridadeLabel(detalheMeta.prioridade)}</StyledStatusBadge>
                </StyledDetalheItem>
                <StyledDetalheItem>
                  <StyledDetalheLabel>Categoria</StyledDetalheLabel>
                  <StyledDetalheValue>{detalheMeta.categoria}</StyledDetalheValue>
                </StyledDetalheItem>
                <StyledDetalheItem>
                  <StyledDetalheLabel>Data Limite</StyledDetalheLabel>
                  <StyledDetalheValue>{formatarData(detalheMeta.dataLimite)}</StyledDetalheValue>
                </StyledDetalheItem>
              </StyledDetalheGrid>
            </StyledDetalheContent>
            {detalheMeta.descricao && (
              <StyledDetalheDescricao>
                <StyledDetalheLabel>Descrição</StyledDetalheLabel>
                <StyledDetalheValue>{detalheMeta.descricao}</StyledDetalheValue>
              </StyledDetalheDescricao>
            )}
            <StyledModalActions>
              <StyledButton $variant="secondary" onClick={onFecharDetalhe}>Fechar</StyledButton>
              <StyledButton $variant="primary" onClick={() => onEditar(detalheMeta)}>Editar</StyledButton>
            </StyledModalActions>
          </>
        )}
      </StyledDetalheModal>
    </StyledDetalheOverlay>
  );
}
