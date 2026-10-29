'use client';

import type { EmprestimosInfoProps } from '../types/EmprestimosInfoTypes';
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
} from '../styles/EmprestimosInfoStyles';

export default function EmprestimosInfoComp({
  modalInfoAberto,
  onFecharInfo,
}: EmprestimosInfoProps) {
  return (
    <StyledInfoOverlay $visible={modalInfoAberto} onClick={onFecharInfo}>
      <StyledInfoModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>Sobre a Página de Empréstimos</StyledModalTitle>
          <StyledModalClose onClick={onFecharInfo}>✕</StyledModalClose>
        </StyledModalHeader>

        <StyledInfoIcon>🏦</StyledInfoIcon>
        <StyledInfoTitle>Gerencie empréstimos feitos e recebidos</StyledInfoTitle>
        <StyledInfoText>
          A página de Empréstimos permite que você gerencie todos os seus empréstimos
          em um único lugar. Mantenha seu controle financeiro sempre atualizado.
        </StyledInfoText>

        <StyledInfoList>
          <StyledInfoListItem>📊 <strong>Cards de Resumo:</strong> Acompanhe o total de empréstimos, valor total, atrasado e quitado.</StyledInfoListItem>
          <StyledInfoListItem>🔍 <strong>Pesquisa e Filtros:</strong> Encontre empréstimos específicos por nome, situação ou tipo.</StyledInfoListItem>
          <StyledInfoListItem>👁️ <strong>Ver Detalhes:</strong> Clique no ícone de olho para ver todas as informações de um empréstimo.</StyledInfoListItem>
          <StyledInfoListItem>✏️ <strong>Editar:</strong> Atualize os dados de qualquer empréstimo a qualquer momento.</StyledInfoListItem>
          <StyledInfoListItem>🗑️ <strong>Excluir:</strong> Remova empréstimos com confirmação de segurança.</StyledInfoListItem>
          <StyledInfoListItem>📈 <strong>Progresso de Parcelas:</strong> Acompanhe o percentual de parcelas pagas de cada empréstimo.</StyledInfoListItem>
          <StyledInfoListItem>⚡ <strong>Situação:</strong> Saiba se o empréstimo está em dia, atrasado ou quitado.</StyledInfoListItem>
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
