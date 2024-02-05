importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js')

const firebaseConfig = {
  apiKey: "AIzaSyBQb5svd_o8-0XuFK1YbPQprW0Ylbtteh0",
  authDomain: "yf-demo.firebaseapp.com",
  projectId: "yf-demo",
  storageBucket: "yf-demo.appspot.com",
  messagingSenderId: "586953699414",
  appId: "1:586953699414:web:9ffe524e51c1671c140bf7",
  measurementId: "G-SGKWKTGSR3"
  };
const app = firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()
