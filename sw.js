// A simple service worker for PWA installation and basic offline support

const CACHE_NAME = 'qadri-shop-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  // You can add more critical assets here like a logo or main CSS file if they are separate
];

// Install event: opens a cache and adds the core files to it.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: serves requests from the cache first if available.
// If not in the cache, it fetches from the network.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Not in cache - fetch from network
        return fetch(event.request);
      }
    )
  );
});
