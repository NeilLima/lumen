/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../core/prisma/prisma.service.js';

@Injectable()
export class CardsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.creditCard.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findById(userId: string, id: string) {
    return this.prisma.creditCard.findFirst({ where: { id, userId } });
  }

  async create(userId: string, data: Prisma.CreditCardUncheckedCreateInput) {
    return this.prisma.creditCard.create({ data: { ...data, userId } });
  }

  async update(userId: string, id: string, data: Prisma.CreditCardUncheckedUpdateInput) {
    return this.prisma.creditCard.updateMany({ where: { id, userId }, data });
  }

  async remove(userId: string, id: string) {
    return this.prisma.creditCard.deleteMany({ where: { id, userId } });
  }
}