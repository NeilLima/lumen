import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { list, create, update, remove } from '@/services/crudService';
import { useAuth } from '@/hooks/useAuth';
import type { Notificacao, NotificacoesData, NotificacoesFormData } from '../types/NotificacoesTypes';

interface ApiNotification { id: string; type: string; title: string; message?: string | null; read: boolean; link?: string | null; createdAt: string; }

function apiToNotificacao(n: ApiNotification): Notificacao {
  return {
    id: n.id,
    titulo: n.title,
    tipo: n.type,
    valor: 0,
    data: n.createdAt ? n.createdAt.split('T')[0] : '',
    mensagem: n.message || undefined,
    status: n.read ? 'lida' : 'nao_lida',
    categoria: n.type,
    categoriaCor: '#8b5cf6',
    categoriaIcone: '🔔',
  };
}

function calcResumo(items: Notificacao[]): NotificacoesData['resumo'] {
  return {
    totalNotificacoes: items.length,
    totalNaoLidas: items.filter(i => i.status === 'nao_lida').length,
    totalLidas: items.filter(i => i.status === 'lida').length,
    totalArquivadas: items.filter(i => i.status === 'arquivada').length,
  };
}

function build(items: Notificacao[]): NotificacoesData { return { notificacoes: items, resumo: calcResumo(items) }; }

export function useNotificacoesService() {
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notificacoes', userId],
    queryFn: () => list('notifications'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const data = build(((notifications as ApiNotification[]) || []).map(apiToNotificacao));

  const criarMutation = useMutation({
    mutationFn: async (formData: NotificacoesFormData) => {
      return create('notifications', {
        type: formData.tipo,
        title: formData.titulo,
        message: formData.mensagem || undefined,
        read: formData.status === 'lida',
      });
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['notificacoes', userId] }); },
  });

  const atualizarMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: NotificacoesFormData }) => {
      return update('notifications', id, {
        type: formData.tipo,
        title: formData.titulo,
        message: formData.mensagem || undefined,
        read: formData.status === 'lida',
      });
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['notificacoes', userId] }); },
  });

  const excluirMutation = useMutation({
    mutationFn: (id: string) => remove('notifications', id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['notificacoes', userId] }); },
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