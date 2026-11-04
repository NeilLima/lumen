/* eslint-disable prettier/prettier */
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    const databaseUrl = process.env.DIRECT_URL || process.env.DATABASE_URL;

    // Garante SSL para Neon/Postgres remoto
    let url = databaseUrl || '';
    if (url && !url.includes('sslmode=')) {
      url += url.includes('?') ? '&sslmode=require' : '?sslmode=require';
    }
    // Remove channel_binding (pode derrubar conexoes em alguns providers)
    url = url.replace(/&?channel_binding=require/g, '');

    // Limita conexoes para respeitar o limite do pooler (Neon/Supabase)
    const urlWithPool = url.includes('connection_limit')
      ? url
      : url.includes('?')
        ? `${url}&connection_limit=5`
        : `${url}?connection_limit=5`;

    super({
      log: ['error', 'warn'],
      datasources: {
        db: {
          url: urlWithPool,
        },
      },
    });
  }

  async onModuleInit() {
    let lastError: unknown;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        await this.$connect();
        return;
      } catch (error) {
        lastError = error;
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      }
    }
    throw lastError;
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
