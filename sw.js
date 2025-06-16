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
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
