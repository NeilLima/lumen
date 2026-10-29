import { useState } from 'react';
import { dashboardMainService } from '../services/DashboardMainServices';
import { useTheme } from '@/context/theme/ThemeContext';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useDashboardMain() {
  // ============================================
  // 3️⃣ OBJETOS
  // ============================================
  const service = dashboardMainService();
  const theme = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  function toggleSidebar() {
    setSidebarOpen(prev => !prev);
  }

  function closeSidebar() {
    setSidebarOpen(false);
  }

  return {
    state: {
      data: service.data,
      isLoading: service.isLoading,
      sidebarOpen,
    },
    actions: { toggleSidebar, closeSidebar },
    theme,
  };
}