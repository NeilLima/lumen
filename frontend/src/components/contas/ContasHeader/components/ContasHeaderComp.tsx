'use client';
import type { ContasHeaderProps } from '../types/ContasHeaderTypes';
import { StyledHeader, StyledTitle, StyledSubtitle, StyledButton, StyledInfoButton } from '../styles/ContasHeaderStyles';
export default function ContasHeaderComp({ onAbrirInfo, onAbrirModalNovo }: ContasHeaderProps) {
  return <StyledHeader><div><StyledTitle>Contas Bancárias<StyledInfoButton onClick={onAbrirInfo} data-testid="contas-info">ℹ️</StyledInfoButton></StyledTitle><StyledSubtitle>Gerencie suas contas e carteiras</StyledSubtitle></div><StyledButton $variant="primary" onClick={onAbrirModalNovo} data-testid="contas-nova-conta">+ Nova Conta</StyledButton></StyledHeader>;
}
