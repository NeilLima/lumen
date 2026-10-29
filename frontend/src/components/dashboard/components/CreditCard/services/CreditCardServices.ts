import { useQuery } from '@tanstack/react-query';
import { list } from '@/services/crudService';
import { useAuth } from '@/hooks/useAuth';
import type { DashboardApiResponse } from '@/types/dashboard.types';
import type { CreditCardData } from '../types/CreditCardTypes';

const EMPTY_CARD: CreditCardData = {
  id: '',
  name: 'Nenhum cartão cadastrado',
  bank: '—',
  limitUsed: 0,
  limitTotal: 0,
  currentInvoice: 0,
  dueDate: '—',
};

export function creditCardService() {
  const { userId } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', 'creditCard', userId],
    queryFn: () => list('dashboard'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const dashboard = data as DashboardApiResponse | undefined;

  return { data: dashboard?.creditCard ?? EMPTY_CARD, isLoading };
}