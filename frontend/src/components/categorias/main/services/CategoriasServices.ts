import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { list, create, update, remove } from '@/services/crudService';
import { useAuth } from '@/hooks/useAuth';
import type { Categoria, CategoriasData, CategoriasFormData } from '../types/CategoriasTypes';

interface ApiCategory { id: string; name: string; color?: string; icon?: string; type?: string; }

function apiToCategoria(c: ApiCategory): Categoria {
  const tipoMap: Record<string, string> = { INCOME: 'receita', EXPENSE: 'despesa', BOTH: 'ambos' };
  return {
    id: c.id,
    nome: c.name,
    icone: c.icon || '📋',
    cor: c.color || '#8b5cf6',
    tipo: tipoMap[c.type || 'BOTH'] || 'ambos',
    valor: 0,
    data: new Date().toISOString().split('T')[0],
    descricao: '',
    categoria: c.name,
    categoriaCor: c.color || '#8b5cf6',
    categoriaIcone: c.icon || '📋',
  };
}

function calcResumo(items: Categoria[]) {
  return {
    totalCategorias: items.length,
    totalDespesas: items.filter(d => d.tipo === 'despesa').length,
    totalReceitas: items.filter(d => d.tipo === 'receita').length,
    totalAmbos: items.filter(d => d.tipo === 'ambos').length,
  };
}

function build(items: Categoria[]): CategoriasData { return { categorias: items, resumo: calcResumo(items) }; }

export function useCategoriasService() {
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categorias', userId],
    queryFn: () => list('categories'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const data = build(((categories as ApiCategory[]) || []).map(apiToCategoria));

  const criarMutation = useMutation({
    mutationFn: async (formData: CategoriasFormData) => {
      const typeMap: Record<string, string> = { despesa: 'EXPENSE', receita: 'INCOME', ambos: 'BOTH' };
      return create('categories', {
        name: formData.nome,
        color: formData.cor || '#8b5cf6',
        icon: formData.icone || '📋',
        type: typeMap[formData.tipo] || 'BOTH',
      });
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['categorias', userId] }); },
  });

  const atualizarMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: CategoriasFormData }) => {
      const typeMap: Record<string, string> = { despesa: 'EXPENSE', receita: 'INCOME', ambos: 'BOTH' };
      return update('categories', id, {
        name: formData.nome,
        color: formData.cor || '#8b5cf6',
        icon: formData.icone || '📋',
        type: typeMap[formData.tipo] || 'BOTH',
      });
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['categorias', userId] }); },
  });

  const excluirMutation = useMutation({
    mutationFn: (id: string) => remove('categories', id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['categorias', userId] }); },
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