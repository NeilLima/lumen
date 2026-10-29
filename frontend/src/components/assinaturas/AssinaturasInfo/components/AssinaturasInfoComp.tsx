'use client';

import type { AssinaturasInfoProps } from '../types/AssinaturasInfoTypes';
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
} from '../styles/AssinaturasInfoStyles';

export default function AssinaturasInfoComp({
  modalInfoAberto,
  onFecharInfo,
}: AssinaturasInfoProps) {
  return (
    <StyledInfoOverlay $visible={modalInfoAberto} onClick={onFecharInfo}>
      <StyledInfoModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>Sobre a Página de Assinaturas</StyledModalTitle>
          <StyledModalClose onClick={onFecharInfo}>✕</StyledModalClose>
        </StyledModalHeader>

        <StyledInfoIcon>🔄</StyledInfoIcon>
        <StyledInfoTitle>Gerencie suas assinaturas e cobranças recorrentes</StyledInfoTitle>
        <StyledInfoText>
          A página de Assinaturas permite que você gerencie todos os seus assinaturas
          em um único lugar. Mantenha seu controle financeiro sempre atualizado.
        </StyledInfoText>

        <StyledInfoList>
          <StyledInfoListItem>📊 <strong>Cards de Resumo:</strong> Acompanhe o total de assinaturas, gasto mensal, anual e ativas.</StyledInfoListItem>
          <StyledInfoListItem>🔍 <strong>Pesquisa e Filtros:</strong> Encontre assinaturas específicas por nome, categoria ou status.</StyledInfoListItem>
          <StyledInfoListItem>👁️ <strong>Ver Detalhes:</strong> Clique no ícone de olho para ver todas as informações de uma assinatura.</StyledInfoListItem>
          <StyledInfoListItem>✏️ <strong>Editar:</strong> Atualize os dados de qualquer assinatura a qualquer momento.</StyledInfoListItem>
          <StyledInfoListItem>🗑️ <strong>Excluir:</strong> Remova assinaturas com confirmação de segurança.</StyledInfoListItem>
          <StyledInfoListItem>📅 <strong>Próxima Cobrança:</strong> Acompanhe quando será a próxima cobrança de cada assinatura.</StyledInfoListItem>
          <StyledInfoListItem>⚡ <strong>Status:</strong> Saiba se a assinatura está ativa, pausada ou cancelada.</StyledInfoListItem>
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
