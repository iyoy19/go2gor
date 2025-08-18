"use client";

import React, { useEffect } from "react";
import NextLink from "next/link";
import { Avatar } from "@heroui/react";
import {
  ChevronRight,
  X,
  User,
  Settings,
  Bell,
  Calendar,
  ClipboardList,
  Users,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { NavItem } from "@/types";

interface ProfileMenuProps {
  isVisible: boolean;
  profileNavItem?: NavItem;
  navbarHeight: number;
  onClose: () => void;
}

const iconMapping: {
  [key: string]: { Icon: React.ElementType; color: string };
} = {
  "profil-saya": { Icon: User, color: "#4F46E5" },
  pengaturan: { Icon: Settings, color: "#10B981" },
  notif: { Icon: Bell, color: "#F59E0B" },
  "jadwal-saya": { Icon: Calendar, color: "#3B82F6" },
  "aktivitas-riwayat": { Icon: ClipboardList, color: "#8B5CF6" },
  "tim-saya": { Icon: Users, color: "#F43F5E" },
  help: { Icon: HelpCircle, color: "#F97316" },
  logout: { Icon: LogOut, color: "#EF4444" },
};

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  isVisible,
  profileNavItem,
  navbarHeight,
  onClose,
}) => {
  if (!isVisible || !profileNavItem?.children) return null;

  // Lock scroll saat menu terbuka
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = isVisible ? "hidden" : "auto";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [isVisible]);

  const gridItems = profileNavItem.children
    .filter((g) => g.key !== "bantuan")
    .flatMap((g) => g.items || []);

  const listGroup = profileNavItem.children.find((g) => g.key === "bantuan");

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Menu */}
      <div
        className={`
          fixed right-3 sm:right-14
          top-[calc(4rem+1rem)]
          bg-gray-900/95 backdrop-blur-md
          rounded-3xl shadow-2xl z-50
          border border-gray-700
          w-[95%] max-w-md
          flex flex-col
          transform transition-all duration-300 ease-out
          font-sans
          ${isVisible ? "translate-y-2 opacity-100" : "-translate-y-5 opacity-0"}
        `}
        style={{ maxHeight: `calc(100vh - ${navbarHeight + 16}px)` }}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="md"
                className="ring-2 ring-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
              />
              <div>
                <p className="font-bold text-white text-lg tracking-wide">
                  Zoey Adams
                </p>
                <p className="text-sm text-gray-300">zoey@example.com</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white rounded-full transition-colors"
              title="Tutup"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Grid Shortcuts */}
        {gridItems.length > 0 && (
          <div className="px-6 py-4 sm:py-6 border-b border-gray-700">
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 sm:gap-5 text-center">
              {gridItems.map((item) => {
                const mapping = iconMapping[item.key] || {
                  Icon: ChevronRight,
                  color: "#ffffff",
                };
                const { Icon, color } = mapping;

                return (
                  <NextLink
                    key={item.key}
                    href={item.href}
                    onClick={onClose}
                    className="flex flex-col items-center justify-center text-gray-200"
                  >
                    <div className="p-4 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 bg-transparent">
                      <Icon size={28} style={{ color }} />
                    </div>
                    <span className="mt-2 text-xs font-semibold text-gray-100">
                      {item.label}
                    </span>
                  </NextLink>
                );
              })}
            </div>
          </div>
        )}

        {/* List Menu (Bantuan) */}
        {listGroup && (
          <div className="flex-1 overflow-hidden px-4 py-2 sm:px-4 sm:py-4">
            <h3 className="px-2 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-700 pb-1 mb-3">
              {listGroup.title}
            </h3>
            <div className="space-y-2 pb-4">
              {listGroup.items?.map((item) => {
                const mapping = iconMapping[item.key] || {
                  Icon: ChevronRight,
                  color: "#ffffff",
                };
                const { Icon, color } = mapping;
                const isLogout = item.key === "logout";

                return (
                  <NextLink
                    key={item.key}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center justify-between w-full px-4 py-2 text-sm rounded-xl transition-all duration-300 ${
                      isLogout
                        ? "text-red-400 hover:bg-red-500/20"
                        : "text-gray-200 hover:bg-gray-700/30 hover:backdrop-blur-sm hover:scale-[1.02]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        size={20}
                        style={{ color: isLogout ? "#EF4444" : color }}
                      />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    {!isLogout && (
                      <ChevronRight size={16} className="text-gray-400" />
                    )}
                  </NextLink>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileMenu;
