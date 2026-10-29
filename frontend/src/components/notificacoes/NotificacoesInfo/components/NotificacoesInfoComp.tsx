'use client';

import type { NotificacoesInfoProps } from '../types/NotificacoesInfoTypes';
import {
  StyledInfoOverlay,
  StyledInfoModal,
  StyledModalHeader,
  StyledModalTitle,
  StyledModalClose,
  StyledInfoIcon,
  StyledInfoTitle,
  StyledInfoText,
  StyledInfoList,
  StyledInfoListItem,
  StyledModalActions,
  StyledButton,
} from '../styles/NotificacoesInfoStyles';

export default function NotificacoesInfoComp({
  modalInfoAberto,
  onFecharInfo,
}: NotificacoesInfoProps) {
  return (
    <StyledInfoOverlay $visible={modalInfoAberto} onClick={onFecharInfo}>
      <StyledInfoModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>Sobre a Página de Notificações</StyledModalTitle>
          <StyledModalClose onClick={onFecharInfo}>✕</StyledModalClose>
        </StyledModalHeader>

        <StyledInfoIcon>🔔</StyledInfoIcon>
        <StyledInfoTitle>Acompanhe seus alertas e lembretes</StyledInfoTitle>
        <StyledInfoText>
          A página de Notificações permite que você gerencie todos os seus notificações
          em um único lugar. Mantenha seu controle financeiro sempre atualizado.
        </StyledInfoText>

        <StyledInfoList>
          <StyledInfoListItem>📊 <strong>Cards de Resumo:</strong> Acompanhe o total de notificações, não lidas, lidas e arquivadas.</StyledInfoListItem>
          <StyledInfoListItem>🔍 <strong>Pesquisa e Filtros:</strong> Encontre notificações específicas por título, tipo ou status.</StyledInfoListItem>
          <StyledInfoListItem>👁️ <strong>Ver Detalhes:</strong> Clique no ícone de olho para ver todas as informações de uma notificação.</StyledInfoListItem>
          <StyledInfoListItem>✏️ <strong>Editar:</strong> Atualize os dados de qualquer notificação a qualquer momento.</StyledInfoListItem>
          <StyledInfoListItem>🗑️ <strong>Excluir:</strong> Remova notificações com confirmação de segurança.</StyledInfoListItem>
          <StyledInfoListItem>🔔 <strong>Tipos:</strong> Pagamento próximo, conta vencendo, meta atingida, limite do cartão, orçamento excedido.</StyledInfoListItem>
          <StyledInfoListItem>⚡ <strong>Status:</strong> Saiba se a notificação foi lida, não lida ou arquivada.</StyledInfoListItem>
        </StyledInfoList>

        <StyledModalActions>
          <StyledButton $variant="primary" onClick={onFecharInfo}>
            Entendi
          </StyledButton>
        </StyledModalActions>
      </StyledInfoModal>
    </StyledInfoOverlay>
  );
}
