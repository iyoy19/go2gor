"use client";

import React from "react";
import {
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
  Avatar,
  Badge,
} from "@heroui/react";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import NotificationIcon from "./NotificationIcon";
import { siteConfig } from "@/config/site";

const getIcon = (name: string, size = 18) => {
  const IconComponent = (Icons as any)[name];
  return IconComponent ? <IconComponent size={size} /> : null;
};

const renderDropdownContent = (items: any[]) => {
  return items.map((group) => (
    <DropdownSection key={group.key}>
      {group.title && (
        <DropdownItem
          key={group.title}
          isReadOnly
          className="text-sm font-semibold text-default-500"
          textValue={group.title}
        >
          {group.title}
        </DropdownItem>
      )}
      {group.items?.map((sub: any) => (
        <DropdownItem
          key={sub.key}
          startContent={getIcon(sub.icon, 18)}
          href={sub.href}
          description={sub.description}
          className="py-2 gap-2"
          color={sub.color}
          textValue={sub.label}
        >
          {sub.label}
        </DropdownItem>
      ))}
    </DropdownSection>
  ));
};

export default function DesktopNavbar() {
  return (
    <nav className="hidden sm:flex w-full">
      <div className="max-w-screen-xl mx-auto w-full flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center">
          <NavbarBrand>
            <p className="font-bold text-xl text-primary">{siteConfig.name}</p>
          </NavbarBrand>
        </div>

        {/* Menu Tengah */}
        <div className="flex items-center gap-3">
          {siteConfig.navItems
            .filter((item) => item.key !== "profile")
            .map((item) =>
              !item.dropdown ? (
                <NavbarItem key={item.key}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 text-default-600 hover:text-primary hover:bg-primary-50 transition-colors rounded-md px-3 py-2"
                  >
                    {getIcon(item.icon, 18)}
                    {item.label}
                  </Link>
                </NavbarItem>
              ) : (
                <Dropdown key={item.key}>
                  <DropdownTrigger>
                    <Button
                      variant="light"
                      className="flex items-center gap-2 text-default-600 hover:text-primary hover:bg-primary-50 transition-colors p-0 rounded-md px-3 py-2"
                      endContent={<Icons.ChevronDown size={16} />}
                    >
                      {getIcon(item.icon, 18)}
                      {item.label}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    variant="flat"
                    className="w-[260px]"
                    aria-label={`${item.label} menu`}
                  >
                    {renderDropdownContent(item.children || [])}
                  </DropdownMenu>
                </Dropdown>
              )
            )}
        </div>

        {/* Notifikasi & Avatar */}
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Badge color="danger" content="99+" shape="circle">
              <Button
                isIconOnly
                aria-label="more than 99 notifications"
                radius="full"
                variant="light"
                className="shadow-md hover:shadow-lg transition-shadow duration-300 p-0"
              >
                <NotificationIcon size={24} />
              </Button>
            </Badge>
          </motion.div>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="sm"
                className="cursor-pointer transition-transform hover:scale-105"
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
              className="w-[260px]"
            >
              {renderDropdownContent([
                {
                  key: "profile-section",
                  items: [
                    {
                      key: "profile-header",
                      label: "Zoey Adams",
                      icon: "User",
                      description: "zoey@example.com",
                    },
                    {
                      key: "my-profile",
                      label: "Profil Saya",
                      icon: "UserCircle",
                      href: "/profile",
                    },
                    {
                      key: "account-settings",
                      label: "Pengaturan Akun",
                      icon: "Settings2",
                      href: "/account/settings",
                    },
                  ],
                },
              ])}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
}
