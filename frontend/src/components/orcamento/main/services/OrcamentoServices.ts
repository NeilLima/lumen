import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { list, create, update, remove } from '@/services/crudService';
import type { OrcamentoCategoria, OrcamentoData, OrcamentoFormData } from '../types/OrcamentoTypes';

function calcularResumo(categorias: OrcamentoCategoria[]): OrcamentoData['resumo'] {
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
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['orcamento'],
    queryFn: async () => {
      try { const r = await list('orcamento'); return construirDados(r as OrcamentoCategoria[]); }
      catch {
        const MOCK: OrcamentoCategoria[] = [
          { id: '1', categoria: 'Mercado', categoriaCor: '#10b981', categoriaIcone: '🛒', limite: 2000, gasto: 1850, mes: 7, ano: 2026, status: 'atencao' },
          { id: '2', categoria: 'Lazer', categoriaCor: '#8b5cf6', categoriaIcone: '🎮', limite: 800, gasto: 750, mes: 7, ano: 2026, status: 'atencao' },
          { id: '3', categoria: 'Combustível', categoriaCor: '#f59e0b', categoriaIcone: '⛽', limite: 500, gasto: 520, mes: 7, ano: 2026, status: 'estourado' },
          { id: '4', categoria: 'Transporte', categoriaCor: '#3b82f6', categoriaIcone: '🚌', limite: 400, gasto: 320, mes: 7, ano: 2026, status: 'dentro' },
          { id: '5', categoria: 'Saúde', categoriaCor: '#ef4444', categoriaIcone: '🏥', limite: 600, gasto: 250, mes: 7, ano: 2026, status: 'dentro' },
          { id: '6', categoria: 'Educação', categoriaCor: '#ec4899', categoriaIcone: '📚', limite: 1000, gasto: 980, mes: 7, ano: 2026, status: 'atencao' },
          { id: '7', categoria: 'Moradia', categoriaCor: '#14b8a6', categoriaIcone: '🏠', limite: 3000, gasto: 3100, mes: 7, ano: 2026, status: 'estourado' },
        ];
        return construirDados(MOCK);
      }
    },
    staleTime: 5 * 60 * 1000,
  });

  const criarMutation = useMutation({ mutationFn: async (fd: OrcamentoFormData) => create('orcamento', fd as unknown as Record<string, unknown>), onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['orcamento'] }); } });
  const atualizarMutation = useMutation({ mutationFn: async ({ id, formData }: { id: string; formData: OrcamentoFormData }) => update('orcamento', id, formData as unknown as Record<string, unknown>), onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['orcamento'] }); } });
  const excluirMutation = useMutation({ mutationFn: async (id: string) => remove('orcamento', id), onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['orcamento'] }); } });
  return { data, isLoading, criar: criarMutation.mutate, atualizar: atualizarMutation.mutate, excluir: excluirMutation.mutate, isSaving: criarMutation.isPending || atualizarMutation.isPending };
}
