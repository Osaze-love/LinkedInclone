const staticCache = "site-static";
const dynamicCache = "dynamic-cache";

self = this;

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(staticCache).then((cache) => {
      cache.addAll();
      console.log("zada");
    })
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCache)
          .map((key) => cache.delete(key))
      );
    })
  );

  // const cacheWhiteList = [];
  // cacheWhiteList.push(staticCache);
  // e.waitUntil(
  //   caches.keys().then((cacheRes) => Promise.all(
  //     cacheRes.map((cacheName) => {
  //       if(!cacheWhiteList.includes(cacheName)){
  //         caches.delete(cacheName);
  //       }
  //     })
  //   ))
  // )
});

self.addEventListener("fetch", (e) => {
  // console.log(e);
  e.respondWith(
    caches.match(e.request).then((cacheRes) => {
      return (
        cacheRes ||
        fetch(e.request).then((fetchRes) => {
          caches.open(dynamicCache).then(cache => {
            cache.put(e.request.url, fetchRes.clone());
            return fetchRes;
          })
        })
      );
    })
  );
});
