"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative font-poppins overflow-hidden">
      {/* Background Image dengan overlay transparan */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80')",
        }}
      ></div>
      <div className="absolute inset-0 bg-white/20 dark:bg-black/60"></div>

      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-purple-200/20 dark:bg-purple-500/20 rounded-full blur-3xl animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-200/20 dark:bg-blue-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

      <div className="relative z-10 container mx-auto px-6 py-24 text-center text-black dark:text-white">
        {/* Heading */}
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold mb-4 drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Siap Jadi Bintang Lapangan?
        </motion.h2>

        {/* Subheading */}
        <motion.p
          className="max-w-2xl mx-auto mb-8 text-base md:text-lg text-gray-900 dark:text-gray-200 drop-shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Jangan biarkan lapangan impianmu direbut orang lain. Booking semudah
          tap-and-play. Amankan jadwalmu sekarang dan fokus pada kemenangan!
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link
            href="/lapangan"
            className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-blue-600 to-purple-700 dark:from-blue-500 dark:to-purple-600 text-white px-6 md:px-8 py-3 md:py-4 font-semibold text-base md:text-lg rounded-full shadow-lg hover:scale-105 hover:shadow-blue-500/40 dark:hover:shadow-purple-500/40 focus:outline-none focus:ring-4 focus:ring-black/30 dark:focus:ring-white/30 transition-all duration-300 ease-in-out"
            aria-label="Mulai booking lapangan"
          >
            Amankan Jadwalmu
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 md:h-6 md:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
