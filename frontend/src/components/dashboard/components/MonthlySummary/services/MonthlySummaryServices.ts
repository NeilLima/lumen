import { useQuery } from '@tanstack/react-query';
import { list } from '@/services/crudService';
import { useAuth } from '@/hooks/useAuth';
import type { DashboardApiResponse } from '@/types/dashboard.types';
import type { MonthlySummaryData } from '../types/MonthlySummaryTypes';

const EMPTY: MonthlySummaryData = {
  highestIncome: { description: '—', amount: 0 },
  highestExpense: { description: '—', amount: 0 },
  topCategory: { description: '—', amount: 0 },
  monthlySavings: 0,
  totalTransactions: 0,
  dailyAverage: 0,
};

export function monthlySummaryService() {
  const { userId } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', 'monthlySummary', userId],
    queryFn: () => list('dashboard'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const dashboard = data as DashboardApiResponse | undefined;

  if (!dashboard?.monthlySummary) {
    return { data: EMPTY, isLoading };
  }

  const summary = dashboard.monthlySummary;
  const monthlyData: MonthlySummaryData = {
    highestIncome: summary.highestIncome ?? { description: '—', amount: 0 },
    highestExpense: summary.highestExpense ?? { description: '—', amount: 0 },
    topCategory: summary.topCategory ?? { description: '—', amount: 0 },
    monthlySavings: summary.monthlySavings,
    totalTransactions: summary.totalTransactions,
    dailyAverage: summary.dailyAverage,
  };

  return { data: monthlyData, isLoading };
}