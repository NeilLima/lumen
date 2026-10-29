import { useQuery } from '@tanstack/react-query';
import { list } from '@/services/crudService';
import { useAuth } from '@/hooks/useAuth';
import type { DashboardApiResponse } from '@/types/dashboard.types';
import type { CategoryChartData } from '../types/CategoryChartTypes';

const EMPTY_CATEGORY_DATA: CategoryChartData = { categories: [], total: 0 };

export function categoryChartService() {
  const { userId } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', 'categories', userId],
    queryFn: () => list('dashboard'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const dashboard = data as DashboardApiResponse | undefined;

  return {
    data: dashboard?.categories ? { categories: dashboard.categories, total: dashboard.kpis?.despesasMes ?? 0 } : EMPTY_CATEGORY_DATA,
    isLoading,
  };
}