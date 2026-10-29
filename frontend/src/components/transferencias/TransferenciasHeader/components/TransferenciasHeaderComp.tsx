'use client';
import type { TransferenciasHeaderProps } from '../types/TransferenciasHeaderTypes';
import { StyledHeader, StyledTitle, StyledSubtitle, StyledButton, StyledInfoButton } from '../styles/TransferenciasHeaderStyles';
export default function TransferenciasHeaderComp({ onAbrirInfo, onAbrirModalNovo }: TransferenciasHeaderProps) {
  return <StyledHeader><div><StyledTitle>Transferências<StyledInfoButton title="Sobre" onClick={onAbrirInfo}>ℹ️</StyledInfoButton></StyledTitle><StyledSubtitle>Transfira dinheiro entre suas contas</StyledSubtitle></div><StyledButton $variant="primary" onClick={onAbrirModalNovo}>+ Nova Transferência</StyledButton></StyledHeader>;
}
