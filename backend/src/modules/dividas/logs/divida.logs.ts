/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';

export const dividaLogger = new Logger('DividaModule');

export function logDividaCreated(id: string, userId: string): void {
  dividaLogger.log(`Orçamento criado: ${id} (usuário ${userId})`);
}

export function logDividaUpdated(id: string, userId: string): void {
  dividaLogger.log(`Orçamento atualizado: ${id} (usuário ${userId})`);
}

export function logDividaRemoved(id: string, userId: string): void {
  dividaLogger.log(`Orçamento removido: ${id} (usuário ${userId})`);
}
