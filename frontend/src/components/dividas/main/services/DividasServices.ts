import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { list, create, update, remove } from '@/services/crudService';
import type { Divida, DividasData, DividasFormData } from '../types/DividasTypes';
function calcResumo(d: Divida[]): DividasData['resumo'] {
  return { totalDividas: d.length, totalValor: d.reduce((a, x) => a + x.valor, 0), totalAtrasado: d.filter(x => x.situacao === 'atrasada').reduce((a, x) => a + x.valor, 0), totalQuitado: d.filter(x => x.situacao === 'quitada').reduce((a, x) => a + x.valor, 0), totalEmDia: d.filter(x => x.situacao === 'em_dia').reduce((a, x) => a + x.valor, 0) };
}
function build(d: Divida[]): DividasData { return { dividas: d, resumo: calcResumo(d) }; }
export function dividasService() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['dividas'], queryFn: async () => {
      try { const r = await list('dividas'); return build(r as Divida[]); }
      catch {
        const MOCK: Divida[] = [
          { id: '1', nome: 'Emprestimo Carro', tipo: 'banco', valor: 25000, parcelas: 48, parcelasPagas: 12, juros: 1.5, dataVencimento: '2026-08-15', situacao: 'em_dia', categoria: 'Veiculo', categoriaCor: '#3b82f6', categoriaIcone: 'car' },
          { id: '2', nome: 'Cartao Credito', tipo: 'banco', valor: 3500, parcelas: 1, parcelasPagas: 0, juros: 12, dataVencimento: '2026-07-10', situacao: 'atrasada', categoria: 'Cartao', categoriaCor: '#ef4444', categoriaIcone: 'card' },
          { id: '3', nome: 'Emprestimo Familiar', tipo: 'pessoa', valor: 5000, parcelas: 10, parcelasPagas: 10, juros: 0, dataVencimento: '2026-06-01', situacao: 'quitada', categoria: 'Pessoal', categoriaCor: '#10b981', categoriaIcone: 'user' },
        ];
        return build(MOCK);
      }
    }, staleTime: 5 * 60 * 1000,
  });
  const criar = useMutation({ mutationFn: async (fd: DividasFormData) => create('dividas', fd as unknown as Record<string, unknown>), onSuccess: () => { qc.invalidateQueries({ queryKey: ['dividas'] }); } });
  const atualizar = useMutation({ mutationFn: async ({ id, fd }: { id: string; fd: DividasFormData }) => update('dividas', id, fd as unknown as Record<string, unknown>), onSuccess: () => { qc.invalidateQueries({ queryKey: ['dividas'] }); } });
  const excluir = useMutation({ mutationFn: async (id: string) => remove('dividas', id), onSuccess: () => { qc.invalidateQueries({ queryKey: ['dividas'] }); } });
  return { data, isLoading, criar: criar.mutate, atualizar: atualizar.mutate, excluir: excluir.mutate, isSaving: criar.isPending || atualizar.isPending };
}
