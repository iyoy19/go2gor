"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Carousel from "@/components/Carousel";

const words = ["Main Hari Ini!", "Booking Mudah!", "Anti Ribet!"];

export default function LapanganSection() {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const mobileCarouselContainerRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);

  // Hitung lebar carousel
  useEffect(() => {
    const setWidth = () => {
      const desktopWidth = carouselContainerRef.current?.offsetWidth ?? 0;
      const mobileWidth = mobileCarouselContainerRef.current?.offsetWidth ?? 0;
      setCarouselWidth(desktopWidth > 0 ? desktopWidth : mobileWidth);
    };
    setWidth();
    window.addEventListener("resize", setWidth);
    return () => window.removeEventListener("resize", setWidth);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const currentWord = words[index];
    const typingSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentWord.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index]);

  // Scroll indicator visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY === 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full font-poppins pt-2 sm:pt-16 pb-2 sm:pb-24">
      {/* Background Decoration */}
      <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-purple-300 dark:bg-purple-700 opacity-20 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-120px] left-[-80px] w-[250px] h-[250px] bg-indigo-300 dark:bg-indigo-700 opacity-20 rounded-full blur-2xl z-0" />

      <div className="relative w-full overflow-x-hidden flex flex-col md:flex-row items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 gap-8 md:gap-12 z-10">
        {/* Desktop: Left Animation */}
        <div
          ref={carouselContainerRef}
          className="hidden pt-4 md:flex w-full md:w-1/2 justify-center items-center"
        >
          <div className="w-full relative z-0 overflow-hidden">
            {carouselWidth > 0 && (
              <Carousel
                baseWidth={carouselWidth}
                autoplay
                autoplayDelay={5000}
                pauseOnHover
                loop
                round={false}
              />
            )}
          </div>
        </div>

        {/* Desktop: Right Text */}
        <div className="hidden md:flex w-full md:w-1/2 flex-col justify-start text-left px-4 md:px-0 pt-10 relative z-10">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center px-4 py-1 text-xs font-bold text-white bg-gradient-to-r from-purple-400 to-pink-600 rounded-full shadow-md w-fit"
          >
            #1 Booking Lapangan Online
          </motion.span>

          {/* Desktop Typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-0 min-w-[14ch] pt-10 px-1 flex items-center text-[3rem] lg:text-[3.8rem] xl:text-[4.2rem] font-extrabold tracking-tight leading-tight text-black dark:text-white drop-shadow-md"
          >
            <span className="inline-flex items-center min-h-[4.5rem] lg:min-h-[5rem]">
              {displayText || "\u00A0"}
              <motion.span
                className="inline-block w-[3px] h-[1.2em] ml-1 bg-yellow-500 dark:bg-pink-600"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              />
            </span>
          </motion.div>

          {/* Extra Heading */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-lg sm:text-xl font-semibold text-black dark:text-white mt-2"
          >
            Tinggal Klik, Lapangan Langsung Dapet!
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-2 text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 md:w-4/5 font-medium"
          >
            Nggak perlu ribet datang ke GOR! <br />
            Cukup buka website kami, pilih jadwal & lapangan favorit, langsung
            booking.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8 flex flex-row gap-4 w-full"
          >
            <Link
              href="/lapangan"
              className="basis-1/2 text-center px-6 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg shadow-sm backdrop-blur-sm transition-all duration-200 transform hover:scale-[1.02]"
            >
              Cek Lapangan
            </Link>
            <Link
              href="/booking"
              className="basis-1/2 text-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 rounded-lg shadow-md transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg"
            >
              Booking Now
            </Link>
          </motion.div>
        </div>

        {/* Mobile: Carousel + Text */}
        <div className="block md:hidden w-full flex flex-col text-left px-0 sm:mt-4 overflow-visible">
          {/* 🔼 Carousel dulu */}
          <div
            ref={mobileCarouselContainerRef}
            className="w-full flex justify-center items-center relative z-0 overflow-visible max-w-[85vw] mx-auto sm:max-w-[80vw] mb-6 sm:mb-8"
          >
            {carouselWidth > 0 && (
              <Carousel
                baseWidth={carouselWidth}
                autoplay={true}
                autoplayDelay={5000}
                pauseOnHover={true}
                loop
                round={false}
              />
            )}
          </div>

          {/* 🔽 Baru teks */}
          <div className="px-4 mb-6">
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center px-3 py-1 text-[10px] sm:text-xs font-bold text-white bg-gradient-to-r from-purple-400 to-pink-600 dark:bg-pink-600 rounded-full shadow-md w-fit"
            >
              #1 Booking Lapangan Online
            </motion.span>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative z-10 mt-6 sm:mt-4 mb-1 sm:mb-5 min-h-[2.5rem] sm:min-h-[3rem] text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-black dark:text-white drop-shadow-md"
            >
              <span className="inline-flex items-center min-w-[14ch]">
                {displayText}
                <motion.span
                  className="inline-block w-[3px] h-[1.2em] ml-1 bg-yellow-500 dark:bg-pink-600"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                />
              </span>
            </motion.div>

            {/* Extra Heading */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="relative z-10 text-base sm:text-lg font-semibold text-black dark:text-white mt-1"
            >
              Tinggal Klik, Lapangan Langsung Dapet!
            </motion.h3>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="relative z-10 mt-2 text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium"
            >
              Nggak perlu ribet datang ke GOR! <br />
              Cukup buka website kami, pilih jadwal & lapangan favorit, langsung
              booking.
            </motion.p>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="relative z-10 mt-6 sm:mt-8 flex flex-row gap-3 w-full px-4"
          >
            <Link
              href="/lapangan"
              className="basis-1/2 text-center px-4 py-2 text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg shadow-sm backdrop-blur-sm transition-all duration-200 transform hover:scale-[1.02]"
            >
              Cek Lapangan
            </Link>
            <Link
              href="/booking"
              className="basis-1/2 text-center px-4 py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 rounded-lg shadow-md transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg"
            >
              Booking Now
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 1.4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="w-6 h-6 border-b-2 border-r-2 border-black dark:border-white rotate-45 animate-bounce" />
        </motion.div>
      )}
    </section>
  );
}
