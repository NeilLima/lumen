/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DividasController } from './controllers/dividas.controller.js';
import { DividasService } from './services/dividas.service.js';
import { DividasRepository } from './repository/dividas.repository.js';

@Module({
  controllers: [DividasController],
  providers: [DividasService, DividasRepository],
  exports: [DividasService],
})
export class DividasModule {}
