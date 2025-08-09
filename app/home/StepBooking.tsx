"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckBadgeIcon,
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

export default function BookingSteps() {
  const [open, setOpen] = useState(true); // Default to open

  const steps = [
    {
      icon: <ClipboardDocumentListIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: "Pilih Lapangan",
      desc: "Temukan dan pilih lapangan favoritmu dengan fasilitas terbaik.",
    },
    {
      icon: <CalendarDaysIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: "Pilih Jadwal",
      desc: "Tentukan waktu dan tanggal sesuai keinginanmu dengan kalender kami.",
    },
    {
      icon: <CheckBadgeIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: "Konfirmasi Booking",
      desc: "Isi data diri dan lakukan pembayaran untuk mengamankan slot lapanganmu.",
    },
  ];

  return (
    <section className="w-full py-20 shadow-inner overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-extrabold text-black dark:text-white text-center mb-2">
            Cara Booking Lapangan
          </h2>
          <p className="text-center text-gray-700 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
            Ikuti langkah mudah berikut ini untuk mendapatkan lapangan impianmu
            dengan cepat dan nyaman.
          </p>
        </motion.div>

        {/* Dropdown Toggle Button */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => setOpen(!open)}
            className="inline-flex items-center gap-3 rounded-full bg-blue-100 dark:bg-blue-600/20 hover:bg-blue-200 dark:hover:bg-blue-600/40 border border-blue-300 dark:border-blue-500/50 px-6 py-3 font-semibold text-blue-700 dark:text-white transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
            aria-expanded={open}
            aria-controls="booking-steps"
          >
            {open ? "Sembunyikan Langkah" : "Tampilkan Langkah"}
            <motion.div animate={{ rotate: open ? 180 : 0 }}>
              <svg
                className={`w-5 h-5 transform`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.div>
          </button>
        </motion.div>

        {/* Animated Steps */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="booking-steps"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 max-w-4xl mx-auto space-y-6 overflow-hidden"
            >
              {steps.map(({ icon, title, desc }, i) => (
                <motion.div
                  key={i}
                  className="flex gap-5 items-start bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg border border-gray-300 dark:border-slate-700 rounded-2xl p-6"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="flex-shrink-0 bg-gray-100 dark:bg-slate-800 p-3 rounded-full">
                    {icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-black dark:text-white mb-1">
                      {title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}