/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CardsController } from './controllers/cards.controller';
import { CardsService } from './services/cards.service';
import { CardsRepository } from './repository/cards.repository';

@Module({
  controllers: [CardsController],
  providers: [CardsService, CardsRepository],
  exports: [CardsService],
})
export class CardsModule {}