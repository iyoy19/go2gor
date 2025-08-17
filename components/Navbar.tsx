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
} from "@heroui/react";
import { ChevronDown, LucideIcon } from "lucide-react";
import { siteConfig } from "@/config/site";
import NotificationSystem from "./NotificationSystem"; // Import komponen NotificationSystem

// Tipe data yang sudah ada...
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

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [expandedSections, setExpandedSections] = React.useState<
    Record<string, boolean>
  >({});
  const [currentYear, setCurrentYear] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(true);
  const [isClient, setIsClient] = React.useState(false);
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  const [navbarHeight, setNavbarHeight] = React.useState(64);

  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    setIsClient(true);
    setCurrentYear(new Date().getFullYear());

    // Get actual navbar height
    const navbar = document.querySelector('[data-slot="base"]') as HTMLElement;
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, []);

  React.useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY.current || currentScrollY < 10);
      lastScrollY.current = currentScrollY;

      // Close profile menu when scrolling
      if (
        showProfileMenu &&
        Math.abs(currentScrollY - lastScrollY.current) > 5
      ) {
        setShowProfileMenu(false);
      }
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [showProfileMenu]);

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
    <div className="relative">
      {/* Fixed Navbar */}
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        shouldHideOnScroll={false}
        isBordered
        position="sticky"
        className={`
          fixed top-0 left-0 right-0 z-50
          backdrop-blur-md bg-white/10 border-b border-white/20
          transition-transform duration-300
          ${!isVisible ? "-translate-y-full" : "translate-y-0"}
        `}
        classNames={{
          wrapper: "max-w-screen-xl",
          base: "bg-transparent",
          toggleIcon: "touch-manipulation",
          menu: "mt-0",
          menuItem: "hover:opacity-80",
        }}
      >
        {/* Left: Mobile toggle & logo */}
        <NavbarContent justify="start">
          <div className="sm:hidden">
            <NavbarMenuToggle
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="text-white hover:bg-white/10 active:bg-white/20 rounded-lg p-2 transition-all duration-200 ease-in-out transform active:scale-90"
            />
          </div>
          <NavbarBrand className="hidden sm:flex">
            <Link href="/">
              <p className="font-bold text-xl text-white drop-shadow-md">
                {siteConfig.name}
              </p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {/* Center: Desktop nav links */}
        <NavbarContent className="hidden lg:flex gap-6" justify="center">
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
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        disableRipple
                        className="p-0 text-white drop-shadow-sm hover:text-white/90"
                        radius="sm"
                        variant="light"
                        endContent={<ChevronDown size={16} />}
                        aria-expanded="false"
                      >
                        {item.label}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      variant="flat"
                      className="w-[260px] bg-white/95 backdrop-blur-xl shadow-xl border border-white/30"
                      aria-label={`${item.label} menu`}
                    >
                      {renderDropdownContent(item.children ?? [])}
                    </DropdownMenu>
                  </Dropdown>
                ) : (
                  <Link
                    color="foreground"
                    href={item.href}
                    className="text-white drop-shadow-sm hover:text-white/90 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                )}
              </NavbarItem>
            ))}
        </NavbarContent>

        {/* Right: Notifications & Profile */}
        <NavbarContent justify="end" className="gap-2">
          {isClient && (
            <>
              {/* Panggil NotificationSystem di sini */}
              <NotificationSystem />

              {/* Profile Avatar */}
              {profileNavItem?.children && (
                <div className="relative">
                  <Avatar
                    as="button"
                    aria-label="User menu"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    size="sm"
                    className={`
                      cursor-pointer ml-2
                      transition-all duration-200 ease-out
                      hover:scale-105 hover:shadow-lg
                      active:scale-95
                      ${showProfileMenu ? "ring-2 ring-white/50" : ""}
                    `}
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                  />
                </div>
              )}
            </>
          )}
        </NavbarContent>

        {/* Mobile Menu - sisanya tetap sama seperti kode asli */}
        <NavbarMenu
          className={`
            fixed inset-0 z-[60] px-2 py-4
            bg-black/20 backdrop-blur-md transition-all duration-200
            ${isMenuOpen ? "visible opacity-100" : "invisible opacity-0"}
          `}
          style={{
            top: `${navbarHeight}px`,
            height: `calc(100vh - ${navbarHeight}px)`,
            overflowY: "auto",
          }}
        >
          {/* Konten mobile menu tetap sama */}
          <div className="space-y-2">
            {siteConfig.navItems
              .filter((item) => !["profile"].includes(item.key))
              .map((item) => (
                <React.Fragment key={item.key}>
                  {!item.dropdown ? (
                    <NavbarMenuItem role="menuitem">
                      <Link
                        href={item.href}
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
                        aria-expanded={!!expandedSections[item.key]}
                        className="bg-white/10 hover:bg-white/15 rounded-t-lg cursor-pointer transition-all duration-200 ease-in-out"
                        onClick={() => toggleSection(item.key)}
                      >
                        <div className="w-full flex items-center justify-between px-3 py-2.5 text-white drop-shadow-sm">
                          <div className="flex items-center gap-2">
                            {item.icon ? <item.icon size={18} /> : null}
                            <span className="text-sm">{item.label}</span>
                          </div>
                          <ChevronDown
                            size={18}
                            className={`transition-transform duration-300 ease-in-out ${
                              expandedSections[item.key]
                                ? "rotate-180"
                                : "rotate-0"
                            }`}
                          />
                        </div>
                      </NavbarMenuItem>
                      <div
                        className={`
                          overflow-hidden transition-all duration-300 ease-in-out
                          ${expandedSections[item.key] ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
                        `}
                      >
                        <div className="bg-white/15 rounded-b-lg px-2 pb-2 space-y-2">
                          {item.children?.map((group) => (
                            <div key={group.key}>
                              {group.title && (
                                <div className="text-xs font-semibold text-white/80 px-3 py-1 drop-shadow-sm">
                                  {group.title}
                                </div>
                              )}
                              <div className="space-y-1">
                                {group.items?.map((sub) => (
                                  <NavbarMenuItem key={sub.key}>
                                    <Link
                                      href={sub.href}
                                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white/90 hover:bg-white/20 rounded-md transition-colors duration-200"
                                      onClick={() => setIsMenuOpen(false)}
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
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
          </div>
        </NavbarMenu>
      </Navbar>

      {/* Profile Menu - sisanya tetap sama */}
      <div
        className={`
          fixed right-4 z-[70]
          transition-all duration-300 ease-out origin-top-right
          ${
            showProfileMenu
              ? "opacity-100 visible transform scale-100"
              : "opacity-0 invisible transform scale-95 pointer-events-none"
          }
        `}
        style={{ top: `${navbarHeight + 12}px` }}
      >
        {profileNavItem?.children && (
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 p-6 min-w-[380px] max-w-[480px] ring-1 ring-black/5">
            {/* User Info Section */}
            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-xl mb-6 border border-blue-100/50">
              <div className="relative">
                <Avatar
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  size="lg"
                  className="ring-3 ring-white shadow-md"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex flex-col">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Logged in as
                </p>
                <p className="font-bold text-gray-900 text-lg">Zoey Adams</p>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  zoey@example.com
                </p>
              </div>
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-3 gap-3">
              {profileNavItem.children
                .flatMap((group) => group.items || [])
                .map((item, index) => (
                  <Link
                    key={item.key ?? `item-${index}`}
                    href={item.href}
                    className="group relative flex flex-col items-center gap-2 p-4 text-center bg-gray-50/70 hover:bg-gradient-to-br hover:from-blue-50/80 hover:to-indigo-50/80 rounded-xl transition-all duration-200 border border-gray-100/50 hover:border-blue-200/70 hover:shadow-md hover:-translate-y-0.5"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <div className="flex items-center justify-center w-8 h-8 bg-white/90 rounded-lg shadow-sm group-hover:shadow-md group-hover:bg-blue-500 transition-all duration-200">
                      {item.icon
                        ? React.createElement(item.icon, {
                            size: 18,
                            className:
                              "text-gray-600 group-hover:text-white transition-colors duration-200",
                          })
                        : null}
                    </div>
                    <span className="text-xs font-medium text-gray-800 group-hover:text-gray-900 leading-tight">
                      {item.label}
                    </span>
                    <div className="absolute inset-0 rounded-xl ring-2 ring-blue-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  </Link>
                ))}
            </div>

            {/* Bottom decoration */}
            <div className="mt-6 pt-4 border-t border-gray-100/50">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                <span>Profile Menu</span>
                <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for Profile Menu */}
      <div
        className={`
          fixed inset-0 z-[65] bg-black/10 backdrop-blur-[1px]
          transition-all duration-300 ease-out
          ${
            showProfileMenu
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }
        `}
        onClick={() => setShowProfileMenu(false)}
      />
    </div>
  );
}
