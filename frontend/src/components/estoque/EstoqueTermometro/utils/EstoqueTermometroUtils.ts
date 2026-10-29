import type { EstoqueItem } from '../../main/types/EstoqueTypes';

export function calcularPctDe(item: EstoqueItem): number {
  if (item.quantidadeMinima <= 0) return 100;
  return (item.quantidade / item.quantidadeMinima) * 100;
}

export function calcularItensOk(itens: EstoqueItem[]): number {
  return itens.filter(i => calcularPctDe(i) >= 70).length;
}

export function calcularItensBaixos(itens: EstoqueItem[]): number {
  return itens.filter(i => {
    const pct = calcularPctDe(i);
    return pct >= 30 && pct < 70;
  }).length;
}

export function calcularItensCriticos(itens: EstoqueItem[]): number {
  return itens.filter(i => calcularPctDe(i) < 30).length;
}

export function calcularMediaSaude(itens: EstoqueItem[]): number {
  const total = itens.length;
  if (total === 0) return 100;
  return Math.min(100, Math.round(itens.reduce((acc, i) => acc + Math.min(calcularPctDe(i), 100), 0) / total));
}

export function obterCorPorMedia(mediaSaude: number): string {
  if (mediaSaude >= 70) return '#10b981';
  if (mediaSaude >= 30) return '#f59e0b';
  return '#ef4444';
}

export function obterLabelPorMedia(mediaSaude: number): string {
  if (mediaSaude >= 70) return 'Saudável';
  if (mediaSaude >= 30) return 'Atenção';
  return 'Crítico';
}

export interface EstoqueTermometroCalculos {
  totalItens: number;
  itensOk: number;
  itensBaixos: number;
  itensCriticos: number;
  mediaSaude: number;
  cor: string;
  labelStatus: string;
}

export function calcularTermometro(itens: EstoqueItem[]): EstoqueTermometroCalculos {
  const lista = itens || [];
  const totalItens = lista.length;
  const itensOk = calcularItensOk(lista);
  const itensBaixos = calcularItensBaixos(lista);
  const itensCriticos = calcularItensCriticos(lista);
  const mediaSaude = calcularMediaSaude(lista);
  const cor = obterCorPorMedia(mediaSaude);
  const labelStatus = obterLabelPorMedia(mediaSaude);

  return { totalItens, itensOk, itensBaixos, itensCriticos, mediaSaude, cor, labelStatus };
}

export function useEstoqueTermometro() {
  return {
    state: {},
    actions: {},
  };
}