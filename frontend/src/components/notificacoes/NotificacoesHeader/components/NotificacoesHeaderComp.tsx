'use client';

import type { NotificacoesHeaderProps } from '../types/NotificacoesHeaderTypes';
import {
  StyledNotificacoesHeader,
  StyledNotificacoesTitle,
  StyledNotificacoesSubtitle,
  StyledButton,
  StyledInfoButton,
} from '../styles/NotificacoesHeaderStyles';

export default function NotificacoesHeaderComp({ onAbrirInfo, onAbrirModalNovo }: NotificacoesHeaderProps) {
  return (
    <StyledNotificacoesHeader>
      <div>
        <StyledNotificacoesTitle>
          Notificações
          <StyledInfoButton title="Informações sobre a página" onClick={onAbrirInfo}>
            ℹ️
          </StyledInfoButton>
        </StyledNotificacoesTitle>
        <StyledNotificacoesSubtitle>Acompanhe seus alertas e lembretes</StyledNotificacoesSubtitle>
      </div>
      <StyledButton $variant="primary" onClick={onAbrirModalNovo}>
        + Nova Notificacao
      </StyledButton>
    </StyledNotificacoesHeader>
  );
}
