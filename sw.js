const CACHE_NAME = 'pwa-cache-v1';

const urlsToCache = [
  'main.html',
  'main-backup.html',
  'jquery-local.js',
  'manifest.json',
  'open-sans.ttf',
  'logo.svg',
  'ic_launcher.webp',
  'anim-bg.gif',
  'backspace.png',
  'bg2.jpg',
  'close.png',
  'down.png',
  'info.png',
  'z1x.png',
  'z2x.png',
  'z3x.png',
  'z4x.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      const results = await Promise.allSettled(
        urlsToCache.map(url => cache.add(url))
      );
      results.forEach((result, i) => {
        if (result.status === 'rejected') {
          console.error(`❌ Failed to cache ${urlsToCache[i]}:`, result.reason);
        }
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
          return null;
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(response => {
      if (response) return response;
      console.warn(`🚫 Not in cache: ${event.request.url}`);
      return new Response('', {
        status: 404,
        statusText: 'Offline resource not cached'
      });
    })
  );
});
