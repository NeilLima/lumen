/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';

export const configuracaoLogger = new Logger('ConfiguracaoModule');

export function logConfiguracaoCreated(id: string, userId: string): void {
  configuracaoLogger.log(`Orçamento criado: ${id} (usuário ${userId})`);
}

export function logConfiguracaoUpdated(id: string, userId: string): void {
  configuracaoLogger.log(`Orçamento atualizado: ${id} (usuário ${userId})`);
}

export function logConfiguracaoRemoved(id: string, userId: string): void {
  configuracaoLogger.log(`Orçamento removido: ${id} (usuário ${userId})`);
}
