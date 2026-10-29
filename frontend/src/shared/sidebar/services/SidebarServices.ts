import { useQuery } from '@tanstack/react-query';
import type { SidebarData } from '../types/SidebarTypes';

const MOCK_SIDEBAR_DATA: SidebarData = {
  sections: {
    financeiro: [
      { label: 'Dashboard', icon: 'house', active: true, path: '/' },
      { label: 'Receitas', icon: 'arrow-down-left', active: false, path: '/receitas' },
      { label: 'Despesas', icon: 'arrow-up-right', active: false, path: '/despesas' },
      { label: 'Transferências', icon: 'arrows-left-right', active: false, path: '/transferencias' },
      { label: 'Cartões de Crédito', icon: 'credit-card', active: false, path: '/cartoes' },
      { label: 'Contas Bancárias', icon: 'bank', active: false, path: '/contas' },
    ],
    planejamento: [
      { label: 'Metas Financeiras', icon: 'target', active: false, path: '/metas' },
      { label: 'Orçamento', icon: 'chart-pie', active: false, path: '/orcamento' },
      { label: 'Dívidas', icon: 'warning-circle', active: false, path: '/dividas' },
      { label: 'Empréstimos', icon: 'hand-coins', active: false, path: '/emprestimos' },
      { label: 'Investimentos', icon: 'trending-up', active: false, path: '/investimentos' },
      { label: 'Assinaturas', icon: 'tag', active: false, path: '/assinaturas' },
      { label: 'Estoque / Dispensa', icon: 'squares-four', active: false, path: '/estoque' },
      { label: 'Produtos', icon: 'tag', active: false, path: '/produtos' },
    ],
    relatorios: [
      { label: 'Relatórios', icon: 'file-text', active: false, path: '/relatorios' },
      { label: 'Calendário Financeiro', icon: 'calendar', active: false, path: '/calendario' },
    ],
    outros: [
      { label: 'Minha Conta', icon: 'person', active: false, path: '/conta' },
      { label: 'Categorias', icon: 'squares-four', active: false, path: '/categorias' },
      { label: 'Notificações', icon: 'bell', active: false, path: '/notificacoes' },
      { label: 'Configurações', icon: 'gear', active: false, path: '/configuracoes' },
      { label: 'Ajuda e Suporte', icon: 'question', active: false, path: '/ajuda' },
    ],
  },
  userName: 'Victor Lima',
  userPlan: 'Plano Premium',
  userInitial: 'V',
};

export function sidebarService() {
  const { data, isLoading } = useQuery({
    queryKey: ['sidebar'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return MOCK_SIDEBAR_DATA;
    },
    staleTime: 5 * 60 * 1000,
  });

  return { data, isLoading };
}