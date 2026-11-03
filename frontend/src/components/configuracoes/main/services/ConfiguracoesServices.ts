import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { list, create, update, remove } from '@/services/crudService';
import { useAuth } from '@/hooks/useAuth';
import type { Configuracao, ConfiguracoesData, ConfiguracoesFormData } from '../types/ConfiguracoesTypes';

interface ApiSeftting { id: string; name: string; category?: string; value: string; description?: string | null; createdAt: string; }

function apiToConfiguracao(s: ApiSetting): Configuracao {
  const corMap: Record<string, string> = { aparencia: '#3b82f6', idioma: '#10b981', moeda: '#f59e0b', backup: '#8b5cf6', geral: '#6b6b7b' };
  return {
    id: s.id,
    nome: s.name,
    categoria: s.category || 'geral',
    valor: s.value,
    data: s.createdAt ? s.createdAt.split('T')[0] : '',
    descricao: s.description || '',
    categoriaCor: corMap[s.category || 'geral'] || '#8b5cf6',
    categoriaIcone: '⚙️',
  };
}

function calcResumo(items: Configuracao[]) {
  return {
    totalConfiguracoes: items.length,
    totalAparencia: items.filter(d => d.categoria === 'aparencia').length,
    totalSeguranca: items.filter(d => d.categoria === 'seguranca').length,
    totalNotificacoesConfig: items.filter(d => d.categoria === 'notificacoes').length,
  };
}

function build(items: Configuracao[]): ConfiguracoesData { return { configuracoes: items, resumo: calcResumo(items) }; }

export function useConfiguracoesService() {
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ['configuracoes', userId],
    queryFn: () => list('configuracoes'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const data = build(((settings as ApiSetting[]) || []).map(apiToConfiguracao));

  const criarMutation = useMutation({
    mutationFn: async (formData: ConfiguracoesFormData) => {
      return create('configuracoes', {
        name: formData.nome,
        category: formData.categoria,
        value: formData.valor,
        description: formData.descricao || undefined,
      });
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['configuracoes', userId] }); },
  });

  const atualizarMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: ConfiguracoesFormData }) => {
      return update('configuracoes', id, {
        name: formData.nome,
        category: formData.categoria,
        value: formData.valor,
        description: formData.descricao || undefined,
      });
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['configuracoes', userId] }); },
  });

  const excluirMutation = useMutation({
    mutationFn: (id: string) => remove('configuracoes', id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['configuracoes', userId] }); },
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