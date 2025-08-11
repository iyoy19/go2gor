import "@/styles/globals.css";
import { Metadata } from "next";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/navbar";
import { fontPoppins } from "@/config/fonts";

import "swiper/css";
import "swiper/css/autoplay";

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
          "min-h-screen antialiased",
          "bg-gradient-to-b bg-white text-black",
          fontPoppins.variable
        )}
      >
        <div className="relative w-full overflow-x-hidden">
          {/* Navbar fixed on top */}
          <div className="fixed top-0 left-0 right-0 z-50">
            <Navbar />
          </div>

          {/* Main content with responsive padding top to prevent navbar overlap */}
          <main className="relative z-0 flex flex-col min-h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
