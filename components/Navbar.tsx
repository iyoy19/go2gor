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
import { Bell, ChevronDown, LucideIcon } from "lucide-react";
import { siteConfig } from "@/config/site";
import { notifications } from "@/data/notifications";

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
          heading: "text-black/80 font-semibold px-3 py-2",
          divider:
            "bg-gradient-to-r from-transparent via-black/15 to-transparent h-px",
          group: "divide-y divide-gray-100/20 [&>*]:py-2",
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
            className="px-3 py-2.5 hover:bg-black/5"
          >
            <span className="text-sm text-black/90">{sub.label}</span>
          </DropdownItem>
        )) ?? null}
      </DropdownSection>
    ))}
  </>
);

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [shouldRenderContent, setShouldRenderContent] = React.useState(false);
  const [expandedSections, setExpandedSections] = React.useState<
    Record<string, boolean>
  >({});
  const [currentYear, setCurrentYear] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    setCurrentYear(new Date().getFullYear());
  }, []);

  React.useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;
        setIsVisible(currentScrollY < lastScrollY || currentScrollY < 10);
        setLastScrollY(currentScrollY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => window.removeEventListener("scroll", controlNavbar);
    }
  }, [lastScrollY]);

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
      shouldHideOnScroll={false}
      isBordered
      className={`backdrop-blur-md bg-black/20 dark:bg-white/20 transition-transform duration-300 ${
        !isVisible ? "-translate-y-full" : "translate-y-0"
      }`}
      classNames={{
        wrapper: "max-w-screen-xl",
        base: "touch-manipulation",
        toggleIcon: "touch-manipulation",
        menu: "mt-0",
        menuItem: "hover:opacity-80",
      }}
    >
      {/* Left: Mobile menu toggle / Desktop logo */}
      <NavbarContent justify="start">
        <div className="sm:hidden">
          <NavbarMenuToggle
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              if (!isMenuOpen) {
                requestAnimationFrame(() => setShouldRenderContent(true));
              } else {
                setTimeout(() => setShouldRenderContent(false), 100);
              }
            }}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="text-white hover:bg-white/10 active:bg-white/20 rounded-lg p-2 transition-all duration-200 ease-in-out transform active:scale-90"
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
        {siteConfig.navItems
          .filter(
            (item) =>
              !["profile", "aktivitas", "riwayat", "team", "bantuan"].includes(
                item.key
              )
          )
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
        {isClient && (
          <>
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
                className="text-black w-[calc(100vw-32px)] sm:w-[340px] max-h-[80vh] overflow-y-auto"
              >
                <DropdownSection
                  title="Notifikasi"
                  showDivider={true}
                  classNames={{
                    heading: "text-black/80 font-semibold px-3 py-2",
                    divider:
                      "bg-gradient-to-r from-transparent via-black/15 to-transparent h-px",
                    group: "divide-y divide-gray-100/20 [&>*]:py-2",
                  }}
                >
                  {notifications.map((notif) => (
                    <DropdownItem
                      key={notif.key}
                      startContent={
                        notif.icon ? <notif.icon size={20} /> : null
                      }
                      description={
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                          <span className="text-sm text-black line-clamp-2">
                            {notif.description}
                          </span>
                          <span className="text-xs text-black/70">
                            {notif.time}
                          </span>
                        </div>
                      }
                      textValue={notif.title}
                      className="px-3 py-2.5"
                    >
                      <span className="font-semibold text-sm sm:text-base">
                        {notif.title}
                      </span>
                    </DropdownItem>
                  ))}
                </DropdownSection>
                <DropdownSection
                  showDivider={true}
                  classNames={{ divider: "bg-black/20 my-1" }}
                >
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
                className="bg-white/80 backdrop-blur-md"
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
                <DropdownMenu
                  aria-label="Profile Actions"
                  variant="flat"
                  className="w-[calc(100vw-32px)] sm:w-[280px] max-h-[80vh] overflow-y-auto"
                >
                  <DropdownSection
                    showDivider={true}
                    classNames={{
                      divider:
                        "bg-gradient-to-r from-transparent via-black/15 to-transparent h-px",
                    }}
                  >
                    <DropdownItem
                      key="logged-in-as"
                      isReadOnly
                      className="opacity-100 cursor-default px-3 py-2"
                    >
                      <div className="flex flex-col bg-black/5 rounded-lg p-3 text-left">
                        <p className="text-sm text-black/70">Logged in as</p>
                        <p className="font-semibold text-black text-base mt-0.5">
                          Zoey Adams
                        </p>
                        <p className="text-xs text-black/60 mt-0.5">
                          zoey@example.com
                        </p>
                      </div>
                    </DropdownItem>
                  </DropdownSection>
                  {renderDropdownContent(profileNavItem.children ?? [])}
                </DropdownMenu>
              </Dropdown>
            )}
          </>
        )}
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu
        className={`
          fixed inset-0 top-[var(--navbar-height)] px-2 py-4
          bg-black/20 backdrop-blur-sm 
          ${isMenuOpen ? "visible opacity-100" : "invisible opacity-0"}
        `}
        style={{
          transition: "opacity 100ms ease",
          willChange: "opacity",
          overflowY: "auto",
        }}
      >
        {shouldRenderContent &&
          siteConfig.navItems
            .filter((item) => !["profile"].includes(item.key))
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
                  <div className="mb-2">
                    <NavbarMenuItem
                      className="bg-black/20 hover:bg-white/10 rounded-t-lg cursor-pointer transition-all duration-200 ease-in-out"
                      onClick={() => toggleSection(item.key)}
                    >
                      <div className="w-full flex items-center justify-between px-3 py-2.5 text-white">
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
                      <div className="bg-white/10 rounded-b-lg px-2 pb-2 space-y-2 transition-all duration-300 ease-in-out">
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
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
      </NavbarMenu>
    </Navbar>
  );
}
