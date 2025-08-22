"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X } from "lucide-react";

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
  category: NotificationCategory;
  senderPhoto: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Server Update",
      message: "Server akan restart malam ini pukul 23:00 WIB.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      type: "warning",
      priority: "high",
      isRead: false,
      category: "info-gor",
      senderPhoto: "/images/logo.png",
    },
    {
      id: 2,
      title: "Booking Disetujui",
      message: "Booking lapangan futsal Anda sudah dikonfirmasi.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      type: "success",
      priority: "medium",
      isRead: false,
      category: "booking",
      senderPhoto: "/images/hero.jpg",
    },
    {
      id: 3,
      title: "Welcome!",
      message: "Selamat datang di platform kami 🎉",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      type: "success",
      priority: "low",
      isRead: true,
      category: "semua",
      senderPhoto: "/images/hero1.jpg",
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] =
    useState<NotificationCategory>("semua");

  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const toggleNotifications = () => setIsOpen(!isOpen);

  const handleNotificationClick = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    if (minutes < 1) return "Baru saja";
    if (minutes < 60) return `${minutes}m lalu`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}j lalu`;
    const days = Math.floor(hours / 24);
    return `${days}h lalu`;
  };

  const filteredNotifications =
    activeCategory === "semua"
      ? notifications
      : notifications.filter((n) => n.category === activeCategory);

  return (
    <div className="relative">
      {/* Tombol Notif */}
      <button
        onClick={toggleNotifications}
        className="relative p-2 rounded-full hover:bg-gray-800/80 transition-colors"
      >
        <Bell className="w-6 h-6 text-gray-200" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            ref={panelRef}
            className="fixed top-18 right-4 sm:right-8 w-[90%] sm:w-[420px] lg:w-[480px]
                       bg-gray-900/100 backdrop-blur-xl rounded-xl shadow-xl
                       border border-gray-700/50 z-[9999]
                       max-h-[calc(100vh-8rem)] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800/70">
              <h3 className="text-lg font-semibold text-white">Notifikasi</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex justify-around px-4 py-2 border-b border-gray-800/70 text-sm">
              {(["semua", "booking", "info-gor"] as NotificationCategory[]).map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 rounded-md transition-colors ${
                      activeCategory === cat
                        ? "bg-blue-600 text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {cat === "semua"
                      ? "Semua"
                      : cat === "booking"
                        ? "Booking"
                        : "Info Gor"}
                  </button>
                )
              )}
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <div className="flex items-center justify-center h-40 text-gray-400">
                  Tidak ada notifikasi
                </div>
              ) : (
                <div className="divide-y divide-gray-800/70">
                  {filteredNotifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => handleNotificationClick(n.id)}
                      className={`relative px-4 py-3 hover:bg-gray-800/70 cursor-pointer transition-colors
                                  border-l-4 ${
                                    n.isRead
                                      ? "border-gray-700 opacity-60"
                                      : n.priority === "high"
                                        ? "border-red-500"
                                        : n.priority === "medium"
                                          ? "border-yellow-500"
                                          : "border-blue-500"
                                  }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Foto Pengirim */}
                        <img
                          src={n.senderPhoto}
                          alt="pengirim"
                          className="w-10 h-10 rounded-full object-cover border border-gray-700"
                        />
                        <div className="flex-1 min-w-0">
                          <h4
                            className={`text-sm font-semibold ${
                              n.isRead ? "text-gray-400" : "text-white"
                            }`}
                          >
                            {n.title}
                          </h4>
                          <p
                            className={`text-sm mt-1 line-clamp-2 ${
                              n.isRead ? "text-gray-500" : "text-gray-300"
                            }`}
                          >
                            {n.message}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-xs text-gray-500">
                            {formatTimeAgo(n.timestamp)}
                          </span>
                          {!n.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          )}
                        </div>
                      </div>

                      {/* Tombol Hapus */}
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
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
