import { monthlySummaryService } from '../services/MonthlySummaryServices';
import type { MonthlySummaryData } from '../types/MonthlySummaryTypes';
import { useTheme } from '@/context/theme/ThemeContext';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const SUMMARY_ITEMS = [
  { icon: '📈', label: 'Maior receita', key: 'highestIncome' },
  { icon: '📉', label: 'Maior despesa', key: 'highestExpense' },
  { icon: '🏷️', label: 'Categoria mais gasta', key: 'topCategory' },
  { icon: '💰', label: 'Economia do mês', key: 'monthlySavings' },
  { icon: '📊', label: 'Estatísticas', key: 'statistics' },
];

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useMonthlySummary() {
  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = monthlySummaryService();
  const theme = useTheme();

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  function getSummaryItems(data: MonthlySummaryData) {
    return [
      { icon: '📈', label: 'Maior receita', value: `R$ ${data.highestIncome.amount.toFixed(2)}` },
      { icon: '📉', label: 'Maior despesa', value: `R$ ${data.highestExpense.amount.toFixed(2)}` },
      { icon: '🏷️', label: 'Categoria mais gasta', value: `R$ ${data.topCategory.amount.toFixed(2)}` },
      { icon: '💰', label: 'Economia do mês', value: `R$ ${data.monthlySavings.toFixed(2)}` },
      { icon: '📊', label: 'Estatísticas', value: `${data.totalTransactions} transações • Média: R$ ${data.dailyAverage.toFixed(2)}` },
    ];
  }

  return {
    state: {
      data: service.data,
      isLoading: service.isLoading,
    },
    helpers: {
      getSummaryItems,
    },
    theme,
  };
}