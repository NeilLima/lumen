'use client';
import type { TransferenciasResumoProps } from '../types/TransferenciasResumoTypes';
import { StyledResumoGrid, StyledResumoCard, StyledResumoIcon, StyledResumoLabel, StyledResumoValue } from '../styles/TransferenciasResumoStyles';
const CARDS = [
  { icon: '💸', label: 'Total Transferido', color: '#8b5cf6', bg: 'rgba(139,92,246,0.15)' },
  { icon: '📊', label: 'Quantidade', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
  { icon: '📈', label: 'Média', color: '#10b981', bg: 'rgba(16,185,129,0.15)' },
  { icon: '🏆', label: 'Maior Transferência', color: '#3b82f6', bg: 'rgba(59,130,246,0.15)' },
];
export default function TransferenciasResumoComp({ resumo, formatarValor }: TransferenciasResumoProps) {
  const vals = [formatarValor(resumo.totalTransferido), String(resumo.quantidade), formatarValor(resumo.media), resumo.maiorTransferencia ? 'R$ ' + formatarValor(resumo.maiorTransferencia.valor) : 'N/A'];
  return <StyledResumoGrid>{CARDS.map((c, i) => <StyledResumoCard key={i} $accentColor={c.color}><StyledResumoIcon $color={c.color} $bg={c.bg}>{c.icon}</StyledResumoIcon><StyledResumoLabel>{c.label}</StyledResumoLabel><StyledResumoValue>{vals[i]}</StyledResumoValue></StyledResumoCard>)}</StyledResumoGrid>;
}
