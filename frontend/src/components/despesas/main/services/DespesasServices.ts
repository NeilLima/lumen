import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { list, create, update, remove } from '@/services/crudService';
import { useAuth } from '@/hooks/useAuth';
import type {
  Despesa,
  DespesasData,
  DespesasFormData,
  ApiCategory,
  ApiAccount,
  ApiCreditCard,
  ApiExpense,
} from '../types/DespesasTypes';

const STATUS_API: Record<string, Despesa['status']> = {
  RECEIVED: 'pago',
  PENDING: 'pendente',
  LATE: 'atrasado',
};

const STATUS_REVERSO: Record<Despesa['status'], string> = {
  pago: 'RECEIVED',
  pendente: 'PENDING',
  atrasado: 'LATE',
};

const ICONE_CONTA: Record<string, string> = {
  CHECKING: '🏦',
  SAVINGS: '🐷',
  WALLET: '👛',
  INVESTMENT: '📈',
};

function toDateInput(iso: string): string {
  return iso ? iso.split('T')[0] : '';
}

function apiToDespesa(expense: ApiExpense): Despesa {
  const prioridade = (expense.paymentMethod as Despesa['prioridade']) || 'media';
  const parcelasMatch = (expense.notes || '').match(/Parcelas:\s*(\d+)/);
  const parcelas = parcelasMatch ? Number(parcelasMatch[1]) : 1;
  const observacoes = (expense.notes || '').replace(/Parcelas:\s*\d+\s*/g, '').trim();

  return {
    id: expense.id,
    nome: expense.description,
    categoria: expense.categoryName || '',
    categoriaCor: expense.categoryColor || '#ef4444',
    categoriaIcone: '💸',
    valor: Number(expense.amount),
    conta: expense.accountName || '',
    contaIcone: '🏦',
    cartao: expense.creditCardName || undefined,
    data: toDateInput(expense.date),
    parcelas: parcelas || 1,
    prioridade: ['baixa', 'media', 'alta'].includes(prioridade) ? prioridade : 'media',
    observacoes: observacoes || undefined,
    status: STATUS_API[expense.status || 'PENDING'] || 'pendente',
  };
}

function toApiPayload(
  formData: DespesasFormData,
  categoriaId: string | null,
  contaId: string | null,
  cartaoId: string | null,
): Record<string, unknown> {
  const notesParts: string[] = [];
  if (formData.observacoes) notesParts.push(formData.observacoes);
  if (formData.parcelas) notesParts.push(`Parcelas: ${formData.parcelas}`);
  return {
    description: formData.nome,
    amount: Number(formData.valor),
    date: formData.data,
    type: 'EXPENSE',
    status: STATUS_REVERSO[formData.status || 'pendente'] || 'PENDING',
    categoryId: categoriaId || undefined,
    accountId: contaId || undefined,
    creditCardId: cartaoId || undefined,
    paymentMethod: formData.prioridade,
    notes: notesParts.length ? notesParts.join(' | ') : undefined,
  };
}

function calcularResumo(despesas: Despesa[]): DespesasResumo {
  const totalPago = despesas
    .filter(d => d.status === 'pago')
    .reduce((acc, d) => acc + d.valor, 0);
  const totalPendente = despesas
    .filter(d => d.status === 'pendente')
    .reduce((acc, d) => acc + d.valor, 0);
  const totalAtrasado = despesas
    .filter(d => d.status === 'atrasado')
    .reduce((acc, d) => acc + d.valor, 0);
  const quantidade = despesas.length;
  const media = quantidade > 0 ? despesas.reduce((acc, d) => acc + d.valor, 0) / quantidade : 0;
  const maiorDespesa = despesas.length > 0
    ? despesas.reduce((maior, atual) => (atual.valor > maior.valor ? atual : maior))
    : null;

  return { totalPago, totalPendente, totalAtrasado, quantidade, media, maiorDespesa };
}

function construirDados(despesas: Despesa[]): DespesasData {
  const categorias = [...new Set(despesas.map(d => d.categoria))];
  const contas = [...new Set(despesas.map(d => d.conta))];
  return {
    despesas,
    resumo: calcularResumo(despesas),
    categorias,
    contas,
  };
}

export function despesasService() {
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  const { data: expenses, isLoading: loadingExpenses } = useQuery({
    queryKey: ['despesas', userId],
    queryFn: () => list('transactions?type=EXPENSE'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const { data: categories } = useQuery({
    queryKey: ['despesas-categorias', userId],
    queryFn: () => list('categories'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const { data: accounts } = useQuery({
    queryKey: ['despesas-contas', userId],
    queryFn: () => list('accounts'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const { data: creditCards } = useQuery({
    queryKey: ['despesas-cartoes', userId],
    queryFn: () => list('cards'),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const categorias = ((categories as ApiCategory[]) || [])
    .filter((c) => c.type === 'EXPENSE' || c.type === 'BOTH')
    .sort((a, b) => a.name.localeCompare(b.name));

  const contas = ((accounts as ApiAccount[]) || []).sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const cartoes = ((creditCards as ApiCreditCard[]) || []).sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const data = construirDados(
    ((expenses as ApiExpense[]) || []).map(apiToDespesa),
  );
  data.categorias = categorias.map((c) => c.name);
  data.contas = contas.map((c) => c.name);

  function resolverIds(formData: DespesasFormData) {
    const categoria = categorias.find((c) => c.name === formData.categoria);
    const conta = contas.find((c) => c.name === formData.conta);
    const cartao = cartoes.find((c) => c.name === formData.cartao);
    return {
      categoriaId: categoria ? categoria.id : null,
      contaId: conta ? conta.id : null,
      cartaoId: cartao ? cartao.id : null,
    };
  }

  const criarMutation = useMutation({
    mutationFn: async (formData: DespesasFormData) => {
      const { categoriaId, contaId, cartaoId } = resolverIds(formData);
      return create('transactions', {
        ...toApiPayload(formData, categoriaId, contaId, cartaoId),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['despesas', userId] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const atualizarMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: DespesasFormData }) => {
      const { categoriaId, contaId, cartaoId } = resolverIds(formData);
      return update('transactions', id, toApiPayload(formData, categoriaId, contaId, cartaoId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['despesas', userId] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const excluirMutation = useMutation({
    mutationFn: (id: string) => remove('transactions', id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['despesas', userId] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  return {
    data,
    isLoading: loadingExpenses,
    criar: criarMutation.mutateAsync,
    atualizar: atualizarMutation.mutateAsync,
    excluir: excluirMutation.mutateAsync,
    isSaving: criarMutation.isPending || atualizarMutation.isPending,
  };
}