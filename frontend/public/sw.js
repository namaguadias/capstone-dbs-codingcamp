const CACHE_NAME = 'app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/main.jsx',
  '/src/App.jsx',
  '/src/styles/index.css',
  '/public/vite.svg',
  // Add other assets or routes you want to cache for offline use
];

// Install event - cache files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

const DEV_SERVER_URLS = [/^\/@vite\//, /^\/@react-refresh/];
const BACKEND_API_URLS = ['https://backend-capstone-22arcnm0u-namaguadias-projects.vercel.app'];

// Fetch event - serve cached content when offline, ignoring dev server and backend API URLs
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (
    DEV_SERVER_URLS.some(pattern => pattern.test(url.pathname)) ||
    BACKEND_API_URLS.some(apiUrl => url.href.startsWith(apiUrl))
  ) {
    // Ignore dev server and backend API URLs
    return;
  }
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).catch(() => {
          // Return a fallback response or nothing on fetch failure (offline)
          return new Response('', { status: 503, statusText: 'Service Unavailable' });
        });
      })
  );
});
