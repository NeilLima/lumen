import { categoryChartService } from '../services/CategoryChartServices';
import { useTheme } from '@/context/theme/ThemeContext';
import type { CategoryExpense } from '../types/CategoryChartTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useCategoryChart() {
  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = categoryChartService();
  const theme = useTheme();

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  function formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function getSegments(categories: CategoryExpense[]): string {
    return categories
      .map((cat, i) => {
        const startAngle = categories.slice(0, i).reduce((sum, c) => sum + c.percentage, 0);
        return `${cat.color} ${startAngle}% ${startAngle + cat.percentage}%`;
      })
      .join(', ');
  }

  function getDonutBackground(categories: CategoryExpense[]): string {
    if (categories.length === 0) {
      return 'conic-gradient(rgba(255, 255, 255, 0.08) 0% 100%)';
    }
    return `conic-gradient(${getSegments(categories)})`;
  }

  return {
    state: {
      data: service.data,
      isLoading: service.isLoading,
    },
    helpers: { formatCurrency, getSegments, getDonutBackground },
    theme,
  };
}