import { sidebarService } from '../services/SidebarServices';
import { logoutService } from '@/services/logoutService';
import { useTheme } from '@/context/theme/ThemeContext';
import { useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================
const LOGO_TEXT = 'Lumen';
const LOGO_SUBTITLE = 'Gestão Financeira Pessoal';

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useSidebar() {
  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = sidebarService();
  const logout = logoutService();
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  function getIconName(iconKey: string): string {
    const ICON_MAP: Record<string, string> = {
      house: '🏠',
      'arrow-down-left': '💰',
      'arrow-up-right': '📉',
      'arrows-left-right': '🔄',
      'credit-card': '💳',
      bank: '🏦',
      target: '🎯',
      'chart-pie': '📊',
      'warning-circle': '⚠️',
      'hand-coins': '🤝',
      'trending-up': '📈',
      tag: '📋',
      'file-text': '📄',
      calendar: '📅',
      'squares-four': '🏷️',
      bell: '🔔',
      gear: '⚙️',
      question: '❓',
      person: '👤',
    };
    return ICON_MAP[iconKey] || '📌';
  }

  const navigate = useCallback((path: string) => {
    if (path) {
      router.push(path);
    }
  }, [router]);

  const handleLogout = useCallback(() => {
    logout.clearSession();
    router.replace(logout.routes.login);
  }, [logout, router]);

  function isActive(path: string): boolean {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  }

  return {
    state: {
      data: service.data,
      isLoading: service.isLoading,
    },
    constants: {
      LOGO_TEXT,
      LOGO_SUBTITLE,
    },
    helpers: {
      getIconName,
      navigate,
      isActive,
      handleLogout,
    },
    theme,
  };
}