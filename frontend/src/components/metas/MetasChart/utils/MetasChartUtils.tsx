import type { MetasChartProps } from '../types/MetasChartTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const STATUS_COLORS: Record<string, string> = {
  em_andamento: '#3b82f6',
  concluida: '#10b981',
  pausada: '#f59e0b',
};

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useMetasChart(props: MetasChartProps) {
  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const { metas, resumo, evolucaoMensal } = props.data;

  const statusData = [
    { name: 'Concluída', value: resumo.totalConcluidas, color: STATUS_COLORS.concluida },
    { name: 'Em Andamento', value: resumo.totalEmAndamento, color: STATUS_COLORS.em_andamento },
    { name: 'Pausada', value: resumo.totalMetas - resumo.totalConcluidas - resumo.totalEmAndamento, color: STATUS_COLORS.pausada },
  ].filter(item => item.value > 0);

  const metasProgresso = metas.map(m => {
    const progresso = m.valorAlvo > 0 ? Math.round((m.valorAtual / m.valorAlvo) * 100) : 0;
    const color = progresso >= 100 ? '#10b981' : progresso >= 50 ? '#3b82f6' : '#f59e0b';
    return { nome: m.nome.length > 12 ? m.nome.substring(0, 11) + '..' : m.nome, progresso, color };
  });

  const progressRanges = [
    { name: '0-25%', count: metas.filter(m => m.valorAlvo > 0 && (m.valorAtual / m.valorAlvo) * 100 <= 25).length, color: '#ef4444' },
    { name: '26-50%', count: metas.filter(m => m.valorAlvo > 0 && (m.valorAtual / m.valorAlvo) * 100 > 25 && (m.valorAtual / m.valorAlvo) * 100 <= 50).length, color: '#f59e0b' },
    { name: '51-75%', count: metas.filter(m => m.valorAlvo > 0 && (m.valorAtual / m.valorAlvo) * 100 > 50 && (m.valorAtual / m.valorAlvo) * 100 <= 75).length, color: '#3b82f6' },
    { name: '76-100%', count: metas.filter(m => m.valorAlvo > 0 && (m.valorAtual / m.valorAlvo) * 100 > 75).length, color: '#10b981' },
  ];

  return {
    state: {
      statusData,
      metasProgresso,
      progressRanges,
      evolucaoMensal,
    },
  };
}