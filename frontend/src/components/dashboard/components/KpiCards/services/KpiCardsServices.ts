import { useQuery } from '@tanstack/react-query';
import { list } from '@/services/crudService';
import { useAuth } from '@/hooks/useAuth';
import type { DashboardApiResponse } from '@/types/dashboard.types';
import type { KpiCardsData, KpiCard } from '../types/KpiCardsTypes';

export function kpiCardsService() {
  const { userId } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', 'kpis', userId],
    queryFn: () => list('dashboard'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const dashboard = data as DashboardApiResponse | undefined;

  const kpiData: KpiCardsData = {
    cards: [
      buildCard('1', '📊', '#8b5cf6', 'rgba(139, 92, 246, 0.1)', 'Saldo Total', dashboard?.kpis.saldoTotal ?? 0, 'em relação ao mês anterior'),
      buildCard('2', '📈', '#10b981', 'rgba(16, 185, 129, 0.1)', 'Receitas', dashboard?.kpis.receitasMes ?? 0, 'este mês'),
      buildCard('3', '📉', '#ef4444', 'rgba(239, 68, 68, 0.1)', 'Despesas', dashboard?.kpis.despesasMes ?? 0, 'este mês'),
      buildCard('4', '🏦', '#f59e0b', 'rgba(245, 158, 11, 0.1)', 'Economia', dashboard?.kpis.economia ?? 0, 'em relação ao mês anterior'),
    ],
  };

  return { data: kpiData, isLoading };
}

function buildCard(
  id: string,
  icon: string,
  iconColor: string,
  iconBg: string,
  title: string,
  amount: number,
  trendText: string,
): KpiCard {
  const formatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount);
  const trend: 'up' | 'down' = amount >= 0 ? 'up' : 'down';
  const percentage = amount === 0 ? 0 : 12.5;
  return { id, icon, iconColor, iconBg, title, value: formatted, percentage, trend, trendText };
}