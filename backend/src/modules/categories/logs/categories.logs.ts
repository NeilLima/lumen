/* eslint-disable prettier/prettier */
import { Logger } from '@nestjs/common';

export const categoriesLogger = new Logger('CategoriesModule');

export function logCategoryCreated(categoryId: string, userId: string): void {
  categoriesLogger.log(`Categoria criada: ${categoryId} (usuário ${userId})`);
}

export function logCategoryUpdated(categoryId: string, userId: string): void {
  categoriesLogger.log(`Categoria atualizada: ${categoryId} (usuário ${userId})`);
}

export function logCategoryRemoved(categoryId: string, userId: string): void {
  categoriesLogger.log(`Categoria removida: ${categoryId} (usuário ${userId})`);
}
