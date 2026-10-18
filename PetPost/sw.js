// PetPost moved to https://petpost.lol/. This replaces the old service worker on phones
// that installed the github.io version: it clears the old saved files and sends them to the new address.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) await caches.delete(key);
    await self.registration.unregister();
    for (const client of await self.clients.matchAll({ type: 'window' })) {
      client.navigate('https://petpost.lol/' + new URL(client.url).hash);
    }
  })());
});
