import { creditCardService } from '../services/CreditCardServices';
import { useTheme } from '@/context/theme/ThemeContext';

export function useCreditCard() {
  const service = creditCardService();
  const theme = useTheme();

  function getLimitPercentage(used: number, total: number): number {
    return (used / total) * 100;
  }

  return {
    state: { data: service.data, isLoading: service.isLoading },
    helpers: { getLimitPercentage },
    theme,
  };
}