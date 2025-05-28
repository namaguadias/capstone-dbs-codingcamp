// Service Worker for SkinSights - Offline Support and Caching

const CACHE_VERSION = 'v1';

// Cache names for different resource types
const PRECACHE = `precache-${CACHE_VERSION}`;
const RUNTIME = `runtime-${CACHE_VERSION}`;
const STATIC_CACHE = `static-cache-${CACHE_VERSION}`;
const IMAGE_CACHE = `image-cache-${CACHE_VERSION}`;
const API_CACHE = `api-cache-${CACHE_VERSION}`;

// Assets to precache
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/index.css',
  '/vite.svg',
  '/skinsights.png',
];

// Utility function to limit cache size by max entries
async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxEntries) {
    await cache.delete(keys[0]);
    await trimCache(cacheName, maxEntries);
  }
}

// Utility function to check if response is valid for caching
function isValidResponse(response) {
  return response && (response.status === 200 || response.status === 0);
}

// Install event - precache assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing and precaching');
  event.waitUntil(
    caches.open(PRECACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating and cleaning old caches');
  const currentCaches = [PRECACHE, RUNTIME, STATIC_CACHE, IMAGE_CACHE, API_CACHE];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!currentCaches.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// NetworkFirst strategy for navigation requests and API calls
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (isValidResponse(response)) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    if (request.mode === 'navigate') {
      return caches.match('/index.html');
    }
    return new Response('Offline', { status: 503, statusText: 'Offline' });
  }
}

// CacheFirst strategy with expiration
async function cacheFirst(request, cacheName, maxEntries = 60, maxAgeSeconds = 30 * 24 * 60 * 60) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    // Check expiration
    const dateHeader = cachedResponse.headers.get('sw-cache-date');
    if (dateHeader) {
      const age = (Date.now() - Number(dateHeader)) / 1000;
      if (age > maxAgeSeconds) {
        // Expired, fetch new response
        return fetchAndCache(request, cache, maxEntries);
      }
    }
    return cachedResponse;
  }
  return fetchAndCache(request, cache, maxEntries);
}

async function fetchAndCache(request, cache, maxEntries) {
  try {
    const response = await fetch(request);
    if (isValidResponse(response)) {
      const responseToCache = response.clone();
      // Add custom header for cache date
      const headers = new Headers(responseToCache.headers);
      headers.append('sw-cache-date', Date.now().toString());
      const blob = await responseToCache.blob();
      const modifiedResponse = new Response(blob, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers: headers,
      });
      await cache.put(request, modifiedResponse);
      await trimCache(cache.name, maxEntries);
    }
    return response;
  } catch {
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('Offline', { status: 503, statusText: 'Offline' });
  }
}

// StaleWhileRevalidate strategy
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (isValidResponse(networkResponse)) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => {});
  return cachedResponse || fetchPromise;
}

// Fetch event handler with routing
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignore non-GET requests and unsupported schemes like chrome-extension
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return;
  }

  // Navigation requests - NetworkFirst with fallback to cached index.html for SPA routing offline
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request, RUNTIME));
    return;
  }

  // Scripts and styles - StaleWhileRevalidate
  if (request.destination === 'script' || request.destination === 'style') {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
    return;
  }

  // Images - CacheFirst
  if (request.destination === 'image') {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  // Backend API calls - NetworkFirst
  if (url.origin === self.location.origin) {
    event.respondWith(networkFirst(request, API_CACHE));
    return;
  }

  // Default - StaleWhileRevalidate
  event.respondWith(staleWhileRevalidate(request, RUNTIME));
});
