import { useQuery } from '@tanstack/react-query';
import type { HeaderData } from '../types/HeaderTypes';

const MOCK_HEADER_DATA: HeaderData = {
  greeting: 'Olá, Victor! 👋',
  subtitle: 'Aqui está o resumo da sua vida financeira.',
  searchPlaceholder: 'Buscar transações, categorias, contas...',
  newTransactionText: 'Nova Transação',
  notificationCount: 3,
  userName: 'Victor Lima',
  userAvatar: 'https://i.pravatar.cc/150?img=12',
};

export function headerService() {
  const { data, isLoading } = useQuery({
    queryKey: ['header'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 200));
      return MOCK_HEADER_DATA;
    },
    staleTime: 5 * 60 * 1000,
  });

  return { data, isLoading };
}