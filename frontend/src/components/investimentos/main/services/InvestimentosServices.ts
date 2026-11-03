import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { list, create, update, remove } from '@/services/crudService';
import { useAuth } from '@/hooks/useAuth';
import type { Investimento, InvestimentosData, InvestimentosFormData } from '../types/InvestimentosTypes';

interface ApiInvestimento { id: string; name: string; type?: string; broker?: string | null; currentValue: number | string; investedAmount: number | string; appliedDate?: string | null; status?: string; notes?: string | null; }

function apiToInvestimento(i: ApiInvestimento): Investimento {
  return {
    id: i.id,
    nome: i.name,
    tipo: (i.type || 'cdb').toLowerCase(),
    valorAplicado: Number(i.investedAmount) || 0,
    valorAtual: Number(i.currentValue) || 0,
    dataAplicacao: i.appliedDate ? i.appliedDate.split('T')[0] : '',
    status: i.status || 'ativo',
    observacoes: i.notes || undefined,
    categoria: i.type || 'Geral',
    categoriaCor: '#8b5cf6',
    categoriaIcone: '📋',
  };
}

function calcResumo(items: Investimento[]) {
  const totalInvestimentos = items.length;
  const totalAplicado = items.reduce((acc, d) => acc + (d.valorAplicado || 0), 0);
  const totalAtual = items.reduce((acc, d) => acc + (d.valorAtual || 0), 0);
  const lucroPrejuizo = totalAtual - totalAplicado;
  return { totalInvestimentos, totalAplicado, totalAtual, lucroPrejuizo };
}

function construirDados(items: Investimento[]): InvestimentosData {
  return { investimentos: items, resumo: calcResumo(items) };
}

export function useInvestimentosService() {
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  const { data: investimentos, isLoading } = useQuery({
    queryKey: ['investimentos', userId],
    queryFn: () => list('investimentos'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const data = construirDados(((investimentos as ApiInvestimento[]) || []).map(apiToInvestimento));

  const criarMutation = useMutation({
    mutationFn: async (formData: InvestimentosFormData) => {
      return create('investimentos', {
        name: formData.nome,
        type: formData.tipo,
        currentValue: Number(formData.valorAtual) || 0,
        investedAmount: Number(formData.valorAplicado) || 0,
        appliedDate: formData.dataAplicacao || undefined,
        status: formData.status,
        notes: formData.observacoes || undefined,
      });
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['investimentos', userId] }); },
  });

  const atualizarMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: InvestimentosFormData }) => {
      return update('investimentos', id, {
        name: formData.nome,
        type: formData.tipo,
        currentValue: Number(formData.valorAtual) || 0,
        investedAmount: Number(formData.valorAplicado) || 0,
        appliedDate: formData.dataAplicacao || undefined,
        status: formData.status,
        notes: formData.observacoes || undefined,
      });
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['investimentos', userId] }); },
  });

  const excluirMutation = useMutation({
    mutationFn: (id: string) => remove('investimentos', id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['investimentos', userId] }); },
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