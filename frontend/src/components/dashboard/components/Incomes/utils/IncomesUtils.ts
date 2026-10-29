import { incomesService } from '../services/IncomesServices';
import { useTheme } from '@/context/theme/ThemeContext';
import type { Income } from '../types/IncomesTypes';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useIncomes() {
  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = incomesService();
  const theme = useTheme();

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  function formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  function getTotal(incomes: Income[]): number {
    return incomes.reduce((sum, inc) => sum + inc.amount, 0);
  }

  return {
    state: {
      incomes: service.data.incomes,
      total: service.data.total,
      isLoading: service.isLoading,
      error: service.error,
    },
    helpers: {
      formatCurrency,
      formatDate,
      getTotal,
      createIncome: service.createIncome,
      updateIncome: service.updateIncome,
      deleteIncome: service.deleteIncome,
      isCreating: service.isCreating,
      isUpdating: service.isUpdating,
      isDeleting: service.isDeleting,
    },
    theme,
  };
}