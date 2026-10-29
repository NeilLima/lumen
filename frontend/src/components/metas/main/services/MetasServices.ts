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
  const evolucaoMensal = [
    { mes: 'Jan', depositado: 1200 },
    { mes: 'Fev', depositado: 1800 },
    { mes: 'Mar', depositado: 1500 },
    { mes: 'Abr', depositado: 2200 },
    { mes: 'Mai', depositado: 1900 },
    { mes: 'Jun', depositado: 2500 },
  ];
  return { metas, resumo: calcularResumo(metas), categorias, evolucaoMensal };
}

export function metasService() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['metas'],
    queryFn: async () => {
      try {
        const response = await list('metas');
        return construirDados(response as Meta[]);
      } catch {
        const MOCK_METAS: Meta[] = [
          { id: '1', nome: 'Reserva de Emergência', valorAlvo: 30000, valorAtual: 12000, dataLimite: '2026-12-31', categoria: 'Reserva', categoriaCor: '#10b981', categoriaIcone: '💰', prioridade: 'alta', status: 'em_andamento', descricao: 'Fundo de emergência para 6 meses de despesas' },
          { id: '2', nome: 'Viagem Internacional', valorAlvo: 15000, valorAtual: 4500, dataLimite: '2026-09-15', categoria: 'Viagem', categoriaCor: '#8b5cf6', categoriaIcone: '✈️', prioridade: 'media', status: 'em_andamento', descricao: 'Viagem para Europa em setembro' },
          { id: '3', nome: 'Notebook Novo', valorAlvo: 8000, valorAtual: 8000, dataLimite: '2026-06-30', categoria: 'Eletrônicos', categoriaCor: '#3b82f6', categoriaIcone: '💻', prioridade: 'baixa', status: 'concluida', descricao: 'MacBook Pro para trabalho' },
          { id: '4', nome: 'Entrada Casa Própria', valorAlvo: 100000, valorAtual: 35000, dataLimite: '2027-06-30', categoria: 'Imóvel', categoriaCor: '#f59e0b', categoriaIcone: '🏠', prioridade: 'alta', status: 'em_andamento', descricao: 'Entrada para financiamento imobiliário' },
          { id: '5', nome: 'Curso Profissionalizante', valorAlvo: 5000, valorAtual: 5000, dataLimite: '2026-05-01', categoria: 'Educação', categoriaCor: '#ec4899', categoriaIcone: '📚', prioridade: 'media', status: 'concluida', descricao: 'Curso de Data Science' },
          { id: '6', nome: 'Fundo de Investimentos', valorAlvo: 25000, valorAtual: 8000, dataLimite: '2026-12-31', categoria: 'Investimentos', categoriaCor: '#10b981', categoriaIcone: '📈', prioridade: 'baixa', status: 'em_andamento', descricao: 'Aportes mensais em renda variável' },
        ];
        return construirDados(MOCK_METAS);
      }
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
