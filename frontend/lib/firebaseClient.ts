"use client";

import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    "AIzaSyAmmkV9tiBP03C4rCDo32cgK7fGg1yH1uA",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "hawkeyecfpi.firebaseapp.com",
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "hawkeyecfpi",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    "hawkeyecfpi.firebasestorage.app",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "652698080100",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
    "1:652698080100:web:984389540196d09d146071",
};

let clientApp: FirebaseApp | null = null;

const ensureClientEnvironment = () => {
  if (typeof window === "undefined") {
    throw new Error("Firebase helpers can only run in the browser.");
  }
};

export const getFirebaseApp = () => {
  ensureClientEnvironment();

  if (clientApp) {
    return clientApp;
  }

  if (!getApps().length) {
    clientApp = initializeApp(firebaseConfig);
  } else {
    clientApp = getApp();
  }

  return clientApp;
};

export const getFirebaseAuth = () => getAuth(getFirebaseApp());

export const getFirebaseDb = () => getFirestore(getFirebaseApp());

