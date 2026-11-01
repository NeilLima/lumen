/* eslint-disable prettier/prettier */
import { Module, Global } from '@nestjs/common';
import { StorageModule } from './storage/storage.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

/**
 * Módulo Core
 * Agrega e exporta todos os recursos reutilizáveis
 */
@Global()
@Module({
  imports: [
    PrismaModule,
    StorageModule,
  ],
  exports: [
    PrismaModule,
    StorageModule,
  ],
})
export class CoreModule {}