/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../core/prisma/prisma.service.js';

@Injectable()
export class MetasRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.meta.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(userId: string, id: string) {
    return this.prisma.meta.findFirst({ where: { id, userId } });
  }

  async create(userId: string, data: Prisma.MetaUncheckedCreateInput) {
    return this.prisma.meta.create({ data });
  }

  async update(userId: string, id: string, data: Prisma.MetaUncheckedUpdateInput) {
    return this.prisma.meta.updateMany({ where: { id, userId }, data });
  }

  async remove(userId: string, id: string) {
    return this.prisma.meta.deleteMany({ where: { id, userId } });
  }
}