import { useState, useCallback } from 'react';
import { useCartoes } from './CartoesUtils';

// ============================================
// 1️⃣ VARIÁVEIS
// ============================================

// ============================================
// 2️⃣ ESTADOS
// ============================================
export function useCartoesMain() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const cartoes = useCartoes();

  // ============================================
  // 3️⃣ OBJETOS
  // ============================================

  // ============================================
  // 4️⃣ FUNÇÕES
  // ============================================
  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const handleEditarFromDetalhe = useCallback((cartao: typeof cartoes.state.detalheCartao) => {
    if (cartao) {
      cartoes.actions.fecharDetalhe();
      cartoes.actions.abrirModalEditar(cartao);
    }
  }, [cartoes.actions]);

  return {
    state: {
      sidebarOpen,
      ...cartoes.state,
    },
    actions: {
      toggleSidebar,
      closeSidebar,
      ...cartoes.actions,
      handleEditarFromDetalhe,
    },
    helpers: cartoes.helpers,
  };
}