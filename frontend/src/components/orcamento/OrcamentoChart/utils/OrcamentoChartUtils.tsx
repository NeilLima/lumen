import type { OrcamentoChartProps } from '../types/OrcamentoChartTypes';

const STATUS_COLORS: Record<string, string> = {
  dentro: '#10b981',
  atencao: '#f59e0b',
  estourado: '#ef4444',
};

const STATUS_LABELS: Record<string, string> = {
  dentro: 'Dentro',
  atencao: 'Atenção',
  estourado: 'Estourado',
};

export function useOrcamentoChart(props: OrcamentoChartProps) {
  const { categorias } = props;

  const statusCount = { dentro: 0, atencao: 0, estourado: 0 };
  categorias.forEach(c => { statusCount[c.status as keyof typeof statusCount]++; });
  const statusData = [
    { name: 'Dentro', value: statusCount.dentro, color: STATUS_COLORS.dentro },
    { name: 'Atenção', value: statusCount.atencao, color: STATUS_COLORS.atencao },
    { name: 'Estourado', value: statusCount.estourado, color: STATUS_COLORS.estourado },
  ].filter(item => item.value > 0);

  const gastoLimiteData = categorias.map(c => ({
    nome: c.categoria.length > 10 ? c.categoria.substring(0, 9) + '..' : c.categoria,
    limite: c.limite,
    gasto: c.gasto,
  }));

  const totalLimite = categorias.reduce((acc, c) => acc + c.limite, 0);
  const totalGasto = categorias.reduce((acc, c) => acc + c.gasto, 0);
  const comparativoData = [
    { name: 'Limite', value: totalLimite, color: '#8b5cf6' },
    { name: 'Gasto', value: totalGasto, color: '#ef4444' },
  ];

  const pctGasto = totalLimite > 0 ? Math.round((totalGasto / totalLimite) * 100) : 0;
  const gaugeData = [{ name: 'Usado', value: pctGasto, fill: pctGasto > 90 ? '#ef4444' : pctGasto > 70 ? '#f59e0b' : '#10b981' }];

  return {
    state: { statusData, gastoLimiteData, comparativoData, gaugeData },
  };
}