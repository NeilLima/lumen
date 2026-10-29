'use client';

import type { ConfiguracoesResumoProps } from '../types/ConfiguracoesResumoTypes';
import {
  StyledResumoGrid,
  StyledResumoCard,
  StyledResumoIcon,
  StyledResumoLabel,
  StyledResumoValue,
} from '../styles/ConfiguracoesResumoStyles';

export default function ConfiguracoesResumoComp({ resumo, formatarValor }: ConfiguracoesResumoProps) {
  return (
    <StyledResumoGrid>
      <StyledResumoCard $accentColor="#8b5cf6">
        <StyledResumoIcon $color="#8b5cf6" $bg="rgba(139, 92, 246, 0.1)">📊</StyledResumoIcon>
        <StyledResumoLabel>Total de Configurações</StyledResumoLabel>
        <StyledResumoValue>{resumo.totalConfiguracoes}</StyledResumoValue>
      </StyledResumoCard>

      <StyledResumoCard $accentColor="#3b82f6">
        <StyledResumoIcon $color="#3b82f6" $bg="rgba(59, 130, 246, 0.1)">🎨</StyledResumoIcon>
        <StyledResumoLabel>Aparência</StyledResumoLabel>
        <StyledResumoValue>{resumo.totalAparencia}</StyledResumoValue>
      </StyledResumoCard>

      <StyledResumoCard $accentColor="#ef4444">
        <StyledResumoIcon $color="#ef4444" $bg="rgba(239, 68, 68, 0.1)">🔒</StyledResumoIcon>
        <StyledResumoLabel>Segurança</StyledResumoLabel>
        <StyledResumoValue>{resumo.totalSeguranca}</StyledResumoValue>
      </StyledResumoCard>

      <StyledResumoCard $accentColor="#f59e0b">
        <StyledResumoIcon $color="#f59e0b" $bg="rgba(245, 158, 11, 0.1)">🔔</StyledResumoIcon>
        <StyledResumoLabel>Notificações</StyledResumoLabel>
        <StyledResumoValue>{resumo.totalNotificacoesConfig}</StyledResumoValue>
      </StyledResumoCard>

    </StyledResumoGrid>
  );
}
