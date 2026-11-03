/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';

export const orcamentoLogger = new Logger('OrcamentoModule');

export function logOrcamentoCreated(id: string, userId: string): void {
  orcamentoLogger.log(`Orçamento criado: ${id} (usuário ${userId})`);
}

export function logOrcamentoUpdated(id: string, userId: string): void {
  orcamentoLogger.log(`Orçamento atualizado: ${id} (usuário ${userId})`);
}

export function logOrcamentoRemoved(id: string, userId: string): void {
  orcamentoLogger.log(`Orçamento removido: ${id} (usuário ${userId})`);
}
