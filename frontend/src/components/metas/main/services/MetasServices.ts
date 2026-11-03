import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { list, create, update, remove } from '@/services/crudService';
import type { Meta, MetasData, MetasFormData } from '../types/MetasTypes';

function calcularResumo(metas: Meta[]): MetasData['resumo'] {
  const totalMetas = metas.length;
  const totalConcluidas = metas.filter(m => m.status === 'concluida').length;
  const totalEmAndamento = metas.filter(m => m.status === 'em_andamento').length;
  const totalValorAlvo = metas.reduce((acc, m) => acc + m.valorAlvo, 0);
  const totalValorAtual = metas.reduce((acc, m) => acc + m.valorAtual, 0);
  const progressoMedio = totalValorAlvo > 0 ? (totalValorAtual / totalValorAlvo) * 100 : 0;
  return { totalMetas, totalConcluidas, totalEmAndamento, totalValorAlvo, totalValorAtual, progressoMedio };
}

function construirDados(metas: Meta[]): MetasData {
  const categorias = [...new Set(metas.map(m => m.categoria))];
  return { metas, resumo: calcularResumo(metas), categorias, evolucaoMensal: [] };
}

export function metasService() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['metas'],
    queryFn: async () => {
      const response = await list('metas');
      return construirDados(response as Meta[]);
    },
    staleTime: 5 * 60 * 1000,
  });

  const criarMutation = useMutation({
    mutationFn: async (formData: MetasFormData) => {
      const novaMeta: Partial<Meta> = {
        nome: formData.nome,
        valorAlvo: Number(formData.valorAlvo),
        valorAtual: Number(formData.valorAtual),
        dataLimite: formData.dataLimite,
        categoria: formData.categoria,
        categoriaCor: '#8b5cf6',
        categoriaIcone: '🎯',
        prioridade: formData.prioridade,
        status: formData.status,
        descricao: formData.descricao,
      };
      return create('metas', novaMeta as Record<string, unknown>);
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['metas'] }); },
  });

  const atualizarMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: MetasFormData }) => {
      return update('metas', id, formData as unknown as Record<string, unknown>);
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['metas'] }); },
  });

  const excluirMutation = useMutation({
    mutationFn: async (id: string) => { return remove('metas', id); },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['metas'] }); },
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
