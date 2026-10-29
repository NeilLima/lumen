'use client';

import type { CartoesResumoProps } from '../types/CartoesResumoTypes';
import {
  StyledResumoGrid,
  StyledResumoCard,
  StyledResumoIcon,
  StyledResumoLabel,
  StyledResumoValue,
} from '../styles/CartoesResumoStyles';

const CARD_DATA = [
  { icon: '💳', label: 'Limite Total', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)' },
  { icon: '📊', label: 'Limite Utilizado', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' },
  { icon: '✅', label: 'Limite Disponível', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' },
  { icon: '🏦', label: 'Cartões Ativos', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)' },
];

export default function CartoesResumoComp({ resumo, formatarValor }: CartoesResumoProps) {
  const values = [
    formatarValor(resumo.totalLimite),
    formatarValor(resumo.totalUtilizado),
    formatarValor(resumo.totalDisponivel),
    String(resumo.quantidade),
  ];

  return (
    <StyledResumoGrid>
      {CARD_DATA.map((card, i) => (
        <StyledResumoCard key={i} $accentColor={card.color}>
          <StyledResumoIcon $color={card.color} $bg={card.bg}>
            {card.icon}
          </StyledResumoIcon>
          <StyledResumoLabel>{card.label}</StyledResumoLabel>
          <StyledResumoValue>{values[i]}</StyledResumoValue>
        </StyledResumoCard>
      ))}
    </StyledResumoGrid>
  );
}