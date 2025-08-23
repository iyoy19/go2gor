"use client";

import React, { useEffect, useState } from "react";
import { Avatar } from "@heroui/react";
import { siteConfig } from "@/config/site";
import ProfileMenu from "./ProfileMenu";

interface ProfileAvatarProps {
  navbarHeight: number;
}

export default function ProfileAvatar({ navbarHeight }: ProfileAvatarProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const profileNavItem = siteConfig.navItems.find(
    (item) => item.key === "profile"
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Tutup menu saat scroll
  useEffect(() => {
    const handleScroll = () => {
      if (showProfileMenu) setShowProfileMenu(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showProfileMenu]);

  if (!profileNavItem?.children) return null;

  return (
    <div className="relative">
      <Avatar
        as="button"
        aria-label="User menu"
        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        size="sm"
        className={`cursor-pointer ml-2 transition-all duration-200 ease-out
          hover:scale-105 hover:shadow-lg active:scale-95
          ${showProfileMenu ? "ring-2 ring-white/50" : ""}`}
        onClick={() => setShowProfileMenu(!showProfileMenu)}
      />

      {isClient && showProfileMenu && (
        <ProfileMenu
          isVisible={showProfileMenu}
          profileNavItem={{
            children:
              profileNavItem.children?.map((group) => ({
                ...group,
                title: group.title || "Menu",
              })) || [],
          }}
          navbarHeight={navbarHeight}
          onClose={() => setShowProfileMenu(false)}
        />
      )}
    </div>
  );
}
