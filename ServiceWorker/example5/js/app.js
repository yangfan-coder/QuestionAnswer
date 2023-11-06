// https://developer.mozilla.org/zh-CN/docs/Web/API/Cache/matchAll#options
let options = {
  ignoreSearch: false,
  ignoreMethod: false,
  ignoreVary: false,
};

const APP = {
  SW: null,
  init() {
    //called after DOMContentLoaded
    //register our service worker
    APP.registerSW();
    //find out what we have in the cache and other storage
    APP.getCacheSize();
    // document.querySelector('h2').addEventListener('click', APP.addImage);
  },
  getCacheSize() {
    //let's see how much storage we are using
    if ("storage" in navigator) {
      if ("estimate" in navigator.storage) {
        //get the total storage and current usage
        navigator.storage.estimate().then(({ usage, quota }) => {
          //returned numbers are in bytes
          //divide by 1024 to convert to KB
          let usedKB = parseInt(usage / 1024);
          let quotaKB = parseInt(quota / 1024);
          console.log(`Using ${usedKB} KB of ${quotaKB} KB`);
        });
        //see if storage can be set to persistent or stay best-effort
        navigator.storage.persist().then((isPer) => {
          console.log(`权限OK: ${isPer}`);
        });
      } else {
        console.log("No support for StorageManager methods");
      }
    }

    //look at individual files and their sizes
    caches.open("imageCache-2").then((cache) => {
      cache.matchAll().then((matches) => {
        //matches is an Array of Response objects
        let total = 0;
        matches.forEach((response) => {
          if (response.headers.has("content-length")) {
            total += parseInt(response.headers.get("content-length"));
            console.log(`Adding size for ${response.url}`);
          }
        });
        console.log(`Total size in imageCache-2 is ${total}`);
      });
    });
  },
  registerSW() {
    if ("serviceWorker" in navigator) {
      // Register a service worker hosted at the root of the site
      navigator.serviceWorker.register("/sw.js").then(
        (registration) => {
          APP.SW =
            registration.installing ||
            registration.waiting ||
            registration.active;
        },
        (error) => {
          console.log("Service worker registration failed:", error);
        }
      );
    } else {
      console.log("Service workers are not supported.");
    }
  },
  addImage(ev) {
    let img = document.createElement("img");
    img.src = "/img/1016-800x600.jpg";
    img.alt = "dynamically added image";
    let p = document.createElement("p");
    p.append(img);
    document.querySelector("main").append(p);
  },
};

document.addEventListener("DOMContentLoaded", APP.init);
