'use client';

import type { AjudaHeaderProps } from '../types/AjudaHeaderTypes';
import {
  StyledAjudaHeader,
  StyledAjudaTitle,
  StyledAjudaSubtitle,
  StyledButton,
  StyledInfoButton,
} from '../styles/AjudaHeaderStyles';

export default function AjudaHeaderComp({ onAbrirInfo, onAbrirModalNovo }: AjudaHeaderProps) {
  return (
    <StyledAjudaHeader>
      <div>
        <StyledAjudaTitle>
          Ajuda e Suporte
          <StyledInfoButton title="Informações sobre a página" onClick={onAbrirInfo}>
            ℹ️
          </StyledInfoButton>
        </StyledAjudaTitle>
        <StyledAjudaSubtitle>Encontre respostas e tire dúvidas</StyledAjudaSubtitle>
      </div>
      <StyledButton $variant="primary" onClick={onAbrirModalNovo}>
        + Nova Ajuda
      </StyledButton>
    </StyledAjudaHeader>
  );
}
