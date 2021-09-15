// importScripts('/cache-polyfill.js');

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('walleat-cache')
      .then(function(cache) {
        return cache.addAll([
          '/',
          '/index.html',
        ]);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});