const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
registerRoute(
  // Makes a register route for caching the style, script, worker, image, document, and manifest files (request.destination) used for finding those files within the requested destination
  ({ request }) => ['style', 'script', 'worker', 'image', 'document', 'manifest'].includes(request.destination), 
  // StaleWhileRevalidate allows quick request response with a cached response if available, falling back to the network request if it's not cached. The network request is then used to update the cache
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      // CacheableResponsePlugin is used to only cache requests that result in a 0 or 200 status, preventing bad requests from being saved into the cache
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);
