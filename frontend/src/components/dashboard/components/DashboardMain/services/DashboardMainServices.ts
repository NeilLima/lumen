import { useQuery } from '@tanstack/react-query';
import type { DashboardMainData } from '../types/DashboardMainTypes';

const MOCK_DATA: DashboardMainData = {
  userName: 'Victor',
};

export function dashboardMainService() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboardMain'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return MOCK_DATA;
    },
    staleTime: 5 * 60 * 1000,
  });

  return { data, isLoading };
}