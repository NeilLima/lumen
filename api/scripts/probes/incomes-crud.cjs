/**
 * Probe: CRUD de RECEITAS (incomes) — regra 15
 * - API REAL + BANCO REAL na mesma execucao.
 * - Sem id hardcoded: conta e categoria sao resolvidas das respostas.
 * - Cobre os campos novos: status, recurrence e attachment (comprovante URL).
 * - Valida DTO (400), exclusao reverte no banco, 404 consistente.
 * - Tudo revertido no cleanup (usuario de teste removido em cascata).
 */
'use strict';

const { check, info, done, bootstrap } = require('./_probe.cjs');

(async () => {
  console.log('\nProbe: CRUD de receitas (incomes)');
  const { prisma, client, cleanup } = await bootstrap('incomes-crud');

  try {
    // 0. Pre-requisitos reais: conta e categoria (ids dinamicos) -----------
    const acc = await client.post('/accounts', {
      name: 'Conta Probe Receitas',
      type: 'CHECKING',
      balance: 100,
    });
    check(acc.status === 201, `conta de teste criada (status ${acc.status})`);
    const contaId = acc.body && acc.body.id;
    check(!!contaId, 'conta de teste tem id');

    const cats = await client.get('/categories');
    const categorias = Array.isArray(cats.body) ? cats.body : [];
    const salario = categorias.find((c) => c.name === 'Salário');
    check(!!salario, 'categoria "Salário" resolvida da API (sem id hardcoded)');
    const catId = salario ? salario.id : null;

    // 1. CREATE valido com os campos novos ---------------------------------
    const criada = await client.post('/incomes', {
      description: 'Salário mensal probe',
      amount: 4321.55,
      date: '2026-10-10',
      categoryId: catId,
      accountId: contaId,
      status: 'PENDING',
      recurrence: 'MONTHLY',
      attachment: 'https://storage.lumen-test.com/comprovante-probe.pdf',
      notes: 'probe de receitas',
    });
    check(criada.status === 201, `POST /incomes criou (status ${criada.status})`);
    if (criada.status !== 201) info(`corpo: ${JSON.stringify(criada.body)}`);
    const id = criada.body && criada.body.id;
    check(!!id, 'receita criada tem id');

    if (id) {
      // 2. Banco REAL: novos campos persistidos ----------------------------
      const row = await prisma.transaction.findUnique({ where: { id } });
      check(!!row, 'receita existe no banco real');
      check(row && row.type === 'INCOME', `gravada como INCOME (obteve ${row && row.type})`);
      check(row && row.status === 'PENDING', `status PENDING no banco (obteve ${row && row.status})`);
      check(row && row.recurrence === 'MONTHLY', `recurrence MONTHLY no banco (obteve ${row && row.recurrence})`);
      check(
        row && row.attachment === 'https://storage.lumen-test.com/comprovante-probe.pdf',
        'attachment (comprovante URL) no banco',
      );
      check(row && Number(row.amount) === 4321.55, `amount 4321.55 no banco (obteve ${row && Number(row.amount)})`);

      // 3. Listagem reflete categoria/conta (include do repository) --------
      const lista = await client.get('/incomes');
      const alvo = (Array.isArray(lista.body) ? lista.body : []).find((r) => r.id === id);
      check(lista.status === 200, `GET /incomes responde 200 (obteve ${lista.status})`);
      check(!!alvo, 'receita criada aparece na listagem');
      check(alvo && alvo.category && alvo.category.name === 'Salário', 'listagem traz categoria aninhada');
      check(alvo && alvo.account && alvo.account.name === 'Conta Probe Receitas', 'listagem traz conta aninhada');
      check(alvo && typeof alvo.amount === 'number', 'amount convertido para number na resposta');

      // 4. UPDATE: edita e muda status para RECEIVED -----------------------
      const editada = await client.patch(`/incomes/${id}`, {
        description: 'Salário mensal probe EDITADO',
        amount: 5000,
        status: 'RECEIVED',
        recurrence: 'YEARLY',
      });
      check(editada.status === 200, `PATCH /incomes/:id (obteve ${editada.status})`);
      const rowDepois = await prisma.transaction.findUnique({ where: { id } });
      check(rowDepois && rowDepois.description === 'Salário mensal probe EDITADO', 'descricao editada no banco');
      check(rowDepois && rowDepois.status === 'RECEIVED', `status RECEIVED apos edit (obteve ${rowDepois && rowDepois.status})`);
      check(rowDepois && Number(rowDepois.amount) === 5000, `amount 5000 apos edit (obteve ${rowDepois && Number(rowDepois.amount)})`);
      check(rowDepois && rowDepois.recurrence === 'YEARLY', 'recurrence editada no banco');

      // 5. Validacoes do DTO (400) ------------------------------------------
      const blob = await client.post('/incomes', {
        description: 'Comprovante blob',
        amount: 10,
        attachment: 'blob:http://localhost/abc-123',
      });
      check(blob.status === 400, `attachment blob: rejeitado com 400 (obteve ${blob.status})`);

      const statusInvalido = await client.post('/incomes', {
        description: 'Status invalido',
        amount: 10,
        status: 'WHATEVER',
      });
      check(statusInvalido.status === 400, `status invalido rejeitado com 400 (obteve ${statusInvalido.status})`);

      const semDescricao = await client.post('/incomes', { amount: 10 });
      check(semDescricao.status === 400, `sem descricao retorna 400 (obteve ${semDescricao.status})`);

      const valorZerado = await client.post('/incomes', { description: 'Valor zero', amount: 0 });
      check(valorZerado.status === 400, `amount 0 retorna 400 (obteve ${valorZerado.status})`);

      // 6. Exclusao reverte no banco ----------------------------------------
      const excluida = await client.del(`/incomes/${id}`);
      check(excluida.status === 200, `DELETE /incomes/:id (obteve ${excluida.status})`);
      const sumiu = await prisma.transaction.findUnique({ where: { id } });
      check(sumiu === null, 'exclusao removeu do banco real');

      const listaDepois = await client.get('/incomes');
      const aindaLa = (Array.isArray(listaDepois.body) ? listaDepois.body : []).some((r) => r.id === id);
      check(!aindaLa, 'receita excluida sumiu da listagem');

      // 7. 404 consistente ---------------------------------------------------
      const deNovo = await client.del(`/incomes/${id}`);
      check(deNovo.status === 404, `excluir de novo retorna 404 (obteve ${deNovo.status})`);

      const patch404 = await client.patch(`/incomes/${id}`, { description: 'x' });
      check(patch404.status === 404, `PATCH inexistente retorna 404 (obteve ${patch404.status})`);
    }
  } catch (err) {
    info(`excecao: ${err.message}`);
    check(false, 'probe terminou sem excecoes');
  } finally {
    await cleanup();
  }

  await done();
})();
