/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { IncomesController } from './controllers/incomes.controller.js';
import { IncomesService } from './services/incomes.service.js';
import { IncomesRepository } from './repository/incomes.repository.js';

@Module({
  controllers: [IncomesController],
  providers: [IncomesService, IncomesRepository],
  exports: [IncomesService],
})
export class IncomesModule {}