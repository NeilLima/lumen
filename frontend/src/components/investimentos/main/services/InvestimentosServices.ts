import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Investimento, InvestimentosData, InvestimentosFormData } from '../types/InvestimentosTypes';

const MOCK_INVESTIMENTOS: Investimento[] = [
  {
    "id": "1",
    "nome": "Tesouro Selic 2029",
    "tipo": "tesouro",
    "valorAplicado": 10000,
    "valorAtual": 11200,
    "dataAplicacao": "2025-01-15",
    "status": "ativo",
    "categoria": "Renda Fixa",
    "categoriaCor": "#3b82f6",
    "categoriaIcone": "🏛️",
    "observacoes": "Tesouro direto pós-fixado"
  },
  {
    "id": "2",
    "nome": "CDB Banco Inter 120%",
    "tipo": "cdb",
    "valorAplicado": 5000,
    "valorAtual": 5600,
    "dataAplicacao": "2025-03-10",
    "status": "ativo",
    "categoria": "Renda Fixa",
    "categoriaCor": "#3b82f6",
    "categoriaIcone": "🏦"
  },
  {
    "id": "3",
    "nome": "ITSA4 - Itaúsa",
    "tipo": "acoes",
    "valorAplicado": 8000,
    "valorAtual": 9200,
    "dataAplicacao": "2024-11-20",
    "status": "ativo",
    "categoria": "Renda Variável",
    "categoriaCor": "#f59e0b",
    "categoriaIcone": "📊"
  },
  {
    "id": "4",
    "nome": "Bitcoin",
    "tipo": "cripto",
    "valorAplicado": 3000,
    "valorAtual": 4500,
    "dataAplicacao": "2025-06-01",
    "status": "ativo",
    "categoria": "Cripto",
    "categoriaCor": "#ef4444",
    "categoriaIcone": "₿"
  }
];

function calcularResumo(investimentos: Investimento[]) {
  const totalInvestimentos = investimentos.length;
  const totalAplicado = investimentos.reduce((acc, d) => acc + (d.valorAplicado || 0), 0);
  const totalAtual = investimentos.reduce((acc, d) => acc + (d.valorAtual || 0), 0);
  const lucroPrejuizo = totalAtual - totalAplicado;

  return { totalInvestimentos, totalAplicado, totalAtual, lucroPrejuizo };
}

function construirDados(investimentos: Investimento[]): InvestimentosData {
  return {
    investimentos,
    resumo: calcularResumo(investimentos),
  };
}

export function useInvestimentosService() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['investimentos'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 400));
      return construirDados(MOCK_INVESTIMENTOS);
    },
    staleTime: 5 * 60 * 1000,
  });

  const criarMutation = useMutation({
    mutationFn: async (formData: InvestimentosFormData) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      const novoInvestimento: Investimento = {
        id: String(Date.now()),
        nome: formData.nome,
        tipo: formData.tipo,
        valorAplicado: Number(formData.valorAplicado) || 0,
        valorAtual: Number(formData.valorAtual) || 0,
        dataAplicacao: formData.dataAplicacao,
        status: formData.status,
        observacoes: formData.observacoes,
        categoria: 'Geral',
        categoriaCor: '#8b5cf6',
        categoriaIcone: '📋',
      };
      return novoInvestimento;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investimentos'] });
    },
  });

  const atualizarMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: InvestimentosFormData }) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { id, formData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investimentos'] });
    },
  });

  const excluirMutation = useMutation({
    mutationFn: async (id: string) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investimentos'] });
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
