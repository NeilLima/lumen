'use client';
import type { ContasResumoProps } from '../types/ContasResumoTypes';
import { StyledResumoGrid, StyledResumoCard, StyledResumoIcon, StyledResumoLabel, StyledResumoValue } from '../styles/ContasResumoStyles';
const CARDS = [
  { icon: '💰', label: 'Saldo Total', color: '#10b981', bg: 'rgba(16,185,129,0.15)' },
  { icon: '🏦', label: 'Contas Ativas', color: '#8b5cf6', bg: 'rgba(139,92,246,0.15)' },
  { icon: '📊', label: 'Total de Contas', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
  { icon: '🏆', label: 'Maior Saldo', color: '#3b82f6', bg: 'rgba(59,130,246,0.15)' },
];
export default function ContasResumoComp({ resumo, formatarValor }: ContasResumoProps) {
  const vals = ['R$ ' + formatarValor(resumo.totalSaldo), String(resumo.contasAtivas), String(resumo.quantidade), resumo.maiorSaldo ? 'R$ ' + formatarValor(resumo.maiorSaldo.saldo) : 'N/A'];
  return <StyledResumoGrid>{CARDS.map((c, i) => <StyledResumoCard key={i} $accentColor={c.color}><StyledResumoIcon $color={c.color} $bg={c.bg}>{c.icon}</StyledResumoIcon><StyledResumoLabel>{c.label}</StyledResumoLabel><StyledResumoValue>{vals[i]}</StyledResumoValue></StyledResumoCard>)}</StyledResumoGrid>;
}
