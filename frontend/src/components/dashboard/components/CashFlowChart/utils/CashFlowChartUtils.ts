import { useState } from 'react';
import { cashFlowChartService } from '../services/CashFlowChartServices';
import { useTheme } from '@/context/theme/ThemeContext';
import type { TooltipData } from '../types/CashFlowChartTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const Y_AXIS_LABELS = ['R$ 25k', 'R$ 20k', 'R$ 15k', 'R$ 10k', 'R$ 5k', 'R$ 0'];
const CHART_CONFIG = { width: 500, height: 200, padX: 10, padY: 10, max: 25000, min: 0 };

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useCashFlowChart() {
  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = cashFlowChartService();
  const theme = useTheme();
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const COLORS = { income: theme.success, expense: theme.danger };

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  function formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function toPoints(data: number[]) {
    if (data.length === 0) return [];
    const { width, height, padX, padY, max, min } = CHART_CONFIG;
    const range = max - min;
    const divisor = Math.max(data.length - 1, 1);
    return data.map((val, i) => ({
      x: padX + (i / divisor) * (width - padX * 2),
      y: height - padY - ((val - min) / range) * (height - padY * 2),
    }));
  }

  function buildPath(points: { x: number; y: number }[]): string {
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  }

  function buildArea(points: { x: number; y: number }[]): string {
    if (points.length === 0) return '';
    const { height, padY } = CHART_CONFIG;
    const path = buildPath(points);
    return `${path} L ${points[points.length - 1].x} ${height - padY} L ${points[0].x} ${height - padY} Z`;
  }

  function getGridLines() {
    const { height, padX, padY, width } = CHART_CONFIG;
    return Y_AXIS_LABELS.map((_, i) => ({
      x1: padX,
      y1: padY + (i / (Y_AXIS_LABELS.length - 1)) * (height - padY * 2),
      x2: width - padX,
      y2: padY + (i / (Y_AXIS_LABELS.length - 1)) * (height - padY * 2),
    }));
  }

  function getHoverAreas(labels: string[], incomeData: number[], expenseData: number[], incomePoints: { x: number; y: number }[], expensePoints: { x: number; y: number }[]) {
    if (labels.length === 0) return [];
    const { width, padX, height } = CHART_CONFIG;
    const barWidth = (width - padX * 2) / labels.length;
    const divisor = Math.max(labels.length - 1, 1);
    return labels.map((label, i) => {
      const x = padX + (i / divisor) * (width - padX * 2);
      return {
        key: `hover-${i}`,
        x: x - barWidth / 2,
        y: 0,
        width: barWidth,
        height,
        onMouseEnter: () => setTooltip({
          month: label,
          income: incomeData[i],
          expense: expenseData[i],
          x: (x / width) * 100,
          y: Math.min(incomePoints[i]?.y ?? 0, expensePoints[i]?.y ?? 0),
        }),
      };
    });
  }

  function getChartData(data: { labels: string[]; incomeData: number[]; expenseData: number[] }) {
    const incomePoints = toPoints(data.incomeData);
    const expensePoints = toPoints(data.expenseData);
    return {
      incomePoints,
      expensePoints,
      incomePath: buildPath(incomePoints),
      incomeArea: buildArea(incomePoints),
      expensePath: buildPath(expensePoints),
      expenseArea: buildArea(expensePoints),
      gridLines: getGridLines(),
      hoverAreas: getHoverAreas(data.labels, data.incomeData, data.expenseData, incomePoints, expensePoints),
    };
  }

  return {
    state: {
      data: service.data,
      isLoading: service.isLoading,
      tooltip,
    },
    constants: { Y_AXIS_LABELS, COLORS, CHART_CONFIG },
    helpers: { formatCurrency, getChartData },
    actions: { setTooltip },
    theme,
  };
}