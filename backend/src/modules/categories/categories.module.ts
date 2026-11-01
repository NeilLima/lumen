/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories.controller.js';
import { CategoriesService } from './services/categories.service.js';
import { CategoriesRepository } from './repository/categories.repository.js';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository],
  exports: [CategoriesService],
})
export class CategoriesModule {}
