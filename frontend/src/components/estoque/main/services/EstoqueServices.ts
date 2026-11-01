import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { list, create, update, remove } from '@/services/crudService';
import type { EstoqueItem, EstoqueData, EstoqueFormData } from '../types/EstoqueTypes';

function calcularResumo(itens: EstoqueItem[]): EstoqueData {
  const categorias = [...new Set(itens.map(i => i.categoria))].sort();
  const locais = [...new Set(itens.map(i => i.localCompra))].sort();
  return { itens, categorias, locais };
}

export function estoqueService() {
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['estoque'],
    queryFn: async () => {
      const r = await list('estoque');
      return calcularResumo(r as EstoqueItem[]);
    },
    staleTime: 5 * 60 * 1000,
  });

  const criar = useMutation({
    mutationFn: async (fd: EstoqueFormData) =>
      create('estoque', fd as unknown as Record<string, unknown>),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['estoque'] }); },
  });

  const atualizar = useMutation({
    mutationFn: async ({ id, fd }: { id: string; fd: EstoqueFormData }) =>
      update('estoque', id, fd as unknown as Record<string, unknown>),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['estoque'] }); },
  });

  const excluir = useMutation({
    mutationFn: async (id: string) => remove('estoque', id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['estoque'] }); },
  });

  return {
    data,
    isLoading,
    criar: criar.mutateAsync,
    atualizar: atualizar.mutateAsync,
    excluir: excluir.mutateAsync,
    isSaving: criar.isPending || atualizar.isPending,
  };
}