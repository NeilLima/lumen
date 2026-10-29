/**
 * Testa o endpoint GET /dashboard: registra usuário, faz login e valida resposta.
 * Uso: node scripts/test-dashboard.js [API_URL]
 */
const { request } = require('playwright-core');

const API_URL = process.env.API_URL || process.argv[2] || 'http://localhost:3002';

(async () => {
  const c = await request.newContext({ baseURL: API_URL });
  const email = `dash-${Date.now()}@lumen.com`;
  await c.post('/auth/register', { data: { firstName: 'Dash', lastName: 'Test', email, password: 'senha12345' } });
  const login = await c.post('/auth/login', { data: { email, password: 'senha12345' } });
  const body = await login.json();
  const res = await c.get('/dashboard', { headers: { Authorization: `Bearer ${body.token}` } });
  const data = await res.json();
  console.log('GET /dashboard:', res.status());
  console.log('user:', data.user?.email);
  console.log('kpis:', JSON.stringify(data.kpis));
  console.log('alerts vazio:', Array.isArray(data.alerts) && data.alerts.length === 0);
  await c.dispose();
})();
