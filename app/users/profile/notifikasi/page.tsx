"use client";

import { useState } from "react";
import {
  Bell,
  Calendar,
  MessageSquare,
  Users,
  Clock,
  Check,
  X,
  ChevronDown,
  Filter,
} from "lucide-react";

type NotificationType = "booking" | "message" | "team" | "system";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  date: string;
  read: boolean;
  actionRequired?: boolean;
  actionText?: string;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "booking",
    title: "Konfirmasi Booking",
    message:
      "Booking lapangan untuk tanggal 5 September 2025 telah dikonfirmasi",
    time: "10:30",
    date: "4 Sep 2025",
    read: false,
    actionRequired: true,
    actionText: "Lihat Detail",
  },
  {
    id: "2",
    type: "message",
    title: "Pesan Baru",
    message: "Tim Dragon Warriors mengirim pesan baru",
    time: "09:15",
    date: "4 Sep 2025",
    read: false,
    actionRequired: true,
    actionText: "Balas",
  },
  {
    id: "3",
    type: "team",
    title: "Undangan Tim",
    message: "Anda diundang bergabung dengan tim Phoenix Squad",
    time: "Yesterday",
    date: "3 Sep 2025",
    read: true,
    actionRequired: true,
    actionText: "Terima",
  },
  {
    id: "4",
    type: "system",
    title: "Pembaruan Sistem",
    message: "Sistem akan melakukan pembaruan pada tanggal 5 September 2025",
    time: "2 days ago",
    date: "2 Sep 2025",
    read: true,
  },
];

export default function NotifikasiPage() {
  const [selectedType, setSelectedType] = useState<NotificationType | "all">(
    "all"
  );
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const filteredNotifications = notifications.filter((notification) => {
    if (showUnreadOnly && notification.read) return false;
    if (selectedType !== "all" && notification.type !== selectedType)
      return false;
    return true;
  });

  const getIconForType = (type: NotificationType) => {
    switch (type) {
      case "booking":
        return Calendar;
      case "message":
        return MessageSquare;
      case "team":
        return Users;
      case "system":
        return Bell;
      default:
        return Bell;
    }
  };

  const getColorForType = (type: NotificationType) => {
    switch (type) {
      case "booking":
        return "text-green-600 bg-green-50";
      case "message":
        return "text-blue-600 bg-blue-50";
      case "team":
        return "text-purple-600 bg-purple-50";
      case "system":
        return "text-orange-600 bg-orange-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="container mx-auto py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifikasi</h1>
          <p className="text-gray-600">
            Lihat semua notifikasi dan pemberitahuan
          </p>
        </div>
        <button className="text-indigo-600 hover:text-indigo-700 font-medium">
          Tandai semua sudah dibaca
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedType}
              onChange={(e) =>
                setSelectedType(e.target.value as NotificationType | "all")
              }
              className="block rounded-lg border-gray-200 text-gray-700 px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">Semua Notifikasi</option>
              <option value="booking">Booking</option>
              <option value="message">Pesan</option>
              <option value="team">Tim</option>
              <option value="system">Sistem</option>
            </select>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showUnreadOnly}
              onChange={() => setShowUnreadOnly(!showUnreadOnly)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            <span className="text-sm text-gray-600">
              Hanya yang belum dibaca
            </span>
          </label>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => {
          const Icon = getIconForType(notification.type);
          const colorClass = getColorForType(notification.type);

          return (
            <div
              key={notification.id}
              className={`bg-white rounded-xl shadow-sm p-6 ${
                !notification.read ? "border-l-4 border-indigo-500" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-full ${colorClass} flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {notification.title}
                      </h3>
                      <p className="text-gray-600">{notification.message}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-500">
                        {notification.time}
                      </span>
                      <p className="text-xs text-gray-400">
                        {notification.date}
                      </p>
                    </div>
                  </div>
                  {notification.actionRequired && (
                    <div className="mt-4 flex items-center gap-3">
                      <button className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700">
                        {notification.actionText}
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-700">
                        Abaikan
                      </button>
                    </div>
                  )}
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0"></div>
                )}
              </div>
            </div>
          );
        })}

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Tidak ada notifikasi
            </h3>
            <p className="text-gray-500">
              {showUnreadOnly
                ? "Semua notifikasi telah dibaca"
                : "Anda belum memiliki notifikasi"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
