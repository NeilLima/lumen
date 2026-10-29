'use client';

import type { CaridadeInfoProps } from '../types/CaridadeInfoTypes';
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
} from '../styles/CaridadeInfoStyles';

export default function CaridadeInfoComp({
  modalInfoAberto,
  onFecharInfo,
}: CaridadeInfoProps) {
  return (
    <StyledInfoOverlay $visible={modalInfoAberto} onClick={onFecharInfo}>
      <StyledInfoModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>Sobre a Página de Caridade Financeira</StyledModalTitle>
          <StyledModalClose onClick={onFecharInfo}>✕</StyledModalClose>
        </StyledModalHeader>

        <StyledInfoIcon>❤️</StyledInfoIcon>
        <StyledInfoTitle>Gerencie suas doações e contribuições</StyledInfoTitle>
        <StyledInfoText>
          A página de Caridade Financeira permite que você gerencie todos os seus doações
          em um único lugar. Mantenha seu controle financeiro sempre atualizado.
        </StyledInfoText>

        <StyledInfoList>
          <StyledInfoListItem>📊 <strong>Cards de Resumo:</strong> Acompanhe o total de doações, valor total, realizadas e pendentes.</StyledInfoListItem>
          <StyledInfoListItem>🔍 <strong>Pesquisa e Filtros:</strong> Encontre doações específicas por nome, tipo ou status.</StyledInfoListItem>
          <StyledInfoListItem>👁️ <strong>Ver Detalhes:</strong> Clique no ícone de olho para ver todas as informações de uma doação.</StyledInfoListItem>
          <StyledInfoListItem>✏️ <strong>Editar:</strong> Atualize os dados de qualquer doação a qualquer momento.</StyledInfoListItem>
          <StyledInfoListItem>🗑️ <strong>Excluir:</strong> Remova doações com confirmação de segurança.</StyledInfoListItem>
          <StyledInfoListItem>❤️ <strong>Instituição:</strong> Registre a instituição beneficiada.</StyledInfoListItem>
          <StyledInfoListItem>⚡ <strong>Status:</strong> Saiba se a doação foi realizada ou está pendente.</StyledInfoListItem>
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
