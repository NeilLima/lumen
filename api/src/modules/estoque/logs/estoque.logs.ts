/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';

/**
 * Logs específicos do módulo de estoque.
 */
export const estoqueLogger = new Logger('EstoqueModule');

export function logEstoqueItemCreated(itemId: string, userId: string): void {
  estoqueLogger.log(`Item de estoque criado: ${itemId} (usuário ${userId})`);
}

export function logEstoqueItemUpdated(itemId: string, userId: string): void {
  estoqueLogger.log(`Item de estoque atualizado: ${itemId} (usuário ${userId})`);
}

export function logEstoqueItemRemoved(itemId: string, userId: string): void {
  estoqueLogger.log(`Item de estoque removido: ${itemId} (usuário ${userId})`);
}