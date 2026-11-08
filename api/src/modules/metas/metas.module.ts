/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MetasController } from './controllers/metas.controller.js';
import { MetasService } from './services/metas.service.js';
import { MetasRepository } from './repository/metas.repository.js';

@Module({
  controllers: [MetasController],
  providers: [MetasService, MetasRepository],
  exports: [MetasService],
})
export class MetasModule {}