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

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      className={clsx(navbarClass, "relative px-0 sm:px-6 lg:px-8")}
    >
      {/* Desktop: Logo kiri */}
      <NavbarContent className="hidden sm:flex" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit flex items-center">
          <NextLink href="/" className="flex items-center gap-2">
            <Rotate3d size={28} className="text-yellow-300 drop-shadow-md" />
            <h1
              className={clsx(
                `text-xl sm:text-2xl font-extrabold tracking-tight leading-none ${rubikDirt.className}`,
                "dark:text-white"
              )}
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

      {/* Mobile: Logo kiri */}
      <NavbarContent
        className="sm:hidden"
        justify="start"
        style={{ gap: "0.5rem" }}
      >
        <NavbarBrand as="li" className="max-w-fit flex items-center gap-2">
          <NextLink href="/" className="flex items-center gap-2">
            <Rotate3d size={28} className="text-yellow-300 drop-shadow-md" />
            <h1
              className={clsx(
                "text-xl font-extrabold tracking-tight leading-none",
                rubikDirt.className,
                "dark:text-white"
              )}
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

      {/* Desktop: Navigasi tengah */}
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
                className="flex items-center gap-2 text-black dark:text-white transition-colors text-medium hover:text-primary"
              >
                {Icon && <Icon className="w-4 h-4" />}
                {item.label}
              </NextLink>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      {/* Desktop: Tombol dark mode + login kanan */}
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
          >
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile: Tombol dark mode + toggle menu kanan */}
      <NavbarContent
        className="sm:hidden flex basis-1 items-center gap-2 pr-0"
        justify="end"
      >
        <Button
          variant="flat"
          onClick={toggleDarkMode}
          aria-label="Toggle Dark Mode"
          className="text-black dark:text-white hover:text-primary"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>

        <NavbarMenuToggle onClick={() => setMenuOpen(!menuOpen)} />
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="w-full p-0 m-0">
        <div className="flex flex-col w-full gap-2 px-2 mt-2">
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
                  <NavbarMenuItem>
                    {item.href && !hasChildren ? (
                      <NextLink
                        href={item.href}
                        className="flex items-center w-full gap-2 px-2 py-2 text-lg transition-colors rounded hover:text-primary text-black dark:text-white"
                        onClick={() => setMenuOpen(false)}
                      >
                        {Icon && <Icon className="w-4 h-4" />}
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
                        className="flex items-center justify-between w-full gap-2 px-2 py-2 text-lg transition-colors rounded hover:text-primary text-black dark:text-white"
                      >
                        <div className="flex items-center gap-2">
                          {Icon && <Icon className="w-4 h-4" />}
                          {item.label}
                        </div>
                        <span className="text-sm">{isOpen ? "▲" : "▼"}</span>
                      </button>
                    ) : (
                      <span className="flex items-center gap-2 px-2 py-2 text-lg text-muted-foreground dark:text-gray-400">
                        {Icon && <Icon className="w-4 h-4" />}
                        {item.label}
                      </span>
                    )}
                  </NavbarMenuItem>

                  {hasChildren &&
                    isOpen &&
                    "children" in item &&
                    Array.isArray(item.children) && (
                      <div className="flex flex-col gap-1 mt-1 ml-6">
                        {item.children.map((child, childIndex) => {
                          const ChildIcon = child.icon && icons[child.icon];
                          return (
                            <NavbarMenuItem key={`${child.href}-${childIndex}`}>
                              <NextLink
                                href={child.href}
                                className="flex items-center w-full gap-2 px-2 py-1 text-base transition-colors rounded hover:text-primary text-black dark:text-white"
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
