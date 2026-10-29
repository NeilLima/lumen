/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsConfig } from './config/cors.config';
import { resolveDatabaseConnection } from './config/database.bootstrap';

async function bootstrap() {
  // Resolve e conecta no banco: tenta LOCAL primeiro; se falhar, usa PRODUÇÃO
  await resolveDatabaseConnection();

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors(corsConfig);

  const port = process.env.PORT ?? 3002;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Backend is running on: http://0.0.0.0:${port}`);
  console.log(`📱 Access from mobile: http://<YOUR_IP>:${port}`);
}

if (require.main === module) {
  bootstrap();
}

let cachedApp: unknown = null;

// Vercel serverless handler - default export é auto-detectado pela Vercel
export default async function handler(req: unknown, res: unknown) {
  try {
    if (!cachedApp) {
      // Em produção o NODE_ENV=production já força o banco de produção
      await resolveDatabaseConnection();

      const app = await NestFactory.create(AppModule, {
        logger: ['error', 'warn', 'log'],
      });
      app.enableCors(corsConfig);
      app.useGlobalPipes(
        new ValidationPipe({
          whitelist: true,
          forbidNonWhitelisted: true,
          transform: true,
        }),
      );
      await app.init();
      cachedApp = app;
      console.log('✅ NestJS app initialized for Vercel');
    }
    const httpAdapter = (cachedApp as { getHttpAdapter(): { getInstance(): unknown } }).getHttpAdapter();
    const instance = httpAdapter.getInstance() as (req: unknown, res: unknown) => void;
    instance(req, res);
  } catch (error) {
    console.error(
      '🔥 Vercel handler error:',
      error instanceof Error ? error.message : 'Error',
    );
    (res as { status(code: number): { json(body: unknown): void } }).status(500).json({
      statusCode: 500,
      message: error instanceof Error ? error.message : 'Error',
    });
  }
}

