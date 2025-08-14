import "@/styles/globals.css";
import { Metadata } from "next";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { fontPoppins } from "@/config/fonts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import "swiper/css";
import "swiper/css/autoplay";
import "@/styles/swiper-custom.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.linkname,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen antialiased hide-scrollbar",
          "bg-gradient-to-b bg-white text-black",
          fontPoppins.variable
        )}
      >
        <div className="relative w-full overflow-x-hidden hide-scrollbar">
          {/* Navbar fixed on top */}
          <div className="fixed top-0 left-0 right-0 z-50 hide-scrollbar">
            <Navbar />
          </div>

          {/* Main content with responsive padding top to prevent navbar overlap */}
          <main className="relative z-0 flex flex-col min-h-screen hide-scrollbar">
            {children}
            <Footer />
          </main>
        </div>
      </body>
    </html>
  );
}
