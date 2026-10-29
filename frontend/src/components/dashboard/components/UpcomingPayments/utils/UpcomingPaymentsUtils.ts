import { upcomingPaymentsService } from '../services/UpcomingPaymentsServices';
import { useTheme } from '@/context/theme/ThemeContext';

export function useUpcomingPayments() {
  const service = upcomingPaymentsService();
  const theme = useTheme();

  function getDayFromDate(date: string): string {
    return date.split(' ')[0];
  }

  function getMonthFromDate(date: string): string {
    return date.split(' ')[1] || '';
  }

  return {
    state: { data: service.data, isLoading: service.isLoading },
    helpers: { getDayFromDate, getMonthFromDate },
    theme,
  };
}