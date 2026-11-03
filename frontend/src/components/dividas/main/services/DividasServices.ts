import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { list, create, update, remove } from '@/services/crudService';
import { useAuth } from '@/hooks/useAuth';
import type { Divida, DividasData, DividasFormData, ApiDebt, ApiCategory } from '../types/DividasTypes';

function apiToDivida(d: ApiDebt): Divida {
  return {
    id: d.id,
    nome: d.name,
    tipo: (d.category?.name?.toLowerCase() as any) || 'banco',
    valor: Number(d.totalAmount) || 0,
    parcelas: d.parcels ?? 0,
    parcelasPagas: d.parcelasPagas ?? 0,
    juros: Number(d.interestRate) || 0,
    dataVencimento: d.dueDate ? d.dueDate.split('T')[0] : '',
    situacao: (d.status as any) || 'em_dia',
    categoria: d.category?.name || 'Geral',
    categoriaCor: d.category?.color || '#8b5cf6',
    categoriaIcone: d.category?.icon || '📋',
    observacoes: d.notes || undefined,
  };
}

function calcResumo(d: Divida[]): DividasData['resumo'] {
  return {
    totalDividas: d.length,
    totalValor: d.reduce((a, x) => a + x.valor, 0),
    totalAtrasado: d.filter(x => x.situacao === 'atrasada').reduce((a, x) => a + x.valor, 0),
    totalQuitado: d.filter(x => x.situacao === 'quitada').reduce((a, x) => a + x.valor, 0),
    totalEmDia: d.filter(x => x.situacao === 'em_dia').reduce((a, x) => a + x.valor, 0),
  };
}

function build(d: Divida[]): DividasData { return { dividas: d, resumo: calcResumo(d) }; }

export function dividasService() {
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  const { data: debts, isLoading } = useQuery({
    queryKey: ['dividas', userId],
    queryFn: () => list('dividas'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const { data: categories } = useQuery({
    queryKey: ['dividas-categorias', userId],
    queryFn: () => list('categories'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const categoriasList = ((categories as ApiCategory[]) || []).slice().sort((a, b) => a.name.localeCompare(b.name));

  const data = build(((debts as ApiDebt[]) || []).map(apiToDivida));

  const criarMutation = useMutation({
    mutationFn: async (fd: DividasFormData) => {
      const categoria = categoriasList.find((c) => c.name === fd.categoria);
      return create('dividas', {
        name: fd.nome,
        totalAmount: Number(fd.valor) || 0,
        remainingAmount: Number(fd.valor) || 0,
        interestRate: Number(fd.juros) || 0,
        dueDate: fd.dataVencimento || undefined,
        parcels: Number(fd.parcelas) || 0,
        parcelasPagas: Number(fd.parcelasPagas) || 0,
        status: fd.situacao,
        categoryId: categoria ? categoria.id : undefined,
        notes: fd.observacoes || undefined,
      });
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['dividas', userId] }); },
  });

  const atualizarMutation = useMutation({
    mutationFn: async ({ id, fd }: { id: string; fd: DividasFormData }) => {
      const categoria = categoriasList.find((c) => c.name === fd.categoria);
      return update('dividas', id, {
        name: fd.nome,
        totalAmount: Number(fd.valor) || 0,
        interestRate: Number(fd.juros) || 0,
        dueDate: fd.dataVencimento || undefined,
        parcels: Number(fd.parcelas) || 0,
        parcelasPagas: Number(fd.parcelasPagas) || 0,
        status: fd.situacao,
        categoryId: categoria ? categoria.id : undefined,
        notes: fd.observacoes || undefined,
      });
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['dividas', userId] }); },
  });

  const excluirMutation = useMutation({
    mutationFn: (id: string) => remove('dividas', id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['dividas', userId] }); },
  });

  return {
    data,
    isLoading,
    criar: criarMutation.mutateAsync,
    atualizar: atualizarMutation.mutateAsync,
    excluir: excluirMutation.mutateAsync,
    isSaving: criarMutation.isPending || atualizarMutation.isPending,
  };
}
