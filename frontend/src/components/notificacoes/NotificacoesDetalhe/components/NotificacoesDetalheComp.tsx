'use client';

import type { NotificacoesDetalheProps } from '../types/NotificacoesDetalheTypes';
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
} from '../styles/NotificacoesDetalheStyles';

export default function NotificacoesDetalheComp({
  detalheNotificacao,
  formatarValor,
  formatarData,
  getStatusLabel,
  getStatusCor,

  onFecharDetalhe,
  onEditar,
}: NotificacoesDetalheProps) {
  if (!detalheNotificacao) return null;

  

  return (
    <StyledDetalheOverlay $visible={!!detalheNotificacao} onClick={onFecharDetalhe}>
      <StyledDetalheModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>Detalhes do Notificacao</StyledModalTitle>
          <StyledModalClose onClick={onFecharDetalhe}>✕</StyledModalClose>
        </StyledModalHeader>

        {detalheNotificacao && (
          <>
            <StyledDetalheHeader>
              <StyledDetalheIcon $color={detalheNotificacao.categoriaCor}>
                {detalheNotificacao.categoriaIcone}
              </StyledDetalheIcon>
              <StyledDetalheNome>{detalheNotificacao.titulo}</StyledDetalheNome>
            </StyledDetalheHeader>


            <StyledDetalheGrid>
              <StyledDetalheItem>
                <StyledDetalheLabel>Título *</StyledDetalheLabel>
                <StyledDetalheValue>{detalheNotificacao.titulo}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Tipo</StyledDetalheLabel>
                <StyledDetalheValue>{detalheNotificacao.tipo}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Data *</StyledDetalheLabel>
                <StyledDetalheValue>{detalheNotificacao.data}</StyledDetalheValue>
              </StyledDetalheItem>

              <StyledDetalheItem>
                <StyledDetalheLabel>Status</StyledDetalheLabel>
                <StyledStatusBadge $color={getStatusCor(detalheNotificacao.status)}>
                  {getStatusLabel(detalheNotificacao.status)}
                </StyledStatusBadge>
              </StyledDetalheItem>

            </StyledDetalheGrid>

            {detalheNotificacao.mensagem && (
              <StyledDetalheObservacoes>
                <StyledDetalheLabel>Observações</StyledDetalheLabel>
                <StyledDetalheValue>{detalheNotificacao.mensagem}</StyledDetalheValue>
              </StyledDetalheObservacoes>
            )}

            <StyledModalActions>
              <StyledButton $variant="secondary" onClick={onFecharDetalhe}>
                Fechar
              </StyledButton>
              <StyledButton $variant="primary" onClick={() => onEditar(detalheNotificacao)}>
                Editar
              </StyledButton>
            </StyledModalActions>
          </>
        )}
      </StyledDetalheModal>
    </StyledDetalheOverlay>
  );
}
