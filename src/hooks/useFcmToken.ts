"use client";

import { useEffect, useState } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import { getFirebaseConfig } from "@/app/actions/getFirebaseConfig";
import { initFirebase } from "@/utils/firebase-client";

const useFcmToken = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const retrieveToken = async () => {
      try {
        if (typeof window === "undefined" || !("serviceWorker" in navigator) || !("Notification" in window)) return;

        const permission = await Notification.requestPermission();
        if (permission !== "granted") return;

        const config = await getFirebaseConfig();
        const app = initFirebase(config);
        const messaging = getMessaging(app);

        const currentToken = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
        });

        if (currentToken) {
          setToken(currentToken);
        }
      } catch (err) {
        console.error("FCM error:", err);
      }
    };

    retrieveToken();
  }, []);

  return { fcmToken: token };
};

export default useFcmToken;
