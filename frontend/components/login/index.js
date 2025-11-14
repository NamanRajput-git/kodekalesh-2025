'use client';

import { useCallback, useState } from "react";
import { googleSignIn, aptosConnect, ethereumConnect } from "./login";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5500";

const buttonStyle =
  "flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium transition hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed";

export default function LoginPanel({ className = "" } = {}) {
  const [output, setOutput] = useState("Choose a login method to begin.");
  const [loadingProvider, setLoadingProvider] = useState(null);

  const stringify = useCallback((value) => {
    if (typeof value === "string") return value;
    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  }, []);

  const updateOutput = useCallback(
    (value) => {
      setOutput(stringify(value));
    },
    [stringify]
  );

  const storeSession = useCallback((uid, provider) => {
    if (typeof window === "undefined" || !uid) return null;
    const dbPath = `users/${uid}`;
    sessionStorage.setItem("uid", uid);
    sessionStorage.setItem("dbPath", dbPath);
    sessionStorage.setItem("provider", provider);
    console.log("Stored uid and dbPath:", uid, dbPath);
    return dbPath;
  }, []);

  const requestWalletAuth = useCallback(async (chain, config) => {
    const { address, message, signature, publicKey } = config || {};
    if (!address || !signature) {
      throw new Error("address and signature are required");
    }

    const res = await fetch(`${API_BASE_URL}/api/auth/wallet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ chain, address, message, signature, publicKey }),
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`Request failed (${res.status}): ${txt}`);
    }

    const json = await res.json().catch(() => ({}));
    const uid = json.uid ?? json.customUID ?? json.data?.uid ?? json.id;

    if (!uid) {
      throw new Error("UID not found in response");
    }

    return { ok: true, uid, raw: json };
  }, []);

  const handleGoogleLogin = useCallback(async () => {
    setLoadingProvider("google");
    updateOutput("Starting Firebase Google sign-in...");
    try {
      const res = await googleSignIn();
      updateOutput(res);
      const uid =
        res?.userInfo?.uid ??
        res?.uid ??
        res?.user?.uid ??
        res?.data?.uid ??
        res?.customUID ??
        res?.id;

      if (!uid) {
        throw new Error("UID not found in Google sign-in response");
      }

      storeSession(uid, "google");
    } catch (err) {
      updateOutput({ ok: false, error: err?.message || String(err) });
    } finally {
      setLoadingProvider(null);
    }
  }, [storeSession, updateOutput]);

  const handleWalletLogin = useCallback(
    async (chain, connector) => {
      setLoadingProvider(chain);
      updateOutput(`Connecting to ${chain} wallet...`);
      try {
        const res = await connector();
        if (!res?.ok) {
          throw new Error(res?.error || "Unknown wallet error");
        }
        updateOutput(res);
        const userConfig = await requestWalletAuth(chain, res);
        updateOutput(userConfig);
        storeSession(userConfig.uid, chain);
      } catch (err) {
        updateOutput({ ok: false, error: err?.message || String(err) });
      } finally {
        setLoadingProvider(null);
      }
    },
    [requestWalletAuth, storeSession, updateOutput]
  );

  return (
    <div
      className={`space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm ${className}`}
    >
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">Sign in</h2>
        <p className="text-sm text-gray-500">
          Choose any provider. Wallet logins will be verified through the
          backend auth service.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          id="google-btn"
          className={buttonStyle}
          onClick={handleGoogleLogin}
          disabled={loadingProvider === "google"}
        >
          {loadingProvider === "google" ? "Signing in..." : "Google"}
        </button>
        <button
          id="aptos-btn"
          className={buttonStyle}
          onClick={() => handleWalletLogin("aptos", aptosConnect)}
          disabled={loadingProvider === "aptos"}
        >
          {loadingProvider === "aptos" ? "Connecting..." : "Aptos Wallet"}
        </button>
        <button
          id="eth-btn"
          className={buttonStyle}
          onClick={() => handleWalletLogin("ethereum", ethereumConnect)}
          disabled={loadingProvider === "ethereum"}
        >
          {loadingProvider === "ethereum" ? "Connecting..." : "Ethereum Wallet"}
        </button>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700">Auth output</p>
        <pre
          id="output"
          className="mt-2 max-h-72 overflow-auto rounded-md bg-gray-900 p-4 text-xs text-gray-100"
        >
          {output}
        </pre>
      </div>
    </div>
  );
}
