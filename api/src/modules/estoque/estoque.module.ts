/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EstoqueController } from './controllers/estoque.controller.js';
import { EstoqueService } from './services/estoque.service.js';
import { EstoqueRepository } from './repository/estoque.repository.js';

@Module({
  controllers: [EstoqueController],
  providers: [EstoqueService, EstoqueRepository],
  exports: [EstoqueService],
})
export class EstoqueModule {}