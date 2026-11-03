/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { corsConfig } from './config/cors.config.js';
import { resolveDatabaseConnection } from './config/database.bootstrap.js';
import { pathToFileURL } from 'url';

async function bootstrap() {
  await resolveDatabaseConnection();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  app.enableCors(corsConfig);
  const port = process.env.PORT ?? 3002;
  await app.listen(port, '0.0.0.0');
  console.log(`Backend running on: http://0.0.0.0:${port}`);
}

const isMain = process.argv[1] && /main(\.js)?$/.test(process.argv[1]);
if (isMain) {
  bootstrap();
}

let cachedApp: unknown = null;

export default async function handler(req: unknown, res: unknown) {
  try {
    const r = req as { url?: string; headers?: Record<string,string> };
    if (r.url && r.url.startsWith('/api/index')) {
      try {
        const u = new URL(r.url, 'http://localhost');
        const p = u.searchParams.get('path') || (r.headers && (r.headers['x-vercel-original-path'] || r.headers['x-original-url'])) || null;
        if (p) {
          const rest = u.search.replace(/[?&]path=[^&]*/, '').replace(/^\?&?/, '?').replace(/\?$/, '');
          r.url = '/' + p.replace(/^\/+/, '') + (rest && rest !== '?' ? rest : '');
          console.log('HANDLER rewritten url=', r.url);
        }
      } catch { /* keep original */ }
    }
    if (!cachedApp) {
      await resolveDatabaseConnection();
      const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log'] });
      app.enableCors(corsConfig);
      app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
      await app.init();
      cachedApp = app;
      console.log('NestJS app initialized for Vercel');
    }
    const httpAdapter = (cachedApp as { getHttpAdapter(): { getInstance(): unknown } }).getHttpAdapter();
    const instance = httpAdapter.getInstance() as (req: unknown, res: unknown) => void;
    instance(req, res);
  } catch (error) {
    console.error('Vercel handler error:', error instanceof Error ? error.message : 'Error');
    (res as { status(code: number): { json(body: unknown): void } }).status(500).json({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Error',
    });
  }
}