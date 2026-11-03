import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { list, create, update, remove } from '@/services/crudService';
import { useAuth } from '@/hooks/useAuth';
import type { Emprestimo, EmprestimosData, EmprestimosFormData, ApiEmprestimo, ApiCategory } from '../types/EmprestimosTypes';

function apiToEmprestimo(e: ApiEmprestimo): Emprestimo {
  return {
    id: e.id,
    nome: e.name,
    tipo: e.type === 'LOAN' ? 'recebido' : 'feito',
    valor: Number(e.totalAmount) || 0,
    juros: Number(e.interestRate) || 0,
    parcelas: e.parcels ?? 0,
    parcelasPagas: e.parcelasPagas ?? 0,
    dataVencimento: e.dueDate ? e.dueDate.split('T')[0] : '',
    situacao: e.status || 'em_dia',
    observacoes: e.notes || undefined,
    categoria: e.category?.name || 'Geral',
    categoriaCor: e.category?.color || '#8b5cf6',
    categoriaIcone: e.category?.icon || '📋',
  };
}

function calcResumo(items: Emprestimo[]): EmprestimosData['resumo'] {
  return {
    totalEmprestimos: items.length,
    totalValor: items.reduce((a, x) => a + x.valor, 0),
    totalAtrasado: items.filter(x => x.situacao === 'atrasada').reduce((a, x) => a + x.valor, 0),
    totalQuitado: items.filter(x => x.situacao === 'quitada').reduce((a, x) => a + x.valor, 0),
  };
}

function build(items: Emprestimo[]): EmprestimosData { return { emprestimos: items, resumo: calcResumo(items) }; }

export function emprestimosService() {
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  const { data: emprestimos, isLoading } = useQuery({
    queryKey: ['emprestimos', userId],
    queryFn: () => list('emprestimos'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const { data: categories } = useQuery({
    queryKey: ['emprestimos-categorias', userId],
    queryFn: () => list('categories'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const categoriasList = ((categories as ApiCategory[]) || []).slice().sort((a, b) => a.name.localeCompare(b.name));

  const data = build(((emprestimos as ApiEmprestimo[]) || []).map(apiToEmprestimo));

  const criarMutation = useMutation({
    mutationFn: async (formData: EmprestimosFormData) => {
      const categoria = categoriasList.find((c) => c.name === formData.categoria);
      return create('emprestimos', {
        name: formData.nome,
        totalAmount: Number(formData.valor) || 0,
        remainingAmount: Number(formData.valor) || 0,
        interestRate: Number(formData.juros) || 0,
        dueDate: formData.dataVencimento || undefined,
        parcels: Number(formData.parcelas) || 0,
        parcelasPagas: Number(formData.parcelasPagas) || 0,
        status: formData.situacao,
        categoryId: categoria ? categoria.id : undefined,
        notes: formData.observacoes || undefined,
      });
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['emprestimos', userId] }); },
  });

  const atualizarMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: EmprestimosFormData }) => {
      const categoria = categoriasList.find((c) => c.name === formData.categoria);
      return update('emprestimos', id, {
        name: formData.nome,
        totalAmount: Number(formData.valor) || 0,
        interestRate: Number(formData.juros) || 0,
        dueDate: formData.dataVencimento || undefined,
        parcels: Number(formData.parcelas) || 0,
        parcelasPagas: Number(formData.parcelasPagas) || 0,
        status: formData.situacao,
        categoryId: categoria ? categoria.id : undefined,
        notes: formData.observacoes || undefined,
      });
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['emprestimos', userId] }); },
  });

  const excluirMutation = useMutation({
    mutationFn: (id: string) => remove('emprestimos', id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['emprestimos', userId] }); },
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
