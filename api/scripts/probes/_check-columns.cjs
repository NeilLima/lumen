/**
 * Checagem rapida (nao roda no run-all): colunas da tabela accounts.
 */
'use strict';
const { PrismaClient } = require('@prisma/client');
(async () => {
  const p = new PrismaClient();
  try {
    const cols = await p.$queryRawUnsafe(
      `SELECT column_name FROM information_schema.columns WHERE table_name = 'accounts' ORDER BY ordinal_position`,
    );
    console.log('colunas accounts:', cols.map((c) => c.column_name).join(', '));
  } finally {
    await p.$disconnect();
  }
})();
