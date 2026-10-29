import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { list, create, update, remove } from '@/services/crudService';
import { useAuth } from '@/hooks/useAuth';
import type { Income, IncomesData, CreateIncomeInput, UpdateIncomeInput } from '../types/IncomesTypes';

const EMPTY_INCOMES_DATA: IncomesData = { incomes: [], total: 0 };

export function incomesService() {
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['incomes', userId],
    queryFn: () => list('incomes'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const incomes = data as IncomesData | undefined;

  const createMutation = useMutation({
    mutationFn: (payload: CreateIncomeInput) => create('incomes', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incomes', userId] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateIncomeInput }) =>
      update('incomes', id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incomes', userId] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (id: string) => remove('incomes', id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incomes', userId] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  return {
    data: incomes ?? EMPTY_INCOMES_DATA,
    isLoading,
    error,
    createIncome: createMutation.mutateAsync,
    updateIncome: updateMutation.mutateAsync,
    deleteIncome: removeMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: removeMutation.isPending,
  };
}