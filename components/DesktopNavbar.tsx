"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Button,
  Avatar,
} from "@heroui/react";
import * as Icons from "lucide-react";
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
    <>
      <NavbarContent className="hidden sm:flex basis-1/5 pl-2" justify="start">
        <NavbarBrand className="flex-grow-0">
          <p className="font-bold text-xl text-primary">{siteConfig.name}</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-3/5" justify="center">
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
      </NavbarContent>

      <NavbarContent className="basis-1/5 pr-2" justify="end">
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
            <DropdownSection showDivider>
              <DropdownItem
                key="profile-header"
                className="h-14 gap-2"
                textValue="Profile Header"
                startContent={getIcon("User", 18)}
              >
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">Zoey Adams</span>
                  <span className="text-xs text-default-500">
                    zoey@example.com
                  </span>
                </div>
              </DropdownItem>
            </DropdownSection>

            <DropdownSection showDivider>
              <DropdownItem
                key="my-profile"
                startContent={getIcon("UserCircle", 18)}
                href="/profile"
                className="py-2"
              >
                Profil Saya
              </DropdownItem>
              <DropdownItem
                key="account-settings"
                startContent={getIcon("Settings2", 18)}
                href="/account/settings"
                className="py-2"
              >
                Pengaturan Akun
              </DropdownItem>
              <DropdownItem
                key="notifications"
                startContent={getIcon("Bell", 18)}
                href="/notifications/preferences"
                className="py-2"
              >
                Preferensi Notifikasi
              </DropdownItem>
            </DropdownSection>

            <DropdownSection showDivider>
              <DropdownItem
                key="booking-history"
                startContent={getIcon("ClipboardList", 18)}
                href="/bookings/history"
                className="py-2"
              >
                Riwayat Booking
              </DropdownItem>
              <DropdownItem
                key="my-schedule"
                startContent={getIcon("Calendar", 18)}
                href="/schedule"
                className="py-2"
              >
                Jadwal Saya
              </DropdownItem>
              <DropdownItem
                key="activity-history"
                startContent={getIcon("Activity", 18)}
                href="/activity"
                className="py-2"
              >
                Aktivitas & Riwayat
              </DropdownItem>
            </DropdownSection>

            <DropdownSection showDivider>
              <DropdownItem
                key="my-teams"
                startContent={getIcon("Users", 18)}
                href="/teams"
                className="py-2"
              >
                Tim Saya
              </DropdownItem>
            </DropdownSection>

            <DropdownSection>
              <DropdownItem
                key="help-center"
                startContent={getIcon("HelpCircle", 18)}
                href="/help"
                className="py-2"
              >
                Pusat Bantuan
              </DropdownItem>
              <DropdownItem
                key="logout"
                startContent={getIcon("LogOut", 18)}
                href="/logout"
                color="danger"
                className="text-danger py-2"
              >
                Logout
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </>
  );
}
