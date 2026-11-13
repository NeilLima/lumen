const CACHE_NAME = 'lumen-v2';
/** 📦 Só assets IMUTÁVEIS (hash no nome) podem ficar em cache —
 *  HTML e rotas NUNCA: senão o usuário fica preso na versão antiga */
const PRECACHE = ['/lumen-icon.svg', '/manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  // Só intercepta GET same-origin
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) return;

  /** ⚡ Assets estáticos com hash (_next/static, ícones) → cache-first é seguro */
  if (request.url.includes('/_next/static/') || request.url.includes('/icon') || request.url.includes('.svg') || request.url.includes('.png') || request.url.includes('.woff')) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  /** 🌐 HTML/páginas/API → NETWORK-FIRST: sempre tenta a rede;
   *  só usa cache se a rede FALHAR (offline). Nunca serve versão velha. */
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok && request.headers.get('accept')?.includes('text/html')) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request).then((cached) => cached || Response.error()))
  );
});
