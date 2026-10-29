import type { DividasChartProps } from '../types/DividasChartTypes';
const SC: Record<string, string> = { em_dia: '#3b82f6', atrasada: '#ef4444', quitada: '#10b981' };
export function useDividasChart(props: DividasChartProps) {
  const { dividas } = props;
  const c = { em_dia: 0, atrasada: 0, quitada: 0 }; dividas.forEach(d => { c[d.situacao as keyof typeof c]++; });
  const sd = [{ name: 'Em Dia', value: c.em_dia, color: SC.em_dia }, { name: 'Atrasada', value: c.atrasada, color: SC.atrasada }, { name: 'Quitada', value: c.quitada, color: SC.quitada }].filter(x => x.value > 0);
  const vd = dividas.map(d => ({ nome: d.nome.length > 10 ? d.nome.substring(0, 9) + '..' : d.nome, valor: d.valor, cor: SC[d.situacao] }));
  const tl = dividas.reduce((a, d) => a + d.valor, 0); const ta = dividas.filter(d => d.situacao === 'atrasada').reduce((a, d) => a + d.valor, 0);
  const cd = [{ name: 'Total', value: tl, color: '#8b5cf6' }, { name: 'Atrasado', value: ta, color: '#ef4444' }];
  return { state: { statusData: sd, valoresData: vd, comparativoData: cd } };
}
