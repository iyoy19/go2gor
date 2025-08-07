import "@/styles/globals.css";
import { Metadata } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/Components/navbar";
import { Poppins } from "next/font/google";
import "swiper/css";
import "swiper/css/autoplay";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

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
          "min-h-screen font-sans antialiased text-black bg-white overflow-x-hidden",
          fontSans.variable
        )}
      >
        <div className="relative w-full min-h-screen">
          {/* Navbar: transparan di atas, tetap fixed */}
          <div className="fixed top-0 left-0 right-0 z-50">
            <Navbar />
          </div>

          {/* Konten utama */}
          <main className="relative z-0 flex flex-col min-h-[calc(100vh-80px)]">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
