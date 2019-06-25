importScripts('https://www.gstatic.com/firebasejs/6.0.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.0.1/firebase-messaging.js');

firebase.initializeApp({
    'messagingSenderId': '496484448815',
});

const messaging = firebase.messaging();