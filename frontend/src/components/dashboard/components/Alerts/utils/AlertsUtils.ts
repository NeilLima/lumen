import { alertsService } from '../services/AlertsServices';
import { useTheme } from '@/context/theme/ThemeContext';

const ICON_MAP: Record<string, string> = { warning: '⚠️', lightning: '⚡', target: '🎯', clipboard: '📋' };

export function useAlerts() {
  const service = alertsService();
  const theme = useTheme();

  function getIcon(icon: string): string {
    return ICON_MAP[icon] || '📌';
  }

  return {
    state: { data: service.data, isLoading: service.isLoading },
    helpers: { getIcon },
    theme,
  };
}