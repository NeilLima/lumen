import { goalsService } from '../services/GoalsServices';
import { useTheme } from '@/context/theme/ThemeContext';

const ICON_MAP: Record<string, string> = { airplane: '✈️', house: '🏠' };

export function useGoals() {
  const service = goalsService();
  const theme = useTheme();

  function getIcon(icon: string): string {
    return ICON_MAP[icon] || '🎯';
  }

  return {
    state: { data: service.data, isLoading: service.isLoading },
    helpers: { getIcon },
    theme,
  };
}