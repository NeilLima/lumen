/**
 * Debug de UI (nao roda no run-all — prefixo _).
 * Abre /receitas e captura: erros da pagina, boundingBox do botao e screenshot.
 */
'use strict';

const path = require('path');
const { bootstrap, BASE_URL } = require('./_probe.cjs');

const FRONT_URL = process.env.PROBE_FRONT_URL || 'http://localhost:3000';
const CHROME =
  process.env.PROBE_CHROME_PATH ||
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const playwright = require(path.join(
  __dirname, '..', '..', '..', 'frontend', 'node_modules', 'playwright-core',
));

(async () => {
  const { prisma, token, cleanup } = await bootstrap('debug-ui');
  const userRow = await prisma.user.findFirst({ orderBy: { createdAt: 'desc' } });
  const browser = await playwright.chromium.launch({
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
  const context = await browser.newContext();
  await context.addInitScript(
    ([t, uid]) => {
      localStorage.setItem('token', t);
      localStorage.setItem('userId', uid);
    },
    [token, userRow ? userRow.id : ''],
  );
  const page = await context.newPage();
  page.on('console', (msg) => {
    if (msg.type() === 'error') console.log('[console.error]', msg.text().slice(0, 300));
  });
  page.on('pageerror', (err) => console.log('[pageerror]', String(err).slice(0, 500)));

  await page.goto(`${FRONT_URL}/receitas`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('[data-testid="receitas-nova-receita"]', { timeout: 90000 });
  await page.waitForTimeout(3000);

  const info = await page.evaluate(async () => {
    const el = document.querySelector('[data-testid="receitas-nova-receita"]');
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    const topEl = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);

    // Amostra 60 frames: identidade do no + bounding box
    let sameNode = 0;
    let diffNode = 0;
    let boxChanges = 0;
    let prev = el;
    let prevBox = JSON.stringify(el.getBoundingClientRect());
    for (let i = 0; i < 60; i++) {
      await new Promise((res) => requestAnimationFrame(res));
      const cur = document.querySelector('[data-testid="receitas-nova-receita"]');
      if (cur === prev) sameNode++;
      else diffNode++;
      const box = JSON.stringify(cur.getBoundingClientRect());
      if (box !== prevBox) boxChanges++;
      prev = cur;
      prevBox = box;
    }

    return {
      rect: { x: r.x, y: r.y, w: r.width, h: r.height },
      display: cs.display,
      visibility: cs.visibility,
      opacity: cs.opacity,
      disabled: el.disabled,
      topElement: topEl ? topEl.tagName + '.' + String(topEl.className).slice(0, 80) : null,
      viewport: { w: window.innerWidth, h: window.innerHeight },
      stability: { sameNode, diffNode, boxChanges },
    };
  });
  console.log('botao:', JSON.stringify(info, null, 2));
  await page.screenshot({ path: path.join(__dirname, 'debug-ui.png'), fullPage: false });
  console.log('screenshot salvo em scripts/probes/debug-ui.png');

  await browser.close();
  await cleanup();
  console.log(BASE_URL ? 'fim' : 'fim');
})();
