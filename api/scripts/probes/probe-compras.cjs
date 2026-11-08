/**
 * Probe: compras — regra 15.1 (API REAL + DB REAL)
 * - Cria compra com itens que tem productId e precoUnitario
 * - Verifica se nome e preco são salvos corretamente
 * - Verifica se productId é persistido
 * - Reverte tudo no final (cleanup)
 */
'use strict';

const { check, info, done, bootstrap, BASE_URL } = require('./_probe.cjs');

(async () => {
  console.log('\n=== PROBE: compras (salvamento de produto e preco) ===\n');

  const { prisma, client, userId, cleanup } = await bootstrap('compras');

  try {
    // -------------------------------------------------------------------
    // 1. Criar um produto no catalogo (para ter productId valido)
    // -------------------------------------------------------------------
    // Criar produto via products endpoint
    const prodRes = await client.post('/products', {
      name: 'Produto Teste Compra',
      category: 'Alimentos',
      unit: 'un',
    });
    check(
      prodRes.status === 201 || prodRes.status === 200,
      `Produto criado (status ${prodRes.status})`,
    );
    const productId = prodRes.body?.id || prodRes.body?.data?.id;
    info(`productId: ${productId}`);

    // 1b. Buscar produtos (simulando frontend carregando catalogo)
    const fetchProdRes = await client.get('/products');
    check(fetchProdRes.status === 200, `Produtos buscados (status ${fetchProdRes.status})`);
    const produtos = Array.isArray(fetchProdRes.body) ? fetchProdRes.body : (fetchProdRes.body?.data || []);
    check(produtos.length >= 1, `Produtos encontrados: ${produtos.length}`);
    const prodFetched = produtos.find(p => p.id === productId);
    check(!!prodFetched, `Produto encontrado na lista: ${prodFetched?.name}`);

    // -------------------------------------------------------------------
    // 2. Criar compra com item que tem productId e preco
    // -------------------------------------------------------------------
    const compraPayload = {
      local: 'Supermercado Teste',
      statusPagamento: 'pendente',
      itens: [
        {
          productId: prodFetched.id,
          nome: prodFetched.name,
          quantidade: 2,
          unidade: prodFetched.unit || 'un',
          precoUnitario: 45.50,
        },
      ],
    };

    const createRes = await client.post('/compras', compraPayload);
    check(
      createRes.status === 201 || createRes.status === 200,
      `Compra criada (status ${createRes.status})`,
    );
    const compraId = createRes.body?.id;
    info(`compraId: ${compraId}`);

    // -------------------------------------------------------------------
    // 3. Verificar se o item foi salvo com nome e preco corretos
    // -------------------------------------------------------------------
    const findRes = await client.get(`/compras/${compraId}`);
    check(
      findRes.status === 200,
      `Compra encontrada (status ${findRes.status})`,
    );

    const item = findRes.body?.itens?.[0];
    check(
      item && item.nome === prodFetched.name,
      `Nome do item salvo corretamente: "${item?.nome}"`,
    );
    check(
      item && Number(item.precoUnitario) === 45.50,
      `Preco do item salvo corretamente: R$ ${Number(item?.precoUnitario || 0).toFixed(2)}`,
    );
    check(
      item && item.productId === productId,
      `productId associado corretamente: ${item?.productId}`,
    );

    // -------------------------------------------------------------------
    // 4. Verificar no banco diretamente (Prisma) para garantir persistencia
    // -------------------------------------------------------------------
    const dbCompra = await prisma.compra.findUnique({
      where: { id: compraId },
      include: { itens: true },
    });
    check(
      dbCompra !== null,
      `Compra existe no banco (id: ${dbCompra?.id})`,
    );
    const dbItem = dbCompra?.itens?.[0];
    check(
      dbItem && dbItem.nome === prodFetched.name,
      `DB: nome do item = "${dbItem?.nome}"`,
    );
    check(
      dbItem && Number(dbItem.precoUnitario) === 45.50,
      `DB: precoUnitario = R$ ${Number(dbItem?.precoUnitario || 0).toFixed(2)}`,
    );
    check(
      dbItem && dbItem.productId === productId,
      `DB: productId = ${dbItem?.productId}`,
    );

    // -------------------------------------------------------------------
    // 5. Verificar que o totalAmount foi calculado corretamente
    // -------------------------------------------------------------------
    check(
      dbCompra && Number(dbCompra.totalAmount) === 91.00,
      `TotalAmount calculado corretamente: R$ ${Number(dbCompra?.totalAmount || 0).toFixed(2)} (esperado R$ 91,00)`,
    );

    info('Todos os checks de compras concluidos com sucesso');
  } finally {
    await cleanup();
    await done();
  }
})();
