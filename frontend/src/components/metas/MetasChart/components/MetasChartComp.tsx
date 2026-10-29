'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area, RadialBarChart, RadialBar } from 'recharts';
import type { MetasChartProps } from '../types/MetasChartTypes';
import { useMetasChart } from '../utils/MetasChartUtils';
import CustomTooltip from './CustomTooltip';
import {
  StyledChartsGrid, StyledChartCard, StyledChartTitle,
  StyledChartContainer, StyledLegendContainer, StyledLegendItem, StyledLegendColor,
} from '../styles/MetasChartStyles';

export default function MetasChartComp(props: MetasChartProps) {
  const { state } = useMetasChart(props);

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
              <Tooltip content={CustomTooltip} />
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
        <StyledChartTitle>Evolução Mensal</StyledChartTitle>
        <StyledChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={state.evolucaoMensal} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="mes" stroke="#6b6b7b" fontSize={10} tickLine={false} />
              <YAxis stroke="#6b6b7b" fontSize={10} tickLine={false} />
              <Tooltip content={CustomTooltip} />
              <Area type="monotone" dataKey="depositado" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </StyledChartContainer>
      </StyledChartCard>

      <StyledChartCard>
        <StyledChartTitle>Progresso por Meta</StyledChartTitle>
        <StyledChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={state.metasProgresso} layout="vertical" margin={{ top: 5, right: 10, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" stroke="#6b6b7b" fontSize={10} tickLine={false} domain={[0, 100]} />
              <YAxis type="category" dataKey="nome" stroke="#6b6b7b" fontSize={9} tickLine={false} width={80} />
              <Tooltip content={CustomTooltip} />
              <Bar dataKey="progresso" radius={[0, 4, 4, 0]} maxBarSize={12}>
                {state.metasProgresso.map((entry: { color: string }, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </StyledChartContainer>
      </StyledChartCard>

      <StyledChartCard>
        <StyledChartTitle>Progresso por Faixa</StyledChartTitle>
        <StyledChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart data={state.progressRanges} innerRadius="30%" outerRadius="90%" startAngle={180} endAngle={0}>
              <RadialBar dataKey="count" cornerRadius={6} background={{ fill: 'rgba(255,255,255,0.05)' }}>
                {state.progressRanges.map((entry: { color: string }, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </RadialBar>
              <Tooltip content={CustomTooltip} />
            </RadialBarChart>
          </ResponsiveContainer>
        </StyledChartContainer>
        <StyledLegendContainer>
          {state.progressRanges.map((item: { name: string; color: string; count: number }) => (
            <StyledLegendItem key={item.name}>
              <StyledLegendColor $color={item.color} />
              {item.name}: {item.count}
            </StyledLegendItem>
          ))}
        </StyledLegendContainer>
      </StyledChartCard>
    </StyledChartsGrid>
  );
}