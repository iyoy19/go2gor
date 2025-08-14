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
import * as Icons from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";

const iconMap: { [key: string]: string } = {
  Home: "HomeIcon",
  Trophy: "TrophyIcon",
  CalendarDays: "CalendarDaysIcon",
  CalendarPlus: "CalendarIcon",
  Users: "UsersIcon",
  Building2: "BuildingOffice2Icon",
  Settings: "Cog6ToothIcon",
  MessageCircle: "ChatBubbleOvalLeftEllipsisIcon",
  Calendar: "CalendarIcon",
  Image: "PhotoIcon",
  User: "UserIcon",
  UserCircle: "UserCircleIcon",
  Settings2: "Cog8ToothIcon",
  Bell: "BellIcon",
  ClipboardList: "ClipboardDocumentListIcon",
  Activity: "ChartBarIcon",
  HelpCircle: "QuestionMarkCircleIcon",
  LogOut: "ArrowLeftOnRectangleIcon",
  ChevronDown: "ChevronDownIcon",
  CalendarCheck: "CalendarDaysIcon",
  PartyPopper: "SparklesIcon",
  CreditCard: "CreditCardIcon",
};

const getIcon = (name: string, size = 18) => {
  const heroiconName = iconMap[name] || name;
  const IconComponent = (Icons as any)[heroiconName];
  return IconComponent ? (
    <IconComponent style={{ width: size, height: size }} />
  ) : null;
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

import { notifications } from "@/data/notifications";

const profileNavItem = siteConfig.navItems.find(
  (item) => item.key === "profile"
);

export default function DesktopNavbar() {
  return (
    <nav className="hidden sm:flex w-full">
      <div className="max-w-screen-xl mx-auto w-full flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center">
          <NavbarBrand>
            <p className="font-bold text-xl text-black">{siteConfig.name}</p>
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
                    className="flex items-center gap-2 text-black hover:text-primary hover:bg-primary-50 transition-colors rounded-md px-3 py-2"
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
                      className="flex items-center gap-2 text-black hover:text-primary hover:bg-primary-50 transition-colors p-0 rounded-md px-3 py-2"
                      endContent={getIcon("ChevronDown", 16)}
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
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center justify-center w-9 h-9 cursor-pointer rounded-full border border-default-300"
              >
                <Badge
                  color="danger"
                  content=""
                  shape="circle"
                  className="absolute -top-1 -left-1"
                >
                  <div className="text-black">{getIcon("Bell", 24)}</div>
                </Badge>
              </motion.div>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Notifications"
              variant="flat"
              className="w-[340px]"
            >
              <DropdownSection title="Notifikasi">
                {notifications.map((notif) => (
                  <DropdownItem
                    key={notif.key}
                    startContent={getIcon(notif.icon, 20)}
                    description={
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{notif.description}</span>
                        <span className="text-xs text-default-400 ml-2">
                          {notif.time}
                        </span>
                      </div>
                    }
                    textValue={notif.title}
                  >
                    <span className="font-semibold">{notif.title}</span>
                  </DropdownItem>
                ))}
              </DropdownSection>
              <DropdownSection>
                <DropdownItem key="view-all-notifications">
                  <Button
                    size="sm"
                    variant="light"
                    className="w-full text-primary"
                  >
                    Lihat Semua Notifikasi
                  </Button>
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>

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
              <DropdownItem
                key="logged-in-as"
                isReadOnly
                className="opacity-100 cursor-default"
              >
                <div className="flex flex-col">
                  <p className="font-semibold text-default-500">Zoey Adams</p>
                  <p className="text-xs text-default-400">zoey@example.com</p>
                </div>
              </DropdownItem>

              {profileNavItem?.children?.map((group, groupIndex) => (
                <DropdownSection
                  key={group.key}
                  title={group.title}
                  showDivider={
                    groupIndex < (profileNavItem.children?.length || 0) - 1
                  }
                >
                  {group.items && group.items.length > 0
                    ? group.items.map((item) => (
                        <DropdownItem
                          key={item.key}
                          href={item.href}
                          color={item.color === "danger" ? "danger" : "default"}
                          startContent={getIcon(item.icon, 18)}
                          description={item.description}
                          className="py-2 gap-2"
                          textValue={item.label}
                        >
                          {item.label}
                        </DropdownItem>
                      ))
                    : null}
                </DropdownSection>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
}
