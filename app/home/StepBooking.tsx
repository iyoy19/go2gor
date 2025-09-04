"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  CheckBadgeIcon,
  ChevronRightIcon,
  PlayIcon,
  PauseIcon,
} from "@heroicons/react/24/outline";

interface Step {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  color: string;
}

export default function BookingSteps() {
  const steps: Step[] = [
    {
      icon: ClipboardDocumentListIcon,
      title: "Pilih Lapangan",
      description: "Cari dan pilih lapangan favoritmu.",
      color: "text-blue-600",
    },
    {
      icon: CalendarDaysIcon,
      title: "Atur Jadwal",
      description: "Tentukan tanggal & jam sesuai waktumu.",
      color: "text-emerald-600",
    },
    {
      icon: CheckBadgeIcon,
      title: "Booking Beres",
      description: "Bayar & langsung dapat konfirmasi instan.",
      color: "text-purple-600",
    },
  ];

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (!isAutoPlay || isPaused) return;
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [steps.length, isAutoPlay, isPaused]);

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
    setIsAutoPlay(false);
  };

  const toggleAutoPlay = () => setIsPaused((prev) => !prev);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="pb-12 pt-16 sm:pt-1">
      <div className="mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="font-sans text-left sm:text-left"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-900 leading-snug drop-shadow-lg font-poppins">
            Booking{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600">
              Lapangan
            </span>{" "}
            Jadi{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-orange-500">
              Gampang Banget!
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-200 leading-relaxed max-w-2xl">
            Tinggal pilih, atur jadwal, dan{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-600 font-semibold">
              langsung gas main bareng squad 🎉
            </span>
          </p>
        </motion.div>

        {/* Mobile Carousel */}
        <div className="lg:hidden mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              className="p-6 sm:p-8 rounded-2xl shadow-md bg-white dark:bg-gray-800 text-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              {(() => {
                const StepIcon = steps[currentStep].icon;
                return (
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-100 dark:bg-gray-700 shadow ${steps[currentStep].color}`}
                    >
                      <StepIcon className="w-7 h-7 sm:w-8 sm:h-8" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mt-5 mb-2">
                      {steps[currentStep].title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                      {steps[currentStep].description}
                    </p>
                  </div>
                );
              })()}
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center mt-5 space-x-5">
            <div className="flex space-x-2">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleStepClick(i)}
                  className={`transition-all duration-300 ${
                    i === currentStep
                      ? "w-6 h-2 bg-blue-600 rounded-full"
                      : "w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"
                  }`}
                />
              ))}
            </div>
            <motion.button
              onClick={toggleAutoPlay}
              className="flex items-center justify-center w-9 h-9 rounded-full border shadow-sm bg-white dark:bg-gray-800"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPaused ? (
                <PlayIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <PauseIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Desktop Grid */}
        <motion.div
          className="hidden lg:grid lg:grid-cols-3 gap-8 mt-14"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, i) => {
            const StepIcon = step.icon;
            return (
              <motion.div
                key={i}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 text-center"
                variants={itemVariants}
              >
                <div
                  className={`flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-700 shadow ${step.color}`}
                >
                  <StepIcon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {step.description}
                </p>
                {i < steps.length - 1 && (
                  <ChevronRightIcon className="w-5 h-5 mx-auto mt-4 text-gray-400" />
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <button className="px-6 py-3 sm:px-8 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow hover:shadow-lg transition text-sm sm:text-base">
            Gas Booking Sekarang 🔥
          </button>
        </motion.div>
      </div>
    </section>
  );
}
