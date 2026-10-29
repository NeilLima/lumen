import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Relatorio, RelatoriosData, RelatoriosFormData } from '../types/RelatoriosTypes';

const MOCK_RELATORIOS: Relatorio[] = [
  {
    "id": "1",
    "nome": "Relatório de Receitas - Julho 2026",
    "tipo": "receitas",
    "periodo": "mensal",
    "dataInicio": "2026-07-01",
    "dataFim": "2026-07-31",
    "valor": 8500.00,
    "data": "2026-07-31",
    "status": "gerado",
    "categoria": "Receitas",
    "categoriaCor": "#10b981",
    "categoriaIcone": "💰",
    "observacoes": "Análise de receitas do mês"
  },
  {
    "id": "2",
    "nome": "Relatório de Despesas - Julho 2026",
    "tipo": "despesas",
    "periodo": "mensal",
    "dataInicio": "2026-07-01",
    "dataFim": "2026-07-31",
    "valor": 4200.00,
    "data": "2026-07-31",
    "status": "gerado",
    "categoria": "Despesas",
    "categoriaCor": "#ef4444",
    "categoriaIcone": "💸"
  },
  {
    "id": "3",
    "nome": "Fluxo de Caixa - 2026",
    "tipo": "fluxo",
    "periodo": "anual",
    "dataInicio": "2026-01-01",
    "dataFim": "2026-12-31",
    "valor": 4300.00,
    "data": "2026-12-31",
    "status": "gerado",
    "categoria": "Fluxo",
    "categoriaCor": "#3b82f6",
    "categoriaIcone": "📊"
  }
];

function calcularResumo(relatorios: Relatorio[]) {
  const totalRelatorios = relatorios.length;
  const totalReceitas = 8500;
  const totalDespesas = 4200;
  const saldo = 4300;

  return { totalRelatorios, totalReceitas, totalDespesas, saldo };
}

function construirDados(relatorios: Relatorio[]): RelatoriosData {
  return {
    relatorios,
    resumo: calcularResumo(relatorios),
  };
}

export function useRelatoriosService() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['relatorios'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 400));
      return construirDados(MOCK_RELATORIOS);
    },
    staleTime: 5 * 60 * 1000,
  });

  const criarMutation = useMutation({
    mutationFn: async (formData: RelatoriosFormData) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      const novoRelatorio: Relatorio = {
        id: String(Date.now()),
        nome: formData.nome,
        tipo: formData.tipo,
        periodo: formData.periodo,
        dataInicio: formData.dataInicio,
        dataFim: formData.dataFim,
        valor: 0,
        data: formData.dataInicio,
        status: 'pendente',
        categoria: 'Geral',
        categoriaCor: '#8b5cf6',
        categoriaIcone: '📋',
        observacoes: formData.observacoes,
      };
      return novoRelatorio;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['relatorios'] });
    },
  });

  const atualizarMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: RelatoriosFormData }) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { id, formData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['relatorios'] });
    },
  });

  const excluirMutation = useMutation({
    mutationFn: async (id: string) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['relatorios'] });
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
