/* eslint-disable prettier/prettier */
import * as path from 'path';
import * as fs from 'fs';
import { parse as dotenvParse } from 'dotenv';
import { PrismaClient } from '@prisma/client';

/**
 * Bootstrap do banco de dados (executar ANTES de criar o Nest app).
 *
 * Regra de seleção:
 *  - Produção (NODE_ENV=production): usa SEMPRE o banco de produção (.env).
 *  - Local/desenvolvimento:
 *      1. Tenta conectar no banco LOCAL (em .env.local).
 *      2. Se conseguir -> usa o LOCAL.
 *      3. Se NÃO conseguir -> faz fallback para o banco de produção (.env).
 *
 * Define process.env.DATABASE_URL com o banco escolhido para que
 * o PrismaService e as configurações do ConfigModule usem a mesma conexão.
 */
export async function resolveDatabaseConnection(): Promise<{
  database: string;
  host: string;
  isLocal: boolean;
  connectedTo: 'local' | 'production';
}> {
  const cwd = process.cwd();

  const readEnv = (file: string): Record<string, string | undefined> => {
    const fullPath = path.join(cwd, file);
    if (!fs.existsSync(fullPath)) return {};
    try {
      return dotenvParse(fs.readFileSync(fullPath, 'utf8'));
    } catch {
      return {};
    }
  };

  const prodEnv = readEnv('.env'); // banco de produção
  const localEnv = readEnv('.env.local'); // banco local de testes

  const prodUrl = prodEnv.DATABASE_URL || '';
  const defaultLocalUrl = localEnv.DATABASE_URL || prodUrl;
  const localUrl = /(localhost|127\.0\.0\.1)/i.test(defaultLocalUrl)
    ? defaultLocalUrl
    : localEnv.DATABASE_URL || '';

  const inProduction = process.env.NODE_ENV === 'production';

  // Em produção sempre usa o banco remoto (.env)
  if (inProduction && prodUrl) {
    process.env.DATABASE_URL = prodUrl;
    process.env.DIRECT_URL = prodEnv.DIRECT_URL || prodUrl;
    return summarize(prodUrl, false, 'production');
  }

  // Local: tenta conectar primeiro no banco local; senão, fallback para produção.
  const chosen = await testAndPick(localUrl, prodUrl);

  process.env.DATABASE_URL = chosen.url;
  process.env.DIRECT_URL = chosen.url;

  return summarize(chosen.url, chosen.isLocal, chosen.isLocal ? 'local' : 'production');
}

async function testAndPick(
  localUrl: string,
  prodUrl: string,
): Promise<{ url: string; isLocal: boolean }> {
  if (localUrl) {
    const ok = await canConnect(localUrl);
    if (ok) {
      console.log('\n🟢 Banco LOCAL disponível — conectando no banco de testes local.\n');
      return { url: localUrl, isLocal: true };
    }
    console.warn(
      '\n🔴 Não foi possível conectar no banco LOCAL. Usando banco de PRODUÇÃO como fallback.\n',
    );
  }
  return { url: prodUrl || localUrl, isLocal: false };
}

async function canConnect(url: string): Promise<boolean> {
  const prisma = new PrismaClient({
    datasources: { db: { url } },
  });
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  } finally {
    await prisma.$disconnect().catch(() => undefined);
  }
}

function summarize(
  url: string,
  isLocal: boolean,
  connectedTo: 'local' | 'production',
): {
  database: string;
  host: string;
  isLocal: boolean;
  connectedTo: 'local' | 'production';
} {
  const withoutQuery = url.split('?')[0];
  const parts = withoutQuery.split('/');
  const dbName = parts[parts.length - 1] || 'unknown';
  const hostMatch = url.match(/@([^:/]+)/);
  const host = hostMatch ? hostMatch[1] : 'unknown';

  if (!isLocal) {
    console.log('🔛 Conexão definida para PRODUÇÃO (banco remoto).');
  }

  console.log('🔍 Verificando conexão com banco de dados...');
  console.log(`   Banco: ${dbName}`);
  console.log(`   Host: ${host}`);
  console.log(connectedTo === 'local' ? '   Status: ✅ Conectado ao banco LOCAL' : '   Status: ✅ Conectado ao banco de PRODUÇÃO (fallback)');

  return { database: dbName, host, isLocal, connectedTo };
}
