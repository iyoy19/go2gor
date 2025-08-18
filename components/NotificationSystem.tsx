"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Bell,
  BellRing,
  X,
  CalendarCheck,
  Clock,
  CircleDollarSign,
  Users,
  CalendarX,
  Megaphone,
  ShieldQuestion,
} from "lucide-react";

// --- 1. Tipe Notifikasi ---
interface Notification {
  id: string;
  type:
    | "booking_confirmation"
    | "booking_reminder"
    | "payment_success"
    | "match_invite"
    | "cancellation_info"
    | "announcement";
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  priority: "low" | "medium" | "high";
  actionUrl?: string;
  metadata?: {
    field?: string;
    teamName?: string;
    bookingId?: string;
  };
}

interface NotificationFilter {
  type: string;
  label: string;
  icon: React.ElementType;
}

// --- 2. Mock Data ---
const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "booking_confirmation",
    title: "Booking Berhasil!",
    message: "Anda berhasil booking Lapangan Futsal A pada hari ini jam 19:00.",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    isRead: false,
    priority: "high",
    actionUrl: "/booking/history/123",
    metadata: { field: "Lapangan Futsal A", bookingId: "BK-123" },
  },
  {
    id: "2",
    type: "booking_reminder",
    title: "Pengingat Jadwal Tanding",
    message: "Jangan lupa, jadwal main badminton Anda besok jam 15:00.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isRead: false,
    priority: "medium",
    actionUrl: "/my-schedule",
    metadata: { field: "Lapangan Badminton 3" },
  },
  {
    id: "3",
    type: "match_invite",
    title: "Undangan Bergabung Tim",
    message: "Tim Elang FC mengundang Anda untuk bergabung.",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    isRead: true,
    priority: "medium",
    actionUrl: "/team/elang-fc",
    metadata: { teamName: "Elang FC" },
  },
  {
    id: "4",
    type: "announcement",
    title: "Info Turnamen Kemerdekaan",
    message: "Segera daftar untuk Turnamen Futsal Kemerdekaan! Slot terbatas.",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    isRead: true,
    priority: "low",
    actionUrl: "/tournaments/kemerdekaan",
  },
  {
    id: "5",
    type: "payment_success",
    title: "Pembayaran Berhasil",
    message: "Pembayaran untuk booking #BK-122 telah kami terima.",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isRead: true,
    priority: "medium",
    actionUrl: "/booking/history/122",
    metadata: { bookingId: "BK-122" },
  },
];

// --- 3. Filter Notifikasi ---
const notificationFilters: NotificationFilter[] = [
  { type: "all", label: "Semua", icon: Bell },
  { type: "booking", label: "Booking", icon: CalendarCheck },
  { type: "match", label: "Tanding & Tim", icon: Users },
  { type: "info", label: "Info GOR", icon: Megaphone },
];

// --- 4. Utility Functions ---
const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diffInSeconds < 60) return `baru saja`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}j`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}h`;
};

const getNotificationIcon = (type: Notification["type"]) => {
  const iconProps = { size: 22, className: "text-gray-300" };
  switch (type) {
    case "booking_confirmation":
      return <CalendarCheck {...iconProps} className="text-green-400" />;
    case "booking_reminder":
      return <Clock {...iconProps} className="text-blue-400" />;
    case "payment_success":
      return <CircleDollarSign {...iconProps} className="text-emerald-400" />;
    case "match_invite":
      return <Users {...iconProps} className="text-purple-400" />;
    case "cancellation_info":
      return <CalendarX {...iconProps} className="text-red-400" />;
    case "announcement":
      return <Megaphone {...iconProps} className="text-yellow-400" />;
    default:
      return <ShieldQuestion {...iconProps} />;
  }
};

const getPriorityClasses = (
  priority: Notification["priority"],
  isRead: boolean
): string => {
  if (isRead) return "border-l-transparent";
  switch (priority) {
    case "high":
      return "border-l-red-500";
    case "medium":
      return "border-l-blue-500";
    case "low":
      return "border-l-gray-500";
    default:
      return "border-l-transparent";
  }
};

