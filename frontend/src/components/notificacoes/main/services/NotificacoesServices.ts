import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Notificacao, NotificacoesData, NotificacoesFormData } from '../types/NotificacoesTypes';

const MOCK_NOTIFICACOES: Notificacao[] = [
  {
    "id": "1",
    "titulo": "Pagamento de Aluguel Próximo",
    "tipo": "pagamento",
    "valor": 1500.00,
    "data": "2026-07-28",
    "mensagem": "O pagamento do aluguel vence em 3 dias",
    "status": "nao_lida",
    "categoria": "Pagamento",
    "categoriaCor": "#f59e0b",
    "categoriaIcone": "💳"
  },
  {
    "id": "2",
    "titulo": "Conta de Luz Vencendo",
    "tipo": "conta",
    "valor": 250.00,
    "data": "2026-07-29",
    "mensagem": "A conta de luz vence amanhã",
    "status": "nao_lida",
    "categoria": "Conta",
    "categoriaCor": "#ef4444",
    "categoriaIcone": "⚡"
  },
  {
    "id": "3",
    "titulo": "Meta de Viagem Atingida",
    "tipo": "meta",
    "valor": 5000.00,
    "data": "2026-07-25",
    "mensagem": "Parabéns! Você atingiu sua meta de viagem",
    "status": "lida",
    "categoria": "Meta",
    "categoriaCor": "#10b981",
    "categoriaIcone": "🎯"
  }
];

function calcularResumo(notificacoes: Notificacao[]) {
  const totalNotificacoes = notificacoes.length;
  const totalNaoLidas = notificacoes.filter(d => d.status === 'nao_lida').length;
  const totalLidas = notificacoes.filter(d => d.status === 'lida').length;
  const totalArquivadas = notificacoes.filter(d => d.status === 'arquivada').length;

  return { totalNotificacoes, totalNaoLidas, totalLidas, totalArquivadas };
}

function construirDados(notificacoes: Notificacao[]): NotificacoesData {
  return {
    notificacoes,
    resumo: calcularResumo(notificacoes),
  };
}

export function useNotificacoesService() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['notificacoes'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 400));
      return construirDados(MOCK_NOTIFICACOES);
    },
    staleTime: 5 * 60 * 1000,
  });

  const criarMutation = useMutation({
    mutationFn: async (formData: NotificacoesFormData) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      const novoNotificacao: Notificacao = {
        id: String(Date.now()),
        titulo: formData.titulo,
        tipo: formData.tipo,
        valor: 0,
        data: formData.data,
        mensagem: formData.mensagem,
        status: formData.status,
        categoria: 'Geral',
        categoriaCor: '#8b5cf6',
        categoriaIcone: '📋',
      };
      return novoNotificacao;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notificacoes'] });
    },
  });

  const atualizarMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: NotificacoesFormData }) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { id, formData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notificacoes'] });
    },
  });

  const excluirMutation = useMutation({
    mutationFn: async (id: string) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notificacoes'] });
    },
  });

  return {
    data,
    isLoading,
    criar: criarMutation.mutate,
    atualizar: atualizarMutation.mutate,
    excluir: excluirMutation.mutate,
    isSaving: criarMutation.isPending || atualizarMutation.isPending,
  };
}