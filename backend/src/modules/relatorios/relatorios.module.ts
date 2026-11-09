/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RelatoriosController } from './controllers/relatorios.controller.js';
import { RelatoriosService } from './services/relatorios.service.js';
import { RelatoriosRepository } from './repository/relatorios.repository.js';

@Module({
  controllers: [RelatoriosController],
  providers: [RelatoriosService, RelatoriosRepository],
  exports: [RelatoriosService],
})
export class RelatoriosModule {}
