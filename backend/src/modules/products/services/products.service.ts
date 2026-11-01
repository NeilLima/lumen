/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from '../repository/products.repository';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async findAll(userId: string) {
    return this.productsRepository.findAll(userId);
  }

  async findById(userId: string, id: string) {
    const p = await this.productsRepository.findById(userId, id);
    if (!p) return null;
    return p;
  }

  async create(userId: string, dto: CreateProductDto) {
    return this.productsRepository.create(userId, {
      userId,
      name: dto.name,
      category: dto.category,
      unit: dto.unit ?? 'un',
    });
  }

  async update(userId: string, id: string, dto: UpdateProductDto) {
    const existing = await this.productsRepository.findById(userId, id);
    if (!existing) throw new NotFoundException('Produto não encontrado');
    await this.productsRepository.update(userId, id, {
      ...(dto.name !== undefined ? { name: dto.name } : {}),
      ...(dto.category !== undefined ? { category: dto.category } : {}),
      ...(dto.unit !== undefined ? { unit: dto.unit } : {}),
    });
    const p = await this.productsRepository.findById(userId, id);
    if (!p) throw new NotFoundException('Produto não encontrado');
    return p;
  }

  async remove(userId: string, id: string) {
    const existing = await this.productsRepository.findById(userId, id);
    if (!existing) throw new NotFoundException('Produto não encontrado');
    await this.productsRepository.remove(userId, id);
    return { deleted: true };
  }
}