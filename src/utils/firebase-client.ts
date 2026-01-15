"use client";

import { initializeApp, getApps, getApp } from "firebase/app";

export function initFirebase(config: any) {
  return getApps().length === 0 ? initializeApp(config) : getApp();
}
