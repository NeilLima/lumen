import { useQuery } from '@tanstack/react-query';
import { list } from '@/services/crudService';
import { useAuth } from '@/hooks/useAuth';
import type { DashboardApiResponse } from '@/types/dashboard.types';
import type { AlertsData } from '../types/AlertsTypes';

const EMPTY: AlertsData = { alerts: [] };

export function alertsService() {
  const { userId } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', 'alerts', userId],
    queryFn: () => list('dashboard'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const dashboard = data as DashboardApiResponse | undefined;

  return { data: dashboard?.alerts ? { alerts: dashboard.alerts } : EMPTY, isLoading };
}