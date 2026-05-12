const VERSION = 'v5';
const STATIC_CACHE = `static-${VERSION}`;
const IMG_REGEX = /\/images\/.*\.(png|jpg|jpeg|gif|webp|svg)$/i;

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheKeys = await caches.keys();
      await Promise.all(
        cacheKeys.map((cacheKey) =>
          cacheKey.startsWith('static-') && cacheKey !== STATIC_CACHE
            ? caches.delete(cacheKey)
            : null
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

const canCache = (request, response) => {
  if (request.method !== 'GET') return false;
  if (!response || !response.ok) return false;

  const cacheControl = response.headers.get('Cache-Control') || '';

  if (cacheControl.includes('no-store')) return false;
  if (response.type === 'opaque') return false;
  return true;
};

self.addEventListener('fetch', (event) => {
  const request = event.request;

  if (request.method !== 'GET') return;

  const requestUrl = new URL(request.url);
  const sameOrigin = requestUrl.origin === self.location.origin;

  if (
    requestUrl.searchParams.has('_rsc') ||
    requestUrl.pathname.startsWith('/api') ||
    requestUrl.pathname.startsWith('/_next/data') ||
    requestUrl.pathname.startsWith('/_next/static') ||
    requestUrl.pathname.startsWith('/_next/image')
  ) {
    return;
  }

  if (request.mode === 'navigate') {
    return;
  }

  const isImage = sameOrigin && IMG_REGEX.test(requestUrl.pathname);
  if (!isImage) {
    return;
  }

  event.respondWith(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      const cachedResponse = await cache.match(request);

      if (cachedResponse) {
        event.waitUntil(
          (async () => {
            try {
              const networkResponse = await fetch(request, { cache: 'no-store' });
              if (canCache(request, networkResponse)) {
                await cache.put(request, networkResponse.clone());
              }
            } catch {}
          })()
        );
        return cachedResponse;
      }

      try {
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse && canCache(request, preloadResponse)) {
          event.waitUntil(cache.put(request, preloadResponse.clone()));
          return preloadResponse;
        }
      } catch {}

      try {
        const networkResponse = await fetch(request, { cache: 'no-store' });
        if (canCache(request, networkResponse)) {
          event.waitUntil(cache.put(request, networkResponse.clone()));
        }
        return networkResponse;
      } catch {
        return new Response('', { status: 504, statusText: 'Offline' });
      }
    })()
  );
});
