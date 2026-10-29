'use client';

import type { RelatoriosInfoProps } from '../types/RelatoriosInfoTypes';
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
} from '../styles/RelatoriosInfoStyles';

export default function RelatoriosInfoComp({
  modalInfoAberto,
  onFecharInfo,
}: RelatoriosInfoProps) {
  return (
    <StyledInfoOverlay $visible={modalInfoAberto} onClick={onFecharInfo}>
      <StyledInfoModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>Sobre a Página de Relatórios</StyledModalTitle>
          <StyledModalClose onClick={onFecharInfo}>✕</StyledModalClose>
        </StyledModalHeader>

        <StyledInfoIcon>📊</StyledInfoIcon>
        <StyledInfoTitle>Análise completa da sua vida financeira</StyledInfoTitle>
        <StyledInfoText>
          A página de Relatórios permite que você gerencie todos os seus relatórios
          em um único lugar. Mantenha seu controle financeiro sempre atualizado.
        </StyledInfoText>

        <StyledInfoList>
          <StyledInfoListItem>📊 <strong>Cards de Resumo:</strong> Acompanhe o total de relatórios, receitas, despesas e saldo.</StyledInfoListItem>
          <StyledInfoListItem>🔍 <strong>Pesquisa e Filtros:</strong> Encontre relatórios específicos por nome, tipo ou período.</StyledInfoListItem>
          <StyledInfoListItem>👁️ <strong>Ver Detalhes:</strong> Clique no ícone de olho para ver todas as informações de um relatório.</StyledInfoListItem>
          <StyledInfoListItem>✏️ <strong>Editar:</strong> Atualize os dados de qualquer relatório a qualquer momento.</StyledInfoListItem>
          <StyledInfoListItem>🗑️ <strong>Excluir:</strong> Remova relatórios com confirmação de segurança.</StyledInfoListItem>
          <StyledInfoListItem>📅 <strong>Período:</strong> Defina o período de análise (mensal ou anual).</StyledInfoListItem>
          <StyledInfoListItem>📤 <strong>Exportação:</strong> Exporte relatórios em PDF ou Excel.</StyledInfoListItem>
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
