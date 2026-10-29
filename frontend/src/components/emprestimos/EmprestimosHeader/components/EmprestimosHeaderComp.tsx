'use client';

import type { EmprestimosHeaderProps } from '../types/EmprestimosHeaderTypes';
import {
  StyledEmprestimosHeader,
  StyledEmprestimosTitle,
  StyledEmprestimosSubtitle,
  StyledButton,
  StyledInfoButton,
} from '../styles/EmprestimosHeaderStyles';

export default function EmprestimosHeaderComp({ onAbrirInfo, onAbrirModalNovo }: EmprestimosHeaderProps) {
  return (
    <StyledEmprestimosHeader>
      <div>
        <StyledEmprestimosTitle>
          Empréstimos
          <StyledInfoButton title="Informações sobre a página" onClick={onAbrirInfo}>
            ℹ️
          </StyledInfoButton>
        </StyledEmprestimosTitle>
        <StyledEmprestimosSubtitle>Gerencie empréstimos feitos e recebidos</StyledEmprestimosSubtitle>
      </div>
      <StyledButton $variant="primary" onClick={onAbrirModalNovo}>
        + Nova Emprestimo
      </StyledButton>
    </StyledEmprestimosHeader>
  );
}
