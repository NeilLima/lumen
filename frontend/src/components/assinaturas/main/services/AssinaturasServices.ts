import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { list, create, update, remove } from '@/services/crudService';
import { useAuth } from '@/hooks/useAuth';
import type {
  Assinatura,
  AssinaturasData,
  AssinaturasFormData,
  ApiCategory,
  ApiSubscription,
} from '../types/AssinaturasTypes';

function toDateInput(iso: string): string {
  return iso ? iso.split('T')[0] : '';
}

function apiToAssinatura(s: ApiSubscription): Assinatura {
  return {
    id: s.id,
    nome: s.name,
    categoria: s.category?.name || '',
    valor: Number(s.amount),
    ciclo: 'mensal',
    proximaCobranca: s.nextCharge ? s.nextCharge.split('T')[0] : '',
    status: s.active ? 'ativa' : 'cancelada',
    categoriaCor: s.category?.color || '#8b5cf6',
    categoriaIcone: s.category?.icon || '📋',
  };
}

function calcularResumo(assinaturas: Assinatura[]) {
  const totalAssinaturas = assinaturas.length;
  const totalMensal = assinaturas.reduce((acc, d) => acc + (d.valor || 0), 0);
  const totalAnual = assinaturas.reduce((acc, d) => acc + (d.valor || 0), 0) * 12;
  const totalAtivas = assinaturas.filter((d) => d.status === 'ativa').length;

  return { totalAssinaturas, totalMensal, totalAnual, totalAtivas };
}

function construirDados(assinaturas: Assinatura[]): AssinaturasData {
  return {
    assinaturas,
    resumo: calcularResumo(assinaturas),
  };
}

export function useAssinaturasService() {
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  const { data: subs, isLoading: loadingSubs } = useQuery({
    queryKey: ['assinaturas', userId],
    queryFn: () => list('subscriptions'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const { data: categories } = useQuery({
    queryKey: ['assinaturas-categorias', userId],
    queryFn: () => list('categories'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const categorias = ((categories as ApiCategory[]) || [])
    .filter((c) => c.type === 'EXPENSE' || c.type === 'BOTH' || c.type === 'INCOME')
    .sort((a, b) => a.name.localeCompare(b.name));

  const data = construirDados(((subs as ApiSubscription[]) || []).map(apiToAssinatura));

  const criarMutation = useMutation({
    mutationFn: async (formData: AssinaturasFormData) => {
      const categoria = categorias.find((c) => c.name === formData.categoria);
      return create('subscriptions', {
        name: formData.nome,
        amount: Number(formData.valor),
        dueDay: 10,
        categoryId: categoria ? categoria.id : undefined,
        nextCharge: formData.proximaCobranca || undefined,
        active: formData.status === 'ativa',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assinaturas', userId] });
    },
  });

  const atualizarMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: AssinaturasFormData }) => {
      const categoria = categorias.find((c) => c.name === formData.categoria);
      return update('subscriptions', id, {
        name: formData.nome,
        amount: Number(formData.valor),
        categoryId: categoria ? categoria.id : undefined,
        nextCharge: formData.proximaCobranca || undefined,
        active: formData.status === 'ativa',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assinaturas', userId] });
    },
  });

  const excluirMutation = useMutation({
    mutationFn: (id: string) => remove('subscriptions', id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assinaturas', userId] });
    },
  });

  return {
    data,
    isLoading: loadingSubs,
    criar: criarMutation.mutateAsync,
    atualizar: atualizarMutation.mutateAsync,
    excluir: excluirMutation.mutateAsync,
    isSaving: criarMutation.isPending || atualizarMutation.isPending,
  };
}