'use client';

import type { DividasInfoProps } from '../types/DividasInfoTypes';
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
} from '../styles/DividasInfoStyles';

export default function DividasInfoComp({
  modalInfoAberto,
  onFecharInfo,
}: DividasInfoProps) {
  return (
    <StyledInfoOverlay $visible={modalInfoAberto} onClick={onFecharInfo}>
      <StyledInfoModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>Sobre a Página de Dívidas</StyledModalTitle>
          <StyledModalClose onClick={onFecharInfo}>✕</StyledModalClose>
        </StyledModalHeader>

        <StyledInfoIcon>💳</StyledInfoIcon>
        <StyledInfoTitle>Controle todas as suas dívidas</StyledInfoTitle>
        <StyledInfoText>
          A página de Dívidas permite que você cadastre, edite e acompanhe todos os seus
          empréstimos e financiamentos em um único lugar. Mantenha seu controle financeiro sempre atualizado.
        </StyledInfoText>

        <StyledInfoList>
          <StyledInfoListItem>📊 <strong>Cards de Resumo:</strong> Acompanhe o total de dívidas, valor total, atrasado e quitado.</StyledInfoListItem>
          <StyledInfoListItem>🔍 <strong>Pesquisa e Filtros:</strong> Encontre dívidas específicas por nome, situação ou tipo.</StyledInfoListItem>
          <StyledInfoListItem>👁️ <strong>Ver Detalhes:</strong> Clique no ícone de olho para ver todas as informações de uma dívida.</StyledInfoListItem>
          <StyledInfoListItem>✏️ <strong>Editar:</strong> Atualize os dados de qualquer dívida a qualquer momento.</StyledInfoListItem>
          <StyledInfoListItem>🗑️ <strong>Excluir:</strong> Remova dívidas com confirmação de segurança.</StyledInfoListItem>
          <StyledInfoListItem>📈 <strong>Progresso de Parcelas:</strong> Acompanhe o percentual de parcelas pagas de cada dívida.</StyledInfoListItem>
          <StyledInfoListItem>⚡ <strong>Situação:</strong> Saiba se a dívida está em dia, atrasada ou quitada.</StyledInfoListItem>
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