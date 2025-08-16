"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
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
import { Bell, ChevronDown, Copyright, LucideIcon } from "lucide-react";
import { siteConfig } from "@/config/site";
import { notifications } from "@/data/notifications";

//
// ==== TYPE DEFINITIONS ====
//
export type NavSubItem = {
  key: string;
  label: string;
  href: string;
  icon: React.ComponentType<any>;
  description?: string;
  color?:
    | "danger"
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning";
};

export interface NavGroup {
  key: string;
  title?: string;
  items?: NavSubItem[];
}

export interface NavItem {
  key: string;
  label: string;
  href?: string;
  icon?: LucideIcon;
  dropdown?: boolean;
  children?: NavGroup[];
}

//
const renderDropdownContent = (items: NavGroup[]) => (
  <>
    {items.map((group, groupIndex) => (
      <DropdownSection
        key={group.key ?? `group-${groupIndex}`}
        title={group.title}
        showDivider={groupIndex < items.length - 1}
        classNames={{
          heading: "text-black font-semibold",
          divider: "bg-black",
        }}
      >
        {group.items?.map((sub, subIndex) => (
          <DropdownItem
            key={sub.key ?? `sub-${subIndex}`}
            href={sub.href}
            color={sub.color ?? "default"}
            startContent={
              sub.icon ? React.createElement(sub.icon, { size: 18 }) : null
            }
            description={sub.description}
            textValue={sub.label}
            className="py-2 gap-2"
          >
            {sub.label}
          </DropdownItem>
        )) ?? null}
      </DropdownSection>
    ))}
  </>
);

//
// ==== COMPONENT ====
//
export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [expandedSections, setExpandedSections] = React.useState<
    Record<string, boolean>
  >({});
  const [currentYear, setCurrentYear] = React.useState(0);

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const profileNavItem = siteConfig.navItems.find(
    (item) => item.key === "profile"
  );

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      className="backdrop-blur-md bg-black/20 dark:bg-white/20"
      classNames={{
        wrapper: "max-w-screen-xl",
      }}
    >
      {/* Left: Mobile menu toggle / Desktop logo */}
      <NavbarContent justify="start">
        <div className="sm:hidden">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="text-white"
          />
        </div>
        <NavbarBrand className="hidden sm:flex">
          <Link href="/">
            <p className="font-bold text-xl text-white">{siteConfig.name}</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Center: Desktop nav links */}
      <NavbarContent className="hidden lg:flex gap-6" justify="center">
        {(siteConfig.navItems as NavItem[])
          .filter((item) => item.key !== "profile")
          .map((item) => (
            <NavbarItem key={item.key}>
              {item.children ? (
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      disableRipple
                      className="p-0 text-white"
                      radius="sm"
                      variant="light"
                      endContent={<ChevronDown size={16} />}
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
                  className="data-[active=true]:text-primary text-white"
                >
                  {item.label}
                </Link>
              )}
            </NavbarItem>
          ))}
      </NavbarContent>

      {/* Right: Notifications & Profile */}
      <NavbarContent justify="end" className="gap-2">
        {/* Notifications */}
        <Dropdown
          className="bg-white/80 backdrop-blur-md"
          placement="bottom-end"
        >
          <DropdownTrigger>
            <Button
              isIconOnly
              className="relative"
              variant="light"
              aria-label="Notifications"
            >
              {notifications.length > 0 ? (
                <Badge
                  color="danger"
                  content={notifications.length}
                  shape="circle"
                >
                  <Bell size={22} color="white" />
                </Badge>
              ) : (
                <Bell size={22} color="white" />
              )}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Notifications"
            variant="flat"
            className="text-black w-[340px]"
          >
            <DropdownSection
              title="Notifikasi"
              classNames={{ heading: "text-black/80", divider: "bg-black" }}
            >
              {notifications.map((notif) => (
                <DropdownItem
                  key={notif.key}
                  startContent={notif.icon ? <notif.icon size={20} /> : null}
                  description={
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-black">
                        {notif.description}
                      </span>
                      <span className="text-xs text-black ml-2">
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

        {/* Profile */}
        {profileNavItem && (
          <Dropdown
            className="bg-white/80 backdrop-blur-md border border-white/30"
            placement="bottom-end"
          >
            <DropdownTrigger>
              <Avatar
                as="button"
                aria-label="User menu"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="sm"
                className="cursor-pointer transition-transform hover:scale-105 ml-2"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem
                key="logged-in-as"
                isReadOnly
                className="opacity-100 cursor-default"
              >
                <div className="flex flex-col bg-black/10 rounded-lg p-2 text-left">
                  <p className="font-semibold">Logged in as</p>
                  <p className="font-semibold text-black">Zoey Adams</p>
                  <p className="text-xs text-black">zoey@example.com</p>
                </div>
              </DropdownItem>
              {renderDropdownContent(profileNavItem.children ?? [])}
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="gap-2 px-2 py-4 bg-black/10 backdrop-blur-lg">
        <div className="flex flex-col h-full">
          <div className="flex-grow space-y-2">
            {(siteConfig.navItems as NavItem[])
              .filter((item) => item.key !== "profile")
              .map((item) => (
                <React.Fragment key={item.key}>
                  {!item.dropdown ? (
                    <NavbarMenuItem>
                      <Link
                        href={item.href}
                        className="w-full flex items-center gap-2 px-3 py-2.5 text-white hover:bg-white/10 transition-colors rounded-md"
                      >
                        {item.icon ? <item.icon size={18} /> : null}
                        <span className="text-sm">{item.label}</span>
                      </Link>
                    </NavbarMenuItem>
                  ) : (
                    <div>
                      <NavbarMenuItem
                        className="bg-black/20 hover:bg-white/10 rounded-t-lg cursor-pointer"
                        onClick={() => toggleSection(item.key)}
                      >
                        <div className="w-full flex items-center justify-between px-3 py-2.5 text-white">
                          <div className="flex items-center gap-2">
                            {item.icon ? <item.icon size={18} /> : null}
                            <span className="text-sm">{item.label}</span>
                          </div>
                          <ChevronDown
                            size={18}
                            className={`transition-transform ${
                              expandedSections[item.key] ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                      </NavbarMenuItem>
                      {expandedSections[item.key] && (
                        <div className="bg-white/10 rounded-b-lg px-2 pb-2 space-y-2">
                          {item.children?.map((group) => (
                            <div key={group.key}>
                              {group.title && (
                                <div className="text-xs font-semibold text-white/60 px-3 py-1">
                                  {group.title}
                                </div>
                              )}
                              <div className="space-y-1">
                                {group.items?.map((sub) => (
                                  <NavbarMenuItem key={sub.key}>
                                    <Link
                                      href={sub.href}
                                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-black/30 rounded-md"
                                    >
                                      {sub.icon ? <sub.icon size={18} /> : null}
                                      <span>{sub.label}</span>
                                    </Link>
                                  </NavbarMenuItem>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </React.Fragment>
              ))}
          </div>

          {/* Footer */}
          <div className="mt-auto border-t border-divider pt-2">
            <div className="flex flex-col items-center gap-1 text-xs text-white/80">
              <div className="flex items-center gap-1">
                <Copyright size={14} />
                <span>
                  {currentYear} {siteConfig.name}
                </span>
              </div>
              <p className="text-center">Version 1.0.0 • All rights reserved</p>
            </div>
          </div>
        </div>
      </NavbarMenu>
    </Navbar>
  );
}
