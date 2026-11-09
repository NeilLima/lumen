import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { jsPDF } from 'jspdf';
import { list, create, update, remove } from '@/services/crudService';
import { useAuth } from '@/hooks/useAuth';
import type { Relatorio, RelatoriosData, RelatoriosFormData, RelatorioTransacao } from '../types/RelatoriosTypes';

interface ApiRelatorio {
  id: string;
  nome: string;
  tipo?: string;
  periodo?: string;
  dataInicio?: string;
  dataFim?: string;
  observacoes?: string | null;
  createdAt?: string;
}

const TIPO_META: Record<string, { categoria: string; cor: string; icone: string }> = {
  receitas: { categoria: 'Receitas', cor: '#10b981', icone: '💰' },
  despesas: { categoria: 'Despesas', cor: '#ef4444', icone: '💸' },
  fluxo: { categoria: 'Fluxo', cor: '#3b82f6', icone: '📊' },
  patrimonio: { categoria: 'Patrimônio', cor: '#8b5cf6', icone: '🏦' },
  cartoes: { categoria: 'Cartões', cor: '#f59e0b', icone: '💳' },
  investimentos: { categoria: 'Investimentos', cor: '#06b6d4', icone: '📈' },
  categorias: { categoria: 'Categorias', cor: '#ec4899', icone: '🏷️' },
};

function metaDoTipo(tipo: string) {
  return TIPO_META[tipo] ?? { categoria: 'Geral', cor: '#8b5cf6', icone: '📋' };
}

function apiToRelatorio(r: ApiRelatorio): Relatorio {
  const meta = metaDoTipo(r.tipo || 'fluxo');
  return {
    id: r.id,
    nome: r.nome,
    tipo: r.tipo || 'fluxo',
    periodo: r.periodo || 'mensal',
    dataInicio: r.dataInicio || '',
    dataFim: r.dataFim || '',
    status: 'gerado',
    valor: 0,
    data: r.dataInicio || (r.createdAt ? r.createdAt.split('T')[0] : ''),
    observacoes: r.observacoes || undefined,
    categoria: meta.categoria,
    categoriaCor: meta.cor,
    categoriaIcone: meta.icone,
  };
}

function dentroDoPeriodo(t: RelatorioTransacao, inicio: string, fim: string): boolean {
  const d = (t.date || '').slice(0, 10);
  if (inicio && d < inicio) return false;
  if (fim && d > fim) return false;
  return true;
}

function tipoTransaction(relatorio: Relatorio): string[] {
  if (relatorio.tipo === 'receitas') return ['INCOME'];
  if (relatorio.tipo === 'despesas') return ['EXPENSE'];
  return ['INCOME', 'EXPENSE', 'TRANSFER'];
}

function valorDoRelatorio(relatorio: Relatorio, transacoes: RelatorioTransacao[]): number {
  const tipos = tipoTransaction(relatorio);
  return transacoes
    .filter((t) => tipos.includes(t.type) && dentroDoPeriodo(t, relatorio.dataInicio, relatorio.dataFim))
    .reduce((acc, t) => {
      if (t.type === 'INCOME') return acc + Number(t.amount || 0);
      return acc - Number(t.amount || 0);
    }, 0);
}

function transacoesDoRelatorio(relatorio: Relatorio, transacoes: RelatorioTransacao[]): RelatorioTransacao[] {
  const tipos = tipoTransaction(relatorio);
  return transacoes.filter((t) => tipos.includes(t.type) && dentroDoPeriodo(t, relatorio.dataInicio, relatorio.dataFim));
}

function calcResumo(relatorios: Relatorio[]): RelatoriosData['resumo'] {
  return {
    totalRelatorios: relatorios.length,
    totalReceitas: relatorios.filter((r) => r.tipo === 'receitas').reduce((acc, r) => acc + r.valor, 0),
    totalDespesas: relatorios.filter((r) => r.tipo === 'despesas').reduce((acc, r) => acc + Math.abs(r.valor), 0),
    saldo: relatorios.reduce((acc, r) => acc + r.valor, 0),
  };
}

function construirDados(apiRelatorios: ApiRelatorio[], transacoes: RelatorioTransacao[]): RelatoriosData {
  const relatorios = apiRelatorios.map(apiToRelatorio).map((r) => ({
    ...r,
    valor: valorDoRelatorio(r, transacoes),
  }));
  return { relatorios, resumo: calcResumo(relatorios), transacoes };
}

