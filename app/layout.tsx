import "@/styles/globals.css";
import { Metadata } from "next";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/Components/navbar";
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen antialiased text-black bg-white overflow-x-hidden",
          fontPoppins.variable
        )}
      >
        <div className="relative w-full min-h-screen">
          <div className="fixed top-0 left-0 right-0 z-50">
            <Navbar />
          </div>

          <main className="relative z-0 flex flex-col min-h-[calc(100vh-80px)]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
