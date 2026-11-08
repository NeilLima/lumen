/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';

/**
 * Logs específicos do módulo de contas.
 */
export const accountsLogger = new Logger('AccountsModule');

export function logAccountCreated(accountId: string, userId: string): void {
  accountsLogger.log(`Conta criada: ${accountId} (usuário ${userId})`);
}

export function logAccountUpdated(accountId: string, userId: string): void {
  accountsLogger.log(`Conta atualizada: ${accountId} (usuário ${userId})`);
}

export function logAccountRemoved(accountId: string, userId: string): void {
  accountsLogger.log(`Conta removida: ${accountId} (usuário ${userId})`);
}
