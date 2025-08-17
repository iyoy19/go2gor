import React, { useState, useEffect, useCallback } from "react";
import {
  Bell,
  BellRing,
  Check,
  CheckCheck,
  X,
  Trash2,
  Settings,
  Filter,
  Mail,
  MessageSquare,
  Heart,
  User,
  ShoppingCart,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
  Calendar,
  Gift,
  Zap,
  TrendingUp,
  Shield,
  Star,
  Clock,
  Eye,
  EyeOff,
} from "lucide-react";

// Types for notifications
interface Notification {
  id: string;
  type:
    | "info"
    | "success"
    | "warning"
    | "error"
    | "message"
    | "like"
    | "follow"
    | "order"
    | "system"
    | "promotion";
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  priority: "low" | "medium" | "high";
  actionUrl?: string;
  avatar?: string;
  metadata?: Record<string, any>;
}

interface NotificationFilter {
  type: string;
  label: string;
  icon: React.ElementType;
  color: string;
}

// Mock data for notifications
const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "message",
    title: "Pesan Baru dari Ahmad",
    message: "Halo, bagaimana progress project yang kemarin kita diskusikan?",
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    isRead: false,
    priority: "high",
    actionUrl: "/messages/ahmad",
    avatar: "https://i.pravatar.cc/150?u=ahmad",
  },
  {
    id: "2",
    type: "like",
    title: "Postingan Anda Disukai",
    message:
      'Sarah dan 12 orang lain menyukai postingan tentang "Tips Produktivitas"',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    isRead: false,
    priority: "medium",
    actionUrl: "/posts/123",
    metadata: { likeCount: 13 },
  },
  {
    id: "3",
    type: "follow",
    title: "Pengikut Baru",
    message: "Dr. Maya Sari mulai mengikuti Anda",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isRead: true,
    priority: "medium",
    actionUrl: "/profile/maya-sari",
    avatar: "https://i.pravatar.cc/150?u=maya",
  },
  {
    id: "4",
    type: "order",
    title: "Pesanan Berhasil Diproses",
    message: "Pesanan #ORD-2024-001 sedang dalam proses pengiriman",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    isRead: true,
    priority: "high",
    actionUrl: "/orders/ORD-2024-001",
    metadata: { orderNumber: "ORD-2024-001", status: "shipping" },
  },
  {
    id: "5",
    type: "system",
    title: "Pembaruan Keamanan",
    message:
      "Sistem keamanan telah diperbarui. Silakan periksa pengaturan akun Anda.",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    isRead: false,
    priority: "high",
    actionUrl: "/settings/security",
  },
  {
    id: "6",
    type: "promotion",
    title: "Penawaran Spesial!",
    message:
      "Dapatkan diskon 50% untuk semua produk premium hingga akhir bulan",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    isRead: true,
    priority: "medium",
    actionUrl: "/promotions/special-offer",
    metadata: { discount: 50, validUntil: "2024-08-31" },
  },
  {
    id: "7",
    type: "info",
    title: "Maintenance Terjadwal",
    message:
      "Sistem akan maintenance pada Minggu, 25 Agustus 2024 pukul 02:00-04:00 WIB",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    isRead: true,
    priority: "low",
    actionUrl: "/maintenance-info",
  },
  {
    id: "8",
    type: "success",
    title: "Profil Berhasil Diperbarui",
    message: "Informasi profil Anda telah berhasil disimpan",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    isRead: true,
    priority: "low",
    actionUrl: "/profile",
  },
];

// Notification filters
const notificationFilters: NotificationFilter[] = [
  { type: "all", label: "Semua", icon: Bell, color: "text-gray-600" },
  {
    type: "message",
    label: "Pesan",
    icon: MessageSquare,
    color: "text-blue-600",
  },
  { type: "like", label: "Suka", icon: Heart, color: "text-red-600" },
  { type: "follow", label: "Ikuti", icon: User, color: "text-green-600" },
  {
    type: "order",
    label: "Pesanan",
    icon: ShoppingCart,
    color: "text-purple-600",
  },
  { type: "system", label: "Sistem", icon: Shield, color: "text-orange-600" },
  { type: "promotion", label: "Promo", icon: Gift, color: "text-pink-600" },
];

