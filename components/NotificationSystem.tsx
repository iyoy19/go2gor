"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
        "Server akan restart malam ini pukul 23:00 WIB untuk pemeliharaan rutin. Mohon simpan pekerjaan Anda.",
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
        "Booking lapangan futsal Anda untuk tanggal 25 Agustus 2025 pukul 19:00 sudah dikonfirmasi. Silakan datang 15 menit sebelum waktu bermain.",
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
        "Pembayaran untuk booking lapangan basket telah berhasil diproses. Receipt telah dikirim ke email Anda.",
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
        "Selamat datang di platform kami! Jangan lupa lengkapi profil Anda untuk pengalaman yang lebih baik 🎉",
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

  // Enhanced smooth spring animation config
  const springConfig = {
    type: "spring" as const,
    damping: 25,
    stiffness: 300,
    mass: 0.8,
  };

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
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-400" />;
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

  return (
    <div className="relative">
      {/* Notification Button */}
      <motion.button
        onClick={toggleNotifications}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="relative p-2.5 rounded-xl bg-gray-800/50 hover:bg-gray-700/80 
                   transition-all duration-300 ease-out border border-gray-700/50 
                   hover:border-gray-600/50 group will-change-transform"
      >
        <motion.div
          animate={unreadCount > 0 ? { rotate: [0, -10, 10, -10, 0] } : {}}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Bell className="w-6 h-6 text-gray-200 group-hover:text-white transition-colors duration-200" />
        </motion.div>
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 400,
              mass: 0.5,
            }}
            className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 
                       text-white text-xs font-bold rounded-full w-6 h-6 
                       flex items-center justify-center shadow-lg ring-2 ring-gray-900
                       will-change-transform"
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </motion.span>
        )}
        {highPriorityCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, ...springConfig }}
            className="absolute -bottom-1 -right-1 w-3 h-3 bg-orange-500 
                          rounded-full shadow-lg will-change-transform"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-full h-full bg-orange-500 rounded-full"
            />
          </motion.div>
        )}
      </motion.button>

      {/* Notification Panel */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
              scale: 0.96,
              filter: "blur(4px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.96,
              filter: "blur(2px)",
            }}
            transition={{
              duration: 0.25,
              ease: [0.16, 1, 0.3, 1], // Custom smooth easing
            }}
            ref={panelRef}
            className="fixed top-16 sm:top-20 right-2 sm:right-4 lg:right-8 
                       w-[95%] sm:w-[420px] lg:w-[480px] xl:w-[520px]
                       bg-gray-900/98 backdrop-blur-xl rounded-2xl shadow-2xl
                       border border-gray-700/50 z-[9999]
                       max-h-[calc(100vh-6rem)] flex flex-col overflow-hidden
                       will-change-transform"
            style={{
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)",
            }}
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="flex items-center justify-between p-4 sm:p-6 
                            border-b border-gray-800/70 bg-gray-900/80"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="p-2 bg-blue-600/20 rounded-xl"
                >
                  <Bell className="w-5 h-5 text-blue-400" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-bold text-white">Notifikasi</h3>
                  <motion.p
                    key={unreadCount}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs text-gray-400"
                  >
                    {unreadCount} belum dibaca
                  </motion.p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/60 
                             rounded-xl transition-all duration-200 will-change-transform"
                >
                  <Settings size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/60 
                             rounded-xl transition-all duration-200 will-change-transform"
                >
                  <X size={18} />
                </motion.button>
              </div>
            </motion.div>

            {/* Settings Panel */}
            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
                    opacity: { duration: 0.2 },
                  }}
                  className="overflow-hidden border-b border-gray-800/70 bg-gray-900/60"
                >
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ delay: 0.1, duration: 0.2 }}
                    className="p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">
                        Hanya yang belum dibaca
                      </span>
                      <motion.button
                        onClick={() => setShowOnlyUnread(!showOnlyUnread)}
                        className={`w-12 h-6 rounded-full transition-all duration-300 ease-out ${
                          showOnlyUnread ? "bg-blue-600" : "bg-gray-700"
                        }`}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          animate={{
                            x: showOnlyUnread ? 24 : 2,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 25,
                          }}
                          className="w-5 h-5 bg-white rounded-full shadow-sm will-change-transform"
                        />
                      </motion.button>
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={markAllAsRead}
                        className="flex items-center gap-2 px-3 py-2 text-xs 
                                   bg-blue-600/20 text-blue-400 rounded-lg 
                                   hover:bg-blue-600/30 transition-all duration-200
                                   will-change-transform"
                      >
                        <CheckCheck size={14} />
                        Tandai Semua Dibaca
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={clearAllNotifications}
                        className="flex items-center gap-2 px-3 py-2 text-xs 
                                   bg-red-600/20 text-red-400 rounded-lg 
                                   hover:bg-red-600/30 transition-all duration-200
                                   will-change-transform"
                      >
                        <Trash2 size={14} />
                        Hapus Semua
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Category Tabs */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="flex justify-between px-4 sm:px-6 py-3 border-b border-gray-800/70 
                            bg-gray-900/40 overflow-x-auto"
            >
              {categories.map(({ key, label, icon: Icon }, index) => (
                <motion.button
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveCategory(key)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl 
                              text-sm font-medium transition-all duration-300 ease-out whitespace-nowrap
                              will-change-transform ${
                                activeCategory === key
                                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                                  : "text-gray-400 hover:text-white hover:bg-gray-800/60"
                              }`}
                >
                  <motion.div
                    animate={
                      activeCategory === key ? { rotate: 360 } : { rotate: 0 }
                    }
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <Icon size={16} />
                  </motion.div>
                  <span className="hidden sm:inline">{label}</span>
                </motion.button>
              ))}
            </motion.div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center h-48 text-gray-400"
                >
                  <motion.div
                    animate={{
                      y: [0, -8, 0],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Bell className="w-12 h-12 mb-4 opacity-50" />
                  </motion.div>
                  <p className="text-lg font-medium">Tidak ada notifikasi</p>
                  <p className="text-sm">
                    Semua notifikasi akan muncul di sini
                  </p>
                </motion.div>
              ) : (
                <div className="divide-y divide-gray-800/50">
                  <AnimatePresence mode="popLayout">
                    {filteredNotifications.map((n, index) => (
                      <motion.div
                        key={n.id}
                        layout
                        initial={{
                          opacity: 0,
                          x: -20,
                          scale: 0.95,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          x: 100,
                          scale: 0.95,
                          height: 0,
                          marginTop: 0,
                          marginBottom: 0,
                          paddingTop: 0,
                          paddingBottom: 0,
                        }}
                        transition={{
                          delay: index * 0.03,
                          duration: 0.3,
                          ease: [0.16, 1, 0.3, 1],
                          layout: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                        }}
                        whileHover={{
                          x: 4,
                          backgroundColor: "rgba(75, 85, 99, 0.1)",
                        }}
                        onClick={() => handleNotificationClick(n.id)}
                        className={`relative group px-4 sm:px-6 py-4 cursor-pointer 
                                    transition-all duration-300 ease-out
                                    border-l-4 ${getPriorityColor(n.priority)} ${
                                      n.isRead ? "opacity-60" : ""
                                    } will-change-transform`}
                      >
                        <div className="flex items-start gap-3">
                          {/* Sender Photo & Type Icon */}
                          <div className="relative flex-shrink-0">
                            <motion.img
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.2 }}
                              src={n.senderPhoto}
                              alt="pengirim"
                              className="w-12 h-12 rounded-xl object-cover border-2 border-gray-700
                                         will-change-transform"
                            />
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ delay: 0.1, duration: 0.3 }}
                              className="absolute -bottom-1 -right-1 bg-gray-900 rounded-full p-1"
                            >
                              {getNotificationIcon(n.type)}
                            </motion.div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0 pr-12">
                            <div className="flex items-start justify-between mb-1">
                              <h4
                                className={`text-sm font-bold leading-tight ${
                                  n.isRead ? "text-gray-400" : "text-white"
                                }`}
                              >
                                {n.title}
                                {n.actionRequired && (
                                  <motion.span
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2, duration: 0.3 }}
                                    className="ml-2 px-2 py-0.5 text-xs bg-orange-600/20 
                                               text-orange-400 rounded-full"
                                  >
                                    Perlu Tindakan
                                  </motion.span>
                                )}
                              </h4>
                            </div>

                            <p
                              className={`text-sm leading-relaxed ${
                                n.isRead ? "text-gray-500" : "text-gray-300"
                              }`}
                            >
                              {n.message}
                            </p>

                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1, duration: 0.3 }}
                              className="flex items-center justify-between mt-3"
                            >
                              <span className="text-xs text-gray-500 font-medium">
                                {formatTimeAgo(n.timestamp)}
                              </span>

                              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <motion.button
                                  whileHover={{ scale: 1.2, rotate: 10 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleBookmark(n.id);
                                  }}
                                  className={`p-1.5 rounded-lg transition-all duration-200 will-change-transform ${
                                    n.isBookmarked
                                      ? "text-yellow-400 bg-yellow-400/20"
                                      : "text-gray-500 hover:text-yellow-400 hover:bg-yellow-400/10"
                                  }`}
                                >
                                  {n.isBookmarked ? (
                                    <BookmarkCheck size={14} />
                                  ) : (
                                    <Bookmark size={14} />
                                  )}
                                </motion.button>

                                <motion.button
                                  whileHover={{ scale: 1.2, rotate: 10 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNotification(n.id);
                                  }}
                                  className="p-1.5 text-gray-500 hover:text-red-400 
                                             hover:bg-red-400/10 rounded-lg transition-all duration-200
                                             will-change-transform"
                                >
                                  <Trash2 size={14} />
                                </motion.button>
                              </div>
                            </motion.div>
                          </div>

                          {/* Unread Indicator */}
                          {!n.isRead && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 25,
                              }}
                              className="absolute top-4 right-4"
                            >
                              <div className="w-3 h-3 bg-blue-500 rounded-full shadow-lg">
                                <motion.div
                                  animate={{ scale: [1, 1.3, 1] }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  }}
                                  className="w-full h-full bg-blue-500 rounded-full opacity-40"
                                />
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer Stats */}
            {filteredNotifications.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="px-4 sm:px-6 py-3 border-t border-gray-800/70 
                              bg-gray-900/60 text-center"
              >
                <p className="text-xs text-gray-500">
                  Menampilkan {filteredNotifications.length} notifikasi
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
