import { registerAs } from '@nestjs/config';

const isDev = process.env.NODE_ENV !== 'production';

export const corsConfig = {
  // Em desenvolvimento, permite qualquer origem (PC, celular via Wi-Fi, etc.)
  // Em produção, apenas origens específicas
  origin: isDev ? true : [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'https://frontend-nine-snowy-sn0nvdilry.vercel.app',
    process.env.NEXT_PUBLIC_FRONTEND_URL,
  ].filter(Boolean),
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

export default registerAs('cors', () => corsConfig);
