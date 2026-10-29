'use client';

import type { InvestimentosInfoProps } from '../types/InvestimentosInfoTypes';
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
} from '../styles/InvestimentosInfoStyles';

export default function InvestimentosInfoComp({
  modalInfoAberto,
  onFecharInfo,
}: InvestimentosInfoProps) {
  return (
    <StyledInfoOverlay $visible={modalInfoAberto} onClick={onFecharInfo}>
      <StyledInfoModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>Sobre a Página de Investimentos</StyledModalTitle>
          <StyledModalClose onClick={onFecharInfo}>✕</StyledModalClose>
        </StyledModalHeader>

        <StyledInfoIcon>📈</StyledInfoIcon>
        <StyledInfoTitle>Acompanhe seus investimentos e rentabilidade</StyledInfoTitle>
        <StyledInfoText>
          A página de Investimentos permite que você gerencie todos os seus investimentos
          em um único lugar. Mantenha seu controle financeiro sempre atualizado.
        </StyledInfoText>

        <StyledInfoList>
          <StyledInfoListItem>📊 <strong>Cards de Resumo:</strong> Acompanhe o total de investimentos, valor aplicado, atual e lucro/prejuízo.</StyledInfoListItem>
          <StyledInfoListItem>🔍 <strong>Pesquisa e Filtros:</strong> Encontre investimentos específicos por nome, tipo ou status.</StyledInfoListItem>
          <StyledInfoListItem>👁️ <strong>Ver Detalhes:</strong> Clique no ícone de olho para ver todas as informações de um investimento.</StyledInfoListItem>
          <StyledInfoListItem>✏️ <strong>Editar:</strong> Atualize os dados de qualquer investimento a qualquer momento.</StyledInfoListItem>
          <StyledInfoListItem>🗑️ <strong>Excluir:</strong> Remova investimentos com confirmação de segurança.</StyledInfoListItem>
          <StyledInfoListItem>📈 <strong>Rentabilidade:</strong> Acompanhe o desempenho de cada investimento.</StyledInfoListItem>
          <StyledInfoListItem>⚡ <strong>Status:</strong> Saiba se o investimento está ativo, resgatado ou em perda.</StyledInfoListItem>
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
