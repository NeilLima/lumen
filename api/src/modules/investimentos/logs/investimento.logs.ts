/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';

export const investimentoLogger = new Logger('InvestimentoModule');

export function logInvestimentoCreated(id: string, userId: string): void {
  investimentoLogger.log(`Orçamento criado: ${id} (usuário ${userId})`);
}

export function logInvestimentoUpdated(id: string, userId: string): void {
  investimentoLogger.log(`Orçamento atualizado: ${id} (usuário ${userId})`);
}

export function logInvestimentoRemoved(id: string, userId: string): void {
  investimentoLogger.log(`Orçamento removido: ${id} (usuário ${userId})`);
}
