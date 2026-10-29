/**
 * Probe: FLUXO DE UI da tela de Receitas (regra 15.3 — data-testid)
 * - Front REAL (localhost:3000) + API REAL + BANCO REAL na mesma execucao.
 * - Chrome do sistema via playwright-core (sem binario proprio).
 * - Fluxo: abrir /receitas -> criar via modal -> feedback de sucesso ->
 *   item na lista -> abrir detalhe -> excluir com confirmacao -> feedback.
 * - Tudo revertido no cleanup (usuario de teste removido em cascata).
 */
'use strict';

const path = require('path');
const { check, info, done, bootstrap } = require('./_probe.cjs');

const FRONT_URL = process.env.PROBE_FRONT_URL || 'http://localhost:3000';
const CHROME =
  process.env.PROBE_CHROME_PATH ||
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const playwright = require(path.join(
  __dirname,
  '..',
  '..',
  '..',
  'frontend',
  'node_modules',
  'playwright-core',
));

(async () => {
  console.log('\nProbe: UI de Receitas (fluxo completo)');
  const { prisma, client, token, userId, cleanup } = await bootstrap('ui-receitas');
  let browser = null;

  try {
    // Pre-requisito real: conta para o select do modal
    const acc = await client.post('/accounts', {
      name: 'Conta UI Probe',
      type: 'CHECKING',
      balance: 50,
    });
    check(acc.status === 201, `conta de teste criada (status ${acc.status})`);

    const userRow = userId ? { id: userId } : null;

    browser = await playwright.chromium.launch({
      executablePath: CHROME,
      headless: true,
      args: [
        '--no-sandbox',
        // mantem rAF/timers ativos em headless (sem isso o Playwright trava
        // no check de estabilidade "visible, enabled and stable")
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding',
        '--disable-features=CalculateNativeWinOcclusion',
      ],
    });
    const context = await browser.newContext({ reducedMotion: 'reduce' });
    await context.addInitScript(
      ([t, uid]) => {
        localStorage.setItem('token', t);
        localStorage.setItem('userId', uid);
        localStorage.setItem('nextauth.session', JSON.stringify({ user: { id: uid } }));
      },
      [token, userRow ? userRow.id : ''],
    );

    const page = await context.newPage();
    page.setDefaultTimeout(60000);
    page.setDefaultNavigationTimeout(90000); // 1º load compila a pagina no dev

    // 1. Tela abre e mostra o header (retry p/ recompilacao do dev) ----------
    let headerOk = false;
    for (let i = 0; i < 3 && !headerOk; i++) {
      await page.goto(`${FRONT_URL}/receitas`, { waitUntil: 'domcontentloaded' });
      headerOk = await page
        .waitForSelector('[data-testid="receitas-nova-receita"]', { timeout: 60000 })
        .then(() => true)
        .catch(() => false);
    }
    if (!headerOk) throw new Error('header da pagina nao renderizou apos 3 tentativas');
    await page.waitForTimeout(2000); // deixa a hidratacao/compilacao do dev assentar
    check(true, 'tela /receitas abriu e renderizou o header');

    // 2. Estado vazio de um usuario novo (espera o loading terminar) ---------
    const vazio = await page
      .waitForSelector('text=Nenhuma receita encontrada', { timeout: 20000 })
      .then(() => true)
      .catch(() => false);
    check(vazio, 'estado vazio exibido para usuario novo');

    // 3. Abrir modal e criar receita -----------------------------------------
    // Retry: em dev o hidrate do React pode ainda nao ter anexado os handlers
    let modalAberto = false;
    for (let i = 0; i < 10 && !modalAberto; i++) {
      await page.click('[data-testid="receitas-nova-receita"]', { force: true }).catch(() => undefined);
      modalAberto = await page
        .waitForSelector('[data-testid="receitas-nome"]', { state: 'visible', timeout: 3000 })
        .then(() => true)
        .catch(() => false);
      if (!modalAberto) await page.waitForTimeout(1000);
    }
    check(modalAberto, 'modal de nova receita abriu');

    const nome = `Receita UI Probe ${Date.now()}`;
    await page.fill('[data-testid="receitas-nome"]', nome);
    await page.fill('[data-testid="receitas-valor"]', '123.45');
    await page.fill('[data-testid="receitas-data"]', '2026-10-15');
    await page.selectOption('[data-testid="receitas-categoria"]', { label: 'Salário' });
    await page.selectOption('[data-testid="receitas-conta"]', { label: 'Conta UI Probe' });
    await page.fill(
      '[data-testid="receitas-comprovante"]',
      'https://storage.lumen-test.com/ui-probe.pdf',
    );
    check(true, 'formulario preenchido (categoria "Salário" vinda da API)');

    await page.click('[data-testid="receitas-salvar"]', { force: true });

    // 4. Feedback de SUCESSO (regra 2.2) -------------------------------------
    await page.waitForSelector('[data-testid="feedback-overlay"]', { timeout: 30000 });
    const tituloSucesso = await page.getByText('Receita criada').count();
    check(tituloSucesso > 0, 'modal de feedback de SUCESSO apareceu');
    await page.click('[data-testid="feedback-fechar"]', { force: true });

    // 5. Item aparece na lista (via API para achar o id) ---------------------
    const lista = await client.get('/incomes');
    const criada = (Array.isArray(lista.body) ? lista.body : []).find(
      (r) => r.description === nome,
    );
    check(!!criada, 'receita criada existe na API');
    const row = criada ? await prisma.transaction.findUnique({ where: { id: criada.id } }) : null;
    check(!!row, 'receita criada existe no BANCO REAL');

    if (criada) {
      await page.waitForSelector(`[data-testid="receitas-item-nome-${criada.id}"]`, {
        timeout: 30000,
      });
      check(true, 'item da receita visivel na lista');

      // 6. Detalhe reflete o CRUD --------------------------------------------
      await page.click(`[data-testid="receitas-detalhes-${criada.id}"]`, { force: true });
      await page.waitForSelector('text=Detalhes da Receita');
      const temNome = await page.getByText(nome).count();
      check(temNome > 0, 'detalhe mostra a receita criada');
      await page.click('[data-testid="receitas-detalhe-fechar"]', { force: true });

      // 7. Exclusao com CONFIRMACAO (regra 2.3) -------------------------------
      await page.click(`[data-testid="receitas-excluir-${criada.id}"]`, { force: true });
      await page.waitForSelector('[data-testid="receitas-confirmar-excluir"]');
      check(true, 'modal de confirmacao abriu (sem window.confirm)');
      await page.click('[data-testid="receitas-confirmar-excluir"]', { force: true });

      // 8. Feedback da exclusao + some da lista + banco -----------------------
      await page.waitForSelector('[data-testid="feedback-overlay"]', { timeout: 30000 });
      const tituloExcluido = await page.getByText('Receita excluída').count();
      check(tituloExcluido > 0, 'feedback de exclusao apareceu');
      await page.click('[data-testid="feedback-fechar"]', { force: true });

      await page.waitForSelector(`[data-testid="receitas-item-nome-${criada.id}"]`, {
        state: 'detached',
        timeout: 30000,
      });
      check(true, 'item removido da lista');
      const depois = await prisma.transaction.findUnique({ where: { id: criada.id } });
      check(depois === null, 'receita removida do BANCO REAL');
    }
  } catch (err) {
    info(`excecao: ${err.message}`);
    check(false, 'probe de UI terminou sem excecoes');
  } finally {
    if (browser) await browser.close().catch(() => undefined);
    await cleanup();
  }

  await done();
})();
