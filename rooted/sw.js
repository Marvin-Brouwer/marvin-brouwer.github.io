// Tombstone for the service worker of the rooted example app that used to be hosted here.
// Visitors who opened it still have that worker, and it keeps serving the old app from its cache.
// The browser fetches this file when it checks the worker for updates, installs it in its place,
// and this one clears the caches, unregisters itself and reloads the open tabs.
// The reload lands on the redirect page, which sends them to the docs at rooted-org.github.io/rooted/.
// Copied from rooted-org/rooted docs/public/sw.js, see docs/guide/pwa.md there.
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (event) => {
	event.waitUntil((async () => {
		const keys = await caches.keys()
		await Promise.all(keys.map(key => caches.delete(key)))
		await self.registration.unregister()
		const clients = await self.clients.matchAll({ type: 'window' })
		for (const client of clients) client.navigate(client.url)
	})())
})
