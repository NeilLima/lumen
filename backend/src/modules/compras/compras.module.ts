/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ComprasController } from './controllers/compras.controller.js';
import { ComprasService } from './services/compras.service.js';
import { ComprasRepository } from './repository/compras.repository.js';
import { DividasModule } from '../dividas/dividas.module.js';
import { TransactionsModule } from '../transactions/transactions.module.js';

@Module({
  imports: [DividasModule, TransactionsModule],
  controllers: [ComprasController],
  providers: [ComprasService, ComprasRepository],
  exports: [ComprasService],
})
export class ComprasModule {}
