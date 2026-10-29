/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';

export const transactionsLogger = new Logger('TransactionsModule');

export function logTransactionCreated(transactionId: string, userId: string): void {
  transactionsLogger.log(`Transação criada: ${transactionId} (usuário ${userId})`);
}

export function logTransactionUpdated(transactionId: string, userId: string): void {
  transactionsLogger.log(`Transação atualizada: ${transactionId} (usuário ${userId})`);
}

export function logTransactionRemoved(transactionId: string, userId: string): void {
  transactionsLogger.log(`Transação removida: ${transactionId} (usuário ${userId})`);
}
