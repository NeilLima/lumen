import type { FeedbackData } from '@/shared/feedback';

export type ContasFeedback = FeedbackData;

export interface Conta {
  id: string; nome: string; tipo: 'corrente' | 'poupanca' | 'carteira' | 'digital';
  saldo: number; banco: string; icone: string; cor: string; ativa: boolean;
}
export interface ContasFiltros { pesquisa: string; tipo: string; banco: string; status: string }
export interface ContasResumo { totalSaldo: number; quantidade: number; maiorSaldo: Conta | null; contasAtivas: number }
export interface ContasData { contas: Conta[]; resumo: ContasResumo; bancos: string[] }
export interface ContasFormData { nome: string; tipo: Conta['tipo']; saldo: string; banco: string; cor: string }
export interface ContasState { data: ContasData | null; isLoading: boolean; filtros: ContasFiltros; modalAberto: boolean; editandoId: string | null; formData: ContasFormData; exclusaoPendente: Conta | null; detalheConta: Conta | null; modalInfoAberto: boolean; feedback: ContasFeedback | null }
export interface ContasActions { abrirModalNovo: () => void; abrirModalEditar: (c: Conta) => void; fecharModal: () => void; atualizarFiltro: (c: keyof ContasFiltros, v: string) => void; limparFiltros: () => void; salvarConta: () => Promise<void>; atualizarForm: (c: keyof ContasFormData, v: string) => void; confirmarExclusao: (c: Conta) => void; cancelarExclusao: () => void; confirmarEExcluir: () => Promise<void>; abrirDetalhe: (c: Conta) => void; fecharDetalhe: () => void; abrirInfo: () => void; fecharInfo: () => void; fecharFeedback: () => void }
