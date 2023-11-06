const APP = {
  SW: null,
  cacheName: "assetCache1",
  init() {
    // called after DOMContentLoaded
    // if ('serviceWorker' in navigator) {
    //   // Register a service worker hosted at the root of the
    //   // site using the default scope.
    //   navigator.serviceWorker.register('/sw.js').then(
    //     (registration) => {
    //       APP.SW =
    //         registration.installing ||
    //         registration.waiting ||
    //         registration.active;
    //     },
    //     (error) => {
    //       console.log('Service worker registration failed:', error);
    //     }
    //   );
    // } else {
    //   console.log('Service workers are not supported.');
    // }
    APP.startCaching();

    document
      .querySelector("header>h2")
      .addEventListener("click", APP.deleteCache);
  },
  startCaching() {
    caches
      .open(APP.cacheName)
      .then((cache) => {
        console.log(`Cache ${APP.cacheName} opened`);

        // 存储缓存的三种方式：
        // 可以根据不同的参数名称进行存储相同的资源
        let urlString = `/img/1016-3844x2563.jpg?id=1`;
        cache.add(urlString);

        let url = new URL("http://127.0.0.1:8080/img/1016-3844x2563.jpg?id=2");
        cache.add(url);

        let req = new Request("/img/1016-3844x2563.jpg?id=3");
        cache.add(req);

        // 查看内容
        cache.keys().then((keys) => {
          keys.forEach((key, index) => {
            console.log(index, key);
          });
        });
        return cache;
      })
      .then((cache) => {
        // 判断当前的缓存是否存在
        caches.has(APP.cacheName).then((hasCache) => {
          // console.log(hasCache);
        });

        // 在缓存中搜索文件
        // cache.match  cache.matchAll

        // let urlString = `/img/1016-3844x2563.jpg?id=1`;
        let urlString = `/img/1016-3844x2563.jpg?id=4`; // 资源不存在的资源
        return caches.match(urlString).then((cacheResponse) => {
          if (
            cacheResponse &&
            cacheResponse.status < 400 &&
            cacheResponse.headers.has("content-type") &&
            cacheResponse.headers.get("content-type").match(/^image\//i)
          ) {
            return cacheResponse;
          } else {
            console.log("资源不存在");
            // 如果没有找到直接重新请求、再次缓存
            return fetch(urlString).then((fetchResponse) => {
              if (!fetchResponse.ok) throw fetchResponse.statusText;

              cache.put(urlString, fetchResponse.clone());
              return fetchResponse;
            });
          }
        });
      })
      .then((response) => {
        console.log(response, "===>response");
        document.querySelector("output").textContent = response.url;
        return response.blob();
      })
      .then((blob) => {
        let url = URL.createObjectURL(blob);
        let img = document.createElement("img");
        img.src = url;

        document.querySelector("output").append(img);
      });
  },
  deleteCache() {
    // 删除单个资源
    // caches.open(APP.cacheName).then((cache) => {
    //   let url = `/img/1016-3844x2563.jpg?id=2`;
    //   cache.delete(url).then((isGone) => {
    //     console.log("删除单个资源成功~", isGone);
    //   });
    // });

    // 删除全部资源
    caches.delete(APP.cacheName).then((isGone) => {
      console.log(`删除全部资源成功`, isGone);
    });
  },
};
document.addEventListener("DOMContentLoaded", APP.init);
