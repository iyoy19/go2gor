"use client";

import React from "react";
import {
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  NavbarBrand,
  Avatar,
  Button,
  Badge,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@heroui/react";
import * as Icons from "lucide-react";
import { siteConfig } from "@/config/site";

const getIcon = (name: string, size = 18) => {
  const IconComponent = (Icons as any)[name];
  return IconComponent ? <IconComponent size={size} /> : null;
};

export default function MobileNavbar({ isMenuOpen }: { isMenuOpen: boolean }) {
  const [expandedSections, setExpandedSections] = React.useState<{
    [key: string]: boolean;
  }>({});
  const [currentYear, setCurrentYear] = React.useState(0); // Added for dehydration fix

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
    <>
      {/* Toggle menu di kiri */}
      <NavbarContent className="sm:hidden px-2" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="text-black"
        />
      </NavbarContent>

      {/* Logo di tengah */}
      <NavbarContent className="sm:hidden px-2" justify="center">
        <NavbarBrand>
          <Link href="/">
            <p className="font-bold text-xl text-black">{siteConfig.name}</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Notifikasi & Avatar di kanan */}
      <NavbarContent className="sm:hidden px-2" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              as="button"
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
              <div className="flex flex-col">
                <p className="font-semibold">Logged in as</p>
                <p className="font-semibold text-default-500">Zoey Adams</p>
                <p className="text-xs text-default-400">zoey@example.com</p>
              </div>
            </DropdownItem>
            <React.Fragment>
              {(profileNavItem?.children || []).map((group, groupIndex) => (
                <DropdownSection
                  key={group.key}
                  title={group.title}
                  showDivider={
                    groupIndex < (profileNavItem?.children?.length || 0) - 1
                  }
                >
                  {(group.items || []).map((item) => (
                    <DropdownItem
                      key={item.key}
                      href={item.href}
                      color={item.color === "danger" ? "danger" : "default"}
                      startContent={getIcon(item.icon, 18)}
                    >
                      {item.label}
                    </DropdownItem>
                  ))}
                </DropdownSection>
              ))}
            </React.Fragment>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarMenu className="gap-2 px-2 py-4">
        <div className="flex flex-col h-full">
          {/* Menu utama */}
          <div className="flex-grow space-y-2">
            {siteConfig.navItems
              .filter((item) => item.key !== "profile")
              .map((item) => (
                <React.Fragment key={item.key}>
                  {!item.dropdown ? (
                    <NavbarMenuItem className="overflow-hidden rounded-md">
                      <Link
                        href={item.href}
                        className="w-full flex items-center gap-2 px-3 py-2.5 text-black hover:text-primary hover:bg-primary-50 transition-colors rounded-md"
                      >
                        {getIcon(item.icon, 18)}
                        <span className="text-sm">{item.label}</span>
                      </Link>
                    </NavbarMenuItem>
                  ) : (
                    <div
                      className={expandedSections[item.key] ? "mb-1" : "mb-1"}
                    >
                      {/* Header dropdown */}
                      <NavbarMenuItem
                        className="bg-default-100 rounded-t-lg cursor-pointer overflow-hidden"
                        onClick={() => toggleSection(item.key)}
                      >
                        <div className="w-full flex items-center justify-between px-3 py-2.5 text-default-700">
                          <div className="flex items-center gap-2">
                            {getIcon(item.icon, 18)}
                            <span className="text-sm">{item.label}</span>
                          </div>
                          <Icons.ChevronDown
                            size={18}
                            className={`transition-transform ${
                              expandedSections[item.key] ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                      </NavbarMenuItem>

                      {/* Dropdown content */}
                      {expandedSections[item.key] && (
                        <div className="bg-default-50 rounded-b-lg px-2 pb-2 space-y-2">
                          {item.children?.map((group) => (
                            <div key={group.key}>
                              {group.title && (
                                <div className="text-xs font-semibold text-default-500 px-3 py-1">
                                  {group.title}
                                </div>
                              )}
                              <div className="space-y-1">
                                {group.items?.map((sub) => (
                                  <NavbarMenuItem
                                    key={sub.key}
                                    className="overflow-hidden rounded-md ring-1 ring-default-200"
                                  >
                                    <Link
                                      href={sub.href}
                                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                                        sub.color === "danger"
                                          ? "text-danger hover:text-danger hover:bg-danger-50"
                                          : "text-default-600 hover:text-primary hover:bg-primary-50"
                                      }`}
                                    >
                                      {getIcon(sub.icon, 18)}
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
          <div className="mt-auto pt-4 border-t border-divider">
            <div className="flex flex-col items-center gap-1 text-xs text-default-400">
              <div className="flex items-center gap-1">
                <Icons.Copyright size={14} />
                <span>
                  {currentYear} {siteConfig.name}
                </span>
              </div>
              <p className="text-center">Version 1.0.0 • All rights reserved</p>
            </div>
          </div>
        </div>
      </NavbarMenu>
    </>
  );
}
