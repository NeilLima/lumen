/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TransactionsController } from './controllers/transactions.controller.js';
import { TransactionsService } from './services/transactions.service.js';
import { TransactionsRepository } from './repository/transactions.repository.js';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionsRepository],
  exports: [TransactionsService],
})
export class TransactionsModule {}
