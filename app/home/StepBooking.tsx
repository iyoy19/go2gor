"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckBadgeIcon,
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

export default function BookingSteps() {
  const steps = [
    {
      icon: <ClipboardDocumentListIcon className="w-6 h-6 text-blue-600" />,
      title: "Pilih Lapangan",
      desc: "Pilih lapangan yang sesuai kebutuhanmu.",
    },
    {
      icon: <CalendarDaysIcon className="w-6 h-6 text-blue-600" />,
      title: "Pilih Jadwal",
      desc: "Tentukan tanggal dan waktu booking.",
    },
    {
      icon: <CheckBadgeIcon className="w-6 h-6 text-blue-600" />,
      title: "Konfirmasi Booking",
      desc: "Lengkapi data dan lakukan pembayaran.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleStep = (i: number) => {
    setActiveIndex(activeIndex === i ? null : i);
  };

  return (
    <section className="w-full py-16">
      <div className="max-w-3xl mx-auto px-4">
        {/* Heading */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white">
            Cara Booking Lapangan
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Ikuti langkah mudah berikut untuk mendapatkan lapangan impianmu
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-2">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="overflow-hidden rounded-md"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <button
                onClick={() => toggleStep(i)}
                className="w-full flex items-center justify-between p-3 focus:outline-none"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-full">{step.icon}</div>
                  <span className="font-medium text-black dark:text-white">
                    {step.title}
                  </span>
                </div>
                <span className="text-gray-400 dark:text-gray-300">
                  {activeIndex === i ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pl-8 pr-3 pb-2 text-gray-600 dark:text-gray-300 text-sm"
                  >
                    {step.desc}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
