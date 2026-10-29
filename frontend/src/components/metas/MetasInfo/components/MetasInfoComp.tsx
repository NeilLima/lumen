'use client';
import type { MetasInfoProps } from '../types/MetasInfoTypes';
import { StyledInfoOverlay, StyledInfoModal, StyledModalHeader, StyledModalTitle, StyledModalClose, StyledInfoIcon, StyledInfoTitle, StyledInfoText, StyledInfoList, StyledInfoListItem, StyledModalActions, StyledButton } from '../styles/MetasInfoStyles';

export default function MetasInfoComp({ modalInfoAberto, onFecharInfo }: MetasInfoProps) {
  return (
    <StyledInfoOverlay $visible={modalInfoAberto} onClick={onFecharInfo}>
      <StyledInfoModal onClick={e => e.stopPropagation()}>
        <StyledModalHeader>
          <StyledModalTitle>Sobre a Página de Metas</StyledModalTitle>
          <StyledModalClose onClick={onFecharInfo}>✕</StyledModalClose>
        </StyledModalHeader>
        <StyledInfoIcon>🎯</StyledInfoIcon>
        <StyledInfoTitle>Defina e acompanhe suas metas</StyledInfoTitle>
        <StyledInfoText>A página de Metas Financeiras permite que você defina objetivos financeiros e acompanhe seu progresso em tempo real.</StyledInfoText>
        <StyledInfoList>
          <StyledInfoListItem>🎯 <strong>Criar Metas:</strong> Defina objetivos como reserva de emergência, viagem, casa própria, etc.</StyledInfoListItem>
          <StyledInfoListItem>📊 <strong>Progresso Visual:</strong> Acompanhe o percentual concluído com barras de progresso.</StyledInfoListItem>
          <StyledInfoListItem>🏷️ <strong>Categorias:</strong> Organize suas metas por categoria (Reserva, Viagem, Educação, etc.).</StyledInfoListItem>
          <StyledInfoListItem>📅 <strong>Prazos:</strong> Defina datas limite para alcançar cada meta.</StyledInfoListItem>
          <StyledInfoListItem>🎯 <strong>Prioridades:</strong> Defina prioridades (Alta, Média, Baixa) para focar no que é mais importante.</StyledInfoListItem>
          <StyledInfoListItem>👁️ <strong>Acompanhamento:</strong> Visualize detalhes e progresso de cada meta individualmente.</StyledInfoListItem>
        </StyledInfoList>
        <StyledModalActions>
          <StyledButton onClick={onFecharInfo}>Entendi</StyledButton>
        </StyledModalActions>
      </StyledInfoModal>
    </StyledInfoOverlay>
  );
}
