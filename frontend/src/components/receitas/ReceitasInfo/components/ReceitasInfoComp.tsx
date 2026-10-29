'use client';

import type { ReceitasInfoProps } from '../types/ReceitasInfoTypes';
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
} from '../styles/ReceitasInfoStyles';

export default function ReceitasInfoComp({
  modalInfoAberto,
  onFecharInfo,
}: ReceitasInfoProps) {
  return (
    <StyledInfoOverlay $visible={modalInfoAberto} onClick={onFecharInfo}>
      <StyledInfoModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>Sobre a Página de Receitas</StyledModalTitle>
            <StyledModalClose
              onClick={onFecharInfo}
              data-testid="receitas-info-fechar-x"
            >
              ✕
            </StyledModalClose>
        </StyledModalHeader>

        <StyledInfoIcon>💰</StyledInfoIcon>
        <StyledInfoTitle>Gerencie suas fontes de renda</StyledInfoTitle>
        <StyledInfoText>
          A página de Receitas permite que você cadastre, edite e acompanhe todas as suas fontes de renda
          em um único lugar. Mantenha seu controle financeiro sempre atualizado.
        </StyledInfoText>

        <StyledInfoList>
          <StyledInfoListItem>📊 <strong>Cards de Resumo:</strong> Acompanhe o total recebido, pendente, atrasado e a média das suas receitas.</StyledInfoListItem>
          <StyledInfoListItem>🔍 <strong>Pesquisa e Filtros:</strong> Encontre receitas específicas por nome, categoria, conta ou status.</StyledInfoListItem>
          <StyledInfoListItem>👁️ <strong>Ver Detalhes:</strong> Clique no ícone de olho para ver todas as informações de uma receita.</StyledInfoListItem>
          <StyledInfoListItem>✏️ <strong>Editar:</strong> Atualize os dados de qualquer receita a qualquer momento.</StyledInfoListItem>
          <StyledInfoListItem>🗑️ <strong>Excluir:</strong> Remova receitas com confirmação de segurança.</StyledInfoListItem>
          <StyledInfoListItem>📅 <strong>Recorrência:</strong> Defina se a receita é única, semanal, mensal ou anual.</StyledInfoListItem>
          <StyledInfoListItem>💳 <strong>Múltiplas Contas:</strong> Associe cada receita a uma conta bancária específica.</StyledInfoListItem>
        </StyledInfoList>

        <StyledModalActions>
          <StyledButton
            $variant="primary"
            onClick={onFecharInfo}
            data-testid="receitas-info-entendi"
          >
            Entendi
          </StyledButton>
        </StyledModalActions>
      </StyledInfoModal>
    </StyledInfoOverlay>
  );
}