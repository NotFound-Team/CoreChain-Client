// public/firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyD_qbwYsJyCpXwTKpDtR6DJlklDIdtYBzA",
  authDomain: "corechain-e1321.firebaseapp.com",
  projectId: "corechain-e1321",
  storageBucket: "corechain-e1321.firebasestorage.app",
  messagingSenderId: "190859532048",
  appId: "1:190859532048:web:805238a226e7c1a646f795",
  measurementId: "G-ZL1N1LYK3H",
});

const messaging = firebase.messaging();

// Xử lý background messages
messaging.onBackgroundMessage(function (payload) {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
