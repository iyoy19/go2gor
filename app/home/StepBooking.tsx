"use client";

import { motion } from "framer-motion";
import {
  CheckBadgeIcon,
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

export default function BookingSteps() {
  const steps = [
    {
      icon: (
        <ClipboardDocumentListIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
      ),
      title: "Pilih Lapangan",
      desc: "Pilih lapangan yang sesuai kebutuhanmu.",
    },
    {
      icon: (
        <CalendarDaysIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
      ),
      title: "Pilih Jadwal",
      desc: "Tentukan tanggal dan waktu booking.",
    },
    {
      icon: (
        <CheckBadgeIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
      ),
      title: "Konfirmasi Booking",
      desc: "Lengkapi data dan lakukan pembayaran.",
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

        {/* Animated Steps - Always visible */}
        <motion.div
          id="booking-steps"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 max-w-4xl mx-auto space-y-6 overflow-hidden"
        >
          {steps.map(({ icon, title, desc }, i) => (
            <motion.div
              key={i}
              className="flex gap-5 items-start bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 p-3 rounded-full">
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
      </div>
    </section>
  );
}