// --- 5. Component NotificationSystem ---
export default function NotificationSystem() {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close panel jika klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Lock scroll saat panel terbuka
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getFilteredNotifications = () => {
    if (selectedFilter === "all") return notifications;
    if (selectedFilter === "booking") {
      return notifications.filter(
        (n) =>
          n.type.startsWith("booking_") ||
          n.type.startsWith("payment_") ||
          n.type.startsWith("cancellation_")
      );
    }
    if (selectedFilter === "match") {
      return notifications.filter((n) => n.type === "match_invite");
    }
    if (selectedFilter === "info") {
      return notifications.filter((n) => n.type === "announcement");
    }
    return [];
  };

  const filteredNotifications = getFilteredNotifications();

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    const unread = notifications.filter((n) => !n.isRead);
    if (notifications.length > unread.length) {
      setNotifications(unread);
    } else {
      setNotifications([]);
    }
  }, [notifications]);

  const handleNotificationClick = useCallback(
    (notification: Notification) => {
      if (!notification.isRead) markAsRead(notification.id);
      if (notification.actionUrl)
        console.log("Navigating to:", notification.actionUrl);
      setIsOpen(false);
    },
    [markAsRead]
  );

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-700/80 transition-colors duration-200 group"
        aria-label="Notifikasi"
      >
        {unreadCount > 0 ? (
          <>
            <BellRing
              size={22}
              className="text-white group-hover:text-gray-100"
            />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
              {unreadCount}
            </span>
          </>
        ) : (
          <Bell size={22} className="text-gray-300 group-hover:text-white" />
        )}
      </button>

      {isOpen && (
        <div
          ref={panelRef}
          className="fixed top-15 inset-x-4 sm:absolute sm:right-0 sm:w-96 sm:inset-x-auto bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 z-50 max-h-[calc(100vh-6rem)] flex flex-col"
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-700/60 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Notifikasi</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Tandai semua dibaca
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-400 hover:text-white rounded-full hover:bg-gray-700/80 transition-colors"
                title="Tutup"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="p-2 border-b border-gray-700/60 flex gap-2">
            {notificationFilters.map((filter) => (
              <button
                key={filter.type}
                onClick={() => setSelectedFilter(filter.type)}
                className={`flex-1 px-2 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center justify-center gap-1.5 ${
                  selectedFilter === filter.type
                    ? "bg-gray-700/80 text-white"
                    : "text-gray-400 hover:bg-gray-800/60 hover:text-gray-200"
                }`}
              >
                <filter.icon size={14} />
                {filter.label}
              </button>
            ))}
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell size={48} className="text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">Tidak ada notifikasi</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-800/70">
                {filteredNotifications.map((n) => (
                  <div
                    key={n.id}
                    className={`relative p-3.5 hover:bg-gray-800/70 cursor-pointer transition-colors border-l-4 ${getPriorityClasses(
                      n.priority,
                      n.isRead
                    )} ${n.isRead ? "opacity-60" : ""}`}
                    onClick={() => handleNotificationClick(n)}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 pt-1">
                        {getNotificationIcon(n.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4
                          className={`text-sm font-semibold ${n.isRead ? "text-gray-400" : "text-white"}`}
                        >
                          {n.title}
                        </h4>
                        <p
                          className={`text-sm mt-1 line-clamp-2 ${n.isRead ? "text-gray-500" : "text-gray-300"}`}
                        >
                          {n.message}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">
                            {formatTimeAgo(n.timestamp)}
                          </span>
                          {!n.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(n.id);
                        }}
                        className="absolute top-2 right-2 p-1 text-gray-500 hover:text-red-400 rounded-full hover:bg-gray-700/80 transition-colors"
                        title="Hapus"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-2 border-t border-gray-700/60 bg-gray-900/50 flex justify-center">
              <button
                onClick={clearAllNotifications}
                className="text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3 py-1.5 rounded-md transition-colors"
              >
                Hapus semua notifikasi yang sudah dibaca
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
