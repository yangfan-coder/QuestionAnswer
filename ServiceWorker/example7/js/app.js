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
    let p = document.createElement('p');
    let main = document.querySelector('main');
    //handle the load and error events for the image
    img.addEventListener('load', (ev) => {
      p.append(img);
      main.insertBefore(p, main.querySelector('p'));
    });
    img.addEventListener('error', (err) => {
      //don't bother adding a broken image
      p.textContent = 'Sorry. Your new image cannot be found';
      main.insertBefore(p, main.querySelector('p'));
    });
    //try to load the image
    img.src = '/img/this-image-does-not-exist.jpg';
    img.alt = 'dynamically added image';
  },
};

document.addEventListener('DOMContentLoaded', APP.init);