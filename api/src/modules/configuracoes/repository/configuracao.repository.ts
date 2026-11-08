/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../core/prisma/prisma.service.js';

@Injectable()
export class ConfiguracaoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.setting.findMany({
      where: { userId },
      
      orderBy: { createdAt: 'asc' },
    });
  }

  async findById(userId: string, id: string) {
    return this.prisma.setting.findFirst({ where: { id, userId } });
  }

  async create(userId: string, data: Prisma.SettingUncheckedCreateInput) {
    return this.prisma.setting.create({ data: { ...data, userId } });
  }

  async update(userId: string, id: string, data: Prisma.SettingUncheckedUpdateInput) {
    return this.prisma.setting.updateMany({ where: { id, userId }, data });
  }

  async remove(userId: string, id: string) {
    return this.prisma.setting.deleteMany({ where: { id, userId } });
  }
}
