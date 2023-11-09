const APP = {
  SW: null,
  init() {
    //called after DOMContentLoaded
    //register our service worker
    APP.registerSW();
    document.querySelector('h2').addEventListener('click', APP.addImage);
  },
  registerSW() {
    if ('serviceWorker' in navigator) {
      // Register a service worker hosted at the root of the site
      navigator.serviceWorker.register('/sw.js').then(
        (registration) => {
          APP.SW =
            registration.installing ||
            registration.waiting ||
            registration.active;
        },
        (error) => {
          console.log('Service worker registration failed:', error);
        }
      );
    } else {
      console.log('Service workers are not supported.');
    }
  },
  addImage(ev) {
    let img = document.createElement('img');
    img.src = '/img/1016-800x600.jpg';
    img.alt = 'dynamically added image';
    let p = document.createElement('p');
    p.append(img);
    document.querySelector('main').append(p);
  },
};

document.addEventListener('DOMContentLoaded', APP.init);