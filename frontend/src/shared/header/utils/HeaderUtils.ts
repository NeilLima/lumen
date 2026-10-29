import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { headerService } from '../services/HeaderServices';
import { logoutService } from '@/services/logoutService';
import { useTheme } from '@/context/theme/ThemeContext';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useHeader() {
  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = headerService();
  const logout = logoutService();
  const theme = useTheme();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  const toggleDropdown = useCallback(
    () => setDropdownOpen((prev) => !prev),
    [],
  );

  const closeDropdown = useCallback(() => setDropdownOpen(false), []);

  const handleLogout = useCallback(() => {
    logout.clearSession();
    router.replace(logout.routes.login);
  }, [logout, router]);

  return {
    state: {
      data: service.data,
      isLoading: service.isLoading,
      dropdownOpen,
    },
    actions: { toggleDropdown, closeDropdown, handleLogout },
    theme,
  };
}