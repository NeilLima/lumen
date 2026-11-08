/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CardsController } from './controllers/cards.controller.js';
import { CardsService } from './services/cards.service.js';
import { CardsRepository } from './repository/cards.repository.js';

@Module({
  controllers: [CardsController],
  providers: [CardsService, CardsRepository],
  exports: [CardsService],
})
export class CardsModule {}