'use client';

import type { EstoqueItem } from '../../main/types/EstoqueTypes';
import type { EstoqueTermometroProps } from '../types/EstoqueTermometroTypes';
import { calcularTermometro } from '../utils/EstoqueTermometroUtils';
import {
  StyledTermometroCard,
  StyledTermometroHeader,
  StyledTitulo,
  StyledSubtitulo,
  StyledTermometro,
  StyledBarra,
  StyledTrilhoGradient,
  StyledEnchimento,
  StyledMarcador,
  StyledMarcadorPonto,
  StyledPercentual,
  StyledEscala,
  StyledEscalaItem,
  StyledInfo,
  StyledPill,
  StyledPillDot,
  StyledPillNum,
  StyledTextoPill,
} from '../styles/EstoqueTermometroStyles';

export default function EstoqueTermometroComp({
  itens,
  getStatusCor,
  getStatusLabel,
}: EstoqueTermometroProps) {
  const lista = itens || [];
  const {
    totalItens,
    itensOk,
    itensBaixos,
    itensCriticos,
    mediaSaude,
    cor,
    labelStatus,
  } = calcularTermometro(lista);

  return (
    <StyledTermometroCard>
      <StyledTermometroHeader>
        <StyledTitulo>🌡️ Termômetro da Dispensa</StyledTitulo>
        <StyledSubtitulo>
          {totalItens === 0
            ? 'Nenhum item cadastrado'
            : `${totalItens} item${totalItens !== 1 ? 's' : ''} • status: ${labelStatus}`}
        </StyledSubtitulo>
      </StyledTermometroHeader>

      <StyledTermometro>
        <StyledBarra>
          <StyledTrilhoGradient />
          <StyledEnchimento $cor={cor} style={{ width: `${mediaSaude}%` }} />
          <StyledMarcador $cor={cor} $pos={mediaSaude}>
            <StyledMarcadorPonto $cor={cor} />
          </StyledMarcador>
        </StyledBarra>
        <StyledPercentual $cor={cor}>{mediaSaude}%</StyledPercentual>
      </StyledTermometro>

      <StyledEscala>
        <StyledEscalaItem $cor="#ef4444" $ativo={mediaSaude < 30}>Crítico</StyledEscalaItem>
        <StyledEscalaItem $cor="#f59e0b" $ativo={mediaSaude >= 30 && mediaSaude < 70}>Atenção</StyledEscalaItem>
        <StyledEscalaItem $cor="#10b981" $ativo={mediaSaude >= 70}>Saudável</StyledEscalaItem>
      </StyledEscala>

      <StyledInfo>
        <StyledPill $bg="rgba(16, 185, 129, 0.1)" $border="rgba(16, 185, 129, 0.25)" $bgHover="rgba(16, 185, 129, 0.16)">
          <StyledPillDot $cor="#10b981" />
          <StyledPillNum $cor="#10b981">{itensOk}</StyledPillNum>
          <StyledTextoPill>OK</StyledTextoPill>
        </StyledPill>
        <StyledPill $bg="rgba(245, 158, 11, 0.1)" $border="rgba(245, 158, 11, 0.25)" $bgHover="rgba(245, 158, 11, 0.16)">
          <StyledPillDot $cor="#f59e0b" />
          <StyledPillNum $cor="#f59e0b">{itensBaixos}</StyledPillNum>
          <StyledTextoPill>Baixo</StyledTextoPill>
        </StyledPill>
        <StyledPill $bg="rgba(239, 68, 68, 0.1)" $border="rgba(239, 68, 68, 0.25)" $bgHover="rgba(239, 68, 68, 0.16)">
          <StyledPillDot $cor="#ef4444" />
          <StyledPillNum $cor="#ef4444">{itensCriticos}</StyledPillNum>
          <StyledTextoPill>Crítico</StyledTextoPill>
        </StyledPill>
      </StyledInfo>
    </StyledTermometroCard>
  );
}