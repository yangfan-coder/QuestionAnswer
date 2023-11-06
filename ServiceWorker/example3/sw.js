const version = 1;

self.addEventListener('install', (ev) => {
  //service worker has been installed.
  
  self.skipWaiting()
  ev.waitUntil(
    Promise.resolve()
      .then(() => {
        manuel();
      })
      .then(() => {
        //the promise returned from teja will wait until it resolves
        //before going to the next then()
        return teja();
      })
      .then(() => {
        console.log('installed');
        //when this then() returns undefiined
        //it goes to the ev.waitUntil
        //which will change our state from installing to installed.
      })
  );
  // self.skipWaiting(); //skip waiting to activate
  //but... the page will not use the new sw yet
});

function teja() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('teja');
      resolve();
    }, 2000);
  });
}

function manuel() {
  console.log('manuel');
}

self.addEventListener('activate', (ev) => {
  // when the service worker has been activated to replace an old one.
  //Extendable Event
  console.log('activated - this worker not used until page reloads');
  clients.claim().then(() => {
    //claim means that the html file will use this new service worker.
    console.log(
      'the service worker has now claimed all pages so they use the new service worker.'
    );
  });
});

self.addEventListener('fetch', (ev) => {
  // ev.request each time the webpage asks for any resource.
  //Extendable Event
  console.log('fetch request for', ev.request.url, 'from', ev.clientId);
  //check the cache then do a fetch if missing
});

self.addEventListener('message', (ev) => {
  //message from web page ev.data.
  //Extendable Event
});