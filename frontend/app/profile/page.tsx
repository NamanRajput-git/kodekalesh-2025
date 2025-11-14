"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UserInfo from "@/components/Profile/UserInfo";
import SettingsForm from "@/components/Profile/SettingsForm";
import MetricsCard from "@/components/Dashboard/MetricsCard";
import { dashboardMetrics, type UserProfile } from "@/lib/mockData";
import { getFirebaseAuth, getFirebaseDb } from "@/lib/firebaseClient";
import { onAuthStateChanged, type User } from "firebase/auth";
import {
  Timestamp,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

type ProfileDoc = {
  email?: string;
  phone?: string;
  organization?: string;
  createdAt?: string;
  updatedAt?: string;
};

const timestampToIso = (value: unknown) => {
  if (!value) return undefined;
  if (typeof value === "string") return value;
  if (value instanceof Timestamp) {
    return value.toDate().toISOString();
  }
  return undefined;
};

export default function ProfilePage() {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [profileDoc, setProfileDoc] = useState<ProfileDoc | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const hydrateProfile = useCallback(async (user: User) => {
    setLoadingProfile(true);
    try {
      const db = getFirebaseDb();
      const profileRef = doc(db, "profiles", user.uid);
      const snapshot = await getDoc(profileRef);

      if (snapshot.exists()) {
        const data = snapshot.data() as ProfileDoc & {
          createdAt?: Timestamp;
          updatedAt?: Timestamp;
        };
        setProfileDoc({
          email: user.email ?? data.email ?? "",
          phone: data.phone ?? "",
          organization: data.organization ?? "",
          createdAt: timestampToIso(data.createdAt) ?? user.metadata?.creationTime ?? new Date().toISOString(),
          updatedAt: timestampToIso(data.updatedAt),
        });
      } else {
        setProfileDoc({
          email: user.email ?? "",
          phone: "",
          organization: "",
          createdAt: user.metadata?.creationTime ?? new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error("Failed to load profile", error);
      setStatusMessage({
        type: "error",
        text: "Unable to load your profile. Please try again.",
      });
    } finally {
      setLoadingProfile(false);
    }
  }, []);

  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user);
      if (user) {
        await hydrateProfile(user);
      } else {
        setProfileDoc(null);
        setLoadingProfile(false);
      }
    });

    return () => unsubscribe();
  }, [hydrateProfile]);

  const handleSaveProfile = async (payload: {
    email: string;
    phone: string;
    organization: string;
  }) => {
    if (!firebaseUser) return;

    setSavingProfile(true);
    setStatusMessage(null);

    try {
      const db = getFirebaseDb();
      const profileRef = doc(db, "profiles", firebaseUser.uid);
      const dataToPersist: Record<string, unknown> = {
        email: firebaseUser.email ?? payload.email,
        phone: payload.phone,
        organization: payload.organization,
        displayName: firebaseUser.displayName ?? null,
        updatedAt: serverTimestamp(),
      };

      if (!profileDoc?.createdAt) {
        dataToPersist.createdAt = serverTimestamp();
      }

      await setDoc(profileRef, dataToPersist, { merge: true });

      setProfileDoc((prev) => ({
        ...prev,
        email: firebaseUser.email ?? payload.email,
        phone: payload.phone,
        organization: payload.organization,
        createdAt:
          prev?.createdAt ??
          firebaseUser.metadata?.creationTime ??
          new Date().toISOString(),
      }));

      setStatusMessage({
        type: "success",
        text: "Profile saved successfully.",
      });
    } catch (error) {
      console.error("Failed to save profile", error);
      setStatusMessage({
        type: "error",
        text: "Failed to save profile. Please try again.",
      });
    } finally {
      setSavingProfile(false);
    }
  };

  const userCardData: UserProfile = useMemo(() => {
    const fallbackEmail = firebaseUser?.email ?? "guest@hawkeye.ai";
    const fallbackName =
      firebaseUser?.displayName ||
      fallbackEmail.split("@")[0]?.replace(/[._]/g, " ") ||
      "Hawkeye Analyst";

    return {
      id: firebaseUser?.uid ?? "guest",
      name: fallbackName,
      email: profileDoc?.email ?? fallbackEmail,
      role: "Fraud Analyst",
      phone: profileDoc?.phone,
      organization: profileDoc?.organization,
      joinedDate:
        profileDoc?.createdAt ??
        firebaseUser?.metadata?.creationTime ??
        new Date().toISOString(),
    };
  }, [firebaseUser, profileDoc]);

  const isAuthenticated = Boolean(firebaseUser);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
            <p className="text-gray-600">
              Manage your account settings and preferences
            </p>
          </div>

          {!isAuthenticated && (
            <div className="mb-6 rounded-xl border border-dashed border-[#6f42c1]/40 bg-white p-4 text-sm text-gray-700">
              Sign in from the navigation bar to link your email and save your
              Hawkeye profile securely.
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div>
              <UserInfo user={userCardData} />
            </div>
            <div className="lg:col-span-2">
              <SettingsForm
                email={profileDoc?.email ?? firebaseUser?.email ?? ""}
                phone={profileDoc?.phone ?? ""}
                organization={profileDoc?.organization ?? ""}
                loading={loadingProfile}
                isSaving={savingProfile}
                disabled={!isAuthenticated}
                statusMessage={statusMessage}
                onSave={handleSaveProfile}
              />
            </div>
          </div>

          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h5 className="text-lg font-semibold">Your Analytics Summary</h5>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <MetricsCard
                    title="Total Transactions"
                    value={dashboardMetrics.totalTransactions.toLocaleString()}
                  />
                  <MetricsCard
                    title="Fraud Detected"
                    value={dashboardMetrics.fraudDetected}
                  />
                  <MetricsCard
                    title="Risk Score"
                    value={dashboardMetrics.riskScore.toFixed(1)}
                  />
                  <MetricsCard title="Active Alerts" value={dashboardMetrics.alerts} />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h5 className="text-lg font-semibold">Security</h5>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h6 className="font-semibold mb-1">Change Password</h6>
                      <small className="text-gray-500">Last changed 30 days ago</small>
                    </div>
                    <button className="px-4 py-2 text-sm border border-[#6f42c1] text-[#6f42c1] rounded-lg hover:bg-[#6f42c1] hover:text-white transition-colors">
                      Change
                    </button>
                  </div>
                  <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h6 className="font-semibold mb-1">Active Sessions</h6>
                      <small className="text-gray-500">3 active sessions</small>
                    </div>
                    <button className="px-4 py-2 text-sm border border-[#6f42c1] text-[#6f42c1] rounded-lg hover:bg-[#6f42c1] hover:text-white transition-colors">
                      Manage
                    </button>
                  </div>
                  <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h6 className="font-semibold mb-1">API Keys</h6>
                      <small className="text-gray-500">2 active API keys</small>
                    </div>
                    <button className="px-4 py-2 text-sm border border-[#6f42c1] text-[#6f42c1] rounded-lg hover:bg-[#6f42c1] hover:text-white transition-colors">
                      View
                    </button>
                  </div>
                  <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h6 className="font-semibold mb-1">Login History</h6>
                      <small className="text-gray-500">View recent login attempts</small>
                    </div>
                    <button className="px-4 py-2 text-sm border border-[#6f42c1] text-[#6f42c1] rounded-lg hover:bg-[#6f42c1] hover:text-white transition-colors">
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
