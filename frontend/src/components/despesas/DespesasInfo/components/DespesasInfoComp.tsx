'use client';

import type { DespesasInfoProps } from '../types/DespesasInfoTypes';
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
} from '../styles/DespesasInfoStyles';

export default function DespesasInfoComp({
  modalInfoAberto,
  onFecharInfo,
}: DespesasInfoProps) {
  return (
    <StyledInfoOverlay $visible={modalInfoAberto} onClick={onFecharInfo}>
      <StyledInfoModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>Sobre a Página de Despesas</StyledModalTitle>
          <StyledModalClose onClick={onFecharInfo}>✕</StyledModalClose>
        </StyledModalHeader>

        <StyledInfoIcon>💸</StyledInfoIcon>
        <StyledInfoTitle>Controle todos os seus gastos</StyledInfoTitle>
        <StyledInfoText>
          A página de Despesas permite que você cadastre, edite e acompanhe todos os seus gastos
          em um único lugar. Mantenha seu controle financeiro sempre atualizado.
        </StyledInfoText>

        <StyledInfoList>
          <StyledInfoListItem>📊 <strong>Cards de Resumo:</strong> Acompanhe o total pago, pendente, atrasado e a média das suas despesas.</StyledInfoListItem>
          <StyledInfoListItem>🔍 <strong>Pesquisa e Filtros:</strong> Encontre despesas específicas por nome, categoria, conta, status ou prioridade.</StyledInfoListItem>
          <StyledInfoListItem>👁️ <strong>Ver Detalhes:</strong> Clique no ícone de olho para ver todas as informações de uma despesa.</StyledInfoListItem>
          <StyledInfoListItem>✏️ <strong>Editar:</strong> Atualize os dados de qualquer despesa a qualquer momento.</StyledInfoListItem>
          <StyledInfoListItem>🗑️ <strong>Excluir:</strong> Remova despesas com confirmação de segurança.</StyledInfoListItem>
          <StyledInfoListItem>💳 <strong>Cartão e Parcelas:</strong> Associe despesas a cartões e divida em parcelas.</StyledInfoListItem>
          <StyledInfoListItem>⚡ <strong>Prioridade:</strong> Defina a prioridade de cada despesa (baixa, média ou alta).</StyledInfoListItem>
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