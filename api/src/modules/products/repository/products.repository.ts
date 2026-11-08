/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../core/prisma/prisma.service.js';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.product.findMany({ where: { userId }, orderBy: { name: 'asc' } });
  }

  async findById(userId: string, id: string) {
    return this.prisma.product.findFirst({ where: { id, userId } });
  }

  async create(userId: string, data: Prisma.ProductUncheckedCreateInput) {
    return this.prisma.product.create({ data: { ...data, userId } });
  }

  async update(userId: string, id: string, data: Prisma.ProductUncheckedUpdateInput) {
    return this.prisma.product.updateMany({ where: { id, userId }, data });
  }

  async remove(userId: string, id: string) {
    return this.prisma.product.deleteMany({ where: { id, userId } });
  }
}