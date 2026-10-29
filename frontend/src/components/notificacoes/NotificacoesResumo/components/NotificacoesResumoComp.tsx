'use client';

import type { NotificacoesResumoProps } from '../types/NotificacoesResumoTypes';
import {
  StyledResumoGrid,
  StyledResumoCard,
  StyledResumoIcon,
  StyledResumoLabel,
  StyledResumoValue,
} from '../styles/NotificacoesResumoStyles';

export default function NotificacoesResumoComp({ resumo, formatarValor }: NotificacoesResumoProps) {
  return (
    <StyledResumoGrid>
      <StyledResumoCard $accentColor="#8b5cf6">
        <StyledResumoIcon $color="#8b5cf6" $bg="rgba(139, 92, 246, 0.1)">📊</StyledResumoIcon>
        <StyledResumoLabel>Total de Notificações</StyledResumoLabel>
        <StyledResumoValue>{resumo.totalNotificacoes}</StyledResumoValue>
      </StyledResumoCard>

      <StyledResumoCard $accentColor="#ef4444">
        <StyledResumoIcon $color="#ef4444" $bg="rgba(239, 68, 68, 0.1)">🔴</StyledResumoIcon>
        <StyledResumoLabel>Não Lidas</StyledResumoLabel>
        <StyledResumoValue>{resumo.totalNaoLidas}</StyledResumoValue>
      </StyledResumoCard>

      <StyledResumoCard $accentColor="#10b981">
        <StyledResumoIcon $color="#10b981" $bg="rgba(16, 185, 129, 0.1)">✅</StyledResumoIcon>
        <StyledResumoLabel>Lidas</StyledResumoLabel>
        <StyledResumoValue>{resumo.totalLidas}</StyledResumoValue>
      </StyledResumoCard>

      <StyledResumoCard $accentColor="#6b6b7b">
        <StyledResumoIcon $color="#6b6b7b" $bg="rgba(107, 107, 123, 0.1)">📦</StyledResumoIcon>
        <StyledResumoLabel>Arquivadas</StyledResumoLabel>
        <StyledResumoValue>{resumo.totalArquivadas}</StyledResumoValue>
      </StyledResumoCard>

    </StyledResumoGrid>
  );
}
