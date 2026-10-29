'use client';

import type { AjudaInfoProps } from '../types/AjudaInfoTypes';
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
} from '../styles/AjudaInfoStyles';

export default function AjudaInfoComp({
  modalInfoAberto,
  onFecharInfo,
}: AjudaInfoProps) {
  return (
    <StyledInfoOverlay $visible={modalInfoAberto} onClick={onFecharInfo}>
      <StyledInfoModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>Sobre a Página de Ajuda e Suporte</StyledModalTitle>
          <StyledModalClose onClick={onFecharInfo}>✕</StyledModalClose>
        </StyledModalHeader>

        <StyledInfoIcon>❓</StyledInfoIcon>
        <StyledInfoTitle>Encontre respostas e tire dúvidas</StyledInfoTitle>
        <StyledInfoText>
          A página de Ajuda e Suporte permite que você gerencie todos os seus artigos
          em um único lugar. Mantenha seu controle financeiro sempre atualizado.
        </StyledInfoText>

        <StyledInfoList>
          <StyledInfoListItem>📊 <strong>Cards de Resumo:</strong> Acompanhe o total de artigos, publicados, rascunhos e categorias.</StyledInfoListItem>
          <StyledInfoListItem>🔍 <strong>Pesquisa e Filtros:</strong> Encontre artigos específicos por título, categoria ou status.</StyledInfoListItem>
          <StyledInfoListItem>👁️ <strong>Ver Detalhes:</strong> Clique no ícone de olho para ver todas as informações de um artigo.</StyledInfoListItem>
          <StyledInfoListItem>✏️ <strong>Editar:</strong> Atualize os dados de qualquer artigo a qualquer momento.</StyledInfoListItem>
          <StyledInfoListItem>🗑️ <strong>Excluir:</strong> Remova artigos com confirmação de segurança.</StyledInfoListItem>
          <StyledInfoListItem>❓ <strong>Categorias:</strong> Primeiros passos, despesas, receitas, cartões e mais.</StyledInfoListItem>
          <StyledInfoListItem>📝 <strong>Status:</strong> Saiba se o artigo está publicado ou em rascunho.</StyledInfoListItem>
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
