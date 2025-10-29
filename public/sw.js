const VERSION = 'v4';
const STATIC_CACHE = `static-${VERSION}`;
const IMG_REGEX = /\/images\/.*\.(png|jpg|jpeg|gif|webp|svg)$/i;

self.addEventListener('install', () => {
  // event.waitUntil((async () => {})());
  console.log('Service Worker installed.');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated.');
  event.waitUntil(
    (async () => {
      // Clean
      const keys = await caches.keys();
      await Promise.all(
        keys.map((k) =>
          k.startsWith('static-') && k !== STATIC_CACHE ? caches.delete(k) : null
        )
      );

      if ('navigationPreload' in self.registration) {
        try {
          await self.registration.navigationPreload.enable();
        } catch {}
      }
      await self.clients.claim();
    })()
  );
});

const canCache = (req, res) => {
  if (req.method !== 'GET') return false;
  if (!res || !res.ok) return false;

  const cacheControl = res.headers.get('Cache-Control') || '';

  if (cacheControl.includes('no-store')) return false;
  if (res.type === 'opaque') return false;
  return true;
};

self.addEventListener('fetch', (event) => {
  const req = event.request;

  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;

  if (
    url.searchParams.has('_rsc') ||
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/_next/data') ||
    url.pathname.startsWith('/_next/static') ||
    url.pathname.startsWith('/_next/image')
  ) {
    return;
  }

  if (req.mode === 'navigate') {
    return;
  }

  const isImage = sameOrigin && IMG_REGEX.test(url.pathname);
  if (!isImage) {
    return;
  }

  event.respondWith(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      const cached = await cache.match(req);

      if (cached) {
        event.waitUntil(
          (async () => {
            try {
              const net = await fetch(req, { cache: 'no-store' });
              if (canCache(req, net)) await cache.put(req, net.clone());
            } catch {}
          })()
        );
        return cached;
      }

      try {
        const preload = await event.preloadResponse;
        if (preload && canCache(req, preload)) {
          event.waitUntil(cache.put(req, preload.clone()));
          return preload;
        }
      } catch {}

      try {
        const net = await fetch(req, { cache: 'no-store' });
        if (canCache(req, net)) event.waitUntil(cache.put(req, net.clone()));
        return net;
      } catch {
        return new Response('', { status: 504, statusText: 'Offline' });
      }
    })()
  );
});
