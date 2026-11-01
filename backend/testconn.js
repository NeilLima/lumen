const { PrismaClient } = require('@prisma/client');
const raw = "postgresql://neondb_owner:npg_TMjhcIrAH0m1@ep-empty-cell-b56uxvkp-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
const urlWithPool = raw.includes('connection_limit') ? raw : (raw.includes('?') ? `${raw}&connection_limit=5` : `${raw}?connection_limit=5`);
console.log('URL:', urlWithPool);
const prisma = new PrismaClient({ datasources: { db: { url: urlWithPool } } });
prisma.$connect().then(()=>{ console.log('CONNECTED OK'); return prisma.$queryRaw`SELECT 1`; }).then(r=>{ console.log('QUERY OK', r); }).catch(e=>{ console.error('CONNECT FAILED:', e.message); }).finally(()=>prisma.$disconnect());
