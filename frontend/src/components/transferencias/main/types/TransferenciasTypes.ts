export interface Transferencia {
  id: string;
  descricao: string;
  valor: number;
  contaOrigem: string;
  contaDestino: string;
  data: string;
  observacoes?: string;
}
export interface TransferenciasFiltros { pesquisa: string; contaOrigem: string; contaDestino: string; dataInicio: string; dataFim: string }
export interface TransferenciasResumo { totalTransferido: number; quantidade: number; media: number; maiorTransferencia: Transferencia | null }
export interface TransferenciasData { transferencias: Transferencia[]; resumo: TransferenciasResumo; contas: string[] }
export interface TransferenciasFormData { descricao: string; valor: string; contaOrigem: string; contaDestino: string; data: string; observacoes: string }
export interface TransferenciasState { data: TransferenciasData | null; isLoading: boolean; filtros: TransferenciasFiltros; modalAberto: boolean; editandoId: string | null; formData: TransferenciasFormData; exclusaoPendente: Transferencia | null; detalheTransferencia: Transferencia | null; modalInfoAberto: boolean }
export interface TransferenciasActions { abrirModalNovo: () => void; abrirModalEditar: (t: Transferencia) => void; fecharModal: () => void; atualizarFiltro: (c: keyof TransferenciasFiltros, v: string) => void; limparFiltros: () => void; salvarTransferencia: () => void; excluirTransferencia: (id: string) => void; atualizarForm: (c: keyof TransferenciasFormData, v: string) => void; confirmarExclusao: (t: Transferencia) => void; cancelarExclusao: () => void; confirmarEExcluir: () => void; abrirDetalhe: (t: Transferencia) => void; fecharDetalhe: () => void; abrirInfo: () => void; fecharInfo: () => void }
