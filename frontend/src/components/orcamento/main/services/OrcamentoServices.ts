import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { list, create, update, remove } from '@/services/crudService';
import { useAuth } from '@/hooks/useAuth';
import type { OrcamentoCategoria, OrcamentoData, OrcamentoFormData, ApiBudget, ApiCategory } from '../types/OrcamentoTypes';

function statusFrom(gasto: number, limite: number): 'dentro' | 'atencao' | 'estourado' {
  if (limite <= 0) return 'dentro';
  const pct = gasto / limite;
  if (pct >= 1) return 'estourado';
  if (pct >= 0.8) return 'atencao';
  return 'dentro';
}

function apiToOrcamento(b: ApiBudget): OrcamentoCategoria {
  const [anoStr, mesStr] = (b.month || '').split('-');
  const limite = Number(b.limitAmount) || 0;
  const gasto = Number(b.spentAmount) || 0;
  return {
    id: b.id,
    categoria: b.category?.name || '',
    categoriaCor: b.category?.color || '#8b5cf6',
    categoriaIcone: b.category?.icon || '📋',
    limite,
    gasto,
    mes: Number(mesStr) || new Date().getMonth() + 1,
    ano: Number(anoStr) || new Date().getFullYear(),
    status: statusFrom(gasto, limite),
  };
}

function calcularResumo(categorias: OrcamentoCategoria[]) {
  const totalLimite = categorias.reduce((acc, c) => acc + c.limite, 0);
  const totalGasto = categorias.reduce((acc, c) => acc + c.gasto, 0);
  const totalDisponivel = totalLimite - totalGasto;
  const percentualUsado = totalLimite > 0 ? (totalGasto / totalLimite) * 100 : 0;
  const categoriasEstouradas = categorias.filter(c => c.status === 'estourado').length;
  const categoriasAtencao = categorias.filter(c => c.status === 'atencao').length;
  return { totalLimite, totalGasto, totalDisponivel, percentualUsado, categoriasEstouradas, categoriasAtencao };
}

function construirDados(categorias: OrcamentoCategoria[]): OrcamentoData {
  const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  return { categorias, resumo: calcularResumo(categorias), meses, anos: [2026, 2027] };
}

export function orcamentoService() {
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  const { data: budgets, isLoading: loadingBudgets } = useQuery({
    queryKey: ['orcamento', userId],
    queryFn: () => list('orcamento'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const { data: categories } = useQuery({
    queryKey: ['orcamento-categorias', userId],
    queryFn: () => list('categories'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const categoriasList = ((categories as ApiCategory[]) || []).slice().sort((a, b) => a.name.localeCompare(b.name));

  const data = construirDados(((budgets as ApiBudget[]) || []).map(apiToOrcamento));

  const criarMutation = useMutation({
    mutationFn: async (formData: OrcamentoFormData) => {
      const categoria = categoriasList.find((c) => c.name === formData.categoria);
      const mes = String(formData.mes).padStart(2, '0');
      const month = `${formData.ano}-${mes}`;
      return create('orcamento', {
        categoryId: categoria ? categoria.id : undefined,
        month,
        limitAmount: Number(formData.limite) || 0,
        spentAmount: Number(formData.gasto) || 0,
      });
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['orcamento', userId] }); },
  });

  const atualizarMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: OrcamentoFormData }) => {
      const categoria = categoriasList.find((c) => c.name === formData.categoria);
      const mes = String(formData.mes).padStart(2, '0');
      const month = `${formData.ano}-${mes}`;
      return update('orcamento', id, {
        categoryId: categoria ? categoria.id : undefined,
        month,
        limitAmount: Number(formData.limite) || 0,
        spentAmount: Number(formData.gasto) || 0,
      });
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['orcamento', userId] }); },
  });

  const excluirMutation = useMutation({
    mutationFn: (id: string) => remove('orcamento', id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['orcamento', userId] }); },
  });

  return {
    data,
    isLoading: loadingBudgets,
    criar: criarMutation.mutateAsync,
    atualizar: atualizarMutation.mutateAsync,
    excluir: excluirMutation.mutateAsync,
    isSaving: criarMutation.isPending || atualizarMutation.isPending,
  };
}

