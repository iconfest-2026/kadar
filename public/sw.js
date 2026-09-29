const CACHE_NAME = "laravel-pwa-v2";
const OFFLINE_URL = "/offline.html";

// Only pre-cache static offline fallback, NEVER dynamic root ("/") or Vite bundles
const FILES_TO_CACHE = [
    OFFLINE_URL
];

// If running on local development (localhost / 127.0.0.1), unregister immediately to allow Vite HMR
if (self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1' || self.location.port === '5173') {
    self.registration.unregister().then(() => {
        console.log('[AEVYRA PWA] Self-unregistered on localhost to allow Vite HMR auto-refresh.');
    });
}

// Pre-cache critical resources
self.addEventListener("install", (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
            .catch(err => console.warn('[PWA] Failed to cache offline asset:', err))
    );
});

// Remove old caches & claim clients
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            )
        ).then(() => self.clients.claim())
    );
});

// Listen for skip waiting message
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Fetch strategy
self.addEventListener("fetch", (event) => {
    const request = event.request;
    const url = new URL(request.url);

    // 🚫 1. Never intercept local development, Vite dev server, HMR WebSocket, or dynamic routes
    if (
        url.hostname === 'localhost' ||
        url.hostname === '127.0.0.1' ||
        url.port === '5173' ||
        url.pathname.startsWith('/@vite') ||
        url.pathname.startsWith('/@react-refresh') ||
        url.pathname.startsWith('/@fs') ||
        url.pathname.startsWith('/@id') ||
        url.pathname.includes('hot-update') ||
        url.pathname.startsWith('/resources/') ||
        url.pathname.startsWith('/node_modules/') ||
        url.protocol === 'ws:' ||
        url.protocol === 'wss:' ||
        request.headers.get('Upgrade') === 'websocket' ||
        request.headers.has('X-Inertia') ||
        request.headers.get('X-Requested-With') === 'XMLHttpRequest' ||
        url.pathname.startsWith('/api/') ||
        url.pathname.startsWith('/admin/') ||
        url.pathname.startsWith('/member/') ||
        url.pathname.startsWith('/midtrans/')
    ) {
        return; // Pass through directly to browser network
    }

    // 🚫 2. Never cache non-GET requests (avoid Cache.put POST error)
    if (request.method !== 'GET') {
        event.respondWith(fetch(request));
        return;
    }

    // 🌐 3. Handle page navigation (Network-First with offline fallback)
    if (request.mode === "navigate") {
        event.respondWith(
            fetch(request)
                .catch(() => caches.match(OFFLINE_URL))
        );
        return;
    }

    // 🌐 4. Static assets (images, fonts) -> Stale-While-Revalidate
    if (
        request.destination === "image" ||
        request.destination === "font"
    ) {
        event.respondWith(
            caches.match(request).then(cached => {
                const networkFetch = fetch(request).then(response => {
                    if (response && response.status === 200) {
                        const copy = response.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
                    }
                    return response;
                }).catch(() => cached);

                return cached || networkFetch;
            })
        );
        return;
    }

    // 🌐 5. Scripts and Styles -> ALWAYS Network-First (so updates are never blocked)
    if (
        request.destination === "style" ||
        request.destination === "script"
    ) {
        event.respondWith(
            fetch(request)
                .then(response => {
                    if (response && response.status === 200) {
                        const copy = response.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
                    }
                    return response;
                })
                .catch(() => caches.match(request))
        );
        return;
    }

    // 🌐 6. Default: Network-first
    event.respondWith(
        fetch(request)
            .then(response => {
                return response;
            })
            .catch(() => caches.match(request))
    );
});

// Background Sync
self.addEventListener('sync', (event) => {
    if (event.tag === 'laravel-pwa-sync') {
        event.waitUntil(syncRequests());
    }
});

async function syncRequests() {
    try {
        const db = await openDB();
        const tx = db.transaction('offline-requests', 'readonly');
        const store = tx.objectStore('offline-requests');
        const requests = await getAllRequests(store);

        for (const req of requests) {
            try {
                const response = await fetch(req.url, {
                    method: req.method,
                    headers: req.headers,
                    body: req.body
                });

                if (response.ok) {
                    const deleteTx = db.transaction('offline-requests', 'readwrite');
                    deleteTx.objectStore('offline-requests').delete(req.id);
                }
            } catch (err) {
                console.error('[Laravel PWA] Sync failed for:', req.url, err);
            }
        }
    } catch (e) {
        console.warn('[Laravel PWA] Background sync failed:', e);
    }
}

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('laravel-pwa-sync', 1);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('offline-requests')) {
                db.createObjectStore('offline-requests', { keyPath: 'id', autoIncrement: true });
            }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

function getAllRequests(store) {
    return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}
