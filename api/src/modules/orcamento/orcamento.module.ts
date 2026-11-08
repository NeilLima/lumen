/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { OrcamentoController } from './controllers/orcamento.controller.js';
import { OrcamentoService } from './services/orcamento.service.js';
import { OrcamentoRepository } from './repository/orcamento.repository.js';

@Module({
  controllers: [OrcamentoController],
  providers: [OrcamentoService, OrcamentoRepository],
  exports: [OrcamentoService],
})
export class OrcamentoModule {}
