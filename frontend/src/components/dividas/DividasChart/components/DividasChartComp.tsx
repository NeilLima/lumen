'use client';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import type { DividasChartProps } from '../types/DividasChartTypes';
import { useDividasChart } from '../utils/DividasChartUtils';
import { StyledGrid, StyledCard, StyledTitle, StyledContainer, StyledLegend, StyledItem, StyledColor } from '../styles/DividasChartStyles';
export default function DividasChartComp(props: DividasChartProps) {
  const { state } = useDividasChart(props);
  return (<StyledGrid>
    <StyledCard><StyledTitle>Distribuicao por Situacao</StyledTitle><StyledContainer><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={state.statusData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">{state.statusData.map((e, i) => <Cell key={i} fill={e.color} stroke="rgba(255,255,255,0.05)" />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></StyledContainer>
    <StyledLegend>{state.statusData.map((x, i) => <StyledItem key={i}><StyledColor $color={x.color} />{x.name}: {x.value}</StyledItem>)}</StyledLegend></StyledCard>
    <StyledCard><StyledTitle>Valores por Divida</StyledTitle><StyledContainer><ResponsiveContainer width="100%" height="100%"><BarChart data={state.valoresData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" /><XAxis dataKey="nome" stroke="#6b6b7b" fontSize={9} tickLine={false} /><YAxis stroke="#6b6b7b" fontSize={10} tickLine={false} /><Tooltip /><Bar dataKey="valor" radius={[4, 4, 0, 0]} maxBarSize={20}>{state.valoresData.map((e, i) => <Cell key={i} fill={e.cor} />)}</Bar></BarChart></ResponsiveContainer></StyledContainer></StyledCard>
    <StyledCard><StyledTitle>Comparativo: Total vs Atrasado</StyledTitle><StyledContainer><ResponsiveContainer width="100%" height="100%"><BarChart data={state.comparativoData} layout="vertical" margin={{ top: 5, right: 10, left: 5, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} /><XAxis type="number" stroke="#6b6b7b" fontSize={10} tickLine={false} /><YAxis type="category" dataKey="name" stroke="#6b6b7b" fontSize={11} tickLine={false} width={60} /><Tooltip /><Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={20}>{state.comparativoData.map((e, i) => <Cell key={i} fill={e.color} />)}</Bar></BarChart></ResponsiveContainer></StyledContainer></StyledCard>
    <StyledCard><StyledTitle>Resumo</StyledTitle><StyledContainer><div style={{ textAlign: 'center', color: '#a0a0b0', fontSize: '13px' }}><p style={{ color: '#fff', fontSize: '24px', fontWeight: 700, margin: '0 0 8px' }}>{props.dividas.length}</p><p>dividas registradas</p><p style={{ marginTop: '12px' }}>Total: R$ {props.formatarValor(props.dividas.reduce((a, d) => a + d.valor, 0))}</p></div></StyledContainer></StyledCard>
  </StyledGrid>);
}
