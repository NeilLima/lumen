/**
 * Teste E2E de autenticação via Playwright Request (sem browser).
 * Cria um usuário, faz login e valida o token em /auth/me.
 *
 * Uso: node scripts/test-auth.js
 */
const { request } = require('playwright-core');

const API_URL = process.env.API_URL || process.argv[2] || 'http://localhost:3002';
const timestamp = Date.now();
const testUser = {
  firstName: 'Playwright',
  lastName: 'Tester',
  email: `pw-${timestamp}@lumen.com`,
  password: 'senha12345',
};

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`✅ ${message}`);
  } else {
    failed++;
    console.error(`❌ ${message}`);
  }
}

(async () => {
  const context = await request.newContext({ baseURL: API_URL });
  let token = null;

  try {
    // 1. Health check
    const health = await context.get('/');
    assert(health.ok(), 'Backend está no ar');

    // 2. Registro
    const register = await context.post('/auth/register', { data: testUser });
    const registerBody = await register.json().catch(() => ({}));
    assert(register.ok(), `Registro do usuário ${testUser.email} (status ${register.status()})`);
    assert(
      register.ok() && registerBody.user && registerBody.user.password === undefined,
      'Resposta do registro não expõe a senha'
    );
    assert(
      register.ok() && typeof registerBody.token === 'string' && registerBody.token.length > 20,
      'Registro retorna token JWT'
    );

    // 3. Registro duplicado deve falhar
    const duplicate = await context.post('/auth/register', { data: testUser });
    assert(duplicate.status() === 409, 'Registro duplicado retorna 409 Conflict');

    // 4. Validação de payload
    const invalid = await context.post('/auth/register', {
      data: { email: 'invalido', password: '123' },
    });
    assert(invalid.status() === 400, 'Payload inválido retorna 400 Bad Request');

    // 5. Login
    const login = await context.post('/auth/login', {
      data: { email: testUser.email, password: testUser.password },
    });
    const loginBody = await login.json().catch(() => ({}));
    assert(login.ok(), 'Login com credenciais válidas');
    token = loginBody.token;
    assert(typeof token === 'string' && token.length > 20, 'Login retorna token JWT');

    // 6. Login com senha errada
    const badLogin = await context.post('/auth/login', {
      data: { email: testUser.email, password: 'errada1234' },
    });
    assert(badLogin.status() === 401, 'Login com senha errada retorna 401');

    // 7. /auth/me com token
    const me = await context.get('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const meBody = await me.json().catch(() => ({}));
    assert(me.ok() && meBody.email === testUser.email, 'GET /auth/me retorna o usuário autenticado');

    // 8. /auth/me sem token
    const meNoToken = await context.get('/auth/me');
    assert(meNoToken.status() === 401, 'GET /auth/me sem token retorna 401');
  } catch (error) {
    failed++;
    console.error('❌ Erro inesperado:', error.message);
  } finally {
    await context.dispose();
  }

  console.log(`\nResultado: ${passed} passaram, ${failed} falharam`);
  process.exit(failed > 0 ? 1 : 0);
})();
