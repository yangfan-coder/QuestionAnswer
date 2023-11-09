const version = 2;
let staticName = `staticCache-${version}`;
let dynamicName = `cssCache`;
let fontName = `fontCache-${version}`;
let imageName = `imageCache-${version}`;
let options = {
  ignoreSearch: false,
  ignoreMethod: false,
  ignoreVary: false,
};
//starter html and css and js files
let assets = ['/', '/index.html', '/css/main.css', '/js/app.js'];
//starter images
let imageAssets = [
  '/img/1011-800x600.jpg',
  '/img/1011-800x600.jpg?id=one',
  '/img/1011-800x600.jpg?id=two',
  '/img/1011-800x600.jpg?id=three',
];

self.addEventListener('install', (ev) => {
  // service worker has been installed.
  //Extendable Event
  console.log(`Version ${version} installed`);
  // build a cache
  ev.waitUntil(
    caches
      .open(staticName)
      .then((cache) => {
        cache.addAll(assets).then(
          () => {
            //addAll == fetch() + put()
            console.log(`${staticName} has been updated.`);
          },
          (err) => {
            console.warn(`failed to update ${staticName}.`);
          }
        );
      })
      .then(() => {
        caches.open(imageName).then((cache) => {
          cache.addAll(imageAssets).then(
            () => {
              console.log(`${imageName} has been updated.`);
            },
            (err) => {
              console.warn(`failed to update ${staticName}.`);
            }
          );
        });
      })
  );
});

self.addEventListener('activate', (ev) => {
  // when the service worker has been activated to replace an old one.
  //Extendable Event
  console.log('activated');
  // delete old versions of caches.
  ev.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => {
            if (key != staticName && key != imageName) {
              return true;
            }
          })
          .map((key) => caches.delete(key))
      ).then((empties) => {
        //empties is an Array of boolean values.
        //one for each cache deleted
      });
    })
  );
});

self.addEventListener('fetch', (ev) => {
  // ev.request each time the webpage asks for any resource.
  //Extendable Event
  console.log(`fetch request for: ${ev.request.url}`);
  /*                  */
  // version 1 - pass thru
  // ev.respondWith(fetch(ev.request));
  /*                  */
  // version 2 - check the caches first for the file. If missing do a fetch
  // ev.respondWith(
  //   caches.match(ev.request).then((cacheRes) => {
  //     if (cacheRes == undefined) {
  //       console.log(`MISSING ${ev.request.url}`);
  //     }
  //     return cacheRes || fetch(ev.request);
  //   })
  // );
  /*                  */
  //version 3 - check cache. fetch if missing. then add response to cache
  ev.respondWith(
    caches.match(ev.request).then((cacheRes) => {
      return (
        cacheRes ||
        fetch(ev.request).then((fetchResponse) => {
          let type = fetchResponse.headers.get('content-type');
          if (
            (type && type.match(/^text\/css/i)) ||
            ev.request.url.match(/fonts.googleapis.com/i)
          ) {
            //css to save in dynamic cache
            console.log(`save a CSS file ${ev.request.url}`);
            return caches.open(dynamicName).then((cache) => {
              cache.put(ev.request, fetchResponse.clone());
              return fetchResponse;
            });
          } else if (
            (type && type.match(/^font\//i)) ||
            ev.request.url.match(/fonts.gstatic.com/i)
          ) {
            console.log(`save a FONT file ${ev.request.url}`);
            return caches.open(fontName).then((cache) => {
              cache.put(ev.request, fetchResponse.clone());
              return fetchResponse;
            });
          } else if (type && type.match(/^image\//i)) {
            //save in image cache
            console.log(`save an IMAGE file ${ev.request.url}`);
            return caches.open(imageName).then((cache) => {
              cache.put(ev.request, fetchResponse.clone());
              return fetchResponse;
            });
          } else {
            //save in dynamic cache
            console.log(`OTHER save ${ev.request.url}`);
            return caches.open(dynamicName).then((cache) => {
              cache.put(ev.request, fetchResponse.clone());
              return fetchResponse;
            });
          }
        })
      );
    })
  );
});

self.addEventListener('message', (ev) => {
  //message from web page ev.data.
  //Extendable Event
});