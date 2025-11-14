"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { onAuthStateChanged, signOut as firebaseSignOut, type User } from "firebase/auth";
import LoginDialog from "./login/LoginDialog";
import { getFirebaseAuth } from "@/lib/firebaseClient";
import { signOut as clearLocalSession } from "./login/login";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const auth = getFirebaseAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
      });
      return () => unsubscribe();
    } catch (error) {
      console.error("Failed to subscribe to auth state", error);
      return undefined;
    }
  }, []);

  useEffect(() => {
    if (currentUser && isLoginOpen) {
      setIsLoginOpen(false);
    }
  }, [currentUser, isLoginOpen]);

  const handleSignInClick = useCallback(() => {
    setIsLoginOpen(true);
    setIsMenuOpen(false);
  }, []);

  const handleSignOut = useCallback(async () => {
    try {
      const auth = getFirebaseAuth();
      await firebaseSignOut(auth);
      clearLocalSession();
    } catch (error) {
      console.error("Failed to sign out", error);
    } finally {
      setCurrentUser(null);
      setIsMenuOpen(false);
      setIsLoginOpen(false);
    }
  }, []);

  const isAuthenticated = Boolean(currentUser);

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link className="flex items-center gap-2" href="/">
            <span className="font-bold text-[#6f42c1] text-2xl">Hawkeye</span>
            <span className="px-2 py-1 bg-[#6f42c1] text-white text-xs font-medium rounded">
              Fraud Detection
            </span>
          </Link>
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:flex md:items-center md:space-x-6 w-full md:w-auto mt-4 md:mt-0`}
          >
            <ul className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-2 md:space-y-0">
              <li>
                <Link
                  className="text-gray-700 hover:text-[#6f42c1] transition-colors"
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-700 hover:text-[#6f42c1] transition-colors"
                  href="/pricing"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-700 hover:text-[#6f42c1] transition-colors"
                  href="/dashboard"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-700 hover:text-[#6f42c1] transition-colors"
                  href="/profile"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  className="inline-block px-4 py-2 bg-[#6f42c1] text-white rounded-md hover:bg-[#5a32a3] transition-colors font-medium"
                  onClick={isAuthenticated ? handleSignOut : handleSignInClick}
                  type="button"
                >
                  {isAuthenticated ? "Sign Out" : "Sign In"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <LoginDialog open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </nav>
  );
}
