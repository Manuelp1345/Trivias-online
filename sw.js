;
const CACHE_NAME = "v1_cache_manueldev",
    urlToCache = [
        "https://cdn.jsdelivr.net/gh/mathusummut/confetti.js/confetti.min.js",
        "https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css",
        "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
        "https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js",
        "https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js",
        "./",
        "/css/style.css",
        "/js/main.js"
    ]

//se instalan todos los archivos estaticos del sitio
self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlToCache)
                .then(() => self.skipWaiting())
        })
        .catch(err => console.log("Fallo de registro de cache", err))
    )
})

//activa nuestro sw
self.addEventListener("activate", e => {
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    //Eliminamos lo que ya no se necesita en cache
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName)
                    }
                })
            )
        })
        // Le indica al SW activar el cache actual
        .then(() => self.clients.claim())
    )
})


//cuando haya conexcion a interner recupera los archivos

self.addEventListener("fetch", e => {

    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if (res) {
                //recuperando del cache
                return res
            }
            return fetch(e.request)
        })
    )
})