/**
 * Helper oficial dos probes (.cjs) — regra 15.1.
 * - Roda contra a API REAL e o BANCO REAL na mesma execucao.
 * - Le .env do backend (PORT/DATABASE_URL — o JWT e emitido pelo proprio
 *   backend na autenticacao real via /auth/login).
 * - Sem id hardcoded: os ids sao resolvidos dinamicamente pelas respostas.
 * - Tudo que gravar e revertido no final (cleanup remove o usuario de teste,
 *   e as relations do Prisma caem em cascata).
 * - check() + done(); exit 0 quando tudo passa, exit 1 quando algo falha.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

// ---------------------------------------------------------------------------
// .env do backend
// ---------------------------------------------------------------------------
const ENV_PATH = path.join(__dirname, '..', '..', '.env');
function loadEnv() {
  if (!fs.existsSync(ENV_PATH)) return;
  const lines = fs.readFileSync(ENV_PATH, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let value = m[2];
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    if (process.env[m[1]] === undefined) process.env[m[1]] = value;
  }
}
loadEnv();

const PORT = process.env.PORT || '3002';
const BASE_URL = process.env.PROBE_BASE_URL || `http://localhost:${PORT}`;

// ---------------------------------------------------------------------------
// check() / done()
// ---------------------------------------------------------------------------
let passed = 0;
let failed = 0;

function check(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ✅ ${message}`);
  } else {
    failed++;
    console.error(`  ❌ ${message}`);
  }
  return !!condition;
}

function info(message) {
  console.log(`  ℹ️  ${message}`);
}

async function done() {
  console.log(`\nResultado: ${passed} passaram, ${failed} falharam`);
  process.exitCode = failed > 0 ? 1 : 0;
  // Drena o event loop naturalmente; se algo persistir, encerra apos 8s.
  const force = setTimeout(() => {
    process.exit(process.exitCode ?? 0);
  }, 8000);
  force.unref();
}

// ---------------------------------------------------------------------------
// API real
// ---------------------------------------------------------------------------
function apiRequest(token) {
  return {
    async request(method, url, body) {
      const res = await fetch(`${BASE_URL}${url}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          // fecha o socket apos a resposta (evita assert do libuv no Windows
          // ao encerrar o processo com sockets keep-alive abertos)
          Connection: 'close',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: body === undefined ? undefined : JSON.stringify(body),
      });
      let json = null;
      try {
        json = await res.json();
      } catch {
        json = null;
      }
      return { status: res.status, body: json };
    },
    get: (url) => apiRequest(token).request('GET', url),
    post: (url, body) => apiRequest(token).request('POST', url, body),
    patch: (url, body) => apiRequest(token).request('PATCH', url, body),
    del: (url) => apiRequest(token).request('DELETE', url),
  };
}

// ---------------------------------------------------------------------------
// Bootstrap: usuario de teste real (register + login) + Prisma + cleanup
// ---------------------------------------------------------------------------
async function bootstrap(probeName) {
  const prisma = new PrismaClient();
  const email = `probe-${probeName}-${Date.now()}@lumen-test.com`;
  const password = 'senha12345';

  const anon = await apiRequest(null);
  const register = await anon.post('/auth/register', {
    firstName: 'Probe',
    lastName: probeName,
    email,
    password,
  });
  if (register.status !== 201 && register.status !== 200) {
    console.error(`  ❌ Register falhou (status ${register.status})`, register.body);
    await prisma.$disconnect();
    process.exit(1);
  }
  const login = await anon.post('/auth/login', { email, password });
  const loginOk =
    (login.status === 200 || login.status === 201) &&
    login.body &&
    login.body.token;
  if (!loginOk) {
    console.error(`  ❌ Login falhou (status ${login.status})`, login.body);
    await prisma.$disconnect();
    process.exit(1);
  }

  const token = login.body.token;
  // Resolve o id no BANCO (nao depende do shape do payload do login)
  const userRow = await prisma.user.findUnique({ where: { email } });
  const userId = userRow ? userRow.id : null;
  const client = await apiRequest(token);

  async function cleanup() {
    try {
      // Reverte TUDO que o probe gravou (cascata nas relations do schema)
      const row = await prisma.user.findUnique({ where: { email } });
      if (row) {
        await prisma.user.delete({ where: { id: row.id } });
      }
    } catch (err) {
      info(`cleanup do usuario de teste: ${err.message}`);
    }
    await prisma.$disconnect();
  }

  return { prisma, client, token, userId, email, cleanup };
}

module.exports = { check, info, done, bootstrap, BASE_URL };
