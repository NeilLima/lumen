import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Transferencia, TransferenciasData, TransferenciasFormData } from '../types/TransferenciasTypes';
const MOCK: Transferencia[] = [
  { id: '1', descricao: 'Transferência para poupança', valor: 2000, contaOrigem: 'Conta Corrente', contaDestino: 'Conta Poupança', data: '2026-07-15' },
  { id: '2', descricao: 'Pagamento de empréstimo', valor: 500, contaOrigem: 'Conta Corrente', contaDestino: 'Carteira', data: '2026-07-18' },
  { id: '3', descricao: 'Investimento CDB', valor: 3000, contaOrigem: 'Conta Corrente', contaDestino: 'Conta Investimento', data: '2026-07-20' },
  { id: '4', descricao: 'Reserva de emergência', valor: 1500, contaOrigem: 'Conta Corrente', contaDestino: 'Conta Poupança', data: '2026-07-22' },
  { id: '5', descricao: 'Transferência para pagamento', valor: 800, contaOrigem: 'Carteira', contaDestino: 'Conta Corrente', data: '2026-07-25' },
  { id: '6', descricao: 'Aporte mensal investimentos', valor: 1000, contaOrigem: 'Conta Corrente', contaDestino: 'Conta Investimento', data: '2026-07-28' },
];
function calc(t: Transferencia[]) {
  const total = t.reduce((a, c) => a + c.valor, 0);
  return { totalTransferido: total, quantidade: t.length, media: t.length > 0 ? total / t.length : 0, maiorTransferencia: t.length > 0 ? t.reduce((m, a) => a.valor > m.valor ? a : m) : null };
}
function build(t: Transferencia[]): TransferenciasData {
  const contas = [...new Set(t.flatMap(x => [x.contaOrigem, x.contaDestino]))];
  return { transferencias: t, resumo: calc(t), contas };
}
export function transferenciasService() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['transferencias'], queryFn: async () => { await new Promise(r => setTimeout(r, 400)); return build(MOCK); }, staleTime: 5 * 60 * 1000 });
  const criar = useMutation({ mutationFn: async (f: TransferenciasFormData) => { await new Promise(r => setTimeout(r, 300)); return { id: String(Date.now()), descricao: f.descricao, valor: Number(f.valor), contaOrigem: f.contaOrigem, contaDestino: f.contaDestino, data: f.data, observacoes: f.observacoes || undefined } as Transferencia; }, onSuccess: () => qc.invalidateQueries({ queryKey: ['transferencias'] }) });
  const atualizar = useMutation({ mutationFn: async ({ id, formData }: { id: string; formData: TransferenciasFormData }) => { await new Promise(r => setTimeout(r, 300)); return { id, formData }; }, onSuccess: () => qc.invalidateQueries({ queryKey: ['transferencias'] }) });
  const excluir = useMutation({ mutationFn: async (id: string) => { await new Promise(r => setTimeout(r, 300)); return id; }, onSuccess: () => qc.invalidateQueries({ queryKey: ['transferencias'] }) });
  return { data, isLoading, criar: criar.mutate, atualizar: atualizar.mutate, excluir: excluir.mutate, isSaving: criar.isPending || atualizar.isPending };
}
