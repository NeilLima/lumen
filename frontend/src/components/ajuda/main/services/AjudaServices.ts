import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Ajuda, AjudaData, AjudaFormData } from '../types/AjudaTypes';

const MOCK_AJUDA: Ajuda[] = [
  {
    "id": "1",
    "titulo": "Como criar sua primeira despesa",
    "categoria": "despesas",
    "valor": 0,
    "data": "2025-07-15",
    "conteudo": "Para criar uma despesa, clique no botão + Nova Despesa...",
    "status": "publicado",
    "categoriaCor": "#ef4444",
    "categoriaIcone": "💸"
  },
  {
    "id": "2",
    "titulo": "Como configurar seu orçamento mensal",
    "categoria": "inicio",
    "valor": 0,
    "data": "2025-07-15",
    "conteudo": "Acesse a página de orçamento e defina limites por categoria...",
    "status": "publicado",
    "categoriaCor": "#8b5cf6",
    "categoriaIcone": "🎯"
  },
  {
    "id": "3",
    "titulo": "Como cadastrar um cartão de crédito",
    "categoria": "cartoes",
    "valor": 0,
    "data": "2025-07-15",
    "conteudo": "Na página de cartões, clique em Novo Cartão...",
    "status": "rascunho",
    "categoriaCor": "#3b82f6",
    "categoriaIcone": "💳"
  }
];

function calcularResumo(ajudas: Ajuda[]) {
  const totalArtigos = ajudas.length;
  const totalPublicados = ajudas.filter(d => d.status === 'publicado').length;
  const totalRascunhos = ajudas.filter(d => d.status === 'rascunho').length;
  const totalCategoriasAjuda = 7;

  return { totalArtigos, totalPublicados, totalRascunhos, totalCategoriasAjuda };
}

function construirDados(ajudas: Ajuda[]): AjudaData {
  return {
    ajudas,
    resumo: calcularResumo(ajudas),
  };
}

export function useAjudaService() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['ajuda'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 400));
      return construirDados(MOCK_AJUDA);
    },
    staleTime: 5 * 60 * 1000,
  });

  const criarMutation = useMutation({
    mutationFn: async (formData: AjudaFormData) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      const novoAjuda: Ajuda = {
        id: String(Date.now()),
        titulo: formData.titulo,
        categoria: formData.categoria,
        valor: 0,
        data: new Date().toISOString().split('T')[0],
        conteudo: formData.conteudo,
        status: formData.status,
        categoriaCor: '#8b5cf6',
        categoriaIcone: '📋',
      };
      return novoAjuda;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ajuda'] });
    },
  });

  const atualizarMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: AjudaFormData }) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { id, formData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ajuda'] });
    },
  });

  const excluirMutation = useMutation({
    mutationFn: async (id: string) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ajuda'] });
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