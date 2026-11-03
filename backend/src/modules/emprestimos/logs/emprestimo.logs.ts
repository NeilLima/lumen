/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';

export const emprestimoLogger = new Logger('EmprestimoModule');

export function logEmprestimoCreated(id: string, userId: string): void {
  emprestimoLogger.log(`Orçamento criado: ${id} (usuário ${userId})`);
}

export function logEmprestimoUpdated(id: string, userId: string): void {
  emprestimoLogger.log(`Orçamento atualizado: ${id} (usuário ${userId})`);
}

export function logEmprestimoRemoved(id: string, userId: string): void {
  emprestimoLogger.log(`Orçamento removido: ${id} (usuário ${userId})`);
}
