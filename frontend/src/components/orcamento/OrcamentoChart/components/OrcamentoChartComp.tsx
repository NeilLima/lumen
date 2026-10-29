'use client';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, RadialBarChart, RadialBar } from 'recharts';
import type { OrcamentoChartProps } from '../types/OrcamentoChartTypes';
import { useOrcamentoChart } from '../utils/OrcamentoChartUtils';
import { StyledChartsGrid, StyledChartCard, StyledChartTitle, StyledChartContainer, StyledLegendContainer, StyledLegendItem, StyledLegendColor } from '../styles/OrcamentoChartStyles';

export default function OrcamentoChartComp(props: OrcamentoChartProps) {
  const { state } = useOrcamentoChart(props);
  return (
    <StyledChartsGrid>
      <StyledChartCard>
        <StyledChartTitle>Distribuição por Status</StyledChartTitle>
        <StyledChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={state.statusData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                {state.statusData.map((entry: { color: string }, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(255,255,255,0.05)" />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </StyledChartContainer>
        <StyledLegendContainer>
          {state.statusData.map((item: { name: string; color: string; value: number }) => (
            <StyledLegendItem key={item.name}>
              <StyledLegendColor $color={item.color} />
              {item.name}: {item.value}
            </StyledLegendItem>
          ))}
        </StyledLegendContainer>
      </StyledChartCard>

      <StyledChartCard>
        <StyledChartTitle>Gasto vs Limite</StyledChartTitle>
        <StyledChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={state.gastoLimiteData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="nome" stroke="#6b6b7b" fontSize={9} tickLine={false} />
              <YAxis stroke="#6b6b7b" fontSize={10} tickLine={false} />
              <Tooltip />
              <Bar dataKey="limite" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={16} />
              <Bar dataKey="gasto" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </StyledChartContainer>
      </StyledChartCard>

      <StyledChartCard>
        <StyledChartTitle>Comparativo Total</StyledChartTitle>
        <StyledChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={state.comparativoData} layout="vertical" margin={{ top: 5, right: 10, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" stroke="#6b6b7b" fontSize={10} tickLine={false} />
              <YAxis type="category" dataKey="name" stroke="#6b6b7b" fontSize={11} tickLine={false} width={50} />
              <Tooltip />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={20}>
                {state.comparativoData.map((entry: { color: string }, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </StyledChartContainer>
      </StyledChartCard>

      <StyledChartCard>
        <StyledChartTitle>Percentual Utilizado</StyledChartTitle>
        <StyledChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart data={state.gaugeData} innerRadius="40%" outerRadius="90%" startAngle={180} endAngle={0}>
              <RadialBar dataKey="value" cornerRadius={8} background={{ fill: 'rgba(255,255,255,0.05)' }} />
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>
        </StyledChartContainer>
      </StyledChartCard>
    </StyledChartsGrid>
  );
}