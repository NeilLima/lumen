/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NotificacaoController } from './controllers/notificacao.controller.js';
import { NotificacaoService } from './services/notificacao.service.js';
import { NotificacaoRepository } from './repository/notificacao.repository.js';

@Module({
  controllers: [NotificacaoController],
  providers: [NotificacaoService, NotificacaoRepository],
  exports: [NotificacaoService],
})
export class NotificacaoModule {}
