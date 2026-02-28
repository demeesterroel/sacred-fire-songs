// public/sw.js
// Minimal service worker — satisfies PWA installability criteria.
// Offline caching is implemented in Story 4.5.1.

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Pass-through fetch: let the browser handle all requests normally.
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
