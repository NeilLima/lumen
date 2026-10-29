'use client';

import type { ConfiguracoesInfoProps } from '../types/ConfiguracoesInfoTypes';
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
} from '../styles/ConfiguracoesInfoStyles';

export default function ConfiguracoesInfoComp({
  modalInfoAberto,
  onFecharInfo,
}: ConfiguracoesInfoProps) {
  return (
    <StyledInfoOverlay $visible={modalInfoAberto} onClick={onFecharInfo}>
      <StyledInfoModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>Sobre a Página de Configurações</StyledModalTitle>
          <StyledModalClose onClick={onFecharInfo}>✕</StyledModalClose>
        </StyledModalHeader>

        <StyledInfoIcon>⚙️</StyledInfoIcon>
        <StyledInfoTitle>Personalize sua experiência</StyledInfoTitle>
        <StyledInfoText>
          A página de Configurações permite que você gerencie todos os seus configurações
          em um único lugar. Mantenha seu controle financeiro sempre atualizado.
        </StyledInfoText>

        <StyledInfoList>
          <StyledInfoListItem>📊 <strong>Cards de Resumo:</strong> Acompanhe o total de configurações por categoria.</StyledInfoListItem>
          <StyledInfoListItem>🔍 <strong>Pesquisa e Filtros:</strong> Encontre configurações específicas por nome ou categoria.</StyledInfoListItem>
          <StyledInfoListItem>👁️ <strong>Ver Detalhes:</strong> Clique no ícone de olho para ver todas as informações de uma configuração.</StyledInfoListItem>
          <StyledInfoListItem>✏️ <strong>Editar:</strong> Atualize os dados de qualquer configuração a qualquer momento.</StyledInfoListItem>
          <StyledInfoListItem>🗑️ <strong>Excluir:</strong> Remova configurações com confirmação de segurança.</StyledInfoListItem>
          <StyledInfoListItem>🎨 <strong>Aparência:</strong> Tema claro/escuro, cores e layout.</StyledInfoListItem>
          <StyledInfoListItem>🔒 <strong>Segurança:</strong> Senha, backup e exportação de dados.</StyledInfoListItem>
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
