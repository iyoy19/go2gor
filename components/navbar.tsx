"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";

import {
  LucideIcon,
  Home,
  MapPin,
  Clock,
  Calendar,
  Users,
  MessageCircle,
  Phone,
  Info,
  LogIn,
  CalendarClock,
  Rotate3d,
  Moon,
  Sun,
} from "lucide-react";

import { Button } from "@heroui/button";
import { Link as HeroUILink } from "@heroui/link";
import NextLink from "next/link";
import { siteConfig } from "@/config/site";
import { rubikDirt } from "@/config/fonts";
import { useState, useEffect } from "react";
import clsx from "clsx";

const icons: Record<string, LucideIcon> = {
  home: Home,
  "map-pin": MapPin,
  clock: Clock,
  calendar: Calendar,
  users: Users,
  "message-circle": MessageCircle,
  phone: Phone,
  info: Info,
  "log-in": LogIn,
  "calendar-clock": CalendarClock,
};

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {}
  );
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Detect prefers-color-scheme on load
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  // Scroll handler untuk efek bg navbar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  };

  const navbarClass = clsx(
    "fixed top-0 z-50 w-full transition-all duration-300 backdrop-blur-md",
    scrolled ? "bg-white/10 dark:bg-black/10 shadow-sm" : "bg-transparent"
  );

  return (
    <HeroUINavbar
      maxWidth="full"
      isMenuOpen={menuOpen}
      onMenuOpenChange={setMenuOpen}
      className={clsx(
        navbarClass,
        "relative px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20"
      )}
      style={{ maxWidth: "100vw", overflowX: "hidden" }}
    >
      {/* Logo kiri desktop & tablet */}
      <NavbarContent className="hidden sm:flex md:flex lg:flex" justify="start">
        <NavbarBrand
          as="li"
          className="gap-3 max-w-fit flex items-center min-w-0"
        >
          <NextLink href="/" className="flex items-center gap-2 min-w-0">
            <Rotate3d
              size={28}
              className="text-yellow-300 drop-shadow-md flex-shrink-0"
            />
            <h1
              className={clsx(
                `text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight leading-none truncate ${rubikDirt.className}`,
                "dark:text-white"
              )}
              style={{ whiteSpace: "nowrap" }}
            >
              <span className="text-yellow-400 drop-shadow-md">Go</span>
              <span className="text-black dark:text-white drop-shadow-md">
                2
              </span>
              <span className="text-indigo-500 drop-shadow-md">Gor</span>
            </h1>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Logo kiri mobile */}
      <NavbarContent
        className="sm:hidden flex flex-nowrap"
        justify="start"
        style={{ gap: "0.5rem" }}
      >
        <NavbarBrand
          as="li"
          className="max-w-[60vw] flex-shrink-0 flex items-center gap-2 overflow-hidden"
        >
          <NextLink
            href="/"
            className="flex items-center gap-2 truncate min-w-0"
          >
            <Rotate3d
              size={28}
              className="text-yellow-300 drop-shadow-md flex-shrink-0"
            />
            <h1
              className={clsx(
                "text-xl font-extrabold tracking-tight leading-none truncate",
                rubikDirt.className,
                "dark:text-white"
              )}
              style={{ whiteSpace: "nowrap" }}
            >
              <span className="text-yellow-400 drop-shadow-md">Go</span>
              <span className="text-black dark:text-white drop-shadow-md">
                2
              </span>
              <span className="text-indigo-500 drop-shadow-md">Gor</span>
            </h1>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Navigasi tengah desktop lg ke atas */}
      <NavbarContent className="hidden lg:flex" justify="center">
        {siteConfig.navItems.map((item) => {
          const Icon = item.icon ? icons[item.icon] : null;

          if (item.dropdown && item.children?.length) {
            return (
              <Dropdown key={item.label}>
                <DropdownTrigger>
                  <Button
                    variant="light"
                    className="font-medium text-black dark:text-white hover:text-primary"
                    startContent={Icon ? <Icon className="w-4 h-4" /> : null}
                    size="md"
                  >
                    {item.label}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  {item.children.map((child) => {
                    const ChildIcon = child.icon ? icons[child.icon] : null;
                    return (
                      <DropdownItem
                        key={child.href}
                        as={NextLink}
                        href={child.href}
                        startContent={
                          ChildIcon ? <ChildIcon className="w-4 h-4" /> : null
                        }
                        className="dark:text-white"
                      >
                        {child.label}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </Dropdown>
            );
          }

          return (
            <NavbarItem key={item.href}>
              <NextLink
                href={item.href!}
                className="flex items-center gap-2 text-black dark:text-white transition-colors text-base hover:text-primary"
              >
                {Icon && <Icon className="w-4 h-4" />}
                {item.label}
              </NextLink>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      {/* Tombol Dark Mode + Login desktop/tablet */}
      <NavbarContent
        className="hidden sm:flex items-center gap-4 flex-1 pr-0"
        justify="end"
      >
        <NavbarItem>
          <Button
            variant="flat"
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
            className="text-black dark:text-white hover:text-primary"
            size="md"
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
        </NavbarItem>

        <NavbarItem>
          <Button
            as={HeroUILink}
            href="/login"
            variant="flat"
            className="text-black dark:text-white hover:text-primary"
            size="md"
          >
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Tombol Dark Mode + Toggle menu mobile */}
      <NavbarContent
        className="sm:hidden flex flex-nowrap basis-auto items-center gap-3 pr-3"
        justify="end"
      >
        <Button
          variant="flat"
          onClick={toggleDarkMode}
          aria-label="Toggle Dark Mode"
          className="text-black dark:text-white hover:text-primary"
          size="sm"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>

        <NavbarMenuToggle onClick={() => setMenuOpen(!menuOpen)} />
      </NavbarContent>

      {/* Mobile menu */}
      <NavbarMenu
        className={clsx(
          "w-full p-0 m-0 bg-white dark:bg-black/90",
          "transition-[max-height] duration-300 ease-in-out overflow-hidden",
          menuOpen ? "max-h-[1000px]" : "max-h-0"
        )}
      >
        <div className="flex flex-col w-full gap-1 px-3 py-2">
          {[...siteConfig.navItems, ...siteConfig.navMenuItems].map(
            (item, index) => {
              const Icon = item.icon && icons[item.icon];
              const hasChildren =
                "children" in item &&
                Array.isArray(item.children) &&
                item.children.length > 0;
              const isOpen = openDropdowns[item.label] ?? false;

              return (
                <div key={`${item.label}-${index}`} className="w-full">
                  <NavbarMenuItem className="p-0">
                    {item.href && !hasChildren ? (
                      <NextLink
                        href={item.href}
                        className="flex items-center w-full gap-2 px-3 py-2 text-base font-medium rounded hover:text-primary text-black dark:text-white transition-colors"
                        onClick={() => setMenuOpen(false)}
                      >
                        {Icon && <Icon className="w-5 h-5" />}
                        {item.label}
                      </NextLink>
                    ) : hasChildren ? (
                      <button
                        onClick={() =>
                          setOpenDropdowns((prev) => ({
                            ...prev,
                            [item.label]: !prev[item.label],
                          }))
                        }
                        className="flex items-center justify-between w-full gap-2 px-3 py-2 text-base font-medium rounded hover:text-primary text-black dark:text-white transition-colors"
                        aria-expanded={isOpen}
                        aria-controls={`${item.label}-submenu`}
                      >
                        <div className="flex items-center gap-2">
                          {Icon && <Icon className="w-5 h-5" />}
                          {item.label}
                        </div>
                        <span className="text-sm select-none">
                          {isOpen ? "▲" : "▼"}
                        </span>
                      </button>
                    ) : (
                      <span className="flex items-center gap-2 px-3 py-2 text-base text-muted-foreground dark:text-gray-400">
                        {Icon && <Icon className="w-5 h-5" />}
                        {item.label}
                      </span>
                    )}
                  </NavbarMenuItem>

                  {hasChildren &&
                    isOpen &&
                    "children" in item &&
                    Array.isArray(item.children) && (
                      <div
                        id={`${item.label}-submenu`}
                        className="flex flex-col gap-1 mt-1 ml-8"
                      >
                        {item.children.map((child, childIndex) => {
                          const ChildIcon = child.icon && icons[child.icon];
                          return (
                            <NavbarMenuItem key={`${child.href}-${childIndex}`}>
                              <NextLink
                                href={child.href}
                                className="flex items-center w-full gap-2 px-3 py-1 text-sm rounded hover:text-primary text-black dark:text-white transition-colors"
                                onClick={() => setMenuOpen(false)}
                              >
                                {ChildIcon && <ChildIcon className="w-4 h-4" />}
                                {child.label}
                              </NextLink>
                            </NavbarMenuItem>
                          );
                        })}
                      </div>
                    )}
                </div>
              );
            }
          )}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
