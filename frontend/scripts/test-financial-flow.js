/**
 * Testa o fluxo financeiro completo: conta → receita → despesa → dashboard.
 * Uso: node scripts/test-financial-flow.js [API_URL]
 */
const { request } = require('playwright-core');

const API_URL = process.env.API_URL || process.argv[2] || 'http://localhost:3002';
let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) { passed++; console.log(`✅ ${message}`); }
  else { failed++; console.error(`❌ ${message}`); }
}

(async () => {
  const c = await request.newContext({ baseURL: API_URL });
  const email = `flow-${Date.now()}@lumen.com`;

  // Registro + login
  await c.post('/auth/register', { data: { firstName: 'Flow', lastName: 'Test', email, password: 'senha12345' } });
  const login = await c.post('/auth/login', { data: { email, password: 'senha12345' } });
  const { token } = await login.json();
  const auth = { headers: { Authorization: `Bearer ${token}` } };
  assert(login.ok(), 'Login realizado');

  // 1. Cria conta com saldo inicial R$ 1.000
  const acc = await c.post('/accounts', { ...auth, data: { name: 'Nubank', type: 'CHECKING', balance: 1000 } });
  const accBody = await acc.json();
  assert(acc.status() === 201 && accBody.balance === 1000, `Conta criada com saldo 1000 (status ${acc.status()})`);

  // 2. Validação: conta sem nome falha
  const badAcc = await c.post('/accounts', { ...auth, data: { balance: 10 } });
  assert(badAcc.status() === 400, 'Conta sem nome retorna 400');

  // 3. Receita de 500 na conta
  const income = await c.post('/transactions', {
    ...auth,
    data: { description: 'Salário', amount: 500, type: 'INCOME', accountId: accBody.id, date: new Date().toISOString() },
  });
  assert(income.status() === 201, 'Receita de 500 criada');

  // 4. Despesa de 200 na conta
  const expense = await c.post('/transactions', {
    ...auth,
    data: { description: 'Mercado', amount: 200, type: 'EXPENSE', accountId: accBody.id, date: new Date().toISOString() },
  });
  assert(expense.status() === 201, 'Despesa de 200 criada');

  // 5. Saldo da conta atualizado: 1000 + 500 - 200 = 1300
  const accList = await c.get('/accounts', auth);
  const accounts = await accList.json();
  assert(accounts[0]?.balance === 1300, `Saldo da conta atualizado para 1300 (obteve ${accounts[0]?.balance})`);

  // 6. Dashboard calcula de verdade
  const dash = await c.get('/dashboard', auth);
  const d = await dash.json();
  assert(dash.ok(), 'Dashboard responde');
  assert(d.kpis.saldoTotal === 1300, `Saldo total = 1300 (obteve ${d.kpis.saldoTotal})`);
  assert(d.kpis.receitasMes === 500, `Receitas do mês = 500 (obteve ${d.kpis.receitasMes})`);
  assert(d.kpis.despesasMes === 200, `Despesas do mês = 200 (obteve ${d.kpis.despesasMes})`);
  assert(d.kpis.economia === 300, `Economia = 300 (obteve ${d.kpis.economia})`);
  assert(d.transactions.length === 2, `2 transações recentes (obteve ${d.transactions.length})`);
  assert(d.cashFlow.labels.length === 6, `Fluxo de caixa com 6 meses (obteve ${d.cashFlow.labels.length})`);
  assert(d.cashFlow.incomeData.some((v) => v > 0), 'Fluxo de caixa mostra receita no mês atual');

  // 7. Remover despesa reverte saldo: 1300 + 200 = 1500
  const del = await c.delete(`/transactions/${(await expense.json()).id}`, auth);
  assert(del.status() === 200, 'Despesa removida');
  const accList2 = await c.get('/accounts', auth);
  const accounts2 = await accList2.json();
  assert(accounts2[0]?.balance === 1500, `Saldo reverteu para 1500 (obteve ${accounts2[0]?.balance})`);

  await c.dispose();
  console.log(`\nResultado: ${passed} passaram, ${failed} falharam`);
  process.exit(failed > 0 ? 1 : 0);
})();
