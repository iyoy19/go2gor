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
  DropdownSection,
  DropdownItem,
  Button,
  Avatar,
  Badge,
} from "@heroui/react";
import * as Icons from "lucide-react";
import { siteConfig } from "@/config/site";
import { notifications } from "@/data/notifications";

const getIcon = (iconName: string, size = 20) => {
  const IconComponent = (Icons as any)[iconName];
  return IconComponent ? <IconComponent size={size} /> : null;
};

export default function DesktopNavbar() {
  const profileNavItem = siteConfig.navItems.find(
    (item) => item.key === "profile"
  );

  const renderDropdownContent = (items: any[]) => (
    <>
      {(items ?? []).map((group, groupIndex) => (
        <DropdownSection
          key={group.key ?? `group-${groupIndex}`}
          title={group.title}
          showDivider={groupIndex < (items?.length ?? 0) - 1}
        >
          {(group.items ?? []).map((sub: any, subIndex: number) => (
            <DropdownItem
              key={sub.key ?? `sub-${subIndex}`}
              href={sub.href}
              color={sub.color === "danger" ? "danger" : "default"}
              startContent={getIcon(sub.icon, 18)}
              description={sub.description}
              className="py-2 gap-2"
              textValue={sub.label}
            >
              {sub.label}
            </DropdownItem>
          ))}
        </DropdownSection>
      ))}
    </>
  );

  return (
    <Navbar
      className="hidden sm:flex bg-transparent"
      classNames={{
        wrapper: "max-w-screen-xl",
      }}
    >
      {/* Left: Logo */}
      <NavbarContent className="bg-transparent" justify="start">
        <NavbarBrand>
          <p className="font-bold text-inherit">{siteConfig.name}</p>
        </NavbarBrand>
      </NavbarContent>

      {/* Center: Navigation */}
      <NavbarContent className="hidden lg:flex gap-6" justify="center">
        {(siteConfig.navItems ?? [])
          .filter((item) => item.key !== "profile")
          .map((item, index) => (
            <NavbarItem key={item.key ?? `nav-${index}`}>
              {item.children ? (
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      disableRipple
                      className="p-0"
                      radius="sm"
                      variant="light"
                      endContent={getIcon("ChevronDown", 16)}
                    >
                      {item.label}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    variant="flat"
                    className="w-[260px]"
                    aria-label={`${item.label} menu`}
                  >
                    {renderDropdownContent(item.children ?? [])}
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <Link
                  color="foreground"
                  href={item.href}
                  className="data-[active=true]:text-primary"
                >
                  {item.label}
                </Link>
              )}
            </NavbarItem>
          ))}
      </NavbarContent>

      {/* Right: Notifications & Profile */}
      <NavbarContent className="bg-transparent" justify="end">
        {/* Notifications Dropdown */}
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button
              isIconOnly
              className="relative"
              variant="light"
              aria-label="Notifications"
            >
              <Badge
                color="danger"
                content={notifications.length}
                shape="circle"
              >
                {getIcon("Bell", 22)}
              </Badge>
            </Button>
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

        {/* Profile Dropdown */}
        {profileNavItem && (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
              className="w-[260px]"
            >
              {renderDropdownContent(profileNavItem?.children ?? [])}
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>
    </Navbar>
  );
}
