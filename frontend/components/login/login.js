'use client';

import { initializeApp, getApps } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAmmkV9tiBP03C4rCDo32cgK7fGg1yH1uA",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "hawkeyecfpi.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "hawkeyecfpi",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "hawkeyecfpi.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "652698080100",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:652698080100:web:984389540196d09d146071"
};

function getClientApp() {
  if (typeof window === "undefined") {
    throw new Error("Firebase can only be initialized in the browser");
  }
  if (getApps().length === 0) {
    return initializeApp(firebaseConfig);
  }
  return getApps()[0];
}


function ok(data) {
  return { ok: true, ...data };
}
function fail(err) {
  return { ok: false, error: err?.message || String(err) };
}


export async function googleSignIn() {
  try {
    const app = getClientApp();
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const idToken = await user.getIdToken();

    const userInfo = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    return ok({ provider: "google", idToken, userInfo, user });

  } catch (err) {
    return fail(err);
  }
}


export async function ethereumConnect() {
  try {
    if (typeof window === "undefined") {
      throw new Error("Ethereum wallet is only available in the browser");
    }
    const provider = window.ethereum;
    if (!provider)
      throw new Error("Ethereum wallet not found");

    const accounts = await provider.request({ method: "eth_requestAccounts" });
    if (!accounts.length)
      throw new Error("No account returned");

    const address = accounts[0];

    const message = `Login request at ${new Date().toISOString()}`;

    const signature = await provider.request({
      method: "personal_sign",
      params: [message, address]
    });

    return ok({
      provider: "ethereum",
      address,
      message,
      signature,
      publicKey : null
    });

  } catch (err) {
    return fail(err);
  }
}


export async function aptosConnect() {
  try {
    if (typeof window === "undefined") {
      throw new Error("Aptos wallet is only available in the browser");
    }
    const aptos = window.aptos || null;
    if (!aptos)
      throw new Error("Aptos wallet not found");

    const acct = await aptos.connect();
    const address = acct?.address || (await aptos.account())?.address;

    if (!address)
      throw new Error("Failed to get Aptos address");

    let message = `Login request at ${new Date().toISOString()}`;

    const signed = await aptos.signMessage({
      message,
      nonce: Math.random().toString(36).slice(2)
    });

    const signature = signed.signature;
    const publicKey = await fetchAptosPublicKey(address);

    return ok({
      provider: "aptos",
      address,
      message,
      signature,
      publicKey
    });

  } catch (err) {
    return fail(err);
  }
}

async function fetchAptosPublicKey(address) {
  try {
    const response = await fetch(`https://fullnode.mainnet.aptoslabs.com/v1/accounts/${address}`);
    if (!response.ok) throw new Error("Account not found");
    const data = await response.json();
    return data.authentication_key; // This contains the public key info
  } catch (e) {
    console.error("Error fetching Aptos public key:", e.message);
    return null;
  }
}

// ---------------------- Optional Signout ----------------------

export function signOut() {
  try {
    if (typeof window === "undefined") {
      return { ok: true };
    }
    localStorage.clear();
    sessionStorage.clear();
    return { ok: true };
  } catch (err) {
    return fail(err);
  }
}

// Default export
export default {
  googleSignIn,
  ethereumConnect,
  aptosConnect,
  signOut,
};
