/**
 * Probe: categorias de RECEITA (regra 15)
 * - GET /categories cria as categorias padrao de receita (incluindo as novas
 *   de demissao/verbas rescisoras) quando faltarem, sem duplicar.
 * - CRUD real: criar categoria de receita -> some no banco? -> excluir reverte.
 * - Banco REAL verificado via Prisma na mesma execucao.
 */
'use strict';

const { check, info, done, bootstrap } = require('./_probe.cjs');

const CATEGORIAS_OBRIGATORIAS = [
  'Salário',
  '13º Salário',
  'Férias',
  'Freelance',
  'Demissão / Rescisão',
  'Aviso Prévio Indenizado',
  'Multa Rescisória (FGTS)',
  'FGTS / Saque-Aniversário',
  'Seguro-Desemprego',
  'Aluguel Recebido',
  'Dividendos / JCP',
  'Reembolso / Restituição',
  'Outras Receitas',
];

(async () => {
  console.log('\nProbe: categorias de receita');
  const { prisma, client, userId, cleanup } = await bootstrap('categories-receitas');

  try {
    // 1. Listagem cria as padroes (seed implicito) -------------------------
    const first = await client.get('/categories');
    check(first.status === 200, `GET /categories responde 200 (obteve ${first.status})`);
    check(Array.isArray(first.body), 'GET /categories retorna array');

    const list = Array.isArray(first.body) ? first.body : [];
    for (const nome of CATEGORIAS_OBRIGATORIAS) {
      const cat = list.find((c) => c.name === nome);
      check(!!cat, `categoria padrao "${nome}" existe`);
      if (cat) {
        check(cat.type === 'INCOME', `"${nome}" tem type INCOME (obteve ${cat.type})`);
      }
    }

    // 2. Segunda chamada nao duplica ---------------------------------------
    const second = await client.get('/categories');
    const list2 = Array.isArray(second.body) ? second.body : [];
    const qtdSalario = list2.filter((c) => c.name === 'Salário').length;
    check(qtdSalario === 1, `sem duplicidade: "Salário" aparece ${qtdSalario}x`);

    // 3. Banco REAL: as categorias persistiram (escopo do usuario de teste) ---
    const noBanco = await prisma.category.findMany({
      where: { name: 'Demissão / Rescisão', userId },
    });
    check(noBanco.length === 1, 'categoria "Demissão / Rescisão" persiste no banco real');
    check(
      noBanco.length === 1 && noBanco[0].type === 'INCOME',
      'categoria de demissao gravada com type INCOME',
    );

    // 4. CRUD: criar -> existe no banco -> excluir reverte -------------------
    const criada = await client.post('/categories', {
      name: 'Receita Probe Temporaria',
      color: '#10b981',
      icon: '🧪',
      type: 'INCOME',
    });
    check(
      criada.status === 201 && criada.body && !!criada.body.id,
      `POST /categories criou (status ${criada.status})`,
    );
    const catId = criada.body && criada.body.id;

    if (catId) {
      const noBancoCriada = await prisma.category.findUnique({ where: { id: catId } });
      check(!!noBancoCriada, 'categoria criada existe no banco real');

      const listagem = await client.get('/categories');
      const achou = (listagem.body || []).some((c) => c.id === catId);
      check(achou, 'categoria criada aparece na listagem');

      const excluida = await client.del(`/categories/${catId}`);
      check(excluida.status === 200, `DELETE /categories/:id (obteve ${excluida.status})`);
      const depois = await prisma.category.findUnique({ where: { id: catId } });
      check(depois === null, 'exclusao removeu do banco real');

      const deNovo = await client.del(`/categories/${catId}`);
      check(deNovo.status === 404, `excluir de novo retorna 404 (obteve ${deNovo.status})`);
    }

    // 5. Validacao: sem nome retorna 400 ------------------------------------
    const semNome = await client.post('/categories', { type: 'INCOME' });
    check(semNome.status === 400, `POST sem nome retorna 400 (obteve ${semNome.status})`);

    // 6. Tipo invalido retorna 400 ------------------------------------------
    const tipoErrado = await client.post('/categories', {
      name: 'Tipo Invalido Probe',
      type: 'FOO',
    });
    check(tipoErrado.status === 400, `POST com type invalido retorna 400 (obteve ${tipoErrado.status})`);
  } catch (err) {
    info(`excecao: ${err.message}`);
    check(false, 'probe terminou sem excecoes');
  } finally {
    await cleanup();
  }

  await done();
})();
