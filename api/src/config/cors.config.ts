import { registerAs } from '@nestjs/config';

const isDev = process.env.NODE_ENV !== 'production';

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'https://lumen-frontend.vercel.app',
  'https://lumen-frontend-gold.vercel.app',
  process.env.NEXT_PUBLIC_FRONTEND_URL,
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

export const corsConfig = {
  // Em desenvolvimento, permite qualquer origem (PC, celular via Wi-Fi, etc.)
  // Em produção, apenas origens específicas (incluindo deploys do Vercel)
  origin: isDev
    ? true
    : (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        // Permite qualquer deploy do projeto no Vercel (evita quebra com novas URLs)
        if (/\.vercel\.app$/.test(origin)) return callback(null, true);
        return callback(new Error('Not allowed by CORS'), false);
      },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

export default registerAs('cors', () => corsConfig);
