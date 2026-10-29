import { useQuery } from '@tanstack/react-query';
import { list } from '@/services/crudService';
import { useAuth } from '@/hooks/useAuth';
import type { DashboardApiResponse } from '@/types/dashboard.types';
import type { RecentTransactionsData } from '../types/RecentTransactionsTypes';

const EMPTY: RecentTransactionsData = { transactions: [] };

export function recentTransactionsService() {
  const { userId } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', 'transactions', userId],
    queryFn: () => list('dashboard'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const dashboard = data as DashboardApiResponse | undefined;

  return { data: dashboard?.transactions ? { transactions: dashboard.transactions } : EMPTY, isLoading };
}