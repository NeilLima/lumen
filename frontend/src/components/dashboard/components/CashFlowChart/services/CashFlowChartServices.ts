import { useQuery } from '@tanstack/react-query';
import { list } from '@/services/crudService';
import { useAuth } from '@/hooks/useAuth';
import type { DashboardApiResponse } from '@/types/dashboard.types';
import type { CashFlowChartData } from '../types/CashFlowChartTypes';

const EMPTY_CASH_FLOW: CashFlowChartData = {
  cashFlow: { labels: [], incomeData: [], expenseData: [] },
};

export function cashFlowChartService() {
  const { userId } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', 'cashFlow', userId],
    queryFn: () => list('dashboard'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const dashboard = data as DashboardApiResponse | undefined;

  return { data: dashboard?.cashFlow ? { cashFlow: dashboard.cashFlow } : EMPTY_CASH_FLOW, isLoading };
}