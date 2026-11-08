/**
 * Limpeza de emergencia: remove usuarios de teste deixados por probes que
 * abortaram antes do cleanup (ex.: queda de rede/banco no meio da execucao).
 * Nao roda no run-all (prefixo _).
 * Uso: node scripts/probes/_cleanup-users.cjs
 */
'use strict';

const { PrismaClient } = require('@prisma/client');

(async () => {
  const prisma = new PrismaClient();
  try {
    const r = await prisma.user.deleteMany({
      where: { email: { contains: '@lumen-test.com' } },
    });
    console.log(`Usuarios de teste removidos: ${r.count}`);
    process.exitCode = 0;
  } catch (err) {
    console.error(`Falha na limpeza: ${err.message}`);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
})();
