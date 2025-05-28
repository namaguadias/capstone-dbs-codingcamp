// This file handles service worker registration for offline support

export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    // Removed skipping service worker registration in development mode to enable registration for testing
    // if (import.meta.env.MODE === 'development') {
    //   console.log('Service worker registration skipped in development mode');
    //   return;
    // }
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }
}
