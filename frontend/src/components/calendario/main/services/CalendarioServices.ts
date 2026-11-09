import { useQuery } from '@tanstack/react-query';
import { list } from '@/services/crudService';
import { useAuth } from '@/hooks/useAuth';
import type { CalendarioData, CalendarioTransacao } from '../types/CalendarioTypes';

interface ApiTransacao {
  id: string;
  description: string;
  amount: number | string;
  type: string;
  date: string;
  status?: string | null;
  categoryName?: string | null;
  categoryColor?: string | null;
  accountName?: string | null;
}

function apiToTransacao(t: ApiTransacao): CalendarioTransacao {
  return {
    id: t.id,
    description: t.description,
    amount: Number(t.amount) || 0,
    type: t.type,
    date: t.date,
    status: t.status ?? null,
    categoryName: t.categoryName ?? null,
    categoryColor: t.categoryColor ?? null,
    accountName: t.accountName ?? null,
  };
}

export function calendarioService() {
  const { userId } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['calendario', userId],
    queryFn: async () => {
      const transacoes = await list('transactions');
      const lista: ApiTransacao[] = Array.isArray(transacoes) ? transacoes : (transacoes?.data || []);
      const data: CalendarioData = { transacoes: lista.map(apiToTransacao) };
      return data;
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  return { data, isLoading };
}