const fmtBRL = (v: number) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function gerarPdfRelatorio(relatorio: Relatorio, transacoes: RelatorioTransacao[]) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  let y = margin;

  doc.setFontSize(16);
  doc.setTextColor(30, 30, 60);
  doc.text('Lumen - Relatório Financeiro', margin, y);
  y += 8;
  doc.setFontSize(12);
  doc.text(relatorio.nome, margin, y);
  y += 6;
  doc.setFontSize(9);
  doc.setTextColor(110);
  doc.text(`Tipo: ${relatorio.categoria} | Período: ${relatorio.periodo === 'anual' ? 'Anual' : 'Mensal'}`, margin, y);
  doc.text(`De ${relatorio.dataInicio || '—'} até ${relatorio.dataFim || '—'}`, pageWidth - margin, y, { align: 'right' });
  y += 8;

  const itens = transacoesDoRelatorio(relatorio, transacoes).sort((a, b) => (a.date || '').localeCompare(b.date || ''));
  const total = itens.reduce((acc, t) => {
    if (t.type === 'INCOME') return acc + Number(t.amount || 0);
    return acc - Number(t.amount || 0);
  }, 0);

  doc.setFontSize(11);
  doc.setTextColor(30, 30, 60);
  doc.text(`Total do período: ${fmtBRL(total)}`, margin, y);
  y += 6;
  doc.setFontSize(8);
  doc.setTextColor(140);
  doc.text(`${itens.length} lançamento(s) no período`, margin, y);
  y += 8;

  doc.setDrawColor(220);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  doc.setFontSize(9);
  doc.setTextColor(30, 30, 60);
  doc.text('Data', margin, y);
  doc.text('Descrição', margin + 24, y);
  doc.text('Categoria', margin + 95, y);
  doc.text('Valor', pageWidth - margin, y, { align: 'right' });
  y += 5;
  doc.setDrawColor(220);
  doc.line(margin, y, pageWidth - margin, y);
  y += 5;

  doc.setFontSize(8);
  for (const t of itens) {
    if (y > 275) {
      doc.addPage();
      y = margin;
    }
    const sinal = t.type === 'INCOME' ? '+' : '-';
    doc.setTextColor(t.type === 'INCOME' ? 16 : 200, t.type === 'INCOME' ? 160 : 60, t.type === 'INCOME' ? 90 : 60);
    doc.text((t.date || '').slice(0, 10).split('-').reverse().join('/'), margin, y);
    doc.setTextColor(40);
    doc.text(doc.splitTextToSize(t.description || '—', 65)[0], margin + 24, y);
    doc.text(doc.splitTextToSize(t.categoryName || 'Sem categoria', 55)[0], margin + 95, y);
    doc.text(`${sinal} ${fmtBRL(Number(t.amount || 0))}`, pageWidth - margin, y, { align: 'right' });
    y += 5;
  }

  if (relatorio.observacoes) {
    y += 6;
    doc.setFontSize(9);
    doc.setTextColor(110);
    doc.text(`Observações: ${relatorio.observacoes}`, margin, y);
  }

  doc.save(`${relatorio.nome.replace(/[^a-zA-Z0-9À-ÿ-_ ]/g, '')}.pdf`);
}

export function useRelatoriosService() {
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['relatorios', userId],
    queryFn: async () => {
      const [relatorios, transacoes] = await Promise.all([
        list('relatorios'),
        list('transactions'),
      ]);
      const apiRelatorios: ApiRelatorio[] = Array.isArray(relatorios) ? relatorios : (relatorios?.data || []);
      const txs: RelatorioTransacao[] = Array.isArray(transacoes) ? transacoes : (transacoes?.data || []);
      return construirDados(apiRelatorios, txs);
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });

  const criarMutation = useMutation({
    mutationFn: async (formData: RelatoriosFormData) =>
      create('relatorios', {
        nome: formData.nome,
        tipo: formData.tipo,
        periodo: formData.periodo,
        dataInicio: formData.dataInicio,
        dataFim: formData.dataFim,
        observacoes: formData.observacoes || undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['relatorios', userId] });
    },
  });

  const atualizarMutation = useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: RelatoriosFormData }) =>
      update('relatorios', id, {
        nome: formData.nome,
        tipo: formData.tipo,
        periodo: formData.periodo,
        dataInicio: formData.dataInicio,
        dataFim: formData.dataFim,
        observacoes: formData.observacoes || undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['relatorios', userId] });
    },
  });

  const excluirMutation = useMutation({
    mutationFn: (id: string) => remove('relatorios', id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['relatorios', userId] });
    },
  });

  return {
    data,
    isLoading,
    criar: criarMutation.mutateAsync,
    atualizar: atualizarMutation.mutateAsync,
    excluir: excluirMutation.mutateAsync,
    isSaving: criarMutation.isPending || atualizarMutation.isPending,
    gerarPdf: gerarPdfRelatorio,
    transacoes: data?.transacoes,
  };
}
