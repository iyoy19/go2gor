"use client";

import Link from "next/link";
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube } from "react-icons/fi";
import { Rotate3d } from "lucide-react";
import { rubikDirt } from "@/config/fonts";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/solid";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="font-poppins text-gray-700 dark:text-gray-300 border-t border-gray-300 dark:border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Branding & Social */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Rotate3d
                size={32}
                className="text-yellow-500 dark:text-yellow-300 drop-shadow-md"
              />
              <h1
                className={`text-2xl font-extrabold tracking-tight leading-none text-black dark:text-white ${rubikDirt.className}`}
              >
                <span className="text-yellow-600 dark:text-yellow-400">Go</span>
                <span className="text-black dark:text-white">2</span>
                <span className="text-indigo-700 dark:text-indigo-500">
                  Gor
                </span>
              </h1>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm mb-6">
              Platform booking lapangan olahraga terdepan yang menghubungkan
              Anda dengan fasilitas terbaik di kota Anda.
            </p>
            <div className="flex space-x-4 text-gray-600 dark:text-gray-400 text-lg">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-pink-500 transition-transform hover:scale-110"
              >
                <FiInstagram />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-blue-600 transition-transform hover:scale-110"
              >
                <FiFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="hover:text-blue-400 transition-transform hover:scale-110"
              >
                <FiTwitter />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-red-600 transition-transform hover:scale-110"
              >
                <FiYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-black dark:text-white text-lg font-semibold mb-4">
              Akses Cepat
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="#lapangan"
                  className="hover:text-black dark:hover:text-white transition hover:underline underline-offset-4"
                >
                  Lapangan
                </Link>
              </li>
              <li>
                <Link
                  href="#cara-boking"
                  className="hover:text-black dark:hover:text-white transition hover:underline underline-offset-4"
                >
                  Cara Booking
                </Link>
              </li>
              <li>
                <Link
                  href="#testimoni"
                  className="hover:text-black dark:hover:text-white transition hover:underline underline-offset-4"
                >
                  Testimoni
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="hover:text-black dark:hover:text-white transition hover:underline underline-offset-4"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-black dark:text-white text-lg font-semibold mb-4">
              Legal
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/legal/terms"
                  className="hover:text-black dark:hover:text-white transition hover:underline underline-offset-4"
                >
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/privacy"
                  className="hover:text-black dark:hover:text-white transition hover:underline underline-offset-4"
                >
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/disclaimer"
                  className="hover:text-black dark:hover:text-white transition hover:underline underline-offset-4"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="text-black dark:text-white text-lg font-semibold mb-4">
              Hubungi Kami
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPinIcon className="w-5 h-5 text-gray-500 dark:text-slate-500 mt-0.5 flex-shrink-0" />
                <span>Jl. Olahraga No. 123, Jakarta Selatan, 12345</span>
              </li>
              <li className="flex items-start gap-3">
                <PhoneIcon className="w-5 h-5 text-gray-500 dark:text-slate-500 mt-0.5 flex-shrink-0" />
                <a
                  href="tel:+628123456789"
                  className="hover:text-black dark:hover:text-white transition"
                >
                  +62 812-3456-789
                </a>
              </li>
              <li className="flex items-start gap-3">
                <EnvelopeIcon className="w-5 h-5 text-gray-500 dark:text-slate-500 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:info@go2gor.com"
                  className="hover:text-black dark:hover:text-white transition"
                >
                  info@go2gor.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 py-6 max-w-7xl flex flex-col sm:flex-row justify-between items-center text-center">
          <p className="text-gray-500 dark:text-gray-500 text-xs select-none w-full">
            &copy; {new Date().getFullYear()} Go2Gor. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
