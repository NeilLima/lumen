'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { list, create, update, remove } from '@/services/crudService';
import { useAuth } from '@/hooks/useAuth';

export interface ApiProduct {
  id: string;
  name: string;
  category: string;
  unit?: string | null;
  local?: string | null;
  price?: number | string | null;
  installments?: number | null;
}

export function useProdutosService() {
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  const { data: products, isLoading: loadingProducts } = useQuery({
    queryKey: ['produtos', userId],
    queryFn: () => list('products'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const criarMutation = useMutation({
    mutationFn: (data: Record<string, unknown>) => create('products', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['produtos', userId] });
    },
  });

  const atualizarMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      update('products', id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['produtos', userId] });
    },
  });

  const excluirMutation = useMutation({
    mutationFn: (id: string) => remove('products', id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['produtos', userId] });
    },
  });

  return {
    data: products,
    isLoading: loadingProducts,
    criar: criarMutation.mutateAsync,
    atualizar: atualizarMutation.mutateAsync,
    excluir: excluirMutation.mutateAsync,
    isSaving: criarMutation.isPending || atualizarMutation.isPending,
  };
}