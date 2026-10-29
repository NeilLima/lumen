import type { EstoqueItem } from '../../main/types/EstoqueTypes';

export function calcularTotalItem(item: EstoqueItem | null): number {
  if (!item) return 0;
  return item.quantidade * item.preco;
}

export function useEstoqueConfirm() {
  return {
    state: {},
    actions: {},
  };
}