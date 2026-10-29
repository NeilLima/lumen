/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../core/prisma/prisma.service';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.category.findMany({
      where: { userId },
      orderBy: { name: 'asc' },
    });
  }

  async findById(userId: string, id: string) {
    return this.prisma.category.findFirst({ where: { id, userId } });
  }

  async create(userId: string, data: Prisma.CategoryUncheckedCreateInput) {
    return this.prisma.category.create({ data });
  }

  async update(userId: string, id: string, data: Prisma.CategoryUncheckedUpdateInput) {
    return this.prisma.category.updateMany({ where: { id, userId }, data });
  }

  async remove(userId: string, id: string) {
    return this.prisma.category.deleteMany({ where: { id, userId } });
  }
}
