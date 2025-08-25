"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  X,
  User,
  Settings,
  MessageSquare,
  Calendar,
  ClipboardList,
  Mail,
  Users,
  HelpCircle,
  LogOut,
  Globe,
  Info,
} from "lucide-react";

interface NavItem {
  key: string;
  label: string;
  href: string;
}

interface NavGroup {
  key: string;
  title: string;
  items?: NavItem[];
}

interface ProfileNavItem {
  children?: NavGroup[];
}

interface ProfileMenuProps {
  isVisible: boolean;
  profileNavItem?: ProfileNavItem;
  navbarHeight: number;
  onClose: () => void;
}

const iconMapping: {
  [key: string]: { Icon: React.ElementType; color: string };
} = {
  undangan: { Icon: Mail, color: "#4F46E5" },
  pengaturan: { Icon: Settings, color: "#10B981" },
  notif: { Icon: MessageSquare, color: "#F59E0B" },
  "jadwal-saya": { Icon: Calendar, color: "#3B82F6" },
  "aktivitas-riwayat": { Icon: ClipboardList, color: "#8B5CF6" },
  "tim-saya": { Icon: Users, color: "#F43F5E" },
  about: { Icon: Info, color: "#8B5CF6" },
  language: { Icon: Globe, color: "#3B82F6" },
  help: { Icon: HelpCircle, color: "#F97316" },
  logout: { Icon: LogOut, color: "#EF4444" },
};

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  isVisible,
  profileNavItem,
  navbarHeight,
  onClose,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Lock scroll saat menu terbuka
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = isVisible ? "hidden" : "auto";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [isVisible]);

  // Close jika klik di luar menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isVisible &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, onClose]);

  // Early return with proper null check
  if (!profileNavItem?.children || profileNavItem.children.length === 0) {
    return null;
  }

  const gridItems = profileNavItem.children
    .filter((g) => g.key !== "bantuan")
    .flatMap((g) => g.items || []);

  const listGroup = profileNavItem.children.find((g) => g.key === "bantuan");

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <>
          {/* Menu */}
          <motion.div
            ref={menuRef}
            initial={{
              opacity: 0,
              scale: 0.95,
              y: -20,
              filter: "blur(4px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 8,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: -10,
              filter: "blur(2px)",
            }}
            transition={{
              duration: 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed right-2 sm:right-4 top-full
                       bg-gray-900/98 backdrop-blur-xl
                       rounded-xl shadow-2xl z-50
                       border border-gray-700/50
                       w-[280px] sm:w-[320px]
                       flex flex-col
                       font-sans will-change-transform"
            style={{
              maxHeight: `calc(100vh - ${navbarHeight + 16}px)`,
              boxShadow:
                "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)",
            }}
          >
            {/* Compact Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="p-4 border-b border-gray-700/70"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-0.5">
                      <img
                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"
                    />
                  </motion.div>
                  <div>
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15, duration: 0.3 }}
                      className="font-semibold text-white text-sm"
                    >
                      Zoey Adams
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="text-xs text-gray-400"
                    >
                      zoey@example.com
                    </motion.p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  onClick={onClose}
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800/60 
                             rounded-lg transition-all duration-200 will-change-transform"
                  title="Tutup"
                >
                  <X size={16} />
                </motion.button>
              </div>
            </motion.div>

            {/* Compact Grid Shortcuts */}
            {gridItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="px-4 py-3 border-b border-gray-700/70"
              >
                <div className="grid grid-cols-3 gap-3 text-center">
                  {gridItems.slice(0, 6).map((item, index) => {
                    const mapping = iconMapping[item.key] || {
                      Icon: ChevronRight,
                      color: "#ffffff",
                    };
                    const { Icon, color } = mapping;

                    return (
                      <motion.a
                        key={item.key}
                        href={item.href}
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          delay: 0.3 + index * 0.05,
                          duration: 0.3,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        whileHover={{
                          scale: 1.1,
                          y: -3,
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onClose}
                        className="flex flex-col items-center justify-center text-gray-200 
                                   group cursor-pointer will-change-transform"
                      >
                        <motion.div
                          whileHover={{
                            boxShadow: `0 8px 20px -5px ${color}40`,
                            backgroundColor: `${color}15`,
                          }}
                          className="p-3 rounded-xl transition-all duration-300 
                                     bg-gray-800/40 hover:bg-gray-700/60 backdrop-blur-sm
                                     border border-gray-700/30 hover:border-gray-600/50"
                        >
                          <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: index * 0.2,
                            }}
                          >
                            <Icon size={20} style={{ color }} />
                          </motion.div>
                        </motion.div>
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 + index * 0.05 }}
                          className="mt-2 text-[10px] font-medium text-gray-300 
                                     group-hover:text-white transition-colors duration-200
                                     leading-tight"
                        >
                          {item.label.length > 10
                            ? item.label.substring(0, 10) + "..."
                            : item.label}
                        </motion.span>
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Compact List Menu (Bantuan) */}
            {listGroup && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                className="flex-1 overflow-hidden px-3 py-2"
              >
                <motion.h3
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="px-2 py-1 text-[10px] font-semibold text-gray-500 uppercase 
                             tracking-wider border-b border-gray-700/50 pb-1 mb-2"
                >
                  {listGroup.title}
                </motion.h3>
                <div className="space-y-0.5 pb-3">
                  {listGroup.items?.map((item, index) => {
                    const mapping = iconMapping[item.key] || {
                      Icon: ChevronRight,
                      color: "#ffffff",
                    };
                    const { Icon, color } = mapping;
                    const isLogout = item.key === "logout";

                    return (
                      <motion.a
                        key={item.key}
                        href={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.35 + index * 0.05,
                          duration: 0.3,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        whileHover={{
                          x: 4,
                          scale: 1.02,
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onClose}
                        className={`flex items-center justify-between w-full px-3 py-2.5 text-sm 
                                   rounded-lg transition-all duration-300 group cursor-pointer
                                   will-change-transform ${
                                     isLogout
                                       ? "text-red-400 hover:bg-red-500/15 hover:border-red-500/30"
                                       : "text-gray-300 hover:bg-gray-700/40 hover:backdrop-blur-sm"
                                   } border border-transparent hover:border-gray-600/30`}
                      >
                        <div className="flex items-center gap-2.5">
                          <motion.div
                            whileHover={{
                              rotate: isLogout ? 0 : 360,
                              scale: 1.1,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <Icon
                              size={16}
                              style={{ color: isLogout ? "#EF4444" : color }}
                            />
                          </motion.div>
                          <span className="font-medium text-sm group-hover:text-white transition-colors">
                            {item.label}
                          </span>
                        </div>
                        {!isLogout && (
                          <motion.div
                            whileHover={{ x: 2 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight
                              size={14}
                              className="text-gray-500 group-hover:text-gray-300"
                            />
                          </motion.div>
                        )}
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfileMenu;
