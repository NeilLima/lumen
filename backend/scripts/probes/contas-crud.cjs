/**
 * Probe: CRUD de CONTAS Bancárias — regra 15
 * - API REAL + BANCO REAL na mesma execucao; sem id hardcoded.
 * - Cobre os campos novos: bank (banco) e active (ativa).
 * - Validacoes do DTO (400), exclusao reverte, 404 consistente.
 * - LINK (regra 14.3): a conta criada aparece como account aninhada em
 *   GET /incomes (Receitas consome as Contas).
 * - Tudo revertido no cleanup (usuario de teste removido em cascata).
 */
'use strict';

const { check, info, done, bootstrap } = require('./_probe.cjs');

(async () => {
  console.log('\nProbe: CRUD de contas (accounts)');
  const { prisma, client, cleanup } = await bootstrap('contas-crud');

  try {
    // 1. CREATE com bank + active -------------------------------------------
    const criada = await client.post('/accounts', {
      name: 'Conta Corrente Probe',
      bank: 'Banco Probe',
      type: 'CHECKING',
      balance: 1500,
      color: '#10b981',
      active: true,
    });
    check(criada.status === 201, `POST /accounts criou (status ${criada.status})`);
    if (criada.status !== 201) info(`corpo: ${JSON.stringify(criada.body)}`);
    const id = criada.body && criada.body.id;
    check(!!id, 'conta criada tem id');

    if (id) {
      // 2. Banco REAL: bank/active persistidos -------------------------------
      const row = await prisma.account.findUnique({ where: { id } });
      check(!!row, 'conta existe no banco real');
      check(row && row.bank === 'Banco Probe', `bank "Banco Probe" no banco (obteve ${row && row.bank})`);
      check(row && row.active === true, `active true no banco (obteve ${row && row.active})`);
      check(row && Number(row.balance) === 1500, `balance 1500 no banco (obteve ${row && Number(row.balance)})`);

      // 3. Listagem reflete os novos campos ----------------------------------
      const lista = await client.get('/accounts');
      const alvo = (Array.isArray(lista.body) ? lista.body : []).find((a) => a.id === id);
      check(lista.status === 200, `GET /accounts responde 200 (obteve ${lista.status})`);
      check(!!alvo, 'conta criada aparece na listagem');
      check(alvo && alvo.bank === 'Banco Probe', 'listagem traz bank');

      // 4. UPDATE: muda saldo, banco e desativa ------------------------------
      const editada = await client.patch(`/accounts/${id}`, {
        name: 'Conta Corrente Probe Editada',
        bank: 'Banco Probe 2',
        balance: 2000,
        active: false,
      });
      check(editada.status === 200, `PATCH /accounts/:id (obteve ${editada.status})`);
      const rowDepois = await prisma.account.findUnique({ where: { id } });
      check(rowDepois && rowDepois.name === 'Conta Corrente Probe Editada', 'nome editado no banco');
      check(rowDepois && rowDepois.bank === 'Banco Probe 2', 'bank editado no banco');
      check(rowDepois && rowDepois.active === false, `active false apos edit (obteve ${rowDepois && rowDepois.active})`);
      check(rowDepois && Number(rowDepois.balance) === 2000, 'balance 2000 apos edit');

      // 5. Validacoes do DTO (400) -------------------------------------------
      const semNome = await client.post('/accounts', { balance: 10 });
      check(semNome.status === 400, `sem nome retorna 400 (obteve ${semNome.status})`);

      const saldoNegativo = await client.post('/accounts', {
        name: 'Saldo Negativo',
        balance: -5,
      });
      check(saldoNegativo.status === 400, `saldo negativo retorna 400 (obteve ${saldoNegativo.status})`);

      const tipoErrado = await client.post('/accounts', {
        name: 'Tipo Errado',
        type: 'FOO',
      });
      check(tipoErrado.status === 400, `type invalido retorna 400 (obteve ${tipoErrado.status})`);

      // 6. LINK (regra 14.3): conta vira account aninhada em Receitas ---------
      const cats = await client.get('/categories');
      const salario = (Array.isArray(cats.body) ? cats.body : []).find(
        (c) => c.name === 'Salário',
      );
      const receita = await client.post('/incomes', {
        description: 'Receita vinculada a conta probe',
        amount: 100,
        date: '2026-10-20',
        accountId: id,
        categoryId: salario ? salario.id : undefined,
      });
      check(receita.status === 201, `receita criada na conta probe (status ${receita.status})`);
      const listaInc = await client.get('/incomes');
      const inc = (Array.isArray(listaInc.body) ? listaInc.body : []).find(
        (r) => r.description === 'Receita vinculada a conta probe',
      );
      check(!!inc && inc.account && inc.account.id === id, 'GET /incomes traz a conta aninhada (link Contas -> Receitas)');

      // 7. Exclusao reverte no banco ------------------------------------------
      if (inc) {
        await client.del(`/incomes/${inc.id}`);
      }
      const excluida = await client.del(`/accounts/${id}`);
      check(excluida.status === 200, `DELETE /accounts/:id (obteve ${excluida.status})`);
      const sumiu = await prisma.account.findUnique({ where: { id } });
      check(sumiu === null, 'exclusao removeu do banco real');

      const deNovo = await client.del(`/accounts/${id}`);
      check(deNovo.status === 404, `excluir de novo retorna 404 (obteve ${deNovo.status})`);
    }
  } catch (err) {
    info(`excecao: ${err.message}`);
    check(false, 'probe terminou sem excecoes');
  } finally {
    await cleanup();
  }

  await done();
})();
