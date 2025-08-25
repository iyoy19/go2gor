"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Bell,
  X,
  Check,
  CheckCheck,
  Trash2,
  Filter,
  Settings,
  Calendar,
  Info,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";

type NotificationType = "info" | "warning" | "success" | "error";
type NotificationPriority = "low" | "medium" | "high";
type NotificationCategory = "semua" | "booking" | "info-gor";

interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: Date;
  type: NotificationType;
  priority: NotificationPriority;
  isRead: boolean;
  isBookmarked: boolean;
  category: NotificationCategory;
  senderPhoto: string;
  actionRequired?: boolean;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Server Update",
      message:
        "Server akan restart malam ini pukul 23:00 WIB untuk pemeliharaan rutin.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      type: "warning",
      priority: "high",
      isRead: false,
      isBookmarked: true,
      category: "info-gor",
      senderPhoto: "/api/placeholder/40/40",
      actionRequired: true,
    },
    {
      id: 2,
      title: "Booking Disetujui",
      message:
        "Booking lapangan futsal Anda untuk tanggal 25 Agustus 2025 pukul 19:00 sudah dikonfirmasi.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      type: "success",
      priority: "medium",
      isRead: false,
      isBookmarked: false,
      category: "booking",
      senderPhoto: "/api/placeholder/40/40",
    },
    {
      id: 3,
      title: "Pembayaran Berhasil",
      message:
        "Pembayaran untuk booking lapangan basket telah berhasil diproses.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
      type: "success",
      priority: "medium",
      isRead: false,
      isBookmarked: false,
      category: "booking",
      senderPhoto: "/api/placeholder/40/40",
    },
    {
      id: 4,
      title: "Welcome!",
      message:
        "Selamat datang di platform kami! Lengkapi profil Anda untuk pengalaman yang lebih baik.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      type: "info",
      priority: "low",
      isRead: true,
      isBookmarked: false,
      category: "semua",
      senderPhoto: "/api/placeholder/40/40",
    },
    {
      id: 5,
      title: "Koneksi Bermasalah",
      message:
        "Terjadi gangguan koneksi sementara. Tim teknis sedang menangani masalah ini.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
      type: "error",
      priority: "high",
      isRead: true,
      isBookmarked: false,
      category: "info-gor",
      senderPhoto: "/api/placeholder/40/40",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] =
    useState<NotificationCategory>("semua");
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setShowSettings(false);
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const highPriorityCount = notifications.filter(
    (n) => !n.isRead && n.priority === "high"
  ).length;

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
    setShowSettings(false);
  };

  const handleNotificationClick = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const toggleBookmark = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, isBookmarked: !n.isBookmarked } : n
      )
    );
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    if (minutes < 1) return "Baru saja";
    if (minutes < 60) return `${minutes}m yang lalu`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}j yang lalu`;
    const days = Math.floor(hours / 24);
    return `${days}h yang lalu`;
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      case "info":
        return <Info className="w-4 h-4 text-blue-400" />;
    }
  };

  const getPriorityColor = (priority: NotificationPriority) => {
    switch (priority) {
      case "high":
        return "border-red-500";
      case "medium":
        return "border-yellow-500";
      case "low":
        return "border-blue-500";
    }
  };

  let filteredNotifications =
    activeCategory === "semua"
      ? notifications
      : notifications.filter((n) => n.category === activeCategory);

  if (showOnlyUnread) {
    filteredNotifications = filteredNotifications.filter((n) => !n.isRead);
  }

  const categories = [
    { key: "semua" as NotificationCategory, label: "Semua", icon: Bell },
    {
      key: "booking" as NotificationCategory,
      label: "Booking",
      icon: Calendar,
    },
    { key: "info-gor" as NotificationCategory, label: "Info Gor", icon: Info },
  ];

  // Calculate dynamic height based on content
  const calculatePanelHeight = () => {
    let baseHeight = 200; // Header + categories + footer

    if (showSettings) {
      baseHeight += 100; // Settings panel height
    }

    // Add height for notifications (max 400px for scrollable area)
    const notificationHeight = Math.min(filteredNotifications.length * 80, 400);
    baseHeight += notificationHeight;

    // Max height should not exceed 90vh
    return Math.min(baseHeight, window.innerHeight * 0.9);
  };

  return (
    <div className="relative">
      {/* Notification Button */}
      <button
        onClick={toggleNotifications}
        className="relative p-2 rounded-lg hover:bg-gray-700 
                   transition-all duration-200 hover:border-gray-600 hover:scale-105"
      >
        <Bell className="w-5 h-5 text-gray-200" />
        {unreadCount > 0 && (
          <span
            className="absolute -top-1 -right-1 bg-red-500 
                       text-white text-xs font-bold rounded-full w-5 h-5 
                       flex items-center justify-center animate-pulse"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          className="fixed top-12 right-2 sm:right-4 
                     w-[calc(100vw-16px)] sm:w-80 md:w-96
                     bg-gray-900 rounded-lg shadow-xl
                     border border-gray-700 z-50
                     flex flex-col overflow-hidden
                     transition-all duration-200"
          style={{
            maxHeight: "90vh",
            height: "auto",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between p-4 
                           border-b border-gray-800 flex-shrink-0"
          >
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-blue-400" />
              <h3 className="text-base font-semibold text-white">Notifikasi</h3>
              <span className="text-xs text-gray-400">({unreadCount})</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 
                             rounded transition-colors"
              >
                <Settings size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 
                             rounded transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Settings Panel - Fixed height, no overflow issues */}
          {showSettings && (
            <div className="border-b border-gray-800 flex-shrink-0 bg-gray-900">
              <div className="p-3 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">Hanya belum dibaca</span>
                  <button
                    onClick={() => setShowOnlyUnread(!showOnlyUnread)}
                    className={`w-10 h-5 rounded-full transition-colors relative ${
                      showOnlyUnread ? "bg-blue-600" : "bg-gray-700"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 absolute top-0.5 ${
                        showOnlyUnread ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={markAllAsRead}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs 
                                 bg-blue-600/20 text-blue-400 rounded 
                                 hover:bg-blue-600/30 transition-colors"
                  >
                    <CheckCheck size={12} />
                    Tandai Dibaca
                  </button>
                  <button
                    onClick={clearAllNotifications}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs 
                                 bg-red-600/20 text-red-400 rounded 
                                 hover:bg-red-600/30 transition-colors"
                  >
                    <Trash2 size={12} />
                    Hapus Semua
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Category Tabs - Fixed height */}
          <div className="flex px-4 py-2 border-b border-gray-800 overflow-x-auto flex-shrink-0">
            {categories.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded text-sm 
                              transition-colors whitespace-nowrap ${
                                activeCategory === key
                                  ? "bg-blue-600 text-white"
                                  : "text-gray-400 hover:text-white hover:bg-gray-800"
                              }`}
              >
                <Icon size={14} />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>

          {/* Notifications List - Flexible height with scroll */}
          <div className="flex-1 overflow-y-auto min-h-0">
            {filteredNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-gray-400">
                <Bell className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-sm">Tidak ada notifikasi</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-800">
                {filteredNotifications.map((n, index) => (
                  <div
                    key={n.id}
                    onClick={() => handleNotificationClick(n.id)}
                    style={{ animationDelay: `${index * 50}ms` }}
                    className={`group px-4 py-3 cursor-pointer hover:bg-gray-800/50 
                                  transition-all duration-200 border-l-2 ${getPriorityColor(n.priority)} ${
                                    n.isRead ? "opacity-60" : ""
                                  } transition-all duration-200`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Avatar & Icon */}
                      <div className="relative flex-shrink-0">
                        <img
                          src={n.senderPhoto}
                          alt="sender"
                          className="w-8 h-8 rounded-lg object-cover"
                        />
                        <div className="absolute -bottom-0.5 -right-0.5 bg-gray-900 rounded-full p-0.5">
                          {getNotificationIcon(n.type)}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h4
                            className={`text-sm font-medium ${
                              n.isRead ? "text-gray-400" : "text-white"
                            }`}
                          >
                            {n.title}
                            {n.actionRequired && (
                              <span
                                className="ml-1 px-1.5 py-0.5 text-xs bg-orange-600/20 
                                                 text-orange-400 rounded"
                              >
                                Action
                              </span>
                            )}
                          </h4>
                          {!n.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          )}
                        </div>

                        <p
                          className={`text-sm ${
                            n.isRead ? "text-gray-500" : "text-gray-300"
                          }`}
                        >
                          {n.message}
                        </p>

                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">
                            {formatTimeAgo(n.timestamp)}
                          </span>

                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleBookmark(n.id);
                              }}
                              className={`p-1 rounded transition-colors ${
                                n.isBookmarked
                                  ? "text-yellow-400"
                                  : "text-gray-500 hover:text-yellow-400"
                              }`}
                            >
                              {n.isBookmarked ? (
                                <BookmarkCheck size={12} />
                              ) : (
                                <Bookmark size={12} />
                              )}
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(n.id);
                              }}
                              className="p-1 text-gray-500 hover:text-red-400 rounded transition-colors"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer - Fixed height */}
          {filteredNotifications.length > 0 && (
            <div className="px-4 py-2 border-t border-gray-800 text-center flex-shrink-0">
              <p className="text-xs text-gray-500">
                {filteredNotifications.length} notifikasi
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
