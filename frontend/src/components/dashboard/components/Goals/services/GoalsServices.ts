import { useQuery } from '@tanstack/react-query';
import { list } from '@/services/crudService';
import { useAuth } from '@/hooks/useAuth';
import type { DashboardApiResponse } from '@/types/dashboard.types';
import type { GoalsData } from '../types/GoalsTypes';

const EMPTY: GoalsData = { goals: [] };

export function goalsService() {
  const { userId } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', 'goals', userId],
    queryFn: () => list('dashboard'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const dashboard = data as DashboardApiResponse | undefined;

  return { data: dashboard?.goals ? { goals: dashboard.goals } : EMPTY, isLoading };
}