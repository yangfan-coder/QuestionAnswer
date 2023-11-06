const version = 3;
let staticName = `staticCache-${version}`;
let dynamicName = `dynamicCache`;
let fontName = 'fontCache';
let imgName = 'imageCache';

console.log('111')
let assets = ['/', '/index.html', '/css/main.css', '/js/app.js'];

self.addEventListener('install', (ev) => {
  // service worker has been installed.
  //Extendable Event
  self.skipWaiting()
  
  console.log(`Version ${version} installed`);
  // build a cache
  ev.waitUntil(
    caches.open(staticName).then((cache) => {
      cache.addAll(assets).then(
        () => {
          //addAll == fetch() + put()
          console.log(`${staticName} has been updated`);
        },
        (err) => {
          console.warn(`failed to update ${staticName}.`);
        }
      );
    })
  );
});

self.addEventListener('activate', (ev) => {
  // when the service worker has been activated to replace an old one.
  //Extendable Event
  ev.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key != staticName).map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', (ev) => {
  // ev.request each time the webpage asks for any resource.
  //Extendable Event
  // console.log('fetch request for', ev.request.url, 'from', ev.clientId);
  //check the cache then do a fetch if missing
});

self.addEventListener('message', (ev) => {
  //message from web page ev.data.
  //Extendable Event
});