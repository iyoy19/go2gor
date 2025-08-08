"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckBadgeIcon,
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

export default function BookingSteps() {
  const [open, setOpen] = useState(false);

  const steps = [
    {
      icon: <ClipboardDocumentListIcon className="w-8 h-8 text-indigo-600" />,
      title: "Pilih Lapangan",
      desc: "Temukan dan pilih lapangan favoritmu dengan fasilitas terbaik.",
    },
    {
      icon: <CalendarDaysIcon className="w-8 h-8 text-indigo-600" />,
      title: "Pilih Jadwal",
      desc: "Tentukan waktu dan tanggal sesuai keinginanmu dengan kalender kami.",
    },
    {
      icon: <CheckBadgeIcon className="w-8 h-8 text-indigo-600" />,
      title: "Konfirmasi Booking",
      desc: "Isi data diri dan lakukan pembayaran untuk mengamankan slot lapanganmu.",
    },
  ];

  return (
    <section className="w-full bg-gradient-to-r from-indigo-50 via-white to-purple-50 py-12 shadow-inner">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-indigo-900 text-center mb-2">
          Cara Booking Lapangan
        </h2>
        <p className="text-center text-indigo-700 mb-6 max-w-3xl mx-auto">
          Ikuti langkah mudah berikut ini untuk mendapatkan lapangan impianmu
          dengan cepat dan nyaman.
        </p>

        {/* Dropdown Toggle Button */}
        <div className="flex justify-center">
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 transition"
            aria-expanded={open}
            aria-controls="booking-steps"
          >
            {open ? "Sembunyikan Cara Booking" : "Lihat Cara Booking"}
            <svg
              className={`w-5 h-5 transform transition-transform ${
                open ? "rotate-180" : "rotate-0"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {/* Animated Steps */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="booking-steps"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="mt-10 max-w-4xl mx-auto space-y-8 overflow-hidden"
            >
              {steps.map(({ icon, title, desc }, i) => (
                <div
                  key={i}
                  className="flex gap-5 items-start bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition"
                >
                  <div className="flex-shrink-0">{icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-indigo-900 mb-1">
                      {title}
                    </h3>
                    <p className="text-indigo-700">{desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
