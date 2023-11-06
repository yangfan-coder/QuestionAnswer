const version = 1;

self.addEventListener('install', (ev) => {
  //service worker has been installed.
  //Extendable Event
  console.log('installed');
  self.skipWaiting();
});

self.addEventListener('activate', (ev) => {
  // when the service worker has been activated to replace an old one.
  //Extendable Event
  console.log('activated');
});

self.addEventListener('fetch', (ev) => {
  // ev.request each time the webpage asks for any resource.
  //Extendable Event
  console.log('fetch request for', ev.request.url, 'from', ev.clientId);
});

self.addEventListener('message', (ev) => {
  //message from web page ev.data.
  //Extendable Event
});