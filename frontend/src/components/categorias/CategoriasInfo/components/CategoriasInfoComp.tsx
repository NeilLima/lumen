'use client';

import type { CategoriasInfoProps } from '../types/CategoriasInfoTypes';
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
} from '../styles/CategoriasInfoStyles';

export default function CategoriasInfoComp({
  modalInfoAberto,
  onFecharInfo,
}: CategoriasInfoProps) {
  return (
    <StyledInfoOverlay $visible={modalInfoAberto} onClick={onFecharInfo}>
      <StyledInfoModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>Sobre a Página de Categorias</StyledModalTitle>
          <StyledModalClose onClick={onFecharInfo}>✕</StyledModalClose>
        </StyledModalHeader>

        <StyledInfoIcon>🏷️</StyledInfoIcon>
        <StyledInfoTitle>Organize suas categorias financeiras</StyledInfoTitle>
        <StyledInfoText>
          A página de Categorias permite que você gerencie todos os seus categorias
          em um único lugar. Mantenha seu controle financeiro sempre atualizado.
        </StyledInfoText>

        <StyledInfoList>
          <StyledInfoListItem>📊 <strong>Cards de Resumo:</strong> Acompanhe o total de categorias, despesas, receitas e ambos.</StyledInfoListItem>
          <StyledInfoListItem>🔍 <strong>Pesquisa e Filtros:</strong> Encontre categorias específicas por nome ou tipo.</StyledInfoListItem>
          <StyledInfoListItem>👁️ <strong>Ver Detalhes:</strong> Clique no ícone de olho para ver todas as informações de uma categoria.</StyledInfoListItem>
          <StyledInfoListItem>✏️ <strong>Editar:</strong> Atualize os dados de qualquer categoria a qualquer momento.</StyledInfoListItem>
          <StyledInfoListItem>🗑️ <strong>Excluir:</strong> Remova categorias com confirmação de segurança.</StyledInfoListItem>
          <StyledInfoListItem>🏷️ <strong>Ícone e Cor:</strong> Personalize cada categoria com ícone e cor.</StyledInfoListItem>
          <StyledInfoListItem>⚡ <strong>Tipo:</strong> Defina se a categoria é para despesa, receita ou ambos.</StyledInfoListItem>
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
