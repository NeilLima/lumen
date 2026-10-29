/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EstoqueController } from './controllers/estoque.controller';
import { EstoqueService } from './services/estoque.service';
import { EstoqueRepository } from './repository/estoque.repository';

@Module({
  controllers: [EstoqueController],
  providers: [EstoqueService, EstoqueRepository],
  exports: [EstoqueService],
})
export class EstoqueModule {}