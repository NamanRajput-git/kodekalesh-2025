'use client';

import { useEffect } from "react";
import LoginPanel from "./index";

type LoginDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function LoginDialog({ open, onClose }: LoginDialogProps) {
  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-4xl">
        <div className="flex items-start justify-between rounded-t-2xl border border-b-0 border-gray-200 bg-white px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#6f42c1]">
              Hawkeye Access
            </p>
            <h3 className="text-xl font-semibold text-gray-900">
              Sign in to continue
            </h3>
            <p className="text-sm text-gray-500">
              Secure authentication powered by wallets & Google Sign-In.
            </p>
          </div>
          <button
            className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close login dialog"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="rounded-b-2xl border border-t-0 border-gray-200 bg-gradient-to-br from-white via-white to-[#f3ebff] p-6 shadow-2xl">
          <LoginPanel className="border-0 bg-white shadow-none" />
        </div>
      </div>
    </div>
  );
}


