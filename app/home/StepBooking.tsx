"use client";

import { useState } from "react";
import {
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

export default function BookingSteps() {
  const steps = [
    {
      icon: <ClipboardDocumentListIcon className="w-8 h-8 text-blue-600" />,
      title: "Pilih Lapangan",
    },
    {
      icon: <CalendarDaysIcon className="w-8 h-8 text-blue-600" />,
      title: "Pilih Jadwal",
    },
    {
      icon: <CheckBadgeIcon className="w-8 h-8 text-blue-600" />,
      title: "Konfirmasi Booking",
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4">
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

        {/* Mobile View */}
        <div className="md:hidden flex flex-col items-center">
          {/* Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center w-72 sm:w-80 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              onClick={nextStep}
            >
              <div className="mb-4">{steps[currentStep].icon}</div>
              <h3 className="font-semibold text-lg text-black dark:text-white">
                {steps[currentStep].title}
              </h3>
            </motion.div>
          </AnimatePresence>

          {/* Indicators: semua dot */}
          <div className="flex mt-4 space-x-3 z-10">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`flex items-center justify-center rounded-full transition-all duration-300
                  ${
                    i === currentStep
                      ? "bg-black/90 dark:bg-black-500 w-6 h-6 text-white font-semibold"
                      : "bg-black/50 dark:bg-gray-400 w-4 h-4"
                  }`}
              >
                {i === currentStep ? i + 1 : ""}
              </span>
            ))}
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex justify-between gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center w-64"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <div className="mb-3">{step.icon}</div>
              <h3 className="font-semibold text-lg text-black dark:text-white">
                {step.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