// Utility functions
const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) return "Baru saja";
  if (diffInMinutes < 60) return `${diffInMinutes}m`;
  if (diffInHours < 24) return `${diffInHours}j`;
  if (diffInDays < 7) return `${diffInDays}h`;

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });
};

const getNotificationIcon = (
  type: Notification["type"],
  priority: Notification["priority"] = "medium"
) => {
  const iconProps = {
    size: 20,
    className: priority === "high" ? "animate-pulse" : "",
  };

  switch (type) {
    case "message":
      return (
        <MessageSquare
          {...iconProps}
          className={`text-blue-600 ${iconProps.className}`}
        />
      );
    case "like":
      return (
        <Heart
          {...iconProps}
          className={`text-red-600 ${iconProps.className}`}
        />
      );
    case "follow":
      return (
        <User
          {...iconProps}
          className={`text-green-600 ${iconProps.className}`}
        />
      );
    case "order":
      return (
        <ShoppingCart
          {...iconProps}
          className={`text-purple-600 ${iconProps.className}`}
        />
      );
    case "system":
      return (
        <Shield
          {...iconProps}
          className={`text-orange-600 ${iconProps.className}`}
        />
      );
    case "promotion":
      return (
        <Gift
          {...iconProps}
          className={`text-pink-600 ${iconProps.className}`}
        />
      );
    case "success":
      return (
        <CheckCircle
          {...iconProps}
          className={`text-green-600 ${iconProps.className}`}
        />
      );
    case "warning":
      return (
        <AlertCircle
          {...iconProps}
          className={`text-yellow-600 ${iconProps.className}`}
        />
      );
    case "error":
      return (
        <XCircle
          {...iconProps}
          className={`text-red-600 ${iconProps.className}`}
        />
      );
    default:
      return (
        <Info
          {...iconProps}
          className={`text-blue-600 ${iconProps.className}`}
        />
      );
  }
};

const getPriorityColor = (priority: Notification["priority"]): string => {
  switch (priority) {
    case "high":
      return "border-l-red-500 bg-red-50/50";
    case "medium":
      return "border-l-blue-500 bg-blue-50/50";
    case "low":
      return "border-l-gray-500 bg-gray-50/50";
    default:
      return "border-l-gray-500 bg-gray-50/50";
  }
};

