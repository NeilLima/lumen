/**
 * Probe de debug: integração Estoque <-> Compras.
 * Reproduz o fluxo do frontend: compra -> item de compra -> cadastro no estoque.
 */
'use strict';
const { check, info, done, bootstrap } = require('./_probe.cjs');

async function main() {
  const { client, prisma, cleanup } = await bootstrap('estoque-compras');

  try {
    // 1) Cria produto (para ter categoria)
    const prod = await client.post('/products', {
      name: 'Arroz Tipo 1',
      category: 'Alimentos',
      unit: 'un',
      price: 25.9,
    });
    check(prod.status === 201 || prod.status === 200, `POST /products -> ${prod.status}`);
    const productId = prod.body?.id;

    // 2) Cria compra com 1 item
    const compra = await client.post('/compras', {
      local: 'Mercado Central',
      statusPagamento: 'pago',
      itens: [
        { productId, nome: 'Arroz Tipo 1', quantidade: 5, unidade: 'un', precoUnitario: 25.9 },
      ],
    });
    check(compra.status === 201 || compra.status === 200, `POST /compras -> ${compra.status}`);
    const compraItem = compra.body?.itens?.[0];
    info(`compraItem: ${JSON.stringify(compraItem)}`);

    // 3) Lista compras — verifica se itens trazem product/categoria
    const compras = await client.get('/compras');
    const itemNaLista = compras.body?.[0]?.itens?.[0];
    info(`item na listagem: ${JSON.stringify(itemNaLista)}`);
    check(!!itemNaLista?.product?.category || !!itemNaLista?.productId, 'item da compra expõe product/productId');

    // 4) POST /estoque com payload SEMELHANTE ao frontend (strings nos números)
    const estoqueStr = await client.post('/estoque', {
      produtoCatalogoId: '',
      nome: 'Arroz Tipo 1',
      categoria: 'Alimentos',
      localCompra: 'Mercado Central',
      quantidade: '5',
      unidade: 'un',
      preco: '25,90',
      quantidadeMinima: '2',
      compraItemId: compraItem?.id,
    });
    info(`POST /estoque (payload string) -> ${estoqueStr.status}: ${JSON.stringify(estoqueStr.body)}`);

    // 5) POST /estoque com payload numerico correto
    const estoqueNum = await client.post('/estoque', {
      nome: 'Arroz Tipo 1',
      categoria: 'Alimentos',
      localCompra: 'Mercado Central',
      quantidade: 5,
      unidade: 'un',
      preco: 25.9,
      quantidadeMinima: 2,
      compraItemId: compraItem?.id,
    });
    info(`POST /estoque (payload numero) -> ${estoqueNum.status}: ${JSON.stringify(estoqueNum.body)}`);
    check(estoqueNum.status === 201 || estoqueNum.status === 200, 'POST /estoque com números funciona');

    // 6) GET /estoque — confere vínculo
    const estoque = await client.get('/estoque');
    const vinculado = (estoque.body || []).find(i => i.compraItemId);
    info(`item vinculado: ${JSON.stringify(vinculado)}`);
    check(!!vinculado, 'GET /estoque retorna item com compraItemId');
  } finally {
    await cleanup();
    await done();
  }
}

main().catch(async (e) => {
  console.error(e);
  process.exit(1);
});
