"use client";

import { useState } from "react";
import {
  Shield,
  Key,
  Smartphone,
  Mail,
  AlertCircle,
  Check,
  ChevronRight,
  Lock,
  MapPin,
} from "lucide-react";

const SecurityPage = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const securitySettings = [
    {
      icon: Lock,
      title: "Password",
      description: "Terakhir diubah 3 bulan yang lalu",
      status: "Kuat",
      action: "Ubah",
    },
    {
      icon: Smartphone,
      title: "Two-Factor Authentication",
      description: "Gunakan aplikasi authenticator atau SMS",
      status: twoFactorEnabled ? "Aktif" : "Nonaktif",
      action: twoFactorEnabled ? "Kelola" : "Aktifkan",
    },
    {
      icon: Mail,
      title: "Recovery Email",
      description: "backup@example.com",
      status: "Terverifikasi",
      action: "Ubah",
    },
  ];

  const recentActivity = [
    {
      date: "4 September 2025",
      time: "14:30",
      action: "Login berhasil",
      device: "iPhone 15 Pro - Safari",
      location: "Jakarta, Indonesia",
    },
    {
      date: "4 September 2025",
      time: "10:15",
      action: "Password diubah",
      device: "MacBook Pro - Chrome",
      location: "Jakarta, Indonesia",
    },
    {
      date: "3 September 2025",
      time: "19:45",
      action: "Login berhasil",
      device: "MacBook Pro - Chrome",
      location: "Jakarta, Indonesia",
    },
  ];

  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Keamanan</h1>
        <p className="text-gray-600">
          Kelola pengaturan keamanan dan aktivitas akun Anda
        </p>
      </div>

      {/* Security Score */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Skor Keamanan
              </h2>
              <p className="text-gray-500">Akun Anda terlindungi dengan baik</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">85%</div>
            <p className="text-sm text-gray-500">Tingkat Keamanan</p>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Pengaturan Keamanan
          </h2>
          <div className="space-y-6">
            {securitySettings.map((setting, index) => {
              const Icon = setting.icon;
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-gray-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {setting.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {setting.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        setting.status === "Kuat" ||
                        setting.status === "Aktif" ||
                        setting.status === "Terverifikasi"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {setting.status}
                    </span>
                    <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                      {setting.action}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Aktivitas Terakhir
          </h2>
          <div className="space-y-6">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg border border-gray-100"
              >
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900">
                      {activity.action}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {activity.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">
                    {activity.device}
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin className="w-3 h-3 mr-1" />
                    {activity.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;
