"use client";

import React, { useEffect, useRef } from "react";
import {
  Navbar as NextUINavbar,
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
} from "@heroui/react";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "@/config/site";
import NotificationSystem from "./NotificationSystem";
import { NavGroup } from "@/types";
import ProfileAvatar from "./Profile/ProfileAvatar";
import { motion, AnimatePresence } from "framer-motion";

// Fungsi render dropdown desktop
const renderDropdownContent = (items: NavGroup[]) => (
  <>
    {items.map((group, groupIndex) => (
      <DropdownSection
        key={group.key ?? `group-${groupIndex}`}
        title={group.title}
        showDivider={groupIndex < items.length - 1}
        classNames={{
          heading: "text-gray-700 font-semibold px-3 py-2",
          divider: "bg-gray-200/50 h-px",
          group: "divide-y divide-gray-100/50 [&>*]:py-2",
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
            className="px-3 py-2.5 hover:bg-gray-100/50"
          >
            <span className="text-sm text-gray-800">{sub.label}</span>
          </DropdownItem>
        )) ?? null}
      </DropdownSection>
    ))}
  </>
);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [desktopDropdownKey, setDesktopDropdownKey] = React.useState<
    string | null
  >(null);
  const [mobileDropdownKey, setMobileDropdownKey] = React.useState<
    string | null
  >(null);
  const [navbarHeight, setNavbarHeight] = React.useState(64);
  const [isClient, setIsClient] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Set isClient & navbarHeight
  useEffect(() => {
    setIsClient(true);
    const navbar = document.querySelector('[data-slot="base"]') as HTMLElement;
    if (navbar) setNavbarHeight(navbar.offsetHeight);

    const handleResize = () => {
      if (navbar) setNavbarHeight(navbar.offsetHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock scroll saat dropdown desktop atau menu mobile terbuka
  useEffect(() => {
    document.body.style.overflow =
      desktopDropdownKey || isMenuOpen ? "hidden" : "";
  }, [desktopDropdownKey, isMenuOpen]);

  // Close desktop dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDesktopDropdownKey(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDesktopDropdown = (key: string) => {
    setDesktopDropdownKey((prev) => (prev === key ? null : key));
  };

  const toggleMobileDropdown = (key: string) => {
    setMobileDropdownKey((prev) => (prev === key ? null : key));
  };

  return (
    <div className="relative">
      <NextUINavbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={(open) => setIsMenuOpen(open)}
        shouldHideOnScroll={false}
        isBordered
        position="sticky"
        className="fixed top-0 left-0 right-0 z-[100] bg-black/40 backdrop-blur-sm border-b border-white/20"
        classNames={{
          wrapper: "max-w-screen-xl relative",
          base: "bg-transparent",
          toggleIcon: "touch-manipulation",
          menuItem: "hover:opacity-80",
        }}
      >
        {/* Left */}
        <NavbarContent justify="start" className="relative">
          <div className="sm:hidden relative z-[200]">
            <NavbarMenuToggle
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="text-white hover:bg-white/10 rounded-lg p-2 transition-all duration-200 ease-in-out transform active:scale-90"
            />
          </div>
          <NavbarBrand className="hidden sm:flex">
            <Link href="/">
              <p className="font-bold text-xl text-white drop-shadow-md">
                {siteConfig.name}
              </p>
            </Link>
          </NavbarBrand>
          <NavbarBrand className="flex sm:hidden absolute left-1/2 transform -translate-x-1/2">
            <Link href="/">
              <p className="font-bold text-xl text-white drop-shadow-md">
                {siteConfig.name}
              </p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {/* Center: Desktop nav */}
        <div className="hidden lg:flex gap-6" ref={dropdownRef}>
          <NavbarContent className="gap-6" justify="center">
            {siteConfig.navItems
              .filter(
                (item) =>
                  ![
                    "profile",
                    "aktivitas",
                    "riwayat",
                    "team",
                    "bantuan",
                  ].includes(item.key)
              )
              .map((item) => (
                <NavbarItem key={item.key}>
                  {item.children ? (
                    <Dropdown isOpen={desktopDropdownKey === item.key}>
                      <DropdownTrigger>
                        <Button
                          disableRipple
                          onClick={() => toggleDesktopDropdown(item.key)}
                          className="p-0 text-white drop-shadow-sm hover:text-white/90"
                          radius="sm"
                          variant="light"
                          endContent={<ChevronDown size={16} />}
                        >
                          {item.label}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        variant="flat"
                        className="w-[260px] bg-white/95 backdrop-blur-xl shadow-xl border border-white/30"
                      >
                        {renderDropdownContent(item.children ?? [])}
                      </DropdownMenu>
                    </Dropdown>
                  ) : (
                    <Link
                      href={(item as any).href}
                      className="text-white drop-shadow-sm hover:text-white/90 transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  )}
                </NavbarItem>
              ))}
          </NavbarContent>
        </div>

        {/* Right */}
        <NavbarContent justify="end" className="gap-2">
          {isClient && (
            <>
              <NotificationSystem />
              <ProfileAvatar navbarHeight={navbarHeight} />
            </>
          )}
        </NavbarContent>

        {/* ✅ Mobile Menu (tetap di dalam NextUINavbar + animasi) */}
        <NavbarMenu
          className="fixed inset-x-0 top-[64px] bottom-0 z-[150] px-2 py-4 
                     bg-black/50 backdrop-blur-sm overflow-y-auto"
        >
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                key="mobileMenuContent"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="space-y-2"
              >
                {siteConfig.navItems
                  .filter((item) => item.key !== "profile")
                  .map((item) => (
                    <React.Fragment key={item.key}>
                      {!item.children ? (
                        <NavbarMenuItem role="menuitem">
                          <Link
                            href={(item as any).href}
                            className="w-full flex items-center gap-2 px-3 py-2.5 text-white drop-shadow-sm hover:bg-white/10 transition-colors rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.icon ? <item.icon size={18} /> : null}
                            <span className="text-sm">{item.label}</span>
                          </Link>
                        </NavbarMenuItem>
                      ) : (
                        <div className="mb-2">
                          <NavbarMenuItem
                            role="button"
                            aria-expanded={mobileDropdownKey === item.key}
                            className="bg-white/10 hover:bg-white/15 rounded-t-lg cursor-pointer transition-all duration-200 ease-in-out"
                            onClick={() => toggleMobileDropdown(item.key)}
                          >
                            <div className="w-full flex items-center justify-between px-3 py-2.5 text-white drop-shadow-sm">
                              <div className="flex items-center gap-2">
                                {item.icon ? <item.icon size={18} /> : null}
                                <span className="text-sm">{item.label}</span>
                              </div>
                              <ChevronDown
                                size={18}
                                className={`transition-transform duration-300 ease-in-out ${
                                  mobileDropdownKey === item.key
                                    ? "rotate-180"
                                    : "rotate-0"
                                }`}
                              />
                            </div>
                          </NavbarMenuItem>
                          {mobileDropdownKey === item.key && (
                            <div className="pl-6 pr-3 py-2 space-y-2 bg-white/5 rounded-b-lg">
                              {item.children?.map((group) =>
                                group.items?.map((sub) => (
                                  <Link
                                    key={sub.key}
                                    href={sub.href}
                                    className="flex items-center gap-2 text-sm text-white hover:underline"
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    {sub.icon ? <sub.icon size={16} /> : null}
                                    {sub.label}
                                  </Link>
                                ))
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </React.Fragment>
                  ))}
              </motion.div>
            )}
          </AnimatePresence>
        </NavbarMenu>
      </NextUINavbar>
    </div>
  );
}
