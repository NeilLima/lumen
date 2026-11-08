/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller.js';
import { ProductsService } from './services/products.service.js';
import { ProductsRepository } from './repository/products.repository.js';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  exports: [ProductsService],
})
export class ProductsModule {}