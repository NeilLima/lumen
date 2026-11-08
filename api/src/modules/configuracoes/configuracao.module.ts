/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfiguracaoController } from './controllers/configuracao.controller.js';
import { ConfiguracaoService } from './services/configuracao.service.js';
import { ConfiguracaoRepository } from './repository/configuracao.repository.js';

@Module({
  controllers: [ConfiguracaoController],
  providers: [ConfiguracaoService, ConfiguracaoRepository],
  exports: [ConfiguracaoService],
})
export class ConfiguracaoModule {}
