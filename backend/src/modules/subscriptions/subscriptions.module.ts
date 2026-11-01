/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SubscriptionsController } from './controllers/subscriptions.controller.js';
import { SubscriptionsService } from './services/subscriptions.service.js';
import { SubscriptionsRepository } from './repository/subscriptions.repository.js';

@Module({
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService, SubscriptionsRepository],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}