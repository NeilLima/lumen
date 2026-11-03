/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { EmprestimosController } from './controllers/emprestimos.controller.js';
import { EmprestimosService } from './services/emprestimos.service.js';
import { EmprestimosRepository } from './repository/emprestimos.repository.js';

@Module({
  controllers: [EmprestimosController],
  providers: [EmprestimosService, EmprestimosRepository],
  exports: [EmprestimosService],
})
export class EmprestimosModule {}
