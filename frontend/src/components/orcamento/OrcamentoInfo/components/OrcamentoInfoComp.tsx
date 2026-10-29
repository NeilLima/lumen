'use client';
import type { OrcamentoInfoProps } from '../types/OrcamentoInfoTypes';
import { StyledOverlay, StyledModal, StyledHeader, StyledTitle, StyledClose, StyledIcon, StyledInfoTitle, StyledText, StyledList, StyledItem, StyledActions, StyledButton } from '../styles/OrcamentoInfoStyles';
export default function OrcamentoInfoComp({ modalInfoAberto, onFecharInfo }: OrcamentoInfoProps) {
  return (
    <StyledOverlay $visible={modalInfoAberto} onClick={onFecharInfo}>
      <StyledModal onClick={e => e.stopPropagation()}>
        <StyledHeader><StyledTitle>Sobre o Orçamento</StyledTitle><StyledClose onClick={onFecharInfo}>✕</StyledClose></StyledHeader>
        <StyledIcon>📊</StyledIcon><StyledInfoTitle>Gerencie seus limites</StyledInfoTitle>
        <StyledText>Defina limites de gastos por categoria e acompanhe seu orçamento mensal.</StyledText>
        <StyledList>
          <StyledItem>📊 <strong>Limites:</strong> Defina um limite de gastos para cada categoria.</StyledItem>
          <StyledItem>🔍 <strong>Acompanhamento:</strong> Veja o percentual utilizado de cada categoria.</StyledItem>
          <StyledItem>🟢 <strong>Dentro:</strong> Gasto abaixo de 70% do limite.</StyledItem>
          <StyledItem>🟡 <strong>Atenção:</strong> Gasto entre 70% e 90% do limite.</StyledItem>
          <StyledItem>🔴 <strong>Estourado:</strong> Gasto acima de 90% do limite.</StyledItem>
          <StyledItem>📅 <strong>Mensal:</strong> Acompanhe mês a mês seus gastos por categoria.</StyledItem>
        </StyledList>
        <StyledActions><StyledButton onClick={onFecharInfo}>Entendi</StyledButton></StyledActions>
      </StyledModal>
    </StyledOverlay>
  );
}
