"use client";

import { useState } from "react";
import { Bell, Moon, Sun, Smartphone, Mail, Globe, Save } from "lucide-react";

type NotificationSetting = {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
};

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("id");

  const notificationSettings: NotificationSetting[] = [
    {
      id: "booking",
      title: "Notifikasi Booking",
      description: "Dapatkan notifikasi terkait pemesanan lapangan",
      enabled: true,
    },
    {
      id: "team",
      title: "Notifikasi Tim",
      description: "Dapatkan notifikasi aktivitas tim Anda",
      enabled: true,
    },
    {
      id: "promo",
      title: "Notifikasi Promo",
      description: "Dapatkan informasi promo dan penawaran khusus",
      enabled: false,
    },
  ];

  const [notifications, setNotifications] = useState(notificationSettings);

  const handleNotificationToggle = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, enabled: !notification.enabled }
          : notification
      )
    );
  };

  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan</h1>
        <p className="text-gray-600">
          Sesuaikan pengaturan aplikasi sesuai preferensi Anda
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Appearance Settings */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Tampilan
            </h2>
            <div className="space-y-6">
              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                    {darkMode ? (
                      <Moon className="w-5 h-5 text-indigo-600" />
                    ) : (
                      <Sun className="w-5 h-5 text-indigo-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Mode Gelap</h3>
                    <p className="text-sm text-gray-500">
                      Ubah tampilan ke mode gelap
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              {/* Language Selector */}
              <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Bahasa</h3>
                    <p className="text-sm text-gray-500">
                      Pilih bahasa aplikasi
                    </p>
                  </div>
                </div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="block w-32 rounded-lg border border-gray-200 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="id">Indonesia</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Notifikasi
            </h2>
            <div className="space-y-6">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-100"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                      <Bell className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {notification.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {notification.description}
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notification.enabled}
                      onChange={() => handleNotificationToggle(notification.id)}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Preferences */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Preferensi Kontak
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Email Marketing
                    </h3>
                    <p className="text-sm text-gray-500">
                      Terima newsletter dan info promosi
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      SMS Notifikasi
                    </h3>
                    <p className="text-sm text-gray-500">
                      Terima notifikasi via SMS
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <Save className="w-4 h-4" />
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}
