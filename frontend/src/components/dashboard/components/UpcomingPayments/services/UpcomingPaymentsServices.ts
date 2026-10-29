import { useQuery } from '@tanstack/react-query';
import { list } from '@/services/crudService';
import { useAuth } from '@/hooks/useAuth';
import type { DashboardApiResponse } from '@/types/dashboard.types';
import type { UpcomingPaymentsData } from '../types/UpcomingPaymentsTypes';

const EMPTY: UpcomingPaymentsData = { payments: [] };

export function upcomingPaymentsService() {
  const { userId } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', 'payments', userId],
    queryFn: () => list('dashboard'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const dashboard = data as DashboardApiResponse | undefined;

  return { data: dashboard?.payments ? { payments: dashboard.payments } : EMPTY, isLoading };
}