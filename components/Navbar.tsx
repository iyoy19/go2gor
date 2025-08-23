"use client";

import React, { useEffect, useRef, useCallback, useMemo } from "react";
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

// Render dropdown items as flat array instead of nested structure
const renderDropdownItems = (items: NavGroup[]) => {
  if (!items || items.length === 0) return [];

  const dropdownItems: React.ReactElement[] = [];

  items.forEach((group, groupIndex) => {
    const groupKey = group.key || `group-${groupIndex}`;

    // Add group header if it has a title
    if (group.title) {
      dropdownItems.push(
        <DropdownItem
          key={`${groupKey}-header`}
          textValue={group.title}
          isDisabled
          className="opacity-50 pointer-events-none px-4 py-2 text-xs font-semibold uppercase tracking-wider"
        >
          {group.title}
        </DropdownItem>
      );
    }

    // Add group items
    if (group.items && group.items.length > 0) {
      group.items.forEach((sub, subIndex) => {
        const subKey = sub.key || `${groupKey}-sub-${subIndex}`;

        dropdownItems.push(
          <DropdownItem
            key={subKey}
            href={sub.href}
            color={sub.color ?? "default"}
            startContent={
              sub.icon ? (
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100/50 text-gray-600">
                  {React.createElement(sub.icon, { size: 16 })}
                </div>
              ) : undefined
            }
            description={sub.description}
            textValue={sub.label}
            className="px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 
                     transition-all duration-200 ease-out group"
          >
            <div className="flex flex-col">
              <span
                className="text-sm font-medium text-gray-800 group-hover:text-blue-700 
                         transition-colors duration-200"
              >
                {sub.label}
              </span>
              {sub.description && (
                <span
                  className="text-xs text-gray-500 mt-0.5 group-hover:text-blue-600 
                           transition-colors duration-200"
                >
                  {sub.description}
                </span>
              )}
            </div>
          </DropdownItem>
        );
      });
    }

    // Add divider between groups (except for last group)
    if (
      groupIndex < items.length - 1 &&
      group.items &&
      group.items.length > 0
    ) {
      dropdownItems.push(
        <DropdownItem
          key={`${groupKey}-divider`}
          textValue="divider"
          isDisabled
          className="h-px bg-gray-200 mx-2 my-1 pointer-events-none"
        >
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </DropdownItem>
      );
    }
  });

  return dropdownItems;
};

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
  const [isScrolled, setIsScrolled] = React.useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Memoize filtered nav items
  const desktopNavItems = useMemo(
    () =>
      siteConfig.navItems.filter(
        (item) =>
          !["profile", "aktivitas", "riwayat", "team", "bantuan"].includes(
            item.key
          )
      ),
    []
  );

  const mobileNavItems = useMemo(
    () => siteConfig.navItems.filter((item) => item.key !== "profile"),
    []
  );

  // Optimized scroll handler
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 20);
  }, []);

  // Setup effects
  useEffect(() => {
    setIsClient(true);

    const navbar = document.querySelector('[data-slot="base"]') as HTMLElement;
    if (navbar) setNavbarHeight(navbar.offsetHeight);

    const handleResize = () => {
      if (navbar) setNavbarHeight(navbar.offsetHeight);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow =
      desktopDropdownKey || isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [desktopDropdownKey, isMenuOpen]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDesktopDropdownKey(null);
      }
    };

    if (desktopDropdownKey) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [desktopDropdownKey]);

  // Event handlers
  const toggleDesktopDropdown = useCallback((key: string) => {
    setDesktopDropdownKey((prev) => (prev === key ? null : key));
  }, []);

  const toggleMobileDropdown = useCallback((key: string) => {
    setMobileDropdownKey((prev) => (prev === key ? null : key));
  }, []);

  const handleMenuToggle = useCallback((open: boolean) => {
    setIsMenuOpen(open);
    if (!open) setMobileDropdownKey(null);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMenuOpen(false);
    setMobileDropdownKey(null);
  }, []);

  return (
    <div className="relative">
      <NextUINavbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={handleMenuToggle}
        shouldHideOnScroll={false}
        isBordered
        position="sticky"
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-out
          ${
            isScrolled
              ? "bg-black/60 backdrop-blur-md border-b border-white/30 shadow-lg shadow-black/10"
              : "bg-black/30 backdrop-blur-sm border-b border-white/20"
          }`}
        classNames={{
          wrapper: "max-w-screen-xl relative px-4 sm:px-6",
          base: "bg-transparent",
          toggleIcon: "touch-manipulation",
          menuItem: "hover:opacity-80",
        }}
      >
        {/* Left Section */}
        <NavbarContent justify="start" className="relative">
          <div className="sm:hidden relative z-[200]">
            <NavbarMenuToggle
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="text-white hover:bg-white/20 rounded-xl p-2.5 transition-all 
                       duration-300 ease-out transform active:scale-90 hover:scale-105"
            />
          </div>

          <NavbarBrand className="hidden sm:flex">
            <Link href="/" className="group">
              <motion.p
                className="font-bold text-xl text-white drop-shadow-lg group-hover:drop-shadow-xl 
                         transition-all duration-300 group-hover:scale-105"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {siteConfig.name}
              </motion.p>
            </Link>
          </NavbarBrand>

          <NavbarBrand className="flex sm:hidden absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="group">
              <motion.p
                className="font-bold text-xl text-white drop-shadow-lg group-hover:drop-shadow-xl 
                         transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {siteConfig.name}
              </motion.p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {/* Center: Desktop Navigation */}
        <div className="hidden lg:flex gap-8" ref={dropdownRef}>
          <NavbarContent className="gap-8" justify="center">
            {desktopNavItems.map((item) => (
              <NavbarItem key={item.key}>
                {item.children && item.children.length > 0 ? (
                  <Dropdown
                    isOpen={desktopDropdownKey === item.key}
                    placement="bottom"
                    offset={10}
                    closeOnSelect={true}
                    onOpenChange={(isOpen) => {
                      if (!isOpen) {
                        setDesktopDropdownKey(null);
                      }
                    }}
                  >
                    <DropdownTrigger>
                      <Button
                        disableRipple
                        onClick={() => toggleDesktopDropdown(item.key)}
                        className="p-0 text-white/90 hover:text-white font-medium 
                                 transition-all duration-300 ease-out hover:scale-105 
                                 drop-shadow-sm hover:drop-shadow-md group"
                        radius="sm"
                        variant="light"
                        endContent={
                          <motion.div
                            animate={{
                              rotate: desktopDropdownKey === item.key ? 180 : 0,
                            }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                          >
                            <ChevronDown
                              size={16}
                              className="text-white/70 group-hover:text-white/90 transition-colors duration-200"
                            />
                          </motion.div>
                        }
                      >
                        {item.label}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      variant="flat"
                      aria-label={`${item.label} menu`}
                      className="w-80 bg-white/98 backdrop-blur-xl shadow-2xl border border-white/40 
                               rounded-2xl overflow-hidden"
                    >
                      {renderDropdownItems(item.children)}
                    </DropdownMenu>
                  </Dropdown>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={(item as any).href}
                      className="text-white/90 hover:text-white font-medium drop-shadow-sm 
                               hover:drop-shadow-md transition-all duration-300 ease-out 
                               px-3 py-2 rounded-lg hover:bg-white/10"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                )}
              </NavbarItem>
            ))}
          </NavbarContent>
        </div>

        {/* Right Section */}
        <NavbarContent justify="end" className="gap-3">
          {isClient && (
            <>
              <NotificationSystem />
              <ProfileAvatar navbarHeight={navbarHeight} />
            </>
          )}
        </NavbarContent>

        {/* Mobile Menu */}
        <NavbarMenu
          className="fixed inset-x-0 top-[64px] bottom-0 z-[150] px-4 py-6 
                   bg-black/70 backdrop-blur-lg overflow-y-auto"
        >
          <AnimatePresence mode="wait">
            {isMenuOpen && (
              <motion.div
                key="mobileMenuContent"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="space-y-3"
              >
                {mobileNavItems.map((item, index) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    {!item.children || item.children.length === 0 ? (
                      <NavbarMenuItem role="menuitem">
                        <Link
                          href={(item as any).href}
                          className="w-full flex items-center gap-3 px-4 py-3.5 text-white/90 
                                   hover:text-white hover:bg-white/15 transition-all duration-300 
                                   rounded-xl group backdrop-blur-sm border border-white/10 
                                   hover:border-white/20 hover:shadow-lg hover:shadow-black/10"
                          onClick={closeMobileMenu}
                        >
                          {item.icon && (
                            <div
                              className="flex items-center justify-center w-8 h-8 rounded-lg 
                                          bg-white/10 text-white/80 group-hover:bg-white/20 
                                          group-hover:text-white transition-all duration-300"
                            >
                              <item.icon size={16} />
                            </div>
                          )}
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      </NavbarMenuItem>
                    ) : (
                      <div className="mb-3">
                        <NavbarMenuItem
                          role="button"
                          aria-expanded={mobileDropdownKey === item.key}
                          className="bg-white/10 hover:bg-white/20 rounded-t-xl cursor-pointer 
                                   transition-all duration-300 ease-out backdrop-blur-sm 
                                   border border-white/20 hover:border-white/30"
                          onClick={() => toggleMobileDropdown(item.key)}
                        >
                          <div
                            className="w-full flex items-center justify-between px-4 py-3.5 
                                        text-white/90 hover:text-white group"
                          >
                            <div className="flex items-center gap-3">
                              {item.icon && (
                                <div
                                  className="flex items-center justify-center w-8 h-8 rounded-lg 
                                              bg-white/10 text-white/80 group-hover:bg-white/20 
                                              group-hover:text-white transition-all duration-300"
                                >
                                  <item.icon size={16} />
                                </div>
                              )}
                              <span className="font-medium">{item.label}</span>
                            </div>
                            <motion.div
                              animate={{
                                rotate:
                                  mobileDropdownKey === item.key ? 180 : 0,
                              }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                            >
                              <ChevronDown
                                size={18}
                                className="text-white/70 group-hover:text-white/90 transition-colors duration-200"
                              />
                            </motion.div>
                          </div>
                        </NavbarMenuItem>

                        <AnimatePresence>
                          {mobileDropdownKey === item.key && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden bg-white/5 backdrop-blur-sm border-x 
                                       border-b border-white/20 rounded-b-xl"
                            >
                              <div className="px-6 py-4 space-y-3">
                                {item.children?.map((group) =>
                                  group.items?.map((sub, subIndex) => {
                                    const subKey =
                                      sub.key ||
                                      `${group.key || "group"}-${subIndex}`;
                                    return (
                                      <motion.div
                                        key={subKey}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: subIndex * 0.05 }}
                                      >
                                        <Link
                                          href={sub.href}
                                          className="flex items-center gap-3 text-sm text-white/80 
                                                   hover:text-white hover:bg-white/10 px-3 py-2.5 
                                                   rounded-lg transition-all duration-200 group"
                                          onClick={closeMobileMenu}
                                        >
                                          {sub.icon && (
                                            <div
                                              className="flex items-center justify-center w-6 h-6 
                                                          rounded-md bg-white/10 text-white/70 
                                                          group-hover:bg-white/20 group-hover:text-white 
                                                          transition-all duration-200"
                                            >
                                              <sub.icon size={14} />
                                            </div>
                                          )}
                                          <div className="flex flex-col">
                                            <span className="font-medium">
                                              {sub.label}
                                            </span>
                                            {sub.description && (
                                              <span className="text-xs text-white/60 mt-0.5">
                                                {sub.description}
                                              </span>
                                            )}
                                          </div>
                                        </Link>
                                      </motion.div>
                                    );
                                  })
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </NavbarMenu>
      </NextUINavbar>
    </div>
  );
}
