import "@/styles/globals.css";
import { Metadata } from "next";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/navbar";
import { fontPoppins } from "@/config/fonts";

import "swiper/css";
import "swiper/css/autoplay";

import { Providers } from "./providers";

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
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          "min-h-screen antialiased overflow-x-hidden",
          "bg-gradient-to-b from-cyan-100 to-yellow-200 text-black",
          "dark:bg-gradient-to-b dark:from-gray-900 dark:to-black dark:text-white",
          fontPoppins.variable
        )}
      >
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <div className="relative w-full">
            {/* Navbar fixed on top */}
            <div className="fixed top-0 left-0 right-0 z-50">
              <Navbar />
            </div>

            {/* Main content with responsive padding top to prevent navbar overlap */}
            <main className="relative z-0 flex flex-col min-h-screen pt-[64px] sm:pt-[64px] md:pt-[72px] lg:pt-[72px]">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
