const version = 2;
let staticName = `staticCache-${version}`;
let dynamicName = `dynamicCache`;
let fontName = `fontCache-${version}`;
let imgName = `imageCache-${version}`;

//starter html and css and js files
let assets = ["/", "/index.html", "/css/main.css", "/js/app.js"];
//starter images
let imgAssets = [
  "/img/1011-800x600.jpg",
  "/img/1016-800x600.jpg",
  "/img/1011-800x600.jpg?id=one",
  "/img/1016-800x600.jpg?id=one",
  "/img/1011-800x600.jpg?id=two",
  "/img/1016-800x600.jpg?id=two",
  "/img/1011-800x600.jpg?id=three",
  '/img/1016-800x600.jpg?id="three',
];

self.addEventListener("install", (ev) => {
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
        caches.open(imgName).then((cache) => {
          cache.addAll(imgAssets).then(
            () => {
              console.log(`${imgName} has been updated.`);
            },
            (err) => {
              console.warn(`failed to update ${staticName}.`);
            }
          );
        });
      })
  );
});

self.addEventListener("activate", (ev) => {
  // when the service worker has been activated to replace an old one.
  //Extendable Event
  console.log("activated");
  // delete old versions of caches.
  ev.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        // keys
        //   .filter((key) => {
        //     if (key != staticName && key != imgName) {
        //       return true;
        //     }
        //   })
        //   .map((key) => caches.delete(key))

        keys
          .filter((key) => {
            if (key != staticName && key != imgName) {
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

self.addEventListener("fetch", (ev) => {
  // ev.request each time the webpage asks for any resource.
  //Extendable Event
  // console.log('fetch request for', ev.request.url, 'from', ev.clientId);
  //check the cache then do a fetch if missing
});

self.addEventListener("message", (ev) => {
  //message from web page ev.data.
  //Extendable Event
});
