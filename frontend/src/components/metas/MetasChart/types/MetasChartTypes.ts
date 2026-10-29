export interface MetasChartProps {
  data: {
    metas: { id: string; nome: string; status: string; valorAlvo: number; valorAtual: number; categoriaCor: string; prioridade: string }[];
    resumo: { totalMetas: number; totalConcluidas: number; totalEmAndamento: number; totalValorAlvo: number; totalValorAtual: number; progressoMedio: number };
    evolucaoMensal: { mes: string; depositado: number }[];
  };
  formatarValor: (valor: number) => string;
}