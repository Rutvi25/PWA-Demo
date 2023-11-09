// Set a name for app's cache
const cacheName = 'my-app-cache-v1';

// Define the files to be cached for offline use
const filesToCache = [
  '/',
  '/images',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/offline.html',
];

// Listen for the service worker installation event
self.addEventListener('install', function (event) {
  console.log('installing service worker...', event);
  // Precache the app shell during installation
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('Precaching app shell...');
      cache.addAll(filesToCache);
    })
  );
});

// Listen for the service worker activation event
self.addEventListener('activate', function (event) {
  console.log('activating service worker...', event);
  // It'll wait until the clean up will be done, so that the fetch won't serve results from old cache
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          if (key !== cacheName) {
            console.log('removing old cache...', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  // It ensures that whether service workers are installed or activated correctly or not.
  return self.clients.claim();
});

// This event listener listens for fetch events 
// It requests for data from the Internet, and if the internet connection is not available, it returns the offline page.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => {
      return fetch(event.request).catch(() => caches.match('offline.html'));
    })
  );
});
