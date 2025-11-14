"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

type SettingsFormProps = {
  email: string;
  phone?: string;
  organization?: string;
  loading?: boolean;
  isSaving?: boolean;
  disabled?: boolean;
  statusMessage?: {
    type: "success" | "error";
    text: string;
  } | null;
  onSave?: (payload: {
    email: string;
    phone: string;
    organization: string;
  }) => Promise<void> | void;
};

const defaultNotifications = {
  email: true,
  sms: false,
  push: true,
};

export default function SettingsForm({
  email,
  phone = "",
  organization = "",
  loading = false,
  isSaving = false,
  disabled = false,
  statusMessage = null,
  onSave,
}: SettingsFormProps) {
  const [formData, setFormData] = useState({
    email,
    phone,
    organization,
    notifications: { ...defaultNotifications },
    twoFactor: false,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      email,
      phone,
      organization,
    }));
  }, [email, phone, organization]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      if (name.startsWith("notification.")) {
        const key = name.split(".")[1];
        setFormData({
          ...formData,
          notifications: {
            ...formData.notifications,
            [key]: checked,
          },
        });
      } else {
        setFormData({
          ...formData,
          [name]: checked,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!onSave) return;
    await onSave({
      email: formData.email,
      phone: formData.phone,
      organization: formData.organization,
    });
  };

  const isFormDisabled = disabled || loading;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h5 className="text-lg font-semibold">Account Settings</h5>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6f42c1] focus:border-[#6f42c1] outline-none transition-colors"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled
              readOnly
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6f42c1] focus:border-[#6f42c1] outline-none transition-colors"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={isFormDisabled}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="organization"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Organization
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6f42c1] focus:border-[#6f42c1] outline-none transition-colors"
              id="organization"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              disabled={isFormDisabled}
            />
          </div>
          <hr className="border-gray-200 my-6" />
          <h6 className="text-lg font-semibold mb-4">Notification Preferences</h6>
          <div className="mb-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 text-[#6f42c1] border-gray-300 rounded focus:ring-[#6f42c1] focus:ring-2"
                id="notification.email"
                name="notification.email"
                checked={formData.notifications.email}
                onChange={handleChange}
                disabled={isFormDisabled}
              />
              <span className="ml-3 text-gray-700">Email Notifications</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 text-[#6f42c1] border-gray-300 rounded focus:ring-[#6f42c1] focus:ring-2"
                id="notification.sms"
                name="notification.sms"
                checked={formData.notifications.sms}
                onChange={handleChange}
                disabled={isFormDisabled}
              />
              <span className="ml-3 text-gray-700">SMS Notifications</span>
            </label>
          </div>
          <div className="mb-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 text-[#6f42c1] border-gray-300 rounded focus:ring-[#6f42c1] focus:ring-2"
                id="notification.push"
                name="notification.push"
                checked={formData.notifications.push}
                onChange={handleChange}
                disabled={isFormDisabled}
              />
              <span className="ml-3 text-gray-700">Push Notifications</span>
            </label>
          </div>
          <hr className="border-gray-200 my-6" />
          <h6 className="text-lg font-semibold mb-4">Security Settings</h6>
          <div className="mb-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 text-[#6f42c1] border-gray-300 rounded focus:ring-[#6f42c1] focus:ring-2"
                id="twoFactor"
                name="twoFactor"
                checked={formData.twoFactor}
                onChange={handleChange}
                disabled={isFormDisabled}
              />
              <span className="ml-3 text-gray-700">Enable Two-Factor Authentication</span>
            </label>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="px-6 py-2 bg-[#6f42c1] text-white rounded-lg hover:bg-[#5a32a3] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isFormDisabled || isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              disabled={isFormDisabled || isSaving}
            >
              Cancel
            </button>
          </div>
          {statusMessage && (
            <p
              className={`mt-4 text-sm ${
                statusMessage.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {statusMessage.text}
            </p>
          )}
          {!disabled && isFormDisabled && (
            <p className="mt-3 text-sm text-gray-500">Loading profile...</p>
          )}
          {disabled && (
            <p className="mt-3 text-sm text-gray-500">
              Sign in to update your Hawkeye profile.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
