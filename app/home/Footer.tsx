"use client";

import Link from "next/link";
import { FiInstagram, FiFacebook, FiTwitter, FiYoutube } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-6 max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* About */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">
            Tentang Kami
          </h3>
          <p className="text-gray-400 leading-relaxed text-sm">
            Kami menyediakan layanan booking lapangan olahraga terbaik dengan
            sistem mudah dan terpercaya. Nikmati kenyamanan dan keamanan saat
            memesan lapangan favoritmu kapan saja dan di mana saja.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Navigasi</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#lapangan" className="hover:text-white transition">
                Lapangan
              </Link>
            </li>
            <li>
              <Link href="#cara-boking" className="hover:text-white transition">
                Cara Booking
              </Link>
            </li>
            <li>
              <Link href="#testimoni" className="hover:text-white transition">
                Testimoni
              </Link>
            </li>
            <li>
              <Link href="#faq" className="hover:text-white transition">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Kontak */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Kontak Kami</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>📍 Jl. Olahraga No. 123, Jakarta</li>
            <li>
              📞{" "}
              <a
                href="tel:+628123456789"
                className="hover:text-white transition"
              >
                +62 812-3456-789
              </a>
            </li>
            <li>
              ✉️{" "}
              <a
                href="mailto:info@bookinglapangan.com"
                className="hover:text-white transition"
              >
                info@bookinglapangan.com
              </a>
            </li>
          </ul>
        </div>

        {/* Sosial Media */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Ikuti Kami</h3>
          <div className="flex space-x-4 text-gray-400 text-lg">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-pink-500 transition"
            >
              <FiInstagram className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-blue-600 transition"
            >
              <FiFacebook className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-blue-400 transition"
            >
              <FiTwitter className="w-5 h-5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-red-600 transition"
            >
              <FiYoutube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-500 text-xs select-none">
        &copy; {new Date().getFullYear()} BookingLapangan. All rights reserved.
      </div>
    </footer>
  );
}
