'use client';

import type { CategoriasHeaderProps } from '../types/CategoriasHeaderTypes';
import {
  StyledCategoriasHeader,
  StyledCategoriasTitle,
  StyledCategoriasSubtitle,
  StyledButton,
  StyledInfoButton,
} from '../styles/CategoriasHeaderStyles';

export default function CategoriasHeaderComp({ onAbrirInfo, onAbrirModalNovo }: CategoriasHeaderProps) {
  return (
    <StyledCategoriasHeader>
      <div>
        <StyledCategoriasTitle>
          Categorias
          <StyledInfoButton title="Informações sobre a página" onClick={onAbrirInfo}>
            ℹ️
          </StyledInfoButton>
        </StyledCategoriasTitle>
        <StyledCategoriasSubtitle>Organize suas categorias financeiras</StyledCategoriasSubtitle>
      </div>
      <StyledButton $variant="primary" onClick={onAbrirModalNovo}>
        + Nova Categoria
      </StyledButton>
    </StyledCategoriasHeader>
  );
}
