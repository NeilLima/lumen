import { kpiCardsService } from '../services/KpiCardsServices';
import { useTheme } from '@/context/theme/ThemeContext';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const TREND_COLORS = { up: '#10b981', down: '#ef4444' };
const TREND_ICONS = { up: '↑', down: '↓' };

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useKpiCards() {
  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = kpiCardsService();
  const theme = useTheme();

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  function getTrendColor(trend: string): string {
    return TREND_COLORS[trend as keyof typeof TREND_COLORS] || '#a0a0b0';
  }

  function getTrendIcon(trend: string): string {
    return TREND_ICONS[trend as keyof typeof TREND_ICONS] || '→';
  }

  function getPercentage(percentage: number): number {
    return Math.abs(percentage);
  }

  return {
    state: {
      data: service.data,
      isLoading: service.isLoading,
    },
    helpers: { getTrendColor, getTrendIcon, getPercentage },
    theme,
  };
}