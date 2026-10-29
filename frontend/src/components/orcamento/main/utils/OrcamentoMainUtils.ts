import { useState, useCallback, useRef } from 'react';
import { useOrcamento } from './OrcamentoUtils';

export function useOrcamentoMain() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mostrarGraficos, setMostrarGraficos] = useState(false);
  const orcamento = useOrcamento();
  const graficosRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = useCallback(() => { setSidebarOpen(prev => !prev); }, []);
  const closeSidebar = useCallback(() => { setSidebarOpen(false); }, []);
  const handleEditarFromDetalhe = useCallback((cat: typeof orcamento.state.detalheCategoria) => {
    if (cat) { orcamento.actions.fecharDetalhe(); orcamento.actions.abrirModalEditar(cat); }
  }, [orcamento.actions]);

  const toggleGraficos = useCallback(() => {
    setMostrarGraficos(prev => {
      const novo = !prev;
      if (novo) {
        setTimeout(() => {
          graficosRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
      return novo;
    });
  }, []);

  const fecharGraficos = useCallback(() => {
    setMostrarGraficos(false);
  }, []);

  return {
    state: { sidebarOpen, mostrarGraficos, ...orcamento.state },
    actions: { toggleSidebar, closeSidebar, toggleGraficos, fecharGraficos, ...orcamento.actions, handleEditarFromDetalhe },
    helpers: orcamento.helpers,
    graficosRef,
  };
}