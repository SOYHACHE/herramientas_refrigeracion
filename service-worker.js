const CACHE_NAME = 'refrigeracion-v1';

const FILES_TO_CACHE = [
  './',
  './index.html',
  './frigorias.html',
  './rla_lra.html',
  './sobrecalentamiento_subenfriamiento.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Instalación
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// Activación
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
  self.clients.claim();
});

// Fetch: offline first
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});