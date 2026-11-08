/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';

export const notificacaoLogger = new Logger('NotificacaoModule');

export function logNotificacaoCreated(id: string, userId: string): void {
  notificacaoLogger.log(`Orçamento criado: ${id} (usuário ${userId})`);
}

export function logNotificacaoUpdated(id: string, userId: string): void {
  notificacaoLogger.log(`Orçamento atualizado: ${id} (usuário ${userId})`);
}

export function logNotificacaoRemoved(id: string, userId: string): void {
  notificacaoLogger.log(`Orçamento removido: ${id} (usuário ${userId})`);
}