export default function NotificationSystem() {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    showUnreadOnly: false,
    enableSounds: true,
    autoMarkAsRead: false,
    groupByType: false,
  });

  // Filtered notifications based on current filter
  const filteredNotifications = notifications.filter((notification) => {
    if (selectedFilter === "all") return true;
    if (settings.showUnreadOnly && notification.isRead) return false;
    return notification.type === selectedFilter;
  });

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Mark notification as read
  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  }, []);

  // Mark all notifications as read
  const markAllAsRead = useCallback(() => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  }, []);

  // Delete notification
  const deleteNotification = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  // Clear all notifications
  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Handle notification click
  const handleNotificationClick = useCallback(
    (notification: Notification) => {
      if (!notification.isRead && settings.autoMarkAsRead) {
        markAsRead(notification.id);
      }

      if (notification.actionUrl) {
        // In a real app, you would navigate to the URL
        console.log("Navigate to:", notification.actionUrl);
      }

      setIsOpen(false);
    },
    [markAsRead, settings.autoMarkAsRead]
  );

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add new notification (10% chance every 30 seconds)
      if (Math.random() < 0.1) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: ["message", "like", "follow", "system"][
            Math.floor(Math.random() * 4)
          ] as Notification["type"],
          title: "Notifikasi Baru",
          message: "Ini adalah notifikasi baru yang baru saja masuk",
          timestamp: new Date(),
          isRead: false,
          priority: "medium",
        };

        setNotifications((prev) => [newNotification, ...prev]);

        // Play sound if enabled
        if (settings.enableSounds) {
          // In a real app, you would play a notification sound
          console.log("🔔 New notification sound");
        }
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [settings.enableSounds]);

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-100/50 transition-colors duration-200 group"
        aria-label="Notifications"
      >
        {unreadCount > 0 ? (
          <div className="relative">
            <BellRing
              size={24}
              className="text-gray-700 group-hover:text-gray-900 animate-pulse"
            />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-bounce">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          </div>
        ) : (
          <Bell size={24} className="text-gray-700 group-hover:text-gray-900" />
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[80vh] flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Notifikasi
                {unreadCount > 0 && (
                  <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    {unreadCount} baru
                  </span>
                )}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  title="Pengaturan"
                >
                  <Settings size={16} className="text-gray-600" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  title="Tutup"
                >
                  <X size={16} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mb-3">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md hover:bg-blue-200 transition-colors"
                >
                  <CheckCheck size={12} />
                  Tandai Semua Dibaca
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAllNotifications}
                  className="flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-md hover:bg-red-200 transition-colors"
                >
                  <Trash2 size={12} />
                  Hapus Semua
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="flex gap-1 overflow-x-auto pb-2">
              {notificationFilters.map((filter) => (
                <button
                  key={filter.type}
                  onClick={() => setSelectedFilter(filter.type)}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs whitespace-nowrap transition-colors ${
                    selectedFilter === filter.type
                      ? "bg-blue-100 text-blue-700 border border-blue-300"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <filter.icon size={12} className={filter.color} />
                  {filter.label}
                  {filter.type === "all" && unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-1 min-w-[16px] h-4 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Settings Panel */}
            {showSettings && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg border">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Pengaturan Notifikasi
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={settings.showUnreadOnly}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          showUnreadOnly: e.target.checked,
                        }))
                      }
                      className="rounded"
                    />
                    <EyeOff size={14} />
                    Tampilkan hanya yang belum dibaca
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={settings.enableSounds}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          enableSounds: e.target.checked,
                        }))
                      }
                      className="rounded"
                    />
                    <Bell size={14} />
                    Aktifkan suara notifikasi
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={settings.autoMarkAsRead}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          autoMarkAsRead: e.target.checked,
                        }))
                      }
                      className="rounded"
                    />
                    <Eye size={14} />
                    Tandai dibaca otomatis saat diklik
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell size={48} className="text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">
                  {selectedFilter === "all"
                    ? "Tidak ada notifikasi"
                    : `Tidak ada notifikasi ${notificationFilters.find((f) => f.type === selectedFilter)?.label.toLowerCase()}`}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`relative p-4 hover:bg-gray-50 cursor-pointer transition-colors border-l-4 ${
                      notification.isRead ? "opacity-70" : ""
                    } ${getPriorityColor(notification.priority)}`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex gap-3">
                      {/* Icon or Avatar */}
                      <div className="flex-shrink-0">
                        {notification.avatar ? (
                          <img
                            src={notification.avatar}
                            alt=""
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                            {getNotificationIcon(
                              notification.type,
                              notification.priority
                            )}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4
                            className={`text-sm font-medium ${
                              notification.isRead
                                ? "text-gray-600"
                                : "text-gray-900"
                            }`}
                          >
                            {notification.title}
                          </h4>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                              {formatTimeAgo(notification.timestamp)}
                            </span>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <p
                          className={`text-sm mt-1 line-clamp-2 ${
                            notification.isRead
                              ? "text-gray-500"
                              : "text-gray-700"
                          }`}
                        >
                          {notification.message}
                        </p>

                        {/* Metadata */}
                        {notification.metadata && (
                          <div className="mt-2 flex gap-2 text-xs text-gray-500">
                            {notification.metadata.likeCount && (
                              <span className="flex items-center gap-1">
                                <Heart size={12} className="text-red-500" />
                                {notification.metadata.likeCount} suka
                              </span>
                            )}
                            {notification.metadata.orderNumber && (
                              <span className="flex items-center gap-1">
                                <ShoppingCart
                                  size={12}
                                  className="text-purple-500"
                                />
                                {notification.metadata.orderNumber}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-1">
                        {!notification.isRead && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notification.id);
                            }}
                            className="p-1 hover:bg-blue-100 rounded text-blue-600"
                            title="Tandai sebagai dibaca"
                          >
                            <Check size={14} />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                          className="p-1 hover:bg-red-100 rounded text-red-600"
                          title="Hapus notifikasi"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-100 bg-gray-50">
              <button className="w-full text-center text-blue-600 hover:text-blue-800 text-sm font-medium py-1">
                Lihat Semua Notifikasi
              </button>
            </div>
          )}
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
