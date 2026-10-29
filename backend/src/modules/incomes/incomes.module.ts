/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { IncomesController } from './controllers/incomes.controller';
import { IncomesService } from './services/incomes.service';
import { IncomesRepository } from './repository/incomes.repository';

@Module({
  controllers: [IncomesController],
  providers: [IncomesService, IncomesRepository],
  exports: [IncomesService],
})
export class IncomesModule {}