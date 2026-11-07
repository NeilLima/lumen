'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { list, create as crudCreate, update as crudUpdate, remove as crudRemove } from '@/services/crudService';
import { useAuth } from '@/hooks/useAuth';
import type { Compra, CompraResumo, ComprasData, CreateCompraPayload, CompraFilters } from '../types/ComprasTypes';

const KEY = ['compras'];

export async function fetchCompras(filters?: CompraFilters): Promise<Compra[]> {
  const params: Record<string, string> = {};
  if (filters?.pesquisa) params.pesquisa = filters.pesquisa;
  if (filters?.statusPagamento) params.statusPagamento = filters.statusPagamento;
  const data = await list('compras', params);
  return data;
}

export async function createCompra(payload: CreateCompraPayload): Promise<Compra> {
  const data = await crudCreate('compras', payload);
  return data;
}

export async function updateCompra(id: string, payload: Partial<CreateCompraPayload>): Promise<Compra> {
  const data = await crudUpdate('compras', id, payload);
  return data;
}

export function deleteCompra(id: string): Promise<void> {
  return crudRemove('compras', id);
}

export function useCompras(filters?: CompraFilters) {
  return useQuery({
    queryKey: [...KEY, filters],
    queryFn: () => fetchCompras(filters),
    staleTime: 5 * 60 * 1000,
  });
}

export function useCreateCompra() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createCompra,
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}

export function useUpdateCompra() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<CreateCompraPayload> }) => updateCompra(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}

export function useDeleteCompra() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteCompra,
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}

function calcularResumo(compras: Compra[]): CompraResumo {
  const total = compras.reduce((acc, c) => acc + (c.totalAmount || 0), 0);
  const pago = compras.filter(c => c.statusPagamento === 'pago').reduce((acc, c) => acc + (c.totalAmount || 0), 0);
  const pendente = compras.filter(c => c.statusPagamento === 'pendente').reduce((acc, c) => acc + (c.totalAmount || 0), 0);
  const parcelado = compras.filter(c => (c.parcels || 1) > 1).reduce((acc, c) => acc + (c.totalAmount || 0), 0);
  const totalItens = compras.reduce((acc, c) => acc + (c.itens?.length || 0), 0);
  return { total, pago, pendente, parcelado, totalItens };
}

function construirDados(compras: Compra[]): ComprasData {
  return { compras, resumo: calcularResumo(compras) };
}

export function comprasService() {
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  const { data: compras, isLoading: loadingCompras } = useQuery({
    queryKey: ['compras', userId],
    queryFn: () => fetchCompras(),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const data = construirDados((compras as Compra[]) || []);

  const criarMutation = useMutation({
    mutationFn: async (payload: CreateCompraPayload) => createCompra(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['compras', userId] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const atualizarMutation = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: Partial<CreateCompraPayload> }) => updateCompra(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['compras', userId] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const excluirMutation = useMutation({
    mutationFn: (id: string) => deleteCompra(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['compras', userId] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  return {
    data,
    isLoading: loadingCompras,
    criar: criarMutation.mutateAsync,
    atualizar: atualizarMutation.mutateAsync,
    excluir: excluirMutation.mutateAsync,
    isSaving: criarMutation.isPending || atualizarMutation.isPending,
  };
}
