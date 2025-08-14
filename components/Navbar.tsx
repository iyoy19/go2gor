"use client";

import React from "react";
import { Navbar } from "@heroui/react";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

export default function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      className="bg-transparent backdrop-blur-lg px-0"
    >
      <MobileNavbar isMenuOpen={isMenuOpen} />
      <DesktopNavbar />
    </Navbar>
  );
}
