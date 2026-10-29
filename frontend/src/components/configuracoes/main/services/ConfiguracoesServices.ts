import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Configuracao, ConfiguracoesData, ConfiguracoesFormData } from '../types/ConfiguracoesTypes';

const MOCK_CONFIGURACOES: Configuracao[] = [
  {
    "id": "1",
    "nome": "Tema Escuro",
    "categoria": "aparencia",
    "valor": "Ativado",
    "data": "2025-01-15",
    "descricao": "Tema escuro para a aplicação",
    "categoriaCor": "#3b82f6",
    "categoriaIcone": "🎨"
  },
  {
    "id": "2",
    "nome": "Idioma",
    "categoria": "idioma",
    "valor": "Português (BR)",
    "data": "2025-01-15",
    "descricao": "Idioma da aplicação",
    "categoriaCor": "#10b981",
    "categoriaIcone": "🌐"
  },
  {
    "id": "3",
    "nome": "Moeda",
    "categoria": "moeda",
    "valor": "Real (R$)",
    "data": "2025-01-15",
    "descricao": "Moeda padrão",
    "categoriaCor": "#f59e0b",
    "categoriaIcone": "💰"
  },
  {
    "id": "4",
    "nome": "Backup Automático",
    "categoria": "backup",
    "valor": "Ativado",
    "data": "2025-01-15",
    "descricao": "Backup automático semanal",
    "categoriaCor": "#8b5cf6",
    "categoriaIcone": "💾"
  }
];

function calcularResumo(configuracoes: Configuracao[]) {
  const totalConfiguracoes = configuracoes.length;
  const totalAparencia = configuracoes.filter(d => d.categoria === 'aparencia').length;
  const totalSeguranca = configuracoes.filter(d => d.categoria === 'seguranca').length;
  const totalNotificacoesConfig = configuracoes.filter(d => d.categoria === 'notificacoes').length;

  return { totalConfiguracoes, totalAparencia, totalSeguranca, totalNotificacoesConfig };
}

function construirDados(configuracoes: Configuracao[]): ConfiguracoesData {
  return {
    configuracoes,
    resumo: calcularResumo(configuracoes),
  };
}

export function useConfiguracoesService() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['configuracoes'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 400));
      return construirDados(MOCK_CONFIGURACOES);
    },
    staleTime: 5 * 60 * 1000,
  });

  const criarMutation = useMutation({
    mutationFn: async (formData: ConfiguracoesFormData) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      const novoConfiguracao: Configuracao = {
        id: String(Date.now()),
        nome: formData.nome,
        categoria: formData.categoria,
        valor: formData.valor,
        data: new Date().toISOString().split('T')[0],
        descricao: formData.descricao,
        categoriaCor: '#8b5cf6',
        categoriaIcone: '📋',
      };
      return novoConfiguracao;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['configuracoes'] });
    },
  });

  const atualizarMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: ConfiguracoesFormData }) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { id, formData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['configuracoes'] });
    },
  });

  const excluirMutation = useMutation({
    mutationFn: async (id: string) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['configuracoes'] });
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
