// Killer Service Worker
// Placed here to immediately unregister any old Jekyll Service Workers and wipe caches

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            console.log('[Killer SW] Deleting cache:', cacheName);
            return caches.delete(cacheName);
          }),
        );
      })
      .then(() => {
        self.registration.unregister().then(() => {
          console.log('[Killer SW] Unregistered old Service Worker.');
        });
      }),
  );
});
