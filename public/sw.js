const CACHE_NAME = 'static-cache-v1';
const STATIC_FILES_URL_PATTERN = /\/images\/.*\.(png|jpg|jpeg|gif|webp|svg)$/;

self.addEventListener('install', () => {
  console.log('Service Worker installed.');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated.');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  if (url.searchParams.has('_rsc')) {
    return;
  }

  if (STATIC_FILES_URL_PATTERN.test(requestUrl.pathname)) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(event.request).then((networkResponse) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
  } else {
    event.respondWith(fetch(event.request));
  }
});
