import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { list, create, update, remove } from '@/services/crudService';
import { useAuth } from '@/hooks/useAuth';
import type {
  Transferencia,
  TransferenciasData,
  TransferenciasFormData,
  ApiAccount,
  ApiTransfer,
} from '../types/TransferenciasTypes';

function toDateInput(iso: string): string {
  return iso ? iso.split('T')[0] : '';
}

function parseDestino(notes?: string | null): { destino: string; obs: string } {
  const m = (notes || '').match(/Destino:\s*([^|]+)/);
  const destino = m ? m[1].trim() : '';
  const obs = (notes || '').replace(/Destino:\s*[^|]+\|?\s*/g, '').trim();
  return { destino, obs };
}

function apiToTransfer(t: ApiTransfer): Transferencia {
  const { destino, obs } = parseDestino(t.notes);
  return {
    id: t.id,
    descricao: t.description,
    valor: Number(t.amount),
    contaOrigem: t.accountName || '',
    contaDestino: destino,
    data: toDateInput(t.date),
    observacoes: obs || undefined,
  };
}

export function transferenciasService() {
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  const { data: transfers, isLoading: loadingTransfers } = useQuery({
    queryKey: ['transferencias', userId],
    queryFn: () => list('transactions?type=TRANSFER'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const { data: accounts } = useQuery({
    queryKey: ['transferencias-contas', userId],
    queryFn: () => list('accounts'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const contas = ((accounts as ApiAccount[]) || []).sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const data: TransferenciasData = {
    transferencias: ((transfers as ApiTransfer[]) || []).map(apiToTransfer),
    resumo: (() => {
      const t = ((transfers as ApiTransfer[]) || []).map(apiToTransfer);
      const total = t.reduce((a, c) => a + c.valor, 0);
      return {
        totalTransferido: total,
        quantidade: t.length,
        media: t.length > 0 ? total / t.length : 0,
        maiorTransferencia: t.length > 0 ? t.reduce((m, a) => (a.valor > m.valor ? a : m)) : null,
      };
    })(),
    contas: contas.map((c) => c.name),
  };

  function resolverIds(formData: TransferenciasFormData) {
    const origem = contas.find((c) => c.name === formData.contaOrigem);
    return { origemId: origem ? origem.id : null };
  }

  const criarMutation = useMutation({
    mutationFn: async (formData: TransferenciasFormData) => {
      const { origemId } = resolverIds(formData);
      const notesParts: string[] = [`Destino: ${formData.contaDestino}`];
      if (formData.observacoes) notesParts.push(formData.observacoes);
      return create('transactions', {
        description: formData.descricao,
        amount: Number(formData.valor),
        date: formData.data,
        type: 'TRANSFER',
        accountId: origemId || undefined,
        notes: notesParts.join(' | '),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transferencias', userId] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const atualizarMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: TransferenciasFormData }) => {
      const { origemId } = resolverIds(formData);
      const notesParts: string[] = [`Destino: ${formData.contaDestino}`];
      if (formData.observacoes) notesParts.push(formData.observacoes);
      return update('transactions', id, {
        description: formData.descricao,
        amount: Number(formData.valor),
        date: formData.data,
        accountId: origemId || undefined,
        notes: notesParts.join(' | '),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transferencias', userId] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const excluirMutation = useMutation({
    mutationFn: (id: string) => remove('transactions', id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transferencias', userId] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  return {
    data,
    isLoading: loadingTransfers,
    criar: criarMutation.mutateAsync,
    atualizar: atualizarMutation.mutateAsync,
    excluir: excluirMutation.mutateAsync,
    isSaving: criarMutation.isPending || atualizarMutation.isPending,
  };
}
