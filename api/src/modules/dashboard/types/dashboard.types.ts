/* eslint-disable prettier/prettier */
export interface DashboardKpis {
  saldoTotal: number;
  receitasMes: number;
  despesasMes: number;
  economia: number;
}

export interface DashboardSummary {
  user: { id: string; email: string; firstName: string; lastName: string };
  kpis: DashboardKpis;
  cashFlow: { labels: string[]; incomeData: number[]; expenseData: number[] };
  categories: { id: string; name: string; color: string; amount: number; percentage: number }[];
  transactions: Record<string, unknown>[];
  monthlySummary: {
    highestIncome: { description: string; amount: number } | null;
    highestExpense: { description: string; amount: number } | null;
    topCategory: { description: string; amount: number } | null;
    monthlySavings: number;
    totalTransactions: number;
    dailyAverage: number;
  };
  creditCard: null;
  payments: unknown[];
  goals: unknown[];
  alerts: unknown[];
}
