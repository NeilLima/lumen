import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Assinatura, AssinaturasData, AssinaturasFormData } from '../types/AssinaturasTypes';

const MOCK_ASSINATURAS: Assinatura[] = [
  {
    "id": "1",
    "nome": "Netflix",
    "categoria": "Streaming",
    "valor": 55.9,
    "ciclo": "mensal",
    "proximaCobranca": "2026-08-05",
    "status": "ativa",
    "categoriaCor": "#ef4444",
    "categoriaIcone": "🎬"
  },
  {
    "id": "2",
    "nome": "Spotify",
    "categoria": "Música",
    "valor": 21.9,
    "ciclo": "mensal",
    "proximaCobranca": "2026-08-12",
    "status": "ativa",
    "categoriaCor": "#10b981",
    "categoriaIcone": "🎵"
  },
  {
    "id": "3",
    "nome": "ChatGPT Plus",
    "categoria": "Produtividade",
    "valor": 110,
    "ciclo": "mensal",
    "proximaCobranca": "2026-08-20",
    "status": "ativa",
    "categoriaCor": "#3b82f6",
    "categoriaIcone": "🤖"
  },
  {
    "id": "4",
    "nome": "Academia SmartFit",
    "categoria": "Saúde",
    "valor": 99.9,
    "ciclo": "mensal",
    "proximaCobranca": "2026-08-01",
    "status": "ativa",
    "categoriaCor": "#f59e0b",
    "categoriaIcone": "💪"
  },
  {
    "id": "5",
    "nome": "Amazon Prime",
    "categoria": "Streaming",
    "valor": 19.9,
    "ciclo": "mensal",
    "proximaCobranca": "2026-08-15",
    "status": "pausada",
    "categoriaCor": "#ef4444",
    "categoriaIcone": "📦"
  }
];

function calcularResumo(assinaturas: Assinatura[]) {
  const totalAssinaturas = assinaturas.length;
  const totalMensal = assinaturas.reduce((acc, d) => acc + (d.valor || 0), 0);
  const totalAnual = assinaturas.reduce((acc, d) => acc + (d.valor || 0), 0) * 12;
  const totalAtivas = assinaturas.filter(d => d.status === 'ativa').length;

  return { totalAssinaturas, totalMensal, totalAnual, totalAtivas };
}

function construirDados(assinaturas: Assinatura[]): AssinaturasData {
  return {
    assinaturas,
    resumo: calcularResumo(assinaturas),
  };
}

export function useAssinaturasService() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['assinaturas'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 400));
      return construirDados(MOCK_ASSINATURAS);
    },
    staleTime: 5 * 60 * 1000,
  });

  const criarMutation = useMutation({
    mutationFn: async (formData: AssinaturasFormData) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      const novoAssinatura: Assinatura = {
        id: String(Date.now()),
        nome: formData.nome,
        categoria: formData.categoria,
        valor: Number(formData.valor) || 0,
        ciclo: formData.ciclo,
        proximaCobranca: formData.proximaCobranca,
        status: formData.status,
        observacoes: formData.observacoes,
        categoriaCor: '#8b5cf6',
        categoriaIcone: '📋',
      };
      return novoAssinatura;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assinaturas'] });
    },
  });

  const atualizarMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: AssinaturasFormData }) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { id, formData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assinaturas'] });
    },
  });

  const excluirMutation = useMutation({
    mutationFn: async (id: string) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assinaturas'] });
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