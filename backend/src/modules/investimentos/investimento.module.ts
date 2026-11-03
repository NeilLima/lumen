/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { InvestimentoController } from './controllers/investimento.controller.js';
import { InvestimentoService } from './services/investimento.service.js';
import { InvestimentoRepository } from './repository/investimento.repository.js';

@Module({
  controllers: [InvestimentoController],
  providers: [InvestimentoService, InvestimentoRepository],
  exports: [InvestimentoService],
})
export class InvestimentoModule {}
