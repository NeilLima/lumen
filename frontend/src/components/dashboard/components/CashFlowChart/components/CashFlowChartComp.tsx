'use client';

import { useTheme } from '@/context/theme/ThemeContext';
import { useCashFlowChart } from '../utils/CashFlowChartUtils';
import {
  StyledChartCard, StyledChartHeader, StyledChartTitle, StyledChartControls,
  StyledFilterButton, StyledSelect, StyledChartWrapper, StyledYAxis,
  StyledYAxisLabel, StyledChartContainer, StyledGridLine, StyledChartLegend,
  StyledLegendItem, StyledLegendDot, StyledXAxisLabels, StyledXAxisLabel,
  StyledTooltip, StyledTooltipTitle, StyledTooltipRow, StyledTooltipDot,
  StyledTooltipValue, StyledHoverArea,
} from '../styles/CashFlowChartStyles';

export default function CashFlowChartComp() {
  const { state, constants, helpers, actions } = useCashFlowChart();
  const theme = useTheme();
  const data = state.data?.cashFlow;

  if (!data) return null;

  const chart = helpers.getChartData(data);

  return (
    <StyledChartCard theme={theme}>
      <StyledChartHeader>
        <StyledChartTitle theme={theme}>Fluxo de Caixa</StyledChartTitle>
        <StyledChartControls>
          <StyledFilterButton theme={theme} $active>Receitas</StyledFilterButton>
          <StyledFilterButton theme={theme}>Despesas</StyledFilterButton>
          <StyledSelect theme={theme}>
            <option>Mês</option>
          </StyledSelect>
        </StyledChartControls>
      </StyledChartHeader>

      <StyledChartWrapper>
        <StyledYAxis>
          {constants.Y_AXIS_LABELS.map(label => (
            <StyledYAxisLabel key={label} theme={theme}>{label}</StyledYAxisLabel>
          ))}
        </StyledYAxis>

        <StyledChartContainer>
          <svg
            width="100%"
            height={constants.CHART_CONFIG.height}
            viewBox={`0 0 ${constants.CHART_CONFIG.width} ${constants.CHART_CONFIG.height}`}
            preserveAspectRatio="none"
            onMouseLeave={() => actions.setTooltip(null)}
          >
            <defs>
              <linearGradient id="grad-income" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={constants.COLORS.income} stopOpacity="0.3" />
                <stop offset="100%" stopColor={constants.COLORS.income} stopOpacity="0" />
              </linearGradient>
              <linearGradient id="grad-expense" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={constants.COLORS.expense} stopOpacity="0.3" />
                <stop offset="100%" stopColor={constants.COLORS.expense} stopOpacity="0" />
              </linearGradient>
            </defs>

            {chart.gridLines.map((line, i) => (
              <StyledGridLine key={i} theme={theme} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} />
            ))}

            <path d={chart.expenseArea} fill="url(#grad-expense)" />
            <path d={chart.expensePath} fill="none" stroke={constants.COLORS.expense} strokeWidth="2" />

            <path d={chart.incomeArea} fill="url(#grad-income)" />
            <path d={chart.incomePath} fill="none" stroke={constants.COLORS.income} strokeWidth="2" />

            {chart.incomePoints.map((p, i) => (
              <circle key={`inc-${i}`} cx={p.x} cy={p.y} r="3" fill={constants.COLORS.income} />
            ))}
            {chart.expensePoints.map((p, i) => (
              <circle key={`exp-${i}`} cx={p.x} cy={p.y} r="3" fill={constants.COLORS.expense} />
            ))}

            {chart.hoverAreas.map(area => (
              <StyledHoverArea
                key={area.key}
                x={area.x}
                y={area.y}
                width={area.width}
                height={area.height}
                onMouseEnter={area.onMouseEnter}
              />
            ))}

            {state.tooltip && (
              <line
                x1={(state.tooltip.x / 100) * constants.CHART_CONFIG.width}
                y1={constants.CHART_CONFIG.padY}
                x2={(state.tooltip.x / 100) * constants.CHART_CONFIG.width}
                y2={constants.CHART_CONFIG.height - constants.CHART_CONFIG.padY}
                stroke={theme.primary + '4D'}
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            )}
          </svg>

          {state.tooltip && (
            <StyledTooltip theme={theme} $x={`${state.tooltip.x}%`} $y={state.tooltip.y}>
              <StyledTooltipTitle theme={theme}>{state.tooltip.month}</StyledTooltipTitle>
              <StyledTooltipRow theme={theme}>
                <StyledTooltipDot $color={constants.COLORS.income} />
                <span>Receitas</span>
                <StyledTooltipValue $color={constants.COLORS.income}>
                  {helpers.formatCurrency(state.tooltip.income)}
                </StyledTooltipValue>
              </StyledTooltipRow>
              <StyledTooltipRow theme={theme}>
                <StyledTooltipDot $color={constants.COLORS.expense} />
                <span>Despesas</span>
                <StyledTooltipValue $color={constants.COLORS.expense}>
                  {helpers.formatCurrency(state.tooltip.expense)}
                </StyledTooltipValue>
              </StyledTooltipRow>
            </StyledTooltip>
          )}
        </StyledChartContainer>
      </StyledChartWrapper>

      <StyledXAxisLabels>
        {data.labels.map(label => (
          <StyledXAxisLabel key={label} theme={theme}>{label}</StyledXAxisLabel>
        ))}
      </StyledXAxisLabels>

      <StyledChartLegend>
        <StyledLegendItem theme={theme}>
          <StyledLegendDot $color={constants.COLORS.income} />
          <span>Receitas</span>
        </StyledLegendItem>
        <StyledLegendItem theme={theme}>
          <StyledLegendDot $color={constants.COLORS.expense} />
          <span>Despesas</span>
        </StyledLegendItem>
      </StyledChartLegend>
    </StyledChartCard>
  );
}