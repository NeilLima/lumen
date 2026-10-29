/**
 * Verifica se as páginas /login e /registro respondem no frontend.
 * Uso: node scripts/check-pages.js
 */
const { request } = require('playwright-core');

const raw = process.env.FRONT_URL || process.argv[2] || 'http://localhost:3001';
const BASE = raw.startsWith('http') ? raw : `http://localhost:${raw}`;

(async () => {
  const context = await request.newContext({ baseURL: BASE });
  for (const path of ['/login', '/registro']) {
    const res = await context.get(path);
    console.log(`${path} -> ${res.status()}`);
  }
  await context.dispose();
})();
