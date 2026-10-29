import { recentTransactionsService } from '../services/RecentTransactionsServices';
import { useTheme } from '@/context/theme/ThemeContext';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const ICON_MAP: Record<string, string> = {
  cart: '🛒',
  cash: '💰',
  car: '🚗',
  tv: '📺',
  briefcase: '💼',
};

const TYPE_SIGNS: Record<string, string> = {
  income: '+',
  expense: '-',
};

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useRecentTransactions() {
  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = recentTransactionsService();
  const theme = useTheme();

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  function getIcon(icon: string): string {
    return ICON_MAP[icon] || '📌';
  }

  function getTransactionSign(type: string): string {
    return TYPE_SIGNS[type] || '-';
  }

  function formatAmount(amount: number): string {
    return Math.abs(amount).toFixed(2);
  }

  return {
    state: {
      data: service.data,
      isLoading: service.isLoading,
    },
    helpers: {
      getIcon,
      getTransactionSign,
      formatAmount,
    },
    theme,
  };
}