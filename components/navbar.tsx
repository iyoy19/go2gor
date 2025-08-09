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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarClass = clsx(
    "fixed top-0 z-50 w-full transition-all duration-300",
    scrolled ? "bg-black/10 backdrop-blur-md shadow-sm" : "bg-transparent"
  );

  return (
    <HeroUINavbar
      maxWidth="xl"
      isMenuOpen={menuOpen}
      onMenuOpenChange={setMenuOpen}
      className={clsx(navbarClass, "relative")}
    >
      {/* Ikon + teks lengkap (desktop) */}
      <NavbarContent className="hidden sm:flex" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink href="/" className="flex items-center gap-2">
            <Rotate3d size={28} className="text-yellow-300 drop-shadow-md" />
            <h1
              className={`text-xl sm:text-2xl font-extrabold tracking-tight leading-none ${rubikDirt.className}`}
            >
              <span className="text-yellow-400 drop-shadow-md">Go</span>
              <span className="text-black drop-shadow-md">2</span>
              <span className="text-indigo-500 drop-shadow-md">Gor</span>
            </h1>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Ikon saja (mobile left) */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarBrand as="li" className="max-w-fit">
          <NextLink href="/" className="flex items-center">
            <Rotate3d size={28} className="text-yellow-300 drop-shadow-md" />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Teks GoGor (mobile center only) */}
      <NavbarContent
        className="sm:hidden absolute left-1/2 -translate-x-1/2"
        justify="center"
      >
        <NavbarBrand as="li" className="max-w-fit">
          <NextLink href="/" className="flex items-center">
            <h1
              className={`text-xl sm:text-2xl font-extrabold tracking-tight leading-none ${rubikDirt.className}`}
            >
              <span className="text-yellow-400 drop-shadow-md">Go</span>
              <span className="text-black drop-shadow-md">2</span>
              <span className="text-indigo-500 drop-shadow-md">Gor</span>
            </h1>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Navigation */}
      <NavbarContent className="hidden lg:flex" justify="center">
        {siteConfig.navItems.map((item) => {
          const Icon = item.icon ? icons[item.icon] : null;

          if (item.dropdown && item.children?.length) {
            return (
              <Dropdown key={item.label}>
                <DropdownTrigger>
                  <Button
                    variant="light"
                    className="font-medium text-black hover:text-primary"
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
                className="flex items-center gap-2 text-black transition-colors text-medium hover:text-primary"
              >
                {Icon && <Icon className="w-4 h-4" />}
                {item.label}
              </NextLink>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      {/* Right Desktop */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-auto"
        justify="end"
      >
        <NavbarItem className="hidden md:flex">
          <Button
            as={HeroUILink}
            href="/login"
            variant="flat"
            className="text-black hover:text-primary"
          >
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Toggle */}
      <NavbarContent className="pl-4 sm:hidden basis-1" justify="end">
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
                        className="flex items-center w-full gap-2 px-2 py-2 text-lg transition-colors rounded hover:text-primary"
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
                        className="flex items-center justify-between w-full gap-2 px-2 py-2 text-lg transition-colors rounded hover:text-primary"
                      >
                        <div className="flex items-center gap-2">
                          {Icon && <Icon className="w-4 h-4" />}
                          {item.label}
                        </div>
                        <span className="text-sm">{isOpen ? "▲" : "▼"}</span>
                      </button>
                    ) : (
                      <span className="flex items-center gap-2 px-2 py-2 text-lg text-muted-foreground">
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
                          <NavbarMenuItem
                            key={`${child.href ?? child.label ?? `child-menu-item-${childIndex}`}`}
                          >
                            <NextLink
                              href={child.href ?? "#"}
                              className="flex items-center w-full gap-2 px-2 py-1 text-base transition-colors rounded hover:text-primary"
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
      </NavbarMenu>
    </HeroUINavbar>
  );
};
