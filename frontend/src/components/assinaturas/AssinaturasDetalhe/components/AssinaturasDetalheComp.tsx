'use client';

import type { AssinaturasDetalheProps } from '../types/AssinaturasDetalheTypes';
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
} from '../styles/AssinaturasDetalheStyles';

export default function AssinaturasDetalheComp({
  detalheAssinatura,
  formatarValor,
  formatarData,
  getStatusLabel,
  getStatusCor,

  onFecharDetalhe,
  onEditar,
}: AssinaturasDetalheProps) {
  if (!detalheAssinatura) return null;

  

  return (
    <StyledDetalheOverlay $visible={!!detalheAssinatura} onClick={onFecharDetalhe}>
      <StyledDetalheModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>Detalhes do Assinatura</StyledModalTitle>
          <StyledModalClose onClick={onFecharDetalhe}>✕</StyledModalClose>
        </StyledModalHeader>

        {detalheAssinatura && (
          <>
            <StyledDetalheHeader>
              <StyledDetalheIcon $color={detalheAssinatura.categoriaCor}>
                {detalheAssinatura.categoriaIcone}
              </StyledDetalheIcon>
              <StyledDetalheNome>{detalheAssinatura.nome}</StyledDetalheNome>
            </StyledDetalheHeader>


            <StyledDetalheGrid>
              <StyledDetalheItem>
                <StyledDetalheLabel>Nome *</StyledDetalheLabel>
                <StyledDetalheValue>{detalheAssinatura.nome}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Categoria</StyledDetalheLabel>
                <StyledDetalheValue>{detalheAssinatura.categoria}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Valor *</StyledDetalheLabel>
                <StyledDetalheValue>{detalheAssinatura.valor}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Ciclo de Cobrança</StyledDetalheLabel>
                <StyledDetalheValue>{detalheAssinatura.ciclo}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Próxima Cobrança *</StyledDetalheLabel>
                <StyledDetalheValue>{detalheAssinatura.proximaCobranca}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Status</StyledDetalheLabel>
                <StyledStatusBadge $color={getStatusCor(detalheAssinatura.status)}>
                  {getStatusLabel(detalheAssinatura.status)}
                </StyledStatusBadge>
              </StyledDetalheItem>

            </StyledDetalheGrid>

            {detalheAssinatura.observacoes && (
              <StyledDetalheObservacoes>
                <StyledDetalheLabel>Observações</StyledDetalheLabel>
                <StyledDetalheValue>{detalheAssinatura.observacoes}</StyledDetalheValue>
              </StyledDetalheObservacoes>
            )}

            <StyledModalActions>
              <StyledButton $variant="secondary" onClick={onFecharDetalhe}>
                Fechar
              </StyledButton>
              <StyledButton $variant="primary" onClick={() => onEditar(detalheAssinatura)}>
                Editar
              </StyledButton>
            </StyledModalActions>
          </>
        )}
      </StyledDetalheModal>
    </StyledDetalheOverlay>
  );
}
