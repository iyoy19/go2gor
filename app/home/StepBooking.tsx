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
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
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
        <div className="space-y-3">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              layout
              className="overflow-hidden rounded-md border border-gray-200 dark:border-slate-700"
              transition={{ layout: { duration: 0.4, ease: "easeOut" } }}
            >
              <button
                onClick={() => toggleStep(i)}
                className="w-full flex items-center justify-between p-4 focus:outline-none hover:bg-gray-50 dark:hover:bg-slate-800 transition-all duration-300 ease-in-out"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1 rounded-full">{step.icon}</div>
                  <span className="font-medium text-black dark:text-white">
                    {step.title}
                  </span>
                </div>
                <span className="text-gray-400 dark:text-gray-300 text-xl font-bold transition-transform duration-300 ease-in-out">
                  {activeIndex === i ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="pl-12 pr-4 pb-4 text-gray-700 dark:text-gray-300 text-sm"
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
