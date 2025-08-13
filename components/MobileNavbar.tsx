"use client";

import React from "react";
import {
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  NavbarBrand,
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

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="text-primary"
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-2" justify="center">
        <NavbarBrand>
          <p className="font-bold text-xl text-primary">{siteConfig.name}</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarMenu className="gap-2 p-4">
        <div className="flex flex-col min-h-[calc(100vh-4rem)]">
          <div className="flex-grow">
            {siteConfig.navItems
              .filter((item) => item.key !== "profile")
              .map((item) => (
                <React.Fragment key={item.key}>
                  {!item.dropdown ? (
                    <NavbarMenuItem key={item.key}>
                      <Link
                        href={item.href}
                        className="w-full flex items-center gap-2 text-default-600 hover:text-primary hover:bg-primary-50 transition-colors rounded-md px-3 py-2.5"
                      >
                        {getIcon(item.icon, 18)}
                        <span className="text-sm">{item.label}</span>
                      </Link>
                    </NavbarMenuItem>
                  ) : (
                    <div
                      className={expandedSections[item.key] ? "mb-4" : "mb-0"}
                    >
                      <NavbarMenuItem
                        key={`${item.key}-header`}
                        className="bg-default-100 rounded-t-lg"
                        onClick={() => toggleSection(item.key)}
                      >
                        <div className="w-full flex items-center justify-between text-default-700 px-3 py-2.5 cursor-pointer">
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
                      {expandedSections[item.key] && (
                        <div className="bg-default-50 rounded-b-lg px-2 pb-2">
                          {item.children?.map((group, groupIdx) => (
                            <div key={group.key} className="mb-2 last:mb-0">
                              {group.title && (
                                <NavbarMenuItem key={`${group.key}-title`}>
                                  <div className="w-full mt-2">
                                    <div className="text-xs font-semibold text-default-500 px-3 py-2">
                                      {group.title}
                                    </div>
                                  </div>
                                </NavbarMenuItem>
                              )}
                              <div className="py-1 space-y-2">
                                {group.items?.map((sub, idx) => (
                                  <NavbarMenuItem
                                    key={sub.key}
                                    className="rounded-md overflow-hidden ring-1 ring-default-200"
                                  >
                                    <Link
                                      href={sub.href}
                                      className={`w-full flex items-center gap-2 hover:text-primary hover:bg-primary-50 transition-colors px-3 py-2 ${
                                        sub.color === "danger"
                                          ? "text-danger hover:text-danger hover:bg-danger-50"
                                          : "text-default-600"
                                      }`}
                                    >
                                      {getIcon(sub.icon, 18)}
                                      <span className="text-sm">
                                        {sub.label}
                                      </span>
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

          <div className="mt-auto pt-4 border-t border-divider">
            <div className="flex flex-col items-center gap-2 text-small text-default-400">
              <div className="flex items-center gap-1">
                <Icons.Copyright size={14} />
                <span>
                  {new Date().getFullYear()} {siteConfig.name}
                </span>
              </div>
              <p className="text-xs text-center">
                Version 1.0.0 • All rights reserved
              </p>
            </div>
          </div>
        </div>
      </NavbarMenu>
    </>
  );
}
