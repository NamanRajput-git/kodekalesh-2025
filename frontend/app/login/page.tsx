'use client';

import LoginPanel from "@/components/login";

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-[#f5f0ff] via-white to-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 px-4 py-16">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6f42c1]">
            Hawkeye Access
          </p>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Sign in to your intelligence suite
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-gray-600">
            Authenticate securely with Google or connect your preferred wallet.
            Every session is verified through our backend auth service for added
            safety.
          </p>
        </div>
        <div className="w-full max-w-3xl">
          <LoginPanel />
        </div>
      </div>
    </div>
  );
}


