/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../core/prisma/prisma.service';

@Injectable()
export class SubscriptionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.subscription.findMany({
      where: { userId },
      include: { category: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findById(userId: string, id: string) {
    return this.prisma.subscription.findFirst({ where: { id, userId }, include: { category: true } });
  }

  async create(userId: string, data: Prisma.SubscriptionUncheckedCreateInput) {
    return this.prisma.subscription.create({ data: { ...data, userId }, include: { category: true } });
  }

  async update(userId: string, id: string, data: Prisma.SubscriptionUncheckedUpdateInput) {
    return this.prisma.subscription.updateMany({ where: { id, userId }, data });
  }

  async remove(userId: string, id: string) {
    return this.prisma.subscription.deleteMany({ where: { id, userId } });
  }
}